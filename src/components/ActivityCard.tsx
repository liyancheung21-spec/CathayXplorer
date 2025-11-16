import { GripVertical, Clock, MoreVertical } from "lucide-react";

interface ActivityCardProps {
  id: string;
  time: string;
  icon: string;
  title: string;
  subtitle: string;
  isDragging?: boolean;
  onClick?: () => void;
}

export function ActivityCard({
  time,
  icon,
  title,
  subtitle,
  isDragging = false,
  onClick
}: ActivityCardProps) {
  return (
    <div 
      onClick={onClick}
      className={`flex items-center gap-3 p-3 bg-white rounded-xl border border-border transition-all ${
        isDragging ? 'shadow-lg scale-105' : 'shadow-sm hover:shadow-md'
      } ${onClick ? 'cursor-pointer' : ''}`}
    >
      {/* Drag Handle */}
      <button className="flex-shrink-0 w-8 h-8 flex items-center justify-center text-muted-foreground hover:text-foreground cursor-grab active:cursor-grabbing">
        <GripVertical className="w-5 h-5" />
      </button>

      {/* Activity Icon */}
      <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-mist-gray flex items-center justify-center text-xl">
        {icon}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1 min-w-0">
            <p className="truncate">{title}</p>
            <p className="text-sm text-muted-foreground truncate">{subtitle}</p>
          </div>
        </div>
        <div className="flex items-center gap-1 mt-1 text-xs text-muted-foreground">
          <Clock className="w-3 h-3" />
          <span>{time}</span>
        </div>
      </div>

      {/* More Menu */}
      <button className="flex-shrink-0 w-8 h-8 flex items-center justify-center text-muted-foreground hover:text-foreground">
        <MoreVertical className="w-4 h-4" />
      </button>
    </div>
  );
}
