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
    description: "Premium hotel with modern amenities and traditional hospitality. Located in the heart of Kumbakonam with easy access to all major temples. Features spacious AC rooms, multi-cuisine restaurant, conference facilities, and 24/7 room service.",
    description_tamil: "நவீன வசதிகள் மற்றும் பாரம்பரிய விருந்தோம்பலுடன் கூடிய பிரீமியம் ஹோட்டல். விசாலமான ஏசி அறைகள், மல்டி-கசின் உணவகம், மாநாட்டு வசதிகள் மற்றும் 24/7 அறை சேவை.",
    address: "No. 32, T.S.R. Big Street, Near Adi Kumbeswarar Temple, Kumbakonam, Tamil Nadu 612001",
    latitude: 10.9595,
    longitude: 79.3797,
    phone: "+91 435 242 5000",
    email: "reservations@grandkumbakonam.com",
    website: "https://grandkumbakonam.com",
    price_range: "₹3,000 - ₹5,000",
    rating: 4,
    amenities: ["wifi", "parking", "restaurant", "ac", "room-service", "laundry", "conference-room"],
    images: ["/src/assets/hotel-grand-kumbakonam.jpg"],
    room_types: [
      {
        type: "Deluxe AC Room",
        price: 3000,
        description: "Spacious room with queen bed, AC, modern bathroom, and work desk",
        amenities: ["ac", "wifi", "tv", "minibar", "hot-water"]
      },
      {
        type: "Executive Suite",
        price: 5000,
        description: "Large suite with separate living area, premium furnishings, and temple view",
        amenities: ["ac", "wifi", "tv", "minibar", "balcony", "sofa"]
      }
    ],
    created_at: "2024-01-01T00:00:00Z",
    updated_at: "2024-01-01T00:00:00Z"
  },
  {
    id: "temple-view-inn",
    name: "Temple View Inn",
    name_tamil: "டெம்பிள் வியூ இன்",
    description: "Budget-friendly accommodation with beautiful temple views. Clean rooms, friendly service, and authentic local atmosphere make this a perfect choice for pilgrims. Walking distance to Sarangapani Temple and main market area.",
    description_tamil: "அழகான கோயில் காட்சிகளுடன் பட்ஜெட் நட்பு தங்குமிடம். சுத்தமான அறைகள், நட்பு சேவை மற்றும் உண்மையான உள்ளூர் சூழல் யாத்ரீகர்களுக்கு சிறந்த தேர்வாகும்.",
    address: "No. 45, Sarangapani East Street, Kumbakonam, Tamil Nadu 612001",
    latitude: 10.9587,
    longitude: 79.3778,
    phone: "+91 435 242 3000",
    email: "contact@templeviewinn.com",
    price_range: "₹1,200 - ₹2,500",
    rating: 3,
    amenities: ["wifi", "parking", "restaurant", "laundry"],
    images: ["/src/assets/temple-view-inn.jpg"],
    room_types: [
      {
        type: "Standard Fan Room",
        price: 1200,
        description: "Basic comfortable room with fan and attached bathroom",
        amenities: ["fan", "wifi", "hot-water"]
      },
      {
        type: "AC Room",
        price: 2000,
        description: "Air-conditioned room with TV and modern amenities",
        amenities: ["ac", "wifi", "tv", "hot-water"]
      }
    ],
    created_at: "2024-01-01T00:00:00Z",
    updated_at: "2024-01-01T00:00:00Z"
  },
  {
    id: "heritage-palace",
    name: "Heritage Palace Hotel",
    name_tamil: "ஹெரிடேஜ் பாலேஸ் ஹோட்டல்",
    description: "Luxury hotel in a restored heritage building from the Nayak period. Experience royal hospitality with modern comforts in this architectural gem. Features include a rooftop restaurant, spa, swimming pool, and traditional courtyard.",
    description_tamil: "நாயக்கர் காலத்தின் மறுசீரமைக்கப்பட்ட பாரம்பரிய கட்டிடத்தில் அமைந்த ஆடம்பர ஹோட்டல். கூரை மேல் உணவகம், ஸ்பா, நீச்சல் குளம் மற்றும் பாரம்பரிய முற்றம்.",
    address: "No. 78-82, Big Street, Kumbakonam, Tamil Nadu 612001",
    latitude: 10.9603,
    longitude: 79.3785,
    phone: "+91 435 242 7000",
    email: "reservations@heritagepalace.com",
    website: "https://heritagepalace.com",
    price_range: "₹5,000 - ₹10,000",
    rating: 5,
    amenities: ["wifi", "parking", "restaurant", "spa", "pool", "gym", "ac", "room-service", "bar"],
    images: ["/src/assets/heritage-palace.jpg"],
    room_types: [
      {
        type: "Heritage Room",
        price: 5500,
        description: "Elegantly designed room with traditional Tamil Nadu architecture and modern amenities",
        amenities: ["ac", "wifi", "tv", "minibar", "safe"]
      },
      {
        type: "Royal Suite",
        price: 10000,
        description: "Luxurious suite with antique furnishings, courtyard view, private balcony, and butler service",
        amenities: ["ac", "wifi", "tv", "minibar", "balcony", "jacuzzi", "butler"]
      }
    ],
    created_at: "2024-01-01T00:00:00Z",
    updated_at: "2024-01-01T00:00:00Z"
  },
  {
    id: "raya-paradise",
    name: "Hotel Raya's Paradise",
    name_tamil: "ஹோட்டல் ராயாஸ் பாரடைஸ்",
    description: "Mid-range hotel known for its excellent Chettinad cuisine and warm hospitality. Conveniently located near railway station and bus stand. Perfect for both business and leisure travelers with well-appointed rooms and conference facilities.",
    description_tamil: "சிறந்த செட்டிநாடு உணவு மற்றும் அன்பான விருந்தோம்பலுக்கு பெயர் பெற்ற நடுத்தர வரம்பு ஹோட்டல். ரயில் நிலையம் மற்றும் பேருந்து நிலையத்திற்கு அருகில் வசதியாக அமைந்துள்ளது.",
    address: "No. 15, Head Post Office Road, Kumbakonam, Tamil Nadu 612001",
    latitude: 10.9580,
    longitude: 79.3820,
    phone: "+91 435 242 4500",
    email: "info@rayasparadise.com",
    website: "https://rayasparadise.com",
    price_range: "₹2,500 - ₹4,500",
    rating: 4,
    amenities: ["wifi", "parking", "restaurant", "ac", "room-service", "conference-room", "laundry"],
    images: ["/src/assets/heritage-palace.jpg"],
    room_types: [
      {
        type: "Superior Room",
        price: 2800,
        description: "Comfortable AC room with modern amenities and city view",
        amenities: ["ac", "wifi", "tv", "hot-water", "work-desk"]
      },
      {
        type: "Premium Room",
        price: 4200,
        description: "Spacious room with premium bedding and sitting area",
        amenities: ["ac", "wifi", "tv", "minibar", "sofa", "balcony"]
      }
    ],
    created_at: "2024-01-01T00:00:00Z",
    updated_at: "2024-01-01T00:00:00Z"
  },
  {
    id: "pandian-guesthouse",
    name: "Pandian Guesthouse",
    name_tamil: "பாண்டியன் கெஸ்ட் ஹவுஸ்",
    description: "Economical guesthouse ideal for budget travelers and pilgrims. Clean, simple rooms with basic amenities. Family-run establishment offering home-cooked meals on request. Located in a quiet residential area, 10 minutes walk from Adi Kumbeswarar Temple.",
    description_tamil: "பட்ஜெட் பயணிகள் மற்றும் யாத்ரீகர்களுக்கு ஏற்ற மலிவு விடுதி. சுத்தமான, எளிய அறைகள் அடிப்படை வசதிகளுடன். குடும்பத்தால் நடத்தப்படும் நிறுவனம் கோரிக்கையின் பேரில் வீட்டில் சமைத்த உணவை வழங்குகிறது.",
    address: "No. 22, Kumaran Koil Street, Kumbakonam, Tamil Nadu 612001",
    latitude: 10.9610,
    longitude: 79.3760,
    phone: "+91 435 242 1800",
    email: "pandian.guesthouse@gmail.com",
    price_range: "₹800 - ₹1,800",
    rating: 3,
    amenities: ["wifi", "parking", "laundry"],
    images: ["/src/assets/temple-view-inn.jpg"],
    room_types: [
      {
        type: "Economy Room",
        price: 800,
        description: "Basic room with fan, shared bathroom facilities",
        amenities: ["fan", "shared-bathroom"]
      },
      {
        type: "Standard Room",
        price: 1500,
        description: "Room with attached bathroom and ceiling fan",
        amenities: ["fan", "wifi", "hot-water"]
      }
    ],
    created_at: "2024-01-01T00:00:00Z",
    updated_at: "2024-01-01T00:00:00Z"
  },
  {
    id: "kumbakonam-residency",
    name: "Kumbakonam Residency",
    name_tamil: "கும்பகோணம் ரெசிடன்சி",
    description: "Contemporary business hotel with modern facilities. Features include well-equipped conference rooms, business center, multi-cuisine restaurant, and fitness center. Ideal for corporate travelers and families. Complimentary breakfast included.",
    description_tamil: "நவீன வசதிகளுடன் கூடிய சமகால வணிக ஹோட்டல். நன்கு பொருத்தப்பட்ட மாநாட்டு அறைகள், வணிக மையம், மல்டி-கசின் உணவகம் மற்றும் உடற்பயிற்சி மையம் உள்ளது.",
    address: "No. 128, Ayikulam Road, Kumbakonam, Tamil Nadu 612001",
    latitude: 10.9620,
    longitude: 79.3810,
    phone: "+91 435 242 6200",
    email: "stay@kumbakonamresidency.com",
    website: "https://kumbakonamresidency.com",
    price_range: "₹3,500 - ₹6,000",
    rating: 4,
    amenities: ["wifi", "parking", "restaurant", "ac", "room-service", "gym", "conference-room", "breakfast"],
    images: ["/src/assets/hotel-grand-kumbakonam.jpg"],
    room_types: [
      {
        type: "Deluxe Room",
        price: 3800,
        description: "Modern room with work station and city view, includes breakfast",
        amenities: ["ac", "wifi", "tv", "work-desk", "hot-water", "breakfast"]
      },
      {
        type: "Business Suite",
        price: 6000,
        description: "Spacious suite with separate living room, perfect for extended stays",
        amenities: ["ac", "wifi", "tv", "minibar", "sofa", "work-desk", "breakfast"]
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