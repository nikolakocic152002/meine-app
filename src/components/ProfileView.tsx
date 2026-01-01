import { 
  User, 
  Settings, 
  Bell, 
  CreditCard, 
  HelpCircle, 
  LogOut, 
  ChevronRight,
  Moon,
  Globe,
  Shield,
  Star
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";

interface MenuItem {
  icon: React.ReactNode;
  label: string;
  description?: string;
  hasToggle?: boolean;
  toggleValue?: boolean;
}

const ProfileView = () => {
  const menuItems: MenuItem[] = [
    { icon: <Bell className="h-5 w-5" />, label: "Obaveštenja", hasToggle: true, toggleValue: true },
    { icon: <Moon className="h-5 w-5" />, label: "Tamni režim", hasToggle: true, toggleValue: true },
    { icon: <Globe className="h-5 w-5" />, label: "Jezik", description: "Srpski" },
    { icon: <CreditCard className="h-5 w-5" />, label: "Načini plaćanja" },
    { icon: <Shield className="h-5 w-5" />, label: "Privatnost i bezbednost" },
    { icon: <Star className="h-5 w-5" />, label: "Oceni aplikaciju" },
    { icon: <HelpCircle className="h-5 w-5" />, label: "Pomoć i podrška" },
  ];

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <div className="sticky top-0 z-40 glass-strong border-b border-border/50">
        <div className="px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
            <User className="h-6 w-6 text-primary" />
            Profil
          </h1>
          <button className="p-2 rounded-full hover:bg-secondary/50 transition-colors">
            <Settings className="h-5 w-5 text-muted-foreground" />
          </button>
        </div>
      </div>

      {/* Profile Card */}
      <div className="px-4 py-6">
        <Card className="p-6 bg-gradient-to-br from-primary/5 via-background to-primary/10 border-primary/20">
          <div className="flex items-center gap-4">
            <Avatar className="h-20 w-20 border-2 border-primary/20">
              <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&q=80" />
              <AvatarFallback className="bg-primary text-primary-foreground text-xl">MP</AvatarFallback>
            </Avatar>
            <div>
              <h2 className="text-xl font-bold text-foreground">Marko Petrović</h2>
              <p className="text-muted-foreground text-sm">marko@example.com</p>
              <div className="flex items-center gap-2 mt-2">
                <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                  Premium Član
                </span>
              </div>
            </div>
          </div>
          
          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mt-6">
            <div className="text-center">
              <p className="text-2xl font-bold text-primary">23</p>
              <p className="text-xs text-muted-foreground">Posete</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-primary">8</p>
              <p className="text-xs text-muted-foreground">Omiljeni</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-primary">5</p>
              <p className="text-xs text-muted-foreground">Kuponi</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Menu Items */}
      <div className="px-4">
        <Card className="bg-card border-border/50 overflow-hidden">
          {menuItems.map((item, index) => (
            <div key={item.label}>
              <button className="w-full px-4 py-3 flex items-center justify-between hover:bg-secondary/50 transition-colors">
                <div className="flex items-center gap-3">
                  <span className="text-primary">{item.icon}</span>
                  <div className="text-left">
                    <p className="text-sm font-medium text-foreground">{item.label}</p>
                    {item.description && (
                      <p className="text-xs text-muted-foreground">{item.description}</p>
                    )}
                  </div>
                </div>
                {item.hasToggle ? (
                  <Switch checked={item.toggleValue} />
                ) : (
                  <ChevronRight className="h-4 w-4 text-muted-foreground" />
                )}
              </button>
              {index < menuItems.length - 1 && <Separator className="mx-4" />}
            </div>
          ))}
        </Card>
      </div>

      {/* Logout Button */}
      <div className="px-4 py-6">
        <button className="w-full py-3 flex items-center justify-center gap-2 text-destructive hover:bg-destructive/10 rounded-xl transition-colors">
          <LogOut className="h-5 w-5" />
          <span className="font-medium">Odjavi se</span>
        </button>
      </div>
    </div>
  );
};

export default ProfileView;
