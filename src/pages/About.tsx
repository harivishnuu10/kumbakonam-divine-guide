import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Hotel, MessageCircle, Map, Languages, Calendar, Code2, Palette, Database, Zap } from "lucide-react";
import TranslatedText from "@/components/TranslatedText";

const About = () => {
  const features = [
    { icon: MapPin, title: "Temple Information", description: "Detailed guides for Kumbakonam's sacred temples" },
    { icon: Hotel, title: "Hotel Recommendations", description: "Curated accommodations for pilgrims and travelers" },
    { icon: Map, title: "Interactive Maps", description: "Navigate with ease using integrated Google Maps" },
    { icon: MessageCircle, title: "AI Chat Assistant", description: "Get instant answers to your travel questions" },
    { icon: Languages, title: "Multi-language Support", description: "Access content in your preferred language" },
    { icon: Calendar, title: "Itinerary Planning", description: "Plan your perfect temple tour experience" },
  ];

  const developers = [
    {
      name: "Harivishnu",
      role: "Full Stack Developer",
      initials: "HV",
      description: "Specialized in frontend architecture and user experience design, bringing the vision of seamless temple exploration to life through modern web technologies.",
      gradient: "from-temple-primary to-temple-accent"
    },
    {
      name: "Yuvansankar",
      role: "Full Stack Developer",
      initials: "YS",
      description: "Expert in backend systems and API integration, ensuring robust data management and smooth functionality across all features of the platform.",
      gradient: "from-temple-accent to-temple-secondary"
    }
  ];

  const techStack = [
    { icon: Code2, name: "React + TypeScript", color: "text-blue-500" },
    { icon: Palette, name: "Tailwind CSS", color: "text-cyan-500" },
    { icon: Map, name: "Google Maps API", color: "text-green-500" },
    { icon: Database, name: "Supabase Backend", color: "text-purple-500" },
    { icon: Zap, name: "AI-Powered Features", color: "text-yellow-500" },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-temple opacity-10 animate-gradient-shift"></div>
        <div className="container mx-auto text-center relative z-10">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-temple bg-clip-text text-transparent animate-fade-in">
            <TranslatedText text="About Kumbakonam Temple Guide" />
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto animate-slide-up">
            <TranslatedText text="Your comprehensive digital companion for exploring the spiritual and cultural heritage of Kumbakonam's magnificent temples." />
          </p>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto max-w-4xl">
          <Card className="shadow-temple border-temple-primary/20 animate-scale-in">
            <CardHeader>
              <CardTitle className="text-3xl text-center bg-gradient-temple bg-clip-text text-transparent">
                <TranslatedText text="Our Mission" />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg text-center text-muted-foreground leading-relaxed">
                <TranslatedText text="We are dedicated to preserving and sharing the rich cultural heritage of Kumbakonam's temples while making spiritual tourism accessible to everyone through innovative technology. Our platform bridges ancient traditions with modern convenience, helping pilgrims and travelers discover, plan, and experience the divine beauty of these sacred spaces." />
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 bg-gradient-temple bg-clip-text text-transparent">
            <TranslatedText text="Key Features" />
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <Card 
                key={index} 
                className="group hover:shadow-temple transition-all duration-300 hover:-translate-y-2 cursor-pointer border-border/50 hover:border-temple-primary/50"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardHeader>
                  <div className="w-12 h-12 rounded-full bg-gradient-temple flex items-center justify-center mb-4 group-hover:animate-pulse-glow">
                    <feature.icon className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <CardTitle className="text-xl">
                    <TranslatedText text={feature.title} />
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    <TranslatedText text={feature.description} />
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Developers Section */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center mb-4 bg-gradient-temple bg-clip-text text-transparent">
            <TranslatedText text="Meet the Developers" />
          </h2>
          <p className="text-center text-muted-foreground mb-12 text-lg">
            <TranslatedText text="The talented individuals behind this platform" />
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {developers.map((dev, index) => (
              <Card 
                key={index}
                className="group hover:shadow-gold transition-all duration-500 hover:scale-105 border-2 border-border/50 hover:border-temple-accent/50 animate-float"
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <CardHeader className="text-center">
                  <div className={`w-24 h-24 mx-auto rounded-full bg-gradient-to-br ${dev.gradient} flex items-center justify-center text-3xl font-bold text-primary-foreground shadow-glow-intense group-hover:animate-bounce-glow mb-4`}>
                    {dev.initials}
                  </div>
                  <CardTitle className="text-2xl">{dev.name}</CardTitle>
                  <Badge className="mx-auto mt-2 bg-gradient-temple text-primary-foreground border-0">
                    {dev.role}
                  </Badge>
                </CardHeader>
                <CardContent>
                  <p className="text-center text-muted-foreground leading-relaxed">
                    {dev.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Technology Stack */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-4xl font-bold text-center mb-12 bg-gradient-temple bg-clip-text text-transparent">
            <TranslatedText text="Technology Stack" />
          </h2>
          <Card className="shadow-temple border-temple-primary/20">
            <CardContent className="pt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {techStack.map((tech, index) => (
                  <div 
                    key={index}
                    className="flex items-center space-x-3 p-4 rounded-lg bg-muted/50 hover:bg-muted transition-all hover:scale-105 cursor-pointer"
                  >
                    <tech.icon className={`w-8 h-8 ${tech.color}`} />
                    <span className="font-medium">{tech.name}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer Message */}
      <section className="py-12 px-4 text-center">
        <div className="container mx-auto max-w-3xl">
          <p className="text-lg text-muted-foreground italic">
            <TranslatedText text="Built with passion to serve pilgrims and travelers exploring the sacred temples of Kumbakonam" />
          </p>
        </div>
      </section>
    </div>
  );
};

export default About;
