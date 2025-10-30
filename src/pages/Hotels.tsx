import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, Star, MapPin } from "lucide-react";
import HotelCard from "@/components/HotelCard";
import { Hotel, hotelService } from "@/lib/supabase";
import { useLanguage } from "@/hooks/useLanguage";

// Sample hotel data until Supabase is configured
const sampleHotels: Hotel[] = [
  {
    id: "grand-kumbakonam",
    name: "Hotel Grand Kumbakonam",
    name_tamil: "ஹோட்டல் கிராண்ட் கும்பகோணம்",
    description: "Premium hotel with modern amenities and traditional hospitality. Located in the heart of Kumbakonam with easy access to all major temples.",
    description_tamil: "நவீன வசதிகள் மற்றும் பாரம்பரிய விருந்தோம்பலுடன் கூடிய பிரீமியம் ஹோட்டல்.",
    address: "123 T.S.R Big Street, Kumbakonam, Tamil Nadu 612001",
    latitude: 10.9595,
    longitude: 79.3797,
    phone: "+91 435 242 5000",
    email: "info@grandkumbakonam.com",
    website: "https://grandkumbakonam.com",
    price_range: "₹3,000 - ₹5,000",
    rating: 4,
    amenities: ["wifi", "parking", "restaurant", "ac", "room-service"],
    images: ["/src/assets/hotel-grand-kumbakonam.jpg"],
    room_types: [
      {
        type: "Deluxe Room",
        price: 3000,
        description: "Comfortable room with modern amenities",
        amenities: ["ac", "wifi", "tv"]
      }
    ],
    created_at: "2024-01-01T00:00:00Z",
    updated_at: "2024-01-01T00:00:00Z"
  },
  {
    id: "temple-view-inn",
    name: "Temple View Inn",
    name_tamil: "டெம்பிள் வியூ இன்",
    description: "Budget-friendly accommodation with beautiful temple views. Clean rooms and friendly service make this a perfect choice for pilgrims.",
    description_tamil: "அழகான கோயில் காட்சிகளுடன் பட்ஜெட் நட்பு தங்குமிடம்.",
    address: "45 Sarangapani Street, Kumbakonam, Tamil Nadu 612001",
    latitude: 10.9587,
    longitude: 79.3778,
    phone: "+91 435 242 3000",
    email: "info@templeviewinn.com",
    price_range: "₹1,500 - ₹2,500",
    rating: 3,
    amenities: ["wifi", "parking", "restaurant"],
    images: ["/src/assets/temple-view-inn.jpg"],
    room_types: [
      {
        type: "Standard Room",
        price: 1500,
        description: "Clean and comfortable basic room",
        amenities: ["fan", "wifi"]
      }
    ],
    created_at: "2024-01-01T00:00:00Z",
    updated_at: "2024-01-01T00:00:00Z"
  },
  {
    id: "heritage-palace",
    name: "Heritage Palace Hotel",
    name_tamil: "ஹெரிடேஜ் பாலேஸ் ஹோட்டல்",
    description: "Luxury hotel in a restored heritage building. Experience royal hospitality with modern comforts in this architectural gem.",
    description_tamil: "மறுசீரமைக்கப்பட்ட பாரம்பரிய கட்டிடத்தில் அமைந்த ஆடம்பர ஹோட்டல்.",
    address: "78 Big Street, Kumbakonam, Tamil Nadu 612001",
    latitude: 10.9603,
    longitude: 79.3785,
    phone: "+91 435 242 7000",
    email: "info@heritagepalace.com",
    website: "https://heritagepalace.com",
    price_range: "₹5,000 - ₹8,000",
    rating: 5,
    amenities: ["wifi", "parking", "restaurant", "spa", "pool", "gym"],
    images: ["/src/assets/heritage-palace.jpg"],
    room_types: [
      {
        type: "Heritage Suite",
        price: 8000,
        description: "Luxurious suite with traditional decor",
        amenities: ["ac", "wifi", "minibar", "balcony"]
      }
    ],
    created_at: "2024-01-01T00:00:00Z",
    updated_at: "2024-01-01T00:00:00Z"
  }
];

const priceFilters = ["All", "Budget (₹1,000-₹2,500)", "Mid-range (₹2,500-₹5,000)", "Luxury (₹5,000+)"];
const ratingFilters = ["All", "5 Star", "4 Star", "3 Star"];

