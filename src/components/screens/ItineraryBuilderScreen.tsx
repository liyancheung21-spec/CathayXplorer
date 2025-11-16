import { useState, useMemo } from "react";
import { ArrowLeft, Plus, Clock, DollarSign, Sparkles } from "lucide-react";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { Badge } from "../ui/badge";
import { RouteMap } from "../RouteMap";
import { motion, AnimatePresence } from "motion/react";
import { ImageWithFallback } from "../figma/ImageWithFallback";

interface TripSuggestion {
  destination: string;
  country: string;
  duration: string;
  estimatedBudget: string;
  bestTimeToVisit: string;
  description: string;
  highlights: string[];
  flightOptions: FlightOption[];
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

interface ItineraryBuilderScreenProps {
  tripData?: TripSuggestion;
  selectedFlight?: number;
  selectedHotel?: number;
  selectedAddOns?: number[];
  onBack: () => void;
  onCheckout: () => void;
}

export function ItineraryBuilderScreen({ 
  tripData, 
  selectedFlight = 0,
  selectedHotel = 0,
  selectedAddOns = [],
  onBack, 
  onCheckout 
}: ItineraryBuilderScreenProps) {
  const [selectedDay, setSelectedDay] = useState(1);
  
  // Get the number of days from the itinerary length
  const tripDays = tripData?.itinerary.length || 3;
  
  // Extract number of nights from duration string to match AIResultsScreen calculation
  const numberOfNights = tripData 
    ? parseInt(tripData.duration.match(/\d+/)?.[0] || '1')
    : 3;
  
  // Convert AI trip data to itinerary items for the selected day
  const currentDayItinerary = tripData?.itinerary.find(day => day.day === selectedDay);
  
  const tripItems = currentDayItinerary ? 
    currentDayItinerary.activities.map((activity, idx) => ({
      id: idx + 1,
      type: activity.type || 'activity',
      time: activity.time,
      title: activity.title,
      details: activity.description,
      price: activity.cost || 'Free',
      duration: activity.duration,
    }))
    : [];

  // Calculate totals from trip data using actual selections
  // Uses same calculation as AIResultsScreen for consistency
  const totalCost = tripData 
    ? (() => {
        const flightCost = tripData.flightOptions[selectedFlight]?.price || 0;
        const hotelCost = (tripData.hotelOptions[selectedHotel]?.pricePerNight || 0) * numberOfNights;
        const addOnsCost = selectedAddOns.reduce((sum, index) => {
          return sum + (tripData.addOnOptions[index]?.price || 0);
        }, 0);
        return flightCost + hotelCost + addOnsCost;
      })()
    : 10480;
  
  const totalMiles = tripData
    ? tripData.flightOptions[selectedFlight]?.asiaMiles + 
      (tripData.hotelOptions[selectedHotel]?.asiaMilesRedemption || 0)
    : 128000;

  // Prepare map route stops for the selected day
  const mapStops = currentDayItinerary?.activities
    .filter(activity => activity.lat && activity.lng)
    .map(activity => ({
      name: activity.title,
      lat: activity.lat!,
      lng: activity.lng!,
      description: activity.description,
      type: activity.type,
      time: activity.time,
      day: selectedDay,
    })) || [];

  // Preload all maps for all days (memoized to avoid recreating on every render)
  const allDayMaps = useMemo(() => {
    if (!tripData?.itinerary) return [];
    
    return tripData.itinerary.map(dayData => {
      const stops = dayData.activities
        .filter(activity => activity.lat && activity.lng)
        .map(activity => ({
          name: activity.title,
          lat: activity.lat!,
          lng: activity.lng!,
          description: activity.description,
          type: activity.type,
          time: activity.time,
          day: dayData.day,
        }));
      
      return { day: dayData.day, stops };
    });
  }, [tripData?.itinerary]);

  const getEmojiForType = (type?: string) => {
    switch (type) {
      case 'flight':
      case 'transport':
        return '✈️';
      case 'hotel':
        return '🏨';
      case 'restaurant':
        return '🍽️';
      case 'attraction':
        return '⛩️';
      default:
        return '📍';
    }
  };

  return (
    <div className="min-h-screen bg-mist-gray">
      {/* Header */}
      <div className="bg-white px-5 pt-12 pb-4 sticky top-0 z-10 shadow-sm">
        <div className="max-w-md mx-auto">
          {/* Hero Image Banner */}
          <div className="relative -mx-5 -mt-4 mb-4 h-48 overflow-hidden">
            <ImageWithFallback 
              src="https://images.unsplash.com/photo-1591194233688-dca69d406068?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxUb2t5byUyMHNreWxpbmUlMjBjaXR5c2NhcGV8ZW58MXx8fHwxNzYxMzE5OTMzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              alt={tripData ? `${tripData.destination} cityscape` : 'Tokyo cityscape'}
              className="w-full h-full object-cover"
            />
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/70" />
            
            {/* Content Overlay */}
            <div className="absolute inset-0 flex flex-col justify-between p-5 pt-8">
              {/* Top Section with Back Button and AI Optimize */}
              <div className="flex items-center justify-between">
                <button onClick={onBack} className="w-9 h-9 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center hover:bg-white/30 transition-colors">
                  <ArrowLeft className="w-5 h-5 text-white" />
                </button>
                <Button variant="ghost" size="sm" className="bg-white/20 backdrop-blur-md text-white hover:bg-white/30 hover:text-white border-0">
                  <Sparkles className="w-4 h-4 mr-1" />
                  AI Optimize
                </Button>
              </div>

              {/* Bottom Section with Trip Info */}
              <div>
                <h2 className="text-white">{tripData ? `${tripData.destination} Trip` : 'Tokyo Cherry Blossom'}</h2>
                <p className="text-white/90 text-sm">
                  {tripData ? tripData.duration : 'Mar 25 - 29, 2025'}
                </p>
              </div>
            </div>
          </div>

          {/* Budget Summary */}
          <div 
            className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide"
            onTouchStart={(e) => e.stopPropagation()}
            onTouchMove={(e) => e.stopPropagation()}
            onTouchEnd={(e) => e.stopPropagation()}
          >
            <div className="flex-1 p-3 rounded-lg bg-white shadow-sm min-w-[120px]">
              <p className="text-muted-foreground text-xs">Total Cost</p>
              <p className="text-sm">HKD {totalCost.toLocaleString()}</p>
              <p className="text-muted-foreground" style={{ fontSize: '10px', marginTop: '2px' }}>
                Flight + {numberOfNights} night{numberOfNights > 1 ? 's' : ''} hotel{selectedAddOns.length > 0 ? ` + ${selectedAddOns.length} add-on${selectedAddOns.length > 1 ? 's' : ''}` : ''}
              </p>
            </div>
            <div className="flex-1 p-3 rounded-lg bg-white shadow-sm min-w-[120px]">
              <p className="text-muted-foreground text-xs">Or Miles</p>
              <p className="text-sm">{totalMiles.toLocaleString()}</p>
            </div>
            <div className="flex-1 p-3 rounded-lg bg-white shadow-sm min-w-[100px]">
              <p className="text-muted-foreground text-xs">Duration</p>
              <p className="text-sm">{tripData?.duration || '3-4 days'}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content - Scrollable */}
      <div className="px-5 pt-4 pb-24 max-w-md mx-auto">
        {/* Day Selector */}
        <div 
          className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide"
          onTouchStart={(e) => e.stopPropagation()}
          onTouchMove={(e) => e.stopPropagation()}
          onTouchEnd={(e) => e.stopPropagation()}
        >
          <div className="flex-1 p-3 rounded-lg bg-white shadow-sm min-w-[120px]">
            <p className="text-muted-foreground text-xs">Total Cost</p>
            <p className="text-sm">HKD {totalCost.toLocaleString()}</p>
            <p className="text-muted-foreground" style={{ fontSize: '10px', marginTop: '2px' }}>
              Flight + {numberOfNights} night{numberOfNights > 1 ? 's' : ''} hotel{selectedAddOns.length > 0 ? ` + ${selectedAddOns.length} add-on${selectedAddOns.length > 1 ? 's' : ''}` : ''}
            </p>
          </div>
          {Array.from({ length: tripDays }, (_, i) => i + 1).map((day) => (
            <motion.button
              key={day}
              onClick={() => setSelectedDay(day)}
              className={`flex-shrink-0 w-16 p-3 rounded-lg text-center transition-colors ${
                day === selectedDay ? 'text-white' : 'bg-white text-charcoal'
              }`}
              style={day === selectedDay ? { backgroundColor: 'var(--cathay-jade)' } : {}}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              <p className="opacity-80">Day</p>
              <p>{day}</p>
            </motion.button>
          ))}
        </div>

        {/* Animated Day Content Wrapper */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedDay}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            {/* Day Title */}
            <div className="mt-4 mb-3">
              <h3>{currentDayItinerary?.title || 'Day Itinerary'}</h3>
            </div>

            {/* Map View - Preloaded */}
            <div className="mb-4 relative z-0 isolate">
              <div className="h-[280px] rounded-lg overflow-hidden relative">
                {/* Render all maps but only show current day's map */}
                {allDayMaps.map((dayMap) => (
                  <div
                    key={dayMap.day}
                    className="absolute inset-0"
                    style={{
                      opacity: dayMap.day === selectedDay ? 1 : 0,
                      pointerEvents: dayMap.day === selectedDay ? 'auto' : 'none',
                      transition: 'opacity 0.3s ease-in-out'
                    }}
                  >
                    {dayMap.stops.length > 0 && (
                      <RouteMap stops={dayMap.stops} />
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Timeline Items */}
            <div className="space-y-3">
              {tripItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  <Card className="p-4 cursor-move hover:shadow-md transition-shadow">
                    <div className="flex gap-3">
                      <div className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center" 
                           style={{ backgroundColor: 'var(--mist-gray)' }}>
                        {getEmojiForType(item.type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2 mb-1">
                          <div className="flex-1 min-w-0">
                            <p className="truncate">{item.title}</p>
                            <p className="text-muted-foreground text-sm">{item.details}</p>
                          </div>
                          <button className="flex-shrink-0 w-6 h-6 rounded-full bg-mist-gray flex items-center justify-center text-muted-foreground hover:bg-destructive hover:text-destructive-foreground transition-colors">
                            ×
                          </button>
                        </div>
                        <div className="flex items-center gap-2 mt-2 text-xs flex-wrap">
                          <div className="flex items-center gap-1 text-muted-foreground">
                            <Clock className="w-3 h-3" />
                            <p>{item.time}</p>
                          </div>
                          {item.duration && (
                            <Badge variant="outline" className="text-xs">{item.duration}</Badge>
                          )}
                          {item.price && item.price !== 'Free' && (
                            <div className="flex items-center gap-1 text-muted-foreground">
                              <DollarSign className="w-3 h-3" />
                              <p>{item.price}</p>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}

              {/* Add Activity Button */}
              <motion.button 
                className="w-full p-4 rounded-lg border-2 border-dashed border-border hover:border-[#006564] hover:bg-mist-gray transition-colors flex items-center justify-center gap-2 text-muted-foreground hover:text-[#006564]"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: tripItems.length * 0.05 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Plus className="w-5 h-5" />
                <span>Add activity</span>
              </motion.button>
            </div>

            {/* AI Suggestions */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: (tripItems.length + 1) * 0.05 }}
            >
              <Card className="mt-4 p-4 bg-gradient-to-r from-[#006564]/5 to-[#367D79]/5 border-[#006564]/20">
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#006564] flex items-center justify-center">
                    <Sparkles className="w-4 h-4 text-white" />
                  </div>
                  <div className="flex-1">
                    <p>AI Suggestions</p>
                    <p className="text-muted-foreground mb-3">
                      {tripData 
                        ? `Explore more activities in ${tripData.destination}` 
                        : 'Add dinner reservation at Sukiyabashi Jiro'}
                    </p>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">Add</Button>
                      <Button size="sm" variant="ghost">More ideas</Button>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Floating CTA */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-border pt-[9px] pr-[20px] pb-[20px] pl-[20px] mx-[0px] m-[0px]">
        <div className="max-w-md mx-auto flex items-center gap-3">
          <div className="flex-1">
            <p className="text-muted-foreground">Total</p>
            <p>HKD {totalCost.toLocaleString()}</p>
            <p className="text-muted-foreground" style={{ fontSize: '11px' }}>
              Flights, hotels & add-ons only
            </p>
          </div>
          <Button 
            onClick={onCheckout}
            size="lg" 
            className="flex-1"
            style={{ backgroundColor: 'var(--cathay-jade)' }}
          >
            Continue to Checkout
          </Button>
        </div>
      </div>
    </div>
  );
}