// Mock AI Trip Planner Service
// This simulates an AI-powered trip planner with intelligent responses

interface TripSuggestion {
  destination: string;
  country: string;
  duration: string;
  estimatedBudget: string;
  bestTimeToVisit: string;
  description: string;
  highlights: string[];
  flightOptions: FlightOption[];
  returnFlightOptions: FlightOption[];
  hotelOptions: HotelOption[];
  addOnOptions: AddOnOption[];
  itinerary: DayItinerary[];
  asiaMilesOptimization: {
    potentialEarnings: number;
    redemptionOptions: string[];
  };
}

interface FlightOption {
  airline: 'Cathay Pacific' | 'HK Express';
  flightNumber: string;
  departure: string;
  arrival: string;
  duration: string;
  price: number;
  asiaMiles: number;
  class: string;
  stops: number;
  via?: string;
  aircraft?: string;
}

interface HotelOption {
  name: string;
  rating: number;
  pricePerNight: number;
  asiaMilesRedemption?: number;
  location: string;
  amenities: string[];
}

interface AddOnOption {
  id: string;
  type: 'car' | 'insurance' | 'guide' | 'other';
  name: string;
  description: string;
  price: number;
  duration?: string;
  icon: 'car' | 'shield' | 'user' | 'shopping-bag';
  recommended?: boolean;
}

interface DayItinerary {
  day: number;
  title: string;
  activities: Activity[];
}

interface Activity {
  time: string;
  title: string;
  description: string;
  cost?: string;
  duration?: string;
  lat?: number;
  lng?: number;
  type?: 'attraction' | 'restaurant' | 'hotel' | 'transport' | 'city';
}

// AI-powered prompt parsing
function parseIntent(prompt: string): {
  destination?: string;
  duration?: string;
  vibe?: string;
  budget?: 'budget' | 'premium';
} {
  const lower = prompt.toLowerCase();
  
  // Parse duration
  let duration = '3-4 days';
  if (lower.includes('weekend')) duration = '2-3 days';
  if (lower.includes('two-day') || lower.includes('2-day')) duration = '2 days';
  if (lower.includes('three-day') || lower.includes('3-day')) duration = '3 days';
  if (lower.includes('week')) duration = '7 days';
  if (lower.includes('quick')) duration = '2-3 days';
  
  // Parse destination
  let destination: string | undefined;
  const destinations = ['tokyo', 'bali', 'bangkok', 'singapore', 'paris', 'london', 'sydney', 'dubai'];
  destinations.forEach(dest => {
    if (lower.includes(dest)) destination = dest;
  });
  
  // Parse vibe/theme
  let vibe = 'relaxing';
  if (lower.includes('warm') || lower.includes('beach')) vibe = 'beach';
  if (lower.includes('adventure') || lower.includes('active')) vibe = 'adventure';
  if (lower.includes('culture') || lower.includes('food')) vibe = 'cultural';
  if (lower.includes('city') || lower.includes('urban')) vibe = 'urban';
  if (lower.includes('escape') || lower.includes('relax')) vibe = 'relaxing';
  
  // Parse budget
  let budget: 'budget' | 'premium' = 'premium';
  if (lower.includes('budget') || lower.includes('cheap') || lower.includes('affordable')) {
    budget = 'budget';
  }
  
  return { destination, duration, vibe, budget };
}

// Generate smart trip suggestions based on prompt
export async function generateTripSuggestion(prompt: string): Promise<TripSuggestion> {
  // Simulate AI processing delay
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  const intent = parseIntent(prompt);
  
  // Smart destination selection based on intent
  let suggestion: TripSuggestion;
  
  if (intent.destination === 'tokyo') {
    suggestion = generateTokyoTrip(intent);
  } else if (intent.vibe === 'beach' || prompt.toLowerCase().includes('warm')) {
    suggestion = generateBaliTrip(intent);
  } else if (prompt.toLowerCase().includes('weekend') || prompt.toLowerCase().includes('escape')) {
    suggestion = generateBangkokTrip(intent);
  } else if (prompt.toLowerCase().includes('surprise')) {
    // Random surprise destination
    const surprises = [generateTokyoTrip(intent), generateBaliTrip(intent), generateDubaiTrip(intent)];
    suggestion = surprises[Math.floor(Math.random() * surprises.length)];
  } else {
    // Default to a popular destination
    suggestion = generateTokyoTrip(intent);
  }
  
  return suggestion;
}

