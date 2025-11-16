import { ArrowLeft, Heart, Bookmark, Share2, MapPin, Clock, User, Sparkles } from "lucide-react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Card } from "../ui/card";
import { ImageWithFallback } from "../figma/ImageWithFallback";

interface JournalPost {
  id: string;
  author: {
    name: string;
    avatar?: string;
    level: string;
  };
  destination: string;
  country: string;
  title: string;
  description: string;
  image: string;
  duration: string;
  category: string;
  likes?: number;
  isLiked?: boolean;
  isSaved?: boolean;
  tags?: string[];
}

interface JournalDetailScreenProps {
  journal: JournalPost;
  onBack: () => void;
}

export function JournalDetailScreen({ journal, onBack }: JournalDetailScreenProps) {
  if (!journal) {
    return (
      <div className="min-h-screen bg-mist-gray pb-24 flex items-center justify-center">
        <p className="text-muted-foreground">Journal not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-mist-gray pb-24">
      {/* Hero Image with overlay */}
      <div className="relative h-80">
        <ImageWithFallback 
          src={journal.image} 
          alt={journal.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
        
        {/* Back button */}
        <button 
          onClick={onBack}
          className="absolute top-4 left-4 w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-white/30 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>

        {/* Action buttons */}
        <div className="absolute top-4 right-4 flex gap-2">
          <button className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-white/30 transition-colors">
            <Share2 className="w-5 h-5" />
          </button>
          <button className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-white/30 transition-colors">
            <Bookmark className="w-5 h-5" />
          </button>
        </div>

        {/* Category badge */}
        <div className="absolute bottom-4 left-4">
          <Badge className="bg-white/90 text-[#006564] border-0 capitalize">
            {journal.category}
          </Badge>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-md mx-auto px-4 -mt-6 relative z-10">
        <Card className="p-5 mb-4">
          {/* Location & Duration */}
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2 text-muted-foreground">
              <MapPin className="w-4 h-4" />
              <span className="text-sm">{journal.destination}, {journal.country}</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Clock className="w-4 h-4" />
              <span className="text-sm">{journal.duration}</span>
            </div>
          </div>

          {/* Title */}
          <h1 className="mb-3">{journal.title}</h1>

          {/* Author */}
          <div className="flex items-center gap-3 pb-4 border-b border-border">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#006564] to-[#367D79] flex items-center justify-center text-white">
              {journal.author.avatar ? (
                <ImageWithFallback src={journal.author.avatar} alt={journal.author.name} className="w-full h-full rounded-full object-cover" />
              ) : (
                <User className="w-5 h-5" />
              )}
            </div>
            <div className="flex-1">
              <p className="text-sm">{journal.author.name}</p>
              <div className="flex items-center gap-1.5">
                {journal.author.level === 'Official' && (
                  <Sparkles className="w-3 h-3" style={{ color: 'var(--cathay-gold)' }} />
                )}
                <p className="text-xs text-muted-foreground">{journal.author.level}</p>
              </div>
            </div>
            {journal.likes && (
              <div className="flex items-center gap-1.5">
                <Heart className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm">{journal.likes}</span>
              </div>
            )}
          </div>
        </Card>

        {/* Description */}
        <Card className="p-5 mb-4">
          <h3 className="mb-3">About this Journey</h3>
          <p className="text-muted-foreground leading-relaxed mb-4">{journal.description}</p>
          
          {/* Extended content - simulated for now */}
          <p className="text-muted-foreground leading-relaxed mb-4">
            This carefully curated experience offers the perfect blend of adventure and relaxation. 
            Whether you're a first-time visitor or returning traveler, you'll discover hidden gems 
            and create unforgettable memories.
          </p>
          
          <p className="text-muted-foreground leading-relaxed">
            Our local experts have hand-picked the best times to visit, authentic dining spots, 
            and unique experiences that go beyond typical tourist attractions. From sunrise to 
            sunset, every moment is designed to immerse you in the local culture and natural beauty.
          </p>
        </Card>

        {/* Tags */}
        {journal.tags && journal.tags.length > 0 && (
          <Card className="p-5 mb-4">
            <h3 className="mb-3">Highlights</h3>
            <div className="flex flex-wrap gap-2">
              {journal.tags.map((tag, index) => (
                <Badge key={index} variant="secondary" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
          </Card>
        )}

        {/* Suggested Itinerary & Call to Action */}
        <Card className="p-5 mb-4">
          <h3 className="mb-3">Suggested Itinerary</h3>
          <p className="text-muted-foreground text-sm mb-4">A 3-day adventure plan curated by our travel blogger</p>
          
          <div className="space-y-4 mb-5">
            {/* Day 1 */}
            <div>
              <p className="mb-2" style={{ color: 'var(--cathay-jade)' }}>Day 1</p>
              <div className="space-y-2 pl-3 border-l-2 border-[#EBEDEC]">
                <div className="flex gap-3">
                  <span className="text-sm text-muted-foreground min-w-[3.5rem]">10:00</span>
                  <span className="text-sm">Arrival & Hotel Check-in</span>
                </div>
                <div className="flex gap-3">
                  <span className="text-sm text-muted-foreground min-w-[3.5rem]">12:00</span>
                  <span className="text-sm">Lunch at Local Market</span>
                </div>
                <div className="flex gap-3">
                  <span className="text-sm text-muted-foreground min-w-[3.5rem]">15:00</span>
                  <span className="text-sm">Beach Sunset Experience</span>
                </div>
              </div>
            </div>

            {/* Day 2 */}
            <div>
              <p className="mb-2" style={{ color: 'var(--cathay-jade)' }}>Day 2</p>
              <div className="space-y-2 pl-3 border-l-2 border-[#EBEDEC]">
                <div className="flex gap-3">
                  <span className="text-sm text-muted-foreground min-w-[3.5rem]">08:00</span>
                  <span className="text-sm">Temple Tour & Cultural Sites</span>
                </div>
                <div className="flex gap-3">
                  <span className="text-sm text-muted-foreground min-w-[3.5rem]">13:00</span>
                  <span className="text-sm">Traditional Cooking Class</span>
                </div>
                <div className="flex gap-3">
                  <span className="text-sm text-muted-foreground min-w-[3.5rem]">18:00</span>
                  <span className="text-sm">Night Market Shopping</span>
                </div>
              </div>
            </div>

            {/* Day 3 */}
            <div>
              <p className="mb-2" style={{ color: 'var(--cathay-jade)' }}>Day 3</p>
              <div className="space-y-2 pl-3 border-l-2 border-[#EBEDEC]">
                <div className="flex gap-3">
                  <span className="text-sm text-muted-foreground min-w-[3.5rem]">09:00</span>
                  <span className="text-sm">Water Sports & Activities</span>
                </div>
                <div className="flex gap-3">
                  <span className="text-sm text-muted-foreground min-w-[3.5rem]">14:00</span>
                  <span className="text-sm">Spa & Wellness Retreat</span>
                </div>
                <div className="flex gap-3">
                  <span className="text-sm text-muted-foreground min-w-[3.5rem]">19:00</span>
                  <span className="text-sm">Farewell Dinner by the Beach</span>
                </div>
                <div className="flex gap-3">
                  <span className="text-sm text-muted-foreground min-w-[3.5rem]">22:00</span>
                  <span className="text-sm">Hotel Check-out & Departure</span>
                </div>
              </div>
            </div>
          </div>

          {/* Call to Action Section */}
          <div className="pt-5 border-t border-border">
            <h3 className="mb-2">Ready to explore {journal.destination}?</h3>
            <p className="text-muted-foreground mb-4">
              Book your trip with Cathay Pacific and earn Asia Miles on your journey.
            </p>
            <div className="flex gap-2">
              <Button className="flex-1" style={{ backgroundColor: 'var(--cathay-jade)' }}>
                Book Flight
              </Button>
              <Button variant="outline" className="flex-1">
                View Hotels
              </Button>
            </div>
          </div>
        </Card>

        {/* Related Destinations */}
        <div className="mb-4">
          <h3 className="mb-3 px-1">More from Cathay Xplorer</h3>
          <div className="grid grid-cols-2 gap-3">
            <Card className="overflow-hidden cursor-pointer hover:shadow-lg transition-shadow">
              <div className="relative h-28">
                <ImageWithFallback 
                  src="https://images.unsplash.com/photo-1719360569529-bef1b1f331a7?w=400"
                  alt="Related destination"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-3">
                <p className="text-sm line-clamp-1">Cherry Blossoms in Japan</p>
                <p className="text-xs text-muted-foreground">Culture</p>
              </div>
            </Card>
            <Card className="overflow-hidden cursor-pointer hover:shadow-lg transition-shadow">
              <div className="relative h-28">
                <ImageWithFallback 
                  src="https://images.unsplash.com/photo-1717501787981-d5f28eb2df5f?w=400"
                  alt="Related destination"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-3">
                <p className="text-sm line-clamp-1">Beach Paradise</p>
                <p className="text-xs text-muted-foreground">Luxury</p>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
