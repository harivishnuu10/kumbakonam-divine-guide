// Translation service using Google Translate API
// In production, this would be handled via Supabase Edge Functions

export type SupportedLanguage = 'en' | 'ta' | 'hi' | 'te' | 'ml';

export class TranslationService {
  private apiKey: string | null = null;

  constructor() {
    this.apiKey = import.meta.env.VITE_GOOGLE_TRANSLATE_API_KEY || null;
  }

  async translateText(text: string, targetLanguage: SupportedLanguage): Promise<string> {
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

  private getFallbackTranslation(text: string, targetLanguage: SupportedLanguage): string {
    // Basic fallback translations for common temple-related terms
    const translations: Record<string, Record<string, string>> = {
      'en': {
        'கோயில்': 'Temple',
        'திருவிழா': 'Festival',
        'பூஜை': 'Prayer',
        'தரிசனம்': 'Darshan',
        'சিவன்': 'Lord Shiva',
        'விஷ்ணு': 'Lord Vishnu',
        'கும்பகோணம்': 'Kumbakonam',
        'मंदिर': 'Temple',
        'పుణ్యక్షేత్రం': 'Temple',
        'ക്ഷേത്രം': 'Temple',
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
      },
      'hi': {
        'Temple': 'मंदिर',
        'Festival': 'त्योहार',
        'Prayer': 'प्रार्थना',
        'Darshan': 'दर्शन',
        'Lord Shiva': 'भगवान शिव',
        'Lord Vishnu': 'भगवान विष्णु',
        'Kumbakonam': 'कुंभकोणम',
        'Mahamaham': 'महामहम',
      },
      'te': {
        'Temple': 'ఆలయం',
        'Festival': 'పండుగ',
        'Prayer': 'ప్రార్థన',
        'Darshan': 'దర్శనం',
        'Lord Shiva': 'శివుడు',
        'Lord Vishnu': 'విష్ణువు',
        'Kumbakonam': 'కుంభకోణం',
        'Mahamaham': 'మహామహం',
      },
      'ml': {
        'Temple': 'ക്ഷേത്രം',
        'Festival': 'ഉത്സവം',
        'Prayer': 'പ്രാർത്ഥന',
        'Darshan': 'ദർശനം',
        'Lord Shiva': 'ശിവൻ',
        'Lord Vishnu': 'വിഷ്ണു',
        'Kumbakonam': 'കുംഭകോണം',
        'Mahamaham': 'മഹാമഹം',
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
  getUITranslations(language: SupportedLanguage) {
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
        watchOnYoutube: 'Watch on YouTube',
        exploreStreetView: 'Explore Street View',
        sendMessage: 'Send Message',
        typeMessage: 'Type your message...',
        welcomeToChat: 'Welcome to TempleXplore! Ask me anything about temples, festivals, or travel tips.',
        itineraries: 'Itineraries',
        localGuide: 'Local Guide',
        transportation: 'Transportation',
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
        watchOnYoutube: 'யூடியூபில் பார்க்க',
        exploreStreetView: 'தெரு காட்சியை ஆராய',
        sendMessage: 'செய்தி அனுப்பு',
        typeMessage: 'உங்கள் செய்தியை தட்டச்சு செய்க...',
        welcomeToChat: 'TempleXplore க்கு வரவேற்கிறோம்! கோயில்கள், திருவிழாக்கள் அல்லது பயண குறிப்புகள் பற்றி என்னிடம் கேளுங்கள்.',
      },
      hi: {
        home: 'होम',
        temples: 'मंदिर',
        hotels: 'होटल',
        map: 'नक्शा',
        chat: 'AI गाइड',
        about: 'के बारे में',
        search: 'खोजें',
        filter: 'फिल्टर',
        viewDetails: 'विवरण देखें',
        getDirections: 'दिशा पाएं',
        bookNow: 'अभी बुक करें',
        timings: 'समय',
        festivals: 'त्योहार',
        facilities: 'सुविधाएं',
        dressCode: 'ड्रेस कोड',
        contact: 'संपर्क',
        rating: 'रेटिंग',
        priceRange: 'मूल्य सीमा',
        amenities: 'सुविधाएं',
        roomTypes: 'कमरे के प्रकार',
        watchOnYoutube: 'यूट्यूब पर देखें',
        exploreStreetView: 'स्ट्रीट व्यू देखें',
        sendMessage: 'संदेश भेजें',
        typeMessage: 'अपना संदेश लिखें...',
        welcomeToChat: 'TempleXplore में आपका स्वागत है! मंदिरों, त्योहारों या यात्रा युक्तियों के बारे में मुझसे कुछ भी पूछें।',
      },
      te: {
        home: 'హోమ్',
        temples: 'ఆలయాలు',
        hotels: 'హోటల్స్',
        map: 'మ్యాప్',
        chat: 'AI గైడ్',
        about: 'గురించి',
        search: 'వెతకండి',
        filter: 'ఫిల్టర్',
        viewDetails: 'వివరాలు చూడండి',
        getDirections: 'దిశలు పొందండి',
        bookNow: 'ఇప్పుడే బుక్ చేయండి',
        timings: 'సమయాలు',
        festivals: 'పండుగలు',
        facilities: 'సౌకర్యాలు',
        dressCode: 'దుస్తుల నియమాలు',
        contact: 'సంప్రదించండి',
        rating: 'రేటింగ్',
        priceRange: 'ధర పరిధి',
        amenities: 'సౌకర్యాలు',
        roomTypes: 'గది రకాలు',
        watchOnYoutube: 'యూట్యూబ్‌లో చూడండి',
        exploreStreetView: 'స్ట్రీట్ వ్యూ చూడండి',
        sendMessage: 'సందేశం పంపండి',
        typeMessage: 'మీ సందేశం టైప్ చేయండి...',
        welcomeToChat: 'TempleXplore కు స్వాగతం! దేవాలయాలు, పండుగలు లేదా ప్రయాణ చిట్కాల గురించి నన్ను ఏదైనా అడగండి.',
      },
      ml: {
        home: 'ഹോം',
        temples: 'ക്ഷേത്രങ്ങൾ',
        hotels: 'ഹോട്ടലുകൾ',
        map: 'ഭൂപടം',
        chat: 'AI ഗൈഡ്',
        about: 'കുറിച്ച്',
        search: 'തിരയുക',
        filter: 'ഫിൽട്ടർ',
        viewDetails: 'വിശദാംശങ്ങൾ കാണുക',
        getDirections: 'ദിശകൾ നേടുക',
        bookNow: 'ഇപ്പോൾ ബുക്ക് ചെയ്യുക',
        timings: 'സമയങ്ങൾ',
        festivals: 'ഉത്സവങ്ങൾ',
        facilities: 'സൗകര്യങ്ങൾ',
        dressCode: 'വസ്ത്രധാരണ നിയമങ്ങൾ',
        contact: 'ബന്ധപ്പെടുക',
        rating: 'റേറ്റിംഗ്',
        priceRange: 'വില പരിധി',
        amenities: 'സൗകര്യങ്ങൾ',
        roomTypes: 'മുറി തരങ്ങൾ',
        watchOnYoutube: 'യൂട്യൂബിൽ കാണുക',
        exploreStreetView: 'സ്ട്രീറ്റ് വ്യൂ പര്യവേക്ഷണം ചെയ്യുക',
        sendMessage: 'സന്ദേശം അയയ്ക്കുക',
        typeMessage: 'നിങ്ങളുടെ സന്ദേശം ടൈപ്പ് ചെയ്യുക...',
        welcomeToChat: 'TempleXplore ലേക്ക് സ്വാഗതം! ക്ഷേത്രങ്ങൾ, ഉത്സവങ്ങൾ അല്ലെങ്കിൽ യാത്രാ നുറുങ്ങുകൾ എന്നിവയെക്കുറിച്ച് എന്നോട് എന്തും ചോദിക്കുക.',
      }
    };

    return translations[language];
  }
}

export const translationService = new TranslationService();