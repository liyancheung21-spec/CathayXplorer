import { useState, useRef } from "react";
import { Globe, Filter, Plus, MapPin, Search, ChevronLeft, Share2, Settings, X } from "lucide-react";
import { Button } from "../ui/button";
import { TripCard } from "../TripCard";
import { ActivityCard } from "../ActivityCard";
import { Badge } from "../ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "../ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { InteractiveMap } from "../InteractiveMap";
import { RouteMap } from "../RouteMap";

interface PlanExploreScreenProps {
  onNavigateToDestination?: () => void;
}

export function PlanExploreScreen({ onNavigateToDestination }: PlanExploreScreenProps) {
  const [activeTab, setActiveTab] = useState<'plans' | 'explore'>('plans');
  const [showPlanBuilder, setShowPlanBuilder] = useState(false);
  const [selectedDay, setSelectedDay] = useState(1);
  const [showMapView, setShowMapView] = useState(false);
  const [showExpandedMap, setShowExpandedMap] = useState(false);
  const mapControlsRef = useRef<{ centerOnLocation: (lat: number, lng: number, zoom?: number) => void } | null>(null);

  // Mock data
  const currentTrip = {
    id: '1',
    coverImage: 'https://images.unsplash.com/photo-1719360569529-bef1b1f331a7?w=800',
    tripName: 'Tokyo Cherry Blossom',
    destination: 'Tokyo, Japan',
    dates: 'Mar 25-29, 2025',
    progress: 75,
    status: 'upcoming' as const,
    travelers: 2
  };

  // Detailed route data matching the exact activities for each day with accurate GPS coordinates
  const routeStops = [
    // Day 1 - Arrival in Tokyo (5 activities)
    { 
      name: 'Hong Kong International Airport', 
      lat: 22.3080, 
      lng: 113.9185,
      description: 'Flight CX500 to Tokyo Narita',
      type: 'transport' as const,
      time: '06:00',
      day: 1
    },
    { 
      name: 'Narita International Airport', 
      lat: 35.7650, 
      lng: 140.3861,
      description: 'Arrival Terminal 1 • Take Narita Express',
      type: 'transport' as const,
      time: '14:30',
      day: 1
    },
    { 
      name: 'Park Hyatt Tokyo', 
      lat: 35.6854, 
      lng: 139.6917,
      description: 'Luxury hotel in Shinjuku • Room 1504',
      type: 'hotel' as const,
      time: '16:00',
      day: 1
    },
    { 
      name: 'Ichiran Ramen Shibuya', 
      lat: 35.6617, 
      lng: 139.6992,
      description: 'Famous individual booth ramen experience',
      type: 'restaurant' as const,
      time: '18:30',
      day: 1
    },
    { 
      name: 'Shibuya Crossing', 
      lat: 35.6595, 
      lng: 139.7004,
      description: 'World\'s busiest pedestrian crossing',
      type: 'attraction' as const,
      time: '20:00',
      day: 1
    },
    
    // Day 2 - Tokyo Exploration (5 activities)
    { 
      name: 'Tsukiji Outer Market', 
      lat: 35.6654, 
      lng: 139.7707,
      description: 'Fresh seafood and traditional breakfast',
      type: 'attraction' as const,
      time: '06:00',
      day: 2
    },
    { 
      name: 'Senso-ji Temple', 
      lat: 35.7148, 
      lng: 139.7967,
      description: 'Tokyo\'s oldest temple in Asakusa',
      type: 'attraction' as const,
      time: '09:30',
      day: 2
    },
    { 
      name: 'Tempura Daikokuya', 
      lat: 35.7125, 
      lng: 139.7960,
      description: 'Traditional tempura restaurant near Senso-ji',
      type: 'restaurant' as const,
      time: '12:00',
      day: 2
    },
    { 
      name: 'Tokyo Skytree', 
      lat: 35.7101, 
      lng: 139.8107,
      description: 'World\'s tallest tower at 634m',
      type: 'attraction' as const,
      time: '14:30',
      day: 2
    },
    { 
      name: 'teamLab Borderless', 
      lat: 35.6249, 
      lng: 139.7755,
      description: 'Immersive digital art museum in Odaiba',
      type: 'attraction' as const,
      time: '18:00',
      day: 2
    },
    
    // Day 3 - Hakone Day Trip (5 activities)
    { 
      name: 'Shinjuku Station', 
      lat: 35.6896, 
      lng: 139.7006,
      description: 'Romancecar departure to Hakone-Yumoto',
      type: 'transport' as const,
      time: '08:00',
      day: 3
    },
    { 
      name: 'Hakone Ropeway (Owakudani)', 
      lat: 35.2439, 
      lng: 139.0236,
      description: 'Active volcanic valley with sulfur vents',
      type: 'attraction' as const,
      time: '10:30',
      day: 3
    },
    { 
      name: 'Lake Ashi Restaurant', 
      lat: 35.1934, 
      lng: 139.0259,
      description: 'Lunch with Mt. Fuji views',
      type: 'restaurant' as const,
      time: '12:30',
      day: 3
    },
    { 
      name: 'Lake Ashi Pirate Ship', 
      lat: 35.1950, 
      lng: 139.0280,
      description: 'Scenic cruise on Lake Ashi',
      type: 'attraction' as const,
      time: '14:00',
      day: 3
    },
    { 
      name: 'Hakone-Yumoto Station', 
      lat: 35.2325, 
      lng: 139.1062,
      description: 'Return Romancecar to Shinjuku',
      type: 'transport' as const,
      time: '16:30',
      day: 3
    },
    
    // Day 4 - Travel to Kyoto (5 activities)
    { 
      name: 'Tokyo Station', 
      lat: 35.6812, 
      lng: 139.7671,
      description: 'Shinkansen Nozomi to Kyoto',
      type: 'transport' as const,
      time: '08:30',
      day: 4
    },
    { 
      name: 'The Ritz-Carlton Kyoto', 
      lat: 35.0048, 
      lng: 135.7712,
      description: 'Luxury hotel along Kamogawa River',
      type: 'hotel' as const,
      time: '11:30',
      day: 4
    },
    { 
      name: 'Nishiki Market', 
      lat: 35.0050, 
      lng: 135.7650,
      description: 'Kyoto\'s 400-year-old food market',
      type: 'attraction' as const,
      time: '12:30',
      day: 4
    },
    { 
      name: 'Fushimi Inari Shrine', 
      lat: 34.9671, 
      lng: 135.7727,
      description: 'Famous for 10,000 torii gates',
      type: 'attraction' as const,
      time: '15:00',
      day: 4
    },
    { 
      name: 'Gion District', 
      lat: 35.0033, 
      lng: 135.7783,
      description: 'Historic geisha district',
      type: 'attraction' as const,
      time: '18:30',
      day: 4
    },
    
    // Day 5 - Arashiyama & Departure (5 activities)
    { 
      name: 'Arashiyama Bamboo Grove', 
      lat: 35.0170, 
      lng: 135.6719,
      description: 'Enchanting bamboo forest path',
      type: 'attraction' as const,
      time: '08:00',
      day: 5
    },
    { 
      name: 'Monkey Park Iwatayama', 
      lat: 35.0093, 
      lng: 135.6784,
      description: 'Wild monkey park with city views',
      type: 'attraction' as const,
      time: '10:30',
      day: 5
    },
    { 
      name: 'Arashiyama Local Restaurant', 
      lat: 35.0145, 
      lng: 135.6730,
      description: 'Traditional tofu cuisine lunch',
      type: 'restaurant' as const,
      time: '12:30',
      day: 5
    },
    { 
      name: 'Kyoto Station', 
      lat: 34.9858, 
      lng: 135.7582,
      description: 'Shinkansen return to Tokyo',
      type: 'transport' as const,
      time: '14:30',
      day: 5
    },
    { 
      name: 'Narita International Airport', 
      lat: 35.7650, 
      lng: 140.3861,
      description: 'Flight CX505 departure to Hong Kong',
      type: 'transport' as const,
      time: '18:00',
      day: 5
    },
  ];

  const futurePlans = [
    {
      id: '2',
      coverImage: 'https://images.unsplash.com/photo-1717501787981-d5f28eb2df5f?w=800',
      tripName: 'Bali Retreat',
      destination: 'Bali, Indonesia',
      dates: 'Jun 10-17, 2025',
      progress: 30,
      status: 'draft' as const,
      travelers: 2
    },
    {
      id: '3',
      coverImage: 'https://images.unsplash.com/photo-1431274172761-fca41d930114?w=800',
      tripName: 'Paris Romance',
      destination: 'Paris, France',
      dates: 'Sep 5-12, 2025',
      progress: 15,
      status: 'draft' as const,
      travelers: 2
    }
  ];

  const exploreIdeas = [
    {
      id: '1',
      image: 'https://images.unsplash.com/photo-1698518698544-618e442b0f4e?w=400',
      title: 'Seoul City Lights',
      location: 'Seoul, South Korea',
      price: 'HKD 2,900',
      miles: '36,000',
      lat: 37.5665,
      lng: 126.9780
    },
    {
      id: '2',
      image: 'https://images.unsplash.com/photo-1563492065599-3520f775eeed?w=400',
      title: 'Bangkok Adventure',
      location: 'Bangkok, Thailand',
      price: 'HKD 1,600',
      miles: '20,000',
      lat: 13.7563,
      lng: 100.5018
    },
    {
      id: '3',
      image: 'https://images.unsplash.com/photo-1686455746285-4a921419bc6c?w=400',
      title: 'Singapore Stopover',
      location: 'Singapore',
      price: 'HKD 1,800',
      miles: '22,000',
      lat: 1.3521,
      lng: 103.8198
    }
  ];

  // Activities organized by day with realistic timing and travel methods
  const activitiesByDay: { [key: number]: Array<{ id: string; time: string; icon: string; title: string; subtitle: string }> } = {
    1: [
      {
        id: '1-1',
        time: '09:00',
        icon: '✈️',
        title: 'Flight CX502',
        subtitle: 'HKG → NRT • 4h 30m'
      },
      {
        id: '1-2',
        time: '14:30',
        icon: '🚄',
        title: 'Narita Express to Tokyo',
        subtitle: 'Terminal 1 → Tokyo Station • 1h'
      },
      {
        id: '1-3',
        time: '16:00',
        icon: '🏨',
        title: 'Check-in Park Hyatt Tokyo',
        subtitle: 'Shinjuku • Room 1504'
      },
      {
        id: '1-4',
        time: '18:30',
        icon: '🍜',
        title: 'Dinner at Ichiran Ramen',
        subtitle: 'Shibuya (15 min walk) • Casual'
      },
      {
        id: '1-5',
        time: '20:00',
        icon: '🌃',
        title: 'Shibuya Crossing Experience',
        subtitle: 'Adjacent to restaurant • 1h explore'
      }
    ],
    2: [
      {
        id: '2-1',
        time: '06:00',
        icon: '🐟',
        title: 'Tsukiji Outer Market',
        subtitle: '🚇 Hibiya Line 25 min • Fresh breakfast'
      },
      {
        id: '2-2',
        time: '09:30',
        icon: '⛩️',
        title: 'Senso-ji Temple',
        subtitle: '🚇 Ginza Line 15 min • Asakusa'
      },
      {
        id: '2-3',
        time: '12:00',
        icon: '🍱',
        title: 'Lunch at Tempura Daikokuya',
        subtitle: 'Walking distance • Traditional'
      },
      {
        id: '2-4',
        time: '14:30',
        icon: '🗼',
        title: 'Tokyo Skytree',
        subtitle: '🚶 10 min walk • 1.5h visit'
      },
      {
        id: '2-5',
        time: '18:00',
        icon: '🎨',
        title: 'teamLab Borderless',
        subtitle: '🚇 Yurikamome Line 35 min • Odaiba'
      }
    ],
    3: [
      {
        id: '3-1',
        time: '08:00',
        icon: '🚄',
        title: 'Romancecar to Hakone',
        subtitle: 'Shinjuku → Hakone-Yumoto • 1h 25m'
      },
      {
        id: '3-2',
        time: '10:30',
        icon: '🚠',
        title: 'Hakone Ropeway',
        subtitle: 'Owakudani • Active volcanic valley'
      },
      {
        id: '3-3',
        time: '12:30',
        icon: '🍽️',
        title: 'Lunch with Mt. Fuji View',
        subtitle: 'Lake Ashi area • Local cuisine'
      },
      {
        id: '3-4',
        time: '14:00',
        icon: '⛵',
        title: 'Lake Ashi Cruise',
        subtitle: 'Pirate ship • 30 min scenic ride'
      },
      {
        id: '3-5',
        time: '16:30',
        icon: '🚄',
        title: 'Return to Tokyo',
        subtitle: 'Hakone-Yumoto → Shinjuku • 1h 25m'
      }
    ],
    4: [
      {
        id: '4-1',
        time: '08:30',
        icon: '🚄',
        title: 'Shinkansen to Kyoto',
        subtitle: 'Tokyo → Kyoto • 2h 15m • Nozomi'
      },
      {
        id: '4-2',
        time: '11:30',
        icon: '🏨',
        title: 'Drop bags at Hotel',
        subtitle: 'The Ritz-Carlton Kyoto • Quick stop'
      },
      {
        id: '4-3',
        time: '12:30',
        icon: '🍵',
        title: 'Lunch at Nishiki Market',
        subtitle: '🚇 5 min • Food tasting tour'
      },
      {
        id: '4-4',
        time: '15:00',
        icon: '⛩️',
        title: 'Fushimi Inari Shrine',
        subtitle: '🚇 JR Line 15 min • 1000 torii gates'
      },
      {
        id: '4-5',
        time: '18:30',
        icon: '🏮',
        title: 'Gion District Evening Walk',
        subtitle: '🚇 Keihan Line 20 min • Geisha spotting'
      }
    ],
    5: [
      {
        id: '5-1',
        time: '08:00',
        icon: '🎋',
        title: 'Arashiyama Bamboo Grove',
        subtitle: '🚇 JR Line 20 min • Early morning visit'
      },
      {
        id: '5-2',
        time: '10:30',
        icon: '🐵',
        title: 'Monkey Park Iwatayama',
        subtitle: 'Walking distance • Mountain views'
      },
      {
        id: '5-3',
        time: '12:30',
        icon: '🍜',
        title: 'Lunch at Local Restaurant',
        subtitle: 'Arashiyama area • Tofu cuisine'
      },
      {
        id: '5-4',
        time: '14:30',
        icon: '🚄',
        title: 'Shinkansen to Tokyo',
        subtitle: 'Kyoto → Tokyo • 2h 15m'
      },
      {
        id: '5-5',
        time: '18:00',
        icon: '✈️',
        title: 'Flight CX505 to HKG',
        subtitle: 'NRT → HKG • Departure'
      }
    ]
  };

  // Get activities for the selected day
  const dayActivities = activitiesByDay[selectedDay] || [];

  return (
    <div className="min-h-screen bg-mist-gray">
      {/* Top spacing for fixed status bar */}
      <div className="h-[52px]" />
      
      {/* Header with Segmented Control */}
      <div className="px-5 pt-12 pb-6 text-white" style={{ background: 'linear-gradient(135deg, #006564 0%, #367D79 100%)' }}>
        <div className="max-w-md mx-auto">
          <h1 className="text-white mb-2 text-2xl font-medium">Plan Your Journey</h1>
          <p className="text-white/80 pt-[0px] pr-[0px] pb-[10px] pl-[0px]">Create itineraries, manage trips & explore ideas</p>
          
          <div className="flex gap-1 p-1 rounded-full">
            <button
              onClick={() => setActiveTab('plans')}
              className={`flex-1 py-2.5 rounded-full transition-all flex items-center justify-center ${
                activeTab === 'plans'
                  ? 'text-white shadow-sm border-2 border-white'
                  : 'bg-white'
              }`}
              style={activeTab === 'plans' ? { backgroundColor: 'var(--cathay-jade-light)' } : { color: 'var(--cathay-jade)' }}
            >
              <span className="text-[16px]">My Plans</span>
            </button>
            <button
              onClick={() => setActiveTab('explore')}
              className={`flex-1 py-2.5 rounded-full transition-all flex items-center justify-center ${
                activeTab === 'explore'
                  ? 'text-white shadow-sm'
                  : 'bg-white'
              }`}
              style={activeTab === 'explore' ? { backgroundColor: 'var(--cathay-jade-light)', border: '2px solid white' } : { color: 'var(--cathay-jade)' }}
            >
              <span>Explore Ideas</span>
            </button>
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div className="pb-24">
        {activeTab === 'plans' ? (
          <div className="px-4 pt-5 max-w-md mx-auto space-y-5">
            {/* Current Trip Card */}
            <div>
              <h3 className="mb-3">Current Trip</h3>
              <TripCard 
                {...currentTrip} 
                onClick={() => setShowPlanBuilder(true)}
              />
            </div>

            {/* Future Plans */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3>Future Plans</h3>
                <Badge variant="outline">{futurePlans.length}</Badge>
              </div>
              <div className="space-y-4">
                {futurePlans.map((plan) => (
                  <TripCard 
                    key={plan.id} 
                    {...plan}
                    onClick={() => setShowPlanBuilder(true)}
                  />
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="max-w-md mx-auto">
            {/* Interactive Map */}
            <div className="relative h-[450px] z-0 isolate">
              <InteractiveMap 
                destinations={exploreIdeas}
                onDestinationClick={onNavigateToDestination}
              />

              {/* Floating Search Bar */}
              <div className="absolute top-4 left-4 right-4 z-[1000]">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input
                    type="search"
                    placeholder="Search destinations"
                    className="w-full pl-11 pr-4 py-3 rounded-full bg-white shadow-lg border-0 focus:outline-none focus:ring-2 focus:ring-[#006564]"
                  />
                </div>
              </div>
            </div>

            {/* Idea Carousel */}
            <div className="px-4 py-5 bg-white">
              <h3 className="mb-4">Curated for You</h3>
              <div 
                className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide -mx-4 px-4"
                onTouchStart={(e) => e.stopPropagation()}
                onTouchMove={(e) => e.stopPropagation()}
                onTouchEnd={(e) => e.stopPropagation()}
              >
                {exploreIdeas.map((idea) => (
                  <div
                    key={idea.id}
                    className="flex-shrink-0 w-64 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow cursor-pointer"
                    onClick={onNavigateToDestination}
                  >
                    <div className="relative aspect-[4/3]">
                      <img 
                        src={idea.image} 
                        alt={idea.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      <div className="absolute bottom-3 left-3 right-3 text-white">
                        <p className="text-white mb-1 text-sm line-clamp-1">{idea.title}</p>
                        <div className="flex items-center gap-1 text-white/90 text-xs">
                          <MapPin className="w-3 h-3" />
                          <span className="truncate">{idea.location}</span>
                        </div>
                      </div>
                    </div>
                    <div className="p-3 bg-white">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-xs text-muted-foreground">From</p>
                          <p className="text-sm">{idea.price}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-xs text-muted-foreground">Or</p>
                          <p className="text-xs">{idea.miles} mi</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Cathay Shop Section */}
            <div className="px-4 py-5 bg-white border-t border-border">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="mb-1">Cathay Shop</h3>
                  <p className="text-xs text-muted-foreground">Exclusive travel essentials & duty-free</p>
                </div>
                <button className="text-xs text-[#006564]">View All</button>
              </div>
              <div 
                className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide -mx-4 px-4"
                onTouchStart={(e) => e.stopPropagation()}
                onTouchMove={(e) => e.stopPropagation()}
                onTouchEnd={(e) => e.stopPropagation()}
              >
                {/* Wine Products */}
                <div className="flex-shrink-0 w-44 rounded-xl overflow-hidden border border-border hover:shadow-lg transition-shadow cursor-pointer bg-white">
                  <div className="relative aspect-square bg-gray-50">
                    <img 
                      src="https://images.unsplash.com/photo-1749983030057-801e003ad976?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGFtcGFnbmUlMjBib3R0bGUlMjBsdXh1cnl8ZW58MXx8fHwxNzYzMjE4NjIxfDA&ixlib=rb-4.1.0&q=80&w=1080" 
                      alt="Dom Pérignon Champagne"
                      className="w-full h-full object-cover"
                    />
                    <Badge className="absolute top-2 left-2 bg-[#006564] text-white text-xs">Wine</Badge>
                  </div>
                  <div className="p-3">
                    <p className="text-sm mb-1 line-clamp-2">Dom Pérignon Vintage 2015</p>
                    <p className="text-xs text-muted-foreground mb-2">750ml</p>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm">HKD 2,280</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-[#006564]">28,500 mi</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex-shrink-0 w-44 rounded-xl overflow-hidden border border-border hover:shadow-lg transition-shadow cursor-pointer bg-white">
                  <div className="relative aspect-square bg-gray-50">
                    <img 
                      src="https://images.unsplash.com/photo-1695048475495-6535686c473c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcmVtaXVtJTIwd2luZSUyMGJvdHRsZXxlbnwxfHx8fDE3NjMxMDkxODV8MA&ixlib=rb-4.1.0&q=80&w=1080" 
                      alt="Bordeaux Red Wine"
                      className="w-full h-full object-cover"
                    />
                    <Badge className="absolute top-2 left-2 bg-[#006564] text-white text-xs">Wine</Badge>
                  </div>
                  <div className="p-3">
                    <p className="text-sm mb-1 line-clamp-2">Château Margaux 2018</p>
                    <p className="text-xs text-muted-foreground mb-2">750ml</p>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm">HKD 4,580</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-[#006564]">57,200 mi</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Luggage Products */}
                <div className="flex-shrink-0 w-44 rounded-xl overflow-hidden border border-border hover:shadow-lg transition-shadow cursor-pointer bg-white">
                  <div className="relative aspect-square bg-gray-50">
                    <img 
                      src="https://images.unsplash.com/photo-1613255347963-408b0deb3633?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBsdWdnYWdlJTIwc3VpdGNhc2V8ZW58MXx8fHwxNzYzMjE4NjE4fDA&ixlib=rb-4.1.0&q=80&w=1080" 
                      alt="Premium Carry-On Luggage"
                      className="w-full h-full object-cover"
                    />
                    <Badge className="absolute top-2 left-2 bg-[#C1B49A] text-white text-xs">Luggage</Badge>
                  </div>
                  <div className="p-3">
                    <p className="text-sm mb-1 line-clamp-2">RIMOWA Essential Cabin</p>
                    <p className="text-xs text-muted-foreground mb-2">36L</p>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm">HKD 5,200</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-[#006564]">65,000 mi</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex-shrink-0 w-44 rounded-xl overflow-hidden border border-border hover:shadow-lg transition-shadow cursor-pointer bg-white">
                  <div className="relative aspect-square bg-gray-50">
                    <img 
                      src="https://images.unsplash.com/photo-1635289264208-88246c3b37ec?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cmF2ZWwlMjBiYWNrcGFjayUyMHByZW1pdW18ZW58MXx8fHwxNzYzMjE4NjIyfDA&ixlib=rb-4.1.0&q=80&w=1080" 
                      alt="Travel Backpack"
                      className="w-full h-full object-cover"
                    />
                    <Badge className="absolute top-2 left-2 bg-[#C1B49A] text-white text-xs">Luggage</Badge>
                  </div>
                  <div className="p-3">
                    <p className="text-sm mb-1 line-clamp-2">Tumi Alpha Bravo Backpack</p>
                    <p className="text-xs text-muted-foreground mb-2">25L</p>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm">HKD 3,280</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-[#006564]">41,000 mi</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Electronics Products */}
                <div className="flex-shrink-0 w-44 rounded-xl overflow-hidden border border-border hover:shadow-lg transition-shadow cursor-pointer bg-white">
                  <div className="relative aspect-square bg-gray-50">
                    <img 
                      src="https://images.unsplash.com/photo-1761005653657-0885604ddbcd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcmVtaXVtJTIwaGVhZHBob25lcyUyMGVsZWN0cm9uaWNzfGVufDF8fHx8MTc2MzIxODYxOXww&ixlib=rb-4.1.0&q=80&w=1080" 
                      alt="Noise-Canceling Headphones"
                      className="w-full h-full object-cover"
                    />
                    <Badge className="absolute top-2 left-2 bg-[#367D79] text-white text-xs">Electronics</Badge>
                  </div>
                  <div className="p-3">
                    <p className="text-sm mb-1 line-clamp-2">Sony WH-1000XM5 Headphones</p>
                    <p className="text-xs text-muted-foreground mb-2">Noise Canceling</p>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm">HKD 2,799</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-[#006564]">35,000 mi</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex-shrink-0 w-44 rounded-xl overflow-hidden border border-border hover:shadow-lg transition-shadow cursor-pointer bg-white">
                  <div className="relative aspect-square bg-gray-50">
                    <img 
                      src="https://images.unsplash.com/photo-1603721264882-ec0d3de93289?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cmF2ZWwlMjBjYW1lcmElMjBlbGVjdHJvbmljc3xlbnwxfHx8fDE3NjMyMTg2MjF8MA&ixlib=rb-4.1.0&q=80&w=1080" 
                      alt="Travel Camera"
                      className="w-full h-full object-cover"
                    />
                    <Badge className="absolute top-2 left-2 bg-[#367D79] text-white text-xs">Electronics</Badge>
                  </div>
                  <div className="p-3">
                    <p className="text-sm mb-1 line-clamp-2">Sony Alpha A7C II Camera</p>
                    <p className="text-xs text-muted-foreground mb-2">Full Frame</p>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm">HKD 14,990</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-[#006564]">187,000 mi</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Plan Builder Modal */}
      <Dialog open={showPlanBuilder} onOpenChange={setShowPlanBuilder}>
        <DialogContent className="max-w-md h-[90vh] p-0 flex flex-col">
          <DialogHeader className="sr-only">
            <DialogTitle>Trip Planner</DialogTitle>
            <DialogDescription>
              Plan and organize your trip itinerary with day-by-day activities
            </DialogDescription>
          </DialogHeader>

          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-border flex-shrink-0">
            <button 
              onClick={() => setShowPlanBuilder(false)}
              className="w-9 h-9 rounded-full bg-mist-gray flex items-center justify-center"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <input
              type="text"
              defaultValue="Tokyo Cherry Blossom"
              className="flex-1 mx-3 px-2 py-1 border-0 focus:outline-none text-center"
            />
            <div className="flex items-center gap-2">
              <button className="w-9 h-9 rounded-full bg-mist-gray flex items-center justify-center">
                <Share2 className="w-4 h-4" />
              </button>
              <button className="w-9 h-9 rounded-full bg-mist-gray flex items-center justify-center">
                <Settings className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Day Tabs */}
          <div className="px-4 py-3 border-b border-border flex-shrink-0">
            <div 
              className="flex gap-2 overflow-x-auto scrollbar-hide"
              onTouchStart={(e) => e.stopPropagation()}
              onTouchMove={(e) => e.stopPropagation()}
              onTouchEnd={(e) => e.stopPropagation()}
            >
              {[1, 2, 3, 4, 5].map((day) => (
                <button
                  key={day}
                  onClick={() => setSelectedDay(day)}
                  className={`flex-shrink-0 px-4 py-2 rounded-full transition-colors ${
                    selectedDay === day
                      ? 'bg-[#006564] text-white'
                      : 'bg-mist-gray text-foreground hover:bg-secondary'
                  }`}
                >
                  <span>Day {day}</span>
                </button>
              ))}
              <button className="flex-shrink-0 px-4 py-2 rounded-full bg-mist-gray text-foreground hover:bg-secondary flex items-center gap-1">
                <Plus className="w-4 h-4" />
                <span>Add Day</span>
              </button>
            </div>
          </div>

          {/* Itinerary Canvas */}
          <div className="flex-1 overflow-y-auto p-4">
            <div className="space-y-3 max-w-md mx-auto">
              {dayActivities.map((activity) => {
                // Find matching route stop by activity title
                const matchingStop = routeStops.find(stop => 
                  activity.title.toLowerCase().includes(stop.name.toLowerCase()) ||
                  stop.name.toLowerCase().includes(activity.title.toLowerCase())
                );
                
                return (
                  <ActivityCard 
                    key={activity.id} 
                    {...activity}
                    onClick={() => {
                      if (matchingStop && mapControlsRef.current) {
                        mapControlsRef.current.centerOnLocation(matchingStop.lat, matchingStop.lng, 15);
                      }
                    }}
                  />
                );
              })}

              {/* Add Activity Button */}
              <button className="w-full p-4 rounded-xl border-2 border-dashed border-border hover:border-[#006564] hover:bg-mist-gray transition-colors flex items-center justify-center gap-2 text-muted-foreground hover:text-[#006564]">
                <Plus className="w-5 h-5" />
                <span>Add Activity</span>
              </button>
            </div>
          </div>

          {/* Floating Mini-Map */}
          <div className="flex-shrink-0 border-t border-border bg-white p-4 overflow-hidden rounded-b-lg relative z-0 isolate">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-medium">Day {selectedDay} Route</span>
              <button className="text-xs text-[#006564]" onClick={() => setShowExpandedMap(true)}>Expand</button>
            </div>
            <RouteMap 
              stops={routeStops.filter(stop => stop.day === selectedDay)} 
              className="aspect-[16/9]"
              onMapReady={(controls) => {
                mapControlsRef.current = controls;
              }}
            />
          </div>

          {/* Floating FAB */}
          <button 
            className="absolute bottom-24 right-4 w-14 h-14 rounded-full bg-[#006564] shadow-lg flex items-center justify-center hover:scale-110 transition-transform"
          >
            <Plus className="w-6 h-6 text-white" />
          </button>
        </DialogContent>
      </Dialog>

      {/* Expanded Map Dialog */}
      <Dialog open={showExpandedMap} onOpenChange={setShowExpandedMap}>
        <DialogContent className="max-w-4xl h-[90vh] p-0">
          <DialogHeader className="p-4 border-b border-border">
            <div className="flex items-center justify-between">
              <div>
                <DialogTitle>Route Map</DialogTitle>
                <DialogDescription>
                  Full itinerary route visualization
                </DialogDescription>
              </div>
              <button
                onClick={() => setShowExpandedMap(false)}
                className="w-9 h-9 rounded-full bg-mist-gray flex items-center justify-center hover:bg-secondary transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </DialogHeader>
          <div className="flex-1 p-4 relative z-0 isolate">
            <RouteMap 
              stops={routeStops.filter(stop => stop.day === selectedDay)} 
              className="h-full"
              onMapReady={(controls) => {
                mapControlsRef.current = controls;
              }}
            />
          </div>
          <div className="p-4 border-t border-border">
            <div className="flex items-center justify-between text-sm">
              <div>
                <p className="text-muted-foreground">Day</p>
                <p>Day {selectedDay}</p>
              </div>
              <div className="text-center">
                <p className="text-muted-foreground">Stops</p>
                <p>{routeStops.filter(stop => stop.day === selectedDay).length} locations</p>
              </div>
              <div className="text-right">
                <p className="text-muted-foreground">Selected</p>
                <p>{selectedDay} of 5</p>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}