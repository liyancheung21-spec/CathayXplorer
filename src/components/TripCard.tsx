import { MapPin, Calendar, Users, MoreVertical } from "lucide-react";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";

interface TripCardProps {
  id: string;
  coverImage: string;
  tripName: string;
  destination: string;
  dates: string;
  progress?: number;
  status: 'upcoming' | 'draft' | 'completed';
  travelers?: number;
  onClick?: () => void;
}

export function TripCard({
  coverImage,
  tripName,
  destination,
  dates,
  progress = 0,
  status,
  travelers = 1,
  onClick
}: TripCardProps) {
  const statusConfig = {
    upcoming: { label: 'Upcoming', color: 'bg-[#006564] text-white' },
    draft: { label: 'Draft', color: 'bg-gray-400 text-white' },
    completed: { label: 'Completed', color: 'bg-blue-500 text-white' }
  };

  return (
    <div 
      className="rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all cursor-pointer active:scale-[0.98]"
      onClick={onClick}
    >
      {/* Cover Image with Overlay */}
      <div className="relative aspect-[16/9]">
        <img 
          src={coverImage} 
          alt={tripName}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        
        {/* Status Badge */}
        <div className="absolute top-3 left-3">
          <Badge className={statusConfig[status].color}>
            {statusConfig[status].label}
          </Badge>
        </div>

        {/* More Menu */}
        <button className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center hover:bg-white transition-colors">
          <MoreVertical className="w-4 h-4" />
        </button>

        {/* Trip Info Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
          <h3 className="text-white mb-1 line-clamp-1">{tripName}</h3>
          <div className="flex flex-col gap-1 text-white/90 mb-2">
            <div className="flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 flex-shrink-0" />
              <span className="text-sm truncate">{destination}</span>
            </div>
            <div className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 flex-shrink-0" />
              <span className="text-sm">{dates}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Progress Timeline */}
      {status === 'upcoming' && (
        <div className="bg-white p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-muted-foreground">Planning Progress</span>
            <span className="text-sm font-medium">{progress}%</span>
          </div>
          <Progress value={progress} className="h-1.5" />
          <div className="flex items-center gap-2 mt-3 text-sm text-muted-foreground">
            <Users className="w-3.5 h-3.5" />
            <span>{travelers} traveler{travelers > 1 ? 's' : ''}</span>
          </div>
        </div>
      )}
    </div>
  );
}
