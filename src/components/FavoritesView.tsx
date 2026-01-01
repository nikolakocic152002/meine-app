import { Heart, MapPin, Star } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface FavoriteBusiness {
  id: string;
  name: string;
  category: string;
  image: string;
  rating: number;
  address: string;
  isOpen: boolean;
}

const sampleFavorites: FavoriteBusiness[] = [
  {
    id: "1",
    name: "Restoran Mlava",
    category: "Restoran",
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400&q=80",
    rating: 4.8,
    address: "Srpskih Vladara 45",
    isOpen: true,
  },
  {
    id: "2",
    name: "Kafana Stari Most",
    category: "Kafana",
    image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=400&q=80",
    rating: 4.6,
    address: "Trg Oslobođenja 12",
    isOpen: true,
  },
  {
    id: "3",
    name: "Caffe Bar Central",
    category: "Kafić",
    image: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=400&q=80",
    rating: 4.5,
    address: "Vojvode Mišića 8",
    isOpen: false,
  },
  {
    id: "4",
    name: "Pekara Zlatni Klas",
    category: "Pekara",
    image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400&q=80",
    rating: 4.9,
    address: "Kneza Miloša 23",
    isOpen: true,
  },
];

const FavoritesView = () => {
  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <div className="sticky top-0 z-40 glass-strong border-b border-border/50">
        <div className="px-4 py-4">
          <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
            <Heart className="h-6 w-6 text-primary fill-primary" />
            Omiljeni
          </h1>
          <p className="text-muted-foreground text-sm mt-1">
            Tvoja sačuvana mesta
          </p>
        </div>
      </div>

      {/* Favorites Grid */}
      <div className="px-4 py-4">
        {sampleFavorites.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {sampleFavorites.map((business) => (
              <Card 
                key={business.id} 
                className="overflow-hidden bg-card border-border/50 hover:shadow-card transition-shadow cursor-pointer"
              >
                <div className="relative">
                  <img 
                    src={business.image} 
                    alt={business.name}
                    className="w-full h-32 object-cover"
                  />
                  <button className="absolute top-2 right-2 p-2 rounded-full bg-background/80 backdrop-blur-sm">
                    <Heart className="h-4 w-4 text-primary fill-primary" />
                  </button>
                  <Badge 
                    className={`absolute bottom-2 left-2 ${
                      business.isOpen 
                        ? "bg-green-500/90 text-white" 
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {business.isOpen ? "Otvoreno" : "Zatvoreno"}
                  </Badge>
                </div>
                <div className="p-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-semibold text-foreground">{business.name}</h3>
                      <p className="text-xs text-muted-foreground">{business.category}</p>
                    </div>
                    <div className="flex items-center gap-1 text-primary">
                      <Star className="h-4 w-4 fill-primary" />
                      <span className="text-sm font-medium">{business.rating}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 mt-2 text-muted-foreground">
                    <MapPin className="h-3 w-3" />
                    <span className="text-xs">{business.address}</span>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <Heart className="h-16 w-16 text-muted-foreground/30 mb-4" />
            <h3 className="text-lg font-semibold text-foreground">Nema omiljenih</h3>
            <p className="text-muted-foreground text-sm mt-1">
              Sačuvaj svoja omiljena mesta ovde
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FavoritesView;