function generateTokyoTrip(intent: any): TripSuggestion {
  return {
    destination: 'Tokyo',
    country: 'Japan',
    duration: intent.duration || '3-4 days',
    estimatedBudget: intent.budget === 'budget' ? 'HKD 8,000 - 12,000' : 'HKD 15,000 - 25,000',
    bestTimeToVisit: 'March-May (Cherry Blossoms) or October-November',
    description: 'Experience the perfect blend of ancient tradition and cutting-edge modernity in Japan\'s vibrant capital. From serene temples to neon-lit streets, Tokyo offers an unforgettable journey.',
    highlights: [
      'Cherry blossom viewing in Ueno Park',
      'Traditional sushi at Tsukiji Outer Market',
      'Shibuya Crossing & trendy Harajuku',
      'Ancient Senso-ji Temple in Asakusa',
      'Panoramic views from Tokyo Skytree',
      'Shopping in Ginza & Shinjuku'
    ],
    flightOptions: [
      // CX524 - 01:25 HKG → 06:30 NRT
      {
        airline: 'Cathay Pacific',
        flightNumber: 'CX524',
        departure: '01:25 HKG',
        arrival: '06:30 NRT',
        duration: '5h 05m',
        price: 4350,
        asiaMiles: 2170,
        class: 'Economy',
        stops: 0,
        aircraft: 'Airbus A330-300'
      },
      // CX526 - 08:15 HKG → 13:10 NRT
      {
        airline: 'Cathay Pacific',
        flightNumber: 'CX526',
        departure: '08:15 HKG',
        arrival: '13:10 NRT',
        duration: '4h 55m',
        price: 4450,
        asiaMiles: 2220,
        class: 'Economy',
        stops: 0,
        aircraft: 'Airbus A350-900'
      },
      // CX504 - 09:05 HKG → 14:10 NRT
      {
        airline: 'Cathay Pacific',
        flightNumber: 'CX504',
        departure: '09:05 HKG',
        arrival: '14:10 NRT',
        duration: '5h 05m',
        price: 4550,
        asiaMiles: 2270,
        class: 'Economy',
        stops: 0,
        aircraft: 'Boeing 777-300'
      },
      // CX548 - 08:55 HKG → 13:45 HND
      {
        airline: 'Cathay Pacific',
        flightNumber: 'CX548',
        departure: '08:55 HKG',
        arrival: '13:45 HND',
        duration: '4h 50m',
        price: 4650,
        asiaMiles: 2320,
        class: 'Economy',
        stops: 0,
        aircraft: 'Boeing 777-300'
      },
      // CX450 - 10:00 HKG → 16:50 NRT (1 Stop via TPE)
      {
        airline: 'Cathay Pacific',
        flightNumber: 'CX450',
        departure: '10:00 HKG',
        arrival: '16:50 NRT',
        duration: '6h 50m',
        price: 4850,
        asiaMiles: 2420,
        class: 'Economy',
        stops: 1,
        via: 'TPE',
        aircraft: 'Boeing 777-300'
      },
      // CX520 - 10:30 HKG → 15:35 NRT
      {
        airline: 'Cathay Pacific',
        flightNumber: 'CX520',
        departure: '10:30 HKG',
        arrival: '15:35 NRT',
        duration: '5h 05m',
        price: 5200,
        asiaMiles: 2600,
        class: 'Economy',
        stops: 0,
        aircraft: 'Boeing 777-300'
      },
      // CX500 - 15:25 HKG → 20:20 NRT
      {
        airline: 'Cathay Pacific',
        flightNumber: 'CX500',
        departure: '15:25 HKG',
        arrival: '20:20 NRT',
        duration: '4h 55m',
        price: 5350,
        asiaMiles: 2670,
        class: 'Economy',
        stops: 0,
        aircraft: 'Boeing 777-300'
      },
      // CX542 - 16:30 HKG → 21:15 HND
      {
        airline: 'Cathay Pacific',
        flightNumber: 'CX542',
        departure: '16:30 HKG',
        arrival: '21:15 HND',
        duration: '4h 45m',
        price: 5500,
        asiaMiles: 2750,
        class: 'Economy',
        stops: 0,
        aircraft: 'Boeing 777-300ER'
      },
      // Premium Economy
      {
        airline: 'Cathay Pacific',
        flightNumber: 'CX548',
        departure: '08:55 HKG',
        arrival: '13:45 HND',
        duration: '4h 50m',
        price: 6300,
        asiaMiles: 3150,
        class: 'Premium Economy',
        stops: 0,
        aircraft: 'Boeing 777-300'
      },
      {
        airline: 'Cathay Pacific',
        flightNumber: 'CX542',
        departure: '16:30 HKG',
        arrival: '21:15 HND',
        duration: '4h 45m',
        price: 7200,
        asiaMiles: 3600,
        class: 'Premium Economy',
        stops: 0,
        aircraft: 'Boeing 777-300ER'
      },
      // Business Class
      {
        airline: 'Cathay Pacific',
        flightNumber: 'CX524',
        departure: '01:25 HKG',
        arrival: '06:30 NRT',
        duration: '5h 05m',
        price: 13050,
        asiaMiles: 6520,
        class: 'Business',
        stops: 0,
        aircraft: 'Airbus A330-300'
      },
      {
        airline: 'Cathay Pacific',
        flightNumber: 'CX526',
        departure: '08:15 HKG',
        arrival: '13:10 NRT',
        duration: '4h 55m',
        price: 13350,
        asiaMiles: 6670,
        class: 'Business',
        stops: 0,
        aircraft: 'Airbus A350-900'
      },
      {
        airline: 'Cathay Pacific',
        flightNumber: 'CX504',
        departure: '09:05 HKG',
        arrival: '14:10 NRT',
        duration: '5h 05m',
        price: 13650,
        asiaMiles: 6820,
        class: 'Business',
        stops: 0,
        aircraft: 'Boeing 777-300'
      },
      {
        airline: 'Cathay Pacific',
        flightNumber: 'CX548',
        departure: '08:55 HKG',
        arrival: '13:45 HND',
        duration: '4h 50m',
        price: 14100,
        asiaMiles: 7050,
        class: 'Business',
        stops: 0,
        aircraft: 'Boeing 777-300'
      },
      {
        airline: 'Cathay Pacific',
        flightNumber: 'CX520',
        departure: '10:30 HKG',
        arrival: '15:35 NRT',
        duration: '5h 05m',
        price: 15600,
        asiaMiles: 7800,
        class: 'Business',
        stops: 0,
        aircraft: 'Boeing 777-300'
      },
      {
        airline: 'Cathay Pacific',
        flightNumber: 'CX500',
        departure: '15:25 HKG',
        arrival: '20:20 NRT',
        duration: '4h 55m',
        price: 16200,
        asiaMiles: 8100,
        class: 'Business',
        stops: 0,
        aircraft: 'Boeing 777-300'
      },
      {
        airline: 'Cathay Pacific',
        flightNumber: 'CX542',
        departure: '16:30 HKG',
        arrival: '21:15 HND',
        duration: '4h 45m',
        price: 16500,
        asiaMiles: 8250,
        class: 'Business',
        stops: 0,
        aircraft: 'Boeing 777-300ER'
      },
      // First Class
      {
        airline: 'Cathay Pacific',
        flightNumber: 'CX526',
        departure: '08:15 HKG',
        arrival: '13:10 NRT',
        duration: '4h 55m',
        price: 26500,
        asiaMiles: 13250,
        class: 'First',
        stops: 0,
        aircraft: 'Airbus A350-900'
      },
      {
        airline: 'Cathay Pacific',
        flightNumber: 'CX548',
        departure: '08:55 HKG',
        arrival: '13:45 HND',
        duration: '4h 50m',
        price: 28000,
        asiaMiles: 14000,
        class: 'First',
        stops: 0,
        aircraft: 'Boeing 777-300'
      },
      {
        airline: 'Cathay Pacific',
        flightNumber: 'CX542',
        departure: '16:30 HKG',
        arrival: '21:15 HND',
        duration: '4h 45m',
        price: 29500,
        asiaMiles: 14750,
        class: 'First',
        stops: 0,
        aircraft: 'Boeing 777-300ER'
      }
    ],
    returnFlightOptions: [
      // CX450 - 15:00 NRT → 20:40 HKG (1 Stop via TPE)
      {
        airline: 'Cathay Pacific',
        flightNumber: 'CX450',
        departure: '15:00 NRT',
        arrival: '20:40 HKG',
        duration: '5h 40m',
        price: 4200,
        asiaMiles: 2100,
        class: 'Economy',
        stops: 1,
        via: 'TPE',
        aircraft: 'Boeing 777-300'
      },
      // CX451 - 15:30 NRT → 21:45 HKG (1 Stop via TPE)
      {
        airline: 'Cathay Pacific',
        flightNumber: 'CX451',
        departure: '15:30 NRT',
        arrival: '21:45 HKG',
        duration: '6h 15m',
        price: 4300,
        asiaMiles: 2150,
        class: 'Economy',
        stops: 1,
        via: 'TPE',
        aircraft: 'Boeing 777-300'
      },
      // CX500 - 21:30 NRT → 02:00+1 HKG
      {
        airline: 'Cathay Pacific',
        flightNumber: 'CX500',
        departure: '21:30 NRT',
        arrival: '02:00+1 HKG',
        duration: '4h 30m',
        price: 4350,
        asiaMiles: 2170,
        class: 'Economy',
        stops: 0,
        aircraft: 'Boeing 777-300'
      },
      // CX509 - 09:00 NRT → 13:25 HKG
      {
        airline: 'Cathay Pacific',
        flightNumber: 'CX509',
        departure: '09:00 NRT',
        arrival: '13:25 HKG',
        duration: '4h 25m',
        price: 4450,
        asiaMiles: 2220,
        class: 'Economy',
        stops: 0,
        aircraft: 'Airbus A330-300'
      },
      // CX543 - 10:10 HND → 14:30 HKG
      {
        airline: 'Cathay Pacific',
        flightNumber: 'CX543',
        departure: '10:10 HND',
        arrival: '14:30 HKG',
        duration: '4h 20m',
        price: 4550,
        asiaMiles: 2270,
        class: 'Economy',
        stops: 0,
        aircraft: 'Boeing 777-300ER'
      },
      // CX527 - 14:20 NRT → 18:50 HKG
      {
        airline: 'Cathay Pacific',
        flightNumber: 'CX527',
        departure: '14:20 NRT',
        arrival: '18:50 HKG',
        duration: '4h 30m',
        price: 4950,
        asiaMiles: 2470,
        class: 'Economy',
        stops: 0,
        aircraft: 'Airbus A350-900'
      },
      // CX549 - 16:00 HND → 20:15 HKG
      {
        airline: 'Cathay Pacific',
        flightNumber: 'CX549',
        departure: '16:00 HND',
        arrival: '20:15 HKG',
        duration: '4h 15m',
        price: 5200,
        asiaMiles: 2600,
        class: 'Economy',
        stops: 0,
        aircraft: 'Boeing 777-300ER'
      },
      // CX521 - 16:45 NRT → 21:10 HKG
      {
        airline: 'Cathay Pacific',
        flightNumber: 'CX521',
        departure: '16:45 NRT',
        arrival: '21:10 HKG',
        duration: '4h 25m',
        price: 5300,
        asiaMiles: 2650,
        class: 'Economy',
        stops: 0,
        aircraft: 'Boeing 777-300'
      },
      // CX505 - 18:00 NRT → 22:20 HKG
      {
        airline: 'Cathay Pacific',
        flightNumber: 'CX505',
        departure: '18:00 NRT',
        arrival: '22:20 HKG',
        duration: '4h 20m',
        price: 5500,
        asiaMiles: 2750,
        class: 'Economy',
        stops: 0,
        aircraft: 'Boeing 777-300'
      },
      // CX520 - 19:55 NRT → 00:30+1 HKG
      {
        airline: 'Cathay Pacific',
        flightNumber: 'CX520',
        departure: '19:55 NRT',
        arrival: '00:30+1 HKG',
        duration: '4h 35m',
        price: 5600,
        asiaMiles: 2800,
        class: 'Economy',
        stops: 0,
        aircraft: 'Boeing 777-300'
      },
      {
        airline: 'Cathay Pacific',
        flightNumber: 'CX543',
        departure: '10:10 HND',
        arrival: '14:30 HKG',
        duration: '4h 20m',
        price: 6100,
        asiaMiles: 3050,
        class: 'Premium Economy',
        stops: 0,
        aircraft: 'Boeing 777-300ER'
      },
      {
        airline: 'Cathay Pacific',
        flightNumber: 'CX527',
        departure: '14:20 NRT',
        arrival: '18:50 HKG',
        duration: '4h 30m',
        price: 6600,
        asiaMiles: 3300,
        class: 'Premium Economy',
        stops: 0,
        aircraft: 'Airbus A350-900'
      },
      {
        airline: 'Cathay Pacific',
        flightNumber: 'CX549',
        departure: '16:00 HND',
        arrival: '20:15 HKG',
        duration: '4h 15m',
        price: 6900,
        asiaMiles: 3450,
        class: 'Premium Economy',
        stops: 0,
        aircraft: 'Boeing 777-300ER'
      },
      {
        airline: 'Cathay Pacific',
        flightNumber: 'CX521',
        departure: '16:45 NRT',
        arrival: '21:10 HKG',
        duration: '4h 25m',
        price: 7000,
        asiaMiles: 3500,
        class: 'Premium Economy',
        stops: 0,
        aircraft: 'Boeing 777-300'
      },
      {
        airline: 'Cathay Pacific',
        flightNumber: 'CX520',
        departure: '19:55 NRT',
        arrival: '00:30+1 HKG',
        duration: '4h 35m',
        price: 7400,
        asiaMiles: 3700,
        class: 'Premium Economy',
        stops: 0,
        aircraft: 'Boeing 777-300'
      },
      {
        airline: 'Cathay Pacific',
        flightNumber: 'CX450',
        departure: '15:00 NRT',
        arrival: '20:40 HKG',
        duration: '5h 40m',
        price: 12600,
        asiaMiles: 6300,
        class: 'Business',
        stops: 1,
        via: 'TPE',
        aircraft: 'Boeing 777-300'
      },
      {
        airline: 'Cathay Pacific',
        flightNumber: 'CX451',
        departure: '15:30 NRT',
        arrival: '21:45 HKG',
        duration: '6h 15m',
        price: 12900,
        asiaMiles: 6450,
        class: 'Business',
        stops: 1,
        via: 'TPE',
        aircraft: 'Boeing 777-300'
      },
      {
        airline: 'Cathay Pacific',
        flightNumber: 'CX500',
        departure: '21:30 NRT',
        arrival: '02:00+1 HKG',
        duration: '4h 30m',
        price: 13050,
        asiaMiles: 6520,
        class: 'Business',
        stops: 0,
        aircraft: 'Boeing 777-300'
      },
      {
        airline: 'Cathay Pacific',
        flightNumber: 'CX509',
        departure: '09:00 NRT',
        arrival: '13:25 HKG',
        duration: '4h 25m',
        price: 13350,
        asiaMiles: 6670,
        class: 'Business',
        stops: 0,
        aircraft: 'Airbus A330-300'
      },
      {
        airline: 'Cathay Pacific',
        flightNumber: 'CX543',
        departure: '10:10 HND',
        arrival: '14:30 HKG',
        duration: '4h 20m',
        price: 13650,
        asiaMiles: 6820,
        class: 'Business',
        stops: 0,
        aircraft: 'Boeing 777-300ER'
      },
      {
        airline: 'Cathay Pacific',
        flightNumber: 'CX527',
        departure: '14:20 NRT',
        arrival: '18:50 HKG',
        duration: '4h 30m',
        price: 14850,
        asiaMiles: 7420,
        class: 'Business',
        stops: 0,
        aircraft: 'Airbus A350-900'
      },
      {
        airline: 'Cathay Pacific',
        flightNumber: 'CX549',
        departure: '16:00 HND',
        arrival: '20:15 HKG',
        duration: '4h 15m',
        price: 15600,
        asiaMiles: 7800,
        class: 'Business',
        stops: 0,
        aircraft: 'Boeing 777-300ER'
      },
      {
        airline: 'Cathay Pacific',
        flightNumber: 'CX521',
        departure: '16:45 NRT',
        arrival: '21:10 HKG',
        duration: '4h 25m',
        price: 15900,
        asiaMiles: 7950,
        class: 'Business',
        stops: 0,
        aircraft: 'Boeing 777-300'
      },
      {
        airline: 'Cathay Pacific',
        flightNumber: 'CX505',
        departure: '18:00 NRT',
        arrival: '22:20 HKG',
        duration: '4h 20m',
        price: 16500,
        asiaMiles: 8250,
        class: 'Business',
        stops: 0,
        aircraft: 'Boeing 777-300'
      },
      {
        airline: 'Cathay Pacific',
        flightNumber: 'CX520',
        departure: '19:55 NRT',
        arrival: '00:30+1 HKG',
        duration: '4h 35m',
        price: 16800,
        asiaMiles: 8400,
        class: 'Business',
        stops: 0,
        aircraft: 'Boeing 777-300'
      },
      {
        airline: 'Cathay Pacific',
        flightNumber: 'CX549',
        departure: '16:00 HND',
        arrival: '20:15 HKG',
        duration: '4h 15m',
        price: 27500,
        asiaMiles: 13750,
        class: 'First',
        stops: 0,
        aircraft: 'Boeing 777-300ER'
      }
    ],
    hotelOptions: [
      {
        name: 'Park Hyatt Tokyo',
        rating: 5,
        pricePerNight: 3200,
        asiaMilesRedemption: 45000,
        location: 'Shinjuku',
        amenities: ['Spa', 'Michelin Restaurant', 'City Views', 'Pool']
      },
      {
        name: 'Hotel Gracery Shinjuku',
        rating: 4,
        pricePerNight: 850,
        location: 'Shinjuku',
        amenities: ['Godzilla Terrace', 'Central Location', 'Modern Rooms']
      }
    ],
    addOnOptions: [
      {
        id: 'tokyo-car-1',
        type: 'car',
        name: 'Cathay Pacific Car Rental - Compact',
        description: 'Toyota Aqua or similar via Hertz, GPS included, unlimited mileage',
        price: 1200,
        duration: '3 days',
        icon: 'car',
        recommended: false
      },
      {
        id: 'tokyo-insurance-1',
        type: 'insurance',
        name: 'Chubb Travel Insurance',
        description: 'Comprehensive coverage: medical, trip cancellation, baggage protection',
        price: 350,
        duration: 'Full trip',
        icon: 'shield',
        recommended: true
      },
      {
        id: 'tokyo-guide-1',
        type: 'guide',
        name: 'Private English Guide',
        description: 'Licensed local guide for personalized city tours and cultural insights',
        price: 2800,
        duration: 'Full day',
        icon: 'user',
        recommended: false
      },
      {
        id: 'tokyo-pocket-wifi',
        type: 'other',
        name: 'Pocket WiFi Rental',
        description: 'From Cathay Shop - Unlimited 4G data, connect up to 5 devices',
        price: 180,
        duration: '3 days',
        icon: 'shopping-bag',
        recommended: true
      },
      {
        id: 'tokyo-jr-pass',
        type: 'other',
        name: 'JR Pass (3-Day)',
        description: 'From Cathay Shop - Unlimited rides on JR trains including Shinkansen',
        price: 880,
        duration: '3 days',
        icon: 'shopping-bag',
        recommended: true
      }
    ],
    itinerary: [
      {
        day: 1,
        title: 'Arrival & Modern Tokyo',
        activities: [
          {
            time: '14:45',
            title: 'Arrive at Narita Airport',
            description: 'Take Narita Express to Tokyo (60 min)',
            cost: 'HKD 250',
            lat: 35.7647,
            lng: 140.3864,
            type: 'transport'
          },
          {
            time: '17:00',
            title: 'Check-in at Park Hyatt Tokyo',
            description: 'Settle into your hotel in Shinjuku',
            duration: '1h',
            lat: 35.6852,
            lng: 139.6923,
            type: 'hotel'
          },
          {
            time: '18:30',
            title: 'Shibuya Crossing & Dinner',
            description: 'World\'s busiest intersection, then izakaya dinner',
            cost: 'HKD 300',
            duration: '3h',
            lat: 35.6595,
            lng: 139.7004,
            type: 'attraction'
          }
        ]
      },
      {
        day: 2,
        title: 'Traditional Tokyo',
        activities: [
          {
            time: '08:00',
            title: 'Tsukiji Outer Market',
            description: 'Fresh sushi breakfast and market exploration',
            cost: 'HKD 200',
            duration: '2h',
            lat: 35.6654,
            lng: 139.7707,
            type: 'restaurant'
          },
          {
            time: '11:00',
            title: 'Senso-ji Temple, Asakusa',
            description: 'Tokyo\'s oldest Buddhist temple',
            duration: '2h',
            lat: 35.7148,
            lng: 139.7967,
            type: 'attraction'
          },
          {
            time: '14:00',
            title: 'Tokyo Skytree',
            description: 'Observation decks for panoramic city views',
            cost: 'HKD 180',
            duration: '2h',
            lat: 35.7101,
            lng: 139.8107,
            type: 'attraction'
          },
          {
            time: '19:00',
            title: 'Robot Restaurant Show',
            description: 'Unique dining entertainment in Shinjuku',
            cost: 'HKD 650',
            duration: '2h',
            lat: 35.6938,
            lng: 139.7036,
            type: 'restaurant'
          }
        ]
      },
      {
        day: 3,
        title: 'Modern Culture & Shopping',
        activities: [
          {
            time: '09:00',
            title: 'Meiji Shrine & Yoyogi Park',
            description: 'Peaceful shrine in forest setting',
            duration: '2h',
            lat: 35.6764,
            lng: 139.6993,
            type: 'attraction'
          },
          {
            time: '11:30',
            title: 'Harajuku & Takeshita Street',
            description: 'Youth fashion culture and quirky shops',
            duration: '2h',
            lat: 35.6702,
            lng: 139.7026,
            type: 'attraction'
          },
          {
            time: '14:00',
            title: 'teamLab Borderless',
            description: 'Immersive digital art museum',
            cost: 'HKD 280',
            duration: '2-3h',
            lat: 35.6252,
            lng: 139.7756,
            type: 'attraction'
          },
          {
            time: '19:00',
            title: 'Roppongi Dinner & Nightlife',
            description: 'Upscale dining at Gonpachi',
            cost: 'HKD 500',
            lat: 35.6619,
            lng: 139.7297,
            type: 'restaurant'
          }
        ]
      }
    ],
    asiaMilesOptimization: {
      potentialEarnings: 4840,
      redemptionOptions: [
        'Use 45,000 miles for 2 nights at Park Hyatt (save HKD 6,400)',
        'Upgrade to Business Class for 35,000 miles',
        'Redeem 15,000 miles for airport lounge access'
      ]
    }
  };
}

