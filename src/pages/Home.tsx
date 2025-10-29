import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, MapPin, Clock, Star, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-temple.jpg";
import TempleCard from "@/components/TempleCard";
import TranslatedText from "@/components/TranslatedText";

// Sample temple data for demonstration
const featuredTemples = [
  {
    id: "adi-kumbeswarar",
    name: "Adi Kumbeswarar Temple",
    deity: "Lord Shiva",
    description: "One of the most ancient temples in Kumbakonam, built by the Cholas. Famous for its magnificent architecture and spiritual significance.",
    timings: "6:00 AM - 12:30 PM, 4:00 PM - 9:00 PM",
    image: "/placeholder.svg",
    festivals: ["Mahamaham", "Chithirai", "Arudra Darisanam"],
    coordinates: { latitude: 10.9601, longitude: 79.3788 }
  },
  {
    id: "sarangapani",
    name: "Sarangapani Temple",
    deity: "Lord Vishnu",
    description: "A magnificent Vaishnavite temple known for its towering gopuram and intricate carvings. One of the 108 Divya Desams.",
    timings: "6:00 AM - 12:00 PM, 4:00 PM - 8:00 PM",
    image: "/placeholder.svg",
    festivals: ["Brahmotsavam", "Vaikunta Ekadasi"],
    coordinates: { latitude: 10.9593, longitude: 79.3774 }
  },
  {
    id: "ramaswamy",
    name: "Ramaswamy Temple",
    deity: "Lord Rama",
    description: "Dedicated to Lord Rama, this temple showcases exquisite Nayak period architecture with beautiful paintings and sculptures.",
    timings: "6:00 AM - 12:00 PM, 4:00 PM - 8:00 PM", 
    image: "/placeholder.svg",
    festivals: ["Rama Navami", "Hanuman Jayanti"],
    coordinates: { latitude: 10.9586, longitude: 79.3795 }
  }
];

const stats = [
  { icon: MapPin, label: "Ancient Temples", value: "18+" },
  { icon: Clock, label: "Centuries Old", value: "1000+" },
  { icon: Star, label: "Heritage Sites", value: "5" },
];

const Home = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden min-h-screen flex items-center perspective-container">
        {/* Animated Background with Mesh Gradient */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 mesh-gradient animate-gradient-shift" />
          <img
            src={heroImage}
            alt="Kumbakonam Temples"
            className="w-full h-full object-cover opacity-40 animate-scale-in"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-transparent" />
          
          {/* Floating 3D Elements */}
          <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-temple opacity-20 blur-3xl rounded-full animate-float" />
          <div className="absolute bottom-40 right-20 w-48 h-48 bg-gradient-sunset opacity-20 blur-3xl rounded-full animate-float-alt" />
          <div className="absolute top-1/2 left-1/3 w-40 h-40 bg-gradient-gold opacity-15 blur-3xl rounded-full animate-bounce-glow" />
        </div>
        
        <div className="relative z-10 container mx-auto px-4 py-24 md:py-32">
          <div className="max-w-4xl">
            {/* Glowing Badge */}
            <Badge className="mb-6 bg-gradient-temple text-primary-foreground shadow-glow-intense animate-pulse-glow hover-ultra-3d inline-flex">
              🕉 <TranslatedText text="Sacred Heritage of Tamil Nadu" />
            </Badge>
            
            {/* Main Heading with 3D Effect */}
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 leading-tight animate-reveal">
              <span className="block hover-ultra-3d inline-block">
                <TranslatedText text="Discover the Divine" />
              </span>
              <span className="block text-gradient animate-shimmer bg-gradient-to-r from-primary via-primary-glow to-accent bg-clip-text text-transparent animate-gradient-shift mt-2">
                <TranslatedText text="Temples of Kumbakonam" />
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-200 mb-10 leading-relaxed animate-reveal max-w-2xl" style={{ animationDelay: '0.2s' }}>
              <TranslatedText text="Explore ancient temples, rich heritage, and spiritual wisdom in the temple town of South India. Your AI-powered guide to sacred experiences." />
            </p>
            
            {/* CTA Buttons with Enhanced 3D */}
            <div className="flex flex-col sm:flex-row gap-6 mb-12 animate-reveal" style={{ animationDelay: '0.4s' }}>
              <Button variant="temple" size="lg" asChild className="hover-ultra-3d shadow-glow-intense group">
                <Link to="/temples">
                  <MapPin className="w-5 h-5 mr-2 icon-glow" />
                  <TranslatedText text="Explore Temples" />
                </Link>
              </Button>
              <Button variant="gold" size="lg" asChild className="hover-ultra-3d shadow-3d group">
                <Link to="/chat">
                  <MessageCircle className="w-5 h-5 mr-2 icon-glow" />
                  <TranslatedText text="Ask Temple Guide AI" />
                </Link>
              </Button>
            </div>

            {/* Enhanced Quick Search */}
            <div className="glass rounded-2xl p-6 border border-white/30 shadow-3d animate-reveal hover-ultra-3d" style={{ animationDelay: '0.6s' }}>
              <div className="flex gap-3">
                <Input
                  placeholder="Search temples, deities, or festivals..."
                  className="bg-white/20 border-white/30 text-white placeholder:text-white/70 focus:bg-white/30 focus:border-white/50 transition-all h-12 text-lg"
                />
                <Button variant="temple" className="hover:scale-110 transition-all shadow-temple h-12 px-6">
                  <Search className="w-5 h-5 icon-glow" />
                </Button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce-glow">
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex items-start justify-center p-2">
            <div className="w-1 h-3 bg-white/70 rounded-full animate-float" />
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 mesh-gradient relative overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-radial animate-float" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-glow animate-float-alt" />
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 perspective-container">
            {stats.map((stat, index) => (
              <Card key={index} className="text-center glass shadow-3d hover:shadow-glow-intense transition-all hover-ultra-3d animate-scale-in border-2 border-primary/20" style={{ animationDelay: `${index * 0.2}s` }}>
                <CardContent className="p-8">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-temple opacity-10 blur-2xl rounded-full" />
                    <stat.icon className="w-16 h-16 mx-auto mb-6 text-temple-saffron animate-bounce-glow icon-glow relative z-10" />
                  </div>
                  <h3 className="text-4xl md:text-5xl font-bold text-gradient mb-3 animate-shimmer bg-gradient-to-r from-primary via-primary-glow to-accent bg-clip-text text-transparent">{stat.value}</h3>
                  <p className="text-lg text-muted-foreground font-medium"><TranslatedText text={stat.label} /></p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Temples */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/20 to-background" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16 animate-reveal perspective-container">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 animate-float hover-ultra-3d inline-block">
              <span className="text-gradient bg-gradient-to-r from-primary via-primary-glow to-accent bg-clip-text text-transparent animate-gradient-shift">
                <TranslatedText text="Featured Sacred Sites" />
              </span>
            </h2>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              <TranslatedText text="Begin your spiritual journey with these magnificent temples, each with unique architecture and divine significance." />
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mb-16 perspective-container">
            {featuredTemples.map((temple, index) => (
              <div key={temple.id} className="animate-reveal hover-ultra-3d" style={{ animationDelay: `${index * 0.15}s` }}>
                <TempleCard {...temple} />
              </div>
            ))}
          </div>

          <div className="text-center animate-reveal">
            <Button variant="temple" size="lg" asChild className="hover-ultra-3d shadow-glow-intense text-lg px-8 py-6">
              <Link to="/temples">
                View All Temples
                <MapPin className="w-6 h-6 ml-3 icon-glow" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;