const Hotels = () => {
  const [hotels, setHotels] = useState<Hotel[]>(sampleHotels);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPrice, setSelectedPrice] = useState("All");
  const [selectedRating, setSelectedRating] = useState("All");
  const [loading, setLoading] = useState(false);
  const { t } = useLanguage();

  // Load hotels from Supabase (when configured)
  useEffect(() => {
    const loadHotels = async () => {
      setLoading(true);
      try {
        const data = await hotelService.getAll();
        if (data.length > 0) {
          setHotels(data);
        }
      } catch (error) {
        console.error('Failed to load hotels:', error);
        // Use sample data as fallback
      } finally {
        setLoading(false);
      }
    };

    loadHotels();
  }, []);

  const filteredHotels = hotels.filter((hotel) => {
    const matchesSearch = hotel.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         hotel.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         hotel.address.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesPrice = selectedPrice === "All" || 
      (selectedPrice.includes("Budget") && hotel.price_range.includes("1,") || hotel.price_range.includes("2,")) ||
      (selectedPrice.includes("Mid-range") && (hotel.price_range.includes("3,") || hotel.price_range.includes("4,"))) ||
      (selectedPrice.includes("Luxury") && (hotel.price_range.includes("5,") || hotel.price_range.includes("6,") || hotel.price_range.includes("7,") || hotel.price_range.includes("8,")));
    
    const matchesRating = selectedRating === "All" || 
      hotel.rating.toString() === selectedRating.charAt(0);
    
    return matchesSearch && matchesPrice && matchesRating;
  });

  return (
    <div className="min-h-screen bg-background py-8 animate-slide-up">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8 animate-scale-in">
          <h1 className="text-4xl font-bold text-gradient mb-4 animate-float">
            {t('hotels')} in Kumbakonam
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Comfortable stays near sacred temples. From budget-friendly options to luxury accommodations,
            find the perfect place for your spiritual journey.
          </p>
        </div>

        {/* Search and Filters */}
        <div className="glass rounded-lg shadow-temple p-6 mb-8 border border-primary/20 animate-reveal">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search Bar */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder={`${t('search')} hotels, locations, amenities...`}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Filters */}
            <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-4">
              <div className="flex items-center space-x-2">
                <Filter className="text-muted-foreground w-4 h-4" />
                <span className="text-sm text-muted-foreground">{t('priceRange')}:</span>
                <div className="flex flex-wrap gap-1">
                  {priceFilters.map((price) => (
                    <Badge
                      key={price}
                      variant={selectedPrice === price ? "default" : "outline"}
                      className={`cursor-pointer transition-temple text-xs ${
                        selectedPrice === price 
                          ? "bg-gradient-gold text-foreground shadow-gold" 
                          : "hover:bg-secondary"
                      }`}
                      onClick={() => setSelectedPrice(price)}
                    >
                      {price}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Star className="text-muted-foreground w-4 h-4" />
                <span className="text-sm text-muted-foreground">{t('rating')}:</span>
                <div className="flex flex-wrap gap-1">
                  {ratingFilters.map((rating) => (
                    <Badge
                      key={rating}
                      variant={selectedRating === rating ? "default" : "outline"}
                      className={`cursor-pointer transition-temple text-xs ${
                        selectedRating === rating 
                          ? "bg-gradient-temple text-primary-foreground shadow-temple" 
                          : "hover:bg-secondary"
                      }`}
                      onClick={() => setSelectedRating(rating)}
                    >
                      {rating}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Results Count */}
          <div className="mt-4 text-sm text-muted-foreground">
            <MapPin className="inline w-4 h-4 mr-1" />
            Found {filteredHotels.length} hotels
          </div>
        </div>

        {/* Hotel Grid */}
        {loading ? (
          <div className="text-center py-16">
            <div className="animate-spin w-8 h-8 border-2 border-temple-saffron border-t-transparent rounded-full mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading hotels...</p>
          </div>
        ) : filteredHotels.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredHotels.map((hotel) => (
              <HotelCard key={hotel.id} {...hotel} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <MapPin className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-xl font-semibold text-foreground mb-2">No hotels found</h3>
            <p className="text-muted-foreground">
              Try adjusting your search terms or filters to find more accommodations.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Hotels;