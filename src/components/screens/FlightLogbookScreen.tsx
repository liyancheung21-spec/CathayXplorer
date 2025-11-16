import { useMemo } from "react";
import { ArrowLeft, Plane, MapPin, Globe, Clock } from "lucide-react";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import { FlightLogbookMap } from "../FlightLogbookMap";

interface FlightLogbookScreenProps {
  onBack: () => void;
}

export function FlightLogbookScreen({ onBack }: FlightLogbookScreenProps) {
  // Mock flight statistics - in a real app, this would come from booking history
  const stats = {
    allTime: {
      flights: 454,
      distance: "93,931 km",
      flightTime: "132h 30m",
      airports: 14,
      airlines: 10,
      countries: 12
    },
    year2025: {
      flights: 156,
      distance: "38,720 km",
      flightTime: "48h 45m",
      airports: 10,
      airlines: 6,
      countries: 8
    },
    year2024: {
      flights: 124,
      distance: "28,450 km",
      flightTime: "42h 15m",
      airports: 8,
      airlines: 5,
      countries: 6
    },
    year2023: {
      flights: 98,
      distance: "19,580 km",
      flightTime: "28h 30m",
      airports: 6,
      airlines: 4,
      countries: 5
    }
  };

  const countriesVisited = [
    { code: "🇭🇰", name: "Hong Kong" },
    { code: "🇯🇵", name: "Japan" },
    { code: "🇹🇭", name: "Thailand" },
    { code: "🇸🇬", name: "Singapore" },
    { code: "🇬🇧", name: "United Kingdom" },
    { code: "🇫🇷", name: "France" },
    { code: "🇦🇪", name: "UAE" },
    { code: "🇺🇸", name: "United States" },
    { code: "🇦🇺", name: "Australia" },
    { code: "🇮🇩", name: "Indonesia" },
    { code: "🇰🇷", name: "South Korea" },
    { code: "🇩🇪", name: "Germany" }
  ];

  const topRoutes = {
    allTime: [
      { route: "HKG → NRT", flights: 24, distance: "2,900 km" },
      { route: "HKG → BKK", flights: 18, distance: "1,700 km" },
      { route: "HKG → LHR", flights: 12, distance: "9,600 km" },
      { route: "HKG → SIN", flights: 15, distance: "2,600 km" },
      { route: "HKG → DXB", flights: 10, distance: "5,950 km" }
    ],
    year2025: [
      { route: "HKG → ICN", flights: 28, distance: "2,100 km" },
      { route: "HKG → TPE", flights: 22, distance: "810 km" },
      { route: "HKG → SFO", flights: 14, distance: "11,100 km" },
      { route: "HKG → SYD", flights: 16, distance: "7,400 km" },
      { route: "HKG → CDG", flights: 12, distance: "9,850 km" }
    ],
    year2024: [
      { route: "HKG → NRT", flights: 20, distance: "2,900 km" },
      { route: "HKG → BKK", flights: 16, distance: "1,700 km" },
      { route: "HKG → LHR", flights: 10, distance: "9,600 km" },
      { route: "HKG → SIN", flights: 14, distance: "2,600 km" },
      { route: "HKG → DXB", flights: 8, distance: "5,950 km" }
    ],
    year2023: [
      { route: "HKG → KIX", flights: 18, distance: "2,850 km" },
      { route: "HKG → MNL", flights: 14, distance: "1,100 km" },
      { route: "HKG → LAX", flights: 10, distance: "11,650 km" },
      { route: "HKG → MEL", flights: 12, distance: "7,450 km" }
    ]
  };

  // Year selection is handled by Tabs component, no need for state here

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div 
        className="sticky top-0 z-10 px-5 py-4 bg-white border-b border-border"
        style={{ backgroundColor: 'white' }}
      >
        <div className="max-w-md mx-auto flex items-center gap-3">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={onBack}
            className="shrink-0"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div className="flex-1">
            <h2>Flight Logbook</h2>
            <p className="text-sm text-muted-foreground">Your travel journey</p>
          </div>
        </div>
      </div>

      <div className="px-5 pt-6 pb-6 space-y-6">
        <div className="max-w-md mx-auto space-y-6">
          {/* Year Selector */}
          <Tabs defaultValue="all-time" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="all-time">ALL TIME</TabsTrigger>
              <TabsTrigger value="2025">2025</TabsTrigger>
              <TabsTrigger value="2024">2024</TabsTrigger>
              <TabsTrigger value="2023">2023</TabsTrigger>
            </TabsList>

            <TabsContent value="all-time" className="space-y-6 mt-6">
              <FlightPassportContent 
                stats={stats.allTime} 
                countriesVisited={countriesVisited} 
                topRoutes={topRoutes.allTime}
                year="all-time"
              />
            </TabsContent>

            <TabsContent value="2025" className="space-y-6 mt-6">
              <FlightPassportContent 
                stats={stats.year2025} 
                countriesVisited={[
                  { code: "🇭🇰", name: "Hong Kong" },
                  { code: "🇰🇷", name: "South Korea" },
                  { code: "🇹🇼", name: "Taiwan" },
                  { code: "🇺🇸", name: "United States" },
                  { code: "🇦🇺", name: "Australia" },
                  { code: "🇫🇷", name: "France" },
                  { code: "🇩🇪", name: "Germany" },
                  { code: "🇨🇭", name: "Switzerland" }
                ]} 
                topRoutes={topRoutes.year2025}
                year="2025"
              />
            </TabsContent>

            <TabsContent value="2024" className="space-y-6 mt-6">
              <FlightPassportContent 
                stats={stats.year2024} 
                countriesVisited={[
                  { code: "🇭🇰", name: "Hong Kong" },
                  { code: "🇯🇵", name: "Japan" },
                  { code: "🇹🇭", name: "Thailand" },
                  { code: "🇸🇬", name: "Singapore" },
                  { code: "🇬🇧", name: "United Kingdom" },
                  { code: "🇦🇪", name: "UAE" }
                ]} 
                topRoutes={topRoutes.year2024}
                year="2024"
              />
            </TabsContent>

            <TabsContent value="2023" className="space-y-6 mt-6">
              <FlightPassportContent 
                stats={stats.year2023} 
                countriesVisited={[
                  { code: "🇭🇰", name: "Hong Kong" },
                  { code: "🇯🇵", name: "Japan" },
                  { code: "🇵🇭", name: "Philippines" },
                  { code: "🇺🇸", name: "United States" },
                  { code: "🇦🇺", name: "Australia" }
                ]} 
                topRoutes={topRoutes.year2023}
                year="2023"
              />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}

