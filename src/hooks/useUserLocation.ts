import { useState, useCallback } from 'react';

export interface UserLocation {
  lat: number;
  lng: number;
}

export type LocationStatus = 'idle' | 'loading' | 'success' | 'denied' | 'unavailable' | 'timeout';

export const useUserLocation = () => {
  const [location, setLocation] = useState<UserLocation | null>(null);
  const [status, setStatus] = useState<LocationStatus>('idle');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const requestLocation = useCallback(() => {
    if (!navigator.geolocation) {
      setStatus('unavailable');
      setErrorMessage('Geolocation is not supported by your browser.');
      return;
    }

    setStatus('loading');
    setErrorMessage(null);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
        setStatus('success');
      },
      (error) => {
        switch (error.code) {
          case error.PERMISSION_DENIED:
            setStatus('denied');
            setErrorMessage('Location permission denied. Please enable location access in your browser settings.');
            break;
          case error.POSITION_UNAVAILABLE:
            setStatus('unavailable');
            setErrorMessage('Location information is unavailable. Please try again.');
            break;
          case error.TIMEOUT:
            setStatus('timeout');
            setErrorMessage('Location request timed out. Please try again.');
            break;
          default:
            setStatus('unavailable');
            setErrorMessage('An unknown error occurred while detecting location.');
        }
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 300000, // 5 min cache
      }
    );
  }, []);

  return { location, status, errorMessage, requestLocation };
};
