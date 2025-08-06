// Translation service using Google Translate API
// In production, this would be handled via Supabase Edge Functions

export class TranslationService {
  private apiKey: string | null = null;

  constructor() {
    this.apiKey = import.meta.env.VITE_GOOGLE_TRANSLATE_API_KEY || null;
  }

  async translateText(text: string, targetLanguage: 'en' | 'ta'): Promise<string> {
    if (!this.apiKey) {
      return this.getFallbackTranslation(text, targetLanguage);
    }

    try {
      const response = await fetch(
        `https://translation.googleapis.com/language/translate/v2?key=${this.apiKey}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            q: text,
            target: targetLanguage,
            format: 'text',
          }),
        }
      );

      const data = await response.json();
      return data.data.translations[0].translatedText;
    } catch (error) {
      console.error('Translation error:', error);
      return this.getFallbackTranslation(text, targetLanguage);
    }
  }

  private getFallbackTranslation(text: string, targetLanguage: 'en' | 'ta'): string {
    // Basic fallback translations for common temple-related terms
    const translations: Record<string, Record<string, string>> = {
      'en': {
        'கோயில்': 'Temple',
        'திருவிழா': 'Festival',
        'பூஜை': 'Prayer',
        'தரிசனம்': 'Darshan',
        'சிவன்': 'Lord Shiva',
        'விஷ்ணு': 'Lord Vishnu',
        'கும்பகோணம்': 'Kumbakonam',
        'மகாமஹம்': 'Mahamaham',
      },
      'ta': {
        'Temple': 'கோயில்',
        'Festival': 'திருவிழா',
        'Prayer': 'பூஜை',
        'Darshan': 'தரிசனம்',
        'Lord Shiva': 'சிவன்',
        'Lord Vishnu': 'விஷ்ணு',
        'Kumbakonam': 'கும்பகோணம்',
        'Mahamaham': 'மகாமஹம்',
      }
    };

    // Try to find a direct translation
    const targetTranslations = translations[targetLanguage];
    if (targetTranslations && targetTranslations[text]) {
      return targetTranslations[text];
    }

    // Return original text if no translation available
    return text;
  }

  // Pre-translated content for common UI elements
  getUITranslations(language: 'en' | 'ta') {
    const translations = {
      en: {
        home: 'Home',
        temples: 'Temples',
        hotels: 'Hotels',
        map: 'Map',
        chat: 'AI Guide',
        about: 'About',
        search: 'Search',
        filter: 'Filter',
        viewDetails: 'View Details',
        getDirections: 'Get Directions',
        bookNow: 'Book Now',
        timings: 'Timings',
        festivals: 'Festivals',
        facilities: 'Facilities',
        dressCode: 'Dress Code',
        contact: 'Contact',
        rating: 'Rating',
        priceRange: 'Price Range',
        amenities: 'Amenities',
        roomTypes: 'Room Types',
      },
      ta: {
        home: 'முகப்பு',
        temples: 'கோயில்கள்',
        hotels: 'ஹோட்டல்கள்',
        map: 'வரைபடம்',
        chat: 'AI வழிகாட்டி',
        about: 'பற்றி',
        search: 'தேடல்',
        filter: 'வடிகட்டி',
        viewDetails: 'விவரங்களைப் பார்க்க',
        getDirections: 'திசைகளைப் பெற',
        bookNow: 'இப்போது புக் செய்',
        timings: 'நேரங்கள்',
        festivals: 'திருவிழாக்கள்',
        facilities: 'வசதிகள்',
        dressCode: 'ஆடை விதிகள்',
        contact: 'தொடர்பு',
        rating: 'மதிப்பீடு',
        priceRange: 'விலை வரம்பு',
        amenities: 'வசதிகள்',
        roomTypes: 'அறை வகைகள்',
      }
    };

    return translations[language];
  }
}

export const translationService = new TranslationService();