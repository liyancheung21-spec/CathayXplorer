import { ArrowLeft, Heart, Share2, MapPin, Calendar, Users, Sparkles } from "lucide-react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Card } from "../ui/card";

interface DestinationDetailScreenProps {
  onBack: () => void;
  onBookNow: () => void;
}

export function DestinationDetailScreen({ onBack, onBookNow }: DestinationDetailScreenProps) {
  const highlights = [
    { icon: '🌸', text: 'Cherry blossom viewing' },
    { icon: '🏯', text: 'Traditional temples' },
    { icon: '🍣', text: 'Authentic sushi experience' },
    { icon: '🛍️', text: 'Shopping in Shibuya' },
  ];

  const activities = [
    { time: 'Morning', title: 'Visit Senso-ji Temple', duration: '2 hours', price: 'Free' },
    { time: 'Afternoon', title: 'Explore Shibuya & Harajuku', duration: '3 hours', price: 'HKD 500' },
    { time: 'Evening', title: 'Tokyo Skytree Experience', duration: '2 hours', price: 'HKD 280' },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Image */}
      <div className="relative h-[50vh]">
        <img 
          src="https://images.unsplash.com/photo-1719360569529-bef1b1f331a7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxUb2t5byUyMGNoZXJyeSUyMGJsb3Nzb218ZW58MXx8fHwxNzYxMDU5NTIyfDA&ixlib=rb-4.1.0&q=80&w=1080"
          alt="Tokyo"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        
        {/* Header Controls */}
        <div className="absolute top-0 left-0 right-0 p-5 flex items-center justify-between">
          <button
            onClick={onBack}
            className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="flex gap-2">
            <button className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center">
              <Share2 className="w-5 h-5" />
            </button>
            <button className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center">
              <Heart className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Title overlay */}
        <div className="absolute bottom-0 left-0 right-0 text-white z-20 px-[20px] py-[72px]">
          <div className="flex items-center gap-2 mb-2">
            <MapPin className="w-4 h-4" />
            <p>Tokyo, Japan</p>
          </div>
          <h1 className="text-white mb-2">Cherry Blossom Season</h1>
          <div className="flex gap-2">
            <Badge style={{backgroundColor: 'var(--cathay-gold)', color: 'var(--charcoal)'}}>
              Cathay's Pick
            </Badge>
            <Badge className="bg-white/20 backdrop-blur-sm text-white">
              Best in Spring
            </Badge>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-5 pb-24 relative">
        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-3 -mt-8 relative z-10 mb-6">
          <Card className="p-3 text-center shadow-lg">
            <Calendar className="w-5 h-5 mx-auto mb-1" style={{ color: 'var(--cathay-jade)' }} />
            <p className="text-muted-foreground">Best time</p>
            <p>Mar-Apr</p>
          </Card>
          <Card className="p-3 text-center shadow-lg">
            <Users className="w-5 h-5 mx-auto mb-1" style={{ color: 'var(--cathay-jade)' }} />
            <p className="text-muted-foreground">Popular for</p>
            <p>Couples</p>
          </Card>
          <Card className="p-3 text-center shadow-lg">
            <MapPin className="w-5 h-5 mx-auto mb-1" style={{ color: 'var(--cathay-jade)' }} />
            <p className="text-muted-foreground">Flight time</p>
            <p>4.5h</p>
          </Card>
        </div>

        {/* AI Suggestion */}
        <div className="mb-6 p-4 rounded-lg bg-gradient-to-r from-[#006564]/5 to-[#367D79]/5 border border-[#006564]/20">
          <div className="flex gap-3">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#006564] flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <div className="flex-1">
              <p className="text-sm">AI Recommendation</p>
              <p className="text-muted-foreground text-sm">
                Perfect 5-day itinerary available. Visit during late March for peak cherry blossoms and fewer crowds.
              </p>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="w-full grid grid-cols-3">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="itinerary">Itinerary</TabsTrigger>
            <TabsTrigger value="hotels">Hotels</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6 pt-4">
            <div>
              <h3 className="mb-3">Highlights</h3>
              <div className="grid grid-cols-2 gap-3">
                {highlights.map((item, i) => (
                  <div key={i} className="flex items-center gap-2 p-3 rounded-lg bg-mist-gray">
                    <span className="text-2xl">{item.icon}</span>
                    <p>{item.text}</p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="mb-3">About</h3>
              <p className="text-muted-foreground">
                Experience Tokyo during the magical cherry blossom season. Marvel at pink sakura trees in full bloom, 
                explore ancient temples, indulge in world-class cuisine, and immerse yourself in the perfect blend 
                of traditional culture and modern innovation.
              </p>
            </div>
          </TabsContent>

          <TabsContent value="itinerary" className="space-y-3 pt-4">
            <div className="flex items-center justify-between mb-4">
              <h3>Suggested Day 1</h3>
              <Button variant="ghost" size="sm">
                <Sparkles className="w-4 h-4 mr-1" />
                Auto-plan
              </Button>
            </div>
            
            {activities.map((activity, i) => (
              <Card key={i} className="p-4">
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center" 
                       style={{ backgroundColor: 'var(--mist-gray)' }}>
                    <p>{activity.time[0]}</p>
                  </div>
                  <div className="flex-1">
                    <p>{activity.title}</p>
                    <div className="flex items-center gap-3 mt-1">
                      <p className="text-muted-foreground">{activity.duration}</p>
                      <p className="text-muted-foreground">•</p>
                      <p className="text-muted-foreground">{activity.price}</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm">Add</Button>
                </div>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="hotels" className="pt-4">
            <p className="text-center text-muted-foreground py-8">
              Hotel recommendations coming soon
            </p>
          </TabsContent>
        </Tabs>
      </div>

      {/* Floating CTA */}
      <div className="fixed bottom-0 left-0 right-0 p-5 bg-white border-t border-border">
        <div className="max-w-md mx-auto flex items-center gap-3">
          <div className="flex-1">
            <p className="text-muted-foreground">From</p>
            <p>HKD 3,800</p>
          </div>
          <Button 
            onClick={onBookNow}
            size="lg" 
            className="flex-1"
            style={{ backgroundColor: 'var(--cathay-jade)' }}
          >
            Add to Trip
          </Button>
        </div>
      </div>
    </div>
  );
}
