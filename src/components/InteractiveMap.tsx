import { useEffect, useRef, useState } from 'react';
import { MapPin, X } from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';

interface Destination {
  id: string;
  title: string;
  location: string;
  image: string;
  price: string;
  miles: string;
  lat: number;
  lng: number;
}

interface InteractiveMapProps {
  destinations: Destination[];
  onDestinationClick?: (id: string) => void;
}

export function InteractiveMap({ destinations, onDestinationClick }: InteractiveMapProps) {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const [selectedDestination, setSelectedDestination] = useState<Destination | null>(null);
  const [map, setMap] = useState<any>(null);
  const markersRef = useRef<any[]>([]);

  useEffect(() => {
    // Dynamically import Leaflet to avoid SSR issues
    const initMap = async () => {
      const L = await import('leaflet');
      
      // Add Leaflet CSS
      if (!document.getElementById('leaflet-css')) {
        const link = document.createElement('link');
        link.id = 'leaflet-css';
        link.rel = 'stylesheet';
        link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
        document.head.appendChild(link);
      }

      if (mapContainerRef.current && !map) {
        // Initialize map centered on Asia
        const newMap = L.map(mapContainerRef.current, {
          zoomControl: false,
          attributionControl: false,
        }).setView([20, 105], 4);

        // Add tile layer
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          maxZoom: 19,
        }).addTo(newMap);

        setMap(newMap);

        // Create custom icon with numbered markers
        const createCustomIcon = (number: number, isSelected: boolean) => {
          return L.divIcon({
            className: 'custom-map-marker',
            html: `
              <div style="
                width: 40px;
                height: 40px;
                border-radius: 50%;
                background-color: ${isSelected ? '#C1B49A' : '#006564'};
                border: 3px solid white;
                color: white;
                display: flex;
                align-items: center;
                justify-content: center;
                font-weight: 600;
                font-size: 16px;
                box-shadow: 0 4px 12px rgba(0, 0, 0, 0.4);
                cursor: pointer;
                transition: all 0.2s;
                transform: ${isSelected ? 'scale(1.2)' : 'scale(1)'};
              ">
                ${number}
              </div>
            `,
            iconSize: [40, 40],
            iconAnchor: [20, 20],
          });
        };

        // Add markers for each destination
        const newMarkers = destinations.map((dest, index) => {
          const marker = L.marker([dest.lat, dest.lng], {
            icon: createCustomIcon(index + 1, false),
          }).addTo(newMap);

          marker.on('click', () => {
            setSelectedDestination(dest);
            
            // Update all markers
            markersRef.current.forEach((m, i) => {
              m.setIcon(createCustomIcon(i + 1, destinations[i].id === dest.id));
            });

            // Pan to marker
            newMap.panTo([dest.lat, dest.lng]);
          });

          return marker;
        });

        markersRef.current = newMarkers;
      }
    };

    initMap();

    return () => {
      if (map) {
        map.remove();
      }
    };
  }, []);

  return (
    <div className="relative w-full h-full isolate" style={{ zIndex: 1 }}>
      <div ref={mapContainerRef} className="w-full h-full rounded-lg overflow-hidden" style={{ isolation: 'isolate' }} />
      
      {/* Selected Destination Mini Card */}
      {selectedDestination && (
        <div className="absolute bottom-4 left-4 right-4 z-[1000]">
          <Card className="overflow-hidden shadow-xl animate-in slide-in-from-bottom-5">
            <div className="relative">
              <div className="aspect-[16/9] relative">
                <img 
                  src={selectedDestination.image} 
                  alt={selectedDestination.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <button
                  onClick={() => setSelectedDestination(null)}
                  className="absolute top-2 right-2 w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center hover:bg-white transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <p className="text-white mb-1">{selectedDestination.title}</p>
                  <div className="flex items-center gap-1 text-white/90 text-sm">
                    <MapPin className="w-3 h-3" />
                    <span>{selectedDestination.location}</span>
                  </div>
                </div>
              </div>
              <div className="p-3 bg-white flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">From</p>
                  <p>{selectedDestination.price}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-muted-foreground">Or</p>
                  <p className="text-sm">{selectedDestination.miles} miles</p>
                </div>
                <Button 
                  size="sm"
                  style={{ backgroundColor: 'var(--cathay-jade)' }}
                  className="text-white"
                  onClick={() => onDestinationClick?.(selectedDestination.id)}
                >
                  View
                </Button>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
