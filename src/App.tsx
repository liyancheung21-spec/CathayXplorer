import { useState, useRef, useEffect } from 'react';
import { Toaster } from './components/ui/sonner';
import { HomeDiscoveryScreen } from './components/screens/HomeDiscoveryScreen';
import { DestinationDetailScreen } from './components/screens/DestinationDetailScreen';
import { ItineraryBuilderScreen } from './components/screens/ItineraryBuilderScreen';
import { BookingCartScreen } from './components/screens/BookingCartScreen';
import { TripDashboardScreen } from './components/screens/TripDashboardScreen';
import { NearbyDealsScreen } from './components/screens/NearbyDealsScreen';
import { ShareTripScreen } from './components/screens/ShareTripScreen';
import { PlanExploreScreen } from './components/screens/PlanExploreScreen';
import { AILoadingScreen } from './components/screens/AILoadingScreen';
import { AIResultsScreen } from './components/screens/AIResultsScreen';
import { InspirationScreen } from './components/screens/InspirationScreen';
import { JournalDetailScreen } from './components/screens/JournalDetailScreen';
import { InitialLoadingScreen } from './components/screens/InitialLoadingScreen';
import { PreferencesScreen } from './components/screens/PreferencesScreen';
import { FlightLogbookScreen } from './components/screens/FlightLogbookScreen';
import { TripReservationsScreen } from './components/screens/TripReservationsScreen';
import { PackingListScreen } from './components/screens/PackingListScreen';
import { FlightScreen } from './components/screens/FlightScreen';
import { StayScreen } from './components/screens/StayScreen';
import { PackagesScreen } from './components/screens/PackagesScreen';
import { ExperiencesScreen } from './components/screens/ExperiencesScreen';
import { EventsScreen } from './components/screens/EventsScreen';
import { ShopScreen } from './components/screens/ShopScreen';
import { SettingsScreen } from './components/screens/SettingsScreen';
import { BottomNavigation } from './components/BottomNavigation';
import { UserStatusBar } from './components/UserStatusBar';
import { ComingSoonDialog } from './components/ComingSoonDialog';
import { Button } from './components/ui/button';
import { Plus } from 'lucide-react';
import { toast } from 'sonner@2.0.3';
import { generateTripSuggestion } from './services/aiTripPlanner';
import cathayCardBg from 'figma:asset/acf841f9e9998279386fc1c397597315f4b64187.png';

type Screen = 
  | 'discover' 
  | 'destination' 
  | 'itinerary' 
  | 'booking' 
  | 'trip' 
  | 'nearby' 
  | 'share'
  | 'share-trip'
  | 'plan'
  | 'inspire'
  | 'journal'
  | 'profile'
  | 'preferences'
  | 'flight-logbook'
  | 'trip-reservations'
  | 'packing-list'
  | 'flight'
  | 'stay'
  | 'packages'
  | 'experiences'
  | 'events'
  | 'shop'
  | 'settings';

