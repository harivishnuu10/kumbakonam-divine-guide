import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Clock, Calendar, Youtube as YoutubeIcon } from "lucide-react";
import { Link } from "react-router-dom";
import TranslatedText from "./TranslatedText";
import ShareButton from "./ShareButton";
import { useLanguage } from "@/hooks/useLanguage";

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
  const { t } = useLanguage();

  const openYouTube = () => {
    const query = encodeURIComponent(`${name} temple Kumbakonam 4k`);
    window.open(`https://www.youtube.com/results?search_query=${query}` , '_blank', 'noopener,noreferrer');
  };

  return (
    <Card className="group card-3d hover-3d hover:shadow-temple transition-temple overflow-hidden bg-card animate-reveal">
      <CardHeader className="p-0">
        <div className="relative overflow-hidden rounded-t-lg">
          <img
            src={image}
            alt={`${name} - Ancient temple in Kumbakonam, Tamil Nadu`}
            className="w-full h-48 object-cover group-hover:scale-110 transition-all duration-500"
            onError={(e) => {
              e.currentTarget.src = '/src/assets/hero-temple.jpg';
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <Badge className="absolute top-3 left-3 bg-gradient-temple text-primary-foreground shadow-temple animate-pulse-glow">
            <TranslatedText text={deity} />
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="p-4">
        <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-gradient transition-temple">
          <TranslatedText text={name} />
        </h3>
        <p className="text-muted-foreground text-sm mb-3 line-clamp-2">
          <TranslatedText text={description} />
        </p>
        
        <div className="space-y-2 text-sm">
          <div className="flex items-center text-muted-foreground">
            <Clock className="w-4 h-4 mr-2 text-temple-saffron animate-pulse" />
            <TranslatedText text={timings} />
          </div>
          
          {festivals.length > 0 && (
            <div className="flex items-start text-muted-foreground">
              <Calendar className="w-4 h-4 mr-2 mt-0.5 text-temple-red" />
              <div className="flex flex-wrap gap-1">
                {festivals.slice(0, 2).map((festival) => (
                  <Badge key={festival} variant="outline" className="text-xs hover:bg-gradient-temple hover:text-primary-foreground transition-all">
                    <TranslatedText text={festival} />
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

      <CardFooter className="p-4 pt-0 flex gap-2">
        <Button variant="temple" size="sm" asChild className="flex-1 hover:scale-105 transition-transform">
          <Link to={`/temple/${id}`}>
            <MapPin className="w-4 h-4 mr-1" />
            {t('viewDetails')}
          </Link>
        </Button>

        <Button
          variant="gold"
          size="sm"
          onClick={openYouTube}
          className="flex-1 hover:scale-105 transition-transform"
        >
          <YoutubeIcon className="w-4 h-4 mr-1" />
          Watch on YouTube
        </Button>

        <ShareButton
          title={`${name} - TempleXplore`}
          text={`Explore ${name} temple in Kumbakonam`}
          url={`${window.location.origin}/temple/${id}`}
          variant="outline"
        />
      </CardFooter>
    </Card>
  );
};

export default TempleCard;