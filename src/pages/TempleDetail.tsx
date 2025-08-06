import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  ArrowLeft, 
  MapPin, 
  Clock, 
  Calendar, 
  Camera, 
  Star,
  Navigation,
  Phone,
  Users
} from "lucide-react";

// Sample detailed temple data
const templeDetails: Record<string, any> = {
  "adi-kumbeswarar": {
    name: "Adi Kumbeswarar Temple",
    deity: "Lord Shiva",
    description: "The Adi Kumbeswarar Temple is one of the most ancient and revered temples in Kumbakonam, dedicated to Lord Shiva. Built during the Chola period, this magnificent temple showcases the architectural brilliance of South Indian temple construction. The temple is famous for its towering gopuram, intricate stone carvings, and spiritual significance in Hindu mythology.",
    history: "According to legend, Lord Brahma was performing a yajna when his kamandalu (water pot) broke and scattered across the earth. The place where the largest piece fell became known as Kumbakonam. The temple was later built by the Chola kings and has been a center of spiritual learning for centuries.",
    timings: {
      morning: "6:00 AM - 12:30 PM",
      evening: "4:00 PM - 9:00 PM"
    },
    festivals: [
      {
        name: "Mahamaham",
        description: "The grand festival held once every 12 years",
        period: "February/March"
      },
      {
        name: "Chithirai Festival",
        description: "Annual temple festival with processions",
        period: "April/May"
      },
      {
        name: "Arudra Darisanam",
        description: "Special prayers during full moon",
        period: "December/January"
      }
    ],
    location: {
      address: "Big Street, Kumbakonam, Tamil Nadu 612001",
      coordinates: "10.9577° N, 79.3773° E"
    },
    contact: {
      phone: "+91 435 242 1234",
      email: "info@adikumbeswarar.org"
    },
    facilities: ["Parking Available", "Wheelchair Accessible", "Audio Guide", "Photography Allowed"],
    dresscode: "Traditional attire preferred. Men: Dhoti/Pant with shirt. Women: Saree/Salwar",
    image: "/placeholder.svg",
    gallery: ["/placeholder.svg", "/placeholder.svg", "/placeholder.svg"]
  }
};

const TempleDetail = () => {
  const { id } = useParams();
  const temple = templeDetails[id || ""];

  if (!temple) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Temple Not Found</h1>
          <Button variant="temple" asChild>
            <Link to="/temples">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Temples
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Image Section */}
      <div className="relative h-96 overflow-hidden">
        <img
          src={temple.image}
          alt={temple.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/10" />
        
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div className="container mx-auto">
            <Button variant="outline" size="sm" asChild className="mb-4 bg-white/20 backdrop-blur-sm border-white/30 text-white hover:bg-white/30">
              <Link to="/temples">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Temples
              </Link>
            </Button>
            
            <div className="flex items-center space-x-3 mb-2">
              <Badge className="bg-gradient-temple text-primary-foreground">
                {temple.deity}
              </Badge>
              <div className="flex items-center text-yellow-400">
                <Star className="w-4 h-4 fill-current" />
                <Star className="w-4 h-4 fill-current" />
                <Star className="w-4 h-4 fill-current" />
                <Star className="w-4 h-4 fill-current" />
                <Star className="w-4 h-4 fill-current" />
              </div>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
              {temple.name}
            </h1>
            <p className="text-white/90 text-lg">
              <MapPin className="w-4 h-4 inline mr-1" />
              {temple.location.address}
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Description */}
            <Card className="shadow-soft">
              <CardHeader>
                <CardTitle className="text-2xl text-foreground">About the Temple</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  {temple.description}
                </p>
                <Separator className="my-4" />
                <h4 className="font-semibold text-foreground mb-2">History & Significance</h4>
                <p className="text-muted-foreground leading-relaxed">
                  {temple.history}
                </p>
              </CardContent>
            </Card>

            {/* Festivals */}
            <Card className="shadow-soft">
              <CardHeader>
                <CardTitle className="text-2xl text-foreground flex items-center">
                  <Calendar className="w-6 h-6 mr-2 text-temple-red" />
                  Festivals & Celebrations
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {temple.festivals.map((festival: any, index: number) => (
                    <div key={index} className="border-l-4 border-temple-saffron pl-4">
                      <h4 className="font-semibold text-foreground">{festival.name}</h4>
                      <p className="text-muted-foreground text-sm mb-1">{festival.description}</p>
                      <Badge variant="outline" className="text-xs">
                        {festival.period}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Gallery */}
            <Card className="shadow-soft">
              <CardHeader>
                <CardTitle className="text-2xl text-foreground flex items-center">
                  <Camera className="w-6 h-6 mr-2 text-temple-gold" />
                  Photo Gallery
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {temple.gallery.map((image: string, index: number) => (
                    <div key={index} className="aspect-square overflow-hidden rounded-lg">
                      <img
                        src={image}
                        alt={`${temple.name} gallery ${index + 1}`}
                        className="w-full h-full object-cover hover:scale-105 transition-temple cursor-pointer"
                      />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Info */}
            <Card className="shadow-soft">
              <CardHeader>
                <CardTitle className="text-xl text-foreground">Temple Info</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start space-x-3">
                  <Clock className="w-5 h-5 text-temple-saffron mt-0.5" />
                  <div>
                    <p className="font-medium text-foreground">Timings</p>
                    <p className="text-sm text-muted-foreground">
                      Morning: {temple.timings.morning}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Evening: {temple.timings.evening}
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Phone className="w-5 h-5 text-temple-gold mt-0.5" />
                  <div>
                    <p className="font-medium text-foreground">Contact</p>
                    <p className="text-sm text-muted-foreground">{temple.contact.phone}</p>
                    <p className="text-sm text-muted-foreground">{temple.contact.email}</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Users className="w-5 h-5 text-temple-red mt-0.5" />
                  <div>
                    <p className="font-medium text-foreground">Dress Code</p>
                    <p className="text-sm text-muted-foreground">{temple.dresscode}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Facilities */}
            <Card className="shadow-soft">
              <CardHeader>
                <CardTitle className="text-xl text-foreground">Facilities</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {temple.facilities.map((facility: string, index: number) => (
                    <div key={index} className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-temple-saffron rounded-full" />
                      <span className="text-sm text-muted-foreground">{facility}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Actions */}
            <div className="space-y-3">
              <Button variant="temple" className="w-full">
                <Navigation className="w-4 h-4 mr-2" />
                Get Directions
              </Button>
              <Button variant="gold" className="w-full">
                <MapPin className="w-4 h-4 mr-2" />
                View on Map
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TempleDetail;