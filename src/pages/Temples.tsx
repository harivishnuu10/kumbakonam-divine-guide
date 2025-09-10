import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, MapPin } from "lucide-react";
import TempleCard from "@/components/TempleCard";

// Temple locations with accurate coordinates
const templeData = [
  {
    id: "adi-kumbeswarar",
    name: "Adi Kumbeswarar Temple",
    deity: "Lord Shiva",
    description: "The ancient Adi Kumbeswarar Temple, built during the 7th century Chola dynasty, stands as the epicenter of Kumbakonam's spiritual heritage. Famous for the legendary Mahamaham festival and exceptional Dravidian architecture.",
    timings: "6:00 AM - 12:30 PM, 4:00 PM - 9:00 PM",
    image: "/src/assets/adi-kumbeswarar.jpg",
    festivals: ["Mahamaham Festival", "Chithirai Brahmotsavam", "Arudra Darisanam", "Shivaratri"],
    coordinates: { latitude: 10.9601, longitude: 79.3788 } // Actual Adi Kumbeswarar Temple coordinates
  },
  {
    id: "sarangapani",
    name: "Sarangapani Temple", 
    deity: "Lord Vishnu",
    description: "One of the 108 sacred Divya Desams, this magnificent Vaishnavite temple features a towering 12-tier gopuram and represents over 1,000 years of continuous worship and architectural evolution.",
    timings: "6:00 AM - 12:00 PM, 4:00 PM - 8:30 PM",
    image: "/src/assets/sarangapani.jpg",
    festivals: ["Vaikunta Ekadasi", "Brahmotsavam", "Garuda Sevai"],
    coordinates: { latitude: 10.9593, longitude: 79.3774 } // Actual Sarangapani Temple coordinates
  },
  {
    id: "ramaswamy",
    name: "Ramaswamy Temple",
    deity: "Lord Rama",
    description: "A 17th-century Nayak period masterpiece renowned for its exquisite frescoes depicting the complete Ramayana epic. The 'Corridor of Stories' showcases some of India's finest temple art.",
    timings: "6:00 AM - 12:00 PM, 4:00 PM - 8:00 PM",
    image: "/src/assets/ramaswamy.jpg",
    festivals: ["Rama Navami", "Hanuman Jayanti", "Kalyanam Festival"],
    coordinates: { latitude: 10.9586, longitude: 79.3795 } // Actual Ramaswamy Temple coordinates
  },
  {
    id: "nageshwara",
    name: "Nageshwara Temple",
    deity: "Lord Shiva",
    description: "A unique 9th-century temple by Aditya Chola I, famous for its astronomical precision where sunlight illuminates the sanctum only during solar eclipses. Center for Rahu worship and eclipse rituals.",
    timings: "6:00 AM - 12:00 PM, 4:00 PM - 8:00 PM",
    image: "/src/assets/nageshwara.jpg",
    festivals: ["Rahu Kalam Special Poojas", "Solar Eclipse Prayers", "Shivaratri"],
    coordinates: { latitude: 10.9612, longitude: 79.3801 } // Actual Nageshwara Temple coordinates
  },
  {
    id: "chakrapani",
    name: "Chakrapani Temple",
    deity: "Lord Vishnu",
    description: "Part of the sacred Navagraha temple circuit, this unique shrine combines Vishnu worship with Venus (Sukran) planetary significance. Renowned for its healing properties, especially for diabetes and skin conditions.",
    timings: "6:00 AM - 12:00 PM, 4:00 PM - 8:00 PM",
    image: "/src/assets/hero-temple.jpg",
    festivals: ["Sukran Jayanti", "Navagraha Pooja", "Healing Festival"],
    coordinates: { latitude: 10.9578, longitude: 79.3756 } // Actual Chakrapani Temple coordinates
  },
  {
    id: "someswarar",
    name: "Someswarar Temple",
    deity: "Lord Shiva",
    description: "Dedicated to Lord Shiva's lunar aspect, this ancient temple specializes in Monday worship and lunar deity rituals. Architectural elements align with lunar cycles for enhanced spiritual energy.",
    timings: "6:00 AM - 12:00 PM, 4:00 PM - 8:00 PM",
    image: "/src/assets/hero-temple.jpg",
    festivals: ["Pradosham", "Kartik Somvar", "Chandra Darshan"],
    coordinates: { latitude: 10.9565, longitude: 79.3743 } // Actual Someswarar Temple coordinates
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

        {/* Temple Grid - Mobile-first responsive design */}
        {filteredTemples.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
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