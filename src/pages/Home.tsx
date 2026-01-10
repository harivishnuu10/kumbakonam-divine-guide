import { useState, useMemo } from "react";
import { MapPin, Clock, Star, Navigation } from "lucide-react";
import { Button } from "@/components/ui/button";
import SearchBar from "@/components/SearchBar";
import TempleListCard from "@/components/TempleListCard";
import FilterChips from "@/components/FilterChips";

// Temple data
const temples = [
  {
    id: "adi-kumbeswarar",
    name: "Adi Kumbeswarar Temple",
    deity: "Lord Shiva",
    description: "One of the most ancient temples in Kumbakonam, built by the Cholas.",
    timings: "6:00 AM - 12:30 PM, 4:00 PM - 9:00 PM",
    image: "/src/assets/adi-kumbeswarar.jpg",
    type: "shiva",
    distance: "0.5 km",
  },
  {
    id: "sarangapani",
    name: "Sarangapani Temple",
    deity: "Lord Vishnu",
    description: "Magnificent Vaishnavite temple with towering gopuram.",
    timings: "6:00 AM - 12:00 PM, 4:00 PM - 8:00 PM",
    image: "/src/assets/sarangapani.jpg",
    type: "vishnu",
    distance: "0.8 km",
  },
  {
    id: "ramaswamy",
    name: "Ramaswamy Temple",
    deity: "Lord Rama",
    description: "Masterpiece of Nayak architecture with stunning frescoes.",
    timings: "6:00 AM - 12:00 PM, 4:00 PM - 8:00 PM",
    image: "/src/assets/ramaswamy.jpg",
    type: "vishnu",
    distance: "1.2 km",
  },
  {
    id: "nageshwara",
    name: "Nageshwara Temple",
    deity: "Lord Shiva",
    description: "Ancient temple famous for Rahu worship and eclipse rituals.",
    timings: "6:00 AM - 12:00 PM, 4:00 PM - 8:00 PM",
    image: "/src/assets/nageshwara.jpg",
    type: "shiva",
    distance: "1.5 km",
  },
  {
    id: "chakrapani",
    name: "Chakrapani Temple",
    deity: "Lord Vishnu",
    description: "One of the Navagraha temples dedicated to Sukran (Venus).",
    timings: "6:00 AM - 12:00 PM, 4:00 PM - 8:00 PM",
    image: "/src/assets/chakrapani.jpg",
    type: "vishnu",
    distance: "2.0 km",
  },
  {
    id: "kasi-viswanathar",
    name: "Kasi Viswanathar Temple",
    deity: "Lord Shiva",
    description: "Known as 'Kashi of the South' with beautiful architecture.",
    timings: "6:00 AM - 12:00 PM, 4:00 PM - 9:00 PM",
    image: "/src/assets/kasi-viswanathar.jpg",
    type: "shiva",
    distance: "1.8 km",
  },
];

const filterOptions = [
  { id: "all", label: "All Temples" },
  { id: "shiva", label: "Shiva Temples" },
  { id: "vishnu", label: "Vishnu Temples" },
  { id: "nearby", label: "Nearby" },
];

