import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

export const useGoogleMapsAPI = () => {
  const [apiKey, setApiKey] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchApiKey = async () => {
      try {
        setIsLoading(true);
        
        // Try to get API key from Supabase secrets via edge function
        const { data, error } = await supabase.functions.invoke('get-google-maps-key');
        
        if (error) {
          throw error;
        }
        
        if (data?.apiKey) {
          setApiKey(data.apiKey);
        } else {
          // Fallback: You can also store as a public key in code if preferred
          // For now, we'll show instructions to user
          setError('Google Maps API key not configured');
        }
      } catch (err) {
        console.error('Error fetching Google Maps API key:', err);
        setError('Failed to load Google Maps API key');
      } finally {
        setIsLoading(false);
      }
    };

    fetchApiKey();
  }, []);

  return { apiKey, isLoading, error };
};