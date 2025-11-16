import { useState, useRef, useEffect } from "react";
import { DestinationCard } from "../DestinationCard";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Progress } from "../ui/progress";
import { Card } from "../ui/card";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import { HeroPromptCard } from "../HeroPromptCard";
import { IconPillButton } from "../IconPillButton";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "../ui/dialog";
import { 
  Search, 
  QrCode, 
  Plane, 
  Hotel, 
  Car, 
  Shield, 
  ShoppingBag, 
  Wallet,
  MapPin,
  Clock,
  TrendingUp,
  Sparkles,
  ChevronRight,
  Heart,
  Share2,
  Gift,
  Percent,
  X,
  ShoppingCart,
  Star
} from "lucide-react";

interface HomeDiscoveryScreenProps {
  onDestinationClick: (destination: string) => void;
  onAIPromptSubmit?: (prompt: string) => void;
  onNavigateToInspire?: () => void;
  onJournalClick?: (journal: any) => void;
  onComingSoon?: () => void;
  onNavigateToFlight?: () => void;
  onNavigateToStay?: () => void;
  onNavigateToPackages?: () => void;
  onNavigateToExperiences?: () => void;
  onNavigateToEvents?: () => void;
  onNavigateToShop?: () => void;
}

// Product type definition
interface Product {
  id: string;
  name: string;
  category: string;
  categoryColor: string;
  image: string;
  price: string;
  priceHKD: number;
  miles: string;
  milesValue: number;
  size: string;
  description: string;
  features: string[];
  stock: string;
  rating: number;
  reviews: number;
}

