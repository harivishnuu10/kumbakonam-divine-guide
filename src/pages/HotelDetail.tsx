import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  ArrowLeft, 
  MapPin, 
  Phone, 
  Mail, 
  Star,
  Navigation,
  Globe,
  Wifi,
  Car,
  Coffee,
  Users
} from "lucide-react";
import { Hotel } from "@/lib/supabase";
import { useLanguage } from "@/hooks/useLanguage";

// Sample detailed hotel data
const hotelDetails: Record<string, Hotel> = {
  "grand-kumbakonam": {
    id: "grand-kumbakonam",
    name: "Hotel Grand Kumbakonam",
    name_tamil: "ஹோட்டல் கிராண்ட் கும்பகோணம்",
    description: "Premium hotel with modern amenities and traditional hospitality. Located in the heart of Kumbakonam with easy access to all major temples. Our hotel combines contemporary comfort with South Indian architectural elements.",
    description_tamil: "நவீன வசதிகள் மற்றும் பாரம்பரிய விருந்தோம்பலுடன் கூடிய பிரீமியம் ஹோட்டல். கும்பகோணத்தின் இதயத்தில் அமைந்து அனைத்து முக்கிய கோயில்களுக்கும் எளிதான அணுகல்.",
    address: "123 T.S.R Big Street, Kumbakonam, Tamil Nadu 612001",
    latitude: 10.9595,
    longitude: 79.3797,
    phone: "+91 435 242 5000",
    email: "info@grandkumbakonam.com",
    website: "https://grandkumbakonam.com",
    price_range: "₹3,000 - ₹5,000",
    rating: 4,
    amenities: ["WiFi", "Parking", "Restaurant", "AC", "Room Service", "Laundry", "24/7 Reception"],
    images: ["/placeholder.svg", "/placeholder.svg", "/placeholder.svg"],
    room_types: [
      {
        type: "Deluxe Room",
        price: 3000,
        description: "Comfortable room with modern amenities and city view",
        amenities: ["AC", "WiFi", "TV", "Mini Fridge"]
      },
      {
        type: "Premium Room",
        price: 4000,
        description: "Spacious room with temple view and premium amenities",
        amenities: ["AC", "WiFi", "TV", "Mini Fridge", "Balcony"]
      },
      {
        type: "Suite",
        price: 5000,
        description: "Luxury suite with separate living area",
        amenities: ["AC", "WiFi", "TV", "Mini Fridge", "Living Area", "Balcony"]
      }
    ],
    created_at: "2024-01-01T00:00:00Z",
    updated_at: "2024-01-01T00:00:00Z"
  }
};

const amenityIcons: Record<string, any> = {
  wifi: Wifi,
  parking: Car,
  restaurant: Coffee,
  // Add more as needed
};

