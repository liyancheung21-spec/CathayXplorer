import { useState } from "react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Card } from "../ui/card";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import { ArrowLeft, Hotel, MapPin, Calendar, Users, Star, Plus, Minus } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "../ui/dialog";
import { Calendar as CalendarComponent } from "../ui/calendar";
import type { DateRange } from "react-day-picker";

interface StayScreenProps {
  onBack: () => void;
}

export function StayScreen({ onBack }: StayScreenProps) {
  // State management
  const [selectedStars, setSelectedStars] = useState<number | null>(null);
  const [selectedDestination, setSelectedDestination] = useState<string>('');
  const [dateRange, setDateRange] = useState<DateRange | undefined>(undefined);
  const [rooms, setRooms] = useState(1);
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [showDestinationDialog, setShowDestinationDialog] = useState(false);
  const [showDatesDialog, setShowDatesDialog] = useState(false);
  const [showGuestsDialog, setShowGuestsDialog] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  // Available destinations
  const destinations = [
    { code: 'Tokyo', city: 'Tokyo', country: 'Japan', image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0b2t5byUyMGNpdHl8ZW58MXx8fHwxNzYxMTU2NTIzfDA&ixlib=rb-4.1.0&q=80&w=1080' },
    { code: 'Singapore', city: 'Singapore', country: 'Singapore', image: 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzaW5nYXBvcmUlMjBza3lsaW5lfGVufDF8fHx8MTc2MTE1NjUyM3ww&ixlib=rb-4.1.0&q=80&w=1080' },
    { code: 'Hong Kong', city: 'Hong Kong', country: 'China', image: 'https://images.unsplash.com/photo-1536599018102-9f803c140fc1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob25nJTIwa29uZ3xlbnwxfHx8fDE3NjExNTY1MjN8MA&ixlib=rb-4.1.0&q=80&w=1080' },
    { code: 'Bangkok', city: 'Bangkok', country: 'Thailand', image: 'https://images.unsplash.com/photo-1508009603885-50cf7c579365?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYW5na29rJTIwdGVtcGxlfGVufDF8fHx8MTc2MTE1NjUyM3ww&ixlib=rb-4.1.0&q=80&w=1080' },
    { code: 'Bali', city: 'Bali', country: 'Indonesia', image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYWxpJTIwaW5kb25lc2lhfGVufDF8fHx8MTc2MTE1NjUyM3ww&ixlib=rb-4.1.0&q=80&w=1080' },
    { code: 'Phuket', city: 'Phuket', country: 'Thailand', image: 'https://images.unsplash.com/photo-1589394815804-964ed0be2eb5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwaHVrZXQlMjBiZWFjaHxlbnwxfHx8fDE3NjExNTY1MjN8MA&ixlib=rb-4.1.0&q=80&w=1080' },
  ];

  // Helper functions
  const getDestinationDisplay = () => {
    if (!selectedDestination) return 'Where are you going?';
    return selectedDestination;
  };

  const getDatesDisplay = () => {
    if (!dateRange?.from) return 'Add dates';
    const { from, to } = dateRange;
    if (!to) return from.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    return `${from.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - ${to.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`;
  };

  const getGuestsDisplay = () => {
    const totalGuests = adults + children;
    return `${rooms} Room${rooms > 1 ? 's' : ''}, ${totalGuests} Guest${totalGuests > 1 ? 's' : ''}`;
  };

  // Calculate number of nights
  const calculateNights = () => {
    if (!dateRange?.from || !dateRange?.to) return 1;
    const diff = dateRange.to.getTime() - dateRange.from.getTime();
    return Math.max(1, Math.ceil(diff / (1000 * 60 * 60 * 24)));
  };

  // Handle search
  const handleSearch = () => {
    if (selectedDestination && dateRange?.from) {
      setHasSearched(true);
    }
  };

  // Get filtered hotels based on search
  const getFilteredHotels = () => {
    let hotels = allHotels;
    
    // Filter by destination if search was performed
    if (hasSearched && selectedDestination) {
      hotels = hotels.filter(hotel => 
        hotel.location.includes(selectedDestination)
      );
    }
    
    // Filter by star rating
    if (selectedStars) {
      hotels = hotels.filter(hotel => hotel.stars === selectedStars);
    }
    
    // Calculate total price based on nights
    const nights = calculateNights();
    return hotels.map(hotel => ({
      ...hotel,
      totalPrice: hotel.pricePerNight * nights * rooms
    }));
  };

  const allHotels = [
    // 5-Star Hotels
    {
      id: 1,
      name: 'Park Hyatt Tokyo',
      location: 'Shinjuku, Tokyo',
      pricePerNight: 2800,
      stars: 5,
      image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBob3RlbCUyMHJvb218ZW58MXx8fHwxNzYxMTU2NTIzfDA&ixlib=rb-4.1.0&q=80&w=1080',
      amenities: ['Pool', 'Spa', 'Gym'],
      specialFeature: 'Michelin-star dining'
    },
    {
      id: 2,
      name: 'Marina Bay Sands',
      location: 'Marina Bay, Singapore',
      pricePerNight: 3200,
      stars: 5,
      image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBob3RlbHxlbnwxfHx8fDE3NjExNTY1MjN8MA&ixlib=rb-4.1.0&q=80&w=1080',
      amenities: ['Infinity Pool', 'Casino', 'Restaurants'],
      specialFeature: 'Iconic rooftop pool'
    },
    {
      id: 3,
      name: 'The Peninsula Bangkok',
      location: 'Riverside, Bangkok',
      pricePerNight: 1600,
      stars: 5,
      image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob3RlbCUyMGxvYmJ5fGVufDF8fHx8MTc2MTE1NjUyM3ww&ixlib=rb-4.1.0&q=80&w=1080',
      amenities: ['River View', 'Spa', 'Fine Dining'],
      specialFeature: 'Chao Phraya river views'
    },
    {
      id: 4,
      name: 'Four Seasons Bali',
      location: 'Jimbaran Bay, Bali',
      pricePerNight: 2400,
      stars: 5,
      image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZXNvcnQlMjBwb29sfGVufDF8fHx8MTc2MTE1NjUyM3ww&ixlib=rb-4.1.0&q=80&w=1080',
      amenities: ['Beach Access', 'Villas', 'Infinity Pool'],
      specialFeature: 'Private beach villas'
    },
    {
      id: 5,
      name: 'Grand Imperial Hotel',
      location: 'Central, Hong Kong',
      pricePerNight: 3500,
      stars: 5,
      image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob3RlbCUyMGJ1aWxkaW5nfGVufDF8fHx8MTc2MTE1NjUyM3ww&ixlib=rb-4.1.0&q=80&w=1080',
      amenities: ['Butler Service', 'Helipad', 'Presidential Suite'],
      specialFeature: 'Sky-high luxury suites'
    },

    // 4-Star Hotels
    {
      id: 6,
      name: 'Skyline Plaza Hotel',
      location: 'Tsim Sha Tsui, Hong Kong',
      pricePerNight: 1200,
      stars: 4,
      image: 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob3RlbCUyMGJlZHJvb218ZW58MXx8fHwxNzYxMTU2NTIzfDA&ixlib=rb-4.1.0&q=80&w=1080',
      amenities: ['Gym', 'Restaurant', 'City View'],
      specialFeature: 'Victoria Harbour views'
    },
    {
      id: 7,
      name: 'Oriental Garden Hotel',
      location: 'Shibuya, Tokyo',
      pricePerNight: 1400,
      stars: 4,
      image: 'https://images.unsplash.com/photo-1611892440504-42a792e24d32?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob3RlbCUyMGludGVyaW9yfGVufDF8fHx8MTc2MTE1NjUyM3ww&ixlib=rb-4.1.0&q=80&w=1080',
      amenities: ['Rooftop Bar', 'Onsen', 'Free WiFi'],
      specialFeature: 'Traditional Japanese bath'
    },
    {
      id: 8,
      name: 'Metro Central Inn',
      location: 'Orchard Road, Singapore',
      pricePerNight: 980,
      stars: 4,
      image: 'https://images.unsplash.com/photo-1596436889106-be35e843f974?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob3RlbCUyMGhhbGx8ZW58MXx8fHwxNzYxMTU2NTIzfDA&ixlib=rb-4.1.0&q=80&w=1080',
      amenities: ['Pool', 'Gym', 'Shopping Access'],
      specialFeature: 'Connected to shopping mall'
    },
    {
      id: 9,
      name: 'Horizon Bay Resort',
      location: 'Phuket, Thailand',
      pricePerNight: 1100,
      stars: 4,
      image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZXNvcnQlMjBiZWFjaHxlbnwxfHx8fDE3NjExNTY1MjN8MA&ixlib=rb-4.1.0&q=80&w=1080',
      amenities: ['Beach', 'Spa', 'Pool'],
      specialFeature: 'Beachfront location'
    },
    {
      id: 10,
      name: 'ABC Grand Hotel',
      location: 'Kuala Lumpur, Malaysia',
      pricePerNight: 750,
      stars: 4,
      image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob3RlbCUyMHBvb2x8ZW58MXx8fHwxNzYxMTU2NTIzfDA&ixlib=rb-4.1.0&q=80&w=1080',
      amenities: ['Pool', 'Restaurant', 'Parking'],
      specialFeature: 'Near KLCC Twin Towers'
    },

    // 3-Star Hotels
    {
      id: 11,
      name: 'City Express Hotel',
      location: 'Causeway Bay, Hong Kong',
      pricePerNight: 650,
      stars: 3,
      image: 'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob3RlbCUyMGNpdHl8ZW58MXx8fHwxNzYxMTU2NTIzfDA&ixlib=rb-4.1.0&q=80&w=1080',
      amenities: ['Free WiFi', 'Breakfast', '24h Reception'],
      specialFeature: 'Central location'
    },
    {
      id: 12,
      name: 'Jade Palace Inn',
      location: 'Asakusa, Tokyo',
      pricePerNight: 580,
      stars: 3,
      image: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob3RlbCUyMG1vZGVybnxlbnwxfHx8fDE3NjExNTY1MjN8MA&ixlib=rb-4.1.0&q=80&w=1080',
      amenities: ['Near Temple', 'Restaurant', 'WiFi'],
      specialFeature: 'Traditional atmosphere'
    },
    {
      id: 13,
      name: 'Sunrise Boutique Hotel',
      location: 'Bugis, Singapore',
      pricePerNight: 620,
      stars: 3,
      image: 'https://images.unsplash.com/photo-1629140727571-9b5c6f6267b4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxib3V0aXF1ZSUyMGhvdGVsfGVufDF8fHx8MTc2MTE1NjUyM3ww&ixlib=rb-4.1.0&q=80&w=1080',
      amenities: ['Breakfast', 'WiFi', 'Laundry'],
      specialFeature: 'Boutique design'
    },
    {
      id: 14,
      name: 'Paradise View Hotel',
      location: 'Patong, Phuket',
      pricePerNight: 480,
      stars: 3,
      image: 'https://images.unsplash.com/photo-1625244724120-1fd1d34d00f6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiZWFjaCUyMGhvdGVsfGVufDF8fHx8MTc2MTE1NjUyM3ww&ixlib=rb-4.1.0&q=80&w=1080',
      amenities: ['Pool', 'Beach Access', 'Bar'],
      specialFeature: '5 min walk to beach'
    },
    {
      id: 15,
      name: 'XYZ Business Hotel',
      location: 'Gangnam, Seoul',
      pricePerNight: 720,
      stars: 3,
      image: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMGhvdGVsfGVufDF8fHx8MTc2MTE1NjUyM3ww&ixlib=rb-4.1.0&q=80&w=1080',
      amenities: ['Business Center', 'WiFi', 'Coffee Shop'],
      specialFeature: 'Business traveler focus'
    },

    // 2-Star Hotels
    {
      id: 16,
      name: 'Comfort Stay Inn',
      location: 'Mong Kok, Hong Kong',
      pricePerNight: 380,
      stars: 2,
      image: 'https://images.unsplash.com/photo-1586611292717-f828b167408c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidWRnZXQlMjBob3RlbHxlbnwxfHx8fDE3NjExNTY1MjN8MA&ixlib=rb-4.1.0&q=80&w=1080',
      amenities: ['WiFi', 'Air Con', 'Clean Rooms'],
      specialFeature: 'Budget-friendly'
    },
    {
      id: 17,
      name: 'Budget Express Hotel',
      location: 'Ikebukuro, Tokyo',
      pricePerNight: 420,
      stars: 2,
      image: 'https://images.unsplash.com/photo-1631049552057-403cdb8f0658?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzaW1wbGUlMjBob3RlbHxlbnwxfHx8fDE3NjExNTY1MjN8MA&ixlib=rb-4.1.0&q=80&w=1080',
      amenities: ['24h Check-in', 'WiFi', 'Vending'],
      specialFeature: 'Near train station'
    },
    {
      id: 18,
      name: 'Simple Rest Hotel',
      location: 'Chinatown, Singapore',
      pricePerNight: 350,
      stars: 2,
      image: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzaW1wbGUlMjByb29tfGVufDF8fHx8MTc2MTE1NjUyM3ww&ixlib=rb-4.1.0&q=80&w=1080',
      amenities: ['Fan/AC', 'Shared Bath', 'WiFi'],
      specialFeature: 'Great value location'
    },
    {
      id: 19,
      name: 'Traveler Lodge',
      location: 'Khao San Road, Bangkok',
      pricePerNight: 280,
      stars: 2,
      image: 'https://images.unsplash.com/photo-1455587734955-081b22074882?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob3N0ZWx8ZW58MXx8fHwxNzYxMTU2NTIzfDA&ixlib=rb-4.1.0&q=80&w=1080',
      amenities: ['Common Area', 'WiFi', 'Lockers'],
      specialFeature: 'Backpacker favorite'
    },
    {
      id: 20,
      name: 'EZ Sleep Hotel',
      location: 'Manila, Philippines',
      pricePerNight: 320,
      stars: 2,
      image: 'https://images.unsplash.com/photo-1566195992011-5f6b21e539aa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYXNpYyUyMGhvdGVsfGVufDF8fHx8MTc2MTE1NjUyM3ww&ixlib=rb-4.1.0&q=80&w=1080',
      amenities: ['Air Con', 'TV', 'WiFi'],
      specialFeature: 'No-frills comfort'
    }
  ];

  // Filter hotels based on selected star rating
  const filteredHotels = getFilteredHotels();

  return (
    <div className="min-h-screen bg-mist-gray pb-24">
      {/* Top spacing for fixed status bar */}
      <div className="h-[52px]" />
      
      {/* Header */}
      <div className="bg-gradient-to-r from-[#006564] to-[#367D79] px-4 pt-4 pb-6 text-white">
        <div className="max-w-md mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <Button
              variant="ghost"
              size="icon"
              onClick={onBack}
              className="text-white hover:bg-white/10"
              aria-label="Go back"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div className="flex items-center gap-2">
              <Hotel className="w-6 h-6" />
              <h1 className="text-white">Stay</h1>
            </div>
          </div>

          {/* Search Card */}
          <Card className="p-4 bg-white/95 backdrop-blur-sm">
            <div className="space-y-3">
              <div 
                className="flex items-center gap-3 p-3 bg-mist-gray rounded-lg cursor-pointer hover:bg-gray-200 transition-colors"
                onClick={() => setShowDestinationDialog(true)}
              >
                <MapPin className="w-5 h-5 text-[#006564]" />
                <div className="flex-1">
                  <p className="text-xs text-muted-foreground">Destination</p>
                  <p className="text-sm">{getDestinationDisplay()}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div 
                  className="flex items-center gap-3 p-3 bg-mist-gray rounded-lg cursor-pointer hover:bg-gray-200 transition-colors"
                  onClick={() => setShowDatesDialog(true)}
                >
                  <Calendar className="w-5 h-5 text-[#006564]" />
                  <div className="flex-1">
                    <p className="text-xs text-muted-foreground">Dates</p>
                    <p className="text-sm">{getDatesDisplay()}</p>
                  </div>
                </div>

                <div 
                  className="flex items-center gap-3 p-3 bg-mist-gray rounded-lg cursor-pointer hover:bg-gray-200 transition-colors"
                  onClick={() => setShowGuestsDialog(true)}
                >
                  <Users className="w-5 h-5 text-[#006564]" />
                  <div className="flex-1">
                    <p className="text-xs text-muted-foreground">Guests</p>
                    <p className="text-sm">{getGuestsDisplay()}</p>
                  </div>
                </div>
              </div>

              <Button 
                className="w-full bg-[#006564] hover:bg-[#367D79] text-white disabled:opacity-50 disabled:cursor-not-allowed" 
                onClick={handleSearch}
                disabled={!selectedDestination || !dateRange?.from}
              >
                {selectedDestination && dateRange?.from ? 'Search Hotels' : 'Select Destination & Dates'}
              </Button>
            </div>
          </Card>
        </div>
      </div>

      {/* Star Filter */}
      <div className="px-4 pt-6 max-w-md mx-auto">
        <div className="mb-4">
          <p className="text-sm mb-3">Filter by Star Rating:</p>
          <div className="flex flex-wrap gap-2 pb-2">
            <button
              onClick={() => setSelectedStars(null)}
              className={`px-4 py-2 rounded-lg whitespace-nowrap transition-all ${
                selectedStars === null 
                  ? 'bg-[#006564] text-white' 
                  : 'bg-white border border-gray-200 hover:border-[#006564]'
              }`}
              aria-label="Show all hotels"
            >
              All Hotels
            </button>
            {[5, 4, 3, 2].map((starCount) => (
              <button
                key={starCount}
                onClick={() => setSelectedStars(starCount)}
                className={`px-4 py-2 rounded-lg flex items-center gap-1 whitespace-nowrap transition-all ${
                  selectedStars === starCount 
                    ? 'bg-[#006564] text-white' 
                    : 'bg-white border border-gray-200 hover:border-[#006564]'
                }`}
                aria-label={`Show ${starCount} star hotels`}
              >
                <Star className={`w-4 h-4 ${selectedStars === starCount ? 'fill-white' : 'fill-yellow-400 text-yellow-400'}`} />
                <span>{starCount}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Hotel Listings */}
      <div className="px-4 max-w-md mx-auto">
        <div className="flex items-center justify-between mb-4">
          <h2>
            {selectedStars ? `${selectedStars}-Star Hotels` : 'All Hotels'} 
            <span className="text-muted-foreground ml-2">({filteredHotels.length})</span>
          </h2>
          <Badge variant="secondary" className="bg-[#006564]/10 text-[#006564]">
            Member Rates
          </Badge>
        </div>

        <div className="grid grid-cols-1 gap-4 pb-6">
          {filteredHotels.map((hotel) => (
            <Card key={hotel.id} className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
              <div className="h-48 relative">
                <ImageWithFallback 
                  src={hotel.image}
                  alt={hotel.name}
                  className="w-full h-full object-cover"
                />
                <Badge className="absolute top-3 left-3 bg-[#006564] text-white border-0">
                  <div className="flex items-center gap-1">
                    {Array.from({ length: hotel.stars }).map((_, i) => (
                      <Star key={i} className="w-3 h-3 fill-white" />
                    ))}
                  </div>
                </Badge>
              </div>
              <div className="p-4">
                <h3 className="mb-1">{hotel.name}</h3>
                <div className="flex items-center gap-1 text-muted-foreground mb-2">
                  <MapPin className="w-4 h-4" />
                  <p className="text-sm">{hotel.location}</p>
                </div>
                <div className="mb-3">
                  <p className="text-sm text-[#006564]">✨ {hotel.specialFeature}</p>
                </div>
                <div className="flex flex-wrap gap-2 mb-3">
                  {hotel.amenities.map((amenity) => (
                    <Badge key={amenity} variant="secondary" className="text-xs">
                      {amenity}
                    </Badge>
                  ))}
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[#006564]">HKD {hotel.pricePerNight.toLocaleString()}</p>
                    <p className="text-xs text-muted-foreground">per night</p>
                  </div>
                  <Button size="sm" className="bg-[#006564] hover:bg-[#367D79] text-white">
                    Book Now
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Destination Selection Dialog */}
      <Dialog open={showDestinationDialog} onOpenChange={setShowDestinationDialog}>
        <DialogContent className="max-w-md" aria-describedby="stay-destination-description">
          <DialogHeader>
            <DialogTitle>Select Destination</DialogTitle>
            <DialogDescription id="stay-destination-description">Choose your hotel destination city</DialogDescription>
          </DialogHeader>
          <div className="space-y-2 max-h-[60vh] overflow-y-auto">
            {destinations.map((dest) => (
              <Card
                key={dest.code}
                className="p-3 cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => {
                  setSelectedDestination(dest.city);
                  setShowDestinationDialog(false);
                }}
              >
                <div className="flex items-center gap-3">
                  <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                    <ImageWithFallback 
                      src={dest.image}
                      alt={dest.city}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">{dest.city}</p>
                    <p className="text-sm text-muted-foreground">{dest.country}</p>
                  </div>
                  {selectedDestination === dest.city && (
                    <div className="w-6 h-6 rounded-full bg-[#006564] flex items-center justify-center text-white">
                      ✓
                    </div>
                  )}
                </div>
              </Card>
            ))}
          </div>
        </DialogContent>
      </Dialog>

      {/* Dates Selection Dialog */}
      <Dialog open={showDatesDialog} onOpenChange={setShowDatesDialog}>
        <DialogContent className="max-w-md" aria-describedby="stay-dates-description">
          <DialogHeader>
            <DialogTitle>Select Dates</DialogTitle>
            <DialogDescription id="stay-dates-description" className="sr-only">Select check-in and check-out dates for your hotel stay</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <p className="text-sm mb-3 text-muted-foreground">
                Select check-in and check-out dates
              </p>
              <CalendarComponent
                mode="range"
                selected={dateRange}
                onSelect={setDateRange}
                disabled={(date) => date < new Date()}
                numberOfMonths={1}
                className="rounded-md border mx-auto"
              />
            </div>
            <Button 
              className="w-full bg-[#006564] hover:bg-[#367D79] text-white"
              onClick={() => setShowDatesDialog(false)}
              disabled={!dateRange?.from}
            >
              Confirm Dates
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Guests Selection Dialog */}
      <Dialog open={showGuestsDialog} onOpenChange={setShowGuestsDialog}>
        <DialogContent className="max-w-md" aria-describedby="stay-guests-description">
          <DialogHeader>
            <DialogTitle>Select Guests & Rooms</DialogTitle>
            <DialogDescription id="stay-guests-description" className="sr-only">Select number of rooms, adults, and children for your hotel stay</DialogDescription>
          </DialogHeader>
          <div className="space-y-6 py-4">
            {/* Rooms */}
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Rooms</p>
                <p className="text-sm text-muted-foreground">Number of rooms</p>
              </div>
              <div className="flex items-center gap-3">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setRooms(Math.max(1, rooms - 1))}
                  disabled={rooms <= 1}
                  className="h-8 w-8"
                >
                  <Minus className="w-4 h-4" />
                </Button>
                <span className="w-8 text-center">{rooms}</span>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setRooms(Math.min(5, rooms + 1))}
                  disabled={rooms >= 5}
                  className="h-8 w-8"
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Adults */}
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Adults</p>
                <p className="text-sm text-muted-foreground">Age 12+</p>
              </div>
              <div className="flex items-center gap-3">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setAdults(Math.max(1, adults - 1))}
                  disabled={adults <= 1}
                  className="h-8 w-8"
                >
                  <Minus className="w-4 h-4" />
                </Button>
                <span className="w-8 text-center">{adults}</span>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setAdults(Math.min(9, adults + 1))}
                  disabled={adults >= 9}
                  className="h-8 w-8"
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Children */}
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Children</p>
                <p className="text-sm text-muted-foreground">Age 2-11</p>
              </div>
              <div className="flex items-center gap-3">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setChildren(Math.max(0, children - 1))}
                  disabled={children <= 0}
                  className="h-8 w-8"
                >
                  <Minus className="w-4 h-4" />
                </Button>
                <span className="w-8 text-center">{children}</span>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setChildren(Math.min(9, children + 1))}
                  disabled={children >= 9}
                  className="h-8 w-8"
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
            </div>

            <Button 
              className="w-full bg-[#006564] hover:bg-[#367D79] text-white"
              onClick={() => setShowGuestsDialog(false)}
            >
              Confirm Guests
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}