import { Clock, MapPin, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";

interface TempleListCardProps {
  id: string;
  name: string;
  deity: string;
  timings: string;
  image: string;
  distance?: string;
}

const TempleListCard = ({
  id,
  name,
  deity,
  timings,
  image,
  distance,
}: TempleListCardProps) => {
  return (
    <Link
      to={`/temple/${id}`}
      className="flex items-center gap-4 p-3 bg-card rounded-xl border border-border card-hover animate-fade-in"
    >
      <div className="w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden bg-muted">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover"
          loading="lazy"
          onError={(e) => {
            e.currentTarget.src = "/placeholder.svg";
          }}
        />
      </div>

      <div className="flex-1 min-w-0">
        <h3 className="font-semibold text-foreground truncate">{name}</h3>
        <Badge variant="secondary" className="text-xs mt-1 mb-2">
          {deity}
        </Badge>
        <div className="flex items-center gap-3 text-sm text-muted-foreground">
          <span className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" />
            <span className="truncate text-xs">{timings.split(",")[0]}</span>
          </span>
          {distance && (
            <span className="flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5" />
              <span className="text-xs">{distance}</span>
            </span>
          )}
        </div>
      </div>

      <ChevronRight className="w-5 h-5 text-muted-foreground flex-shrink-0" />
    </Link>
  );
};

export default TempleListCard;