const Home = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");

  const filteredTemples = useMemo(() => {
    let result = temples;

    // Apply search
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (t) =>
          t.name.toLowerCase().includes(query) ||
          t.deity.toLowerCase().includes(query)
      );
    }

    // Apply filter
    if (selectedFilter === "shiva") {
      result = result.filter((t) => t.type === "shiva");
    } else if (selectedFilter === "vishnu") {
      result = result.filter((t) => t.type === "vishnu");
    } else if (selectedFilter === "nearby") {
      result = result.sort((a, b) => parseFloat(a.distance) - parseFloat(b.distance));
    }

    return result;
  }, [searchQuery, selectedFilter]);

  const recommendedTemples = temples.slice(0, 3);

  return (
    <div className="min-h-screen bg-background pb-4">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="px-4 py-4">
          <div className="flex items-center justify-between mb-1">
            <div>
              <h1 className="text-xl font-bold text-foreground">
                Temple Guide
              </h1>
              <p className="text-sm text-muted-foreground">
                Kumbakonam, Tamil Nadu
              </p>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="gap-2"
              onClick={() => {
                if (navigator.geolocation) {
                  navigator.geolocation.getCurrentPosition(
                    (pos) => {
                      console.log("Location:", pos.coords);
                    },
                    (err) => console.error(err)
                  );
                }
              }}
            >
              <Navigation className="w-4 h-4" />
              <span className="hidden sm:inline">My Location</span>
            </Button>
          </div>
        </div>
      </header>

      <main className="px-4 space-y-6">
        {/* Search */}
        <section className="pt-4">
          <SearchBar
            placeholder="Search temples, deities..."
            value={searchQuery}
            onChange={setSearchQuery}
          />
        </section>

        {/* Quick Stats */}
        <section className="grid grid-cols-3 gap-3">
          <div className="bg-accent rounded-xl p-3 text-center">
            <div className="text-2xl font-bold text-primary">18+</div>
            <div className="text-xs text-muted-foreground">Temples</div>
          </div>
          <div className="bg-muted rounded-xl p-3 text-center">
            <div className="text-2xl font-bold text-foreground">1000+</div>
            <div className="text-xs text-muted-foreground">Years Old</div>
          </div>
          <div className="bg-muted rounded-xl p-3 text-center">
            <div className="text-2xl font-bold text-foreground">5</div>
            <div className="text-xs text-muted-foreground">UNESCO Sites</div>
          </div>
        </section>

        {/* Filters */}
        <section>
          <FilterChips
            options={filterOptions}
            selected={selectedFilter}
            onChange={setSelectedFilter}
          />
        </section>

        {/* Recommended Section */}
        {!searchQuery && selectedFilter === "all" && (
          <section>
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
                <Star className="w-5 h-5 text-primary" />
                Recommended
              </h2>
            </div>
            <div className="flex gap-4 overflow-x-auto hide-scrollbar pb-2">
              {recommendedTemples.map((temple) => (
                <a
                  key={temple.id}
                  href={`/temple/${temple.id}`}
                  className="flex-shrink-0 w-40 card-hover"
                >
                  <div className="aspect-[4/3] rounded-xl overflow-hidden bg-muted mb-2">
                    <img
                      src={temple.image}
                      alt={temple.name}
                      className="w-full h-full object-cover"
                      loading="lazy"
                      onError={(e) => {
                        e.currentTarget.src = "/placeholder.svg";
                      }}
                    />
                  </div>
                  <h3 className="font-medium text-sm text-foreground truncate">
                    {temple.name}
                  </h3>
                  <p className="text-xs text-muted-foreground">{temple.deity}</p>
                </a>
              ))}
            </div>
          </section>
        )}

        {/* Temple List */}
        <section>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
              <MapPin className="w-5 h-5 text-primary" />
              {searchQuery ? "Search Results" : "All Temples"}
            </h2>
            <span className="text-sm text-muted-foreground">
              {filteredTemples.length} temples
            </span>
          </div>
          <div className="space-y-3">
            {filteredTemples.map((temple) => (
              <TempleListCard
                key={temple.id}
                id={temple.id}
                name={temple.name}
                deity={temple.deity}
                timings={temple.timings}
                image={temple.image}
                distance={temple.distance}
              />
            ))}
          </div>
        </section>

        {/* Empty State */}
        {filteredTemples.length === 0 && (
          <div className="text-center py-12">
            <MapPin className="w-12 h-12 mx-auto text-muted-foreground/50 mb-4" />
            <h3 className="text-lg font-medium text-foreground mb-1">
              No temples found
            </h3>
            <p className="text-muted-foreground">
              Try adjusting your search or filters
            </p>
          </div>
        )}
      </main>
    </div>
  );
};

export default Home;
