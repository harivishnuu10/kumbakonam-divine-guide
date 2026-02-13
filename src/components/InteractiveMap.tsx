import { useState, useCallback, useEffect, useRef } from 'react';
import { APIProvider, Map, Marker, InfoWindow, useMap } from '@vis.gl/react-google-maps';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MapPin, Star, Navigation, AlertTriangle, Loader2 } from 'lucide-react';
import { useGoogleMapsAPI } from '@/hooks/useGoogleMapsAPI';
import { UserLocation } from '@/hooks/useUserLocation';

export interface MapLocation {
  id: string;
  name: string;
  type: 'temple' | 'hotel';
  latitude: number;
  longitude: number;
  description?: string;
  rating?: number;
  image?: string;
}

interface InteractiveMapProps {
  locations: MapLocation[];
  center?: { lat: number; lng: number };
  zoom?: number;
  height?: string;
  userLocation?: UserLocation | null;
  destination?: MapLocation | null;
  onMarkerClick?: (location: MapLocation) => void;
}

// Inner component that has access to the map instance
const DirectionsRenderer = ({
  origin,
  destination,
  onRouteInfo,
}: {
  origin: { lat: number; lng: number };
  destination: { lat: number; lng: number };
  onRouteInfo: (info: { distance: string; duration: string } | null) => void;
}) => {
  const map = useMap();
  const rendererRef = useRef<google.maps.DirectionsRenderer | null>(null);

  useEffect(() => {
    if (!map || !window.google) return;

    if (!rendererRef.current) {
      rendererRef.current = new google.maps.DirectionsRenderer({
        suppressMarkers: true,
        polylineOptions: {
          strokeColor: 'hsl(25, 85%, 55%)',
          strokeWeight: 5,
          strokeOpacity: 0.8,
        },
      });
    }
    rendererRef.current.setMap(map);

    const directionsService = new google.maps.DirectionsService();
    directionsService.route(
      {
        origin,
        destination,
        travelMode: google.maps.TravelMode.DRIVING,
      },
      (result, status) => {
        if (status === google.maps.DirectionsStatus.OK && result) {
          rendererRef.current?.setDirections(result);
          const leg = result.routes[0]?.legs[0];
          if (leg) {
            onRouteInfo({
              distance: leg.distance?.text || '',
              duration: leg.duration?.text || '',
            });
          }
        } else {
          onRouteInfo(null);
        }
      }
    );

    return () => {
      rendererRef.current?.setMap(null);
    };
  }, [map, origin.lat, origin.lng, destination.lat, destination.lng, onRouteInfo]);

  return null;
};