function generateBaliTrip(intent: any): TripSuggestion {
  return {
    destination: 'Bali',
    country: 'Indonesia',
    duration: '7 days',
    estimatedBudget: intent.budget === 'budget' ? 'HKD 8,000 - 12,000' : 'HKD 15,000 - 25,000',
    bestTimeToVisit: 'April-October (Dry Season)',
    description: 'Discover tropical paradise with pristine beaches, ancient temples, lush rice terraces, and world-class wellness retreats. Perfect for relaxation and cultural immersion.',
    highlights: [
      'Stunning beaches in Seminyak & Nusa Dua',
      'Sacred Uluwatu Temple sunset',
      'Tegallalang Rice Terraces',
      'Traditional Balinese spa treatments',
      'Ubud Monkey Forest',
      'Vibrant beach clubs & nightlife'
    ],
    flightOptions: [
      // CX785 - 10:15 HKG → 15:20 DPS
      {
        airline: 'Cathay Pacific',
        flightNumber: 'CX785',
        departure: '10:15 HKG',
        arrival: '15:20 DPS',
        duration: '5h 05m',
        price: 3200,
        asiaMiles: 1600,
        class: 'Economy',
        stops: 0,
        aircraft: 'Boeing 777-300'
      },
      // CX783 - 12:35 HKG → 17:40 DPS
      {
        airline: 'Cathay Pacific',
        flightNumber: 'CX783',
        departure: '12:35 HKG',
        arrival: '17:40 DPS',
        duration: '5h 05m',
        price: 3450,
        asiaMiles: 1725,
        class: 'Economy',
        stops: 0,
        aircraft: 'Boeing 777-300'
      },
      {
        airline: 'Cathay Pacific',
        flightNumber: 'CX785',
        departure: '10:15 HKG',
        arrival: '15:20 DPS',
        duration: '5h 05m',
        price: 4300,
        asiaMiles: 2150,
        class: 'Premium Economy',
        stops: 0,
        aircraft: 'Boeing 777-300'
      },
      {
        airline: 'Cathay Pacific',
        flightNumber: 'CX785',
        departure: '10:15 HKG',
        arrival: '15:20 DPS',
        duration: '5h 05m',
        price: 9600,
        asiaMiles: 4800,
        class: 'Business',
        stops: 0,
        aircraft: 'Boeing 777-300'
      },
      {
        airline: 'Cathay Pacific',
        flightNumber: 'CX783',
        departure: '12:35 HKG',
        arrival: '17:40 DPS',
        duration: '5h 05m',
        price: 10350,
        asiaMiles: 5170,
        class: 'Business',
        stops: 0,
        aircraft: 'Boeing 777-300'
      }
    ],
    returnFlightOptions: [
      // CX782 - 18:40 DPS → 23:45 HKG
      {
        airline: 'Cathay Pacific',
        flightNumber: 'CX782',
        departure: '18:40 DPS',
        arrival: '23:45 HKG',
        duration: '5h 05m',
        price: 3100,
        asiaMiles: 1550,
        class: 'Economy',
        stops: 0,
        aircraft: 'Boeing 777-300'
      },
      // CX784 - 16:20 DPS → 21:25 HKG
      {
        airline: 'Cathay Pacific',
        flightNumber: 'CX784',
        departure: '16:20 DPS',
        arrival: '21:25 HKG',
        duration: '5h 05m',
        price: 3300,
        asiaMiles: 1650,
        class: 'Economy',
        stops: 0,
        aircraft: 'Boeing 777-300'
      },
      {
        airline: 'Cathay Pacific',
        flightNumber: 'CX784',
        departure: '16:20 DPS',
        arrival: '21:25 HKG',
        duration: '5h 05m',
        price: 4450,
        asiaMiles: 2220,
        class: 'Premium Economy',
        stops: 0,
        aircraft: 'Boeing 777-300'
      },
      {
        airline: 'Cathay Pacific',
        flightNumber: 'CX782',
        departure: '18:40 DPS',
        arrival: '23:45 HKG',
        duration: '5h 05m',
        price: 9300,
        asiaMiles: 4650,
        class: 'Business',
        stops: 0,
        aircraft: 'Boeing 777-300'
      },
      {
        airline: 'Cathay Pacific',
        flightNumber: 'CX784',
        departure: '16:20 DPS',
        arrival: '21:25 HKG',
        duration: '5h 05m',
        price: 9900,
        asiaMiles: 4950,
        class: 'Business',
        stops: 0,
        aircraft: 'Boeing 777-300'
      }
    ],
    hotelOptions: [
      {
        name: 'Four Seasons Resort Bali',
        rating: 5,
        pricePerNight: 4500,
        asiaMilesRedemption: 60000,
        location: 'Jimbaran Bay',
        amenities: ['Private Villa', 'Infinity Pool', 'Beach Access', 'Spa']
      },
      {
        name: 'The Legian Seminyak',
        rating: 5,
        pricePerNight: 2200,
        asiaMilesRedemption: 35000,
        location: 'Seminyak Beach',
        amenities: ['Ocean View', 'Pool', 'Beach Club', 'Restaurant']
      }
    ],
    addOnOptions: [
      {
        id: 'bali-scooter-1',
        type: 'car',
        name: 'Cathay Pacific Car Rental - Scooter',
        description: 'Honda PCX or similar via Hertz, helmet included, perfect for Bali traffic',
        price: 420,
        duration: '7 days',
        icon: 'car',
        recommended: true
      },
      {
        id: 'bali-car-1',
        type: 'car',
        name: 'Cathay Pacific Car Rental - SUV with Driver',
        description: 'Private driver for 8 hours/day, air-conditioned SUV via Hertz',
        price: 3500,
        duration: '7 days',
        icon: 'car',
        recommended: false
      },
      {
        id: 'bali-insurance-1',
        type: 'insurance',
        name: 'Chubb Travel Insurance Plus',
        description: 'Enhanced coverage including adventure activities and scuba diving',
        price: 580,
        duration: 'Full trip',
        icon: 'shield',
        recommended: true
      },
      {
        id: 'bali-surf-guide',
        type: 'guide',
        name: 'Private Surf Instructor',
        description: 'Professional surf lessons at Canggu or Uluwatu',
        price: 1200,
        duration: '3 sessions',
        icon: 'user',
        recommended: false
      },
      {
        id: 'bali-spa-package',
        type: 'other',
        name: 'Spa Package (3 treatments)',
        description: 'Traditional Balinese massage, body scrub, and flower bath',
        price: 950,
        duration: '3 sessions',
        icon: 'shopping-bag',
        recommended: true
      }
    ],
    itinerary: [
      {
        day: 1,
        title: 'Arrival & Beach Sunset',
        activities: [
          {
            time: '13:15',
            title: 'Arrive at Ngurah Rai Airport',
            description: 'Private transfer to hotel in Seminyak (30 min)',
            cost: 'HKD 150',
            lat: -8.7467,
            lng: 115.1667,
            type: 'transport'
          },
          {
            time: '15:00',
            title: 'Check-in at The Legian Seminyak',
            description: 'Settle into your beachfront resort',
            duration: '2h',
            lat: -8.6915,
            lng: 115.1683,
            type: 'hotel'
          },
          {
            time: '18:00',
            title: 'Seminyak Beach Sunset',
            description: 'Beachfront dinner at Ku De Ta with stunning sunset views',
            cost: 'HKD 400',
            duration: '3h',
            lat: -8.6804,
            lng: 115.1639,
            type: 'restaurant'
          }
        ]
      },
      {
        day: 2,
        title: 'Ubud Culture & Nature',
        activities: [
          {
            time: '08:00',
            title: 'Tegallalang Rice Terraces',
            description: 'Iconic stepped rice paddies, jungle swing',
            cost: 'HKD 100',
            duration: '2h',
            lat: -8.4366,
            lng: 115.2781,
            type: 'attraction'
          },
          {
            time: '11:00',
            title: 'Ubud Monkey Forest',
            description: 'Sacred sanctuary with playful macaques',
            cost: 'HKD 50',
            duration: '1.5h',
            lat: -8.5189,
            lng: 115.2585,
            type: 'attraction'
          },
          {
            time: '14:00',
            title: 'Traditional Balinese Lunch',
            description: 'Authentic Indonesian cuisine at Locavore',
            cost: 'HKD 300',
            duration: '1.5h',
            lat: -8.5069,
            lng: 115.2625,
            type: 'restaurant'
          },
          {
            time: '16:00',
            title: 'Tirta Empul Temple',
            description: 'Holy spring water purification ritual',
            cost: 'HKD 80',
            duration: '2h',
            lat: -8.4156,
            lng: 115.3151,
            type: 'attraction'
          }
        ]
      },
      {
        day: 3,
        title: 'Beach & Wellness Day',
        activities: [
          {
            time: '10:00',
            title: 'Balinese Spa Treatment',
            description: 'Traditional massage at Theta Spa',
            cost: 'HKD 350',
            duration: '2h',
            lat: -8.6905,
            lng: 115.1685,
            type: 'attraction'
          },
          {
            time: '14:00',
            title: 'Potato Head Beach Club',
            description: 'Infinity pool, beach access, and lunch',
            cost: 'HKD 300',
            duration: '4h',
            lat: -8.6831,
            lng: 115.1626,
            type: 'restaurant'
          },
          {
            time: '19:00',
            title: 'Uluwatu Temple Sunset',
            description: 'Cliffside temple with Kecak fire dance',
            cost: 'HKD 150',
            duration: '3h',
            lat: -8.8291,
            lng: 115.0848,
            type: 'attraction'
          }
        ]
      },
      {
        day: 4,
        title: 'East Bali Adventure',
        activities: [
          {
            time: '07:00',
            title: 'Mount Batur Sunrise Trek',
            description: 'Hike active volcano for spectacular sunrise',
            cost: 'HKD 450',
            duration: '6h',
            lat: -8.2422,
            lng: 115.3753,
            type: 'attraction'
          },
          {
            time: '14:00',
            title: 'Lunch with Volcano Views',
            description: 'Traditional buffet overlooking Mount Batur',
            cost: 'HKD 150',
            duration: '1.5h',
            lat: -8.2381,
            lng: 115.3791,
            type: 'restaurant'
          },
          {
            time: '16:00',
            title: 'Tirta Gangga Water Palace',
            description: 'Beautiful water gardens and pools',
            cost: 'HKD 60',
            duration: '2h',
            lat: -8.4600,
            lng: 115.6042,
            type: 'attraction'
          },
          {
            time: '19:00',
            title: 'Seafood Dinner in Amed',
            description: 'Fresh catch of the day by the beach',
            cost: 'HKD 200',
            duration: '2h',
            lat: -8.3472,
            lng: 115.6636,
            type: 'restaurant'
          }
        ]
      },
      {
        day: 5,
        title: 'Nusa Penida Island Excursion',
        activities: [
          {
            time: '07:00',
            title: 'Fast Boat to Nusa Penida',
            description: 'Scenic 45-minute boat ride',
            cost: 'HKD 250',
            duration: '1h',
            lat: -8.7274,
            lng: 115.5447,
            type: 'transport'
          },
          {
            time: '09:00',
            title: 'Kelingking Beach (T-Rex)',
            description: 'Iconic cliff viewpoint and beach',
            cost: 'Free',
            duration: '2h',
            lat: -8.7548,
            lng: 115.4408,
            type: 'attraction'
          },
          {
            time: '12:00',
            title: 'Angel\'s Billabong & Broken Beach',
            description: 'Natural infinity pool and rock arch',
            cost: 'Free',
            duration: '2h',
            lat: -8.7381,
            lng: 115.4294,
            type: 'attraction'
          },
          {
            time: '15:00',
            title: 'Snorkeling at Crystal Bay',
            description: 'Swim with manta rays and tropical fish',
            cost: 'HKD 180',
            duration: '2h',
            lat: -8.7417,
            lng: 115.4728,
            type: 'attraction'
          },
          {
            time: '18:00',
            title: 'Return to Bali',
            description: 'Evening boat back to Sanur',
            cost: 'Included',
            duration: '1h',
            lat: -8.6915,
            lng: 115.1683,
            type: 'transport'
          }
        ]
      },
      {
        day: 6,
        title: 'Canggu & Tanah Lot',
        activities: [
          {
            time: '09:00',
            title: 'Surf Lesson at Batu Bolong',
            description: 'Beginner-friendly surf spot in Canggu',
            cost: 'HKD 280',
            duration: '2h',
            lat: -8.6564,
            lng: 115.1375,
            type: 'attraction'
          },
          {
            time: '12:00',
            title: 'Brunch at The Lawn Canggu',
            description: 'Beachfront cafe with healthy bowls',
            cost: 'HKD 150',
            duration: '1.5h',
            lat: -8.6492,
            lng: 115.1367,
            type: 'restaurant'
          },
          {
            time: '15:00',
            title: 'Explore Canggu\'s Cafes',
            description: 'Coffee tasting at Revolver Espresso',
            cost: 'HKD 80',
            duration: '2h',
            lat: -8.6475,
            lng: 115.1392,
            type: 'restaurant'
          },
          {
            time: '17:30',
            title: 'Tanah Lot Temple Sunset',
            description: 'Iconic sea temple at golden hour',
            cost: 'HKD 100',
            duration: '2h',
            lat: -8.6211,
            lng: 115.0870,
            type: 'attraction'
          },
          {
            time: '20:00',
            title: 'Seafood BBQ Dinner',
            description: 'Jimbaran Bay beachside dining',
            cost: 'HKD 350',
            duration: '2h',
            lat: -8.7698,
            lng: 115.1671,
            type: 'restaurant'
          }
        ]
      },
      {
        day: 7,
        title: 'Relaxation & Departure',
        activities: [
          {
            time: '09:00',
            title: 'Final Beach Morning',
            description: 'Relax by the pool or take a beach walk',
            cost: 'Free',
            duration: '3h',
            lat: -8.6915,
            lng: 115.1683,
            type: 'hotel'
          },
          {
            time: '12:00',
            title: 'Farewell Lunch',
            description: 'Last meal at Merah Putih restaurant',
            cost: 'HKD 280',
            duration: '2h',
            lat: -8.6680,
            lng: 115.2126,
            type: 'restaurant'
          },
          {
            time: '15:00',
            title: 'Hotel Check-out',
            description: 'Pack and prepare for departure',
            duration: '1h',
            lat: -8.6915,
            lng: 115.1683,
            type: 'hotel'
          },
          {
            time: '17:00',
            title: 'Airport Transfer',
            description: 'Private transfer to Ngurah Rai Airport',
            cost: 'HKD 150',
            duration: '1h',
            lat: -8.7467,
            lng: 115.1667,
            type: 'transport'
          }
        ]
      }
    ],
    asiaMilesOptimization: {
      potentialEarnings: 3200,
      redemptionOptions: [
        'Use 60,000 miles for 3 nights at Four Seasons (save HKD 13,500)',
        'Redeem 10,000 miles for spa credits',
        'Use miles for room upgrades to private villa'
      ]
    }
  };
}

