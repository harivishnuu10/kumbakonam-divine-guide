import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";
import { Home, MapPin, MessageCircle, Hotel, Map, Info, Mail, Menu, X } from "lucide-react";
import LanguageSelector from "./LanguageSelector";
import ThemeToggle from "./ThemeToggle";
import { useLanguage } from "@/hooks/useLanguage";
import TranslatedText from "./TranslatedText";
import templexplore_logo from "@/assets/templexplore-logo.png";
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet";

const Navbar = () => {
  const location = useLocation();
  const { t } = useLanguage();
  const [open, setOpen] = useState(false);

  const navItems = [
    { path: "/", label: t("home"), icon: Home },
    { path: "/temples", label: t("temples"), icon: MapPin },
    { path: "/hotels", label: t("hotels"), icon: Hotel },
    { path: "/itineraries", label: "Itineraries", icon: MapPin },
    { path: "/local-guide", label: "Local Guide", icon: Map },
    { path: "/map", label: "Map", icon: MapPin },
    { path: "/contact", label: "Contact", icon: Mail },
    { path: "/about", label: "About", icon: Info },
    { path: "/chat", label: t("chat"), icon: MessageCircle },
  ];

  return (
    <nav className="bg-background/95 backdrop-blur-sm border-b border-border sticky top-0 z-50 shadow-soft">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group shrink-0">
            <div className="w-10 h-10 rounded-full flex items-center justify-center transition-transform group-hover:scale-110">
              <img 
                src={templexplore_logo} 
                alt="TempleXplore Logo" 
                className="w-full h-full object-contain"
              />
            </div>
            <span className="text-xl font-bold bg-gradient-temple bg-clip-text text-transparent">
              <TranslatedText text="TempleXplore" />
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center space-x-1">
            {navItems.map(({ path, label, icon: Icon }) => (
              <Button
                key={path}
                variant={location.pathname === path ? "temple" : "ghost"}
                size="sm"
                asChild
              >
                <Link to={path} className="flex items-center space-x-1">
                  <Icon className="w-4 h-4" />
                  <span>{label}</span>
                </Link>
              </Button>
            ))}
            <ThemeToggle />
            <LanguageSelector />
          </div>

          {/* Mobile Nav */}
          <div className="flex items-center gap-1 lg:hidden">
            <ThemeToggle />
            <LanguageSelector />
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="w-5 h-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[280px] p-0">
                <div className="flex flex-col h-full">
                  <div className="flex items-center justify-between p-4 border-b border-border">
                    <span className="font-bold text-lg bg-gradient-temple bg-clip-text text-transparent">
                      TempleXplore
                    </span>
                  </div>
                  <div className="flex-1 overflow-y-auto py-2">
                    {navItems.map(({ path, label, icon: Icon }) => (
                      <SheetClose asChild key={path}>
                        <Link
                          to={path}
                          className={`flex items-center gap-3 px-4 py-3 text-sm transition-colors ${
                            location.pathname === path
                              ? "bg-primary/10 text-primary font-semibold border-r-2 border-primary"
                              : "text-foreground hover:bg-muted"
                          }`}
                        >
                          <Icon className="w-5 h-5" />
                          {label}
                        </Link>
                      </SheetClose>
                    ))}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
