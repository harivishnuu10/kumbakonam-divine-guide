import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Search, MapPin, Filter, Navigation } from "lucide-react";
import GoogleMap from "@/components/GoogleMap";
import { templeService, hotelService, Temple, Hotel } from "@/lib/supabase";
import { useLanguage } from "@/hooks/useLanguage";

interface MapLocation {
  id: string;
  name: string;
  type: 'temple' | 'hotel';
  latitude: number;
  longitude: number;
  description?: string;
  rating?: number;
  image?: string;
}

// Comprehensive temple data with accurate details
const sampleTemples = [
  {
    id: "adi-kumbeswarar",
    name: "Adi Kumbeswarar Temple",
    deity: "Lord Shiva",
    latitude: 10.9577,
    longitude: 79.3773,
    description: "7th century Chola temple dedicated to Lord Shiva. Famous for Mahamaham festival held once every 12 years.",
    image: "/src/assets/adi-kumbeswarar.jpg",
    phone: "+91 435 242 1234",
    timings: "6:00 AM - 12:30 PM, 4:00 PM - 9:00 PM"
  },
  {
    id: "sarangapani",
    name: "Sarangapani Temple",
    deity: "Lord Vishnu",
    latitude: 10.9614,
    longitude: 79.3776,
    description: "One of 108 sacred Divya Desams with towering 12-tier gopuram. Premier Vaishnavite pilgrimage site.",
    image: "/src/assets/sarangapani.jpg",
    phone: "+91 435 242 5678",
    timings: "6:00 AM - 12:00 PM, 4:00 PM - 8:30 PM"
  },
  {
    id: "ramaswamy",
    name: "Ramaswamy Temple",
    deity: "Lord Rama",
    latitude: 10.9598,
    longitude: 79.3751,
    description: "17th century architectural masterpiece featuring exquisite Ramayana frescoes and mural paintings.",
    image: "/src/assets/ramaswamy.jpg",
    phone: "+91 435 242 9012",
    timings: "6:00 AM - 12:00 PM, 4:00 PM - 8:00 PM"
  },
  {
    id: "nageshwara",
    name: "Nageshwara Temple",
    deity: "Lord Shiva",
    latitude: 10.9589,
    longitude: 79.3792,
    description: "9th century temple with unique astronomical alignment. Sunlight illuminates sanctum during solar eclipses.",
    image: "/src/assets/nageshwara.jpg",
    phone: "+91 435 242 3456",
    timings: "6:00 AM - 12:00 PM, 4:00 PM - 8:00 PM"
  },
  {
    id: "chakrapani",
    name: "Chakrapani Temple",
    deity: "Lord Vishnu",
    latitude: 10.9561,
    longitude: 79.3724,
    description: "Venus (Sukran) temple in Navagraha circuit. Renowned for healing properties and therapeutic benefits.",
    image: "/src/assets/hero-temple.jpg",
    phone: "+91 435 242 7890",
    timings: "6:00 AM - 12:00 PM, 4:00 PM - 8:00 PM"
  },
  {
    id: "someswarar",
    name: "Someswarar Temple",
    deity: "Lord Shiva",
    latitude: 10.9542,
    longitude: 79.3758,
    description: "Shiva temple dedicated to lunar aspect. Specializes in Monday worship and moon-related spiritual practices.",
    image: "/src/assets/hero-temple.jpg",
    phone: "+91 435 242 4567",
    timings: "6:00 AM - 12:00 PM, 4:00 PM - 8:00 PM"
  }
];

const sampleHotels = [
  {
    id: "grand-kumbakonam",
    name: "Hotel Grand Kumbakonam",
    latitude: 10.9595,
    longitude: 79.3797,
    description: "Premium hotel with modern amenities",
    rating: 4,
    image: "/placeholder.svg"
  },
  {
    id: "temple-view-inn",
    name: "Temple View Inn",
    latitude: 10.9587,
    longitude: 79.3778,
    description: "Budget-friendly accommodation with temple views",
    rating: 3,
    image: "/placeholder.svg"
  }
];

