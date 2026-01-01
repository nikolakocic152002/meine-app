import { useState } from "react";
import { Helmet } from "react-helmet";
import SearchHeader from "@/components/SearchHeader";
import CategoryChips from "@/components/CategoryChips";
import FilterBar from "@/components/FilterBar";
import MapboxMap from "@/components/MapboxMap";
import MapTokenInput from "@/components/MapTokenInput";
import ExpandedMapView from "@/components/ExpandedMapView";
import BusinessCard, { Business } from "@/components/BusinessCard";
import BottomNavigation from "@/components/BottomNavigation";
import BusinessDetailSheet from "@/components/BusinessDetailSheet";
import CouponsView from "@/components/CouponsView";
import ChatView from "@/components/ChatView";
import FavoritesView from "@/components/FavoritesView";
import ProfileView from "@/components/ProfileView";

// Podaci za Petrovac na Mlavi, Srbija
const sampleBusinesses: Business[] = [
  {
    id: "1",
    name: "Restoran Mlava",
    category: "Restoran",
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80",
    rating: 4.8,
    reviewCount: 156,
    priceLevel: 2,
    distance: "0.2 km",
    isOpen: true,
    openUntil: "23:00",
    occupancy: 55,
    hasDeals: true,
    address: "Srpskih Vladara 45",
  },
  {
    id: "2",
    name: "Kafana Stari Most",
    category: "Kafana",
    image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&q=80",
    rating: 4.6,
    reviewCount: 203,
    priceLevel: 1,
    distance: "0.4 km",
    isOpen: true,
    openUntil: "01:00",
    occupancy: 70,
    hasDeals: true,
    address: "Trg Oslobođenja 12",
  },
  {
    id: "3",
    name: "Caffe Bar Central",
    category: "Kafić",
    image: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800&q=80",
    rating: 4.5,
    reviewCount: 89,
    priceLevel: 1,
    distance: "0.1 km",
    isOpen: true,
    openUntil: "22:00",
    occupancy: 40,
    address: "Vojvode Mišića 8",
  },
  {
    id: "4",
    name: "Pekara Zlatni Klas",
    category: "Pekara",
    image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800&q=80",
    rating: 4.9,
    reviewCount: 312,
    priceLevel: 1,
    distance: "0.3 km",
    isOpen: true,
    openUntil: "20:00",
    occupancy: 25,
    hasDeals: true,
    address: "Kneza Miloša 23",
  },
  {
    id: "5",
    name: "Pizzeria Napoli",
    category: "Restoran",
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800&q=80",
    rating: 4.4,
    reviewCount: 178,
    priceLevel: 2,
    distance: "0.5 km",
    isOpen: true,
    openUntil: "23:00",
    occupancy: 60,
    address: "Cara Dušana 15",
  },
  {
    id: "6",
    name: "Gym Fitness Centar",
    category: "Fitnes",
    image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&q=80",
    rating: 4.7,
    reviewCount: 95,
    priceLevel: 2,
    distance: "0.8 km",
    isOpen: true,
    openUntil: "22:00",
    occupancy: 35,
    hasDeals: true,
    address: "Sportska 5",
  },
  {
    id: "7",
    name: "Apoteka Zdravlje",
    category: "Apoteka",
    image: "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=800&q=80",
    rating: 4.8,
    reviewCount: 67,
    priceLevel: 2,
    distance: "0.2 km",
    isOpen: true,
    openUntil: "20:00",
    occupancy: 15,
    address: "Vuka Karadžića 3",
  },
  {
    id: "8",
    name: "Market Maxi",
    category: "Prodavnica",
    image: "https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=800&q=80",
    rating: 4.3,
    reviewCount: 234,
    priceLevel: 2,
    distance: "0.6 km",
    isOpen: true,
    openUntil: "21:00",
    occupancy: 50,
    hasDeals: true,
    address: "Beogradska 78",
  },
  {
    id: "9",
    name: "Frizerski Salon Stil",
    category: "Usluge",
    image: "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&q=80",
    rating: 4.6,
    reviewCount: 123,
    priceLevel: 2,
    distance: "0.4 km",
    isOpen: true,
    openUntil: "19:00",
    occupancy: 80,
    address: "Moravska 11",
  },
  {
    id: "10",
    name: "Auto Servis Petrović",
    category: "Usluge",
    image: "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=800&q=80",
    rating: 4.5,
    reviewCount: 89,
    priceLevel: 2,
    distance: "1.2 km",
    isOpen: true,
    openUntil: "18:00",
    occupancy: 40,
    address: "Industrijska zona bb",
  },
];

