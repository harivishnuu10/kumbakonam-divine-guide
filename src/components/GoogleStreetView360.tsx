import { useEffect, useRef, useState } from 'react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { RefreshCw, Navigation, ZoomIn, ZoomOut, RotateCcw } from "lucide-react";
import { useGoogleMapsAPI } from "@/hooks/useGoogleMapsAPI";

interface GoogleStreetView360Props {
  latitude: number;
  longitude: number;
  templeName: string;
  deity: string;
  height?: string;
}

declare global {
  interface Window {
    google: any;
  }
}

const GoogleStreetView360 = ({ 
  latitude, 
  longitude, 
  templeName, 
  deity,
  height = "400px"
}: GoogleStreetView360Props) => {
  const { apiKey, isLoading: apiLoading, error: apiError } = useGoogleMapsAPI();
  const streetViewRef = useRef<HTMLDivElement>(null);
  const panoramaRef = useRef<any>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasStreetView, setHasStreetView] = useState(true);
  const [heading, setHeading] = useState(0);
  const [zoom, setZoom] = useState(1);

  useEffect(() => {
    if (!apiKey || apiLoading) return;

    // Load Google Maps API if not already loaded
    if (!window.google) {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=geometry`;
      script.async = true;
      script.defer = true;
      script.onload = initializeStreetView;
      document.head.appendChild(script);
    } else {
      initializeStreetView();
    }
  }, [latitude, longitude, apiKey, apiLoading]);

  const initializeStreetView = () => {
    if (!streetViewRef.current || !window.google) return;

    const streetViewService = new window.google.maps.StreetViewService();
    const position = { lat: latitude, lng: longitude };

    // Check if Street View is available at this location
    streetViewService.getPanorama({
      location: position,
      radius: 100,
      source: window.google.maps.StreetViewSource.OUTDOOR
    }, (data: any, status: any) => {
      if (status === window.google.maps.StreetViewStatus.OK) {
        // Initialize panorama
        panoramaRef.current = new window.google.maps.StreetViewPanorama(
          streetViewRef.current,
          {
            position: data.location.latLng,
            pov: { heading: 0, pitch: 0 },
            zoom: 1,
            addressControl: false,
            showRoadLabels: false,
            panControl: true,
            zoomControl: false, // We'll use custom controls
            fullscreenControl: false,
            enableCloseButton: false,
            motionTracking: false,
            motionTrackingControl: false
          }
        );

        // Add event listeners
        panoramaRef.current.addListener('pov_changed', () => {
          const pov = panoramaRef.current.getPov();
          setHeading(Math.round(pov.heading));
          setZoom(pov.zoom);
        });

        setHasStreetView(true);
        setIsLoaded(true);
      } else {
        setHasStreetView(false);
        setIsLoaded(true);
      }
    });
  };

  const handleRotate = () => {
    if (!panoramaRef.current) return;
    const newHeading = (heading + 90) % 360;
    panoramaRef.current.setPov({
      heading: newHeading,
      pitch: 0,
      zoom: zoom
    });
  };

  const handleZoomIn = () => {
    if (!panoramaRef.current) return;
    const newZoom = Math.min(zoom + 0.5, 3);
    panoramaRef.current.setZoom(newZoom);
  };

  const handleZoomOut = () => {
    if (!panoramaRef.current) return;
    const newZoom = Math.max(zoom - 0.5, 0.5);
    panoramaRef.current.setZoom(newZoom);
  };

  const handleReset = () => {
    if (!panoramaRef.current) return;
    panoramaRef.current.setPov({
      heading: 0,
      pitch: 0,
      zoom: 1
    });
  };

  if (apiLoading) {
    return (
      <div 
        className="bg-gradient-to-br from-temple-stone to-muted rounded-lg flex items-center justify-center border animate-pulse"
        style={{ height }}
      >
        <div className="text-center">
          <RefreshCw className="w-8 h-8 mx-auto text-temple-saffron animate-spin mb-2" />
          <p className="text-sm text-muted-foreground">Loading API key...</p>
        </div>
      </div>
    );
  }

  if (apiError || !apiKey) {
    return (
      <div 
        className="bg-gradient-to-br from-temple-stone to-muted rounded-lg flex items-center justify-center border"
        style={{ height }}
      >
        <div className="text-center p-6">
          <Navigation className="w-12 h-12 mx-auto text-muted-foreground mb-3" />
          <h3 className="font-semibold text-foreground mb-2">Street View Unavailable</h3>
          <p className="text-sm text-muted-foreground mb-3">
            {apiError || 'Google Maps API key required for 360° street view'}
          </p>
          <Badge className="bg-gradient-temple text-primary-foreground">
            {deity} Temple
          </Badge>
          <div className="mt-3 text-xs text-muted-foreground">
            <p>Please configure Google Maps API key in Supabase secrets</p>
          </div>
        </div>
      </div>
    );
  }

  if (!apiKey) {
    return (
      <div 
        className="bg-gradient-to-br from-temple-stone to-muted rounded-lg flex items-center justify-center border"
        style={{ height }}
      >
        <div className="text-center p-6">
          <Navigation className="w-12 h-12 mx-auto text-muted-foreground mb-3" />
          <h3 className="font-semibold text-foreground mb-2">Street View Preview</h3>
          <p className="text-sm text-muted-foreground mb-3">
            Google Maps API key required for 360° street view
          </p>
          <Badge className="bg-gradient-temple text-primary-foreground">
            {deity} Temple
          </Badge>
        </div>
      </div>
    );
  }

  if (!isLoaded) {
    return (
      <div 
        className="bg-gradient-to-br from-temple-stone to-muted rounded-lg flex items-center justify-center border animate-pulse"
        style={{ height }}
      >
        <div className="text-center">
          <RefreshCw className="w-8 h-8 mx-auto text-temple-saffron animate-spin mb-2" />
          <p className="text-sm text-muted-foreground">Loading 360° view...</p>
        </div>
      </div>
    );
  }

  if (!hasStreetView) {
    return (
      <div 
        className="bg-gradient-to-br from-temple-stone to-muted rounded-lg flex items-center justify-center border"
        style={{ height }}
      >
        <div className="text-center p-6">
          <Navigation className="w-12 h-12 mx-auto text-muted-foreground mb-3" />
          <h3 className="font-semibold text-foreground mb-2">{templeName}</h3>
          <p className="text-sm text-muted-foreground mb-3">
            Street View not available at this exact location
          </p>
          <Badge className="bg-gradient-temple text-primary-foreground">
            {deity}
          </Badge>
          <div className="mt-4 text-xs text-muted-foreground">
            <p>📍 Lat: {latitude.toFixed(4)}, Lng: {longitude.toFixed(4)}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative rounded-lg overflow-hidden border shadow-temple">
      {/* Street View Container */}
      <div 
        ref={streetViewRef} 
        style={{ height }}
        className="w-full relative"
      />

      {/* Custom Controls Overlay */}
      <div className="absolute top-4 right-4 flex flex-col gap-2 z-10">
        <Button
          variant="secondary"
          size="icon"
          onClick={handleRotate}
          className="h-8 w-8 bg-card/90 backdrop-blur-sm shadow-soft"
          title="Rotate 90°"
        >
          <RotateCcw className="w-4 h-4" />
        </Button>
        
        <Button
          variant="secondary"
          size="icon"
          onClick={handleZoomIn}
          className="h-8 w-8 bg-card/90 backdrop-blur-sm shadow-soft"
          title="Zoom In"
        >
          <ZoomIn className="w-4 h-4" />
        </Button>
        
        <Button
          variant="secondary"
          size="icon"
          onClick={handleZoomOut}
          className="h-8 w-8 bg-card/90 backdrop-blur-sm shadow-soft"
          title="Zoom Out"
        >
          <ZoomOut className="w-4 h-4" />
        </Button>
        
        <Button
          variant="secondary"
          size="icon"
          onClick={handleReset}
          className="h-8 w-8 bg-card/90 backdrop-blur-sm shadow-soft"
          title="Reset View"
        >
          <RefreshCw className="w-4 h-4" />
        </Button>
      </div>

      {/* Temple Info Overlay */}
      <div className="absolute bottom-4 left-4 right-4 z-10">
        <div className="bg-card/90 backdrop-blur-sm rounded-lg p-3 shadow-soft">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-semibold text-foreground text-sm">{templeName}</h4>
              <p className="text-xs text-muted-foreground">360° Street View Experience</p>
            </div>
            <Badge className="bg-gradient-temple text-primary-foreground text-xs">
              {deity}
            </Badge>
          </div>
          
          {/* Heading indicator */}
          <div className="mt-2 flex items-center text-xs text-muted-foreground">
            <Navigation className="w-3 h-3 mr-1" style={{ transform: `rotate(${heading}deg)` }} />
            <span>Heading: {heading}°</span>
            <span className="mx-2">•</span>
            <span>Zoom: {zoom.toFixed(1)}x</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GoogleStreetView360;