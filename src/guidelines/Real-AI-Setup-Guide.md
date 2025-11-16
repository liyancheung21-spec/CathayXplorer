# 🤖 Real AI Trip Planner Setup Guide

This guide will walk you through implementing **real AI-powered trip planning** using Supabase Edge Functions and OpenAI GPT-4.

## 📋 Overview

You'll be setting up:
1. **Supabase Backend** - Secure API handling and database
2. **OpenAI GPT-4** - Real AI for trip generation
3. **Edge Function** - Serverless function to process AI requests
4. **Database** - Store user preferences and trip history

---

## 🚀 Step 1: Connect to Supabase (2 minutes)

### In Figma Make:
1. **I'll call the `supabase_connect` tool** which will show you a modal
2. Click **"Connect to Supabase"**
3. You'll be guided through:
   - Creating a Supabase account (free tier)
   - Creating a new project
   - Getting your project URL and API keys

> **Note:** Figma Make is designed for prototyping. Avoid collecting PII or sensitive data.

---

## 🔑 Step 2: Get OpenAI API Key (2 minutes)

### Option A: OpenAI GPT-4 (Recommended)
1. Go to [platform.openai.com](https://platform.openai.com)
2. Sign up or log in
3. Navigate to **API Keys** section
4. Click **"Create new secret key"**
5. Copy the key (starts with `sk-...`)
6. **Pricing:** ~$0.01 per trip generation (very affordable)

### Option B: Anthropic Claude (Alternative)
1. Go to [console.anthropic.com](https://console.anthropic.com)
2. Sign up or log in
3. Get API key from dashboard
4. Similar pricing to OpenAI

---

## 📦 Step 3: Create Database Tables

Run this SQL in your Supabase SQL Editor:

```sql
-- User Travel Preferences
CREATE TABLE user_preferences (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id),
  preferred_budget TEXT CHECK (preferred_budget IN ('budget', 'premium')),
  favorite_destinations TEXT[],
  travel_style TEXT[], -- ['adventure', 'relaxation', 'culture', 'food']
  asia_miles_balance INTEGER DEFAULT 0,
  marco_polo_tier TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- AI Generated Trips
CREATE TABLE ai_trips (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id),
  original_prompt TEXT NOT NULL,
  destination TEXT NOT NULL,
  country TEXT NOT NULL,
  suggestion_data JSONB NOT NULL,
  saved_to_vision_board BOOLEAN DEFAULT FALSE,
  booked BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Trip History for Learning
CREATE TABLE trip_history (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id),
  destination TEXT NOT NULL,
  trip_date DATE NOT NULL,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  feedback TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE user_preferences ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_trips ENABLE ROW LEVEL SECURITY;
ALTER TABLE trip_history ENABLE ROW LEVEL SECURITY;

-- RLS Policies (users can only see their own data)
CREATE POLICY "Users can view own preferences" 
  ON user_preferences FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update own preferences" 
  ON user_preferences FOR UPDATE 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can view own trips" 
  ON ai_trips FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own trips" 
  ON ai_trips FOR INSERT 
  WITH CHECK (auth.uid() = user_id);
```

---

## ⚡ Step 4: Create Supabase Edge Function

### 4.1 Create the Edge Function

In your Supabase Dashboard:
1. Go to **Edge Functions**
2. Click **"Create a new function"**
3. Name it: `generate-trip`
4. Use this code:

```typescript
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    // Get request data
    const { prompt, userPreferences } = await req.json()
    
    // Initialize Supabase client
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      {
        global: {
          headers: { Authorization: req.headers.get('Authorization')! },
        },
      }
    )

    // Get user from auth token
    const {
      data: { user },
    } = await supabaseClient.auth.getUser()

    if (!user) {
      throw new Error('Not authenticated')
    }

    // Fetch user's travel history for personalization
    const { data: tripHistory } = await supabaseClient
      .from('trip_history')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
      .limit(5)

    // Fetch user preferences
    const { data: preferences } = await supabaseClient
      .from('user_preferences')
      .select('*')
      .eq('user_id', user.id)
      .single()

    // Build AI prompt with context
    const systemPrompt = `You are an expert travel planner for Cathay Xplorer, a premium travel app by Cathay Pacific. 
    
User Profile:
- Budget preference: ${preferences?.preferred_budget || 'premium'}
- Marco Polo tier: ${preferences?.marco_polo_tier || 'Gold'}
- Asia Miles balance: ${preferences?.asia_miles_balance || 0}
- Previous trips: ${tripHistory?.map(t => t.destination).join(', ') || 'None'}
- Travel style: ${preferences?.travel_style?.join(', ') || 'Not specified'}

Generate a detailed, personalized trip suggestion based on the user's prompt. Return ONLY a valid JSON object with this exact structure:

{
  "destination": "City Name",
  "country": "Country Name",
  "duration": "X-Y days",
  "estimatedBudget": "HKD X - Y",
  "bestTimeToVisit": "Season or months",
  "description": "Engaging description",
  "highlights": ["highlight 1", "highlight 2", ...],
  "flightOptions": [
    {
      "airline": "Cathay Pacific or HK Express",
      "flightNumber": "CX123",
      "departure": "HH:MM HKG",
      "arrival": "HH:MM ABC",
      "duration": "Xh Ym",
      "price": number,
      "asiaMiles": number,
      "class": "Economy or Business"
    }
  ],
  "hotelOptions": [
    {
      "name": "Hotel Name",
      "rating": 5,
      "pricePerNight": number,
      "asiaMilesRedemption": number or null,
      "location": "Area name",
      "amenities": ["amenity1", "amenity2"]
    }
  ],
  "itinerary": [
    {
      "day": 1,
      "title": "Day title",
      "activities": [
        {
          "time": "HH:MM",
          "title": "Activity title",
          "description": "Activity description",
          "cost": "HKD XXX" or null,
          "duration": "Xh" or null
        }
      ]
    }
  ],
  "asiaMilesOptimization": {
    "potentialEarnings": number,
    "redemptionOptions": ["option1", "option2", "option3"]
  }
}

Be specific, use real place names, and optimize for the user's preferences and Asia Miles.`

    // Call OpenAI API
    const openAIResponse = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${Deno.env.get('OPENAI_API_KEY')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4-turbo-preview',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: prompt }
        ],
        temperature: 0.8,
        response_format: { type: 'json_object' }
      }),
    })

    if (!openAIResponse.ok) {
      throw new Error(`OpenAI API error: ${openAIResponse.statusText}`)
    }

    const aiData = await openAIResponse.json()
    const suggestion = JSON.parse(aiData.choices[0].message.content)

    // Save to database
    const { data: savedTrip, error: saveError } = await supabaseClient
      .from('ai_trips')
      .insert({
        user_id: user.id,
        original_prompt: prompt,
        destination: suggestion.destination,
        country: suggestion.country,
        suggestion_data: suggestion,
      })
      .select()
      .single()

    if (saveError) {
      console.error('Error saving trip:', saveError)
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        suggestion,
        tripId: savedTrip?.id 
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200 
      }
    )

  } catch (error) {
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error.message 
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400 
      }
    )
  }
})
```

### 4.2 Set Environment Variables

In your Edge Function settings, add:
- `OPENAI_API_KEY` = `sk-your-openai-key-here`

(SUPABASE_URL and SUPABASE_ANON_KEY are automatically available)

### 4.3 Deploy the Function

Click **"Deploy"** in the Supabase dashboard.

---

## 💻 Step 5: Update Frontend Code

Replace `/services/aiTripPlanner.ts` with:

```typescript
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
)

