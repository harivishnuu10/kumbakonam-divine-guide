import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Clock, Calendar, Navigation } from "lucide-react";
import { Link } from "react-router-dom";
import TempleVR360Modal from "./TempleVR360Modal";

interface TempleCardProps {
  id: string;
  name: string;
  deity: string;
  description: string;
  timings: string;
  image: string;
  festivals: string[];
  coordinates: { latitude: number; longitude: number };
}

const TempleCard = ({ id, name, deity, description, timings, image, festivals, coordinates }: TempleCardProps) => {
  return (
    <Card className="group hover:shadow-temple transition-temple transform hover:-translate-y-1 overflow-hidden bg-card">
      <CardHeader className="p-0">
        <div className="relative overflow-hidden rounded-t-lg">
          <img
            src={image}
            alt={`${name} - Ancient temple in Kumbakonam, Tamil Nadu`}
            className="w-full h-48 object-cover group-hover:scale-105 transition-temple"
            onError={(e) => {
              e.currentTarget.src = '/src/assets/hero-temple.jpg';
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
          <Badge className="absolute top-3 left-3 bg-gradient-temple text-primary-foreground">
            {deity}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="p-4">
        <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-temple">
          {name}
        </h3>
        <p className="text-muted-foreground text-sm mb-3 line-clamp-2">
          {description}
        </p>
        
        <div className="space-y-2 text-sm">
          <div className="flex items-center text-muted-foreground">
            <Clock className="w-4 h-4 mr-2 text-temple-saffron" />
            {timings}
          </div>
          
          {festivals.length > 0 && (
            <div className="flex items-start text-muted-foreground">
              <Calendar className="w-4 h-4 mr-2 mt-0.5 text-temple-red" />
              <div className="flex flex-wrap gap-1">
                {festivals.slice(0, 2).map((festival) => (
                  <Badge key={festival} variant="outline" className="text-xs">
                    {festival}
                  </Badge>
                ))}
                {festivals.length > 2 && (
                  <Badge variant="outline" className="text-xs">
                    +{festivals.length - 2} more
                  </Badge>
                )}
              </div>
            </div>
          )}
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0 flex-col sm:flex-row gap-2">
        <Button variant="temple" size="sm" asChild className="flex-1">
          <Link to={`/temple/${id}`}>
            <MapPin className="w-4 h-4 mr-1" />
            View Details
          </Link>
        </Button>
        
        <TempleVR360Modal 
          templeName={name} 
          deity={deity}
          latitude={coordinates.latitude}
          longitude={coordinates.longitude}
        >
          <Button variant="outline" size="sm" className="flex-1 sm:flex-initial border-temple-saffron text-temple-saffron hover:bg-temple-saffron hover:text-primary-foreground transition-temple">
            <Navigation className="w-4 h-4 mr-1" />
            Street View 360°
          </Button>
        </TempleVR360Modal>
      </CardFooter>
    </Card>
  );
};

export default TempleCard;