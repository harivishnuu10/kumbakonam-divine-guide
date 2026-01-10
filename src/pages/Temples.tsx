import { useState, useMemo } from "react";
import { MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import SearchBar from "@/components/SearchBar";
import TempleListCard from "@/components/TempleListCard";
import FilterChips from "@/components/FilterChips";

const temples = [
  { id: "adi-kumbeswarar", name: "Adi Kumbeswarar Temple", deity: "Lord Shiva", timings: "6:00 AM - 12:30 PM, 4:00 PM - 9:00 PM", image: "/src/assets/adi-kumbeswarar.jpg", type: "shiva", distance: "0.5 km" },
  { id: "sarangapani", name: "Sarangapani Temple", deity: "Lord Vishnu", timings: "6:00 AM - 12:00 PM, 4:00 PM - 8:00 PM", image: "/src/assets/sarangapani.jpg", type: "vishnu", distance: "0.8 km" },
  { id: "ramaswamy", name: "Ramaswamy Temple", deity: "Lord Rama", timings: "6:00 AM - 12:00 PM, 4:00 PM - 8:00 PM", image: "/src/assets/ramaswamy.jpg", type: "vishnu", distance: "1.2 km" },
  { id: "nageshwara", name: "Nageshwara Temple", deity: "Lord Shiva", timings: "6:00 AM - 12:00 PM, 4:00 PM - 8:00 PM", image: "/src/assets/nageshwara.jpg", type: "shiva", distance: "1.5 km" },
  { id: "chakrapani", name: "Chakrapani Temple", deity: "Lord Vishnu", timings: "6:00 AM - 12:00 PM, 4:00 PM - 8:00 PM", image: "/src/assets/chakrapani.jpg", type: "vishnu", distance: "2.0 km" },
  { id: "kasi-viswanathar", name: "Kasi Viswanathar Temple", deity: "Lord Shiva", timings: "6:00 AM - 12:00 PM, 4:00 PM - 9:00 PM", image: "/src/assets/kasi-viswanathar.jpg", type: "shiva", distance: "1.8 km" },
  { id: "someswarar", name: "Someswarar Temple", deity: "Lord Shiva", timings: "6:00 AM - 12:00 PM, 4:00 PM - 8:00 PM", image: "/src/assets/someswarar.jpg", type: "shiva", distance: "2.2 km" },
  { id: "oppiliappan", name: "Oppiliappan Temple", deity: "Lord Vishnu", timings: "6:30 AM - 12:00 PM, 4:00 PM - 8:30 PM", image: "/src/assets/oppiliappan.jpg", type: "vishnu", distance: "8 km" },
];

const filterOptions = [
  { id: "all", label: "All" },
  { id: "shiva", label: "Shiva" },
  { id: "vishnu", label: "Vishnu" },
  { id: "nearby", label: "< 2km" },
];

const Temples = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");

  const filteredTemples = useMemo(() => {
    let result = temples;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(t => t.name.toLowerCase().includes(q) || t.deity.toLowerCase().includes(q));
    }
    if (selectedFilter === "shiva") result = result.filter(t => t.type === "shiva");
    else if (selectedFilter === "vishnu") result = result.filter(t => t.type === "vishnu");
    else if (selectedFilter === "nearby") result = result.filter(t => parseFloat(t.distance) < 2);
    return result;
  }, [searchQuery, selectedFilter]);

  return (
    <div className="min-h-screen bg-background pb-4">
      <header className="sticky top-0 z-40 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="px-4 py-4">
          <h1 className="text-xl font-bold text-foreground mb-3">Explore Temples</h1>
          <SearchBar placeholder="Search by name, deity..." value={searchQuery} onChange={setSearchQuery} />
        </div>
      </header>
      <main className="px-4 space-y-4 pt-4">
        <FilterChips options={filterOptions} selected={selectedFilter} onChange={setSelectedFilter} />
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">{filteredTemples.length} temples found</span>
        </div>
        <div className="space-y-3">
          {filteredTemples.map((temple, index) => (
            <div key={temple.id} className="animate-slide-up" style={{ animationDelay: `${index * 50}ms` }}>
              <TempleListCard id={temple.id} name={temple.name} deity={temple.deity} timings={temple.timings} image={temple.image} distance={temple.distance} />
            </div>
          ))}
        </div>
        {filteredTemples.length === 0 && (
          <div className="text-center py-12">
            <MapPin className="w-12 h-12 mx-auto text-muted-foreground/50 mb-4" />
            <h3 className="text-lg font-medium text-foreground mb-1">No temples found</h3>
            <Button variant="outline" className="mt-4" onClick={() => { setSearchQuery(""); setSelectedFilter("all"); }}>Clear filters</Button>
          </div>
        )}
      </main>
    </div>
  );
};

export default Temples;