export async function generateTripSuggestion(prompt: string) {
  // Get user session
  const { data: { session } } = await supabase.auth.getSession()
  
  if (!session) {
    throw new Error('Please sign in to use AI trip planning')
  }

  // Call Edge Function
  const { data, error } = await supabase.functions.invoke('generate-trip', {
    body: { prompt }
  })

  if (error) {
    throw new Error(error.message || 'Failed to generate trip')
  }

  return data.suggestion
}

// Save trip to vision board
export async function saveToVisionBoard(tripId: string) {
  const { error } = await supabase
    .from('ai_trips')
    .update({ saved_to_vision_board: true })
    .eq('id', tripId)

  if (error) throw error
}

// Get user's AI trip history
export async function getUserTripHistory() {
  const { data, error } = await supabase
    .from('ai_trips')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) throw error
  return data
}

// Update user preferences (makes AI smarter over time)
export async function updateUserPreferences(preferences: any) {
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) throw new Error('Not authenticated')

  const { error } = await supabase
    .from('user_preferences')
    .upsert({
      user_id: user.id,
      ...preferences,
      updated_at: new Date().toISOString()
    })

  if (error) throw error
}
```

---

## 🎨 Step 6: Add Environment Variables

Create a `.env` file in your project root:

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

Get these from your Supabase project settings.

---

## 🧪 Testing the Real AI

### Test Flow:
1. **Enter a prompt** in the hero card: "Weekend beach escape"
2. **AI processes** the request with real GPT-4
3. **Personalized results** based on your profile
4. **Save to vision board** for later
5. **Book the trip** directly from AI results

### What Makes It Smart:
- ✅ **Learns from your history** - Suggests similar destinations you enjoyed
- ✅ **Asia Miles optimization** - Maximizes your points automatically
- ✅ **Tier-aware** - Different suggestions for Marco Polo Gold vs Silver
- ✅ **Budget conscious** - Respects your spending preferences
- ✅ **Real-time data** - Can integrate with live flight/hotel APIs later

---

## 🚀 Advanced Features (Optional)

### 1. Real Flight Data Integration
Add Amadeus or Skyscanner API to get live prices:

```typescript
// In Edge Function
const flightResults = await fetch('https://api.amadeus.com/v2/shopping/flight-offers', {
  headers: { Authorization: `Bearer ${amadeus_token}` },
  // ... flight search params
})
```

### 2. User Authentication
Enable Supabase Auth for personalized experiences:

```typescript
// Sign up
const { data, error } = await supabase.auth.signUp({
  email: 'user@example.com',
  password: 'secure-password'
})

