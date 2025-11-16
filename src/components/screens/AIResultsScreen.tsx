import { useState } from 'react';
import { ArrowLeft, Plane, Hotel, Calendar as CalendarIcon, DollarSign, Star, Clock, MapPin, Sparkles, ChevronRight, Heart, Car, Shield, User, ShoppingBag, ChevronDown } from 'lucide-react';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '../ui/collapsible';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { Calendar } from '../ui/calendar';

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
  destination: string; // Add destination field
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
}

interface AIResultsScreenProps {
  suggestion: TripSuggestion;
  originalPrompt: string;
  onBack: () => void;
  onBookTrip: (selections: { flight: number; hotel: number; addOns: number[] }) => void;
}

// Helper function to get class badge color
const getClassColor = (classType: string): string => {
  switch (classType) {
    case 'Economy':
      return 'rgb(0,101,100)';
    case 'Premium Economy':
      return 'rgb(76, 134, 160)';
    case 'Business':
      return 'rgb(0,46,108)';
    case 'First':
      return 'rgb(130, 44, 66)';
    default:
      return 'rgb(0,101,100)';
  }
};

// Destination hero images
const heroImages: { [key: string]: string } = {
  'Tokyo': 'https://images.unsplash.com/photo-1717986439981-0c6a51130cfa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxUb2t5byUyMHNreWxpbmUlMjBzdW5zZXR8ZW58MXx8fHwxNzYxMTQ3ODg4fDA&ixlib=rb-4.1.0&q=80&w=1080',
  'Bali': 'https://images.unsplash.com/photo-1729606558546-4c405403a41a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxCYWxpJTIwYmVhY2glMjByZXNvcnR8ZW58MXx8fHwxNzYxMTQ3ODg4fDA&ixlib=rb-4.1.0&q=80&w=1080',
  'Bangkok': 'https://images.unsplash.com/photo-1728017237938-8829b36c1850?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxCYW5na29rJTIwR3JhbmQlMjBQYWxhY2V8ZW58MXx8fHwxNzYxMTQ3ODg4fDA&ixlib=rb-4.1.0&q=80&w=1080',
  'Dubai': 'https://images.unsplash.com/photo-1706798636444-d4eb076fb63c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxEdWJhaSUyMEJ1cmolMjBLaGFsaWZhfGVufDF8fHx8MTc2MTAzNjAyM3ww&ixlib=rb-4.1.0&q=80&w=1080',
};

// Activity images by keyword
const getActivityImage = (title: string, destination: string): string | null => {
  const lower = title.toLowerCase();
  
  if (destination === 'Tokyo') {
    if (lower.includes('shibuya') || lower.includes('crossing')) {
      return 'https://images.unsplash.com/photo-1643431452454-1612071b0671?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxUb2t5byUyMFNoaWJ1eWElMjBjcm9zc2luZ3xlbnwxfHx8fDE3NjExNDc4ODl8MA&ixlib=rb-4.1.0&q=80&w=1080';
    }
    if (lower.includes('tsukiji') || lower.includes('sushi') || lower.includes('market')) {
      return 'https://images.unsplash.com/photo-1580827929620-e1a34bc162fd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxUb2t5byUyMHN1c2hpJTIwbWFya2V0fGVufDF8fHx8MTc2MTE0Nzg4OXww&ixlib=rb-4.1.0&q=80&w=1080';
    }
    if (lower.includes('temple') || lower.includes('senso-ji') || lower.includes('asakusa')) {
      return 'https://images.unsplash.com/photo-1703658734341-49403c11ec75?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxUb2t5byUyMHRlbXBsZSUyMEFzYWt1c2F8ZW58MXx8fHwxNzYxMTQ3ODkwfDA&ixlib=rb-4.1.0&q=80&w=1080';
    }
  }
  
  if (destination === 'Bali') {
    if (lower.includes('rice') || lower.includes('tegallalang') || lower.includes('terraces')) {
      return 'https://images.unsplash.com/photo-1656247203824-3d6f99461ba4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxCYWxpJTIwcmljZSUyMHRlcnJhY2VzfGVufDF8fHx8MTc2MTEwNDA0N3ww&ixlib=rb-4.1.0&q=80&w=1080';
    }
    if (lower.includes('uluwatu') || lower.includes('temple')) {
      return 'https://images.unsplash.com/photo-1671034456366-77aff6bd3316?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxCYWxpJTIwVWx1d2F0dSUyMHRlbXBsZXxlbnwxfHx8fDE3NjExNDc4OTB8MA&ixlib=rb-4.1.0&q=80&w=1080';
    }
  }
  
  if (destination === 'Bangkok') {
    if (lower.includes('floating') || lower.includes('market')) {
      return 'https://images.unsplash.com/photo-1546945344-e830559a0601?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxCYW5na29rJTIwZmxvYXRpbmclMjBtYXJrZXR8ZW58MXx8fHwxNzYxMTQ3ODkxfDA&ixlib=rb-4.1.0&q=80&w=1080';
    }
    if (lower.includes('street food') || lower.includes('food tour')) {
      return 'https://images.unsplash.com/photo-1628324716243-0c9c29971a58?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxCYW5na29rJTIwc3RyZWV0JTIwZm9vZHxlbnwxfHx8fDE3NjExNDc4OTJ8MA&ixlib=rb-4.1.0&q=80&w=1080';
    }
  }
  
  if (destination === 'Dubai') {
    if (lower.includes('desert') || lower.includes('safari') || lower.includes('dune')) {
      return 'https://images.unsplash.com/photo-1624062999726-083e5268525d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxEdWJhaSUyMGRlc2VydCUyMHNhZmFyaXxlbnwxfHx8fDE3NjExMTQ3MjV8MA&ixlib=rb-4.1.0&q=80&w=1080';
    }
  }
  
  return null;
};

