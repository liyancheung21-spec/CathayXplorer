import { Badge } from "./ui/badge";
import { Heart, MapPin } from "lucide-react";
import { useState } from "react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface DestinationCardProps {
  image: string;
  title: string;
  location: string;
  price: string;
  miles?: string;
  tags?: string[];
  featured?: boolean;
  onClick?: () => void;
}

export function DestinationCard({
  image,
  title,
  location,
  price,
  miles,
  tags = [],
  featured = false,
  onClick
}: DestinationCardProps) {
  const [isFavorited, setIsFavorited] = useState(false);

  return (
    <div 
      className="group relative overflow-hidden rounded-xl cursor-pointer transition-transform hover:scale-[1.02]"
      onClick={onClick}
    >
      {/* Image with gradient overlay */}
      <div className="relative aspect-[4/5] overflow-hidden">
        <ImageWithFallback 
          src={image} 
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div 
          className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"
          style={{
            background: `linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,104,94,0.2) 50%, transparent 100%)`
          }}
        />
        
        {/* Favorite button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            setIsFavorited(!isFavorited);
          }}
          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center hover:bg-white transition-colors"
        >
          <Heart 
            className={`w-4 h-4 transition-colors ${isFavorited ? 'fill-red-500 stroke-red-500' : 'stroke-charcoal'}`}
          />
        </button>

        {/* Featured badge */}
        {featured && (
          <div className="absolute top-3 left-3">
            <Badge style={{backgroundColor: 'var(--cathay-gold)', color: 'var(--charcoal)'}}>
              Cathay's Pick
            </Badge>
          </div>
        )}

        {/* Tags - limit to max 2 tags total (1 if featured badge exists) */}
        {tags.length > 0 && (
          <div className={`absolute left-3 right-14 flex flex-wrap gap-1.5 ${featured ? 'top-[2.75rem]' : 'top-3'}`}>
            {tags.slice(0, featured ? 1 : 2).map((tag) => (
              <Badge 
                key={tag} 
                variant="secondary"
                className="bg-white/90 backdrop-blur-sm text-charcoal text-xs px-2 py-1"
              >
                {tag}
              </Badge>
            ))}
          </div>
        )}

        {/* Content overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
          <div className="flex items-start gap-1.5 mb-2">
            <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.8))' }} />
            <p className="opacity-90 text-sm line-clamp-1" style={{ textShadow: '0 1px 3px rgba(0,0,0,0.8)' }}>{location}</p>
          </div>
          <h3 className="mb-3 text-white line-clamp-2" style={{ textShadow: '0 2px 4px rgba(0,0,0,0.8)' }}>{title}</h3>
          <div className="flex items-baseline justify-between">
            <div>
              <p className="opacity-75 text-xs" style={{ textShadow: '0 1px 2px rgba(0,0,0,0.6)' }}>From</p>
              <p className="text-white text-sm" style={{ textShadow: '0 1px 3px rgba(0,0,0,0.8)' }}>{price}</p>
            </div>
            {miles && (
              <div className="text-right">
                <p className="opacity-75 text-xs" style={{ textShadow: '0 1px 2px rgba(0,0,0,0.6)' }}>Or</p>
                <p className="text-white text-xs" style={{ textShadow: '0 1px 3px rgba(0,0,0,0.8)' }}>{miles} mi</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