function generateBangkokTrip(intent: any): TripSuggestion {
  return {
    destination: 'Bangkok',
    country: 'Thailand',
    duration: '2-3 days',
    estimatedBudget: intent.budget === 'budget' ? 'HKD 3,500 - 6,000' : 'HKD 8,000 - 15,000',
    bestTimeToVisit: 'November-February (Cool & Dry)',
    description: 'A vibrant metropolis where golden temples meet modern skyscrapers. Experience world-class street food, bustling markets, and legendary nightlife in this dynamic Southeast Asian capital.',
    highlights: [
      'Grand Palace & Wat Phra Kaew',
      'Floating markets & boat tours',
      'Legendary street food scene',
      'Rooftop bars with skyline views',
      'Chatuchak Weekend Market',
      'Traditional Thai massage'
    ],
    flightOptions: [
      // CX705 - 08:30 HKG → 10:40 BKK
      {
        airline: 'Cathay Pacific',
        flightNumber: 'CX705',
        departure: '08:30 HKG',
        arrival: '10:40 BKK',
        duration: '2h 10m',
        price: 1950,
        asiaMiles: 975,
        class: 'Economy',
        stops: 0,
        aircraft: 'Boeing 777-300'
      },
      {
        airline: 'Cathay Pacific',
        flightNumber: 'CX717',
        departure: '09:10 HKG',
        arrival: '11:15 BKK',
        duration: '2h 05m',
        price: 2000,
        asiaMiles: 1000,
        class: 'Economy',
        stops: 0,
        aircraft: 'Boeing 777-300'
      },
      {
        airline: 'Cathay Pacific',
        flightNumber: 'CX615',
        departure: '09:55 HKG',
        arrival: '12:05 BKK',
        duration: '2h 10m',
        price: 2050,
        asiaMiles: 1025,
        class: 'Economy',
        stops: 0,
        aircraft: 'Airbus A321neo'
      },
      {
        airline: 'Cathay Pacific',
        flightNumber: 'CX653',
        departure: '12:00 HKG',
        arrival: '14:05 BKK',
        duration: '2h 05m',
        price: 2100,
        asiaMiles: 1050,
        class: 'Economy',
        stops: 0,
        aircraft: 'Airbus A330-300'
      },
      {
        airline: 'Cathay Pacific',
        flightNumber: 'CX789',
        departure: '13:45 HKG',
        arrival: '15:55 BKK',
        duration: '2h 10m',
        price: 2150,
        asiaMiles: 1075,
        class: 'Economy',
        stops: 0,
        aircraft: 'Airbus A330-300'
      },
      {
        airline: 'Cathay Pacific',
        flightNumber: 'CX751',
        departure: '14:30 HKG',
        arrival: '16:40 BKK',
        duration: '2h 10m',
        price: 2200,
        asiaMiles: 1100,
        class: 'Economy',
        stops: 0,
        aircraft: 'Boeing 777-300'
      },
      {
        airline: 'Cathay Pacific',
        flightNumber: 'CX701',
        departure: '16:05 HKG',
        arrival: '18:15 BKK',
        duration: '2h 10m',
        price: 2250,
        asiaMiles: 1125,
        class: 'Economy',
        stops: 0,
        aircraft: 'Boeing 777-300'
      },
      {
        airline: 'Cathay Pacific',
        flightNumber: 'CX617',
        departure: '22:10 HKG',
        arrival: '00:15+1 BKK',
        duration: '2h 05m',
        price: 2300,
        asiaMiles: 1150,
        class: 'Economy',
        stops: 0,
        aircraft: 'Airbus A330-300'
      },
      // Premium Economy - only CX706 and CX789
      {
        airline: 'Cathay Pacific',
        flightNumber: 'CX706',
        departure: '16:55 HKG',
        arrival: '19:05 BKK',
        duration: '2h 10m',
        price: 3200,
        asiaMiles: 1600,
        class: 'Premium Economy',
        stops: 0,
        aircraft: 'Airbus A330-300'
      },
      {
        airline: 'Cathay Pacific',
        flightNumber: 'CX789',
        departure: '13:45 HKG',
        arrival: '15:55 BKK',
        duration: '2h 10m',
        price: 3100,
        asiaMiles: 1550,
        class: 'Premium Economy',
        stops: 0,
        aircraft: 'Airbus A330-300'
      },
      // Business Class - All flights
      {
        airline: 'Cathay Pacific',
        flightNumber: 'CX705',
        departure: '08:30 HKG',
        arrival: '10:40 BKK',
        duration: '2h 10m',
        price: 5850,
        asiaMiles: 2925,
        class: 'Business',
        stops: 0,
        aircraft: 'Boeing 777-300'
      },
      {
        airline: 'Cathay Pacific',
        flightNumber: 'CX717',
        departure: '09:10 HKG',
        arrival: '11:15 BKK',
        duration: '2h 05m',
        price: 6000,
        asiaMiles: 3000,
        class: 'Business',
        stops: 0,
        aircraft: 'Boeing 777-300'
      },
      {
        airline: 'Cathay Pacific',
        flightNumber: 'CX615',
        departure: '09:55 HKG',
        arrival: '12:05 BKK',
        duration: '2h 10m',
        price: 6150,
        asiaMiles: 3075,
        class: 'Business',
        stops: 0,
        aircraft: 'Airbus A321neo'
      },
      {
        airline: 'Cathay Pacific',
        flightNumber: 'CX653',
        departure: '12:00 HKG',
        arrival: '14:05 BKK',
        duration: '2h 05m',
        price: 6300,
        asiaMiles: 3150,
        class: 'Business',
        stops: 0,
        aircraft: 'Airbus A330-300'
      },
      {
        airline: 'Cathay Pacific',
        flightNumber: 'CX789',
        departure: '13:45 HKG',
        arrival: '15:55 BKK',
        duration: '2h 10m',
        price: 6450,
        asiaMiles: 3225,
        class: 'Business',
        stops: 0,
        aircraft: 'Airbus A330-300'
      },
      {
        airline: 'Cathay Pacific',
        flightNumber: 'CX751',
        departure: '14:30 HKG',
        arrival: '16:40 BKK',
        duration: '2h 10m',
        price: 6600,
        asiaMiles: 3300,
        class: 'Business',
        stops: 0,
        aircraft: 'Boeing 777-300'
      },
      {
        airline: 'Cathay Pacific',
        flightNumber: 'CX701',
        departure: '16:05 HKG',
        arrival: '18:15 BKK',
        duration: '2h 10m',
        price: 6750,
        asiaMiles: 3375,
        class: 'Business',
        stops: 0,
        aircraft: 'Boeing 777-300'
      },
      {
        airline: 'Cathay Pacific',
        flightNumber: 'CX706',
        departure: '16:55 HKG',
        arrival: '19:05 BKK',
        duration: '2h 10m',
        price: 6900,
        asiaMiles: 3450,
        class: 'Business',
        stops: 0,
        aircraft: 'Airbus A330-300'
      },
      {
        airline: 'Cathay Pacific',
        flightNumber: 'CX617',
        departure: '22:10 HKG',
        arrival: '00:15+1 BKK',
        duration: '2h 05m',
        price: 7050,
        asiaMiles: 3525,
        class: 'Business',
        stops: 0,
        aircraft: 'Airbus A330-300'
      }
    ],
    returnFlightOptions: [
      // CX756 - 07:55 BKK → 11:45 HKG
      {
        airline: 'Cathay Pacific',
        flightNumber: 'CX756',
        departure: '07:55 BKK',
        arrival: '11:45 HKG',
        duration: '3h 50m',
        price: 1950,
        asiaMiles: 975,
        class: 'Economy',
        stops: 0,
        aircraft: 'Airbus A330-300'
      },
      {
        airline: 'Cathay Pacific',
        flightNumber: 'CX750',
        departure: '11:40 BKK',
        arrival: '15:30 HKG',
        duration: '3h 50m',
        price: 2000,
        asiaMiles: 1000,
        class: 'Economy',
        stops: 0,
        aircraft: 'Boeing 777-300'
      },
      {
        airline: 'Cathay Pacific',
        flightNumber: 'CX788',
        departure: '12:45 BKK',
        arrival: '16:40 HKG',
        duration: '3h 55m',
        price: 2050,
        asiaMiles: 1025,
        class: 'Economy',
        stops: 0,
        aircraft: 'Boeing 777-300'
      },
      {
        airline: 'Cathay Pacific',
        flightNumber: 'CX618',
        departure: '13:05 BKK',
        arrival: '17:00 HKG',
        duration: '3h 55m',
        price: 2100,
        asiaMiles: 1050,
        class: 'Economy',
        stops: 0,
        aircraft: 'Airbus A321neo'
      },
      {
        airline: 'Cathay Pacific',
        flightNumber: 'CX674',
        departure: '15:05 BKK',
        arrival: '19:00 HKG',
        duration: '3h 55m',
        price: 2150,
        asiaMiles: 1075,
        class: 'Economy',
        stops: 0,
        aircraft: 'Airbus A330-300'
      },
      {
        airline: 'Cathay Pacific',
        flightNumber: 'CX706',
        departure: '16:55 BKK',
        arrival: '20:40 HKG',
        duration: '3h 45m',
        price: 2200,
        asiaMiles: 1100,
        class: 'Economy',
        stops: 0,
        aircraft: 'Airbus A330-300'
      },
      {
        airline: 'Cathay Pacific',
        flightNumber: 'CX708',
        departure: '17:40 BKK',
        arrival: '21:30 HKG',
        duration: '3h 50m',
        price: 2250,
        asiaMiles: 1125,
        class: 'Economy',
        stops: 0,
        aircraft: 'Boeing 777-300'
      },
      {
        airline: 'Cathay Pacific',
        flightNumber: 'CX702',
        departure: '19:15 BKK',
        arrival: '23:00 HKG',
        duration: '3h 45m',
        price: 2300,
        asiaMiles: 1150,
        class: 'Economy',
        stops: 0,
        aircraft: 'Boeing 777-300'
      },
      // Premium Economy - only CX706 and CX789
      {
        airline: 'Cathay Pacific',
        flightNumber: 'CX706',
        departure: '16:55 BKK',
        arrival: '20:40 HKG',
        duration: '3h 45m',
        price: 3200,
        asiaMiles: 1600,
        class: 'Premium Economy',
        stops: 0,
        aircraft: 'Airbus A330-300'
      },
      {
        airline: 'Cathay Pacific',
        flightNumber: 'CX788',
        departure: '12:45 BKK',
        arrival: '16:40 HKG',
        duration: '3h 55m',
        price: 3100,
        asiaMiles: 1550,
        class: 'Premium Economy',
        stops: 0,
        aircraft: 'Boeing 777-300'
      },
      // Business Class - All flights
      {
        airline: 'Cathay Pacific',
        flightNumber: 'CX756',
        departure: '07:55 BKK',
        arrival: '11:45 HKG',
        duration: '3h 50m',
        price: 5850,
        asiaMiles: 2925,
        class: 'Business',
        stops: 0,
        aircraft: 'Airbus A330-300'
      },
      {
        airline: 'Cathay Pacific',
        flightNumber: 'CX750',
        departure: '11:40 BKK',
        arrival: '15:30 HKG',
        duration: '3h 50m',
        price: 6000,
        asiaMiles: 3000,
        class: 'Business',
        stops: 0,
        aircraft: 'Boeing 777-300'
      },
      {
        airline: 'Cathay Pacific',
        flightNumber: 'CX788',
        departure: '12:45 BKK',
        arrival: '16:40 HKG',
        duration: '3h 55m',
        price: 6150,
        asiaMiles: 3075,
        class: 'Business',
        stops: 0,
        aircraft: 'Boeing 777-300'
      },
      {
        airline: 'Cathay Pacific',
        flightNumber: 'CX618',
        departure: '13:05 BKK',
        arrival: '17:00 HKG',
        duration: '3h 55m',
        price: 6300,
        asiaMiles: 3150,
        class: 'Business',
        stops: 0,
        aircraft: 'Airbus A321neo'
      },
      {
        airline: 'Cathay Pacific',
        flightNumber: 'CX674',
        departure: '15:05 BKK',
        arrival: '19:00 HKG',
        duration: '3h 55m',
        price: 6450,
        asiaMiles: 3225,
        class: 'Business',
        stops: 0,
        aircraft: 'Airbus A330-300'
      },
      {
        airline: 'Cathay Pacific',
        flightNumber: 'CX706',
        departure: '16:55 BKK',
        arrival: '20:40 HKG',
        duration: '3h 45m',
        price: 6600,
        asiaMiles: 3300,
        class: 'Business',
        stops: 0,
        aircraft: 'Airbus A330-300'
      },
      {
        airline: 'Cathay Pacific',
        flightNumber: 'CX708',
        departure: '17:40 BKK',
        arrival: '21:30 HKG',
        duration: '3h 50m',
        price: 6750,
        asiaMiles: 3375,
        class: 'Business',
        stops: 0,
        aircraft: 'Boeing 777-300'
      },
      {
        airline: 'Cathay Pacific',
        flightNumber: 'CX702',
        departure: '19:15 BKK',
        arrival: '23:00 HKG',
        duration: '3h 45m',
        price: 6900,
        asiaMiles: 3450,
        class: 'Business',
        stops: 0,
        aircraft: 'Boeing 777-300'
      }
    ],
    hotelOptions: [
      {
        name: 'Mandarin Oriental Bangkok',
        rating: 5,
        pricePerNight: 2800,
        asiaMilesRedemption: 40000,
        location: 'Riverside',
        amenities: ['River View', 'Legendary Service', 'Spa', 'Michelin Dining']
      },
      {
        name: 'Mode Sathorn Hotel',
        rating: 4,
        pricePerNight: 680,
        location: 'Sathorn',
        amenities: ['Rooftop Pool', 'Modern Design', 'BTS Access']
      }
    ],
    addOnOptions: [
      {
        id: 'bangkok-insurance-1',
        type: 'insurance',
        name: 'Chubb Weekend Travel Insurance',
        description: 'Essential coverage for short trips: medical, baggage, delays',
        price: 180,
        duration: 'Full trip',
        icon: 'shield',
        recommended: true
      },
      {
        id: 'bangkok-food-tour',
        type: 'guide',
        name: 'Private Food Tour Guide',
        description: 'Expert-led evening street food tour through Chinatown',
        price: 850,
        duration: 'One evening',
        icon: 'user',
        recommended: true
      },
      {
        id: 'bangkok-massage',
        type: 'other',
        name: 'Thai Massage Package',
        description: '3 sessions of traditional Thai massage at top-rated spa',
        price: 420,
        duration: '3 sessions',
        icon: 'shopping-bag',
        recommended: false
      },
      {
        id: 'bangkok-sim-card',
        type: 'other',
        name: 'Thailand SIM Card',
        description: 'From Cathay Shop - 20GB data + unlimited calls for 7 days',
        price: 120,
        duration: '7 days',
        icon: 'shopping-bag',
        recommended: true
      }
    ],
    itinerary: [
      {
        day: 1,
        title: 'Temples & Markets',
        activities: [
          {
            time: '10:25',
            title: 'Arrive at Suvarnabhumi Airport',
            description: 'Airport Rail Link to city center (30 min)',
            cost: 'HKD 35',
            lat: 13.6900,
            lng: 100.7501,
            type: 'transport'
          },
          {
            time: '12:00',
            title: 'Check-in & Lunch',
            description: 'Som Tam Nua for authentic Thai cuisine',
            cost: 'HKD 80',
            duration: '2h',
            lat: 13.7439,
            lng: 100.5510,
            type: 'restaurant'
          },
          {
            time: '14:30',
            title: 'Grand Palace & Wat Phra Kaew',
            description: 'Thailand\'s most sacred Buddhist temple',
            cost: 'HKD 120',
            duration: '3h',
            lat: 13.7500,
            lng: 100.4915,
            type: 'attraction'
          },
          {
            time: '18:00',
            title: 'Chao Phraya River Cruise',
            description: 'Sunset dinner cruise along the river',
            cost: 'HKD 280',
            duration: '2h',
            lat: 13.7435,
            lng: 100.5059,
            type: 'restaurant'
          }
        ]
      },
      {
        day: 2,
        title: 'Markets & Street Food',
        activities: [
          {
            time: '07:00',
            title: 'Damnoen Saduak Floating Market',
            description: 'Traditional floating market boat tour',
            cost: 'HKD 300',
            duration: '4h',
            lat: 13.5167,
            lng: 99.9550,
            type: 'attraction'
          },
          {
            time: '14:00',
            title: 'Chatuchak Weekend Market',
            description: 'Massive market with 15,000+ stalls',
            duration: '3h',
            lat: 13.7998,
            lng: 100.5500,
            type: 'attraction'
          },
          {
            time: '18:00',
            title: 'Street Food Tour',
            description: 'Legendary Yaowarat (Chinatown) food tour',
            cost: 'HKD 200',
            duration: '3h',
            lat: 13.7398,
            lng: 100.5080,
            type: 'restaurant'
          },
          {
            time: '21:30',
            title: 'Sky Bar at Lebua',
            description: 'Panoramic views from the 63rd floor',
            cost: 'HKD 250',
            duration: '2h',
            lat: 13.7246,
            lng: 100.5117,
            type: 'restaurant'
          }
        ]
      }
    ],
    asiaMilesOptimization: {
      potentialEarnings: 2100,
      redemptionOptions: [
        'Use 40,000 miles for 2 nights at Mandarin Oriental (save HKD 5,600)',
        'Redeem 8,000 miles for spa day',
        'Use 5,000 miles for airport lounge access'
      ]
    }
  };
}