export function AIResultsScreen({ suggestion, originalPrompt, onBack, onBookTrip }: AIResultsScreenProps) {
  // Extract number of nights from duration string first (e.g., "3 Days" -> 3)
  const numberOfNights = parseInt(suggestion.duration.match(/\d+/)?.[0] || '1');
  
  const [selectedFlight, setSelectedFlight] = useState(0);
  const [selectedReturnFlight, setSelectedReturnFlight] = useState(0);
  const [selectedHotel, setSelectedHotel] = useState(0);
  const [selectedAddOns, setSelectedAddOns] = useState<number[]>([]);
  const [savedToVision, setSavedToVision] = useState(false);
  const [isDescriptionOpen, setIsDescriptionOpen] = useState(false);
  const [isMilesOpen, setIsMilesOpen] = useState(false);
  
  // Hotels tab state
  const [selectedStars, setSelectedStars] = useState<number | null>(null);
  
  // Flights tab state
  const [departureDate, setDepartureDate] = useState<Date | undefined>(undefined);
  const [returnDate, setReturnDate] = useState<Date | undefined>(undefined);
  const [flightSubTab, setFlightSubTab] = useState<'departing' | 'return'>('departing');
  
  // Price cache to maintain consistent prices for each date
  const [departurePriceCache, setDeparturePriceCache] = useState<Map<string, FlightOption[]>>(new Map());
  const [returnPriceCache, setReturnPriceCache] = useState<Map<string, FlightOption[]>>(new Map());
  
  const heroImage = heroImages[suggestion.destination];
  
  // Extended hotels array with 20 hotels
  const allHotels: HotelOption[] = [
    // 5-Star Hotels
    {
      name: 'Park Hyatt Tokyo',
      rating: 5,
      pricePerNight: 2800,
      asiaMilesRedemption: 80000,
      location: 'Shinjuku',
      amenities: ['Pool', 'Spa', 'Michelin Dining', 'City Views'],
      destination: 'Tokyo'
    },
    {
      name: 'Marina Bay Sands',
      rating: 5,
      pricePerNight: 3200,
      asiaMilesRedemption: 90000,
      location: 'Marina Bay',
      amenities: ['Infinity Pool', 'Casino', 'Restaurants', 'Rooftop Bar'],
      destination: 'Singapore'
    },
    {
      name: 'The Peninsula Bangkok',
      rating: 5,
      pricePerNight: 1600,
      asiaMilesRedemption: 60000,
      location: 'Riverside',
      amenities: ['River View', 'Spa', 'Fine Dining', 'Butler Service'],
      destination: 'Bangkok'
    },
    {
      name: 'Four Seasons Bali',
      rating: 5,
      pricePerNight: 2400,
      asiaMilesRedemption: 75000,
      location: 'Jimbaran Bay',
      amenities: ['Beach Access', 'Villas', 'Infinity Pool', 'Spa'],
      destination: 'Bali'
    },
    {
      name: 'Grand Imperial Hotel',
      rating: 5,
      pricePerNight: 3500,
      asiaMilesRedemption: 95000,
      location: 'Central Hong Kong',
      amenities: ['Butler Service', 'Helipad', 'Presidential Suite', 'Harbor View'],
      destination: 'Hong Kong'
    },

    // 4-Star Hotels
    {
      name: 'Skyline Plaza Hotel',
      rating: 4,
      pricePerNight: 1200,
      location: 'Tsim Sha Tsui',
      amenities: ['Gym', 'Restaurant', 'City View', 'Free WiFi'],
      destination: 'Hong Kong'
    },
    {
      name: 'Oriental Garden Hotel',
      rating: 4,
      pricePerNight: 1400,
      asiaMilesRedemption: 45000,
      location: 'Shibuya',
      amenities: ['Rooftop Bar', 'Onsen', 'Free WiFi', 'Traditional Bath'],
      destination: 'Tokyo'
    },
    {
      name: 'Metro Central Inn',
      rating: 4,
      pricePerNight: 980,
      location: 'Orchard Road',
      amenities: ['Pool', 'Gym', 'Shopping Access', 'Breakfast'],
      destination: 'Singapore'
    },
    {
      name: 'Horizon Bay Resort',
      rating: 4,
      pricePerNight: 1100,
      asiaMilesRedemption: 40000,
      location: 'Phuket',
      amenities: ['Beach', 'Spa', 'Pool', 'Water Sports'],
      destination: 'Thailand'
    },
    {
      name: 'ABC Grand Hotel',
      rating: 4,
      pricePerNight: 750,
      location: 'Kuala Lumpur',
      amenities: ['Pool', 'Restaurant', 'Parking', 'Near KLCC'],
      destination: 'Malaysia'
    },

    // 3-Star Hotels
    {
      name: 'City Express Hotel',
      rating: 3,
      pricePerNight: 650,
      location: 'Causeway Bay',
      amenities: ['Free WiFi', 'Breakfast', '24h Reception', 'Central Location'],
      destination: 'Hong Kong'
    },
    {
      name: 'Jade Palace Inn',
      rating: 3,
      pricePerNight: 580,
      location: 'Asakusa',
      amenities: ['Near Temple', 'Restaurant', 'WiFi', 'Traditional Rooms'],
      destination: 'Tokyo'
    },
    {
      name: 'Sunrise Boutique Hotel',
      rating: 3,
      pricePerNight: 620,
      location: 'Bugis',
      amenities: ['Breakfast', 'WiFi', 'Laundry', 'Boutique Design'],
      destination: 'Singapore'
    },
    {
      name: 'Paradise View Hotel',
      rating: 3,
      pricePerNight: 480,
      location: 'Patong',
      amenities: ['Pool', 'Beach Access', 'Bar', 'Near Nightlife'],
      destination: 'Thailand'
    },
    {
      name: 'XYZ Business Hotel',
      rating: 3,
      pricePerNight: 720,
      location: 'Gangnam',
      amenities: ['Business Center', 'WiFi', 'Coffee Shop', 'Meeting Rooms'],
      destination: 'South Korea'
    },

    // 2-Star Hotels
    {
      name: 'Comfort Stay Inn',
      rating: 2,
      pricePerNight: 380,
      location: 'Mong Kok',
      amenities: ['WiFi', 'Air Con', 'Clean Rooms', 'Budget Friendly'],
      destination: 'Hong Kong'
    },
    {
      name: 'Budget Express Hotel',
      rating: 2,
      pricePerNight: 420,
      location: 'Ikebukuro',
      amenities: ['24h Check-in', 'WiFi', 'Vending', 'Near Station'],
      destination: 'Tokyo'
    },
    {
      name: 'Simple Rest Hotel',
      rating: 2,
      pricePerNight: 350,
      location: 'Chinatown',
      amenities: ['Fan/AC', 'Shared Bath', 'WiFi', 'Great Value'],
      destination: 'Hong Kong'
    },
    {
      name: 'Traveler Lodge',
      rating: 2,
      pricePerNight: 280,
      location: 'Khao San Road',
      amenities: ['Common Area', 'WiFi', 'Lockers', 'Backpacker Hub'],
      destination: 'Thailand'
    },
    {
      name: 'EZ Sleep Hotel',
      rating: 2,
      pricePerNight: 320,
      location: 'Manila',
      amenities: ['Air Con', 'TV', 'WiFi', 'No-frills Comfort'],
      destination: 'Philippines'
    }
  ];

  // Filter hotels based on destination AND selected star rating
  const destinationHotels = allHotels.filter(hotel => hotel.destination === suggestion.destination);
  const filteredHotels = selectedStars 
    ? destinationHotels.filter(hotel => hotel.rating === selectedStars)
    : destinationHotels;
  
  // Calculate return date based on departure date and trip duration
  const calculateReturnDate = (depDate: Date): Date => {
    const returnDate = new Date(depDate);
    returnDate.setDate(returnDate.getDate() + numberOfNights);
    return returnDate;
  };
  
  // Helper function to get all dates between start and end (excluding start and end)
  const getDatesInRange = (start: Date, end: Date): Date[] => {
    const dates: Date[] = [];
    const current = new Date(start);
    current.setDate(current.getDate() + 1); // Start from day after
    
    while (current < end) {
      dates.push(new Date(current));
      current.setDate(current.getDate() + 1);
    }
    
    return dates;
  };
  
  // Generate mock flight variations for different dates
  const generateFlightVariations = (baseFlight: FlightOption, dateOffset: number): FlightOption => {
    // Mock variations based on date offset
    const priceVariation = Math.floor(Math.random() * 500) - 250; // ±250 HKD variation
    const timeVariations = ['00:30', '01:00', '01:30', '02:00'];
    const randomTimeShift = timeVariations[dateOffset % timeVariations.length];
    
    return {
      ...baseFlight,
      price: Math.max(baseFlight.price + priceVariation, baseFlight.price - 500),
      asiaMiles: Math.floor((baseFlight.price + priceVariation) * 0.5),
    };
  };
  
  // Get flights for selected departure date
  const getDepartureFlightsForDate = (): FlightOption[] => {
    if (!departureDate) return suggestion.flightOptions;
    
    const dayOfWeek = departureDate.getDay();
    const cachedFlights = departurePriceCache.get(departureDate.toISOString());
    
    if (cachedFlights) {
      return cachedFlights;
    } else {
      const newFlights = suggestion.flightOptions.map(flight => generateFlightVariations(flight, dayOfWeek));
      setDeparturePriceCache(prev => new Map(prev).set(departureDate.toISOString(), newFlights));
      return newFlights;
    }
  };
  
  // Get flights for calculated return date
  const getReturnFlightsForDate = (): FlightOption[] => {
    if (!departureDate) return suggestion.returnFlightOptions;
    
    const retDate = calculateReturnDate(departureDate);
    const dayOfWeek = retDate.getDay();
    const cachedFlights = returnPriceCache.get(retDate.toISOString());
    
    if (cachedFlights) {
      return cachedFlights;
    } else {
      const newFlights = suggestion.returnFlightOptions.map(flight => generateFlightVariations(flight, dayOfWeek));
      setReturnPriceCache(prev => new Map(prev).set(retDate.toISOString(), newFlights));
      return newFlights;
    }
  };
  
  // Toggle add-on selection
  const toggleAddOn = (index: number) => {
    setSelectedAddOns(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };
  
  // Calculate total price and miles based on selections
  const selectedFlightData = getDepartureFlightsForDate()[selectedFlight];
  const selectedReturnFlightData = getReturnFlightsForDate()[selectedReturnFlight];
  const selectedHotelData = filteredHotels[selectedHotel];
  
  // Calculate hotel price with 15% discount for 5-star hotels with Asia Miles redemption
  const hotelPricePerNight = (selectedHotelData.rating === 5 && selectedHotelData.asiaMilesRedemption) 
    ? Math.round(selectedHotelData.pricePerNight * 0.85)
    : selectedHotelData.pricePerNight;
  
  // Calculate add-ons total with 10% discount for car rentals
  const addOnsTotal = selectedAddOns.reduce((sum, index) => {
    const addon = suggestion.addOnOptions[index];
    if (!addon) return sum;
    const addonPrice = addon.type === 'car' ? Math.round(addon.price * 0.9) : addon.price;
    return sum + addonPrice;
  }, 0);
  
  const totalPrice = selectedFlightData.price + selectedReturnFlightData.price + (hotelPricePerNight * numberOfNights) + addOnsTotal;
  const totalMiles = selectedFlightData.asiaMiles + selectedReturnFlightData.asiaMiles;

  return (
    <div className="min-h-screen bg-mist-gray pb-24">
      {/* Header */}
      <div className="relative overflow-hidden">
        {/* Hero Image */}
        {heroImage && (
          <div className="absolute inset-0 z-0">
            <ImageWithFallback 
              src={heroImage}
              alt={`${suggestion.destination}, ${suggestion.country}`}
              className="w-full h-full object-cover"
            />
            {/* Gradient overlay for text readability */}
            <div 
              className="absolute inset-0"
              style={{ 
                background: 'linear-gradient(to bottom, rgba(0, 104, 94, 0.7) 0%, rgba(0, 104, 94, 0.85) 100%)' 
              }}
            />
          </div>
        )}
        
        {/* Content */}
        <div 
          className="px-5 pt-12 pb-6 text-white relative z-10"
          style={!heroImage ? { background: 'linear-gradient(135deg, #006564 0%, #367D79 100%)' } : {}}
        >
          <button 
            onClick={onBack}
            className="mb-4 flex items-center gap-2 text-white/90 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Discovery</span>
          </button>
          
          <div className="max-w-md mx-auto">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="w-5 h-5" />
              <Badge className="bg-white/20 backdrop-blur-sm text-white border-white/30">
                AI Generated
              </Badge>
            </div>
            <h1 className="text-white mb-2">{suggestion.destination}, {suggestion.country}</h1>
            <p className="text-white/90 mb-1">Based on: "{originalPrompt}"</p>
            <div className="flex items-center gap-4 text-sm text-white/80">
              <div className="flex items-center gap-1">
                <CalendarIcon className="w-4 h-4" />
                <span>{suggestion.duration}</span>
              </div>
              <div className="flex items-center gap-1">
                <DollarSign className="w-4 h-4" />
                <span>{suggestion.estimatedBudget}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-5 pt-4 pb-48 max-w-md mx-auto space-y-4">
        {/* Highlights - Always visible */}
        <Card className="p-5">
          <h3 className="mb-3">Trip Highlights</h3>
          <div className="space-y-2">
            {suggestion.highlights.map((highlight, index) => (
              <div key={index} className="flex items-start gap-2">
                <div 
                  className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0"
                  style={{ backgroundColor: 'var(--cathay-jade)' }}
                />
                <p className="text-sm">{highlight}</p>
              </div>
            ))}
          </div>
        </Card>

        {/* Overview Card - Collapsible */}
        <Collapsible open={isDescriptionOpen} onOpenChange={setIsDescriptionOpen}>
          <Card className="p-5">
            <div className="flex items-start justify-between mb-3">
              <CollapsibleTrigger asChild>
                <div className="flex items-center gap-2 cursor-pointer flex-1">
                  <h3>Why {suggestion.destination}?</h3>
                  <ChevronDown 
                    className={`w-5 h-5 transition-transform ${isDescriptionOpen ? 'rotate-180' : ''}`}
                    style={{ color: 'var(--cathay-jade)' }}
                  />
                </div>
              </CollapsibleTrigger>
              <button 
                onClick={() => setSavedToVision(!savedToVision)}
                className="transition-transform hover:scale-110"
              >
                <Heart 
                  className={`w-5 h-5 ${savedToVision ? 'fill-red-500 text-red-500' : 'text-muted-foreground'}`}
                />
              </button>
            </div>
            <CollapsibleContent className="space-y-3">
              <p className="text-muted-foreground">{suggestion.description}</p>
              
              <div className="pt-2">
                <p className="text-sm mb-2" style={{ color: 'var(--cathay-jade)' }}>Best Time to Visit</p>
                <p className="text-sm text-muted-foreground">{suggestion.bestTimeToVisit}</p>
              </div>
            </CollapsibleContent>
          </Card>
        </Collapsible>

        {/* Tabbed Content */}
        <Tabs defaultValue="itinerary" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="itinerary">Itinerary</TabsTrigger>
            <TabsTrigger value="flights">Flights</TabsTrigger>
            <TabsTrigger value="hotels">Hotels</TabsTrigger>
            <TabsTrigger value="addons">Add-ons</TabsTrigger>
          </TabsList>

          {/* Itinerary Tab */}
          <TabsContent value="itinerary" className="space-y-3">
            {suggestion.itinerary.map((day) => (
              <Card key={day.day} className="p-5">
                <div className="flex items-center gap-3 mb-4">
                  <div 
                    className="w-10 h-10 rounded-full flex items-center justify-center text-white"
                    style={{ backgroundColor: 'var(--cathay-jade)' }}
                  >
                    <span>{day.day}</span>
                  </div>
                  <div>
                    <h3>Day {day.day}</h3>
                    <p className="text-sm text-muted-foreground">{day.title}</p>
                  </div>
                </div>

                <div className="space-y-4">
                  {day.activities.map((activity, actIndex) => {
                    const activityImage = getActivityImage(activity.title, suggestion.destination);
                    
                    return (
                      <div key={actIndex} className="flex gap-3">
                        <div className="text-sm text-muted-foreground w-16 flex-shrink-0">
                          {activity.time}
                        </div>
                        <div className="flex-1">
                          {activityImage && (
                            <div className="mb-2 rounded-lg overflow-hidden">
                              <ImageWithFallback 
                                src={activityImage}
                                alt={activity.title}
                                className="w-full h-32 object-cover"
                              />
                            </div>
                          )}
                          <p className="mb-1">{activity.title}</p>
                          <p className="text-sm text-muted-foreground mb-1">{activity.description}</p>
                          <div className="flex items-center gap-3 text-xs text-muted-foreground">
                            {activity.duration && (
                              <div className="flex items-center gap-1">
                                <Clock className="w-3 h-3" />
                                <span>{activity.duration}</span>
                              </div>
                            )}
                            {activity.cost && (
                              <div className="flex items-center gap-1">
                                <DollarSign className="w-3 h-3" />
                                <span>{activity.cost}</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </Card>
            ))}
          </TabsContent>

          {/* Combined Flights Tab */}
          <TabsContent value="flights" className="space-y-3">
            {/* Step 1: Departure Date Selection */}
            <Card className="p-5">
              <div className="flex items-center gap-2 mb-3">
                <CalendarIcon className="w-4 h-4" style={{ color: 'var(--cathay-jade)' }} />
                <h3>Select Departure Date</h3>
              </div>
              <div className="w-full [&_.rdp]:!w-full [&_.rdp]:!max-w-none [&_.rdp]:!p-0 [&_.rdp]:!m-0 [&_.rdp-months]:!w-full [&_.rdp-month]:!w-full [&_.rdp-month]:!gap-0 [&_.rdp-caption]:!w-full [&_table]:!w-full [&_table]:!table-fixed [&_thead]:!w-full [&_tbody]:!w-full [&_tr]:!w-full [&_tr]:!grid [&_tr]:!grid-cols-7 [&_th]:!w-full [&_th]:!px-0 [&_th]:!text-center [&_td]:!w-full [&_td]:!px-0 [&_.rdp-cell]:!w-full [&_.rdp-day]:!w-full [&_.rdp-day]:!h-9 [&_.rdp-day]:!text-sm [&_.rdp-day]:!aspect-square [&_.rdp-day_selected]:!w-9 [&_.rdp-day_selected]:!h-9 [&_.rdp-nav_button]:!w-8 [&_.rdp-nav_button]:!h-8">
                <Calendar
                  mode="single"
                  selected={departureDate}
                  onSelect={(date) => {
                    if (date) {
                      setDepartureDate(date);
                      setFlightSubTab('departing');
                    }
                  }}
                  disabled={(date) => date < new Date()}
                  className="rounded-md border w-full !p-3"
                  modifiers={{
                    range_start: departureDate ? [departureDate] : [],
                    range_middle: departureDate ? getDatesInRange(departureDate, calculateReturnDate(departureDate)) : [],
                    range_end: departureDate ? [calculateReturnDate(departureDate)] : []
                  }}
                  modifiersClassNames={{
                    range_start: "!bg-[#006564] !text-white hover:!bg-[#006564] hover:!text-white",
                    range_end: "!bg-[#006564] !text-white hover:!bg-[#006564] hover:!text-white",
                    range_middle: "!bg-[#006564]/10 !text-black hover:!bg-[#006564]/15"
                  }}
                />
              </div>
              {departureDate && (
                <div className="mt-3 p-3 rounded-lg" style={{ backgroundColor: 'rgba(0, 101, 100, 0.1)' }}>
                  <p className="text-sm" style={{ color: 'var(--cathay-jade)' }}>
                    ✓ Departing: {departureDate.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                  </p>
                  <p className="text-sm mt-1" style={{ color: 'var(--cathay-jade)' }}>
                    → Returning: {(returnDate || calculateReturnDate(departureDate)).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                  </p>
                </div>
              )}
            </Card>

            {/* Step 2: Flight Sub-tabs (only show if date selected) */}
            {departureDate && (
              <Tabs value={flightSubTab} onValueChange={(value) => setFlightSubTab(value as 'departing' | 'return')} className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="departing">
                    <Plane className="w-3.5 h-3.5 mr-1.5" />
                    Departing
                  </TabsTrigger>
                  <TabsTrigger value="return">
                    <Plane className="w-3.5 h-3.5 mr-1.5 rotate-180" />
                    Return
                  </TabsTrigger>
                </TabsList>

                {/* Departing Flights */}
                <TabsContent value="departing" className="space-y-3 mt-3">
                  {getDepartureFlightsForDate().map((flight, index) => (
                    <Card 
                      key={index}
                      className={`p-5 cursor-pointer transition-all ${
                        selectedFlight === index 
                          ? flight.airline === 'HK Express'
                            ? 'ring-2'
                            : 'ring-2 ring-primary'
                          : 'hover:shadow-md'
                      }`}
                      style={selectedFlight === index && flight.airline === 'HK Express' ? { borderColor: '#6F2C91', boxShadow: '0 0 0 2px #6F2C91' } : {}}
                      onClick={() => setSelectedFlight(index)}
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <Plane 
                              className="w-4 h-4" 
                              style={{ color: flight.airline === 'HK Express' ? '#6F2C91' : 'var(--cathay-jade)' }} 
                            />
                            <p>{flight.airline}</p>
                          </div>
                          <p className="text-sm text-muted-foreground mb-1">
                            {flight.flightNumber} • {flight.stops === 0 ? 'Nonstop' : `1 Stop${flight.via ? ` via ${flight.via}` : ''}`}
                          </p>
                          {flight.aircraft && (
                            <p className="text-xs text-muted-foreground mb-1">
                              {flight.aircraft}
                            </p>
                          )}
                          <span 
                            className="inline-block px-2 py-0.5 text-xs rounded text-white"
                            style={{ backgroundColor: getClassColor(flight.class) }}
                          >
                            {flight.class}
                          </span>
                        </div>
                        <div className="text-right">
                          <p>HKD {flight.price.toLocaleString()}</p>
                          <p className="text-xs text-muted-foreground">+{flight.asiaMiles.toLocaleString()} mi</p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between text-sm">
                        <div>
                          <p className="text-muted-foreground">Departure</p>
                          <p>{flight.departure}</p>
                        </div>
                        <div className="text-muted-foreground flex flex-col items-center">
                          <Clock className="w-4 h-4 mb-1" />
                          <p className="text-xs">{flight.duration}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-muted-foreground">Arrival</p>
                          <p>{flight.arrival}</p>
                        </div>
                      </div>
                    </Card>
                  ))}
                </TabsContent>

                {/* Return Flights */}
                <TabsContent value="return" className="space-y-3 mt-3">
                  {getReturnFlightsForDate().map((flight, index) => (
                    <Card 
                      key={index}
                      className={`p-5 cursor-pointer transition-all ${
                        selectedReturnFlight === index 
                          ? flight.airline === 'HK Express'
                            ? 'ring-2'
                            : 'ring-2 ring-primary'
                          : 'hover:shadow-md'
                      }`}
                      style={selectedReturnFlight === index && flight.airline === 'HK Express' ? { borderColor: '#6F2C91', boxShadow: '0 0 0 2px #6F2C91' } : {}}
                      onClick={() => setSelectedReturnFlight(index)}
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <Plane 
                              className="w-4 h-4" 
                              style={{ color: flight.airline === 'HK Express' ? '#6F2C91' : 'var(--cathay-jade)' }} 
                            />
                            <p>{flight.airline}</p>
                          </div>
                          <p className="text-sm text-muted-foreground mb-1">
                            {flight.flightNumber} • {flight.stops === 0 ? 'Nonstop' : `1 Stop${flight.via ? ` via ${flight.via}` : ''}`}
                          </p>
                          {flight.aircraft && (
                            <p className="text-xs text-muted-foreground mb-1">
                              {flight.aircraft}
                            </p>
                          )}
                          <span 
                            className="inline-block px-2 py-0.5 text-xs rounded text-white"
                            style={{ backgroundColor: getClassColor(flight.class) }}
                          >
                            {flight.class}
                          </span>
                        </div>
                        <div className="text-right">
                          <p>HKD {flight.price.toLocaleString()}</p>
                          <p className="text-xs text-muted-foreground">+{flight.asiaMiles.toLocaleString()} mi</p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between text-sm">
                        <div>
                          <p className="text-muted-foreground">Departure</p>
                          <p>{flight.departure}</p>
                        </div>
                        <div className="text-muted-foreground flex flex-col items-center">
                          <Clock className="w-4 h-4 mb-1" />
                          <p className="text-xs">{flight.duration}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-muted-foreground">Arrival</p>
                          <p>{flight.arrival}</p>
                        </div>
                      </div>
                    </Card>
                  ))}
                </TabsContent>
              </Tabs>
            )}
          </TabsContent>

          {/* Hotels Tab */}
          <TabsContent value="hotels" className="space-y-3">
            <div className="flex items-center justify-between mb-3">
              <h3>Hotels</h3>
              <div className="flex gap-2">
                <Button
                  variant={selectedStars === 3 ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedStars(selectedStars === 3 ? null : 3)}
                  className={selectedStars === 3 ? "bg-[#006564] hover:bg-[#367D79] text-white" : ""}
                >
                  <Star className="w-3 h-3 mr-1" fill={selectedStars === 3 ? "currentColor" : "none"} />
                  3 Stars
                </Button>
                <Button
                  variant={selectedStars === 4 ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedStars(selectedStars === 4 ? null : 4)}
                  className={selectedStars === 4 ? "bg-[#006564] hover:bg-[#367D79] text-white" : ""}
                >
                  <Star className="w-3 h-3 mr-1" fill={selectedStars === 4 ? "currentColor" : "none"} />
                  4 Stars
                </Button>
                <Button
                  variant={selectedStars === 5 ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedStars(selectedStars === 5 ? null : 5)}
                  className={selectedStars === 5 ? "bg-[#006564] hover:bg-[#367D79] text-white" : ""}
                >
                  <Star className="w-3 h-3 mr-1" fill={selectedStars === 5 ? "currentColor" : "none"} />
                  5 Stars
                </Button>
              </div>
            </div>
            {filteredHotels.map((hotel, index) => (
              <Card 
                key={index}
                className={`p-5 cursor-pointer transition-all ${
                  selectedHotel === index 
                    ? 'ring-2 ring-primary' 
                    : 'hover:shadow-md'
                }`}
                onClick={() => setSelectedHotel(index)}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <Hotel className="w-4 h-4" style={{ color: 'var(--cathay-jade)' }} />
                      <p>{hotel.name}</p>
                    </div>
                    <div className="flex items-center gap-2 mb-2">
                      <div className="flex items-center">
                        {Array.from({ length: hotel.rating }).map((_, i) => (
                          <Star key={i} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                      <span className="text-xs text-muted-foreground">•</span>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <MapPin className="w-3 h-3" />
                        <span>{hotel.location}</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    {hotel.rating === 5 && hotel.asiaMilesRedemption ? (
                      <>
                        <p className="text-xs text-muted-foreground line-through">HKD {hotel.pricePerNight.toLocaleString()}</p>
                        <p style={{ color: 'var(--cathay-jade)' }}>HKD {Math.round(hotel.pricePerNight * 0.85).toLocaleString()}</p>
                        <p className="text-xs text-muted-foreground">per night</p>
                      </>
                    ) : (
                      <>
                        <p>HKD {hotel.pricePerNight.toLocaleString()}</p>
                        <p className="text-xs text-muted-foreground">per night</p>
                      </>
                    )}
                  </div>
                </div>

                {hotel.asiaMilesRedemption && (
                  <div 
                    className="px-3 py-2 rounded-lg mb-3"
                    style={{ backgroundColor: 'rgba(199, 165, 103, 0.1)' }}
                  >
                    <p className="text-xs" style={{ color: 'var(--cathay-gold)' }}>
                      💎 Redeem with {hotel.asiaMilesRedemption.toLocaleString()} Asia Miles
                    </p>
                    {hotel.rating === 5 && (
                      <p className="text-xs mt-1" style={{ color: 'var(--cathay-gold)' }}>
                        ⭐ Gold & Diamond members: 15% off
                      </p>
                    )}
                  </div>
                )}

                <div className="flex flex-wrap gap-2">
                  {hotel.amenities.map((amenity, i) => (
                    <Badge key={i} variant="outline" className="text-xs">
                      {amenity}
                    </Badge>
                  ))}
                </div>
              </Card>
            ))}
          </TabsContent>

          {/* Add-ons Tab */}
          <TabsContent value="addons" className="space-y-3">
            {suggestion.addOnOptions.map((addon, index) => {
              const isSelected = selectedAddOns.includes(index);
              const IconComponent = addon.icon === 'car' ? Car : addon.icon === 'shield' ? Shield : addon.icon === 'user' ? User : ShoppingBag;
              
              return (
                <Card 
                  key={addon.id}
                  className={`p-5 cursor-pointer transition-all ${
                    isSelected 
                      ? 'ring-2 ring-primary bg-primary/5' 
                      : 'hover:shadow-md'
                  }`}
                  onClick={() => toggleAddOn(index)}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <IconComponent className="w-4 h-4" style={{ color: 'var(--cathay-jade)' }} />
                        <p>{addon.name}</p>
                      </div>
                      {addon.recommended && (
                        <Badge 
                          className="mb-2 text-white border-0 w-fit"
                          style={{ backgroundColor: 'var(--cathay-gold)' }}
                        >
                          Recommended
                        </Badge>
                      )}
                      <p className="text-sm text-muted-foreground mb-2">{addon.description}</p>
                      {addon.type === 'car' && (
                        <div 
                          className="px-3 py-2 rounded-lg mb-2"
                          style={{ backgroundColor: 'rgba(199, 165, 103, 0.1)' }}
                        >
                          <p className="text-xs" style={{ color: 'var(--cathay-gold)' }}>
                            ⭐ Gold members: 10% off
                          </p>
                        </div>
                      )}
                      {addon.duration && (
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Clock className="w-3 h-3" />
                          <span>{addon.duration}</span>
                        </div>
                      )}
                    </div>
                    <div className="text-right ml-3 flex-shrink-0">
                      {addon.type === 'car' ? (
                        <>
                          <p className="text-xs text-muted-foreground line-through">HKD {addon.price.toLocaleString()}</p>
                          <p style={{ color: 'var(--cathay-jade)' }}>HKD {Math.round(addon.price * 0.9).toLocaleString()}</p>
                        </>
                      ) : (
                        <p>HKD {addon.price.toLocaleString()}</p>
                      )}
                      {isSelected && (
                        <Badge 
                          variant="outline" 
                          className="mt-1 border-primary text-primary"
                        >
                          ✓ Added
                        </Badge>
                      )}
                    </div>
                  </div>
                </Card>
              );
            })}
          </TabsContent>
        </Tabs>

        {/* Action Buttons */}
        <div className="sticky bottom-6 pt-[16px] pb-[20px] space-y-3 z-50 bg-mist-gray -mx-5 px-5 mt-[24px] rounded-[20px] pr-[20px] pl-[20px] mr-[0px] mb-[0px] ml-[0px]">
          {/* Price & Miles Summary */}
          <div className="bg-white rounded-xl p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <p className="text-sm text-muted-foreground mb-1">Estimated Total</p>
                <h3>HKD {totalPrice.toLocaleString()}</h3>
                <p className="text-xs text-muted-foreground mt-1">
                  Flight + {numberOfNights} night{numberOfNights > 1 ? 's' : ''} hotel
                  {selectedAddOns.length > 0 && ` + ${selectedAddOns.length} add-on${selectedAddOns.length > 1 ? 's' : ''}`}
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm text-muted-foreground mb-1">You'll Earn</p>
                <div className="flex items-center gap-1 justify-end">
                  <Sparkles className="w-4 h-4" style={{ color: 'var(--cathay-gold)' }} />
                  <h3 style={{ color: 'var(--cathay-gold)' }}>
                    {totalMiles.toLocaleString()}
                  </h3>
                </div>
                <p className="text-xs text-muted-foreground mt-1">Asia Miles</p>
              </div>
            </div>
          </div>
          
          <Button 
            onClick={() => onBookTrip({ 
              flight: selectedFlight, 
              hotel: selectedHotel, 
              addOns: selectedAddOns 
            })}
            className="w-full text-white shadow-lg"
            style={{ backgroundColor: 'var(--cathay-jade)' }}
          >
            Book This Trip
            <ChevronRight className="w-4 h-4 ml-2" />
          </Button>
          <Button 
            onClick={onBack}
            variant="outline"
            className="w-full shadow-md bg-white"
          >
            Explore Other Options
          </Button>
        </div>
      </div>
    </div>
  );
}