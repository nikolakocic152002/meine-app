import { MapPin, Navigation } from "lucide-react";
import { Button } from "@/components/ui/button";

interface MapPlaceholderProps {
  onLocateMe?: () => void;
}

const MapPlaceholder = ({ onLocateMe }: MapPlaceholderProps) => {
  // Generate random marker positions
  const markers = [
    { top: "25%", left: "30%", size: "lg", pulse: true },
    { top: "40%", left: "60%", size: "md", pulse: false },
    { top: "55%", left: "25%", size: "md", pulse: false },
    { top: "35%", left: "75%", size: "sm", pulse: false },
    { top: "65%", left: "55%", size: "lg", pulse: true },
    { top: "20%", left: "50%", size: "sm", pulse: false },
    { top: "70%", left: "35%", size: "md", pulse: false },
  ];

  return (
    <div className="relative w-full h-full bg-gradient-to-br from-secondary via-background to-secondary/50 overflow-hidden">
      {/* Grid pattern overlay */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(hsl(var(--foreground)) 1px, transparent 1px),
            linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)
          `,
          backgroundSize: "50px 50px"
        }}
      />

      {/* Gradient orbs for depth */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-accent/10 rounded-full blur-3xl" />

      {/* Map markers */}
      {markers.map((marker, index) => (
        <div
          key={index}
          className="absolute transform -translate-x-1/2 -translate-y-1/2 animate-fade-in"
          style={{ 
            top: marker.top, 
            left: marker.left,
            animationDelay: `${index * 100}ms`
          }}
        >
          <div className={`
            relative flex items-center justify-center
            ${marker.size === "lg" ? "w-10 h-10" : marker.size === "md" ? "w-8 h-8" : "w-6 h-6"}
          `}>
            {marker.pulse && (
              <div className="absolute inset-0 bg-primary/30 rounded-full animate-ping" />
            )}
            <div className={`
              relative flex items-center justify-center rounded-full bg-gradient-warm shadow-glow
              ${marker.size === "lg" ? "w-10 h-10" : marker.size === "md" ? "w-8 h-8" : "w-6 h-6"}
            `}>
              <MapPin className={`
                text-primary-foreground
                ${marker.size === "lg" ? "w-5 h-5" : marker.size === "md" ? "w-4 h-4" : "w-3 h-3"}
              `} />
            </div>
          </div>
        </div>
      ))}

      {/* Locate me button */}
      <Button
        variant="glass"
        size="icon"
        className="absolute bottom-4 right-4 shadow-card"
        onClick={onLocateMe}
      >
        <Navigation className="h-5 w-5" />
      </Button>

      {/* Attribution mock */}
      <div className="absolute bottom-4 left-4 text-xs text-muted-foreground/50">
        Kartenansicht
      </div>
    </div>
  );
};

export default MapPlaceholder;
