import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Globe } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import type { SupportedLanguage } from "@/lib/translation";

const LanguageSelector = () => {
  const { language, setLanguage } = useLanguage();

  const languages: { value: SupportedLanguage; label: string; flag: string }[] = [
    { value: 'en', label: 'English', flag: '🇺🇸' },
    { value: 'ta', label: 'தமிழ்', flag: '🇮🇳' },
    { value: 'hi', label: 'हिंदी', flag: '🇮🇳' },
    { value: 'te', label: 'తెలుగు', flag: '🇮🇳' },
    { value: 'ml', label: 'മലയാളം', flag: '🇮🇳' },
  ];

  const currentLanguage = languages.find(lang => lang.value === language);

  return (
    <Select value={language} onValueChange={(value: SupportedLanguage) => setLanguage(value)}>
      <SelectTrigger className="w-auto min-w-[120px] bg-background/95 border-border hover:bg-secondary transition-temple">
        <div className="flex items-center gap-2">
          <Globe className="w-4 h-4" />
          <span className="font-medium">{currentLanguage?.flag} {currentLanguage?.label}</span>
        </div>
      </SelectTrigger>
      <SelectContent>
        {languages.map((lang) => (
          <SelectItem key={lang.value} value={lang.value}>
            <div className="flex items-center gap-2">
              <span>{lang.flag}</span>
              <span>{lang.label}</span>
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default LanguageSelector;