interface FlightPassportContentProps {
  stats: {
    flights: number;
    distance: string;
    flightTime: string;
    airports: number;
    airlines: number;
    countries: number;
  };
  countriesVisited: Array<{ code: string; name: string }>;
  topRoutes: Array<{ route: string; flights: number; distance: string }>;
  year: string;
}

function FlightPassportContent({ stats, countriesVisited, topRoutes, year }: FlightPassportContentProps) {
  // Airport data for flight logbook map - memoized with year dependency
  const { homeBase, destinations } = useMemo(() => {
    const homeBase = {
      code: "HKG",
      name: "Hong Kong International",
      lat: 22.3193,
      lng: 113.5497,
    };

    // Different destinations for each year
    let destinations;
    
    if (year === "2025") {
      destinations = [
        { code: "ICN", name: "Seoul (Incheon)", lat: 37.4602, lng: 126.4407 },
        { code: "TPE", name: "Taipei (Taoyuan)", lat: 25.0797, lng: 121.2342 },
        { code: "SFO", name: "San Francisco", lat: 37.6213, lng: -122.3790 },
        { code: "SYD", name: "Sydney", lat: -33.9461, lng: 151.1772 },
        { code: "CDG", name: "Paris (Charles de Gaulle)", lat: 49.0097, lng: 2.5479 },
      ];
    } else if (year === "2024") {
      destinations = [
        { code: "NRT", name: "Tokyo (Narita)", lat: 35.7720, lng: 140.3929 },
        { code: "BKK", name: "Bangkok", lat: 13.6900, lng: 100.7501 },
        { code: "LHR", name: "London (Heathrow)", lat: 51.4700, lng: -0.4543 },
        { code: "SIN", name: "Singapore", lat: 1.3644, lng: 103.9915 },
        { code: "DXB", name: "Dubai", lat: 25.2532, lng: 55.3657 },
      ];
    } else if (year === "2023") {
      destinations = [
        { code: "KIX", name: "Osaka (Kansai)", lat: 34.4273, lng: 135.2444 },
        { code: "MNL", name: "Manila", lat: 14.5086, lng: 121.0194 },
        { code: "LAX", name: "Los Angeles", lat: 33.9416, lng: -118.4085 },
        { code: "MEL", name: "Melbourne", lat: -37.6690, lng: 144.8410 },
      ];
    } else {
      // All-time: combination of unique destinations
      destinations = [
        { code: "NRT", name: "Tokyo (Narita)", lat: 35.7720, lng: 140.3929 },
        { code: "BKK", name: "Bangkok", lat: 13.6900, lng: 100.7501 },
        { code: "LHR", name: "London (Heathrow)", lat: 51.4700, lng: -0.4543 },
        { code: "SIN", name: "Singapore", lat: 1.3644, lng: 103.9915 },
        { code: "DXB", name: "Dubai", lat: 25.2532, lng: 55.3657 },
      ];
    }

    return { homeBase, destinations };
  }, [year]); // Dependency on year so map updates when switching tabs

  return (
    <>
      {/* Flight Map Visualization with Interactive World Map */}
      <Card className="p-0 bg-white overflow-hidden">
        <div className="relative w-full h-80">
          <FlightLogbookMap 
            homeBase={homeBase} 
            destinations={destinations}
            key="flight-logbook-map" 
          />
        </div>

        {/* Countries Visited Flags */}
        <div className="flex flex-wrap gap-2 justify-center p-4 bg-gradient-to-br from-[#006564]/5 to-[#367D79]/5">
          {countriesVisited.map((country, index) => (
            <div key={index} className="text-2xl" title={country.name}>
              {country.code}
            </div>
          ))}
        </div>
      </Card>

      {/* Flighty Passport Card */}
      <Card className="p-6 bg-white border-2 border-[#006564]/20">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="mb-1">MY FLIGHT PASSPORT</h3>
            <p className="text-xs text-muted-foreground">🛂 PASSPORT • PASS • PASAPORTE</p>
          </div>
          <Plane className="w-8 h-8" style={{ color: 'var(--cathay-jade)' }} />
        </div>

        {/* Main Stats Grid */}
        <div className="grid grid-cols-2 gap-6 mb-6">
          {/* Flights */}
          <div>
            <p className="text-sm text-muted-foreground mb-1">FLIGHTS</p>
            <h1 style={{ color: 'var(--cathay-jade)' }}>{stats.flights}</h1>
            <p className="text-xs text-muted-foreground">flights</p>
          </div>

          {/* Flight Distance */}
          <div>
            <p className="text-sm text-muted-foreground mb-1">FLIGHT DISTANCE</p>
            <h1 style={{ color: 'var(--cathay-jade)' }}>{stats.distance}</h1>
          </div>
        </div>

        {/* Secondary Stats */}
        <div className="grid grid-cols-3 gap-4">
          <div>
            <p className="text-sm text-muted-foreground mb-1">FLIGHT TIME</p>
            <p>{stats.flightTime}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground mb-1">AIRPORTS</p>
            <p>{stats.airports}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground mb-1">AIRLINES</p>
            <p>{stats.airlines}</p>
          </div>
        </div>

        {/* Passport-style code at bottom */}
        <div className="mt-6 pt-4 border-t border-border">
          <p className="text-xs text-muted-foreground font-mono">
            ALLTIME&lt;&lt;JDoe&lt;&lt;MEMBER12AUG19&lt;&lt;CATHAYXPLORER
          </p>
        </div>
      </Card>

      {/* Additional Stats */}
      <div className="grid grid-cols-2 gap-4">
        <Card className="p-4 text-center">
          <Globe className="w-6 h-6 mx-auto mb-2" style={{ color: 'var(--cathay-jade)' }} />
          <h3>{stats.countries}</h3>
          <p className="text-sm text-muted-foreground">Countries</p>
        </Card>
        <Card className="p-4 text-center">
          <Clock className="w-6 h-6 mx-auto mb-2" style={{ color: 'var(--cathay-jade)' }} />
          <h3>{stats.flightTime}</h3>
          <p className="text-sm text-muted-foreground">In the Air</p>
        </Card>
      </div>

      {/* Top Routes */}
      <Card className="p-5">
        <div className="flex items-center gap-2 mb-4">
          <Plane className="w-5 h-5" style={{ color: 'var(--cathay-jade)' }} />
          <h3>Top Routes</h3>
        </div>
        <div className="space-y-3">
          {topRoutes.map((route, index) => (
            <div key={index} className="flex items-center justify-between py-2 border-b last:border-0">
              <div className="flex items-center gap-3">
                <div 
                  className="w-8 h-8 rounded-full flex items-center justify-center text-sm"
                  style={{ backgroundColor: 'var(--cathay-jade)', color: 'white' }}
                >
                  {index + 1}
                </div>
                <div>
                  <p>{route.route}</p>
                  <p className="text-xs text-muted-foreground">{route.distance}</p>
                </div>
              </div>
              <Badge variant="secondary">{route.flights} flights</Badge>
            </div>
          ))}
        </div>
      </Card>

      {/* Achievements */}
      <Card className="p-5">
        <h3 className="mb-4">Travel Achievements</h3>
        <div className="grid grid-cols-3 gap-3">
          <div className="text-center p-3 rounded-lg bg-gradient-to-br from-[#006564]/10 to-[#367D79]/10">
            <div className="text-2xl mb-1">🌏</div>
            <p className="text-xs">Around the World</p>
            <p className="text-xs text-muted-foreground">7.6x</p>
          </div>
          <div className="text-center p-3 rounded-lg bg-gradient-to-br from-[#006564]/10 to-[#367D79]/10">
            <div className="text-2xl mb-1">✈️</div>
            <p className="text-xs">Long Haul</p>
            <p className="text-xs text-muted-foreground">23 flights</p>
          </div>
          <div className="text-center p-3 rounded-lg bg-gradient-to-br from-[#006564]/10 to-[#367D79]/10">
            <div className="text-2xl mb-1">🏆</div>
            <p className="text-xs">Cathay Membership</p>
            <p className="text-xs text-muted-foreground">Gold</p>
          </div>
        </div>
      </Card>
    </>
  );
}