export default function App() {
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [currentScreen, setCurrentScreen] = useState<Screen>('discover');
  const [previousScreen, setPreviousScreen] = useState<Screen>('discover');
  const [travelMode, setTravelMode] = useState<'premium' | 'budget'>('premium');
  const [currentPrompt, setCurrentPrompt] = useState('');
  const [aiSuggestion, setAiSuggestion] = useState<any>(null);
  const [selectedJournal, setSelectedJournal] = useState<any>(null);
  const [tripSelections, setTripSelections] = useState<{ flight: number; hotel: number; addOns: number[] }>({
    flight: 0,
    hotel: 0,
    addOns: []
  });
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [transitionDirection, setTransitionDirection] = useState<'left' | 'right'>('right');
  const [nextScreen, setNextScreen] = useState<Screen | null>(null);
  const [showComingSoon, setShowComingSoon] = useState(false);
  
  // Initial loading effect
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsInitialLoading(false);
    }, 2500); // Show loading screen for 2.5 seconds
    
    return () => clearTimeout(timer);
  }, []);
  
  // Touch handling for swipe gestures
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Tab order for swipe navigation
  const tabOrder: ('plan' | 'inspire' | 'discover' | 'trip' | 'profile')[] = ['plan', 'inspire', 'discover', 'trip', 'profile'];
  
  // Determine direction based on tab order
  const getDirection = (fromScreen: Screen, toScreen: Screen): 'left' | 'right' => {
    const fromIndex = tabOrder.indexOf(fromScreen as any);
    const toIndex = tabOrder.indexOf(toScreen as any);
    
    if (fromIndex === -1 || toIndex === -1) return 'right';
    return toIndex > fromIndex ? 'left' : 'right';
  };
  
  // Handle screen transition
  const transitionToScreen = (screen: Screen, direction?: 'left' | 'right') => {
    if (screen === currentScreen || isTransitioning) return;
    
    const dir = direction || getDirection(currentScreen, screen);
    setTransitionDirection(dir);
    setNextScreen(screen);
    
    // Small delay to ensure next screen is rendered before starting animation
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setIsTransitioning(true);
      });
    });
    
    // After transition completes, update current screen
    setTimeout(() => {
      setCurrentScreen(screen);
      setIsTransitioning(false);
      setNextScreen(null);
    }, 300);
  };
  
  // Swipe handling
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  
  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };
  
  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current || isTransitioning) return;
    
    const swipeDistance = touchStartX.current - touchEndX.current;
    const minSwipeDistance = 50;
    
    // Only allow swipe on main tabs
    const mainTabs = ['plan', 'inspire', 'discover', 'trip', 'profile'];
    if (!mainTabs.includes(currentScreen)) {
      touchStartX.current = null;
      touchEndX.current = null;
      return;
    }
    
    const currentIndex = tabOrder.indexOf(currentScreen as any);
    
    // Swipe left (next tab)
    if (swipeDistance > minSwipeDistance && currentIndex < tabOrder.length - 1) {
      transitionToScreen(tabOrder[currentIndex + 1]);
    }
    
    // Swipe right (previous tab)
    if (swipeDistance < -minSwipeDistance && currentIndex > 0) {
      transitionToScreen(tabOrder[currentIndex - 1]);
    }
    
    touchStartX.current = null;
    touchEndX.current = null;
  };

  // Handle AI Prompt Submission
  const handleAIPrompt = async (prompt: string) => {
    setCurrentPrompt(prompt);
    setCurrentScreen('ai-loading');
    
    try {
      const suggestion = await generateTripSuggestion(prompt);
      setAiSuggestion(suggestion);
      setCurrentScreen('ai-results');
    } catch (error) {
      toast.error('Failed to generate trip. Please try again.');
      setCurrentScreen('discover');
    }
  };

  // Handle Journal Click
  const handleJournalClick = (journal: any) => {
    setPreviousScreen(currentScreen);
    setSelectedJournal(journal);
    setCurrentScreen('journal');
  };

  const renderScreenContent = (screen: Screen) => {
    switch (screen) {
      case 'discover':
        return (
          <HomeDiscoveryScreen 
            onDestinationClick={() => setCurrentScreen('destination')}
            onAIPromptSubmit={handleAIPrompt}
            onNavigateToInspire={() => transitionToScreen('inspire')}
            onJournalClick={handleJournalClick}
            onComingSoon={() => setShowComingSoon(true)}
            onNavigateToFlight={() => setCurrentScreen('flight')}
            onNavigateToStay={() => setCurrentScreen('stay')}
            onNavigateToPackages={() => setCurrentScreen('packages')}
            onNavigateToExperiences={() => setCurrentScreen('experiences')}
            onNavigateToEvents={() => setCurrentScreen('events')}
            onNavigateToShop={() => setCurrentScreen('shop')}
          />
        );
      
      case 'ai-loading':
        return <AILoadingScreen prompt={currentPrompt} />;
      
      case 'ai-results':
        return (
          <AIResultsScreen 
            suggestion={aiSuggestion}
            originalPrompt={currentPrompt}
            onBack={() => setCurrentScreen('discover')}
            onBookTrip={(selections) => {
              setTripSelections(selections);
              setCurrentScreen('itinerary');
              toast.success('Starting to build your itinerary!');
            }}
          />
        );
      
      case 'destination':
        return (
          <DestinationDetailScreen 
            onBack={() => setCurrentScreen('discover')}
            onBookNow={() => setCurrentScreen('itinerary')}
            onComingSoon={() => setShowComingSoon(true)}
          />
        );
      
      case 'itinerary':
        return (
          <ItineraryBuilderScreen 
            tripData={aiSuggestion}
            selectedFlight={tripSelections.flight}
            selectedHotel={tripSelections.hotel}
            selectedAddOns={tripSelections.addOns}
            onBack={() => setCurrentScreen('discover')}
            onCheckout={() => setCurrentScreen('booking')}
            onComingSoon={() => setShowComingSoon(true)}
          />
        );
      
      case 'booking':
        return (
          <BookingCartScreen 
            tripData={aiSuggestion}
            selectedFlight={tripSelections.flight}
            selectedHotel={tripSelections.hotel}
            selectedAddOns={tripSelections.addOns}
            onBack={() => setCurrentScreen('itinerary')}
            onConfirm={() => {
              setCurrentScreen('trip');
              toast.success('Booking confirmed! Your trip is ready.');
            }}
            onComingSoon={() => setShowComingSoon(true)}
          />
        );
      
      case 'trip':
        return (
          <TripDashboardScreen 
            onViewDeals={() => setCurrentScreen('nearby')}
            onViewReservations={() => setCurrentScreen('trip-reservations')}
            onNavigateToPackingList={() => setCurrentScreen('packing-list')}
          />
        );
      
      case 'nearby':
        return (
          <NearbyDealsScreen 
            onBack={() => setCurrentScreen('trip')}
          />
        );
      
      case 'share':
        return (
          <ShareTripScreen 
            onBack={() => setCurrentScreen('trip')}
          />
        );

      case 'share-trip':
        return (
          <ShareTripScreen 
            onBack={() => setCurrentScreen('inspire')}
          />
        );

      case 'plan':
        return (
          <PlanExploreScreen 
            onNavigateToDestination={() => setCurrentScreen('destination')}
          />
        );

      case 'inspire':
        return <InspirationScreen onJournalClick={handleJournalClick} onShareMomentClick={() => setCurrentScreen('share-trip')} />;
      
      case 'journal':
        return (
          <JournalDetailScreen 
            journal={selectedJournal}
            onBack={() => setCurrentScreen(previousScreen === 'inspire' ? 'inspire' : 'discover')}
          />
        );

      case 'profile':
        return (
          <div className="min-h-screen bg-mist-gray pb-24">
            {/* Top spacing for fixed status bar */}
            <div className="h-[52px]" />
            
            {/* Header */}
            <div className="bg-gradient-to-r from-[#006564] to-[#367D79] px-5 pt-12 pb-6 text-white">
              <div className="max-w-md mx-auto">
                <h1 className="text-white mb-2">Your Profile</h1>
                <p className="text-white/80">Manage account, miles & preferences</p>
              </div>
            </div>
            
            <div className="px-5 pt-6 pb-6">
              <div className="max-w-md mx-auto">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#006564] to-[#367D79] flex items-center justify-center text-white">
                    <p>JD</p>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h2>John Doe</h2>
                      <img src={cathayCardBg} alt="Cathay" className="h-[1em] w-auto rounded" />
                    </div>
                    <p className="text-muted-foreground">john.doe@email.com</p>
                    <div className="flex items-center gap-2 mt-1">
                      <div 
                        className="px-2 py-0.5 rounded text-white"
                        style={{ backgroundColor: 'var(--cathay-gold)' }}
                      >
                        <p>Cathay Gold</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Quick Action Buttons */}
                <div className="grid grid-cols-2 gap-3 mb-6">
                  <Button
                    variant="outline"
                    className="h-auto py-4 flex flex-col items-center gap-2 border-2 hover:border-[#006564] hover:bg-[#006564]/5 hover:text-[#006564]"
                    onClick={() => {
                      setPreviousScreen(currentScreen);
                      transitionToScreen('preferences');
                    }}
                  >
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#006564]/10 to-[#367D79]/10 flex items-center justify-center">
                      <span className="text-xl">✨</span>
                    </div>
                    <div className="text-center">
                      <p className="text-sm">My Travel Preferences</p>
                    </div>
                  </Button>

                  <Button
                    variant="outline"
                    className="h-auto py-4 flex flex-col items-center gap-2 border-2 hover:border-[#006564] hover:bg-[#006564]/5 hover:text-[#006564]"
                    onClick={() => {
                      setPreviousScreen(currentScreen);
                      transitionToScreen('flight-logbook');
                    }}
                  >
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#006564]/10 to-[#367D79]/10 flex items-center justify-center">
                      <span className="text-xl">✈️</span>
                    </div>
                    <div className="text-center">
                      <p className="text-sm">Flight Logbook</p>
                    </div>
                  </Button>
                </div>

                {/* Asia Miles Card */}
                <div 
                  className="mb-6 p-6 rounded-xl text-white flex flex-col" 
                  style={{ 
                    backgroundImage: `url(${cathayCardBg})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    minHeight: '200px',
                    aspectRatio: '1.586'
                  }}
                >
                  <div>
                    <p className="text-white/80 mb-1">Asia Miles Balance</p>
                    <h1 className="text-white mb-4">124,580 miles</h1>
                  </div>
                  <div className="flex items-center justify-between mt-auto">
                    <p className="text-white/80">Cathay Gold</p>
                    <button className="text-white underline">Details</button>
                  </div>
                </div>

                {/* Membership Status Progress */}
                <div className="mb-6 p-4 rounded-lg border border-border" style={{ backgroundColor: '#2E7D7D' }}>
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm text-white">Status Points Progress</p>
                    <p className="text-sm text-white">897 / 1,200</p>
                  </div>
                  
                  {/* Progress Bar with Filled/Unfilled Sections */}
                  <div className="relative h-3 mb-3 rounded-full overflow-hidden" style={{ backgroundColor: '#D1D5DB' }}>
                    {/* Filled Progress Section */}
                    <div 
                      className="absolute inset-y-0 left-0 rounded-full transition-all duration-500"
                      style={{ 
                        width: '74.75%',
                        backgroundColor: '#D4AF37'
                      }}
                    />
                  </div>

                  {/* Tier Markers */}
                  <div className="flex justify-between text-xs">
                    <div className="flex flex-col items-start">
                      <span style={{ color: 'rgba(255, 255, 255, 0.7)' }}>Silver</span>
                      <span className="text-white">300</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <span className="text-white">● Gold</span>
                      <span className="text-white">600</span>
                    </div>
                    <div className="flex flex-col items-end">
                      <span style={{ color: 'rgba(255, 255, 255, 0.7)' }}>Diamond</span>
                      <span className="text-white">1,200</span>
                    </div>
                  </div>
                  
                  <p className="text-xs mt-2 text-center" style={{ color: 'rgba(255, 255, 255, 0.9)' }}>
                    303 points to Diamond tier
                  </p>
                </div>
                
                <div className="grid grid-cols-3 gap-3 p-4 rounded-lg bg-mist-gray">
                  <div className="text-center">
                    <p>12</p>
                    <p className="text-muted-foreground">Trips</p>
                  </div>
                  <div className="text-center">
                    <p>28</p>
                    <p className="text-muted-foreground">Countries</p>
                  </div>
                  <div className="text-center">
                    <p>124K</p>
                    <p className="text-muted-foreground">Miles</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="px-5 pt-4 space-y-4 max-w-md mx-auto">

              {/* Active Passes */}
              <div className="bg-white p-5 rounded-xl">
                <h3 className="mb-3">Active Passes</h3>
                <div className="space-y-3">
                  <div className="p-3 rounded-lg bg-mist-gray">
                    <p>Boarding Pass - CX502</p>
                    <p className="text-muted-foreground">Gate 23 • Seat 12A</p>
                  </div>
                  <div className="p-3 rounded-lg bg-mist-gray">
                    <p>Hotel Key - Park Hyatt</p>
                    <p className="text-muted-foreground">Room 1504</p>
                  </div>
                </div>
              </div>

              {/* Menu Options */}
              <div className="space-y-2">
                <button 
                  onClick={() => setCurrentScreen('share')}
                  className="w-full text-left p-4 bg-white rounded-lg hover:bg-mist-gray transition-colors"
                >
                  <p>My Trips</p>
                </button>
                <button 
                  onClick={() => setShowComingSoon(true)}
                  className="w-full text-left p-4 bg-white rounded-lg hover:bg-mist-gray transition-colors"
                >
                  <p>Archived Passes</p>
                </button>
                <button 
                  onClick={() => setShowComingSoon(true)}
                  className="w-full text-left p-4 bg-white rounded-lg hover:bg-mist-gray transition-colors"
                >
                  <p>Saved Destinations</p>
                </button>
                <button 
                  onClick={() => setShowComingSoon(true)}
                  className="w-full text-left p-4 bg-white rounded-lg hover:bg-mist-gray transition-colors"
                >
                  <p>Preferences</p>
                </button>
                <button 
                  onClick={() => setCurrentScreen('settings')}
                  className="w-full text-left p-4 bg-white rounded-lg hover:bg-mist-gray transition-colors"
                >
                  <p>Settings</p>
                </button>
              </div>
            </div>
          </div>
        );
      
      case 'preferences':
        return (
          <PreferencesScreen 
            onBack={() => setCurrentScreen(previousScreen)}
            onComingSoon={() => setShowComingSoon(true)}
          />
        );
      
      case 'flight-logbook':
        return (
          <FlightLogbookScreen 
            onBack={() => setCurrentScreen(previousScreen)}
          />
        );
      
      case 'trip-reservations':
        return (
          <TripReservationsScreen 
            onBack={() => setCurrentScreen('trip')}
            tripTitle="Tokyo Winter Escape"
            tripDates="Dec 23 - Dec 29, 2024"
          />
        );
      
      case 'packing-list':
        return (
          <PackingListScreen 
            onBack={() => setCurrentScreen('trip')}
            tripDestination="Tokyo"
          />
        );
      
      case 'flight':
        return (
          <FlightScreen 
            onBack={() => setCurrentScreen('discover')}
          />
        );
      
      case 'stay':
        return (
          <StayScreen 
            onBack={() => setCurrentScreen('discover')}
          />
        );
      
      case 'packages':
        return (
          <PackagesScreen 
            onBack={() => setCurrentScreen('discover')}
          />
        );
      
      case 'experiences':
        return (
          <ExperiencesScreen 
            onBack={() => setCurrentScreen('discover')}
          />
        );
      
      case 'events':
        return (
          <EventsScreen 
            onBack={() => setCurrentScreen('discover')}
          />
        );
      
      case 'shop':
        return (
          <ShopScreen 
            onBack={() => setCurrentScreen('discover')}
          />
        );
      
      case 'settings':
        return (
          <SettingsScreen 
            onBack={() => setCurrentScreen('profile')}
          />
        );
      
      default:
        return null;
    }
  };

  const showBottomNav = !['destination', 'itinerary', 'booking', 'nearby', 'share', 'share-trip', 'journal', 'preferences', 'flight-logbook', 'trip-reservations', 'packing-list', 'ai-loading', 'ai-results', 'flight', 'stay', 'packages', 'experiences', 'events', 'shop', 'settings'].includes(currentScreen);
  const showStatusBar = ['discover', 'inspire', 'plan', 'trip', 'profile'].includes(currentScreen);

  return (
    <>
      {/* Initial loading screen with fade out */}
      <InitialLoadingScreen isVisible={isInitialLoading} />
      
      <div 
        ref={containerRef}
        className="min-h-screen bg-background overflow-hidden relative"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
      {/* Fixed Status Bar - stays in place across tabs */}
      {showStatusBar && (
        <div className="fixed top-0 left-0 right-0 z-50">
          <UserStatusBar />
        </div>
      )}

      {/* Current Screen - slides out */}
      <div 
        key={`current-${currentScreen}`}
        className="absolute inset-0 transition-transform duration-300 ease-out bg-background"
        style={{
          transform: isTransitioning 
            ? transitionDirection === 'left' 
              ? 'translateX(-100%)' 
              : 'translateX(100%)'
            : 'translateX(0)',
          zIndex: isTransitioning ? 5 : 10,
        }}
      >
        <div className="h-full overflow-y-auto">
          {renderScreenContent(currentScreen)}
        </div>
      </div>

      {/* Next Screen - slides in from the opposite direction */}
      {nextScreen && (
        <div 
          key={`next-${nextScreen}`}
          className="absolute inset-0 bg-background"
          style={{
            transform: !isTransitioning
              ? transitionDirection === 'left'
                ? 'translateX(100%)'
                : 'translateX(-100%)'
              : 'translateX(0)',
            transition: 'transform 0.3s ease-out',
            zIndex: 10,
          }}
        >
          <div className="h-full overflow-y-auto">
            {renderScreenContent(nextScreen)}
          </div>
        </div>
      )}

      {showBottomNav && (
        <BottomNavigation 
          activeTab={currentScreen as any}
          onTabChange={(tab) => {
            transitionToScreen(tab);
          }}
        />
      )}
      
      <Toaster />

      <ComingSoonDialog 
        open={showComingSoon}
        onOpenChange={setShowComingSoon}
        onGoHome={() => setCurrentScreen('discover')}
      />
      </div>
    </>
  );
}