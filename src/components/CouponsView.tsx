import { Ticket, Gift, Clock, QrCode, Tag } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface Coupon {
  id: string;
  title: string;
  business: string;
  discount: string;
  validUntil: string;
  image: string;
  type: "percent" | "freebie" | "stampcard";
  stamps?: { current: number; total: number };
}

const sampleCoupons: Coupon[] = [
  {
    id: "1",
    title: "20% popusta na sve pivo",
    business: "Kafana Stari Most",
    discount: "20%",
    validUntil: "31.01.2025",
    image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=400&q=80",
    type: "percent",
  },
  {
    id: "2",
    title: "Besplatan dezert",
    business: "Restoran Mlava",
    discount: "Besplatno",
    validUntil: "15.02.2025",
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400&q=80",
    type: "freebie",
  },
  {
    id: "3",
    title: "10. kafa besplatna",
    business: "Caffe Bar Central",
    discount: "Kartica",
    validUntil: "Neograničeno",
    image: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=400&q=80",
    type: "stampcard",
    stamps: { current: 7, total: 10 },
  },
  {
    id: "4",
    title: "2 pice za cenu 1",
    business: "Pizzeria Napoli",
    discount: "2 za 1",
    validUntil: "Svaki dan 14-17h",
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400&q=80",
    type: "percent",
  },
  {
    id: "5",
    title: "Besplatna burek vikendom",
    business: "Pekara Zlatni Klas",
    discount: "Besplatno",
    validUntil: "Subota i nedelja",
    image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400&q=80",
    type: "freebie",
  },
  {
    id: "6",
    title: "30% popusta na mesečnu članarinu",
    business: "Gym Fitness Centar",
    discount: "30%",
    validUntil: "28.02.2025",
    image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&q=80",
    type: "percent",
  },
];

const CouponsView = () => {
  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <div className="sticky top-0 z-40 glass-strong border-b border-border/50">
        <div className="px-4 py-4">
          <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
            <Ticket className="h-6 w-6 text-primary" />
            Moji kuponi
          </h1>
          <p className="text-muted-foreground text-sm mt-1">
            Sakupi i iskoristi popuste
          </p>
        </div>
      </div>

      {/* Active Coupons */}
      <section className="px-4 py-4">
        <h2 className="text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
          <Tag className="h-5 w-5 text-primary" />
          Aktivni kuponi
        </h2>
        <div className="space-y-3">
          {sampleCoupons.map((coupon) => (
            <Card key={coupon.id} className="overflow-hidden bg-card border-border/50">
              <div className="flex">
                <div className="w-24 h-24 flex-shrink-0">
                  <img 
                    src={coupon.image} 
                    alt={coupon.business}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 p-3 flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-semibold text-foreground text-sm">
                          {coupon.title}
                        </h3>
                        <p className="text-xs text-muted-foreground">
                          {coupon.business}
                        </p>
                      </div>
                      <Badge variant="secondary" className="bg-primary/10 text-primary text-xs">
                        {coupon.discount}
                      </Badge>
                    </div>
                    
                    {coupon.type === "stampcard" && coupon.stamps && (
                      <div className="flex gap-1 mt-2">
                        {Array.from({ length: coupon.stamps.total }).map((_, i) => (
                          <div
                            key={i}
                            className={`w-5 h-5 rounded-full flex items-center justify-center ${
                              i < coupon.stamps!.current 
                                ? "bg-primary text-primary-foreground" 
                                : "bg-muted border border-border"
                            }`}
                          >
                            {i < coupon.stamps!.current && (
                              <Gift className="h-3 w-3" />
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {coupon.validUntil}
                    </span>
                    <Button size="sm" variant="secondary" className="h-7 text-xs gap-1">
                      <QrCode className="h-3 w-3" />
                      Iskoristi
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Discover More */}
      <section className="px-4 py-4">
        <h2 className="text-lg font-semibold text-foreground mb-3">
          Otkrij nove ponude
        </h2>
        <div className="grid grid-cols-2 gap-3">
          {[
            { title: "Restorani", desc: "5 novih ponuda" },
            { title: "Kafići", desc: "3 nove ponude" },
            { title: "Usluge", desc: "2 nove ponude" },
            { title: "Prodavnice", desc: "4 nove ponude" },
          ].map((item, i) => (
            <Card key={i} className="p-4 bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
              <Gift className="h-8 w-8 text-primary mb-2" />
              <p className="text-sm font-medium text-foreground">{item.title}</p>
              <p className="text-xs text-muted-foreground mt-1">{item.desc}</p>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
};

export default CouponsView;