const HotelDetail = () => {
  const { id } = useParams();
  const { language, t } = useLanguage();
  const hotel = hotelDetails[id || ""];

  if (!hotel) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Hotel Not Found</h1>
          <Button variant="temple" asChild>
            <Link to="/hotels">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Hotels
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  const displayName = language === 'ta' && hotel.name_tamil ? hotel.name_tamil : hotel.name;
  const displayDescription = language === 'ta' && hotel.description_tamil ? hotel.description_tamil : hotel.description;
  
  const renderStars = () => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star 
        key={i} 
        className={`w-5 h-5 ${i < hotel.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
      />
    ));
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Image Section */}
      <div className="relative h-96 overflow-hidden">
        <img
          src={hotel.images[0]}
          alt={displayName}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/10" />
        
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div className="container mx-auto">
            <Button variant="outline" size="sm" asChild className="mb-4 bg-white/20 backdrop-blur-sm border-white/30 text-white hover:bg-white/30">
              <Link to="/hotels">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Hotels
              </Link>
            </Button>
            
            <div className="flex items-center space-x-3 mb-2">
              <Badge className="bg-gradient-gold text-foreground">
                {hotel.price_range}
              </Badge>
              <div className="flex items-center space-x-1">
                {renderStars()}
              </div>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
              {displayName}
            </h1>
            <p className="text-white/90 text-lg">
              <MapPin className="w-4 h-4 inline mr-1" />
              {hotel.address}
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Description */}
            <Card className="shadow-soft">
              <CardHeader>
                <CardTitle className="text-2xl text-foreground">About the Hotel</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  {displayDescription}
                </p>
              </CardContent>
            </Card>

            {/* Room Types */}
            <Card className="shadow-soft">
              <CardHeader>
                <CardTitle className="text-2xl text-foreground flex items-center">
                  <Users className="w-6 h-6 mr-2 text-temple-gold" />
                  {t('roomTypes')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {hotel.room_types.map((room, index) => (
                    <div key={index} className="border-l-4 border-temple-gold pl-4 py-3">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-semibold text-foreground">{room.type}</h4>
                        <Badge variant="outline" className="text-sm font-bold">
                          ₹{room.price.toLocaleString()}/night
                        </Badge>
                      </div>
                      <p className="text-muted-foreground text-sm mb-2">{room.description}</p>
                      <div className="flex flex-wrap gap-1">
                        {room.amenities.map((amenity) => (
                          <Badge key={amenity} variant="outline" className="text-xs">
                            {amenity}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Photo Gallery */}
            <Card className="shadow-soft">
              <CardHeader>
                <CardTitle className="text-2xl text-foreground flex items-center">
                  <MapPin className="w-6 h-6 mr-2 text-temple-saffron" />
                  Photo Gallery
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {hotel.images.map((image: string, index: number) => (
                    <div key={index} className="aspect-square overflow-hidden rounded-lg">
                      <img
                        src={image}
                        alt={`${displayName} gallery ${index + 1}`}
                        className="w-full h-full object-cover hover:scale-105 transition-temple cursor-pointer"
                      />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Info */}
            <Card className="shadow-soft">
              <CardHeader>
                <CardTitle className="text-xl text-foreground">Hotel Info</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start space-x-3">
                  <Phone className="w-5 h-5 text-temple-saffron mt-0.5" />
                  <div>
                    <p className="font-medium text-foreground">{t('contact')}</p>
                    <p className="text-sm text-muted-foreground">{hotel.phone}</p>
                    <p className="text-sm text-muted-foreground">{hotel.email}</p>
                  </div>
                </div>

                {hotel.website && (
                  <div className="flex items-start space-x-3">
                    <Globe className="w-5 h-5 text-temple-gold mt-0.5" />
                    <div>
                      <p className="font-medium text-foreground">Website</p>
                      <a 
                        href={hotel.website} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-sm text-temple-saffron hover:underline"
                      >
                        Visit Website
                      </a>
                    </div>
                  </div>
                )}

                <div className="flex items-start space-x-3">
                  <Star className="w-5 h-5 text-yellow-400 mt-0.5" />
                  <div>
                    <p className="font-medium text-foreground">{t('rating')}</p>
                    <div className="flex items-center space-x-1">
                      {renderStars()}
                      <span className="text-sm text-muted-foreground ml-2">
                        {hotel.rating}/5
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Amenities */}
            <Card className="shadow-soft">
              <CardHeader>
                <CardTitle className="text-xl text-foreground">{t('amenities')}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {hotel.amenities.map((amenity: string, index: number) => {
                    const IconComponent = amenityIcons[amenity.toLowerCase()] || Coffee;
                    return (
                      <div key={index} className="flex items-center space-x-3">
                        <IconComponent className="w-4 h-4 text-temple-saffron" />
                        <span className="text-sm text-muted-foreground">{amenity}</span>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Actions */}
            <div className="space-y-3">
              <Button 
                variant="temple" 
                className="w-full" 
                size="lg"
                onClick={() => {
                  if (hotel.phone) {
                    window.location.href = `tel:${hotel.phone}`;
                  }
                }}
              >
                <Phone className="w-5 h-5 mr-2" />
                {t('bookNow')}
              </Button>
              <Button 
                variant="gold" 
                className="w-full"
                onClick={() => {
                  window.open(
                    `https://www.google.com/maps/dir/?api=1&destination=${hotel.latitude},${hotel.longitude}`,
                    '_blank',
                    'noopener,noreferrer'
                  );
                }}
              >
                <Navigation className="w-4 h-4 mr-2" />
                {t('getDirections')}
              </Button>
              <Button 
                variant="outline" 
                className="w-full"
                asChild
              >
                <Link to={`/map?hotel=${hotel.id}`}>
                  <MapPin className="w-4 h-4 mr-2" />
                  View on Map
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HotelDetail;