import { Star, Clock, MapPin, Users, Percent } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export interface Business {
  id: string;
  name: string;
  category: string;
  image: string;
  rating: number;
  reviewCount: number;
  priceLevel: number;
  distance: string;
  isOpen: boolean;
  openUntil?: string;
  occupancy?: number;
  hasDeals?: boolean;
  address: string;
}

interface BusinessCardProps {
  business: Business;
  onClick?: () => void;
  variant?: "default" | "compact" | "featured";
}

const BusinessCard = ({ business, onClick, variant = "default" }: BusinessCardProps) => {
  const priceLabel = "€".repeat(business.priceLevel);

  if (variant === "compact") {
    return (
      <button
        onClick={onClick}
        className="flex items-center gap-3 p-3 rounded-xl bg-card border border-border/50 hover:shadow-card transition-all duration-200 w-full text-left"
      >
        <div className="relative h-14 w-14 rounded-lg overflow-hidden flex-shrink-0">
          <img
            src={business.image}
            alt={business.name}
            className="h-full w-full object-cover"
          />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-foreground truncate">{business.name}</h3>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span className="flex items-center gap-1">
              <Star className="h-3.5 w-3.5 fill-warning text-warning" />
              {business.rating}
            </span>
            <span>•</span>
            <span>{business.distance}</span>
          </div>
        </div>
        {business.isOpen && (
          <Badge variant="secondary" className="bg-success/10 text-success border-0 text-xs">
            Offen
          </Badge>
        )}
      </button>
    );
  }

  if (variant === "featured") {
    return (
      <button
        onClick={onClick}
        className="relative group w-72 flex-shrink-0 rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300"
      >
        <div className="relative h-44">
          <img
            src={business.image}
            alt={business.name}
            className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />
          
          {business.hasDeals && (
            <Badge className="absolute top-3 left-3 bg-gradient-warm border-0">
              <Percent className="h-3 w-3 mr-1" />
              Deals
            </Badge>
          )}
          
          {business.occupancy !== undefined && (
            <div className="absolute top-3 right-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-background/80 backdrop-blur-sm">
              <Users className="h-3.5 w-3.5 text-muted-foreground" />
              <span className={cn(
                "text-xs font-medium",
                business.occupancy < 50 ? "text-success" :
                business.occupancy < 80 ? "text-warning" : "text-destructive"
              )}>
                {business.occupancy}%
              </span>
            </div>
          )}
          
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <div className="flex items-center gap-2 mb-1">
              <Badge variant="secondary" className="text-xs bg-secondary/80 backdrop-blur-sm">
                {business.category}
              </Badge>
              <span className="text-xs text-muted-foreground">{priceLabel}</span>
            </div>
            <h3 className="font-bold text-lg text-foreground">{business.name}</h3>
          </div>
        </div>
        
        <div className="p-4 bg-card">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                <Star className="h-4 w-4 fill-warning text-warning" />
                <span className="font-medium text-foreground">{business.rating}</span>
                <span>({business.reviewCount})</span>
              </span>
              <span className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                {business.distance}
              </span>
            </div>
            
            {business.isOpen ? (
              <span className="flex items-center gap-1 text-xs text-success">
                <Clock className="h-3.5 w-3.5" />
                bis {business.openUntil}
              </span>
            ) : (
              <span className="text-xs text-muted-foreground">Geschlossen</span>
            )}
          </div>
        </div>
      </button>
    );
  }

  return (
    <button
      onClick={onClick}
      className="group rounded-2xl overflow-hidden bg-card border border-border/50 shadow-card hover:shadow-card-hover transition-all duration-300"
    >
      <div className="relative h-40">
        <img
          src={business.image}
          alt={business.name}
          className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
        
        {business.hasDeals && (
          <Badge className="absolute top-3 left-3 bg-gradient-warm border-0">
            <Percent className="h-3 w-3 mr-1" />
            Deals
          </Badge>
        )}
        
        {business.occupancy !== undefined && (
          <div className="absolute top-3 right-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-background/80 backdrop-blur-sm">
            <Users className="h-3.5 w-3.5 text-muted-foreground" />
            <span className={cn(
              "text-xs font-medium",
              business.occupancy < 50 ? "text-success" :
              business.occupancy < 80 ? "text-warning" : "text-destructive"
            )}>
              {business.occupancy}%
            </span>
          </div>
        )}
      </div>
      
      <div className="p-4">
        <div className="flex items-start justify-between gap-2 mb-2">
          <div>
            <h3 className="font-bold text-foreground text-left">{business.name}</h3>
            <div className="flex items-center gap-2 mt-1">
              <Badge variant="secondary" className="text-xs">{business.category}</Badge>
              <span className="text-xs text-muted-foreground">{priceLabel}</span>
            </div>
          </div>
          <div className="flex items-center gap-1 text-sm">
            <Star className="h-4 w-4 fill-warning text-warning" />
            <span className="font-semibold text-foreground">{business.rating}</span>
          </div>
        </div>
        
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <span className="flex items-center gap-1">
            <MapPin className="h-4 w-4" />
            {business.distance}
          </span>
          {business.isOpen ? (
            <span className="flex items-center gap-1 text-success">
              <Clock className="h-4 w-4" />
              bis {business.openUntil}
            </span>
          ) : (
            <span>Geschlossen</span>
          )}
        </div>
      </div>
    </button>
  );
};

export default BusinessCard;
