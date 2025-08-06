import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Star, Phone, Wifi, Car, Coffee } from "lucide-react";
import { Link } from "react-router-dom";
import { Hotel } from "@/lib/supabase";
import { useLanguage } from "@/hooks/useLanguage";

interface HotelCardProps extends Hotel {}

const amenityIcons: Record<string, any> = {
  wifi: Wifi,
  parking: Car,
  restaurant: Coffee,
  // Add more as needed
};

const HotelCard = ({ 
  id, 
  name, 
  name_tamil,
  description, 
  price_range, 
  rating, 
  images, 
  amenities,
  address
}: HotelCardProps) => {
  const { language, t } = useLanguage();
  
  const displayName = language === 'ta' && name_tamil ? name_tamil : name;
  const mainImage = images?.[0] || "/placeholder.svg";
  
  const renderStars = () => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star 
        key={i} 
        className={`w-4 h-4 ${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
      />
    ));
  };

  return (
    <Card className="group hover:shadow-gold transition-temple transform hover:-translate-y-1 overflow-hidden bg-card">
      <CardHeader className="p-0">
        <div className="relative overflow-hidden rounded-t-lg">
          <img
            src={mainImage}
            alt={displayName}
            className="w-full h-48 object-cover group-hover:scale-105 transition-temple"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
          <Badge className="absolute top-3 left-3 bg-gradient-gold text-foreground">
            {price_range}
          </Badge>
          <div className="absolute top-3 right-3 flex items-center bg-white/90 backdrop-blur-sm rounded-full px-2 py-1">
            {renderStars()}
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-4">
        <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-temple">
          {displayName}
        </h3>
        <p className="text-muted-foreground text-sm mb-3 line-clamp-2">
          {description}
        </p>
        
        <div className="space-y-2 text-sm">
          <div className="flex items-center text-muted-foreground">
            <MapPin className="w-4 h-4 mr-2 text-temple-gold" />
            <span className="text-xs">{address}</span>
          </div>
          
          {amenities.length > 0 && (
            <div className="flex items-center space-x-2">
              {amenities.slice(0, 3).map((amenity) => {
                const IconComponent = amenityIcons[amenity.toLowerCase()] || Coffee;
                return (
                  <div key={amenity} className="flex items-center text-muted-foreground">
                    <IconComponent className="w-3 h-3 text-temple-saffron" />
                  </div>
                );
              })}
              {amenities.length > 3 && (
                <Badge variant="outline" className="text-xs">
                  +{amenities.length - 3} more
                </Badge>
              )}
            </div>
          )}
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0 space-x-2">
        <Button variant="temple" size="sm" asChild className="flex-1">
          <Link to={`/hotel/${id}`}>
            <MapPin className="w-4 h-4 mr-1" />
            {t('viewDetails')}
          </Link>
        </Button>
        <Button variant="gold" size="sm" className="flex-1">
          <Phone className="w-4 h-4 mr-1" />
          {t('bookNow')}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default HotelCard;