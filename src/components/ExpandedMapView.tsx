import { X, Filter, List } from "lucide-react";
import { Button } from "@/components/ui/button";
import MapboxMap from "./MapboxMap";
import BusinessCard, { Business } from "./BusinessCard";
import { cn } from "@/lib/utils";

interface ExpandedMapViewProps {
  isOpen: boolean;
  onClose: () => void;
  businesses: Business[];
  onBusinessClick: (business: Business) => void;
  accessToken: string;
}

const ExpandedMapView = ({
  isOpen,
  onClose,
  businesses,
  onBusinessClick,
  accessToken,
}: ExpandedMapViewProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-background animate-fade-in">
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 z-10 p-4 safe-top">
        <div className="flex items-center justify-between">
          <Button variant="glass" size="icon" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
          
          <div className="flex items-center gap-2">
            <Button variant="glass" size="sm" className="gap-2">
              <Filter className="h-4 w-4" />
              Filter
            </Button>
            <Button variant="glass" size="sm" className="gap-2">
              <List className="h-4 w-4" />
              Liste
            </Button>
          </div>
        </div>
      </div>

      {/* Full screen map */}
      <MapboxMap
        businesses={businesses}
        onBusinessClick={onBusinessClick}
        accessToken={accessToken}
        className="w-full h-full"
      />

      {/* Bottom business cards carousel */}
      <div className="absolute bottom-0 left-0 right-0 z-10 pb-6 safe-bottom">
        <div className="flex gap-3 overflow-x-auto scrollbar-hide px-4 pb-2">
          {businesses.filter(b => b.isOpen).slice(0, 5).map((business) => (
            <div key={business.id} className="flex-shrink-0 w-72 animate-slide-up">
              <BusinessCard
                business={business}
                variant="featured"
                onClick={() => onBusinessClick(business)}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ExpandedMapView;
