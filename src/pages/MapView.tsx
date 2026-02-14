import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import {
  Search, MapPin, Filter, Navigation, LocateFixed, AlertCircle, Loader2, X,
} from 'lucide-react';
import InteractiveMap, { MapLocation } from '@/components/InteractiveMap';
import { useUserLocation } from '@/hooks/useUserLocation';
import { useLanguage } from '@/hooks/useLanguage';
import TranslatedText from '@/components/TranslatedText';

// Sample temples
const sampleTemples = [
  { id: 'adi-kumbeswarar', name: 'Adi Kumbeswarar Temple', deity: 'Lord Shiva', latitude: 10.95833, longitude: 79.37111, description: '7th century Chola temple. Famous for Mahamaham festival.' },
  { id: 'sarangapani', name: 'Sarangapani Temple', deity: 'Lord Vishnu', latitude: 10.95944, longitude: 79.37472, description: 'One of 108 Divya Desams with towering 12-tier gopuram.' },
  { id: 'ramaswamy', name: 'Ramaswamy Temple', deity: 'Lord Rama', latitude: 10.957208, longitude: 79.373659, description: '17th century masterpiece with Ramayana frescoes.' },
  { id: 'nageshwara', name: 'Nageshwara Temple', deity: 'Lord Shiva', latitude: 10.958748, longitude: 79.378659, description: '9th century temple with unique astronomical alignment.' },
  { id: 'chakrapani', name: 'Chakrapani Temple', deity: 'Lord Vishnu', latitude: 10.963351, longitude: 79.373170, description: 'Sukran temple in Navagraha circuit. Healing properties.' },
  { id: 'someswarar', name: 'Someswarar Temple', deity: 'Lord Shiva', latitude: 10.98333, longitude: 79.38333, description: 'Dedicated to lunar aspect of Shiva.' },
];

const sampleHotels = [
  { id: 'grand-kumbakonam', name: 'Hotel Grand Kumbakonam', latitude: 10.9621, longitude: 79.3912, description: 'Premium hotel with modern amenities', rating: 4 },
  { id: 'temple-view-inn', name: 'Temple View Inn', latitude: 10.9595, longitude: 79.3780, description: 'Budget-friendly with temple views', rating: 3 },
];

