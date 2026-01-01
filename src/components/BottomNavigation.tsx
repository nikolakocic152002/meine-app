import { MapPin, Ticket, MessageCircle, Heart, User } from "lucide-react";
import { cn } from "@/lib/utils";

interface NavItem {
  icon: React.ReactNode;
  label: string;
  displayLabel: string;
  active?: boolean;
  onClick?: () => void;
}

interface BottomNavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const BottomNavigation = ({ activeTab, onTabChange }: BottomNavigationProps) => {
  const navItems: NavItem[] = [
    { icon: <MapPin className="h-4 w-4" />, label: "Entdecken", displayLabel: "Istraži" },
    { icon: <Ticket className="h-4 w-4" />, label: "Gutscheine", displayLabel: "Kuponi" },
    { icon: <MessageCircle className="h-4 w-4" />, label: "Chat", displayLabel: "Poruke" },
    { icon: <Heart className="h-4 w-4" />, label: "Favoriten", displayLabel: "Omiljeni" },
    { icon: <User className="h-4 w-4" />, label: "Profil", displayLabel: "Profil" },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 glass-strong border-t border-border/50 safe-bottom">
      <div className="flex items-center justify-around px-2 py-2">
        {navItems.map((item) => {
          const isActive = activeTab === item.label;
          return (
            <button
              key={item.label}
              onClick={() => onTabChange(item.label)}
              className={cn(
                "flex flex-col items-center justify-center gap-1 px-4 py-2 rounded-xl transition-all duration-200",
                isActive
                  ? "text-primary bg-primary/10"
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
              )}
            >
              <span className={cn(
                "transition-transform duration-200",
                isActive && "scale-110"
              )}>
                {item.icon}
              </span>
              <span className={cn(
                "text-xs font-medium",
                isActive && "font-semibold"
              )}>
                {item.displayLabel}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNavigation;