// Promotional Carousel Component
function PromotionalCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const autoRotateRef = useRef<NodeJS.Timeout | null>(null);

  const promotions = [
    {
      id: 1,
      icon: TrendingUp,
      badge: 'Flash Sale',
      title: '50% Off Bangkok Hotels',
      description: 'Book on Cathay Holidays by tonight to save big',
      image: 'https://images.unsplash.com/photo-1558655822-54f2380fadbb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxCYW5na29rJTIwR3JhbmQlMjBQYWxhY2UlMjB0ZW1wbGV8ZW58MXx8fHwxNzYxMTU2NTIyfDA&ixlib=rb-4.1.0&q=80&w=1080',
      gradient: 'from-red-600/90 to-orange-600/80'
    },
    {
      id: 2,
      icon: Car,
      badge: 'Gold Exclusive',
      title: '10% Off Car Rentals',
      description: 'Exclusive for Cathay Gold members - Valid for 30 days',
      image: 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBjYXJ8ZW58MXx8fHwxNzYxMTU2NTIyfDA&ixlib=rb-4.1.0&q=80&w=1080',
      gradient: 'from-[#D4AF37]/90 to-[#C1B49A]/80'
    },
    {
      id: 3,
      icon: Hotel,
      badge: 'Member Offer',
      title: '15% Off Luxury Hotels',
      description: 'Diamond Members can enjoy complimentary upgrade at Marriot Bonvoy Hotels*',
      image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBob3RlbHxlbnwxfHx8fDE3NjExNTY1MjJ8MA&ixlib=rb-4.1.0&q=80&w=1080',
      gradient: 'from-[#006564]/90 to-[#367D79]/80'
    },
    {
      id: 4,
      icon: Gift,
      badge: 'Double Miles',
      title: 'Earn 2x Asia Miles',
      description: 'Book flights + hotels together to earn bonus miles',
      image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhaXJwbGFuZSUyMHRyYXZlbHxlbnwxfHx8fDE3NjExNTY1MjJ8MA&ixlib=rb-4.1.0&q=80&w=1080',
      gradient: 'from-purple-600/90 to-blue-600/80'
    }
  ];

  // Auto-rotate slides every 4 seconds
  useEffect(() => {
    startAutoRotate();
    return () => {
      if (autoRotateRef.current) {
        clearInterval(autoRotateRef.current);
      }
    };
  }, [currentSlide]);

  const startAutoRotate = () => {
    if (autoRotateRef.current) {
      clearInterval(autoRotateRef.current);
    }
    autoRotateRef.current = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % promotions.length);
    }, 4000);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    startAutoRotate();
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 75) {
      // Swipe left - next slide
      setCurrentSlide((prev) => (prev + 1) % promotions.length);
      startAutoRotate();
    }
    if (touchStart - touchEnd < -75) {
      // Swipe right - previous slide
      setCurrentSlide((prev) => (prev - 1 + promotions.length) % promotions.length);
      startAutoRotate();
    }
  };

  return (
    <div className="px-4 pt-3 max-w-md mx-auto">
      <div className="relative">
        <Card 
          className="overflow-hidden text-white cursor-pointer hover:shadow-lg transition-shadow relative"
          style={{ height: '120px' }}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* Slides Container */}
          <div 
            className="flex transition-transform duration-500 ease-out h-full"
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {promotions.map((promo) => {
              const Icon = promo.icon;
              return (
                <div key={promo.id} className="min-w-full h-full relative">
                  {/* Background Image */}
                  <div className="absolute inset-0">
                    <ImageWithFallback 
                      src={promo.image}
                      alt={promo.title}
                      className="w-full h-full object-cover"
                    />
                    <div className={`absolute inset-0 bg-gradient-to-r ${promo.gradient}`} />
                  </div>
                  
                  {/* Content */}
                  <div className="relative h-full p-4 flex items-center justify-between z-10">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Icon className="w-5 h-5" />
                        <Badge className="bg-white/20 backdrop-blur-sm text-white border-white/30 text-xs">
                          {promo.badge}
                        </Badge>
                      </div>
                      <h3 className="text-white mb-1 line-clamp-1">{promo.title}</h3>
                      <p className="text-white/90 text-sm line-clamp-1">{promo.description}</p>
                    </div>
                    <ChevronRight className="w-6 h-6 flex-shrink-0" />
                  </div>
                </div>
              );
            })}
          </div>
        </Card>

        {/* Slide Indicators */}
        <div className="flex justify-center gap-1.5 mt-3">
          {promotions.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                index === currentSlide 
                  ? 'w-6 bg-[#006564]' 
                  : 'w-1.5 bg-[#C6C2C1]'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export function HomeDiscoveryScreen({ onDestinationClick, onAIPromptSubmit, onNavigateToInspire, onJournalClick, onComingSoon, onNavigateToFlight, onNavigateToStay, onNavigateToPackages, onNavigateToExperiences, onNavigateToEvents, onNavigateToShop }: HomeDiscoveryScreenProps) {
  const [heroVariant, setHeroVariant] = useState<'default' | 'focused' | 'collapsed'>('default');
  const [isScrollingUp, setIsScrollingUp] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const lastScrollYRef = useRef(0);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Product data
  const shopProducts: Product[] = [
    {
      id: 'wine-1',
      name: 'Dom Pérignon Vintage 2015',
      category: 'Wine',
      categoryColor: '#006564',
      image: 'https://images.unsplash.com/photo-1749983030057-801e003ad976?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGFtcGFnbmUlMjBib3R0bGUlMjBsdXh1cnl8ZW58MXx8fHwxNzYzMjE4NjIxfDA&ixlib=rb-4.1.0&q=80&w=1080',
      price: 'HKD 2,280',
      priceHKD: 2280,
      miles: '28,500 mi',
      milesValue: 28500,
      size: '750ml',
      description: 'Experience the legendary 2015 vintage of Dom Pérignon, a perfect harmony of Chardonnay and Pinot Noir. This exceptional champagne offers notes of white flowers, citrus, and stone fruits with a long, mineral finish.',
      features: [
        'Vintage 2015 - Exceptional year',
        'Perfect for special celebrations',
        'Stored in optimal conditions',
        'Complimentary gift box included',
        'Duty-free exclusive pricing'
      ],
      stock: 'In Stock',
      rating: 4.9,
      reviews: 342
    },
    {
      id: 'wine-2',
      name: 'Château Margaux 2018',
      category: 'Wine',
      categoryColor: '#006564',
      image: 'https://images.unsplash.com/photo-1695048475495-6535686c473c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcmVtaXVtJTIwd2luZSUyMGJvdHRlxlbnwxfHx8fDE3NjMxMDkxODV8MA&ixlib=rb-4.1.0&q=80&w=1080',
      price: 'HKD 4,580',
      priceHKD: 4580,
      miles: '57,200 mi',
      milesValue: 57200,
      size: '750ml',
      description: 'One of Bordeaux\'s finest premier cru classé wines. The 2018 Château Margaux showcases elegant tannins, rich fruit flavors, and the unmistakable terroir of this legendary estate.',
      features: [
        'Premier Cru Classé from Margaux',
        '2018 vintage - Highly rated year',
        'Certified authentic by château',
        'Temperature-controlled storage',
        'Perfect for cellaring or immediate enjoyment'
      ],
      stock: 'Limited Stock',
      rating: 4.8,
      reviews: 189
    },
    {
      id: 'luggage-1',
      name: 'RIMOWA Essential Cabin',
      category: 'Luggage',
      categoryColor: '#C1B49A',
      image: 'https://images.unsplash.com/photo-1613255347963-408b0deb3633?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBsdWdnYWdlJTIwc3VpdGNhc2V8ZW58MXx8fHwxNzYzMjE4NjE4fDA&ixlib=rb-4.1.0&q=80&w=1080',
      price: 'HKD 5,200',
      priceHKD: 5200,
      miles: '65,000 mi',
      milesValue: 65000,
      size: '36L',
      description: 'The iconic RIMOWA Essential Cabin is the perfect travel companion. Featuring a lightweight yet durable polycarbonate shell, TSA-approved locks, and smooth-rolling multi-wheel system for effortless navigation.',
      features: [
        'IATA cabin size approved',
        'Lightweight polycarbonate construction',
        'TSA-approved combination lock',
        'Multi-wheel system for 360° mobility',
        '5-year international warranty'
      ],
      stock: 'In Stock',
      rating: 4.9,
      reviews: 1247
    },
    {
      id: 'luggage-2',
      name: 'Tumi Alpha Bravo Backpack',
      category: 'Luggage',
      categoryColor: '#C1B49A',
      image: 'https://images.unsplash.com/photo-1635289264208-88246c3b37ec?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cmF2ZWwlMjBiYWNrcGFjayUyMHByZW1pdW18ZW58MXx8fHwxNzYzMjE4NjIyfDA&ixlib=rb-4.1.0&q=80&w=1080',
      price: 'HKD 3,280',
      priceHKD: 3280,
      miles: '41,000 mi',
      milesValue: 41000,
      size: '25L',
      description: 'Premium business backpack designed for modern travelers. Features a dedicated laptop compartment, multiple organizational pockets, and water-resistant ballistic nylon exterior.',
      features: [
        'Fits up to 15" laptop',
        'Water-resistant ballistic nylon',
        'USB pass-through for charging',
        'Multiple organizational pockets',
        'Lifetime warranty with Tumi tracer'
      ],
      stock: 'In Stock',
      rating: 4.7,
      reviews: 893
    },
    {
      id: 'electronics-1',
      name: 'Sony WH-1000XM5 Headphones',
      category: 'Electronics',
      categoryColor: '#367D79',
      image: 'https://images.unsplash.com/photo-1761005653657-0885604ddbcd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcmVtaXVtJTIwaGVhZHBob25lcyUyMGVsZWN0cm9uaWNzfGVufDF8fHx8MTc2MzIxODYxOXww&ixlib=rb-4.1.0&q=80&w=1080',
      price: 'HKD 2,799',
      priceHKD: 2799,
      miles: '35,000 mi',
      milesValue: 35000,
      size: 'Noise Canceling',
      description: 'Industry-leading noise cancellation meets premium sound quality. The WH-1000XM5 features two processors controlling 8 microphones for unprecedented noise canceling performance. Perfect for long flights.',
      features: [
        'Industry-leading noise cancellation',
        '30-hour battery life',
        'Multipoint connection (2 devices)',
        'Speak-to-Chat technology',
        'Premium carry case included'
      ],
      stock: 'In Stock',
      rating: 4.8,
      reviews: 2456
    },
    {
      id: 'electronics-2',
      name: 'Sony Alpha A7C II Camera',
      category: 'Electronics',
      categoryColor: '#367D79',
      image: 'https://images.unsplash.com/photo-1603721264882-ec0d3de93289?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cmF2ZWwlMjBjYW1lcmElMjBlbGVjdHJvbmljc3xlbnwxfHx8fDE3NjMyMTg2MjF8MA&ixlib=rb-4.1.0&q=80&w=1080',
      price: 'HKD 14,990',
      priceHKD: 14990,
      miles: '187,000 mi',
      milesValue: 187000,
      size: 'Full Frame',
      description: 'Compact full-frame camera perfect for travel photography. The A7C II combines professional image quality with a lightweight, portable design. Features advanced AI processing and 4K 60p video.',
      features: [
        '33MP full-frame sensor',
        'AI-powered autofocus',
        '4K 60p video recording',
        '5-axis in-body stabilization',
        'Compact & travel-friendly design'
      ],
      stock: 'In Stock',
      rating: 4.9,
      reviews: 567
    }
  ];

  // Handle scroll for hero collapse/expand with direction detection
  useEffect(() => {
    const handleScroll = () => {
      if (!scrollRef.current) return;
      
      const currentScrollY = scrollRef.current.scrollTop;
      const scrollDelta = currentScrollY - lastScrollYRef.current;
      
      // Detect scroll direction
      const scrollingUp = scrollDelta < 0;
      
      // Update last scroll position
      lastScrollYRef.current = currentScrollY;
      
      // Determine hero variant based on scroll position
      if (currentScrollY <= 20) {
        // At the top - show full hero
        setHeroVariant('default');
        setIsScrollingUp(false);
      } else if (currentScrollY > 60) {
        // Scrolled down - show collapsed hero
        setHeroVariant('collapsed');
        setIsScrollingUp(scrollingUp);
      } else {
        // In between - show default
        setHeroVariant('default');
        setIsScrollingUp(false);
      }
    };

    const scrollContainer = scrollRef.current;
    if (scrollContainer) {
      scrollContainer.addEventListener('scroll', handleScroll, { passive: true });
      return () => scrollContainer.removeEventListener('scroll', handleScroll);
    }
  }, []);

  // User data
  const userTier = 'Gold';
  const asiaMiles = 124580;
  const nextTierMiles = 150000;
  const currentTierMiles = 100000;
  const progress = ((asiaMiles - currentTierMiles) / (nextTierMiles - currentTierMiles)) * 100;

  // Upcoming trip data (set to null if no trip)
  const upcomingTrip = {
    flight: 'CX500',
    destination: 'Tokyo (NRT)',
    departure: 'Mar 25, 06:00',
    arrival: '11:15',
    gate: '23',
    countdown: '2 days 5 hours',
    weather: '24°C Sunny'
  };

  const quickActions = [
    { id: 'flights', icon: Plane, label: 'Cathay Pacific', subtitle: 'Flights', color: 'from-[#006564] to-[#367D79]' },
    { id: 'hotels', icon: Hotel, label: 'Cathay Holidays', subtitle: 'Hotels & Packages', color: 'from-[#5a2d92] to-[#7d4db8]' },
    { id: 'cars', icon: Car, label: 'Car Rental', subtitle: 'Powered by Hertz', color: 'from-[#C1B49A] to-[#DCD3BC]' },
    { id: 'insurance', icon: Shield, label: 'Chubb Insurance', subtitle: 'Travel Protection', color: 'from-[#dc2626] to-[#f87171]' },
    { id: 'shopping', icon: ShoppingBag, label: 'Cathay Shop', subtitle: 'Travel Essentials', color: 'from-[#0891b2] to-[#06b6d4]' },
    { id: 'wallet', icon: Wallet, label: 'Asia Miles', subtitle: 'Earn & Redeem', color: 'from-[#ca8a04] to-[#eab308]' },
  ];

  const destinations = [
    {
      id: 'tokyo',
      image: 'https://images.unsplash.com/photo-1719360569529-bef1b1f331a7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxUb2t5byUyMGNoZXJyeSUyMGJsb3Nzb218ZW58MXx8fHwxNzYxMDU5NTIyfDA&ixlib=rb-4.1.0&q=80&w=1080',
      title: 'Tokyo Sakura',
      location: 'Tokyo, Japan',
      price: 'HKD 3,800',
      miles: '48,000',
      tags: ['Spring', 'Culture'],
      featured: true
    },
    {
      id: 'bali',
      image: 'https://images.unsplash.com/photo-1717501787981-d5f28eb2df5f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxCYWxpJTIwYmVhY2glMjBzdW5zZXR8ZW58MXx8fHwxNzYwOTg0NjM0fDA&ixlib=rb-4.1.0&q=80&w=1080',
      title: 'Bali Beach',
      location: 'Bali, Indonesia',
      price: 'HKD 2,200',
      miles: '28,000',
      tags: ['Beach', 'Relaxation']
    },
    {
      id: 'paris',
      image: 'https://images.unsplash.com/photo-1431274172761-fca41d930114?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxQYXJpcyUyMEVpZmZlbCUyMHRvd2VyfGVufDF8fHx8MTc2MTA1OTUyM3ww&ixlib=rb-4.1.0&q=80&w=1080',
      title: 'Paris Romance',
      location: 'Paris, France',
      price: 'HKD 5,600',
      miles: '72,000',
      tags: ['Romance', 'Culture'],
      featured: true
    },
    {
      id: 'singapore',
      image: 'https://images.unsplash.com/photo-1686455746285-4a921419bc6c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxTaW5nYXBvcmUlMjBtYXJpbmElMjBiYXl8ZW58MXx8fHwxNzYxMDU5NTIzfDA&ixlib=rb-4.1.0&q=80&w=1080',
      title: 'Urban Singapore',
      location: 'Singapore',
      price: 'HKD 1,800',
      miles: '22,000',
      tags: ['City', 'Food']
    },
  ];

  const inspirationJournals = [
    {
      id: 't1',
      author: { name: 'Cathay Xplorer', level: 'Official' },
      destination: 'Bali',
      country: 'Indonesia',
      title: 'Sunrise at Uluwatu Temple',
      description: 'Experience the magical sunrise at this clifftop temple, followed by traditional Kecak fire dance performances.',
      image: 'https://images.unsplash.com/photo-1613278435217-de4e5a91a4ee?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYWxpJTIwdGVtcGxlJTIwc3Vuc2V0fGVufDF8fHx8MTc2MTE1MzI3OHww&ixlib=rb-4.1.0&q=80&w=1080',
      duration: '7 days',
      category: 'culture',
      likes: 1289,
      tags: ['Temple', 'Sunrise', 'Traditional Dance']
    },
    {
      id: 't2',
      author: { name: 'Cathay Xplorer', level: 'Official' },
      destination: 'Paris',
      country: 'France',
      title: 'Secret Cafés & Patisseries',
      description: 'Beyond the tourist traps - where Parisians actually get their morning croissants and café au lait.',
      image: 'https://images.unsplash.com/photo-1686317508857-3b91999d6ec8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYXJpcyUyMGNhZmV8ZW58MXx8fHwxNzYxMTUzMjc4fDA&ixlib=rb-4.1.0&q=80&w=1080',
      duration: '4 days',
      category: 'luxury',
      likes: 892,
      tags: ['Café Culture', 'Pastries', 'Hidden Gems']
    },
    {
      id: 't3',
      author: { name: 'Cathay Xplorer', level: 'Official' },
      destination: 'Bangkok',
      country: 'Thailand',
      title: 'Floating Markets at Dawn',
      description: 'Visit Damnoen Saduak floating market early morning for an authentic experience away from crowds.',
      image: 'https://images.unsplash.com/photo-1546945344-e830559a0601?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYW5na29rJTIwZmxvYXRpbmclMjBtYXJrZXR8ZW58MXx8fHwxNzYxMTUzMjc5fDA&ixlib=rb-4.1.0&q=80&w=1080',
      duration: '4 days',
      category: 'culture',
      likes: 1045,
      tags: ['Markets', 'Local Life', 'Photography']
    },
    {
      id: 't4',
      author: { name: 'Cathay Xplorer', level: 'Official' },
      destination: 'Singapore',
      country: 'Singapore',
      title: 'Gardens by the Bay After Dark',
      description: 'The iconic Supertrees come alive at night with a stunning light and sound show. Don\'t miss the Cloud Forest.',
      image: 'https://images.unsplash.com/photo-1558289675-f8a783516e7b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzaW5nYXBvcmUlMjBnYXJkZW5zfGVufDF8fHx8MTc2MTE1MzczMXww&ixlib=rb-4.1.0&q=80&w=1080',
      duration: '3 days',
      category: 'culture',
      likes: 2156,
      tags: ['Gardens', 'Night Views', 'Architecture']
    }
  ];

  return (
    <div className="h-screen bg-mist-gray overflow-hidden relative">
      {/* Scrollable Content */}
      <div className="h-full pb-24 overflow-y-auto overflow-x-hidden" ref={scrollRef}>
        {/* Top spacing for fixed status bar */}
        <div className="h-[52px]" />

        {/* AI Travel Prompt Hero - Single instance that becomes fixed when scrolled */}
        <div 
          className={`px-4 pt-3 pb-6 max-w-md mx-auto transition-all duration-300 ${
            heroVariant === 'collapsed' 
              ? 'fixed top-[56px] left-0 right-0 z-40 bg-mist-gray' 
              : 'relative'
          }`}
          style={{
            transform: heroVariant === 'collapsed' && !isScrollingUp 
              ? 'translateY(-100%)' 
              : 'translateY(0)',
            opacity: heroVariant === 'collapsed' && !isScrollingUp ? 0 : 1
          }}
        >
          <HeroPromptCard 
            variant={heroVariant}
            userName="John"
            isScrollingUp={isScrollingUp}
            onSubmit={(prompt) => {
              onAIPromptSubmit?.(prompt);
            }}
          />
        </div>
        
        {/* Spacer to maintain layout when hero becomes fixed */}
        {heroVariant === 'collapsed' && (
          <div className="h-[92px]" /> 
        )}

      {/* Cathay Services Grid */}
      <div className="px-4 py-3 max-w-md mx-auto">
        <div className="grid grid-cols-3 gap-4">
          {/* Flight */}
          <button
            onClick={onNavigateToFlight}
            className="flex flex-col items-center gap-2 transition-all hover:scale-105 active:scale-95"
            aria-label="Navigate to Flight booking"
          >
            <div 
              className="w-16 h-16 rounded-full flex items-center justify-center shadow-md bg-white border-2"
              style={{ borderColor: '#006564' }}
              aria-hidden="true"
            >
              <Plane className="w-7 h-7" strokeWidth={2} style={{ color: '#006564' }} />
            </div>
            <span className="text-xs text-center" style={{ color: '#006564' }}>Flight</span>
          </button>

          {/* Stay */}
          <button
            onClick={onNavigateToStay}
            className="flex flex-col items-center gap-2 transition-all hover:scale-105 active:scale-95"
            aria-label="Navigate to Stay booking"
          >
            <div 
              className="w-16 h-16 rounded-full flex items-center justify-center shadow-md bg-white border-2"
              style={{ borderColor: '#006564' }}
              aria-hidden="true"
            >
              <Hotel className="w-7 h-7" strokeWidth={2} style={{ color: '#006564' }} />
            </div>
            <span className="text-xs text-center" style={{ color: '#006564' }}>Stay</span>
          </button>

          {/* Package */}
          <button
            onClick={onNavigateToPackages}
            className="flex flex-col items-center gap-2 transition-all hover:scale-105 active:scale-95"
            aria-label="Navigate to Package deals"
          >
            <div 
              className="w-16 h-16 rounded-full flex items-center justify-center shadow-md bg-white border-2"
              style={{ borderColor: '#006564' }}
              aria-hidden="true"
            >
              <Gift className="w-7 h-7" strokeWidth={2} style={{ color: '#006564' }} />
            </div>
            <span className="text-xs text-center" style={{ color: '#006564' }}>Package</span>
          </button>

          {/* Experience */}
          <button
            onClick={onNavigateToExperiences}
            className="flex flex-col items-center gap-2 transition-all hover:scale-105 active:scale-95"
            aria-label="Navigate to Experiences"
          >
            <div 
              className="w-16 h-16 rounded-full flex items-center justify-center shadow-md bg-white border-2"
              style={{ borderColor: '#006564' }}
              aria-hidden="true"
            >
              <MapPin className="w-7 h-7" strokeWidth={2} style={{ color: '#006564' }} />
            </div>
            <span className="text-xs text-center" style={{ color: '#006564' }}>Experience</span>
          </button>

          {/* Event */}
          <button
            onClick={onNavigateToEvents}
            className="flex flex-col items-center gap-2 transition-all hover:scale-105 active:scale-95"
            aria-label="Navigate to Events"
          >
            <div 
              className="w-16 h-16 rounded-full flex items-center justify-center shadow-md bg-white border-2"
              style={{ borderColor: '#006564' }}
              aria-hidden="true"
            >
              <Sparkles className="w-7 h-7" strokeWidth={2} style={{ color: '#006564' }} />
            </div>
            <span className="text-xs text-center" style={{ color: '#006564' }}>Event</span>
          </button>

          {/* Shop */}
          <button
            onClick={onNavigateToShop}
            className="flex flex-col items-center gap-2 transition-all hover:scale-105 active:scale-95"
            aria-label="Navigate to Cathay Shop"
          >
            <div 
              className="w-16 h-16 rounded-full flex items-center justify-center shadow-md bg-white border-2"
              style={{ borderColor: '#006564' }}
              aria-hidden="true"
            >
              <ShoppingBag className="w-7 h-7" strokeWidth={2} style={{ color: '#006564' }} />
            </div>
            <span className="text-xs text-center" style={{ color: '#006564' }}>Shop</span>
          </button>
        </div>
      </div>

      {/* Promotional Carousel */}
      <PromotionalCarousel />

      {/* Discover Destinations */}
      <div className="px-4 pt-3 max-w-md mx-auto">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h2>Discover Destinations</h2>
            <p className="text-muted-foreground">Personalized for you</p>
          </div>
          <div className="flex items-center gap-2">
            <Badge 
              variant="secondary" 
              className="text-xs bg-[#006564]/10 text-[#006564] border-0"
            >
              Powered by Vera
            </Badge>
            <Button variant="ghost" size="sm">
              <Sparkles className="w-4 h-4 mr-1" />
              AI Pick
            </Button>
          </div>
        </div>
        
        <div 
          className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide snap-x snap-mandatory"
          onTouchStart={(e) => e.stopPropagation()}
          onTouchMove={(e) => e.stopPropagation()}
          onTouchEnd={(e) => e.stopPropagation()}
        >
          {destinations.map((dest) => (
            <div
              key={dest.id}
              className="flex-shrink-0 snap-start"
              style={{ width: '172px' }}
            >
              <div 
                className="rounded-xl overflow-hidden cursor-pointer hover:shadow-lg transition-shadow bg-white"
                style={{ height: '228px' }}
                onClick={() => onDestinationClick(dest.id)}
              >
                <div className="relative h-[140px]">
                  <ImageWithFallback 
                    src={dest.image}
                    alt={dest.title}
                    className="w-full h-full object-cover"
                  />
                  {dest.featured && (
                    <Badge 
                      className="absolute top-2 left-2 bg-[#006564] text-white border-0 text-xs"
                    >
                      Featured
                    </Badge>
                  )}
                </div>
                <div className="p-3">
                  <h4 className="mb-1 line-clamp-1">{dest.title}</h4>
                  <p className="text-muted-foreground text-sm mb-2 line-clamp-1">{dest.location}</p>
                  <div className="flex items-center justify-between">
                    <p className="text-sm">From {dest.price}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Cathay Shop Section */}
      <div className="px-4 py-5 bg-white border-t border-border max-w-md mx-auto">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2>Cathay Shop</h2>
            <p className="text-muted-foreground">Exclusive travel essentials & duty-free</p>
          </div>
          <button className="text-xs text-[#006564]">View All</button>
        </div>
        <div 
          className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide -mx-4 px-4"
          onTouchStart={(e) => e.stopPropagation()}
          onTouchMove={(e) => e.stopPropagation()}
          onTouchEnd={(e) => e.stopPropagation()}
        >
          {shopProducts.map((product) => (
            <div 
              key={product.id}
              className="flex-shrink-0 w-44 rounded-xl overflow-hidden border border-border hover:shadow-lg transition-shadow cursor-pointer bg-white"
              onClick={() => setSelectedProduct(product)}
            >
              <div className="relative aspect-square bg-gray-50">
                <ImageWithFallback
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
                <Badge 
                  className="absolute top-2 left-2 text-white text-xs" 
                  style={{ backgroundColor: product.categoryColor }}
                >
                  {product.category}
                </Badge>
              </div>
              <div className="p-3">
                <p className="text-sm mb-1 line-clamp-2">{product.name}</p>
                <p className="text-xs text-muted-foreground mb-2">{product.size}</p>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm">{product.price}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-[#006564]">{product.miles}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      </div>

      {/* Product Detail Dialog */}
      <Dialog open={!!selectedProduct} onOpenChange={(open) => !open && setSelectedProduct(null)}>
        <DialogContent className="max-w-md max-h-[90vh] p-0 overflow-hidden" aria-describedby={undefined}>
          {selectedProduct && (
            <>
              {/* Accessibility - Hidden Title */}
              <DialogTitle className="sr-only">{selectedProduct.name}</DialogTitle>

              {/* Product Image */}
              <div className="relative aspect-square bg-gray-50">
                <ImageWithFallback
                  src={selectedProduct.image}
                  alt={selectedProduct.name}
                  className="w-full h-full object-cover"
                />
                <button
                  onClick={() => setSelectedProduct(null)}
                  className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center hover:bg-white transition-colors shadow-lg"
                >
                  <X className="w-5 h-5" />
                </button>
                <button
                  className="absolute top-4 left-4 w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center hover:bg-white transition-colors shadow-lg"
                >
                  <Heart className="w-5 h-5" />
                </button>
              </div>

              {/* Product Details */}
              <div className="p-6 overflow-y-auto max-h-[calc(90vh-400px)] scrollbar-hide">
                {/* Category Badge */}
                <Badge 
                  className="text-white text-xs mb-3" 
                  style={{ backgroundColor: selectedProduct.categoryColor }}
                >
                  {selectedProduct.category}
                </Badge>

                {/* Product Name & Rating */}
                <h2 className="mb-2">{selectedProduct.name}</h2>
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < Math.floor(selectedProduct.rating)
                            ? 'fill-yellow-400 text-yellow-400'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {selectedProduct.rating} ({selectedProduct.reviews} reviews)
                  </span>
                </div>

                {/* Stock Status */}
                <div className="flex items-center gap-2 mb-4">
                  <div 
                    className={`w-2 h-2 rounded-full ${
                      selectedProduct.stock === 'In Stock' ? 'bg-green-500' : 'bg-orange-500'
                    }`}
                  />
                  <span className="text-sm">{selectedProduct.stock}</span>
                </div>

                {/* Description */}
                <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                  {selectedProduct.description}
                </p>

                {/* Features */}
                <div className="mb-6">
                  <h4 className="mb-3">Key Features</h4>
                  <ul className="space-y-2">
                    {selectedProduct.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#006564] mt-1.5 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Size/Specification */}
                <div className="p-4 bg-mist-gray rounded-lg mb-6">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Specification</span>
                    <span className="text-sm">{selectedProduct.size}</span>
                  </div>
                </div>
              </div>

              {/* Fixed Bottom Actions */}
              <div className="border-t border-border p-4 bg-white space-y-3">
                {/* Price Display */}
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <p className="text-xs text-muted-foreground">Price</p>
                    <p className="text-xl">{selectedProduct.price}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-muted-foreground">Or redeem with</p>
                    <p className="text-lg text-[#006564]">{selectedProduct.miles}</p>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="grid grid-cols-2 gap-3">
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => setSelectedProduct(null)}
                  >
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    Add to Cart
                  </Button>
                  <Button 
                    className="w-full bg-[#006564] hover:bg-[#004d4c] text-white"
                    onClick={() => setSelectedProduct(null)}
                  >
                    Redeem Miles
                  </Button>
                </div>

                {/* Share Button */}
                <Button 
                  variant="ghost" 
                  className="w-full"
                  onClick={() => setSelectedProduct(null)}
                >
                  <Share2 className="w-4 h-4 mr-2" />
                  Share Product
                </Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}