// Sign in
const { data, error } = await supabase.auth.signInWithPassword({
  email: 'user@example.com',
  password: 'secure-password'
})
```

### 3. Vision Board Sync
Store saved trips in Supabase for cross-device access:

```typescript
const { data: visionBoard } = await supabase
  .from('ai_trips')
  .select('*')
  .eq('saved_to_vision_board', true)
  .order('created_at', { ascending: false })
```

### 4. AI Chat Interface
Add conversational refinement:

```typescript
// User: "Make it cheaper"
// AI: Regenerates with budget hotels and economy flights

// User: "Add a beach day"
// AI: Inserts beach activities into itinerary
```

---

## 💰 Cost Estimates

### OpenAI GPT-4:
- **Input:** ~$0.03 per 1K tokens
- **Output:** ~$0.06 per 1K tokens
- **Per trip:** ~$0.01 - 0.03 (very affordable)
- **1000 trips:** ~$10-30

### Supabase:
- **Free tier:** 500MB database, 2GB bandwidth
- **Perfect for prototyping**
- **Upgrade:** $25/month for production

---

## 🔐 Security Best Practices

1. ✅ **Never expose API keys** in frontend code
2. ✅ **Use Row Level Security** (RLS) in Supabase
3. ✅ **Validate user input** in Edge Functions
4. ✅ **Rate limit** AI requests (prevent abuse)
5. ✅ **Don't store PII** unnecessarily

---

## 🆘 Troubleshooting

### "API key not found"
- Check environment variables in Edge Function settings
- Redeploy the Edge Function after adding variables

### "Not authenticated"
- Implement Supabase Auth sign-in flow
- Pass Authorization header with requests

### "OpenAI rate limit exceeded"
- Add delay between requests
- Upgrade OpenAI plan
- Implement request queuing

### "CORS error"
- Check corsHeaders are set correctly
- Ensure OPTIONS method is handled

---

## 📚 Additional Resources

- [Supabase Edge Functions Docs](https://supabase.com/docs/guides/functions)
- [OpenAI API Reference](https://platform.openai.com/docs/api-reference)
- [Supabase Row Level Security](https://supabase.com/docs/guides/auth/row-level-security)

---

## ✨ Next Steps

1. **Connect Supabase** (I can help with this via supabase_connect tool)
2. **Get OpenAI API key** 
3. **Run SQL setup**
4. **Deploy Edge Function**
5. **Test with real AI**
6. **Celebrate!** 🎉

Would you like me to help you connect to Supabase now?
