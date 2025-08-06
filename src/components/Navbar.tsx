import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";
import { Home, MapPin, MessageCircle } from "lucide-react";

const Navbar = () => {
  const location = useLocation();

  const navItems = [
    { path: "/", label: "Home", icon: Home },
    { path: "/temples", label: "Temples", icon: MapPin },
    { path: "/chat", label: "Ask AI", icon: MessageCircle },
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
              Kumbakonam Temples
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
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;