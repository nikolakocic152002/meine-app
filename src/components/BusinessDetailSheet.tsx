import { useState } from "react";
import { 
  X, 
  Star, 
  MapPin, 
  Clock, 
  Phone, 
  Globe, 
  Users, 
  Calendar,
  Percent,
  ChevronRight,
  Heart,
  Share2,
  Navigation
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Business } from "./BusinessCard";
import { cn } from "@/lib/utils";

interface BusinessDetailSheetProps {
  business: Business | null;
  isOpen: boolean;
  onClose: () => void;
}

const BusinessDetailSheet = ({ business, isOpen, onClose }: BusinessDetailSheetProps) => {
  const [isFavorite, setIsFavorite] = useState(false);

  if (!business) return null;

  const openingHours = [
    { day: "Montag", hours: "11:00 - 23:00" },
    { day: "Dienstag", hours: "11:00 - 23:00" },
    { day: "Mittwoch", hours: "11:00 - 23:00" },
    { day: "Donnerstag", hours: "11:00 - 00:00" },
    { day: "Freitag", hours: "11:00 - 02:00" },
    { day: "Samstag", hours: "12:00 - 02:00" },
    { day: "Sonntag", hours: "12:00 - 22:00" },
  ];

  const deals = [
    { title: "Happy Hour", description: "50% auf alle Cocktails", time: "17-19 Uhr" },
    { title: "Mittagsmenü", description: "2 Gänge für €12,90", time: "11-14 Uhr" },
  ];

  return (
    <>
      {/* Backdrop */}
      <div 
        className={cn(
          "fixed inset-0 z-40 bg-background/80 backdrop-blur-sm transition-opacity duration-300",
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={onClose}
      />

      {/* Sheet */}
      <div 
        className={cn(
          "fixed inset-x-0 bottom-0 z-50 h-[90vh] bg-card rounded-t-3xl shadow-lg transition-transform duration-300 ease-out overflow-hidden",
          isOpen ? "translate-y-0" : "translate-y-full"
        )}
      >
        {/* Handle */}
        <div className="absolute top-3 left-1/2 -translate-x-1/2 w-12 h-1.5 rounded-full bg-muted-foreground/20" />

        {/* Close button */}
        <Button
          variant="glass"
          size="icon-sm"
          className="absolute top-4 right-4 z-10"
          onClick={onClose}
        >
          <X className="h-4 w-4" />
        </Button>

        <div className="h-full overflow-y-auto scrollbar-hide">
          {/* Hero Image */}
          <div className="relative h-64">
            <img
              src={business.image}
              alt={business.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
            
            {/* Quick actions */}
            <div className="absolute bottom-4 right-4 flex gap-2">
              <Button
                variant="glass"
                size="icon"
                onClick={() => setIsFavorite(!isFavorite)}
              >
                <Heart className={cn(
                  "h-5 w-5 transition-colors",
                  isFavorite && "fill-destructive text-destructive"
                )} />
              </Button>
              <Button variant="glass" size="icon">
                <Share2 className="h-5 w-5" />
              </Button>
              <Button variant="glass" size="icon">
                <Navigation className="h-5 w-5" />
              </Button>
            </div>
          </div>

          <div className="p-6 space-y-6">
            {/* Header */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="secondary">{business.category}</Badge>
                <span className="text-muted-foreground">
                  {"€".repeat(business.priceLevel)}
                </span>
                {business.occupancy !== undefined && (
                  <Badge 
                    variant="secondary"
                    className={cn(
                      business.occupancy < 50 ? "bg-success/10 text-success" :
                      business.occupancy < 80 ? "bg-warning/10 text-warning" : 
                      "bg-destructive/10 text-destructive"
                    )}
                  >
                    <Users className="h-3 w-3 mr-1" />
                    {business.occupancy}% Auslastung
                  </Badge>
                )}
              </div>
              
              <h1 className="text-2xl font-bold text-foreground mb-2">
                {business.name}
              </h1>
              
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-warning text-warning" />
                  <span className="font-semibold text-foreground">{business.rating}</span>
                  <span>({business.reviewCount} Bewertungen)</span>
                </span>
                <span className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  {business.distance}
                </span>
              </div>
            </div>

            {/* Address & Contact */}
            <div className="space-y-3">
              <div className="flex items-start gap-3 p-3 rounded-xl bg-secondary/30">
                <MapPin className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div>
                  <p className="font-medium text-foreground">{business.address}</p>
                  <p className="text-sm text-muted-foreground">Berlin, Deutschland</p>
                </div>
              </div>
              
              <div className="flex gap-2">
                <Button variant="outline" className="flex-1 gap-2">
                  <Phone className="h-4 w-4" />
                  Anrufen
                </Button>
                <Button variant="outline" className="flex-1 gap-2">
                  <Globe className="h-4 w-4" />
                  Website
                </Button>
              </div>
            </div>

            {/* Deals */}
            {business.hasDeals && (
              <div>
                <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                  <Percent className="h-5 w-5 text-primary" />
                  Aktuelle Deals
                </h3>
                <div className="space-y-2">
                  {deals.map((deal, index) => (
                    <div 
                      key={index}
                      className="flex items-center justify-between p-3 rounded-xl bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20"
                    >
                      <div>
                        <p className="font-semibold text-foreground">{deal.title}</p>
                        <p className="text-sm text-muted-foreground">{deal.description}</p>
                      </div>
                      <Badge variant="secondary">{deal.time}</Badge>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Opening Hours */}
            <div>
              <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                <Clock className="h-5 w-5 text-primary" />
                Öffnungszeiten
              </h3>
              <div className="space-y-2">
                {openingHours.map((item, index) => (
                  <div 
                    key={index}
                    className="flex items-center justify-between py-2 border-b border-border/50 last:border-0"
                  >
                    <span className="text-muted-foreground">{item.day}</span>
                    <span className="font-medium text-foreground">{item.hours}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Events */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-foreground flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-primary" />
                  Events
                </h3>
                <Button variant="ghost" size="sm" className="text-primary">
                  Alle anzeigen
                  <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              </div>
              <div className="flex items-center gap-4 p-4 rounded-xl bg-secondary/30">
                <div className="h-16 w-16 rounded-lg bg-gradient-warm flex flex-col items-center justify-center text-primary-foreground">
                  <span className="text-2xl font-bold">31</span>
                  <span className="text-xs">DEZ</span>
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-foreground">Silvester Party 2024</h4>
                  <p className="text-sm text-muted-foreground">Ab 20:00 Uhr • DJ & Live Musik</p>
                </div>
                <ChevronRight className="h-5 w-5 text-muted-foreground" />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-4 pb-8">
              <Button variant="outline" className="flex-1 gap-2">
                <Calendar className="h-5 w-5" />
                Reservieren
              </Button>
              <Button variant="gradient" className="flex-1 gap-2">
                <Navigation className="h-5 w-5" />
                Route
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BusinessDetailSheet;
