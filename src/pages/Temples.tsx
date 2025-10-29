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
    coordinates: { latitude: 10.9601, longitude: 79.3788 }
  },
  {
    id: "sarangapani",
    name: "Sarangapani Temple", 
    deity: "Lord Vishnu",
    description: "One of the 108 sacred Divya Desams, this magnificent Vaishnavite temple features a towering 12-tier gopuram and represents over 1,000 years of continuous worship and architectural evolution.",
    timings: "6:00 AM - 12:00 PM, 4:00 PM - 8:30 PM",
    image: "/src/assets/sarangapani.jpg",
    festivals: ["Vaikunta Ekadasi", "Brahmotsavam", "Garuda Sevai"],
    coordinates: { latitude: 10.9593, longitude: 79.3774 }
  },
  {
    id: "ramaswamy",
    name: "Ramaswamy Temple",
    deity: "Lord Rama",
    description: "A 17th-century Nayak period masterpiece renowned for its exquisite frescoes depicting the complete Ramayana epic. The 'Corridor of Stories' showcases some of India's finest temple art.",
    timings: "6:00 AM - 12:00 PM, 4:00 PM - 8:00 PM",
    image: "/src/assets/ramaswamy.jpg",
    festivals: ["Rama Navami", "Hanuman Jayanti", "Kalyanam Festival"],
    coordinates: { latitude: 10.9586, longitude: 79.3795 }
  },
  {
    id: "nageshwara",
    name: "Nageshwara Temple",
    deity: "Lord Shiva",
    description: "A unique 9th-century temple by Aditya Chola I, famous for its astronomical precision where sunlight illuminates the sanctum only during solar eclipses. Center for Rahu worship and eclipse rituals.",
    timings: "6:00 AM - 12:00 PM, 4:00 PM - 8:00 PM",
    image: "/src/assets/nageshwara.jpg",
    festivals: ["Rahu Kalam Special Poojas", "Solar Eclipse Prayers", "Shivaratri"],
    coordinates: { latitude: 10.9612, longitude: 79.3801 }
  },
  {
    id: "chakrapani",
    name: "Chakrapani Temple",
    deity: "Lord Vishnu",
    description: "Part of the sacred Navagraha temple circuit, this unique shrine combines Vishnu worship with Venus (Sukran) planetary significance. Renowned for its healing properties, especially for diabetes and skin conditions.",
    timings: "6:00 AM - 12:00 PM, 4:00 PM - 8:00 PM",
    image: "/src/assets/hero-temple.jpg",
    festivals: ["Sukran Jayanti", "Navagraha Pooja", "Healing Festival"],
    coordinates: { latitude: 10.9578, longitude: 79.3756 }
  },
  {
    id: "someswarar",
    name: "Someswarar Temple",
    deity: "Lord Shiva",
    description: "Dedicated to Lord Shiva's lunar aspect, this ancient temple specializes in Monday worship and lunar deity rituals. Architectural elements align with lunar cycles for enhanced spiritual energy.",
    timings: "6:00 AM - 12:00 PM, 4:00 PM - 8:00 PM",
    image: "/src/assets/hero-temple.jpg",
    festivals: ["Pradosham", "Kartik Somvar", "Chandra Darshan"],
    coordinates: { latitude: 10.9565, longitude: 79.3743 }
  },
  {
    id: "kasi-viswanathar",
    name: "Kasi Viswanathar Temple",
    deity: "Lord Shiva",
    description: "Known as the 'Kashi of the South,' this ancient temple is believed to grant the same blessings as visiting Varanasi. Features stunning architecture and intricate sculptures from the Nayak period.",
    timings: "6:00 AM - 12:00 PM, 4:00 PM - 9:00 PM",
    image: "/src/assets/hero-temple.jpg",
    festivals: ["Karthigai Deepam", "Annabhishekam", "Shivaratri", "Aani Thirumanjana Utsavam"],
    coordinates: { latitude: 10.9625, longitude: 79.3810 }
  },
  {
    id: "uppiliappan",
    name: "Oppiliappan Temple",
    deity: "Lord Vishnu",
    description: "One of the 108 Divya Desams, this temple is famous for salt-free prasadam offerings. Legend says Goddess Bhumi Devi requested no salt in offerings, making this temple unique across India.",
    timings: "6:30 AM - 12:00 PM, 4:00 PM - 8:00 PM",
    image: "/src/assets/hero-temple.jpg",
    festivals: ["Panguni Uthiram", "Vaikunta Ekadasi", "Pavitrotsavam", "Thirukalyanam"],
    coordinates: { latitude: 10.9890, longitude: 79.3520 }
  },
  {
    id: "airavatesvara",
    name: "Airavateswara Temple",
    deity: "Lord Shiva",
    description: "A UNESCO World Heritage Site built by Raja Raja Chola II in the 12th century. Famous for its musical pillars, intricate stone chariot, and exceptional Chola architecture rivaling Tanjore's Brihadeeshwarar.",
    timings: "6:00 AM - 12:00 PM, 3:00 PM - 6:00 PM",
    image: "/src/assets/hero-temple.jpg",
    festivals: ["Mahamaham", "Arudra Darisanam", "Thai Poosam", "Shivaratri"],
    coordinates: { latitude: 10.9530, longitude: 79.3590 }
  },
  {
    id: "thirunageswaram",
    name: "Thirunageswaram Temple",
    deity: "Lord Shiva",
    description: "One of the nine Navagraha temples dedicated to Rahu. Unique for its underground sanctum where milk abhishekam mysteriously changes color, attracting devotees seeking relief from serpent afflictions.",
    timings: "6:00 AM - 1:00 PM, 4:00 PM - 8:30 PM",
    image: "/src/assets/hero-temple.jpg",
    festivals: ["Rahu Kala Pooja", "Thai Amavasai", "Aadi Pooram", "Panguni Uthiram"],
    coordinates: { latitude: 10.9450, longitude: 79.4010 }
  },
  {
    id: "swamimalai",
    name: "Swamimalai Murugan Temple",
    deity: "Lord Murugan",
    description: "One of the six abodes of Lord Murugan (Arupadai Veedu), perched atop 60 steps representing 60 Tamil years. Here, young Murugan taught the meaning of 'Om' to his father Lord Shiva.",
    timings: "5:30 AM - 12:30 PM, 4:00 PM - 9:00 PM",
    image: "/src/assets/hero-temple.jpg",
    festivals: ["Skanda Sashti", "Vaikasi Visakam", "Thai Poosam", "Panguni Uthiram"],
    coordinates: { latitude: 10.9880, longitude: 79.3350 }
  },
  {
    id: "mahalingeswarar",
    name: "Mahalingeswarar Temple",
    deity: "Lord Shiva",
    description: "An ancient temple featuring one of the largest Shiva Lingas in the region. Known for its massive stone pillars, expansive corridors, and the sacred tank that's part of the Mahamaham circuit.",
    timings: "6:00 AM - 12:30 PM, 4:00 PM - 8:30 PM",
    image: "/src/assets/hero-temple.jpg",
    festivals: ["Mahamaham", "Panguni Uthiram", "Arudra Darisanam", "Vinayaka Chaturthi"],
    coordinates: { latitude: 10.9605, longitude: 79.3725 }
  },
  {
    id: "kalahasteeswarar",
    name: "Kalahasteeswarar Temple",
    deity: "Lord Shiva",
    description: "Famous for Rahu-Ketu worship and known as the 'Dakshina Kailasam.' Devotees come here to perform special poojas for nullifying astrological doshas related to serpent worship and planetary afflictions.",
    timings: "6:00 AM - 12:00 PM, 4:00 PM - 8:00 PM",
    image: "/src/assets/hero-temple.jpg",
    festivals: ["Rahu Ketu Pooja", "Mahamaham", "Arudra Darisanam", "Shivaratri"],
    coordinates: { latitude: 10.9555, longitude: 79.3770 }
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
    <div className="min-h-screen bg-background py-8 animate-slide-up">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8 animate-scale-in">
          <h1 className="text-4xl font-bold text-gradient mb-4 animate-float">
            Sacred Temples of Kumbakonam
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Discover the divine heritage of Tamil Nadu through our collection of ancient temples,
            each with unique architecture, rich history, and spiritual significance.
          </p>
        </div>

        {/* Search and Filters */}
        <div className="glass rounded-lg shadow-temple p-6 mb-8 border border-primary/20 animate-reveal">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search Bar */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search temples, deities, festivals..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-background/50 backdrop-blur-sm border-primary/30 focus:border-primary transition-all"
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
                    className={`cursor-pointer transition-all hover:scale-105 ${
                      selectedDeity === deity 
                        ? "bg-gradient-temple text-primary-foreground shadow-temple animate-pulse-glow" 
                        : "hover:bg-secondary hover:shadow-soft"
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
          <div className="mt-4 text-sm text-muted-foreground flex items-center">
            <MapPin className="inline w-4 h-4 mr-1 text-temple-red animate-pulse" />
            Found {filteredTemples.length} temples
          </div>
        </div>

        {/* Temple Grid - Mobile-first responsive design with staggered animations */}
        {filteredTemples.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            {filteredTemples.map((temple, index) => (
              <div 
                key={temple.id} 
                className="animate-reveal"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <TempleCard {...temple} />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 animate-scale-in">
            <MapPin className="w-16 h-16 mx-auto text-muted-foreground mb-4 animate-float" />
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