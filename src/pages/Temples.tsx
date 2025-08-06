import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, MapPin } from "lucide-react";
import TempleCard from "@/components/TempleCard";

// Extended temple data for the listing page
const templeData = [
  {
    id: "adi-kumbeswarar",
    name: "Adi Kumbeswarar Temple",
    deity: "Lord Shiva",
    description: "One of the most ancient temples in Kumbakonam, built by the Cholas. Famous for its magnificent architecture and spiritual significance.",
    timings: "6:00 AM - 12:30 PM, 4:00 PM - 9:00 PM",
    image: "/placeholder.svg",
    festivals: ["Mahamaham", "Chithirai", "Arudra Darisanam"]
  },
  {
    id: "sarangapani",
    name: "Sarangapani Temple", 
    deity: "Lord Vishnu",
    description: "A magnificent Vaishnavite temple known for its towering gopuram and intricate carvings. One of the 108 Divya Desams.",
    timings: "6:00 AM - 12:00 PM, 4:00 PM - 8:00 PM",
    image: "/placeholder.svg",
    festivals: ["Brahmotsavam", "Vaikunta Ekadasi"]
  },
  {
    id: "ramaswamy",
    name: "Ramaswamy Temple",
    deity: "Lord Rama",
    description: "Dedicated to Lord Rama, this temple showcases exquisite Nayak period architecture with beautiful paintings and sculptures.",
    timings: "6:00 AM - 12:00 PM, 4:00 PM - 8:00 PM",
    image: "/placeholder.svg",
    festivals: ["Rama Navami", "Hanuman Jayanti"]
  },
  {
    id: "nageshwara",
    name: "Nageshwara Temple",
    deity: "Lord Shiva",
    description: "Ancient temple known for its association with Rahu worship and eclipse rituals. Features unique serpent sculptures.",
    timings: "6:00 AM - 12:00 PM, 4:00 PM - 8:00 PM",
    image: "/placeholder.svg",
    festivals: ["Rahu Kalam Poojas", "Shivaratri"]
  },
  {
    id: "chakrapani",
    name: "Chakrapani Temple",
    deity: "Lord Vishnu",
    description: "One of the nine Navagraha temples, dedicated to Sukran (Venus). Known for healing properties and astrological significance.",
    timings: "6:00 AM - 12:00 PM, 4:00 PM - 8:00 PM",
    image: "/placeholder.svg",
    festivals: ["Sukran Jayanti", "Navagraha Pooja"]
  },
  {
    id: "someswarar",
    name: "Someswarar Temple",
    deity: "Lord Shiva",
    description: "Temple dedicated to Lord Shiva in his moon form. Important for Monday prayers and special moon-related rituals.",
    timings: "6:00 AM - 12:00 PM, 4:00 PM - 8:00 PM",
    image: "/placeholder.svg",
    festivals: ["Pradosham", "Kartik Somvar"]
  }
];

const deityFilters = ["All", "Lord Shiva", "Lord Vishnu", "Lord Rama", "Navagraha"];

const Temples = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDeity, setSelectedDeity] = useState("All");

  const filteredTemples = templeData.filter((temple) => {
    const matchesSearch = temple.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         temple.deity.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         temple.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesDeity = selectedDeity === "All" || temple.deity === selectedDeity;
    
    return matchesSearch && matchesDeity;
  });

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Sacred Temples of Kumbakonam
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Discover the divine heritage of Tamil Nadu through our collection of ancient temples,
            each with unique architecture, rich history, and spiritual significance.
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-card rounded-lg shadow-soft p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search Bar */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search temples, deities, festivals..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Deity Filter */}
            <div className="flex items-center space-x-2">
              <Filter className="text-muted-foreground w-4 h-4" />
              <div className="flex flex-wrap gap-2">
                {deityFilters.map((deity) => (
                  <Badge
                    key={deity}
                    variant={selectedDeity === deity ? "default" : "outline"}
                    className={`cursor-pointer transition-temple ${
                      selectedDeity === deity 
                        ? "bg-gradient-temple text-primary-foreground shadow-temple" 
                        : "hover:bg-secondary"
                    }`}
                    onClick={() => setSelectedDeity(deity)}
                  >
                    {deity}
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          {/* Results Count */}
          <div className="mt-4 text-sm text-muted-foreground">
            <MapPin className="inline w-4 h-4 mr-1" />
            Found {filteredTemples.length} temples
          </div>
        </div>

        {/* Temple Grid */}
        {filteredTemples.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredTemples.map((temple) => (
              <TempleCard key={temple.id} {...temple} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <MapPin className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-xl font-semibold text-foreground mb-2">No temples found</h3>
            <p className="text-muted-foreground">
              Try adjusting your search terms or filters to find more temples.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Temples;