// import { Button } from "@/components/ui/button";
// import { Link, useLocation } from "react-router-dom";
// import { Home, MapPin, MessageCircle, Hotel, Map, Info, Mail } from "lucide-react";
// import LanguageSelector from "./LanguageSelector";
// import ThemeToggle from "./ThemeToggle";
// import { useLanguage } from "@/hooks/useLanguage";
// import TranslatedText from "./TranslatedText";
// import templexplore_logo from "@/assets/templexplore-logo.png";

// const Navbar = () => {
//   const location = useLocation();
//   const { t } = useLanguage();

//   const navItems = [
//     { path: "/", label: t("home"), icon: Home },
//     { path: "/temples", label: t("temples"), icon: MapPin },
//     { path: "/hotels", label: t("hotels"), icon: Hotel },
//     { path: "/itineraries", label: "Itineraries", icon: MapPin },
//     { path: "/local-guide", label: "Local Guide", icon: Map },
//     { path: "/map", label: "Map", icon: MapPin },
    
//     { path: "/contact", label: "Contact", icon: Mail },
//     { path: "/feedback", label: "Feedback", icon: MessageCircle },
//     { path: "/about", label: "About", icon: Info },
//     { path: "/chat", label: t("chat"), icon: MessageCircle },
//   ];

//   return (
//     <nav className="bg-background/95 backdrop-blur-sm border-b border-border sticky top-0 z-50 shadow-soft">
//       <div className="container mx-auto px-4 py-3">
//         <div className="flex items-center justify-between">
//           <Link to="/" className="flex items-center space-x-2 group">
//             <div className="w-10 h-10 rounded-full flex items-center justify-center transition-transform group-hover:scale-110">
//               <img 
//                 src={templexplore_logo} 
//                 alt="TempleXplore Logo" 
//                 className="w-full h-full object-contain"
//               />
//             </div>
//             <span className="text-xl font-bold bg-gradient-temple bg-clip-text text-transparent">
//               <TranslatedText text="TempleXplore" />
//             </span>
//           </Link>

//           <div className="flex items-center space-x-1 md:space-x-2">
//             {navItems.map(({ path, label, icon: Icon }) => (
//               <Button
//                 key={path}
//                 variant={location.pathname === path ? "temple" : "ghost"}
//                 size="sm"
//                 asChild
//               >
//                 <Link to={path} className="flex items-center space-x-1">
//                   <Icon className="w-4 h-4" />
//                   <span className="hidden sm:inline">{label}</span>
//                 </Link>
//               </Button>
//             ))}
//             <ThemeToggle />
//             <LanguageSelector />
//           </div>
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;


import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";
import { Home, MapPin, MessageCircle, Hotel, Map, Info, Mail, Menu, X } from "lucide-react";
import LanguageSelector from "./LanguageSelector";
import ThemeToggle from "./ThemeToggle";
import { useLanguage } from "@/hooks/useLanguage";
import TranslatedText from "./TranslatedText";
import templexplore_logo from "@/assets/templexplore-logo.png";

const Navbar = () => {
  const location = useLocation();
  const { t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { path: "/", label: t("home"), icon: Home },
    { path: "/temples", label: t("temples"), icon: MapPin },
    { path: "/hotels", label: t("hotels"), icon: Hotel },
    { path: "/itineraries", label: "Itineraries", icon: MapPin },
    { path: "/local-guide", label: "Local Guide", icon: Map },
    { path: "/map", label: "Map", icon: MapPin },
    { path: "/contact", label: "Contact", icon: Mail },
    { path: "/feedback", label: "Feedback", icon: MessageCircle },
    { path: "/about", label: "About", icon: Info },
    { path: "/chat", label: t("chat"), icon: MessageCircle },
  ];

  return (
    <nav className="bg-background/95 backdrop-blur-sm border-b border-border sticky top-0 z-50 shadow-soft">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">

          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
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

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-1 md:space-x-2">
            {navItems.map(({ path, label, icon: Icon }) => (
              <Button
                key={path}
                variant={location.pathname === path ? "temple" : "ghost"}
                size="sm"
                asChild
              >
                <Link to={path} className="flex items-center space-x-1">
                  <Icon className="w-4 h-4" />
                  <span className="hidden lg:inline">{label}</span>
                </Link>
              </Button>
            ))}
            <ThemeToggle />
            <LanguageSelector />
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Dropdown */}
        {isOpen && (
          <div className="md:hidden mt-4 space-y-2 animate-in slide-in-from-top-2 duration-300">
            {navItems.map(({ path, label, icon: Icon }) => (
              <Link
                key={path}
                to={path}
                onClick={() => setIsOpen(false)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition ${
                  location.pathname === path
                    ? "bg-gradient-temple text-white"
                    : "hover:bg-muted"
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{label}</span>
              </Link>
            ))}

            <div className="flex items-center justify-between px-4 pt-4 border-t border-border">
              <ThemeToggle />
              <LanguageSelector />
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
