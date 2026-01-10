import { useState } from "react";
import { MapPin, Navigation, Search, Locate } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import FilterChips from "@/components/FilterChips";
import { Link } from "react-router-dom";

const temples = [
  { id: "adi-kumbeswarar", name: "Adi Kumbeswarar Temple", deity: "Lord Shiva", lat: 10.9577, lng: 79.3773, distance: "0.5 km" },
  { id: "sarangapani", name: "Sarangapani Temple", deity: "Lord Vishnu", lat: 10.9614, lng: 79.3776, distance: "0.8 km" },
  { id: "ramaswamy", name: "Ramaswamy Temple", deity: "Lord Rama", lat: 10.9598, lng: 79.3751, distance: "1.2 km" },
  { id: "nageshwara", name: "Nageshwara Temple", deity: "Lord Shiva", lat: 10.9589, lng: 79.3792, distance: "1.5 km" },
  { id: "chakrapani", name: "Chakrapani Temple", deity: "Lord Vishnu", lat: 10.9561, lng: 79.3724, distance: "2.0 km" },
  { id: "kasi-viswanathar", name: "Kasi Viswanathar Temple", deity: "Lord Shiva", lat: 10.9553, lng: 79.3781, distance: "1.8 km" },
];

const filterOptions = [
  { id: "all", label: "All" },
  { id: "shiva", label: "Shiva" },
  { id: "vishnu", label: "Vishnu" },
];

const MapView = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);

  const filteredTemples = temples.filter((t) => {
    const matchesSearch = t.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.deity.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = selectedFilter === "all" ||
      (selectedFilter === "shiva" && t.deity.includes("Shiva")) ||
      (selectedFilter === "vishnu" && (t.deity.includes("Vishnu") || t.deity.includes("Rama")));
    return matchesSearch && matchesFilter;
  });

  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setUserLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude });
        },
        (err) => console.error("Location error:", err)
      );
    }
  };

  const openGoogleMaps = (lat: number, lng: number, name: string) => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}&travelmode=driving`;
    window.open(url, "_blank");
  };

  return (
    <div className="min-h-screen bg-background pb-4">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="px-4 py-4">
          <div className="flex items-center justify-between mb-3">
            <h1 className="text-xl font-bold text-foreground">Map View</h1>
            <Button variant="outline" size="sm" onClick={getUserLocation} className="gap-2">
              <Locate className="w-4 h-4" />
              <span className="hidden sm:inline">My Location</span>
            </Button>
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              placeholder="Search temples..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 h-11"
            />
          </div>
        </div>
      </header>

      <main className="px-4 space-y-4 pt-4">
        {/* Filters */}
        <FilterChips options={filterOptions} selected={selectedFilter} onChange={setSelectedFilter} />

        {/* Map Placeholder with action */}
        <div className="bg-muted rounded-xl h-48 flex flex-col items-center justify-center gap-3 border border-border">
          <MapPin className="w-10 h-10 text-primary" />
          <p className="text-muted-foreground text-sm">Temple locations</p>
          <Button
            size="sm"
            onClick={() => window.open("https://www.google.com/maps/search/temples+near+Kumbakonam,+Tamil+Nadu", "_blank")}
          >
            Open in Google Maps
          </Button>
        </div>

        {/* Temple List */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold text-foreground">Nearby Temples</h2>
            <span className="text-sm text-muted-foreground">{filteredTemples.length} found</span>
          </div>

          {filteredTemples.map((temple) => (
            <div
              key={temple.id}
              className="flex items-center justify-between p-4 bg-card rounded-xl border border-border card-hover"
            >
              <Link to={`/temple/${temple.id}`} className="flex-1 min-w-0">
                <h3 className="font-medium text-foreground truncate">{temple.name}</h3>
                <p className="text-sm text-muted-foreground">{temple.deity} · {temple.distance}</p>
              </Link>
              <Button
                variant="outline"
                size="icon"
                className="flex-shrink-0 ml-3"
                onClick={() => openGoogleMaps(temple.lat, temple.lng, temple.name)}
              >
                <Navigation className="w-4 h-4" />
              </Button>
            </div>
          ))}
        </div>

        {/* User location info */}
        {userLocation && (
          <div className="p-3 bg-accent rounded-xl text-sm text-center">
            <p className="text-muted-foreground">
              Your location: {userLocation.lat.toFixed(4)}, {userLocation.lng.toFixed(4)}
            </p>
          </div>
        )}
      </main>
    </div>
  );
};

export default MapView;
