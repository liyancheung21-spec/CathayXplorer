import { ArrowLeft, MapPin, Clock, Star, Tag, Navigation } from "lucide-react";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { Badge } from "../ui/badge";

interface NearbyDealsScreenProps {
  onBack: () => void;
}

export function NearbyDealsScreen({ onBack }: NearbyDealsScreenProps) {
  const deals = [
    {
      id: 1,
      category: 'Restaurant',
      name: 'Sushi Saito',
      description: '20% off omakase menu',
      distance: '0.3 km',
      timeLeft: '2 hours',
      rating: 4.8,
      image: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=400',
      tags: ['Asia Miles Earn', 'Limited']
    },
    {
      id: 2,
      category: 'Shopping',
      name: 'Uniqlo Shibuya Dōgenzaka',
      description: 'Exclusive 15% discount',
      distance: '0.5 km',
      timeLeft: '4 hours',
      rating: 4.6,
      image: 'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=400',
      tags: ['Asia Miles Partner']
    },
    {
      id: 3,
      category: 'Activity',
      name: 'TeamLab Borderless',
      description: 'Skip the line tickets',
      distance: '1.2 km',
      timeLeft: 'Today only',
      rating: 4.9,
      image: 'https://images.unsplash.com/photo-1528164344705-47542687000d?w=400',
      tags: ['Hot Deal']
    },
    {
      id: 4,
      category: 'Spa',
      name: 'Oedo Onsen',
      description: 'Traditional hot spring experience',
      distance: '2.1 km',
      timeLeft: '6 hours',
      rating: 4.7,
      image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=400',
      tags: ['Relaxation']
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#006564] to-[#367D79] px-5 pt-12 pb-6 text-white sticky top-0 z-10">
        <div className="max-w-md mx-auto">
          <div className="flex items-center gap-3 mb-4">
            <button onClick={onBack} className="w-9 h-9 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
              <ArrowLeft className="w-5 h-5 text-white" />
            </button>
            <div className="flex-1">
              <h2 className="text-white">Nearby Deals</h2>
              <p className="text-white/80">Exclusive offers for Cathay Members</p>
            </div>
            <button className="w-9 h-9 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
              <Navigation className="w-5 h-5 text-white" />
            </button>
          </div>

          {/* Location */}
          <div className="flex items-center gap-2 text-white/90">
            <MapPin className="w-4 h-4" />
            <p>Shibuya, Tokyo</p>
          </div>
        </div>
      </div>

      {/* Deals List */}
      <div className="px-5 pt-6 pb-24 max-w-md mx-auto space-y-4">
        <div className="flex items-center justify-between">
          <p className="text-muted-foreground">
            {deals.length} deals found nearby
          </p>
          <Button variant="outline" size="sm">
            <MapPin className="w-4 h-4 mr-1" />
            Map View
          </Button>
        </div>

        {deals.map((deal) => (
          <Card key={deal.id} className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
            <div className="flex gap-4">
              {/* Image */}
              <div className="relative w-28 h-28 flex-shrink-0">
                <img 
                  src={deal.image} 
                  alt={deal.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-0.5 rounded">
                  <p>Deal</p>
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 py-3 pr-3 flex flex-col">
                <div className="flex-1">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <div>
                      <Badge variant="outline" className="mb-1">{deal.category}</Badge>
                      <p>{deal.name}</p>
                    </div>
                  </div>
                  <p className="text-muted-foreground text-sm mb-2 line-clamp-1">{deal.description}</p>
                  
                  {/* Tags */}
                  <div className="flex flex-wrap gap-1 mb-2">
                    {deal.tags.map((tag) => (
                      <Badge 
                        key={tag} 
                        variant="secondary"
                        className="text-xs"
                        style={tag.includes('Cathay') ? { backgroundColor: 'var(--cathay-jade)', color: 'white' } : {}}
                      >
                        {tag}
                      </Badge>
                    ))}
                    {(deal.id === 1 || deal.id === 4) && (
                      <Badge variant="outline" className="text-xs" style={{ backgroundColor: '#C1B49A', borderColor: '#C1B49A', color: 'black' }}>Cathay Gold or Above</Badge>
                    )}
                  </div>
                </div>

                {/* Meta */}
                <div className="flex items-center gap-2 text-muted-foreground text-xs">
                  <div className="flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    <p>{deal.distance}</p>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    <p>{deal.timeLeft}</p>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="w-3 h-3 fill-yellow-400 stroke-yellow-400" />
                    <p>{deal.rating}</p>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        ))}

        {/* AI Suggestion */}
        <Card className="p-4 bg-gradient-to-r from-[#006564]/5 to-[#367D79]/5 border-[#006564]/20">
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#006564] flex items-center justify-center">
              <Tag className="w-4 h-4 text-white" />
            </div>
            <div className="flex-1">
              <p>More deals unlocking soon</p>
              <p className="text-muted-foreground">
                Visit 2 more Cathay partner locations to unlock premium deals
              </p>
            </div>
          </div>
        </Card>
      </div>

      {/* Floating CTA */}
      <div className="fixed bottom-0 left-0 right-0 p-5 bg-white border-t border-border">
        <div className="max-w-md mx-auto">
          <Button 
            size="lg" 
            className="w-full"
            style={{ backgroundColor: 'var(--cathay-jade)' }}
          >
            <QrCode className="w-5 h-5 mr-2" />
            Open QR Wallet
          </Button>
        </div>
      </div>
    </div>
  );
}

function QrCode({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="3" y="3" width="7" height="7" />
      <rect x="14" y="3" width="7" height="7" />
      <rect x="3" y="14" width="7" height="7" />
      <path d="M14 14h1v1h-1v-1z" />
      <path d="M16 14h1v1h-1v-1z" />
      <path d="M18 14h1v1h-1v-1z" />
      <path d="M20 14h1v1h-1v-1z" />
      <path d="M14 16h1v1h-1v-1z" />
      <path d="M16 16h1v1h-1v-1z" />
      <path d="M18 16h1v1h-1v-1z" />
      <path d="M20 16h1v1h-1v-1z" />
    </svg>
  );
}
