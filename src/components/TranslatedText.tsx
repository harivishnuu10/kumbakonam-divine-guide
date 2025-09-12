import React, { useEffect, useMemo, useState } from 'react';
import { useLanguage } from '@/hooks/useLanguage';

// Simple in-memory cache to avoid repeated translations during a session
const translationCache = new Map<string, string>();

interface TranslatedTextProps {
  text: string;
  as?: keyof JSX.IntrinsicElements;
  className?: string;
}

const TranslatedText: React.FC<TranslatedTextProps> = ({ text, as = 'span', className }) => {
  const { language, translateText } = useLanguage();
  const [translated, setTranslated] = useState<string>(text);

  const key = useMemo(() => `${language}:${text}`, [language, text]);

  useEffect(() => {
    let cancelled = false;

    const run = async () => {
      if (!text) return setTranslated('');
      if (language === 'en') return setTranslated(text);

      const cached = translationCache.get(key);
      if (cached) return setTranslated(cached);

      try {
        const out = await translateText(text);
        if (!cancelled) {
          translationCache.set(key, out);
          setTranslated(out);
        }
      } catch {
        if (!cancelled) setTranslated(text);
      }
    };

    run();
    return () => {
      cancelled = true;
    };
  }, [key, language, text, translateText]);

  const Component = as as any;
  return <Component className={className}>{translated}</Component>;
};

export default TranslatedText;
