import { useState } from "react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Card } from "../ui/card";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import { ArrowLeft, Plane, Calendar, Users, ArrowRight, X, Plus, Minus } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "../ui/dialog";
import { Calendar as CalendarComponent } from "../ui/calendar";
import type { DateRange } from "react-day-picker";

interface FlightScreenProps {
  onBack: () => void;
}

export function FlightScreen({ onBack }: FlightScreenProps) {
  // State management
  const [selectedDepartureCity, setSelectedDepartureCity] = useState<string>('HKG');
  const [selectedDestination, setSelectedDestination] = useState<string>('');
  const [dateRange, setDateRange] = useState<DateRange | undefined>(undefined);
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [showDepartureCityDialog, setShowDepartureCityDialog] = useState(false);
  const [showDestinationDialog, setShowDestinationDialog] = useState(false);
  const [showDatesDialog, setShowDatesDialog] = useState(false);
  const [showTravelersDialog, setShowTravelersDialog] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  // Comprehensive list of 30+ cities worldwide
  const allCities = [
    { code: 'HKG', city: 'Hong Kong', country: 'Hong Kong SAR', image: 'https://images.unsplash.com/photo-1536599018102-9f803c140fc1?w=400' },
    { code: 'NRT', city: 'Tokyo', country: 'Japan', image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0b2t5byUyMGNpdHl8ZW58MXx8fHwxNzYxMTU2NTIzfDA&ixlib=rb-4.1.0&q=80&w=1080' },
    { code: 'SIN', city: 'Singapore', country: 'Singapore', image: 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzaW5nYXBvcmUlMjBza3lsaW5lfGVufDF8fHx8MTc2MTE1NjUyM3ww&ixlib=rb-4.1.0&q=80&w=1080' },
    { code: 'LHR', city: 'London', country: 'United Kingdom', image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsb25kb24lMjBza3lsaW5lfGVufDF8fHx8MTc2MTE1NjUyM3ww&ixlib=rb-4.1.0&q=80&w=1080' },
    { code: 'BKK', city: 'Bangkok', country: 'Thailand', image: 'https://images.unsplash.com/photo-1508009603885-50cf7c579365?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYW5na29rJTIwdGVtcGxlfGVufDF8fHx8MTc2MTE1NjUyM3ww&ixlib=rb-4.1.0&q=80&w=1080' },
    { code: 'DXB', city: 'Dubai', country: 'UAE', image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkdWJhaSUyMGNpdHl8ZW58MXx8fHwxNzYxMTU2NTIzfDA&ixlib=rb-4.1.0&q=80&w=1080' },
    { code: 'DPS', city: 'Bali', country: 'Indonesia', image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYWxpJTIwaW5kb25lc2lhfGVufDF8fHx8MTc2MTE1NjUyM3ww&ixlib=rb-4.1.0&q=80&w=1080' },
    { code: 'JFK', city: 'New York', country: 'USA', image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=400' },
    { code: 'LAX', city: 'Los Angeles', country: 'USA', image: 'https://images.unsplash.com/photo-1580655653885-65763b2597d0?w=400' },
    { code: 'SFO', city: 'San Francisco', country: 'USA', image: 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=400' },
    { code: 'CDG', city: 'Paris', country: 'France', image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=400' },
    { code: 'FCO', city: 'Rome', country: 'Italy', image: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=400' },
    { code: 'BCN', city: 'Barcelona', country: 'Spain', image: 'https://images.unsplash.com/photo-1583422409516-2895a77efded?w=400' },
    { code: 'FRA', city: 'Frankfurt', country: 'Germany', image: 'https://images.unsplash.com/photo-1564221710304-0b37c8b9d729?w=400' },
    { code: 'AMS', city: 'Amsterdam', country: 'Netherlands', image: 'https://images.unsplash.com/photo-1534351590666-13e3e96b5017?w=400' },
    { code: 'ICN', city: 'Seoul', country: 'South Korea', image: 'https://images.unsplash.com/photo-1517154421773-0529f29ea451?w=400' },
    { code: 'PVG', city: 'Shanghai', country: 'China', image: 'https://images.unsplash.com/photo-1537888788-1eb9fc9e1f0c?w=400' },
    { code: 'PEK', city: 'Beijing', country: 'China', image: 'https://images.unsplash.com/photo-1508804185872-d7badad00f7d?w=400' },
    { code: 'TPE', city: 'Taipei', country: 'Taiwan', image: 'https://images.unsplash.com/photo-1526481280693-3bfa7568e0f3?w=400' },
    { code: 'KUL', city: 'Kuala Lumpur', country: 'Malaysia', image: 'https://images.unsplash.com/photo-1596422846543-75c6fc197f07?w=400' },
    { code: 'MNL', city: 'Manila', country: 'Philippines', image: 'https://images.unsplash.com/photo-1554223090-3309bb91c270?w=400' },
    { code: 'DEL', city: 'New Delhi', country: 'India', image: 'https://images.unsplash.com/photo-1587474260584-136574528ed5?w=400' },
    { code: 'BOM', city: 'Mumbai', country: 'India', image: 'https://images.unsplash.com/photo-1566552881560-0be862a7c445?w=400' },
    { code: 'SYD', city: 'Sydney', country: 'Australia', image: 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?w=400' },
    { code: 'MEL', city: 'Melbourne', country: 'Australia', image: 'https://images.unsplash.com/photo-1514395462725-fb4566210144?w=400' },
    { code: 'AKL', city: 'Auckland', country: 'New Zealand', image: 'https://images.unsplash.com/photo-1507699622108-4be3abd695ad?w=400' },
    { code: 'YVR', city: 'Vancouver', country: 'Canada', image: 'https://images.unsplash.com/photo-1503614472-8c93d56e92ce?w=400' },
    { code: 'YYZ', city: 'Toronto', country: 'Canada', image: 'https://images.unsplash.com/photo-1517935706615-2717063c2225?w=400' },
    { code: 'GRU', city: 'São Paulo', country: 'Brazil', image: 'https://images.unsplash.com/photo-1541949890-f2af34fd7a3e?w=400' },
    { code: 'MEX', city: 'Mexico City', country: 'Mexico', image: 'https://images.unsplash.com/photo-1518659395039-4545e8c4dc73?w=400' },
    { code: 'JNB', city: 'Johannesburg', country: 'South Africa', image: 'https://images.unsplash.com/photo-1577948000111-9c970dfe3743?w=400' },
    { code: 'CAI', city: 'Cairo', country: 'Egypt', image: 'https://images.unsplash.com/photo-1572252009286-268acec5ca0a?w=400' },
    { code: 'IST', city: 'Istanbul', country: 'Turkey', image: 'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=400' },
    { code: 'DOH', city: 'Doha', country: 'Qatar', image: 'https://images.unsplash.com/photo-1604130589806-ff4de5a7a501?w=400' },
    { code: 'OSA', city: 'Osaka', country: 'Japan', image: 'https://images.unsplash.com/photo-1590253230532-a67f6bc61c9e?w=400' },
    { code: 'HND', city: 'Tokyo Haneda', country: 'Japan', image: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?w=400' },
  ];

  // Filter cities for departure (exclude selected destination)
  const departureCities = allCities.filter(city => city.code !== selectedDestination);
  
  // Filter cities for destination (exclude selected departure)
  const destinationCities = allCities.filter(city => city.code !== selectedDepartureCity);

  // Get selected city objects
  const selectedDepartureCityObj = allCities.find(city => city.code === selectedDepartureCity);
  const selectedDestinationObj = allCities.find(city => city.code === selectedDestination);

  // Available destinations (legacy, kept for compatibility)
  const destinations = destinationCities;

  // Flight data based on destination
  const allFlights: { [key: string]: any } = {
    'NRT': {
      to: 'Tokyo (NRT)',
      price: 3800,
      priceStr: 'HKD 3,800',
      miles: '48,000',
      duration: '4h 30m',
      aircraft: 'Airbus A350-900',
      image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0b2t5byUyMGNpdHl8ZW58MXx8fHwxNzYxMTU2NTIzfDA&ixlib=rb-4.1.0&q=80&w=1080'
    },
    'SIN': {
      to: 'Singapore (SIN)',
      price: 1800,
      priceStr: 'HKD 1,800',
      miles: '22,000',
      duration: '3h 45m',
      aircraft: 'Boeing 777-300',
      image: 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzaW5nYXBvcmUlMjBza3lsaW5lfGVufDF8fHx8MTc2MTE1NjUyM3ww&ixlib=rb-4.1.0&q=80&w=1080'
    },
    'LHR': {
      to: 'London (LHR)',
      price: 6800,
      priceStr: 'HKD 6,800',
      miles: '88,000',
      duration: '13h 30m',
      aircraft: 'Airbus A350-1000',
      image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsb25kb24lMjBza3lsaW5lfGVufDF8fHx8MTc2MTE1NjUyM3ww&ixlib=rb-4.1.0&q=80&w=1080'
    },
    'BKK': {
      to: 'Bangkok (BKK)',
      price: 1200,
      priceStr: 'HKD 1,200',
      miles: '15,000',
      duration: '2h 50m',
      aircraft: 'Airbus A321neo',
      image: 'https://images.unsplash.com/photo-1508009603885-50cf7c579365?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYW5na29rJTIwdGVtcGxlfGVufDF8fHx8MTc2MTE1NjUyM3ww&ixlib=rb-4.1.0&q=80&w=1080'
    },
    'DXB': {
      to: 'Dubai (DXB)',
      price: 4200,
      priceStr: 'HKD 4,200',
      miles: '52,000',
      duration: '8h 45m',
      aircraft: 'Airbus A350-900',
      image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkdWJhaSUyMGNpdHl8ZW58MXx8fHwxNzYxMTU2NTIzfDA&ixlib=rb-4.1.0&q=80&w=1080'
    },
    'DPS': {
      to: 'Bali (DPS)',
      price: 2400,
      priceStr: 'HKD 2,400',
      miles: '32,000',
      duration: '4h 20m',
      aircraft: 'Airbus A330-300',
      image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYWxpJTIwaW5kb25lc2lhfGVufDF8fHx8MTc2MTE1NjUyM3ww&ixlib=rb-4.1.0&q=80&w=1080'
    }
  };

  const popularRoutes = [
    {
      id: 1,
      from: 'Hong Kong (HKG)',
      to: 'Tokyo (NRT)',
      price: 'HKD 3,800',
      miles: '48,000',
      image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0b2t5byUyMGNpdHl8ZW58MXx8fHwxNzYxMTU2NTIzfDA&ixlib=rb-4.1.0&q=80&w=1080',
      duration: '4h 30m',
      aircraft: 'Airbus A350-900'
    },
    {
      id: 2,
      from: 'Hong Kong (HKG)',
      to: 'Singapore (SIN)',
      price: 'HKD 1,800',
      miles: '22,000',
      image: 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzaW5nYXBvcmUlMjBza3lsaW5lfGVufDF8fHx8MTc2MTE1NjUyM3ww&ixlib=rb-4.1.0&q=80&w=1080',
      duration: '3h 45m',
      aircraft: 'Boeing 777-300'
    },
    {
      id: 3,
      from: 'Hong Kong (HKG)',
      to: 'London (LHR)',
      price: 'HKD 6,800',
      miles: '88,000',
      image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsb25kb24lMjBza3lsaW5lfGVufDF8fHx8MTc2MTE1NjUyM3ww&ixlib=rb-4.1.0&q=80&w=1080',
      duration: '13h 30m',
      aircraft: 'Airbus A350-1000'
    },
    {
      id: 4,
      from: 'Hong Kong (HKG)',
      to: 'Bangkok (BKK)',
      price: 'HKD 1,200',
      miles: '15,000',
      image: 'https://images.unsplash.com/photo-1508009603885-50cf7c579365?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYW5na29rJTIwdGVtcGxlfGVufDF8fHx8MTc2MTE1NjUyM3ww&ixlib=rb-4.1.0&q=80&w=1080',
      duration: '2h 50m',
      aircraft: 'Airbus A321neo'
    }
  ];

  // Get selected destination details
  const getDestinationDisplay = () => {
    if (!selectedDestination) return 'Select destination';
    const dest = destinations.find(d => d.code === selectedDestination);
    return dest ? `${dest.city} (${dest.code})` : 'Select destination';
  };

  // Get dates display
  const getDatesDisplay = () => {
    if (!dateRange) return 'Select dates';
    const { from, to } = dateRange;
    if (!to) return from.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    return `${from.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - ${to.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`;
  };

  // Get travelers display
  const getTravelersDisplay = () => {
    const total = adults + children;
    if (total === 1) return '1 Adult';
    const parts = [];
    if (adults > 0) parts.push(`${adults} Adult${adults > 1 ? 's' : ''}`);
    if (children > 0) parts.push(`${children} Child${children > 1 ? 'ren' : ''}`);
    return parts.join(', ');
  };

  // Handle search
  const handleSearch = () => {
    if (selectedDestination && dateRange) {
      setHasSearched(true);
    }
  };

  // Calculate price based on travelers
  const calculatePrice = (basePrice: number) => {
    return basePrice * adults + (basePrice * 0.75 * children);
  };

  // Get filtered flights
  const getFilteredFlights = () => {
    if (!hasSearched || !selectedDestination) return popularRoutes;
    
    const flightData = allFlights[selectedDestination];
    if (!flightData) return popularRoutes;

    const totalTravelers = adults + children;
    const adjustedPrice = calculatePrice(flightData.price);

    return [{
      id: 1,
      from: 'Hong Kong (HKG)',
      to: flightData.to,
      price: `HKD ${adjustedPrice.toLocaleString()}`,
      miles: flightData.miles,
      image: flightData.image,
      duration: flightData.duration,
      aircraft: flightData.aircraft
    }];
  };

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
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div className="flex items-center gap-2">
              <Plane className="w-6 h-6" />
              <h1 className="text-white">Flight</h1>
            </div>
          </div>

          {/* Search Card */}
          <Card className="p-4 bg-white/95 backdrop-blur-sm">
            <div className="space-y-3">
              <div 
                className="flex items-center gap-3 p-3 bg-mist-gray rounded-lg cursor-pointer hover:bg-gray-200 transition-colors"
                onClick={() => setShowDepartureCityDialog(true)}
              >
                <Plane className="w-5 h-5 text-[#006564]" />
                <div className="flex-1">
                  <p className="text-xs text-muted-foreground">From</p>
                  <p>{selectedDepartureCityObj ? `${selectedDepartureCityObj.city} (${selectedDepartureCityObj.code})` : 'Select departure city'}</p>
                </div>
              </div>
              
              <div 
                className="flex items-center gap-3 p-3 bg-mist-gray rounded-lg cursor-pointer hover:bg-gray-200 transition-colors"
                onClick={() => setShowDestinationDialog(true)}
              >
                <Plane className="w-5 h-5 text-[#006564] rotate-90" />
                <div className="flex-1">
                  <p className="text-xs text-muted-foreground">To</p>
                  <p>{getDestinationDisplay()}</p>
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
                  onClick={() => setShowTravelersDialog(true)}
                >
                  <Users className="w-5 h-5 text-[#006564]" />
                  <div className="flex-1">
                    <p className="text-xs text-muted-foreground">Travelers</p>
                    <p className="text-sm">{getTravelersDisplay()}</p>
                  </div>
                </div>
              </div>

              <Button 
                className="w-full bg-[#006564] hover:bg-[#367D79] text-white disabled:opacity-50 disabled:cursor-not-allowed" 
                onClick={handleSearch}
                disabled={!selectedDestination || !dateRange}
              >
                {selectedDestination && dateRange ? 'Search Flights' : 'Select Destination & Dates'}
              </Button>
            </div>
          </Card>
        </div>
      </div>

      {/* Popular Routes */}
      <div className="px-4 pt-6 max-w-md mx-auto">
        <div className="flex items-center justify-between mb-4">
          <h2>Popular Routes</h2>
          <Badge variant="secondary" className="bg-[#006564]/10 text-[#006564]">
            Best Prices
          </Badge>
        </div>

        <div className="space-y-3">
          {getFilteredFlights().map((route) => (
            <Card key={route.id} className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
              <div className="flex">
                <div className="w-24 h-24 flex-shrink-0">
                  <ImageWithFallback 
                    src={route.image}
                    alt={route.to}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 p-3">
                  <div className="flex items-center gap-2 mb-2">
                    <p className="text-sm">{route.from}</p>
                    <ArrowRight className="w-4 h-4 text-muted-foreground" />
                    <p className="text-sm">{route.to}</p>
                  </div>
                  <p className="text-xs text-muted-foreground mb-2">
                    {route.duration} • {route.aircraft}
                  </p>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-[#006564]">From {route.price}</p>
                      <p className="text-xs text-muted-foreground">{route.miles} miles</p>
                    </div>
                    <Button size="sm" variant="outline" className="text-[#006564] border-[#006564]">
                      Select
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Departure City Selection Dialog */}
      <Dialog open={showDepartureCityDialog} onOpenChange={setShowDepartureCityDialog}>
        <DialogContent className="max-w-md" aria-describedby="departure-city-description">
          <DialogHeader>
            <DialogTitle>Select Departure City</DialogTitle>
            <DialogDescription id="departure-city-description">Choose your departure city from popular cities</DialogDescription>
          </DialogHeader>
          <div className="space-y-2 max-h-[60vh] overflow-y-auto">
            {departureCities.map((city) => (
              <Card
                key={city.code}
                className="p-3 cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => {
                  setSelectedDepartureCity(city.code);
                  setShowDepartureCityDialog(false);
                }}
              >
                <div className="flex items-center gap-3">
                  <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                    <ImageWithFallback 
                      src={city.image}
                      alt={city.city}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">{city.city}</p>
                    <p className="text-sm text-muted-foreground">{city.country}</p>
                    <p className="text-xs text-muted-foreground mt-1">{city.code}</p>
                  </div>
                  {selectedDepartureCity === city.code && (
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

      {/* Destination Selection Dialog */}
      <Dialog open={showDestinationDialog} onOpenChange={setShowDestinationDialog}>
        <DialogContent className="max-w-md" aria-describedby="destination-description">
          <DialogHeader>
            <DialogTitle>Select Destination</DialogTitle>
            <DialogDescription id="destination-description">Choose your flight destination from popular cities</DialogDescription>
          </DialogHeader>
          <div className="space-y-2 max-h-[60vh] overflow-y-auto">
            {destinations.map((dest) => (
              <Card
                key={dest.code}
                className="p-3 cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => {
                  setSelectedDestination(dest.code);
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
                    <p className="text-xs text-muted-foreground mt-1">{dest.code}</p>
                  </div>
                  {selectedDestination === dest.code && (
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
        <DialogContent className="max-w-md" aria-describedby="dates-description">
          <DialogHeader>
            <DialogTitle>Select Dates</DialogTitle>
            <DialogDescription id="dates-description" className="sr-only">Select departure and return dates for your flight</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <p className="text-sm mb-3 text-muted-foreground">
                Click a date to select departure, then click another for return (optional)
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

      {/* Travelers Selection Dialog */}
      <Dialog open={showTravelersDialog} onOpenChange={setShowTravelersDialog}>
        <DialogContent className="max-w-md" aria-describedby="travelers-description">
          <DialogHeader>
            <DialogTitle>Select Travelers</DialogTitle>
            <DialogDescription id="travelers-description" className="sr-only">Select number of adults and children traveling</DialogDescription>
          </DialogHeader>
          <div className="space-y-6 py-4">
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
              onClick={() => setShowTravelersDialog(false)}
            >
              Confirm Travelers
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}