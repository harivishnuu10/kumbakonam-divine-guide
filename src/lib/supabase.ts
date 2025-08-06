import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://placeholder-url.supabase.co';
const supabaseAnonKey = 'placeholder-key';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database types
export interface Temple {
  id: string;
  name: string;
  deity: string;
  description: string;
  description_tamil?: string;
  history: string;
  history_tamil?: string;
  timings_morning: string;
  timings_evening: string;
  address: string;
  latitude: number;
  longitude: number;
  phone: string;
  email: string;
  dress_code: string;
  facilities: string[];
  festivals: TempleFestival[];
  images: string[];
  video_url?: string;
  created_at: string;
  updated_at: string;
}

export interface TempleFestival {
  name: string;
  name_tamil?: string;
  description: string;
  description_tamil?: string;
  period: string;
}

export interface Hotel {
  id: string;
  name: string;
  name_tamil?: string;
  description: string;
  description_tamil?: string;
  address: string;
  latitude: number;
  longitude: number;
  phone: string;
  email: string;
  website?: string;
  price_range: string;
  rating: number;
  amenities: string[];
  images: string[];
  room_types: HotelRoomType[];
  created_at: string;
  updated_at: string;
}

export interface HotelRoomType {
  type: string;
  price: number;
  description: string;
  amenities: string[];
}

// Database operations
export const templeService = {
  async getAll(): Promise<Temple[]> {
    const { data, error } = await supabase
      .from('temples')
      .select('*')
      .order('name');
    
    if (error) throw error;
    return data || [];
  },

  async getById(id: string): Promise<Temple | null> {
    const { data, error } = await supabase
      .from('temples')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) throw error;
    return data;
  },

  async search(query: string): Promise<Temple[]> {
    const { data, error } = await supabase
      .from('temples')
      .select('*')
      .or(`name.ilike.%${query}%,deity.ilike.%${query}%,description.ilike.%${query}%`)
      .order('name');
    
    if (error) throw error;
    return data || [];
  }
};

export const hotelService = {
  async getAll(): Promise<Hotel[]> {
    const { data, error } = await supabase
      .from('hotels')
      .select('*')
      .order('rating', { ascending: false });
    
    if (error) throw error;
    return data || [];
  },

  async getById(id: string): Promise<Hotel | null> {
    const { data, error } = await supabase
      .from('hotels')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) throw error;
    return data;
  },

  async search(query: string): Promise<Hotel[]> {
    const { data, error } = await supabase
      .from('hotels')
      .select('*')
      .or(`name.ilike.%${query}%,description.ilike.%${query}%,address.ilike.%${query}%`)
      .order('rating', { ascending: false });
    
    if (error) throw error;
    return data || [];
  }
};