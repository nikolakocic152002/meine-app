import { useState } from "react";
import { SlidersHorizontal, ChevronDown, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface Filter {
  id: string;
  label: string;
  options: string[];
}

const filters: Filter[] = [
  { id: "category", label: "Kategorie", options: ["Restaurant", "Bar", "Café", "Club", "Bowling"] },
  { id: "open", label: "Jetzt offen", options: ["Jetzt offen"] },
  { id: "price", label: "Preis", options: ["€", "€€", "€€€", "€€€€"] },
  { id: "distance", label: "Entfernung", options: ["< 1 km", "< 3 km", "< 5 km", "< 10 km"] },
];

interface FilterBarProps {
  activeFilters: string[];
  onFilterChange: (filters: string[]) => void;
}

const FilterBar = ({ activeFilters, onFilterChange }: FilterBarProps) => {
  const [expandedFilter, setExpandedFilter] = useState<string | null>(null);

  const toggleFilter = (filter: string) => {
    if (activeFilters.includes(filter)) {
      onFilterChange(activeFilters.filter(f => f !== filter));
    } else {
      onFilterChange([...activeFilters, filter]);
    }
  };

  const clearFilters = () => {
    onFilterChange([]);
  };

  return (
    <div className="space-y-3">
      {/* Main filter buttons */}
      <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide pb-1">
        <Button
          variant={activeFilters.length > 0 ? "default" : "outline"}
          size="sm"
          className="flex-shrink-0 gap-1.5"
          onClick={() => setExpandedFilter(expandedFilter ? null : "all")}
        >
          <SlidersHorizontal className="h-4 w-4" />
          Filter
          {activeFilters.length > 0 && (
            <Badge className="ml-1 h-5 w-5 p-0 flex items-center justify-center text-xs bg-primary-foreground text-primary">
              {activeFilters.length}
            </Badge>
          )}
        </Button>

        {filters.map((filter) => (
          <Button
            key={filter.id}
            variant={expandedFilter === filter.id ? "secondary" : "outline"}
            size="sm"
            className="flex-shrink-0 gap-1"
            onClick={() => setExpandedFilter(expandedFilter === filter.id ? null : filter.id)}
          >
            {filter.label}
            <ChevronDown className={cn(
              "h-3.5 w-3.5 transition-transform",
              expandedFilter === filter.id && "rotate-180"
            )} />
          </Button>
        ))}

        {activeFilters.length > 0 && (
          <Button
            variant="ghost"
            size="sm"
            className="flex-shrink-0 text-muted-foreground hover:text-destructive"
            onClick={clearFilters}
          >
            <X className="h-4 w-4 mr-1" />
            Löschen
          </Button>
        )}
      </div>

      {/* Expanded filter options */}
      {expandedFilter && expandedFilter !== "all" && (
        <div className="flex flex-wrap gap-2 animate-fade-in">
          {filters.find(f => f.id === expandedFilter)?.options.map((option) => (
            <Button
              key={option}
              variant={activeFilters.includes(option) ? "default" : "secondary"}
              size="sm"
              onClick={() => toggleFilter(option)}
              className="rounded-full"
            >
              {option}
              {activeFilters.includes(option) && (
                <X className="h-3 w-3 ml-1" />
              )}
            </Button>
          ))}
        </div>
      )}

      {/* Active filter tags */}
      {activeFilters.length > 0 && !expandedFilter && (
        <div className="flex flex-wrap gap-2">
          {activeFilters.map((filter) => (
            <Badge
              key={filter}
              variant="secondary"
              className="gap-1 cursor-pointer hover:bg-destructive/10 hover:text-destructive transition-colors"
              onClick={() => toggleFilter(filter)}
            >
              {filter}
              <X className="h-3 w-3" />
            </Badge>
          ))}
        </div>
      )}
    </div>
  );
};

export default FilterBar;