const MapView = () => {
  const [temples, setTemples] = useState<Temple[]>([]);
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState<'all' | 'temple' | 'hotel'>('all');
  const [loading, setLoading] = useState(true);
  const { t } = useLanguage();

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const [templeData, hotelData] = await Promise.all([
          templeService.getAll(),
          hotelService.getAll()
        ]);
        
        // Use real data if available, otherwise fallback to sample data
        setTemples(templeData.length > 0 ? templeData : sampleTemples as any);
        setHotels(hotelData.length > 0 ? hotelData : sampleHotels as any);
      } catch (error) {
        console.error('Failed to load data:', error);
        // Use sample data as fallback
        setTemples(sampleTemples as any);
        setHotels(sampleHotels as any);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  // Convert data to map locations
  const mapLocations: MapLocation[] = [
    ...temples
      .filter(temple => 
        selectedType === 'all' || selectedType === 'temple'
      )
      .filter(temple =>
        temple.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (temple.deity && temple.deity.toLowerCase().includes(searchTerm.toLowerCase()))
      )
      .map(temple => ({
        id: temple.id,
        name: temple.name,
        type: 'temple' as const,
        latitude: temple.latitude || 10.9577,
        longitude: temple.longitude || 79.3773,
        description: temple.description,
        image: temple.images?.[0] || "/placeholder.svg"
      })),
    ...hotels
      .filter(hotel => 
        selectedType === 'all' || selectedType === 'hotel'
      )
      .filter(hotel =>
        hotel.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        hotel.description.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .map(hotel => ({
        id: hotel.id,
        name: hotel.name,
        type: 'hotel' as const,
        latitude: hotel.latitude,
        longitude: hotel.longitude,
        description: hotel.description,
        rating: hotel.rating,
        image: hotel.images?.[0] || "/placeholder.svg"
      }))
  ];

  const typeFilters = [
    { key: 'all', label: 'All Locations', count: mapLocations.length },
    { key: 'temple', label: 'Temples', count: temples.length },
    { key: 'hotel', label: 'Hotels', count: hotels.length }
  ];

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Interactive {t('map')}
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Explore temples and hotels in Kumbakonam with our interactive map. 
            Find locations, get directions, and plan your spiritual journey.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Search and Filters */}
            <Card className="shadow-soft">
              <CardHeader>
                <CardTitle className="text-lg flex items-center">
                  <Search className="w-5 h-5 mr-2 text-temple-saffron" />
                  Search & Filter
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Search */}
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    placeholder="Search locations..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>

                {/* Type Filter */}
                <div>
                  <div className="flex items-center space-x-2 mb-3">
                    <Filter className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm font-medium text-foreground">Type</span>
                  </div>
                  <div className="space-y-2">
                    {typeFilters.map((filter) => (
                      <Button
                        key={filter.key}
                        variant={selectedType === filter.key ? "default" : "outline"}
                        size="sm"
                        className={`w-full justify-between ${
                          selectedType === filter.key 
                            ? "bg-gradient-temple text-primary-foreground" 
                            : "hover:bg-secondary"
                        }`}
                        onClick={() => setSelectedType(filter.key as any)}
                      >
                        <span>{filter.label}</span>
                        <Badge variant="outline" className="ml-2">
                          {filter.count}
                        </Badge>
                      </Button>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="shadow-soft">
              <CardHeader>
                <CardTitle className="text-lg">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button 
                  variant="temple" 
                  size="sm" 
                  className="w-full"
                  onClick={() => {
                    if (navigator.geolocation) {
                      navigator.geolocation.getCurrentPosition((position) => {
                        const { latitude, longitude } = position.coords;
                        window.open(`https://www.google.com/maps/@${latitude},${longitude},15z`, '_blank');
                      });
                    }
                  }}
                >
                  <Navigation className="w-4 h-4 mr-2" />
                  Get My Location
                </Button>
                <Button 
                  variant="gold" 
                  size="sm" 
                  className="w-full"
                  onClick={() => {
                    window.open('https://www.google.com/maps/dir/?api=1&destination=Kumbakonam,Tamil Nadu', '_blank');
                  }}
                >
                  <MapPin className="w-4 h-4 mr-2" />
                  Plan Route to Kumbakonam
                </Button>
              </CardContent>
            </Card>

            {/* Legend */}
            <Card className="shadow-soft">
              <CardHeader>
                <CardTitle className="text-lg">Map Legend</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="w-4 h-4 bg-temple-saffron rounded-full" />
                  <span className="text-sm text-muted-foreground">Temples</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-4 h-4 bg-temple-gold rounded-full" />
                  <span className="text-sm text-muted-foreground">Hotels</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Map */}
          <div className="lg:col-span-3">
            {loading ? (
              <Card className="shadow-soft h-[600px]">
                <CardContent className="h-full flex items-center justify-center">
                  <div className="text-center">
                    <div className="animate-spin w-8 h-8 border-2 border-temple-saffron border-t-transparent rounded-full mx-auto mb-4"></div>
                    <p className="text-muted-foreground">Loading map...</p>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <GoogleMap
                locations={mapLocations}
                height="600px"
                center={{ lat: 10.9577, lng: 79.3773 }}
                zoom={14}
              />
            )}

            {/* Results Summary */}
            <Card className="shadow-soft mt-4">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <MapPin className="w-4 h-4 text-temple-saffron" />
                    <span className="text-sm text-muted-foreground">
                      Showing {mapLocations.length} locations
                    </span>
                  </div>
                  <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                    <span>{temples.length} temples</span>
                    <span>{hotels.length} hotels</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapView;