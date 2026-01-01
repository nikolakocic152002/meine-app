import { Search, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SearchHeaderProps {
  location?: string;
  onSearchClick?: () => void;
  onNotificationsClick?: () => void;
}

const SearchHeader = ({ 
  location = "Berlin", 
  onSearchClick, 
  onNotificationsClick 
}: SearchHeaderProps) => {
  return (
    <header className="px-4 pt-2 pb-4 safe-top">
      <div className="flex items-center justify-between mb-4">
        <div>
          <p className="text-sm text-muted-foreground">Standort</p>
          <h2 className="text-lg font-bold text-foreground">{location}</h2>
        </div>
        <Button
          variant="icon"
          size="icon"
          onClick={onNotificationsClick}
          className="relative"
        >
          <Bell className="h-5 w-5" />
          <span className="absolute -top-1 -right-1 h-3 w-3 bg-primary rounded-full border-2 border-background" />
        </Button>
      </div>

      <button
        onClick={onSearchClick}
        className="flex items-center gap-3 w-full px-4 py-3.5 rounded-xl bg-secondary/50 border border-border/50 hover:bg-secondary transition-colors"
      >
        <Search className="h-5 w-5 text-muted-foreground" />
        <span className="text-muted-foreground">Restaurant, Bar, Club suchen...</span>
      </button>
    </header>
  );
};

export default SearchHeader;