const InteractiveMap = ({
  locations,
  center = { lat: 10.9577, lng: 79.3773 },
  zoom = 13,
  height = '500px',
  userLocation,
  destination,
  onMarkerClick,
}: InteractiveMapProps) => {
  const [selectedLocation, setSelectedLocation] = useState<MapLocation | null>(null);
  const [routeInfo, setRouteInfo] = useState<{ distance: string; duration: string } | null>(null);
  const { apiKey, isLoading, error } = useGoogleMapsAPI();

  const handleMarkerClick = useCallback(
    (location: MapLocation) => {
      setSelectedLocation(location);
      onMarkerClick?.(location);
    },
    [onMarkerClick]
  );

  const handleRouteInfo = useCallback((info: { distance: string; duration: string } | null) => {
    setRouteInfo(info);
  }, []);

  const renderStars = (rating: number) =>
    Array.from({ length: 5 }, (_, i) => (
      <Star key={i} className={`w-3 h-3 ${i < rating ? 'text-yellow-400 fill-current' : 'text-muted-foreground/30'}`} />
    ));

  if (isLoading) {
    return (
      <Card className="shadow-soft" style={{ height }}>
        <CardContent className="p-8 h-full flex items-center justify-center">
          <div className="text-center">
            <Loader2 className="w-8 h-8 animate-spin text-temple-saffron mx-auto mb-4" />
            <p className="text-muted-foreground">Loading map...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!apiKey || error) {
    return (
      <Card className="shadow-soft" style={{ height }}>
        <CardContent className="p-8 h-full flex flex-col items-center justify-center">
          <AlertTriangle className="w-12 h-12 text-destructive mb-4" />
          <h3 className="text-lg font-semibold text-foreground mb-2">Map Unavailable</h3>
          <p className="text-muted-foreground text-center text-sm mb-4">
            {error || 'Google Maps API key is not configured.'}
          </p>
          <div className="space-y-2 w-full max-w-md">
            {locations.slice(0, 5).map((loc) => (
              <div key={loc.id} className="flex items-center gap-3 p-2 bg-secondary rounded-md">
                <div className={`w-3 h-3 rounded-full shrink-0 ${loc.type === 'temple' ? 'bg-temple-saffron' : 'bg-temple-gold'}`} />
                <span className="text-sm font-medium truncate">{loc.name}</span>
                <Badge variant="outline" className="text-xs capitalize ml-auto">{loc.type}</Badge>
              </div>
            ))}
            {locations.length > 5 && (
              <p className="text-xs text-muted-foreground text-center">+{locations.length - 5} more</p>
            )}
          </div>
        </CardContent>
      </Card>
    );
  }

  const effectiveCenter = userLocation || center;

  return (
    <Card className="shadow-soft overflow-hidden relative">
      {/* Route info overlay */}
      {routeInfo && (
        <div className="absolute top-4 left-4 z-10 bg-card/95 backdrop-blur-sm rounded-lg p-3 shadow-temple border border-border">
          <div className="flex items-center gap-2 text-sm">
            <Navigation className="w-4 h-4 text-temple-saffron" />
            <span className="font-semibold text-foreground">{routeInfo.distance}</span>
            <span className="text-muted-foreground">·</span>
            <span className="text-muted-foreground">{routeInfo.duration}</span>
          </div>
        </div>
      )}

      <APIProvider apiKey={apiKey}>
        <Map
          defaultCenter={effectiveCenter}
          defaultZoom={zoom}
          style={{ height }}
          mapTypeId="roadmap"
          mapId="kumbakonam-interactive-map"
          gestureHandling="greedy"
        >
          {/* Temple & Hotel markers */}
          {locations.map((location) => (
            <Marker
              key={location.id}
              position={{ lat: location.latitude, lng: location.longitude }}
              onClick={() => handleMarkerClick(location)}
              title={location.name}
            />
          ))}

          {/* User location marker */}
          {userLocation && (
            <Marker
              position={userLocation}
              title="Your Location"
            />
          )}

          {/* Directions */}
          {userLocation && destination && (
            <DirectionsRenderer
              origin={userLocation}
              destination={{ lat: destination.latitude, lng: destination.longitude }}
              onRouteInfo={handleRouteInfo}
            />
          )}

          {/* Info Window */}
          {selectedLocation && (
            <InfoWindow
              position={{ lat: selectedLocation.latitude, lng: selectedLocation.longitude }}
              onCloseClick={() => setSelectedLocation(null)}
            >
              <div className="p-1 max-w-[220px]">
                <div className="flex items-start justify-between gap-2 mb-1">
                  <h4 className="font-semibold text-sm leading-tight">{selectedLocation.name}</h4>
                  <Badge variant="outline" className="text-[10px] capitalize shrink-0">{selectedLocation.type}</Badge>
                </div>
                {selectedLocation.description && (
                  <p className="text-xs text-muted-foreground mb-1 line-clamp-2">{selectedLocation.description}</p>
                )}
                {selectedLocation.rating && (
                  <div className="flex items-center gap-1">{renderStars(selectedLocation.rating)}</div>
                )}
                <Button
                  size="sm"
                  className="mt-2 w-full h-7 text-xs bg-gradient-temple text-primary-foreground"
                  onClick={() => {
                    onMarkerClick?.(selectedLocation);
                    setSelectedLocation(null);
                  }}
                >
                  <Navigation className="w-3 h-3 mr-1" /> Get Directions
                </Button>
              </div>
            </InfoWindow>
          )}
        </Map>
      </APIProvider>
    </Card>
  );
};

export default InteractiveMap;
