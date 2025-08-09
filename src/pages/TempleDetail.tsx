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

// Comprehensive temple database for Kumbakonam
const templeDetails: Record<string, any> = {
  "adi-kumbeswarar": {
    name: "Adi Kumbeswarar Temple",
    deity: "Lord Shiva",
    description: "The Adi Kumbeswarar Temple stands as one of the most ancient and architecturally magnificent temples in Kumbakonam. Built during the reign of the Chola dynasty in the 7th century CE, this sacred shrine is dedicated to Lord Shiva in his form as Adi Kumbeswarar. The temple complex showcases exceptional Dravidian architecture with its towering gopurams, intricate stone carvings, and pillared halls that reflect the artistic excellence of ancient Tamil craftsmen.",
    history: "According to Hindu mythology, this temple marks the sacred spot where Lord Brahma's kamandalu (sacred pot) broke during the cosmic deluge, with its pieces scattering across the earth. The largest fragment fell at this location, giving birth to the name 'Kumbakonam' (Kumbha meaning pot, Konam meaning corner). The temple was originally constructed by the Chola kings and later renovated by various dynasties including the Vijayanagara Empire. It houses several ancient inscriptions that provide valuable insights into the region's history and the patronage of various rulers.",
    timings: {
      morning: "6:00 AM - 12:30 PM",
      evening: "4:00 PM - 9:00 PM"
    },
    festivals: [
      {
        name: "Mahamaham Festival",
        description: "The most sacred festival celebrated once every 12 years when Jupiter enters Leo sign. Millions of devotees gather to take holy bath in the temple tank.",
        period: "February/March (once in 12 years)"
      },
      {
        name: "Chithirai Brahmotsavam",
        description: "Grand annual festival featuring colorful processions, temple car festival, and special pujas for 10 days.",
        period: "April/May (10 days)"
      },
      {
        name: "Arudra Darisanam",
        description: "Special celebration honoring Lord Shiva's cosmic dance performed during full moon in the Tamil month of Margazhi.",
        period: "December/January"
      },
      {
        name: "Shivaratri",
        description: "Night-long vigil and prayers dedicated to Lord Shiva with special abhishekams and cultural programs.",
        period: "February/March"
      }
    ],
    location: {
      address: "Big Street, Kumbakonam, Thanjavur District, Tamil Nadu 612001",
      coordinates: "10.9577° N, 79.3773° E",
      latitude: 10.9577,
      longitude: 79.3773
    },
    contact: {
      phone: "+91 435 242 1234",
      email: "temple@adikumbeswarar.org"
    },
    facilities: ["Free Parking Available", "Wheelchair Accessible Entrance", "Audio Guide in Tamil & English", "Photography Allowed in Outer Areas", "Prasadam Counter", "Restroom Facilities"],
    dresscode: "Traditional Indian attire required. Men: Dhoti with shirt or formal pants. Women: Saree, salwar kameez, or traditional Indian dress. Shorts and sleeveless tops not permitted.",
    image: "/src/assets/adi-kumbeswarar.jpg",
    gallery: ["/src/assets/adi-kumbeswarar.jpg", "/src/assets/hero-temple.jpg", "/src/assets/adi-kumbeswarar.jpg"]
  },
  "sarangapani": {
    name: "Sarangapani Temple",
    deity: "Lord Vishnu",
    description: "The magnificent Sarangapani Temple is one of the most prominent Vaishnavite temples in South India and holds the distinction of being one of the 108 Divya Desams. Dedicated to Lord Vishnu in his form as Sarangapani (one who holds the bow), this temple represents the pinnacle of Chola and later period architecture. The temple's towering 12-tier gopuram, one of the tallest in Tamil Nadu, dominates the Kumbakonam skyline and serves as a beacon for devotees from across the world.",
    history: "Built during the early Chola period and later expanded by subsequent rulers, the Sarangapani Temple has a rich history spanning over 1,000 years. The temple finds mention in the Divya Prabandham, composed by the Alvars (Vaishnavite saint-poets) between the 6th and 9th centuries CE. According to legend, Lord Vishnu appeared here to sage Hemarishi who was performing penance. The temple's architecture reflects various periods of construction, with the main sanctum dating to the Chola era and the outer structures added during the Vijayanagara and Nayak periods.",
    timings: {
      morning: "6:00 AM - 12:00 PM",
      evening: "4:00 PM - 8:30 PM"
    },
    festivals: [
      {
        name: "Vaikunta Ekadasi",
        description: "The most important festival when the 'gates of heaven' are believed to open. Special door (Vaikunta Dwara) is opened for devotees.",
        period: "December/January"
      },
      {
        name: "Brahmotsavam",
        description: "10-day grand festival featuring temple car procession, cultural programs, and elaborate decorations.",
        period: "March/April"
      },
      {
        name: "Garuda Sevai",
        description: "Special procession of the deity on Garuda Vahanam with traditional music and devotional singing.",
        period: "May/June"
      }
    ],
    location: {
      address: "Sarangapani Sannidhi Street, Kumbakonam, Tamil Nadu 612001",
      coordinates: "10.9614° N, 79.3776° E",
      latitude: 10.9614,
      longitude: 79.3776
    },
    contact: {
      phone: "+91 435 242 5678",
      email: "info@sarangapanitemple.org"
    },
    facilities: ["Paid Parking", "Elevator Access", "Multilingual Audio Guide", "Photography Restricted", "Temple Museum", "Accommodation for Pilgrims"],
    dresscode: "Conservative traditional attire mandatory. Devotees must remove leather items before entering. Dress code strictly enforced.",
    image: "/src/assets/sarangapani.jpg",
    gallery: ["/src/assets/sarangapani.jpg", "/src/assets/hero-temple.jpg", "/src/assets/sarangapani.jpg"]
  },
  "ramaswamy": {
    name: "Ramaswamy Temple",
    deity: "Lord Rama",
    description: "The Ramaswamy Temple stands as a masterpiece of Nayak period architecture, renowned for its exquisite frescoes and intricate sculptural work. Built in the 17th century, this temple is dedicated to Lord Rama and represents one of the finest examples of mural paintings in South India. The temple's halls are adorned with vibrant frescoes depicting scenes from the Ramayana, making it not just a place of worship but also a treasure trove of ancient Indian art and culture.",
    history: "Constructed during the Nayak period in the 17th century by King Raghunatha Nayak, this temple showcases the artistic renaissance that occurred during Nayak rule. The temple is famous for its 'Corridor of Stories' - pillared halls decorated with stunning frescoes that narrate the entire Ramayana epic. These paintings, executed in natural pigments, have survived centuries and continue to mesmerize visitors with their artistic excellence and attention to detail. The temple also houses beautiful bronze sculptures and wooden carvings that reflect the craftsmanship of the period.",
    timings: {
      morning: "6:00 AM - 12:00 PM",
      evening: "4:00 PM - 8:00 PM"
    },
    festivals: [
      {
        name: "Rama Navami",
        description: "Birth celebration of Lord Rama with special pujas, devotional singing, and dramatic presentations of Ramayana episodes.",
        period: "March/April"
      },
      {
        name: "Hanuman Jayanti",
        description: "Birthday celebration of Lord Hanuman with special prayers and community feasts.",
        period: "April/May"
      },
      {
        name: "Kalyanam Festival",
        description: "Ceremonial wedding of Lord Rama and Sita with elaborate decorations and cultural programs.",
        period: "May/June"
      }
    ],
    location: {
      address: "Ramaswamy Temple Street, Kumbakonam, Tamil Nadu 612001",
      coordinates: "10.9598° N, 79.3751° E",
      latitude: 10.9598,
      longitude: 79.3751
    },
    contact: {
      phone: "+91 435 242 9012",
      email: "contact@ramaswamytemple.org"
    },
    facilities: ["Free Parking", "Guided Tours Available", "Photography Allowed with Permission", "Art Gallery", "Cultural Center", "Educational Programs"],
    dresscode: "Modest traditional clothing required. Visitors should cover shoulders and legs. Cultural sensitivity appreciated.",
    image: "/src/assets/ramaswamy.jpg",
    gallery: ["/src/assets/ramaswamy.jpg", "/src/assets/hero-temple.jpg", "/src/assets/ramaswamy.jpg"]
  },
  "nageshwara": {
    name: "Nageshwara Temple",
    deity: "Lord Shiva",
    description: "The Nageshwara Temple, also known as Naganathaswamy Temple, is an ancient Shiva temple renowned for its association with Rahu worship and eclipse-related rituals. This 9th-century temple, built by Aditya Chola I, represents the perfect synthesis of astronomy, architecture, and spirituality. The temple is uniquely designed so that sunlight falls directly on the sanctum sanctorum only during solar eclipses, demonstrating the advanced astronomical knowledge of ancient Tamil architects.",
    history: "Built in the 9th century during the reign of Aditya Chola I, the Nageshwara Temple represents one of the finest examples of early Chola architecture. The temple gained prominence due to its unique astronomical alignment and its role in eclipse worship. According to ancient texts, this temple is one of the few places where Rahu (the eclipse deity) can be worshipped to nullify the negative effects of eclipses. The temple's architecture incorporates precise calculations that align the sanctum with celestial events, showcasing the advanced understanding of astronomy possessed by ancient Tamil scholars and architects.",
    timings: {
      morning: "6:00 AM - 12:00 PM",
      evening: "4:00 PM - 8:00 PM"
    },
    festivals: [
      {
        name: "Rahu Kalam Special Poojas",
        description: "Special worship during Rahu kalam periods believed to neutralize negative planetary influences.",
        period: "Daily during Rahu Kalam"
      },
      {
        name: "Solar Eclipse Prayers",
        description: "Unique ritual performed during solar eclipses when sunlight directly illuminates the main deity.",
        period: "During Solar Eclipses"
      },
      {
        name: "Shivaratri",
        description: "Night-long celebration with continuous prayers, abhishekams, and devotional activities.",
        period: "February/March"
      }
    ],
    location: {
      address: "Nageshwara Temple Street, Kumbakonam, Tamil Nadu 612001",
      coordinates: "10.9589° N, 79.3792° E",
      latitude: 10.9589,
      longitude: 79.3792
    },
    contact: {
      phone: "+91 435 242 3456",
      email: "info@nageshwaratemple.org"
    },
    facilities: ["Limited Parking", "Eclipse Viewing Gallery", "Astronomy Center", "Traditional Calendar Display", "Rahu Worship Area", "Scholar Consultation"],
    dresscode: "Traditional attire required for eclipse ceremonies. General visits require modest clothing covering shoulders and legs.",
    image: "/src/assets/nageshwara.jpg",
    gallery: ["/src/assets/nageshwara.jpg", "/src/assets/hero-temple.jpg", "/src/assets/nageshwara.jpg"]
  },
  "chakrapani": {
    name: "Chakrapani Temple",
    deity: "Lord Vishnu",
    description: "The Chakrapani Temple holds the unique distinction of being one of the nine Navagraha temples dedicated to Sukran (Venus) while primarily serving as a Vishnu temple. This dual religious significance makes it a rare and important pilgrimage site. Built during the Chola period, the temple showcases classical Dravidian architecture and is renowned for its healing properties, particularly for ailments related to diabetes and skin conditions. The temple's peaceful ambiance and spiritual energy attract both religious devotees and those seeking alternative healing.",
    history: "The Chakrapani Temple was constructed during the early Chola period as part of the Navagraha temple circuit around Kumbakonam. Each of these nine temples corresponds to one of the nine celestial bodies in Hindu astronomy. This temple specifically represents Sukran (Venus) and is believed to help devotees overcome the malefic effects of Venus in their astrological charts. The temple gained prominence for its miraculous healing powers, with numerous devotees reporting recovery from chronic ailments after regular worship here. Historical records indicate that the temple received significant patronage from various dynasties who recognized its spiritual and therapeutic importance.",
    timings: {
      morning: "6:00 AM - 12:00 PM",
      evening: "4:00 PM - 8:00 PM"
    },
    festivals: [
      {
        name: "Sukran Jayanti",
        description: "Special celebration honoring planet Venus with elaborate rituals and astrological consultations.",
        period: "Based on Lunar Calendar"
      },
      {
        name: "Navagraha Pooja",
        description: "Comprehensive planetary worship involving all nine celestial deities for astrological benefits.",
        period: "Every Friday"
      },
      {
        name: "Healing Festival",
        description: "Annual celebration focusing on the temple's healing powers with medical camps and wellness programs.",
        period: "November/December"
      }
    ],
    location: {
      address: "Chakrapani Temple Road, Kumbakonam, Tamil Nadu 612001",
      coordinates: "10.9561° N, 79.3724° E",
      latitude: 10.9561,
      longitude: 79.3724
    },
    contact: {
      phone: "+91 435 242 7890",
      email: "contact@chakrapanitemple.org"
    },
    facilities: ["Healing Center", "Astrological Consultation", "Herbal Medicine Dispensary", "Meditation Hall", "Parking Available", "Health Records Archive"],
    dresscode: "Clean traditional attire required. Patients visiting for healing should wear white or light-colored clothing.",
    image: "/src/assets/hero-temple.jpg",
    gallery: ["/src/assets/hero-temple.jpg", "/src/assets/hero-temple.jpg", "/src/assets/hero-temple.jpg"]
  },
  "someswarar": {
    name: "Someswarar Temple",
    deity: "Lord Shiva",
    description: "The Someswarar Temple is dedicated to Lord Shiva in his moon-aspect form, making it one of the most spiritually significant temples for Monday worship and lunar-related rituals. Built during the Chola period, this ancient temple is renowned for its association with mental peace, emotional healing, and lunar deity worship. The temple's unique positioning and architectural elements are designed to harness lunar energy, making it a powerful center for meditation and spiritual practices related to mind and emotion.",
    history: "Constructed during the reign of the Chola dynasty, the Someswarar Temple has served as a center for lunar worship for over a millennium. The temple derives its name from 'Soma,' another name for the moon, and Lord Shiva's association with the lunar deity. According to legend, the moon god (Chandra) performed penance here to overcome the curse that caused his waning. The temple's architecture incorporates elements that align with lunar cycles, and it has traditionally been a place where devotees come to seek relief from mental afflictions, emotional disturbances, and to enhance their spiritual consciousness through moon-related practices.",
    timings: {
      morning: "6:00 AM - 12:00 PM",
      evening: "4:00 PM - 8:00 PM"
    },
    festivals: [
      {
        name: "Pradosham",
        description: "Bi-monthly celebration during the 13th lunar day when special prayers are offered to Lord Shiva during twilight hours.",
        period: "Twice every month"
      },
      {
        name: "Kartik Somvar",
        description: "Special Monday worship during the month of Kartik considered highly auspicious for Lord Shiva devotees.",
        period: "October/November"
      },
      {
        name: "Chandra Darshan",
        description: "Moon sighting ceremony with special prayers performed during new moon and full moon days.",
        period: "Monthly"
      }
    ],
    location: {
      address: "Someswarar Temple Lane, Kumbakonam, Tamil Nadu 612001",
      coordinates: "10.9542° N, 79.3758° E",
      latitude: 10.9542,
      longitude: 79.3758
    },
    contact: {
      phone: "+91 435 242 4567",
      email: "info@someswaratemple.org"
    },
    facilities: ["Meditation Garden", "Lunar Calendar Display", "Mental Wellness Center", "Traditional Astrology Consultation", "Parking Available", "Moon Phase Observatory"],
    dresscode: "Traditional white or light-colored attire preferred for lunar worship. Modest clothing covering shoulders and legs required.",
    image: "/src/assets/hero-temple.jpg",
    gallery: ["/src/assets/hero-temple.jpg", "/src/assets/hero-temple.jpg", "/src/assets/hero-temple.jpg"]
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
              <Button 
                variant="temple" 
                className="w-full"
                onClick={() => {
                  const url = `https://www.google.com/maps/dir/?api=1&destination=${temple.location.latitude},${temple.location.longitude}&travelmode=driving`;
                  window.open(url, '_blank');
                }}
              >
                <Navigation className="w-4 h-4 mr-2" />
                Get Directions
              </Button>
              <Button 
                variant="gold" 
                className="w-full"
                onClick={() => {
                  const url = `https://www.google.com/maps/search/?api=1&query=${temple.location.latitude},${temple.location.longitude}`;
                  window.open(url, '_blank');
                }}
              >
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