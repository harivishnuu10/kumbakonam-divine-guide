import { Home, Map, Compass, Info } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

const navItems = [
  { icon: Home, label: "Home", path: "/" },
  { icon: Compass, label: "Temples", path: "/temples" },
  { icon: Map, label: "Map", path: "/map" },
  { icon: Info, label: "Guide", path: "/local-guide" },
];

const BottomNav = () => {
  const location = useLocation();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-t border-border bottom-nav-safe">
      <div className="max-w-md mx-auto">
        <div className="flex items-center justify-around px-2 py-2">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "flex flex-col items-center justify-center gap-1 py-2 px-4 rounded-xl touch-target transition-colors",
                  isActive
                    ? "text-primary bg-accent"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                <item.icon
                  className={cn("w-6 h-6", isActive && "stroke-[2.5px]")}
                />
                <span className="text-xs font-medium">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

export default BottomNav;
