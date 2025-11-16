import { useEffect, useRef, useState } from 'react';

interface RouteStop {
  name: string;
  lat: number;
  lng: number;
  description?: string;
  type?: 'attraction' | 'restaurant' | 'hotel' | 'transport' | 'city';
  time?: string;
  day?: number;
}

interface RouteMapProps {
  stops: RouteStop[];
  className?: string;
  onMapReady?: (controls: { centerOnLocation: (lat: number, lng: number, zoom?: number) => void }) => void;
}

export function RouteMap({ stops, className = '', onMapReady }: RouteMapProps) {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<any>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    let mounted = true;

    const initMap = async () => {
      if (!mapContainerRef.current || mapRef.current || stops.length === 0) {
        return;
      }

      const L = await import('leaflet');
      
      // Add essential Leaflet CSS inline to avoid CORS issues
      if (!document.getElementById('leaflet-inline-css')) {
        const style = document.createElement('style');
        style.id = 'leaflet-inline-css';
        style.textContent = `
          .leaflet-pane,
          .leaflet-tile,
          .leaflet-marker-icon,
          .leaflet-marker-shadow,
          .leaflet-tile-container,
          .leaflet-pane > svg,
          .leaflet-pane > canvas,
          .leaflet-zoom-box,
          .leaflet-image-layer,
          .leaflet-layer {
            position: absolute;
            left: 0;
            top: 0;
          }
          .leaflet-container {
            overflow: hidden;
          }
          .leaflet-tile,
          .leaflet-marker-icon,
          .leaflet-marker-shadow {
            -webkit-user-select: none;
            -moz-user-select: none;
            user-select: none;
            -webkit-user-drag: none;
          }
          .leaflet-tile::selection {
            background: transparent;
          }
          .leaflet-marker-icon,
          .leaflet-marker-shadow {
            display: block;
          }
          .leaflet-container .leaflet-overlay-pane svg,
          .leaflet-container .leaflet-marker-pane img,
          .leaflet-container .leaflet-shadow-pane img,
          .leaflet-container .leaflet-tile-pane img,
          .leaflet-container img.leaflet-image-layer,
          .leaflet-container .leaflet-tile {
            max-width: none !important;
            max-height: none !important;
          }
          .leaflet-container {
            background: #ddd;
            outline: 0;
          }
          .leaflet-container a {
            color: #0078A8;
          }
          .leaflet-zoom-box {
            border: 2px dotted #38f;
            background: rgba(255,255,255,0.5);
          }
          .leaflet-bar {
            box-shadow: 0 1px 5px rgba(0,0,0,0.65);
            border-radius: 4px;
          }
          .leaflet-bar a,
          .leaflet-bar a:hover {
            background-color: #fff;
            border-bottom: 1px solid #ccc;
            width: 26px;
            height: 26px;
            line-height: 26px;
            display: block;
            text-align: center;
            text-decoration: none;
            color: black;
          }
          .leaflet-control-zoom-in,
          .leaflet-control-zoom-out {
            font: bold 18px 'Lucida Console', Monaco, monospace;
            text-indent: 1px;
          }
          .leaflet-popup {
            position: absolute;
            text-align: center;
            margin-bottom: 20px;
          }
          .leaflet-popup-content-wrapper {
            padding: 1px;
            text-align: left;
            border-radius: 12px;
            background: white;
            box-shadow: 0 3px 14px rgba(0,0,0,0.4);
          }
          .leaflet-popup-content {
            margin: 13px 19px;
            line-height: 1.4;
            font-size: 13px;
            min-height: 1px;
          }
          .leaflet-popup-tip-container {
            width: 40px;
            height: 20px;
            position: absolute;
            left: 50%;
            margin-left: -20px;
            overflow: hidden;
            pointer-events: none;
          }
          .leaflet-popup-tip {
            width: 17px;
            height: 17px;
            padding: 1px;
            margin: -10px auto 0;
            transform: rotate(45deg);
            background: white;
            box-shadow: 0 3px 14px rgba(0,0,0,0.4);
          }
          .leaflet-popup-close-button {
            position: absolute;
            top: 0;
            right: 0;
            padding: 4px 4px 0 0;
            border: none;
            text-align: center;
            width: 18px;
            height: 14px;
            font: 16px/14px Tahoma, Verdana, sans-serif;
            color: #c3c3c3;
            text-decoration: none;
            background: transparent;
          }
          .leaflet-popup-close-button:hover {
            color: #999;
          }
          .custom-route-marker {
            cursor: pointer;
          }
          .custom-route-marker:hover .marker-icon {
            animation: markerPulse 0.4s ease-in-out;
          }
          @keyframes markerPulse {
            0% {
              transform: scale(1);
            }
            50% {
              transform: scale(1.3);
            }
            100% {
              transform: scale(1);
            }
          }
        `;
        document.head.appendChild(style);
      }

      if (!mounted || !mapContainerRef.current) {
        return;
      }

      try {
        // Calculate bounds to fit all stops
        const lats = stops.map(s => s.lat);
        const lngs = stops.map(s => s.lng);
        const centerLat = (Math.max(...lats) + Math.min(...lats)) / 2;
        const centerLng = (Math.max(...lngs) + Math.min(...lngs)) / 2;

        // Initialize map with interactive controls enabled
        const map = L.map(mapContainerRef.current, {
          zoomControl: true,
          attributionControl: false,
          dragging: true,
          scrollWheelZoom: true,
          doubleClickZoom: true,
          touchZoom: true,
        }).setView([centerLat, centerLng], 3);

        if (!mounted) {
          map.remove();
          return;
        }

        // Create custom pane for markers with highest z-index
        const markerPane = map.createPane('markerPane');
        markerPane.style.zIndex = '700'; // Above everything
        markerPane.style.pointerEvents = 'auto'; // Ensure clicks work
        
        // Create custom pane for arrows - below markers but above paths
        const arrowPane = map.createPane('arrowPane');
        arrowPane.style.zIndex = '450'; // Below markers (700) and above paths (400)
        arrowPane.style.pointerEvents = 'none'; // Allow clicks to pass through to markers
        
        // Add tile layer
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          maxZoom: 19,
        }).addTo(map);

        // Wait for the map to be ready
        await new Promise(resolve => setTimeout(resolve, 50));

        if (!mounted) {
          map.remove();
          return;
        }

        // Create custom icon for markers with numbered circles
        const createMarkerIcon = (stop: RouteStop, index: number) => {
          const isStart = index === 0;
          const isEnd = index === stops.length - 1;
          
          // Determine color based on position
          let color = '#006564'; // Default Cathay Jade
          
          if (isStart) {
            color = '#006564'; // Cathay Jade for start
          } else if (isEnd) {
            color = '#C1B49A'; // Sand for end
          } else {
            color = '#367D79'; // Medium Jade for middle stops
          }
          
          // Display number starting from 1
          const displayNumber = index + 1;
          
          return L.divIcon({
            className: 'custom-route-marker',
            html: `
              <div class="marker-icon" style="
                width: 36px;
                height: 36px;
                border-radius: 50%;
                background-color: ${color};
                border: 3px solid white;
                box-shadow: 0 3px 10px rgba(0, 0, 0, 0.4);
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 16px;
                font-weight: 600;
                color: white;
                cursor: pointer;
                pointer-events: auto;
                position: relative;
                z-index: 1000;
              ">${displayNumber}</div>
            `,
            iconSize: [36, 36],
            iconAnchor: [18, 18],
          });
        };

        // Add interactive markers for each stop
        stops.forEach((stop, index) => {
          const isStart = index === 0;
          const isEnd = index === stops.length - 1;
          
          const marker = L.marker([stop.lat, stop.lng], {
            icon: createMarkerIcon(stop, index),
            pane: 'markerPane', // Use custom high z-index pane
            interactive: true, // Ensure marker is clickable
          }).addTo(map);

          // Create enhanced popup content with more details
          const label = isStart ? 'Start' : isEnd ? 'End' : `Stop ${index + 1}`;
          const typeLabel = stop.type ? stop.type.charAt(0).toUpperCase() + stop.type.slice(1) : 'Location';
          
          const popupContent = `
            <div style="padding: 10px; min-width: 180px; max-width: 250px;">
              <div style="
                display: flex;
                align-items: center;
                gap: 8px;
                margin-bottom: 6px;
              ">
                <div style="
                  width: 24px;
                  height: 24px;
                  border-radius: 50%;
                  background-color: ${isStart ? '#006564' : isEnd ? '#C1B49A' : '#367D79'};
                  color: white;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  font-size: 12px;
                  font-weight: 600;
                  flex-shrink: 0;
                ">${index + 1}</div>
                <div style="
                  font-weight: 600;
                  font-size: 15px;
                  color: #006564;
                  line-height: 1.3;
                ">${stop.name}</div>
              </div>
              ${stop.description ? `
                <div style="
                  font-size: 12px;
                  color: #666;
                  margin-bottom: 6px;
                  line-height: 1.4;
                ">${stop.description}</div>
              ` : ''}
              <div style="
                display: flex;
                gap: 6px;
                flex-wrap: wrap;
                margin-bottom: 8px;
              ">
                <span style="
                  font-size: 11px;
                  color: #666;
                  padding: 3px 8px;
                  background: #f0f0f0;
                  border-radius: 6px;
                ">${typeLabel}</span>
                ${stop.day ? `
                  <span style="
                    font-size: 11px;
                    color: #666;
                    padding: 3px 8px;
                    background: #f0f0f0;
                    border-radius: 6px;
                  ">Day ${stop.day}</span>
                ` : ''}
                ${stop.time ? `
                  <span style="
                    font-size: 11px;
                    color: #666;
                    padding: 3px 8px;
                    background: #f0f0f0;
                    border-radius: 6px;
                  ">${stop.time}</span>
                ` : ''}
              </div>
              <div style="
                font-size: 11px;
                color: #006564;
                font-weight: 500;
              ">📍 ${label} - Click to center</div>
            </div>
          `;

          // Bind popup to marker (will show on click by default)
          marker.bindPopup(popupContent, {
            closeButton: true,
            maxWidth: 280,
            className: 'custom-popup',
            autoPan: true, // Auto pan to show popup
            autoPanPadding: [50, 50], // Padding from edges
          });

          // Add click handler to pan to location (center without zoom)
          marker.on('click', function() {
            // Pan to center the marker without changing zoom level
            map.panTo([stop.lat, stop.lng], {
              animate: true,
              duration: 0.8,
            });
            // Popup will automatically show on click due to bindPopup
          });
        });

        // Create a custom pane for paths to control z-index
        const pathPane = map.createPane('pathPane');
        pathPane.style.zIndex = '400'; // Below markers (600) and arrows (450)

        // Draw curved flight paths between consecutive stops
        if (stops.length > 1) {
          for (let i = 0; i < stops.length - 1; i++) {
            const start = stops[i];
            const end = stops[i + 1];
            
            // Calculate control point for Bezier curve (creates arc effect)
            const midLat = (start.lat + end.lat) / 2;
            const midLng = (start.lng + end.lng) / 2;
            
            // Offset control point perpendicular to the path
            const offset = 0.2; // Adjust for more/less curve
            const dx = end.lng - start.lng;
            const dy = end.lat - start.lat;
            const controlLat = midLat - dx * offset;
            const controlLng = midLng + dy * offset;

            // Create curved path using quadratic bezier approximation
            const curvePoints: [number, number][] = [];
            const segments = 50;
            
            for (let t = 0; t <= segments; t++) {
              const ratio = t / segments;
              const lat = 
                Math.pow(1 - ratio, 2) * start.lat +
                2 * (1 - ratio) * ratio * controlLat +
                Math.pow(ratio, 2) * end.lat;
              const lng = 
                Math.pow(1 - ratio, 2) * start.lng +
                2 * (1 - ratio) * ratio * controlLng +
                Math.pow(ratio, 2) * end.lng;
              curvePoints.push([lat, lng]);
            }

            // First draw a white outline for contrast (must be drawn first)
            const outlinePath = L.polyline(curvePoints, {
              color: '#ffffff',
              weight: 8,
              opacity: 0.8,
              lineCap: 'round',
              lineJoin: 'round',
              pane: 'pathPane',
            });
            outlinePath.addTo(map);
            
            // Then draw the main route path on top with high visibility
            const mainPath = L.polyline(curvePoints, {
              color: '#006564',
              weight: 5,
              opacity: 1,
              dashArray: '10, 5',
              lineCap: 'round',
              lineJoin: 'round',
              pane: 'pathPane',
            });
            mainPath.addTo(map);
            
            console.log(`Path ${i + 1} created:`, {
              start: start.name,
              end: end.name,
              points: curvePoints.length
            });

            // Add multiple arrow decorations along the path for better direction indication
            const arrowPositions = [0.33, 0.66, 0.9]; // Three arrows along the path
            
            arrowPositions.forEach(position => {
              // Calculate the tangent direction at this position using Bezier derivative
              // For quadratic Bezier: B'(t) = 2(1-t)(P1-P0) + 2t(P2-P1)
              const t = position;
              
              // Derivative of the Bezier curve at parameter t
              const dLat = 2 * (1 - t) * (controlLat - start.lat) + 2 * t * (end.lat - controlLat);
              const dLng = 2 * (1 - t) * (controlLng - start.lng) + 2 * t * (end.lng - controlLng);
              
              // Calculate angle from the derivative (tangent to the curve)
              // CSS arrow points up (north) at 0°, so we use atan2(dLng, dLat)
              const angle = Math.atan2(dLng, dLat) * (180 / Math.PI);
              
              // Calculate position on the curve at parameter t
              const lat = Math.pow(1 - t, 2) * start.lat + 2 * (1 - t) * t * controlLat + Math.pow(t, 2) * end.lat;
              const lng = Math.pow(1 - t, 2) * start.lng + 2 * (1 - t) * t * controlLng + Math.pow(t, 2) * end.lng;
              
              L.marker([lat, lng], {
                icon: L.divIcon({
                  className: 'flight-arrow',
                  html: `
                    <div style="
                      width: 0;
                      height: 0;
                      border-left: 9px solid transparent;
                      border-right: 9px solid transparent;
                      border-bottom: 18px solid #006564;
                      transform: rotate(${angle}deg);
                      opacity: 1;
                      filter: drop-shadow(0 2px 3px rgba(0,0,0,0.4));
                    "></div>
                  `,
                  iconSize: [18, 18],
                  iconAnchor: [9, 9],
                }),
                pane: 'arrowPane', // Use custom pane with higher z-index
              }).addTo(map);
            });
          }
        }

        if (!mounted) {
          map.remove();
          return;
        }

        mapRef.current = map;

        // Wait a bit before fitting bounds to ensure all layers are ready
        setTimeout(() => {
          if (!mounted || !mapRef.current) return;
          
          try {
            // Fit bounds to show all stops
            if (stops.length > 1) {
              const bounds = L.latLngBounds(stops.map(s => [s.lat, s.lng]));
              mapRef.current.fitBounds(bounds, { padding: [30, 30], animate: false });
            }
            
            // Force resize to ensure proper rendering
            mapRef.current.invalidateSize();
            setIsLoaded(true);
            
            // Expose map controls to parent
            if (onMapReady) {
              onMapReady({
                centerOnLocation: (lat: number, lng: number, zoom: number = 15) => {
                  if (mapRef.current) {
                    mapRef.current.setView([lat, lng], zoom, {
                      animate: true,
                      duration: 0.8
                    });
                  }
                }
              });
            }
          } catch (error) {
            console.error('Error fitting bounds:', error);
            setIsLoaded(true);
          }
        }, 200);
      } catch (error) {
        console.error('Error initializing map:', error);
        setIsLoaded(true);
      }
    };

    initMap();

    return () => {
      mounted = false;
      if (mapRef.current) {
        try {
          mapRef.current.remove();
        } catch (error) {
          console.error('Error removing map:', error);
        }
        mapRef.current = null;
      }
      setIsLoaded(false);
    };
  }, [stops]);

  return (
    <div className={`relative w-full h-full isolate ${className}`} style={{ zIndex: 1 }}>
      <div 
        ref={mapContainerRef} 
        className="w-full h-full rounded-lg overflow-hidden"
        style={{ minHeight: '200px', isolation: 'isolate' }}
      />
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-blue-50 to-green-50 rounded-lg">
          <div className="text-center">
            <div className="w-8 h-8 border-4 border-[#006564] border-t-transparent rounded-full animate-spin mx-auto"></div>
          </div>
        </div>
      )}
    </div>
  );
}
