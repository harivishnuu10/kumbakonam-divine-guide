import { Button } from "@/components/ui/button";
import { Languages, Globe } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";

const LanguageToggle = () => {
  const { language, setLanguage } = useLanguage();

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'ta' : 'en');
  };

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={toggleLanguage}
      className="flex items-center gap-2 hover:bg-secondary transition-temple"
    >
      <Globe className="w-4 h-4" />
      <span className="font-medium">
        {language === 'en' ? 'தமிழ்' : 'English'}
      </span>
      <Languages className="w-4 h-4" />
    </Button>
  );
};

export default LanguageToggle;