import { useState, useCallback } from 'react';
import { APIProvider, Map, Marker, InfoWindow } from '@vis.gl/react-google-maps';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Star } from "lucide-react";
import { useGoogleMapsAPI } from '@/hooks/useGoogleMapsAPI';
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

interface GoogleMapProps {
  locations: MapLocation[];
  center?: { lat: number; lng: number };
  zoom?: number;
  height?: string;
  apiKey?: string;
}

const GoogleMap = ({ 
  locations, 
  center = { lat: 10.9577, lng: 79.3773 }, // Kumbakonam center
  zoom = 13,
  height = "500px",
  apiKey
}: GoogleMapProps) => {
  const [selectedLocation, setSelectedLocation] = useState<MapLocation | null>(null);

  const { apiKey: keyFromHook, isLoading, error } = useGoogleMapsAPI();
  
  // Priority: prop apiKey > hook apiKey > env variable
  const effectiveApiKey = apiKey || keyFromHook;

  const handleMarkerClick = useCallback((location: MapLocation) => {
    setSelectedLocation(location);
  }, []);

  const getMarkerColor = (type: 'temple' | 'hotel') => {
    return type === 'temple' ? '#FF6B35' : '#F7931E'; // Temple saffron vs hotel gold
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star 
        key={i} 
        className={`w-3 h-3 ${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
      />
    ));
  };

  // Loading state when fetching API key
  if (isLoading && !effectiveApiKey) {
    return (
      <Card className="shadow-soft" style={{ height }}>
        <CardContent className="p-8 h-full flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin w-8 h-8 border-2 border-temple-saffron border-t-transparent rounded-full mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading map...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Fallback map component if Google Maps API is not available
  if (!effectiveApiKey || error) {
    return (
      <Card className="shadow-soft" style={{ height }}>
        <CardContent className="p-8 h-full flex flex-col items-center justify-center">
          <MapPin className="w-16 h-16 text-muted-foreground mb-4" />
          <h3 className="text-lg font-semibold text-foreground mb-2">Interactive Map</h3>
          <p className="text-muted-foreground text-center mb-2">
            {error || 'Google Maps integration requires API key configuration.'}
            <br />
            Showing {locations.length} locations in Kumbakonam.
          </p>
          <div className="mt-4 space-y-2 w-full max-w-md">
            {locations.slice(0, 3).map((location) => (
              <div key={location.id} className="flex items-center space-x-3 p-2 bg-secondary rounded">
                <div className={`w-3 h-3 rounded-full ${
                  location.type === 'temple' ? 'bg-temple-saffron' : 'bg-temple-gold'
                }`} />
                <span className="text-sm font-medium">{location.name}</span>
                <Badge variant="outline" className="text-xs capitalize">
                  {location.type}
                </Badge>
              </div>
            ))}
            {locations.length > 3 && (
              <p className="text-xs text-muted-foreground text-center">
                +{locations.length - 3} more locations
              </p>
            )}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="shadow-soft overflow-hidden">
      <APIProvider apiKey={effectiveApiKey}>
        <Map
          defaultCenter={center}
          defaultZoom={zoom}
          style={{ height }}
          mapTypeId="roadmap"
          mapId="kumbakonam-guide-map"
        >
          {locations.map((location) => (
            <Marker
              key={location.id}
              position={{ lat: location.latitude, lng: location.longitude }}
              onClick={() => handleMarkerClick(location)}
              title={location.name}
            />
          ))}

          {selectedLocation && (
            <InfoWindow
              position={{ 
                lat: selectedLocation.latitude, 
                lng: selectedLocation.longitude 
              }}
              onCloseClick={() => setSelectedLocation(null)}
            >
              <div className="p-2 max-w-xs">
                <div className="flex items-start justify-between mb-2">
                  <h4 className="font-semibold text-foreground text-sm">
                    {selectedLocation.name}
                  </h4>
                  <Badge 
                    variant="outline" 
                    className={`text-xs capitalize ${
                      selectedLocation.type === 'temple' 
                        ? 'border-temple-saffron text-temple-saffron' 
                        : 'border-temple-gold text-temple-gold'
                    }`}
                  >
                    {selectedLocation.type}
                  </Badge>
                </div>
                
                {selectedLocation.description && (
                  <p className="text-xs text-muted-foreground mb-2 line-clamp-2">
                    {selectedLocation.description}
                  </p>
                )}
                
                {selectedLocation.rating && (
                  <div className="flex items-center space-x-1 mb-2">
                    {renderStars(selectedLocation.rating)}
                    <span className="text-xs text-muted-foreground">
                      {selectedLocation.rating}/5
                    </span>
                  </div>
                )}

                {selectedLocation.image && (
                  <img
                    src={selectedLocation.image}
                    alt={selectedLocation.name}
                    className="w-full h-20 object-cover rounded mt-2"
                  />
                )}
              </div>
            </InfoWindow>
          )}
        </Map>
      </APIProvider>
    </Card>
  );
};

export default GoogleMap;