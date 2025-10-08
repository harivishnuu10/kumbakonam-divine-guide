import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";
import { Home, MapPin, MessageCircle, Hotel, Map } from "lucide-react";
import LanguageSelector from "./LanguageSelector";
import { useLanguage } from "@/hooks/useLanguage";
import TranslatedText from "./TranslatedText";

const Navbar = () => {
  const location = useLocation();
  const { t } = useLanguage();

  const navItems = [
    { path: "/", label: t("home"), icon: Home },
    { path: "/temples", label: t("temples"), icon: MapPin },
    { path: "/hotels", label: t("hotels"), icon: Hotel },
    { path: "/itineraries", label: "Itineraries", icon: MapPin },
    { path: "/local-guide", label: "Local Guide", icon: Map },
    { path: "/map", label: t("map"), icon: Map },
    { path: "/chat", label: t("chat"), icon: MessageCircle },
  ];

  return (
    <nav className="bg-background/95 backdrop-blur-sm border-b border-border sticky top-0 z-50 shadow-soft">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-temple rounded-full flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">🕉</span>
            </div>
            <span className="text-xl font-bold bg-gradient-temple bg-clip-text text-transparent">
              <TranslatedText text="Kumbakonam Temples" />
            </span>
          </Link>

          <div className="flex items-center space-x-1 md:space-x-2">
            {navItems.map(({ path, label, icon: Icon }) => (
              <Button
                key={path}
                variant={location.pathname === path ? "temple" : "ghost"}
                size="sm"
                asChild
              >
                <Link to={path} className="flex items-center space-x-1">
                  <Icon className="w-4 h-4" />
                  <span className="hidden sm:inline">{label}</span>
                </Link>
              </Button>
            ))}
            <LanguageSelector />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;