import { useEffect, useRef, useState } from 'react';

interface Airport {
  code: string;
  name: string;
  lat: number;
  lng: number;
}

interface FlightLogbookMapProps {
  homeBase: Airport;
  destinations: Airport[];
  className?: string;
}

export function FlightLogbookMap({ homeBase, destinations, className = '' }: FlightLogbookMapProps) {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<any>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    let mounted = true;

    const initMap = async () => {
      if (!mapContainerRef.current || mapRef.current) {
        return;
      }

      const L = await import('leaflet');
      
      // Add essential Leaflet CSS inline
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
        `;
        document.head.appendChild(style);
      }

      if (!mounted || !mapContainerRef.current) {
        return;
      }

      try {
        // Calculate bounds to fit all airports
        const allAirports = [homeBase, ...destinations];
        const lats = allAirports.map(a => a.lat);
        const lngs = allAirports.map(a => a.lng);
        const centerLat = (Math.max(...lats) + Math.min(...lats)) / 2;
        const centerLng = (Math.max(...lngs) + Math.min(...lngs)) / 2;

        // Initialize map
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

        // Add tile layer
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          maxZoom: 19,
        }).addTo(map);

        // Create custom panes for layering
        const pathPane = map.createPane('pathPane');
        pathPane.style.zIndex = '400';
        
        const markerPane = map.createPane('markerPane');
        markerPane.style.zIndex = '700';
        markerPane.style.pointerEvents = 'auto';

        await new Promise(resolve => setTimeout(resolve, 50));

        if (!mounted) {
          map.remove();
          return;
        }

        // Create home base marker (special styling)
        const homeIcon = L.divIcon({
          className: 'custom-home-marker',
          html: `
            <div style="
              width: 40px;
              height: 40px;
              border-radius: 50%;
              background-color: #006564;
              border: 3px solid white;
              box-shadow: 0 4px 12px rgba(0, 0, 0, 0.4);
              display: flex;
              align-items: center;
              justify-content: center;
              font-size: 18px;
              font-weight: 700;
              color: white;
              cursor: pointer;
              pointer-events: auto;
            ">🏠</div>
          `,
          iconSize: [40, 40],
          iconAnchor: [20, 20],
        });

        const homeMarker = L.marker([homeBase.lat, homeBase.lng], {
          icon: homeIcon,
          pane: 'markerPane',
          interactive: true,
        }).addTo(map);

        homeMarker.bindPopup(`
          <div style="padding: 10px; min-width: 180px;">
            <div style="font-weight: 600; font-size: 15px; color: #006564; margin-bottom: 6px;">
              ${homeBase.code}
            </div>
            <div style="font-size: 12px; color: #666; margin-bottom: 6px;">
              ${homeBase.name}
            </div>
            <div style="font-size: 11px; color: #006564; font-weight: 500;">
              🏠 Home Base
            </div>
          </div>
        `, {
          closeButton: true,
          maxWidth: 280,
        });

        // Create destination markers and routes
        destinations.forEach((dest, index) => {
          // Create destination marker
          const destIcon = L.divIcon({
            className: 'custom-dest-marker',
            html: `
              <div style="
                width: 36px;
                height: 36px;
                border-radius: 50%;
                background-color: #367D79;
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
              ">${index + 1}</div>
            `,
            iconSize: [36, 36],
            iconAnchor: [18, 18],
          });

          const marker = L.marker([dest.lat, dest.lng], {
            icon: destIcon,
            pane: 'markerPane',
            interactive: true,
          }).addTo(map);

          marker.bindPopup(`
            <div style="padding: 10px; min-width: 180px;">
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
                  background-color: #367D79;
                  color: white;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  font-size: 12px;
                  font-weight: 600;
                ">${index + 1}</div>
                <div style="font-weight: 600; font-size: 15px; color: #006564;">
                  ${dest.code}
                </div>
              </div>
              <div style="font-size: 12px; color: #666; margin-bottom: 6px;">
                ${dest.name}
              </div>
              <div style="font-size: 11px; color: #006564; font-weight: 500;">
                ✈️ From ${homeBase.code}
              </div>
            </div>
          `, {
            closeButton: true,
            maxWidth: 280,
          });

          // Draw curved flight path from home base to this destination
          const start = homeBase;
          const end = dest;
          
          // Calculate control point for Bezier curve
          const midLat = (start.lat + end.lat) / 2;
          const midLng = (start.lng + end.lng) / 2;
          
          const offset = 0.2;
          const dx = end.lng - start.lng;
          const dy = end.lat - start.lat;
          const controlLat = midLat - dx * offset;
          const controlLng = midLng + dy * offset;

          // Create curved path using quadratic bezier
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

          // Draw white outline
          L.polyline(curvePoints, {
            color: '#ffffff',
            weight: 8,
            opacity: 0.8,
            lineCap: 'round',
            lineJoin: 'round',
            pane: 'pathPane',
          }).addTo(map);
          
          // Draw main path
          L.polyline(curvePoints, {
            color: '#006564',
            weight: 5,
            opacity: 1,
            dashArray: '10, 5',
            lineCap: 'round',
            lineJoin: 'round',
            pane: 'pathPane',
          }).addTo(map);

          // Add arrow at midpoint
          const t = 0.7;
          const dLat = 2 * (1 - t) * (controlLat - start.lat) + 2 * t * (end.lat - controlLat);
          const dLng = 2 * (1 - t) * (controlLng - start.lng) + 2 * t * (end.lng - controlLng);
          const angle = Math.atan2(dLng, dLat) * (180 / Math.PI);
          
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
            pane: 'pathPane',
          }).addTo(map);
        });

        if (!mounted) {
          map.remove();
          return;
        }

        mapRef.current = map;

        // Fit bounds to show all airports
        setTimeout(() => {
          if (!mounted || !mapRef.current) return;
          
          try {
            const bounds = L.latLngBounds(allAirports.map(a => [a.lat, a.lng]));
            mapRef.current.fitBounds(bounds, { padding: [30, 30], animate: false });
            mapRef.current.invalidateSize();
            setIsLoaded(true);
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
  }, [homeBase, destinations]);

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
