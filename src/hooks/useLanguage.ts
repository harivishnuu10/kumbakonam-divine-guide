import { useState, useEffect, createContext, useContext } from 'react';
import { translationService, type SupportedLanguage } from '@/lib/translation';

type Language = SupportedLanguage;

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  translateText: (text: string) => Promise<string>;
}

export const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export const useLanguageState = () => {
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem('kumbakonam-guide-language');
    return (saved as Language) || 'en';
  });

  const [translations, setTranslations] = useState(() => 
    translationService.getUITranslations(language)
  );

  useEffect(() => {
    localStorage.setItem('kumbakonam-guide-language', language);
    setTranslations(translationService.getUITranslations(language));
    // Reflect current language on the <html> tag for accessibility and SEO
    if (typeof document !== 'undefined') {
      document.documentElement.lang = language;
    }
  }, [language]);

  const t = (key: string): string => {
    return translations[key as keyof typeof translations] || key;
  };

  const translateText = async (text: string): Promise<string> => {
    try {
      return await translationService.translateText(text, language);
    } catch (error) {
      console.error('Translation failed:', error);
      return text;
    }
  };

  return {
    language,
    setLanguage,
    t,
    translateText,
  };
};