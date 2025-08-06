import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, MapPin, Clock, Star, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-temple.jpg";
import TempleCard from "@/components/TempleCard";

// Sample temple data for demonstration
const featuredTemples = [
  {
    id: "adi-kumbeswarar",
    name: "Adi Kumbeswarar Temple",
    deity: "Lord Shiva",
    description: "One of the most ancient temples in Kumbakonam, built by the Cholas. Famous for its magnificent architecture and spiritual significance.",
    timings: "6:00 AM - 12:30 PM, 4:00 PM - 9:00 PM",
    image: "/placeholder.svg",
    festivals: ["Mahamaham", "Chithirai", "Arudra Darisanam"]
  },
  {
    id: "sarangapani",
    name: "Sarangapani Temple",
    deity: "Lord Vishnu",
    description: "A magnificent Vaishnavite temple known for its towering gopuram and intricate carvings. One of the 108 Divya Desams.",
    timings: "6:00 AM - 12:00 PM, 4:00 PM - 8:00 PM",
    image: "/placeholder.svg",
    festivals: ["Brahmotsavam", "Vaikunta Ekadasi"]
  },
  {
    id: "ramaswamy",
    name: "Ramaswamy Temple",
    deity: "Lord Rama",
    description: "Dedicated to Lord Rama, this temple showcases exquisite Nayak period architecture with beautiful paintings and sculptures.",
    timings: "6:00 AM - 12:00 PM, 4:00 PM - 8:00 PM", 
    image: "/placeholder.svg",
    festivals: ["Rama Navami", "Hanuman Jayanti"]
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
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={heroImage}
            alt="Kumbakonam Temples"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30" />
        </div>
        
        <div className="relative z-10 container mx-auto px-4 py-24 md:py-32">
          <div className="max-w-3xl">
            <Badge className="mb-4 bg-gradient-temple text-primary-foreground">
              🕉 Sacred Heritage of Tamil Nadu
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Discover the Divine
              <span className="block bg-gradient-temple bg-clip-text text-transparent">
                Temples of Kumbakonam
              </span>
            </h1>
            <p className="text-xl text-gray-200 mb-8 leading-relaxed">
              Explore ancient temples, rich heritage, and spiritual wisdom in the temple town
              of South India. Your AI-powered guide to sacred experiences.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <Button variant="temple" size="lg" asChild>
                <Link to="/temples">
                  <MapPin className="w-5 h-5 mr-2" />
                  Explore Temples
                </Link>
              </Button>
              <Button variant="gold" size="lg" asChild>
                <Link to="/chat">
                  <MessageCircle className="w-5 h-5 mr-2" />
                  Ask Temple Guide AI
                </Link>
              </Button>
            </div>

            {/* Quick Search */}
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
              <div className="flex gap-2">
                <Input
                  placeholder="Search temples, deities, or festivals..."
                  className="bg-white/20 border-white/30 text-white placeholder:text-white/70"
                />
                <Button variant="temple">
                  <Search className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gradient-to-b from-background to-secondary/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {stats.map((stat, index) => (
              <Card key={index} className="text-center bg-card/50 backdrop-blur-sm shadow-soft hover:shadow-gold transition-temple">
                <CardContent className="p-6">
                  <stat.icon className="w-12 h-12 mx-auto mb-4 text-temple-saffron" />
                  <h3 className="text-3xl font-bold text-foreground mb-2">{stat.value}</h3>
                  <p className="text-muted-foreground">{stat.label}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Temples */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Featured Sacred Sites
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Begin your spiritual journey with these magnificent temples, each with unique
              architecture and divine significance.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {featuredTemples.map((temple) => (
              <TempleCard key={temple.id} {...temple} />
            ))}
          </div>

          <div className="text-center">
            <Button variant="temple" size="lg" asChild>
              <Link to="/temples">
                View All Temples
                <MapPin className="w-5 h-5 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;