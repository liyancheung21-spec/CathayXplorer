import { ArrowLeft, Sparkles, Plane, Utensils, Hotel, TrendingUp, Calendar, DollarSign, Users, Award } from "lucide-react";
import { Card } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";

interface PreferencesScreenProps {
  onBack: () => void;
  onComingSoon?: () => void;
}

export function PreferencesScreen({ onBack, onComingSoon }: PreferencesScreenProps) {
  // Mock user data - in a real app, this would come from user profile/settings
  const travelerArchetype = {
    type: "Luxury Explorer",
    description: "You seek premium experiences with authentic cultural immersion. You appreciate comfort and convenience while exploring hidden gems.",
    icon: Award,
    color: "#C1B49A" // Cathay Sand color
  };

  const preferences = {
    travelStyle: ["Luxury", "Cultural", "Culinary"],
    pace: "Balanced - Mix of activities and relaxation",
    accommodation: "5-star hotels & boutique properties",
    dining: "Fine dining & local authentic cuisine",
    interests: ["Art & Museums", "Michelin Dining", "Spa & Wellness", "Photography", "Wine Tasting"],
    budget: "Premium (HKD 15,000 - 30,000 per trip)",
    groupSize: "Solo or Couples",
    tripDuration: "5-7 days typically"
  };

  const recentDestinationTypes = [
    { type: "Beach Resort", count: 8, icon: "🏖️" },
    { type: "Cultural City", count: 12, icon: "🏛️" },
    { type: "Mountain Retreat", count: 5, icon: "⛰️" },
    { type: "Urban Adventure", count: 15, icon: "🌆" }
  ];

  const topDestinations = [
    "Tokyo, Japan",
    "Paris, France", 
    "Bali, Indonesia",
    "Dubai, UAE",
    "Bangkok, Thailand"
  ];

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
            <h2>My Travel Preferences</h2>
            <p className="text-sm text-muted-foreground">Powered by Vera AI</p>
          </div>
        </div>
      </div>

      <div className="px-5 pt-6 pb-6 space-y-6">
        <div className="max-w-md mx-auto space-y-6">
          {/* Traveler Archetype */}
          <Card className="p-6 border-2" style={{ borderColor: travelerArchetype.color }}>
            <div className="flex items-start gap-4 mb-4">
              <div 
                className="w-16 h-16 rounded-full flex items-center justify-center"
                style={{ backgroundColor: `${travelerArchetype.color}20` }}
              >
                <travelerArchetype.icon 
                  className="w-8 h-8" 
                  style={{ color: travelerArchetype.color }} 
                />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h3>{travelerArchetype.type}</h3>
                  <Sparkles className="w-4 h-4" style={{ color: 'var(--cathay-jade)' }} />
                </div>
                <p className="text-sm text-muted-foreground">{travelerArchetype.description}</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              {preferences.travelStyle.map((style, index) => (
                <Badge 
                  key={index} 
                  variant="secondary"
                  style={{ backgroundColor: `${travelerArchetype.color}20`, color: travelerArchetype.color }}
                >
                  {style}
                </Badge>
              ))}
            </div>
          </Card>

          {/* AI Learning Note */}
          <Card className="p-4 bg-gradient-to-r from-[#006564]/5 to-[#367D79]/5 border-[#006564]/20">
            <div className="flex items-start gap-3">
              <Sparkles className="w-5 h-5 mt-0.5 shrink-0" style={{ color: 'var(--cathay-jade)' }} />
              <div>
                <p className="text-sm">
                  Vera AI continuously learns from your bookings, searches, and saved items to personalize your travel recommendations.
                </p>
              </div>
            </div>
          </Card>

          {/* Travel Preferences */}
          <Card className="p-5">
            <h3 className="mb-4">Travel Preferences</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Calendar className="w-5 h-5 mt-0.5 shrink-0" style={{ color: 'var(--cathay-jade)' }} />
                <div className="flex-1">
                  <p className="text-sm">Trip Duration</p>
                  <p className="text-muted-foreground">{preferences.tripDuration}</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <TrendingUp className="w-5 h-5 mt-0.5 shrink-0" style={{ color: 'var(--cathay-jade)' }} />
                <div className="flex-1">
                  <p className="text-sm">Travel Pace</p>
                  <p className="text-muted-foreground">{preferences.pace}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Hotel className="w-5 h-5 mt-0.5 shrink-0" style={{ color: 'var(--cathay-jade)' }} />
                <div className="flex-1">
                  <p className="text-sm">Accommodation Style</p>
                  <p className="text-muted-foreground">{preferences.accommodation}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Utensils className="w-5 h-5 mt-0.5 shrink-0" style={{ color: 'var(--cathay-jade)' }} />
                <div className="flex-1">
                  <p className="text-sm">Dining Preferences</p>
                  <p className="text-muted-foreground">{preferences.dining}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <DollarSign className="w-5 h-5 mt-0.5 shrink-0" style={{ color: 'var(--cathay-jade)' }} />
                <div className="flex-1">
                  <p className="text-sm">Budget Range</p>
                  <p className="text-muted-foreground">{preferences.budget}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Users className="w-5 h-5 mt-0.5 shrink-0" style={{ color: 'var(--cathay-jade)' }} />
                <div className="flex-1">
                  <p className="text-sm">Group Size</p>
                  <p className="text-muted-foreground">{preferences.groupSize}</p>
                </div>
              </div>
            </div>
          </Card>

          {/* Interests */}
          <Card className="p-5">
            <h3 className="mb-3">Interests & Activities</h3>
            <div className="flex flex-wrap gap-2">
              {preferences.interests.map((interest, index) => (
                <Badge key={index} variant="outline">
                  {interest}
                </Badge>
              ))}
            </div>
          </Card>

          {/* Travel Patterns */}
          <Card className="p-5">
            <h3 className="mb-4">Your Travel Patterns</h3>
            <div className="space-y-3">
              {recentDestinationTypes.map((dest, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{dest.icon}</span>
                    <p>{dest.type}</p>
                  </div>
                  <Badge variant="secondary">{dest.count} trips</Badge>
                </div>
              ))}
            </div>
          </Card>

          {/* Top Destinations */}
          <Card className="p-5">
            <div className="flex items-center gap-2 mb-4">
              <Plane className="w-5 h-5" style={{ color: 'var(--cathay-jade)' }} />
              <h3>Top Destinations</h3>
            </div>
            <div className="space-y-2">
              {topDestinations.map((destination, index) => (
                <div key={index} className="flex items-center gap-3 py-2">
                  <div 
                    className="w-8 h-8 rounded-full flex items-center justify-center text-sm"
                    style={{ backgroundColor: 'var(--cathay-jade)', color: 'white' }}
                  >
                    {index + 1}
                  </div>
                  <p>{destination}</p>
                </div>
              ))}
            </div>
          </Card>

          {/* Edit Preferences Button */}
          <Button 
            className="w-full"
            style={{ backgroundColor: 'var(--cathay-jade)', color: 'white' }}
            onClick={onComingSoon}
          >
            Edit Preferences
          </Button>
        </div>
      </div>
    </div>
  );
}