const Index = () => {
  const [activeTab, setActiveTab] = useState("Entdecken");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [selectedBusiness, setSelectedBusiness] = useState<Business | null>(null);
  const [showSheet, setShowSheet] = useState(false);
  const [showExpandedMap, setShowExpandedMap] = useState(false);
  
  // Mapbox token state
  const [mapboxToken, setMapboxToken] = useState<string>(() => {
    return localStorage.getItem("mapbox_token") || "";
  });

  const handleBusinessClick = (business: Business) => {
    setSelectedBusiness(business);
    setShowSheet(true);
    if (showExpandedMap) {
      setShowExpandedMap(false);
    }
  };

  const handleCloseSheet = () => {
    setShowSheet(false);
    setTimeout(() => setSelectedBusiness(null), 300);
  };

  const handleTokenSubmit = (token: string) => {
    setMapboxToken(token);
  };

  const handleOpenExpandedMap = () => {
    if (mapboxToken) {
      setShowExpandedMap(true);
    }
  };

  // Render content based on active tab
  const renderContent = () => {
    switch (activeTab) {
      case "Gutscheine":
        return <CouponsView />;
      case "Chat":
        return <ChatView />;
      case "Favoriten":
        return <FavoritesView />;
      case "Profil":
        return <ProfileView />;
      default:
        return (
          <div className="min-h-screen bg-background pb-24">
            {/* Header with Search */}
            <SearchHeader location="Petrovac na Mlavi, Srbija" />

            {/* Categories */}
            <div className="px-4 mb-4">
              <CategoryChips 
                selected={selectedCategory} 
                onSelect={setSelectedCategory} 
              />
            </div>

            {/* Filters */}
            <div className="px-4 mb-4">
              <FilterBar 
                activeFilters={activeFilters}
                onFilterChange={setActiveFilters}
              />
            </div>

            {/* Map Section */}
            <div className="px-4 mb-6">
              {mapboxToken ? (
                <div className="h-56 rounded-2xl overflow-hidden shadow-card">
                  <MapboxMap
                    businesses={sampleBusinesses}
                    onBusinessClick={handleBusinessClick}
                    accessToken={mapboxToken}
                    className="w-full h-full"
                  />
                </div>
              ) : (
                <MapTokenInput 
                  onTokenSubmit={handleTokenSubmit}
                  savedToken={mapboxToken}
                />
              )}
            </div>

            {/* Featured Section */}
            <section className="mb-6">
              <div className="flex items-center justify-between px-4 mb-3">
                <h2 className="text-lg font-bold text-foreground">Preporučeno za tebe</h2>
                <button className="text-sm text-primary font-medium">
                  Prikaži sve
                </button>
              </div>
              <div className="flex gap-4 overflow-x-auto scrollbar-hide px-4 pb-2">
                {sampleBusinesses.slice(0, 3).map((business) => (
                  <BusinessCard
                    key={business.id}
                    business={business}
                    variant="featured"
                    onClick={() => handleBusinessClick(business)}
                  />
                ))}
              </div>
            </section>

            {/* Nearby Section */}
            <section className="px-4">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-lg font-bold text-foreground">U blizini</h2>
                <button 
                  className="text-sm text-primary font-medium"
                  onClick={handleOpenExpandedMap}
                  disabled={!mapboxToken}
                >
                  Otvori mapu
                </button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {sampleBusinesses.map((business) => (
                  <BusinessCard
                    key={business.id}
                    business={business}
                    onClick={() => handleBusinessClick(business)}
                  />
                ))}
              </div>
            </section>
          </div>
        );
    }
  };

  return (
    <>
      <Helmet>
        <title>LocalSpot - Otkrij restorane, kafiće i više u Petrovcu na Mlavi</title>
        <meta 
          name="description" 
          content="Pronađi najbolje restorane, kafiće, kafane i usluge u Petrovcu na Mlavi. Rezerviši direktno, otkrij popuste i uživaj." 
        />
      </Helmet>

      {renderContent()}

      {/* Bottom Navigation */}
      <BottomNavigation 
        activeTab={activeTab} 
        onTabChange={setActiveTab} 
      />

      {/* Business Detail Sheet */}
      <BusinessDetailSheet
        business={selectedBusiness}
        isOpen={showSheet}
        onClose={handleCloseSheet}
      />

      {/* Expanded Map View */}
      <ExpandedMapView
        isOpen={showExpandedMap}
        onClose={() => setShowExpandedMap(false)}
        businesses={sampleBusinesses}
        onBusinessClick={handleBusinessClick}
        accessToken={mapboxToken}
      />
    </>
  );
};

export default Index;
