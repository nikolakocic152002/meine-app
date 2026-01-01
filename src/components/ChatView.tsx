import { MessageCircle, Search, MoreVertical } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

interface ChatPreview {
  id: string;
  businessName: string;
  businessImage: string;
  lastMessage: string;
  timestamp: string;
  unread: number;
}

const sampleChats: ChatPreview[] = [
  {
    id: "1",
    businessName: "Restoran Mlava",
    businessImage: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=100&q=80",
    lastMessage: "Vaša rezervacija za večeras je potvrđena!",
    timestamp: "10:30",
    unread: 1,
  },
  {
    id: "2",
    businessName: "Kafana Stari Most",
    businessImage: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=100&q=80",
    lastMessage: "Hvala na poseti! Radujemo se ponovnom viđenju.",
    timestamp: "Juče",
    unread: 0,
  },
  {
    id: "3",
    businessName: "Caffe Bar Central",
    businessImage: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=100&q=80",
    lastMessage: "Vaša 10. kafa je besplatna! Dođite po nju.",
    timestamp: "Pon",
    unread: 2,
  },
  {
    id: "4",
    businessName: "Pekara Zlatni Klas",
    businessImage: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=100&q=80",
    lastMessage: "Sveži burek vas čeka! 🥐",
    timestamp: "Uto",
    unread: 0,
  },
  {
    id: "5",
    businessName: "Gym Fitness Centar",
    businessImage: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=100&q=80",
    lastMessage: "Vaša mesečna članarina ističe za 5 dana.",
    timestamp: "Sre",
    unread: 1,
  },
];

const ChatView = () => {
  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <div className="sticky top-0 z-40 glass-strong border-b border-border/50">
        <div className="px-4 py-4">
          <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
            <MessageCircle className="h-6 w-6 text-primary" />
            Poruke
          </h1>
          <p className="text-muted-foreground text-sm mt-1">
            Komuniciraj sa preduzećima
          </p>
        </div>
        
        {/* Search */}
        <div className="px-4 pb-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Pretraži razgovore..." 
              className="pl-9 bg-secondary/50 border-border/50"
            />
          </div>
        </div>
      </div>

      {/* Chat List */}
      <div className="px-4 py-2">
        {sampleChats.length > 0 ? (
          <div className="space-y-2">
            {sampleChats.map((chat) => (
              <Card 
                key={chat.id} 
                className="p-3 bg-card border-border/50 hover:bg-secondary/50 transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={chat.businessImage} alt={chat.businessName} />
                    <AvatarFallback>{chat.businessName[0]}</AvatarFallback>
                  </Avatar>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold text-foreground text-sm truncate">
                        {chat.businessName}
                      </h3>
                      <span className="text-xs text-muted-foreground flex-shrink-0">
                        {chat.timestamp}
                      </span>
                    </div>
                    <div className="flex items-center justify-between mt-1">
                      <p className="text-sm text-muted-foreground truncate pr-2">
                        {chat.lastMessage}
                      </p>
                      {chat.unread > 0 && (
                        <Badge className="bg-primary text-primary-foreground h-5 min-w-5 flex items-center justify-center text-xs">
                          {chat.unread}
                        </Badge>
                      )}
                    </div>
                  </div>
                  
                  <button className="p-1 text-muted-foreground hover:text-foreground">
                    <MoreVertical className="h-4 w-4" />
                  </button>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <MessageCircle className="h-16 w-16 text-muted-foreground/30 mb-4" />
            <h3 className="text-lg font-semibold text-foreground">Nema poruka</h3>
            <p className="text-muted-foreground text-sm mt-1">
              Započni razgovor sa preduzećem
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatView;