function generateDubaiTrip(intent: any): TripSuggestion {
  return {
    destination: 'Dubai',
    country: 'United Arab Emirates',
    duration: '7 days',
    estimatedBudget: intent.budget === 'budget' ? 'HKD 12,000 - 18,000' : 'HKD 25,000 - 40,000',
    bestTimeToVisit: 'November-March (Mild Weather)',
    description: 'A futuristic desert oasis where record-breaking architecture meets Arabian luxury. Experience world-class shopping, desert adventures, and opulent experiences.',
    highlights: [
      'Burj Khalifa - World\'s tallest building',
      'Desert safari with dune bashing',
      'Dubai Mall & Gold Souk shopping',
      'Palm Jumeirah luxury resorts',
      'Traditional souks & modern marvels',
      'World-class dining & nightlife'
    ],
    flightOptions: [
      // CX731 - 17:15 HKG → 22:05 DXB
      {
        airline: 'Cathay Pacific',
        flightNumber: 'CX731',
        departure: '17:15 HKG',
        arrival: '22:05 DXB',
        duration: '8h 50m',
        price: 5500,
        asiaMiles: 2750,
        class: 'Economy',
        stops: 0,
        aircraft: 'Airbus A350-900'
      },
      {
        airline: 'Cathay Pacific',
        flightNumber: 'CX731',
        departure: '17:15 HKG',
        arrival: '22:05 DXB',
        duration: '8h 50m',
        price: 7500,
        asiaMiles: 3750,
        class: 'Premium Economy',
        stops: 0,
        aircraft: 'Airbus A350-900'
      },
      {
        airline: 'Cathay Pacific',
        flightNumber: 'CX731',
        departure: '17:15 HKG',
        arrival: '22:05 DXB',
        duration: '8h 50m',
        price: 19000,
        asiaMiles: 9500,
        class: 'Business',
        stops: 0,
        aircraft: 'Airbus A350-900'
      }
    ],
    returnFlightOptions: [
      // CX738 - 23:35 DXB → 10:45+1 HKG
      {
        airline: 'Cathay Pacific',
        flightNumber: 'CX738',
        departure: '23:35 DXB',
        arrival: '10:45+1 HKG',
        duration: '7h 10m',
        price: 5800,
        asiaMiles: 2900,
        class: 'Economy',
        stops: 0,
        aircraft: 'Airbus A350-900'
      },
      {
        airline: 'Cathay Pacific',
        flightNumber: 'CX738',
        departure: '23:35 DXB',
        arrival: '10:45+1 HKG',
        duration: '7h 10m',
        price: 7800,
        asiaMiles: 3900,
        class: 'Premium Economy',
        stops: 0,
        aircraft: 'Airbus A350-900'
      },
      {
        airline: 'Cathay Pacific',
        flightNumber: 'CX738',
        departure: '23:35 DXB',
        arrival: '10:45+1 HKG',
        duration: '7h 10m',
        price: 19500,
        asiaMiles: 9750,
        class: 'Business',
        stops: 0,
        aircraft: 'Airbus A350-900'
      }
    ],
    hotelOptions: [
      {
        name: 'Burj Al Arab',
        rating: 5,
        pricePerNight: 12000,
        location: 'Jumeirah Beach',
        amenities: ['All-Suite', '24k Gold iPad', 'Butler Service', 'Private Beach']
      },
      {
        name: 'Atlantis The Palm',
        rating: 5,
        pricePerNight: 3500,
        asiaMilesRedemption: 55000,
        location: 'Palm Jumeirah',
        amenities: ['Waterpark', 'Aquarium', 'Beach Access', 'Multiple Pools']
      }
    ],
    addOnOptions: [
      {
        id: 'dubai-car-luxury',
        type: 'car',
        name: 'Cathay Pacific Car Rental - Luxury SUV',
        description: 'Range Rover or similar via Hertz, premium insurance, valet service',
        price: 5600,
        duration: '7 days',
        icon: 'car',
        recommended: false
      },
      {
        id: 'dubai-car-standard',
        type: 'car',
        name: 'Cathay Pacific Car Rental - Standard',
        description: 'Toyota Camry or similar via Hertz, GPS, full insurance',
        price: 2100,
        duration: '7 days',
        icon: 'car',
        recommended: true
      },
      {
        id: 'dubai-insurance-1',
        type: 'insurance',
        name: 'Chubb Premium Travel Insurance',
        description: 'Comprehensive coverage including medical evacuation up to USD 1M',
        price: 720,
        duration: 'Full trip',
        icon: 'shield',
        recommended: true
      },
      {
        id: 'dubai-desert-safari',
        type: 'other',
        name: 'VIP Desert Safari Package',
        description: 'Private 4x4, dune bashing, falcon experience, gourmet dinner',
        price: 1800,
        duration: 'Full day',
        icon: 'shopping-bag',
        recommended: true
      },
      {
        id: 'dubai-burj-khalifa',
        type: 'other',
        name: 'Burj Khalifa At The Top SKY',
        description: 'Level 148 access with personal tour guide',
        price: 520,
        duration: '2 hours',
        icon: 'shopping-bag',
        recommended: false
      },
      {
        id: 'dubai-yacht',
        type: 'guide',
        name: 'Private Yacht Charter',
        description: '4-hour luxury yacht cruise with captain and crew',
        price: 3200,
        duration: '4 hours',
        icon: 'user',
        recommended: false
      }
    ],
    itinerary: [
      {
        day: 1,
        title: 'Arrival & Modern Dubai',
        activities: [
          {
            time: '04:30',
            title: 'Arrive at Dubai International',
            description: 'Metro to hotel (45 min)',
            cost: 'HKD 25',
            lat: 25.2532,
            lng: 55.3657,
            type: 'transport'
          },
          {
            time: '16:00',
            title: 'Burj Khalifa At The Top',
            description: 'Observation deck on 124th & 125th floors',
            cost: 'HKD 350',
            duration: '2h',
            lat: 25.1972,
            lng: 55.2744,
            type: 'attraction'
          },
          {
            time: '19:00',
            title: 'Dubai Fountain Show & Dinner',
            description: 'World\'s largest choreographed fountain',
            cost: 'HKD 500',
            duration: '3h',
            lat: 25.1956,
            lng: 55.2753,
            type: 'restaurant'
          }
        ]
      },
      {
        day: 2,
        title: 'Old Dubai & Desert Safari',
        activities: [
          {
            time: '09:00',
            title: 'Gold & Spice Souks',
            description: 'Traditional markets in Deira',
            duration: '2h',
            lat: 25.2697,
            lng: 55.3094,
            type: 'attraction'
          },
          {
            time: '11:30',
            title: 'Al Fahidi Historical District',
            description: 'Heritage area with Dubai Museum',
            cost: 'HKD 50',
            duration: '2h',
            lat: 25.2632,
            lng: 55.2972,
            type: 'attraction'
          },
          {
            time: '15:00',
            title: 'Desert Safari Premium',
            description: 'Dune bashing, camel ride, BBQ dinner',
            cost: 'HKD 800',
            duration: '6h',
            lat: 24.8607,
            lng: 55.7803,
            type: 'attraction'
          }
        ]
      },
      {
        day: 3,
        title: 'Palm Jumeirah & Atlantis',
        activities: [
          {
            time: '09:00',
            title: 'Aquaventure Waterpark',
            description: 'World-class water slides and rides',
            cost: 'HKD 450',
            duration: '4h',
            lat: 25.1308,
            lng: 55.1174,
            type: 'attraction'
          },
          {
            time: '14:00',
            title: 'The Lost Chambers Aquarium',
            description: 'Underwater world at Atlantis',
            cost: 'HKD 200',
            duration: '2h',
            lat: 25.1306,
            lng: 55.1166,
            type: 'attraction'
          },
          {
            time: '17:00',
            title: 'The Pointe Waterfront',
            description: 'Shopping, dining and fountain shows',
            cost: 'HKD 300',
            duration: '3h',
            lat: 25.1253,
            lng: 55.1377,
            type: 'restaurant'
          },
          {
            time: '20:30',
            title: 'Atlantis Fountain Show',
            description: 'Evening water and light spectacular',
            cost: 'Free',
            duration: '30min',
            lat: 25.1308,
            lng: 55.1174,
            type: 'attraction'
          }
        ]
      },
      {
        day: 4,
        title: 'Dubai Marina & Beach',
        activities: [
          {
            time: '08:00',
            title: 'Breakfast at Baker & Spice',
            description: 'Artisan bakery in Souk Al Bahar',
            cost: 'HKD 150',
            duration: '1h',
            lat: 25.1945,
            lng: 55.2756,
            type: 'restaurant'
          },
          {
            time: '10:00',
            title: 'Jumeirah Beach',
            description: 'Relax at public beach with Burj Al Arab views',
            cost: 'Free',
            duration: '3h',
            lat: 25.1413,
            lng: 55.1852,
            type: 'attraction'
          },
          {
            time: '15:00',
            title: 'Dubai Marina Walk',
            description: 'Waterfront promenade shopping',
            duration: '2h',
            lat: 25.0805,
            lng: 55.1410,
            type: 'attraction'
          },
          {
            time: '18:00',
            title: 'Dhow Cruise Dinner',
            description: 'Traditional boat cruise with buffet',
            cost: 'HKD 350',
            duration: '2h',
            lat: 25.0763,
            lng: 55.1329,
            type: 'restaurant'
          }
        ]
      },
      {
        day: 5,
        title: 'Abu Dhabi Day Trip',
        activities: [
          {
            time: '08:00',
            title: 'Drive to Abu Dhabi',
            description: 'Scenic 1.5 hour drive',
            cost: 'HKD 200',
            duration: '1.5h',
            lat: 24.4539,
            lng: 54.3773,
            type: 'transport'
          },
          {
            time: '10:00',
            title: 'Sheikh Zayed Grand Mosque',
            description: 'Stunning white marble mosque',
            cost: 'Free',
            duration: '2h',
            lat: 24.4128,
            lng: 54.4747,
            type: 'attraction'
          },
          {
            time: '13:00',
            title: 'Lunch at Emirates Palace',
            description: '7-star hotel luxury dining',
            cost: 'HKD 600',
            duration: '2h',
            lat: 24.4617,
            lng: 54.3178,
            type: 'restaurant'
          },
          {
            time: '16:00',
            title: 'Louvre Abu Dhabi',
            description: 'Art and civilization museum',
            cost: 'HKD 150',
            duration: '2h',
            lat: 24.5338,
            lng: 54.3983,
            type: 'attraction'
          },
          {
            time: '19:00',
            title: 'Return to Dubai',
            description: 'Evening drive back',
            cost: 'Included',
            duration: '1.5h',
            lat: 25.2048,
            lng: 55.2708,
            type: 'transport'
          }
        ]
      },
      {
        day: 6,
        title: 'Modern Dubai Experiences',
        activities: [
          {
            time: '09:00',
            title: 'Dubai Frame',
            description: 'Panoramic views from golden picture frame',
            cost: 'HKD 80',
            duration: '1.5h',
            lat: 25.2360,
            lng: 55.3003,
            type: 'attraction'
          },
          {
            time: '11:00',
            title: 'Mall of the Emirates',
            description: 'Shopping and Ski Dubai',
            cost: 'HKD 350',
            duration: '4h',
            lat: 25.1185,
            lng: 55.2008,
            type: 'attraction'
          },
          {
            time: '16:00',
            title: 'Miracle Garden',
            description: 'World\'s largest flower garden',
            cost: 'HKD 100',
            duration: '2h',
            lat: 25.0597,
            lng: 55.2449,
            type: 'attraction'
          },
          {
            time: '19:00',
            title: 'La Perle Show',
            description: 'Aquatic theatrical spectacular',
            cost: 'HKD 800',
            duration: '2h',
            lat: 25.2169,
            lng: 55.2826,
            type: 'attraction'
          }
        ]
      },
      {
        day: 7,
        title: 'Shopping & Departure',
        activities: [
          {
            time: '09:00',
            title: 'Dubai Mall Shopping',
            description: 'Last-minute souvenir shopping',
            duration: '3h',
            lat: 25.1972,
            lng: 55.2796,
            type: 'attraction'
          },
          {
            time: '12:00',
            title: 'Farewell Lunch at At.mosphere',
            description: 'World\'s highest restaurant (Burj Khalifa 122nd floor)',
            cost: 'HKD 1200',
            duration: '2h',
            lat: 25.1972,
            lng: 55.2744,
            type: 'restaurant'
          },
          {
            time: '15:00',
            title: 'Hotel Check-out',
            description: 'Pack and prepare for departure',
            duration: '1h',
            lat: 25.1308,
            lng: 55.1174,
            type: 'hotel'
          },
          {
            time: '18:00',
            title: 'Airport Transfer',
            description: 'Transfer to Dubai International',
            cost: 'HKD 150',
            duration: '1h',
            lat: 25.2532,
            lng: 55.3657,
            type: 'transport'
          }
        ]
      }
    ],
    asiaMilesOptimization: {
      potentialEarnings: 5200,
      redemptionOptions: [
        'Use 55,000 miles for 2 nights at Atlantis (save HKD 7,000)',
        'Upgrade to Business Class for 50,000 miles',
        'Redeem 20,000 miles for spa & dining credits'
      ]
    }
  };
}
