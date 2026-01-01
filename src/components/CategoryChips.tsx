import { 
  Utensils, 
  Wine, 
  Coffee, 
  ShoppingBag,
  Sparkles,
  Scissors,
  Heart,
  Percent,
  Car,
  Dumbbell
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Category {
  id: string;
  label: string;
  icon: React.ReactNode;
  color?: string;
}

const categories: Category[] = [
  { id: "all", label: "Sve", icon: <Sparkles className="h-4 w-4" /> },
  { id: "restoran", label: "Restorani", icon: <Utensils className="h-4 w-4" /> },
  { id: "kafana", label: "Kafane", icon: <Wine className="h-4 w-4" /> },
  { id: "kafic", label: "Kafići", icon: <Coffee className="h-4 w-4" /> },
  { id: "prodavnica", label: "Prodavnice", icon: <ShoppingBag className="h-4 w-4" /> },
  { id: "usluge", label: "Usluge", icon: <Scissors className="h-4 w-4" /> },
  { id: "fitnes", label: "Fitnes", icon: <Dumbbell className="h-4 w-4" /> },
  { id: "zdravlje", label: "Zdravlje", icon: <Heart className="h-4 w-4" /> },
  { id: "auto", label: "Auto", icon: <Car className="h-4 w-4" /> },
  { id: "popusti", label: "Popusti", icon: <Percent className="h-4 w-4" /> },
];

interface CategoryChipsProps {
  selected: string;
  onSelect: (category: string) => void;
}

const CategoryChips = ({ selected, onSelect }: CategoryChipsProps) => {
  return (
    <div className="flex gap-2 overflow-x-auto scrollbar-hide py-1">
      {categories.map((category) => {
        const isSelected = selected === category.id;
        return (
          <button
            key={category.id}
            onClick={() => onSelect(category.id)}
            className={cn(
              "flex items-center gap-2 px-4 py-2.5 rounded-full transition-all duration-200 flex-shrink-0",
              isSelected
                ? "bg-gradient-warm text-primary-foreground shadow-glow"
                : "bg-secondary/50 text-muted-foreground hover:bg-secondary hover:text-foreground"
            )}
          >
            {category.icon}
            <span className="text-sm font-medium whitespace-nowrap">
              {category.label}
            </span>
          </button>
        );
      })}
    </div>
  );
};

export default CategoryChips;
