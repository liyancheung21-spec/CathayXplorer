import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Card } from "../ui/card";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import { ArrowLeft, MapPin, Ticket, Clock, Users } from "lucide-react";

interface ExperiencesScreenProps {
  onBack: () => void;
}

export function ExperiencesScreen({ onBack }: ExperiencesScreenProps) {
  const experiences = [
    {
      id: 1,
      name: 'JR Pass - 7 Days',
      destination: 'Japan',
      price: 'HKD 2,100',
      duration: '7 Days',
      image: 'https://images.unsplash.com/photo-1542051841857-5f90071e7989?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxqYXBhbiUyMHRyYWlufGVufDF8fHx8MTc2MTE1NjUyM3ww&ixlib=rb-4.1.0&q=80&w=1080',
      category: 'Transport Pass',
      rating: 4.9
    },
    {
      id: 2,
      name: 'TeamLab Borderless',
      destination: 'Tokyo, Japan',
      price: 'HKD 280',
      duration: '2-3 hours',
      image: 'https://images.unsplash.com/photo-1565035010268-a3816f98589a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0b2t5byUyMGFydCUyMGV4aGliaXRpb258ZW58MXx8fHwxNzYxMTU2NTIzfDA&ixlib=rb-4.1.0&q=80&w=1080',
      category: 'Art & Culture',
      rating: 4.8
    },
    {
      id: 3,
      name: 'Universal Studios Singapore',
      destination: 'Sentosa, Singapore',
      price: 'HKD 580',
      duration: 'Full Day',
      image: 'https://images.unsplash.com/photo-1624138784614-87fd1b6528f8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0aGVtZSUyMHBhcmt8ZW58MXx8fHwxNzYxMTU2NTIzfDA&ixlib=rb-4.1.0&q=80&w=1080',
      category: 'Theme Park',
      rating: 4.7
    },
    {
      id: 4,
      name: 'Louvre Museum Skip-the-Line',
      destination: 'Paris, France',
      price: 'HKD 180',
      duration: '3-4 hours',
      image: 'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsb3V2cmUlMjBtdXNldW18ZW58MXx8fHwxNzYxMTU2NTIzfDA&ixlib=rb-4.1.0&q=80&w=1080',
      category: 'Museum',
      rating: 4.9
    },
    {
      id: 5,
      name: 'Bangkok Cooking Class',
      destination: 'Bangkok, Thailand',
      price: 'HKD 420',
      duration: '4 hours',
      image: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0aGFpJTIwY29va2luZ3xlbnwxfHx8fDE3NjExNTY1MjN8MA&ixlib=rb-4.1.0&q=80&w=1080',
      category: 'Food & Dining',
      rating: 4.8
    },
    {
      id: 6,
      name: 'Dubai Desert Safari',
      destination: 'Dubai, UAE',
      price: 'HKD 680',
      duration: '6 hours',
      image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkdWJhaSUyMGRlc2VydHxlbnwxfHx8fDE3NjExNTY1MjN8MA&ixlib=rb-4.1.0&q=80&w=1080',
      category: 'Adventure',
      rating: 4.9
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
              <MapPin className="w-6 h-6" />
              <h1 className="text-white">Experiences</h1>
            </div>
          </div>
          <p className="text-white/90 ml-12">
            Discover unique activities and attractions worldwide
          </p>
        </div>
      </div>

      {/* Category Filter */}
      <div className="px-4 pt-4 max-w-md mx-auto">
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          <Badge variant="default" className="bg-[#006564] text-white whitespace-nowrap">All</Badge>
          <Badge variant="outline" className="whitespace-nowrap">Transport Passes</Badge>
          <Badge variant="outline" className="whitespace-nowrap">Museums</Badge>
          <Badge variant="outline" className="whitespace-nowrap">Theme Parks</Badge>
          <Badge variant="outline" className="whitespace-nowrap">Food Tours</Badge>
        </div>
      </div>

      {/* Experience Listings */}
      <div className="px-4 pt-6 max-w-md mx-auto">
        <div className="flex items-center justify-between mb-4">
          <h2>Popular Experiences</h2>
          <Badge variant="secondary" className="bg-[#006564]/10 text-[#006564]">
            Bestsellers
          </Badge>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {experiences.map((exp) => (
            <Card key={exp.id} className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
              <div className="flex">
                <div className="w-32 h-32 flex-shrink-0">
                  <ImageWithFallback 
                    src={exp.image}
                    alt={exp.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 p-4">
                  <Badge variant="secondary" className="mb-2 text-xs">
                    {exp.category}
                  </Badge>
                  <h3 className="mb-1 text-sm line-clamp-1">{exp.name}</h3>
                  <div className="flex items-center gap-1 text-muted-foreground mb-2">
                    <MapPin className="w-3 h-3" />
                    <p className="text-xs line-clamp-1">{exp.destination}</p>
                  </div>
                  <div className="flex items-center gap-1 text-muted-foreground mb-3">
                    <Clock className="w-3 h-3" />
                    <p className="text-xs">{exp.duration}</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-[#006564]">{exp.price}</p>
                    <Button size="sm" variant="outline" className="text-[#006564] border-[#006564] text-xs h-7">
                      Book
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