const MapView = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<'all' | 'temple' | 'hotel'>('all');
  const [destination, setDestination] = useState<MapLocation | null>(null);
  const { location: userLocation, status: locStatus, errorMessage: locError, requestLocation } = useUserLocation();
  const { t } = useLanguage();

  // Auto-request location on mount
  useEffect(() => {
    requestLocation();
  }, [requestLocation]);

  // Build map locations
  const mapLocations: MapLocation[] = [
    ...sampleTemples
      .filter((t) => selectedType === 'all' || selectedType === 'temple')
      .filter((t) => t.name.toLowerCase().includes(searchTerm.toLowerCase()) || t.deity.toLowerCase().includes(searchTerm.toLowerCase()))
      .map((t) => ({ id: t.id, name: t.name, type: 'temple' as const, latitude: t.latitude, longitude: t.longitude, description: t.description })),
    ...sampleHotels
      .filter((h) => selectedType === 'all' || selectedType === 'hotel')
      .filter((h) => h.name.toLowerCase().includes(searchTerm.toLowerCase()))
      .map((h) => ({ id: h.id, name: h.name, type: 'hotel' as const, latitude: h.latitude, longitude: h.longitude, description: h.description, rating: h.rating })),
  ];

  const typeFilters = [
    { key: 'all' as const, label: 'All', count: sampleTemples.length + sampleHotels.length },
    { key: 'temple' as const, label: 'Temples', count: sampleTemples.length },
    { key: 'hotel' as const, label: 'Hotels', count: sampleHotels.length },
  ];

  const handleSelectDestination = (loc: MapLocation) => {
    setDestination(loc);
  };

  const clearDestination = () => {
    setDestination(null);
  };

  return (
    <div className="min-h-screen bg-background py-6 md:py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
            <TranslatedText text="Interactive Map" />
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto text-sm md:text-base">
            Explore temples and hotels in Kumbakonam. Tap a marker to get directions from your current location.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-4 order-2 lg:order-1">
            {/* Search */}
            <Card className="shadow-soft">
              <CardContent className="p-4 space-y-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    placeholder="Search locations..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <div className="flex gap-2">
                  {typeFilters.map((f) => (
                    <Button
                      key={f.key}
                      variant={selectedType === f.key ? 'default' : 'outline'}
                      size="sm"
                      className={`flex-1 text-xs ${selectedType === f.key ? 'bg-gradient-temple text-primary-foreground' : ''}`}
                      onClick={() => setSelectedType(f.key)}
                    >
                      {f.label} ({f.count})
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Location status */}
            <Card className="shadow-soft">
              <CardContent className="p-4 space-y-3">
                <div className="flex items-center gap-2 text-sm font-medium text-foreground">
                  <LocateFixed className="w-4 h-4 text-temple-saffron" />
                  Your Location
                </div>
                {locStatus === 'loading' && (
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Loader2 className="w-3 h-3 animate-spin" /> Detecting...
                  </div>
                )}
                {locStatus === 'success' && userLocation && (
                  <p className="text-xs text-muted-foreground">
                    📍 {userLocation.lat.toFixed(4)}, {userLocation.lng.toFixed(4)}
                  </p>
                )}
                {(locStatus === 'denied' || locStatus === 'unavailable' || locStatus === 'timeout') && (
                  <div className="space-y-2">
                    <div className="flex items-start gap-2 text-xs text-destructive">
                      <AlertCircle className="w-3 h-3 mt-0.5 shrink-0" />
                      <span>{locError}</span>
                    </div>
                    <Button size="sm" variant="outline" className="w-full text-xs" onClick={requestLocation}>
                      Retry
                    </Button>
                  </div>
                )}
                {locStatus === 'idle' && (
                  <Button size="sm" variant="temple" className="w-full text-xs" onClick={requestLocation}>
                    <LocateFixed className="w-3 h-3 mr-1" /> Detect My Location
                  </Button>
                )}
              </CardContent>
            </Card>

            {/* Active Destination */}
            {destination && (
              <Card className="shadow-soft border-temple-saffron/50">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Navigating to</p>
                      <p className="font-semibold text-sm text-foreground">{destination.name}</p>
                      <Badge variant="outline" className="text-[10px] capitalize mt-1">{destination.type}</Badge>
                    </div>
                    <Button variant="ghost" size="icon" className="h-6 w-6 shrink-0" onClick={clearDestination}>
                      <X className="w-3 h-3" />
                    </Button>
                  </div>
                  {!userLocation && (
                    <p className="text-xs text-destructive mt-2">Enable location to see directions.</p>
                  )}
                </CardContent>
              </Card>
            )}

            {/* Location list */}
            <Card className="shadow-soft">
              <CardHeader className="p-4 pb-2">
                <CardTitle className="text-sm">Locations ({mapLocations.length})</CardTitle>
              </CardHeader>
              <CardContent className="p-4 pt-0 max-h-[300px] overflow-y-auto space-y-1">
                {mapLocations.map((loc) => (
                  <button
                    key={loc.id}
                    className={`w-full flex items-center gap-2 p-2 rounded-md text-left text-xs transition-colors hover:bg-secondary ${
                      destination?.id === loc.id ? 'bg-secondary ring-1 ring-temple-saffron' : ''
                    }`}
                    onClick={() => handleSelectDestination(loc)}
                  >
                    <div className={`w-2.5 h-2.5 rounded-full shrink-0 ${loc.type === 'temple' ? 'bg-temple-saffron' : 'bg-temple-gold'}`} />
                    <span className="truncate font-medium">{loc.name}</span>
                  </button>
                ))}
              </CardContent>
            </Card>

            {/* Legend */}
            <Card className="shadow-soft">
              <CardContent className="p-4 space-y-2">
                <p className="text-xs font-medium text-foreground">Legend</p>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <div className="w-3 h-3 bg-temple-saffron rounded-full" /> Temples
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <div className="w-3 h-3 bg-temple-gold rounded-full" /> Hotels
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <div className="w-3 h-3 bg-primary rounded-full" /> Your Location
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Map */}
          <div className="lg:col-span-3 order-1 lg:order-2">
            <InteractiveMap
              locations={mapLocations}
              height="calc(100vh - 220px)"
              center={{ lat: 10.9577, lng: 79.3773 }}
              zoom={14}
              userLocation={userLocation}
              destination={destination}
              onMarkerClick={handleSelectDestination}
            />

            {/* Summary bar */}
            <Card className="shadow-soft mt-3">
              <CardContent className="p-3 flex items-center justify-between text-xs text-muted-foreground">
                <div className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-temple-saffron" />
                  <span>Showing {mapLocations.length} locations</span>
                </div>
                <div className="flex items-center gap-3">
                  <span>{sampleTemples.length} temples</span>
                  <span>{sampleHotels.length} hotels</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapView;
