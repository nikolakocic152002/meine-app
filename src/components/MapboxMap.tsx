import { useEffect, useRef, useState, useCallback } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { Navigation, Locate, Minus, Plus, Layers } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Business } from "./BusinessCard";
import { cn } from "@/lib/utils";

interface MapboxMapProps {
  businesses: Business[];
  onBusinessClick?: (business: Business) => void;
  accessToken: string;
  className?: string;
}

// Petrovac na Mlavi coordinates
const DEFAULT_CENTER: [number, number] = [21.4181, 44.3772];
const DEFAULT_ZOOM = 14;

const MapboxMap = ({ 
  businesses, 
  onBusinessClick, 
  accessToken,
  className 
}: MapboxMapProps) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const markersRef = useRef<mapboxgl.Marker[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [mapStyle, setMapStyle] = useState<"light" | "dark">("light");

  // Business coordinates for Petrovac na Mlavi
  const businessCoordinates: Record<string, [number, number]> = {
    "1": [21.4175, 44.3780],  // Restoran Mlava - Srpskih Vladara
    "2": [21.4190, 44.3768],  // Kafana Stari Most - Trg Oslobođenja
    "3": [21.4168, 44.3775],  // Caffe Bar Central - Vojvode Mišića
    "4": [21.4185, 44.3782],  // Pekara Zlatni Klas - Kneza Miloša
    "5": [21.4195, 44.3765],  // Pizzeria Napoli - Cara Dušana
    "6": [21.4210, 44.3750],  // Gym Fitness Centar - Sportska
    "7": [21.4172, 44.3778],  // Apoteka Zdravlje - Vuka Karadžića
    "8": [21.4220, 44.3760],  // Market Maxi - Beogradska
    "9": [21.4180, 44.3770],  // Frizerski Salon Stil - Moravska
    "10": [21.4250, 44.3740], // Auto Servis Petrović - Industrijska zona
  };

  // Create custom marker element
  const createMarkerElement = useCallback((business: Business) => {
    const el = document.createElement("div");
    el.className = "marker-container";
    
    // Category icons
    const categoryIcons: Record<string, string> = {
      "Restoran": "🍽️",
      "Kafana": "🍺",
      "Kafić": "☕",
      "Pekara": "🥐",
      "Fitnes": "💪",
      "Apoteka": "💊",
      "Prodavnica": "🛒",
      "Usluge": "✂️",
    };

    const isOpen = business.isOpen;
    const hasDeals = business.hasDeals;
    
    el.innerHTML = `
      <div class="relative cursor-pointer transform transition-transform hover:scale-110">
        ${hasDeals ? '<div class="absolute -top-1 -right-1 w-3 h-3 bg-orange-500 rounded-full border-2 border-white z-10 animate-pulse"></div>' : ''}
        <div class="w-10 h-10 rounded-full flex items-center justify-center text-lg shadow-lg ${
          isOpen 
            ? 'bg-gradient-to-br from-orange-400 to-orange-600' 
            : 'bg-gray-400'
        }">
          ${categoryIcons[business.category] || "📍"}
        </div>
        ${isOpen ? '<div class="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-green-500 rounded-full border border-white"></div>' : ''}
      </div>
    `;

    el.addEventListener("click", () => {
      onBusinessClick?.(business);
    });

    return el;
  }, [onBusinessClick]);

  // Initialize map
  useEffect(() => {
    if (!mapContainer.current || !accessToken) return;

    mapboxgl.accessToken = accessToken;

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: mapStyle === "light" 
        ? "mapbox://styles/mapbox/light-v11"
        : "mapbox://styles/mapbox/dark-v11",
      center: DEFAULT_CENTER,
      zoom: DEFAULT_ZOOM,
      pitch: 45,
      bearing: -17.6,
    });

    // Add navigation controls
    map.current.addControl(
      new mapboxgl.NavigationControl({ visualizePitch: true }),
      "top-right"
    );

    map.current.on("load", () => {
      setIsLoaded(true);

      // Add 3D buildings layer
      if (map.current) {
        const layers = map.current.getStyle().layers;
        const labelLayerId = layers?.find(
          (layer) => layer.type === "symbol" && layer.layout?.["text-field"]
        )?.id;

        map.current.addLayer(
          {
            id: "3d-buildings",
            source: "composite",
            "source-layer": "building",
            filter: ["==", "extrude", "true"],
            type: "fill-extrusion",
            minzoom: 15,
            paint: {
              "fill-extrusion-color": mapStyle === "light" ? "#ddd" : "#333",
              "fill-extrusion-height": ["get", "height"],
              "fill-extrusion-base": ["get", "min_height"],
              "fill-extrusion-opacity": 0.6,
            },
          },
          labelLayerId
        );
      }
    });

    return () => {
      markersRef.current.forEach((marker) => marker.remove());
      markersRef.current = [];
      map.current?.remove();
    };
  }, [accessToken, mapStyle]);

  // Add markers when map is loaded
  useEffect(() => {
    if (!map.current || !isLoaded) return;

    // Remove existing markers
    markersRef.current.forEach((marker) => marker.remove());
    markersRef.current = [];

    // Add new markers
    businesses.forEach((business) => {
      const coords = businessCoordinates[business.id];
      if (!coords) return;

      const markerEl = createMarkerElement(business);
      
      const popup = new mapboxgl.Popup({ 
        offset: 25,
        closeButton: false,
        className: "business-popup"
      }).setHTML(`
        <div class="p-2 min-w-[180px]">
          <div class="font-semibold text-sm">${business.name}</div>
          <div class="text-xs text-gray-500 mt-1">${business.category} • ${business.distance}</div>
          <div class="flex items-center gap-1 mt-1">
            <span class="text-yellow-500">★</span>
            <span class="text-xs font-medium">${business.rating}</span>
            <span class="text-xs text-gray-400">(${business.reviewCount})</span>
          </div>
          ${business.isOpen 
            ? `<div class="text-xs text-green-600 mt-1">Otvoreno do ${business.openUntil}</div>`
            : '<div class="text-xs text-gray-400 mt-1">Zatvoreno</div>'
          }
        </div>
      `);

      const marker = new mapboxgl.Marker({ element: markerEl })
        .setLngLat(coords)
        .setPopup(popup)
        .addTo(map.current!);

      markersRef.current.push(marker);
    });

    // Fit bounds to show all markers
    if (businesses.length > 0) {
      const bounds = new mapboxgl.LngLatBounds();
      businesses.forEach((business) => {
        const coords = businessCoordinates[business.id];
        if (coords) bounds.extend(coords);
      });
      
      map.current.fitBounds(bounds, {
        padding: 60,
        maxZoom: 15,
      });
    }
  }, [businesses, isLoaded, createMarkerElement]);

  // Locate user
  const handleLocateMe = () => {
    if (!map.current) return;
    
    navigator.geolocation.getCurrentPosition(
      (position) => {
        map.current?.flyTo({
          center: [position.coords.longitude, position.coords.latitude],
          zoom: 15,
          duration: 2000,
        });
      },
      () => {
        // Default to Petrovac na Mlavi if geolocation fails
        map.current?.flyTo({
          center: DEFAULT_CENTER,
          zoom: DEFAULT_ZOOM,
          duration: 2000,
        });
      }
    );
  };

  // Zoom controls
  const handleZoomIn = () => map.current?.zoomIn();
  const handleZoomOut = () => map.current?.zoomOut();

  // Toggle map style
  const toggleMapStyle = () => {
    const newStyle = mapStyle === "light" ? "dark" : "light";
    setMapStyle(newStyle);
    
    if (map.current) {
      map.current.setStyle(
        newStyle === "light"
          ? "mapbox://styles/mapbox/light-v11"
          : "mapbox://styles/mapbox/dark-v11"
      );
    }
  };

  // Reset view
  const handleResetView = () => {
    map.current?.flyTo({
      center: DEFAULT_CENTER,
      zoom: DEFAULT_ZOOM,
      pitch: 45,
      bearing: -17.6,
      duration: 2000,
    });
  };

  if (!accessToken) {
    return (
      <div className={cn(
        "flex items-center justify-center bg-secondary/50 text-muted-foreground text-sm",
        className
      )}>
        Potreban je Mapbox token
      </div>
    );
  }

  return (
    <div className={cn("relative w-full h-full", className)}>
      <div ref={mapContainer} className="absolute inset-0 rounded-2xl overflow-hidden" />
      
      {/* Custom controls */}
      <div className="absolute bottom-4 right-4 flex flex-col gap-2 z-10">
        <Button
          variant="glass"
          size="icon-sm"
          onClick={toggleMapStyle}
          title="Promeni stil mape"
        >
          <Layers className="h-4 w-4" />
        </Button>
        <Button
          variant="glass"
          size="icon-sm"
          onClick={handleZoomIn}
          title="Uvećaj"
        >
          <Plus className="h-4 w-4" />
        </Button>
        <Button
          variant="glass"
          size="icon-sm"
          onClick={handleZoomOut}
          title="Umanji"
        >
          <Minus className="h-4 w-4" />
        </Button>
        <Button
          variant="glass"
          size="icon-sm"
          onClick={handleLocateMe}
          title="Moja lokacija"
        >
          <Locate className="h-4 w-4" />
        </Button>
        <Button
          variant="glass"
          size="icon-sm"
          onClick={handleResetView}
          title="Resetuj prikaz"
        >
          <Navigation className="h-4 w-4" />
        </Button>
      </div>

      {/* Loading overlay */}
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-background/50 backdrop-blur-sm rounded-2xl">
          <div className="flex items-center gap-2 text-muted-foreground">
            <div className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin" />
            <span className="text-sm">Mapa se učitava...</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default MapboxMap;
