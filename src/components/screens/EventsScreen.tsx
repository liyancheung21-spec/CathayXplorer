import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Card } from "../ui/card";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import { ArrowLeft, Sparkles, Calendar, MapPin, Clock } from "lucide-react";

interface EventsScreenProps {
  onBack: () => void;
}

export function EventsScreen({ onBack }: EventsScreenProps) {
  const events = [
    {
      id: 1,
      name: 'Summer Sonic Tokyo 2025',
      location: 'Tokyo, Japan',
      date: 'Aug 15-16, 2025',
      time: '10:00 AM',
      price: 'HKD 1,800',
      image: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtdXNpYyUyMGZlc3RpdmFsfGVufDF8fHx8MTc2MTE1NjUyM3ww&ixlib=rb-4.1.0&q=80&w=1080',
      category: 'Concert',
      featured: true
    },
    {
      id: 2,
      name: 'Formula 1 Singapore Grand Prix',
      location: 'Marina Bay, Singapore',
      date: 'Sep 20-22, 2025',
      time: 'Race Day',
      price: 'HKD 2,500',
      image: 'https://images.unsplash.com/photo-1707232832095-8bc35d2cc85f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmb3JtdWxhJTIwb25lfGVufDF8fHx8MTc2MTE1NjUyM3ww&ixlib=rb-4.1.0&q=80&w=1080',
      category: 'Sports',
      featured: true
    },
    {
      id: 3,
      name: 'Wimbledon Championships',
      location: 'London, UK',
      date: 'Jul 1-14, 2025',
      time: 'Various',
      price: 'HKD 3,200',
      image: 'https://images.unsplash.com/photo-1554068865-24cecd4e34b8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZW5uaXMlMjB0b3VybmFtZW50fGVufDF8fHx8MTc2MTE1NjUyM3ww&ixlib=rb-4.1.0&q=80&w=1080',
      category: 'Sports',
      featured: false
    },
    {
      id: 4,
      name: 'Oktoberfest Munich',
      location: 'Munich, Germany',
      date: 'Sep 21 - Oct 6, 2025',
      time: 'All Day',
      price: 'HKD 850',
      image: 'https://images.unsplash.com/photo-1600359756098-33d803de6863?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxva3RvYmVyZmVzdHxlbnwxfHx8fDE3NjExNTY1MjN8MA&ixlib=rb-4.1.0&q=80&w=1080',
      category: 'Festival',
      featured: false
    },
    {
      id: 5,
      name: 'Rio Carnival 2025',
      location: 'Rio de Janeiro, Brazil',
      date: 'Feb 28 - Mar 5, 2025',
      time: 'All Day',
      price: 'HKD 1,200',
      image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyaW8lMjBjYXJuaXZhbHxlbnwxfHx8fDE3NjExNTY1MjN8MA&ixlib=rb-4.1.0&q=80&w=1080',
      category: 'Festival',
      featured: true
    },
    {
      id: 6,
      name: 'Coachella Valley Music Festival',
      location: 'California, USA',
      date: 'Apr 11-20, 2025',
      time: 'Weekend Pass',
      price: 'HKD 3,800',
      image: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvdXRkb29yJTIwZmVzdGl2YWx8ZW58MXx8fHwxNzYxMTU2NTIzfDA&ixlib=rb-4.1.0&q=80&w=1080',
      category: 'Concert',
      featured: false
    }
  ];

  return (
    <div className="min-h-screen bg-mist-gray pb-24">
      {/* Top spacing for fixed status bar */}
      <div className="h-[52px]" />
      
      {/* Header */}
      <div className="bg-gradient-to-r from-[#006564] to-[#367D79] px-4 pt-4 pb-6 text-white">
        <div className="max-w-md mx-auto">
          <div className="flex items-center gap-3 mb-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={onBack}
              className="text-white hover:bg-white/10"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div className="flex items-center gap-2">
              <Sparkles className="w-6 h-6" />
              <h1 className="text-white">Events</h1>
            </div>
          </div>
          <p className="text-white/90 ml-12">
            Exclusive tickets to concerts, sports & festivals
          </p>
        </div>
      </div>

      {/* Category Filter */}
      <div className="px-4 pt-4 max-w-md mx-auto">
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          <Badge variant="default" className="bg-[#006564] text-white whitespace-nowrap">All Events</Badge>
          <Badge variant="outline" className="whitespace-nowrap">Concerts</Badge>
          <Badge variant="outline" className="whitespace-nowrap">Sports</Badge>
          <Badge variant="outline" className="whitespace-nowrap">Festivals</Badge>
          <Badge variant="outline" className="whitespace-nowrap">Theater</Badge>
        </div>
      </div>

      {/* Event Listings */}
      <div className="px-4 pt-6 max-w-md mx-auto">
        <div className="flex items-center justify-between mb-4">
          <h2>Upcoming Events</h2>
          <Badge variant="secondary" className="bg-[#006564]/10 text-[#006564]">
            Limited Tickets
          </Badge>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {events.map((event) => (
            <Card key={event.id} className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
              <div className="h-48 relative">
                <ImageWithFallback 
                  src={event.image}
                  alt={event.name}
                  className="w-full h-full object-cover"
                />
                {event.featured && (
                  <Badge className="absolute top-3 right-3 bg-[#006564] text-white border-0">
                    Featured
                  </Badge>
                )}
                <Badge variant="secondary" className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm">
                  {event.category}
                </Badge>
              </div>
              <div className="p-4">
                <h3 className="mb-2 line-clamp-1">{event.name}</h3>
                
                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <MapPin className="w-4 h-4" />
                    <p className="text-sm">{event.location}</p>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Calendar className="w-4 h-4" />
                    <p className="text-sm">{event.date}</p>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Clock className="w-4 h-4" />
                    <p className="text-sm">{event.time}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[#006564]">From {event.price}</p>
                    <p className="text-xs text-muted-foreground">per ticket</p>
                  </div>
                  <Button size="sm" className="bg-[#006564] hover:bg-[#367D79] text-white">
                    Get Tickets
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
