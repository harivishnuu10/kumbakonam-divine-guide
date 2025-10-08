import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Utensils, 
  ShoppingBag, 
  Calendar, 
  Info,
  Heart,
  Coffee,
  Sparkles,
  MapPin,
  AlertCircle,
  Clock,
  Users,
  Accessibility,
  Shield,
  Bus,
  Train,
  Plane,
  Car
} from "lucide-react";
import TranslatedText from "@/components/TranslatedText";
import { useLanguage } from "@/hooks/useLanguage";

const LocalGuide = () => {
  const { t } = useLanguage();

  const localFood = [
    {
      name: "Kumbakonam Degree Coffee",
      description: "Famous filter coffee made with chicory. The town is renowned for its unique coffee flavor, traditionally served in steel tumblers.",
      price: "₹30-50",
      where: "Available at: Murugan Idli Shop, Arya Bhavan, Sri Krishna Sweets",
      mustTry: true
    },
    {
      name: "Kumbakonam Filter Coffee",
      description: "Strong, aromatic coffee brewed in traditional brass filters. A morning ritual for locals.",
      price: "₹30-60",
      where: "Any local coffee house or restaurant",
      mustTry: true
    },
    {
      name: "Temple Prasadam",
      description: "Sacred food offerings from temples - includes sweet pongal, vadai, and coconut laddus.",
      price: "₹10-50",
      where: "Available at all major temples",
      mustTry: true
    },
    {
      name: "Arava Payasam",
      description: "Traditional rice pudding made with milk, sugar, and dry fruits. Served during festivals.",
      price: "₹40-80",
      where: "Hotel Raya's, Arya Bhavan",
      mustTry: false
    },
    {
      name: "Kumbakonam Thali",
      description: "Complete meal with rice, sambar, rasam, multiple vegetable curries, curd, and sweets on banana leaf.",
      price: "₹120-200",
      where: "Arya Bhavan, Hotel Shanmuga Bhavan, Mela Plaza",
      mustTry: true
    },
    {
      name: "Chettinad Cuisine",
      description: "Spicy regional dishes including kuzhambu, poriyal, and appalam.",
      price: "₹150-300",
      where: "Hotel Raya's, Priya Restaurant",
      mustTry: false
    },
    {
      name: "Kumbakonam Idli",
      description: "Soft, fluffy rice cakes served with sambar and chutneys. Breakfast staple.",
      price: "₹40-70",
      where: "Murugan Idli Shop, Sri Krishna Sweets",
      mustTry: true
    },
    {
      name: "Sweet Pongal",
      description: "Sweet rice dish made with jaggery, ghee, and cashews. Traditional breakfast or prasadam.",
      price: "₹50-80",
      where: "Available at most restaurants and temples",
      mustTry: false
    }
  ];

  const shopping = [
    {
      name: "Kumbakonam Silk Sarees",
      description: "Authentic handwoven silk sarees with traditional Kumbakonam designs. Made by local artisans.",
      price: "₹5,000-50,000",
      where: "Big Street, Sarangapani Sannadhi Street silk shops",
      tips: "Check for genuine silk mark. Bargaining is expected."
    },
    {
      name: "Bronze Idols & Lamps",
      description: "Traditional bronze statues of deities and oil lamps made using ancient lost-wax casting method.",
      price: "₹500-10,000+",
      where: "Bronze shops on Big Street and TSR Street",
      tips: "Kumbakonam is famous for Thanjavur-style bronze work."
    },
    {
      name: "Temple Jewelry",
      description: "Traditional South Indian temple jewelry - necklaces, earrings, and bangles.",
      price: "₹2,000-50,000",
      where: "Jewelry shops on Big Street",
      tips: "Available in gold, silver, and imitation. Check hallmark for gold."
    },
    {
      name: "Pooja Items",
      description: "Religious items including incense, camphor, kumkum, turmeric, and prayer accessories.",
      price: "₹50-500",
      where: "Shops near all major temples",
      tips: "Buy authentic sandalwood products. Good for souvenirs."
    },
    {
      name: "Handicrafts",
      description: "Wood carvings, traditional paintings, and handmade crafts.",
      price: "₹200-5,000",
      where: "Handicraft emporiums on Big Street",
      tips: "Support local artisans. Unique gift items."
    },
    {
      name: "Traditional Sweets",
      description: "Mysore pak, jangri, laddu, and other South Indian sweets.",
      price: "₹300-600 per kg",
      where: "Sri Krishna Sweets, Janatha Sweet Stall",
      tips: "Fresh sweets daily. Good travel snacks."
    },
    {
      name: "Spices & Coffee",
      description: "Authentic South Indian spices, coffee powder, and filter coffee sets.",
      price: "₹200-2,000",
      where: "Spice shops on Big Street market",
      tips: "Vacuum-packed available for easy travel."
    }
  ];

  const festivals = [
    {
      name: "Mahamaham",
      period: "Once in 12 years (Feb/Mar)",
      description: "The grand festival when millions gather for holy bath in Mahamaham tank. Next: 2028. Considered as sacred as Kumbh Mela.",
      significance: "Most important festival. Belief that all sacred rivers converge here during this time."
    },
    {
      name: "Chithirai Brahmotsavam",
      period: "April-May (10 days)",
      description: "Grand annual festival at Adi Kumbeswarar Temple with colorful processions, temple car festival, and cultural programs.",
      significance: "Celebrates the cosmic wedding of Lord Shiva and Goddess Parvati."
    },
    {
      name: "Vaikunta Ekadasi",
      period: "December-January",
      description: "Most important Vaishnava festival at Sarangapani Temple. The 'gates of heaven' (Vaikunta Dwaram) are opened.",
      significance: "Passing through Vaikunta Dwaram is believed to grant moksha (liberation)."
    },
    {
      name: "Shivaratri",
      period: "February-March",
      description: "Night-long celebration at all Shiva temples with continuous prayers, abhishekams, and devotional singing.",
      significance: "Celebrates the marriage of Lord Shiva and Parvati. Fasting and night vigil bring blessings."
    },
    {
      name: "Pongal",
      period: "January 14-17 (4 days)",
      description: "Tamil harvest festival celebrated with joy. Homes decorated, new clothes worn, sweet pongal cooked in new pots.",
      significance: "Thanks to Sun God for good harvest. Traditional cattle races and festivities."
    },
    {
      name: "Rama Navami",
      period: "March-April",
      description: "Celebrates birth of Lord Rama at Ramaswamy Temple with special pujas and cultural programs.",
      significance: "Grand celebrations with Ramayana recitations and devotional music."
    },
    {
      name: "Deepavali",
      period: "October-November",
      description: "Festival of lights celebrated with oil lamps, firecrackers, sweets, and new clothes.",
      significance: "Victory of light over darkness. Early morning oil bath is traditional."
    }
  ];

  const customs = [
    {
      title: "Temple Etiquette",
      icon: Heart,
      tips: [
        "Remove footwear before entering temple premises",
        "Dress modestly - cover shoulders and legs",
        "Men: Wear dhoti or formal pants; Women: Saree or salwar kameez",
        "No leather items inside temples",
        "Maintain silence in inner sanctum",
        "Photography restricted in many areas - always ask",
        "Follow clockwise pradakshinam (circumambulation)",
        "Don't point feet towards deity",
        "Wash hands and feet before entering"
      ]
    },
    {
      title: "Local Customs",
      icon: Users,
      tips: [
        "Greet with 'Vanakkam' (வணக்கம்) - folded hands",
        "Remove shoes when entering homes",
        "Use right hand for eating and giving/receiving",
        "Don't point with fingers - use open palm",
        "Public displays of affection not common",
        "Respect elders - touch feet for blessings",
        "Vegetarian food is predominant",
        "Bargaining expected in markets",
        "Dress conservatively, especially women"
      ]
    },
    {
      title: "Dining Etiquette",
      icon: Utensils,
      tips: [
        "Traditionally eaten with right hand on banana leaf",
        "Wash hands before and after meals",
        "Don't waste food - considered disrespectful",
        "Say 'Romba nandri' (Thank you) after meals",
        "Wait for elders to start eating",
        "Shoes removed before eating in traditional settings",
        "Most restaurants are vegetarian",
        "Filter coffee served after meals",
        "Tipping not mandatory but appreciated (10%)"
      ]
    }
  ];

  const travelTips = [
    {
      category: "Best Time to Visit",
      icon: Calendar,
      tips: [
        "October to March: Pleasant weather (20-30°C)",
        "April to June: Very hot (35-40°C)",
        "July to September: Monsoon season",
        "Temple festivals: Book accommodation in advance",
        "Mahamaham (2028): Plan 6 months ahead",
        "Weekend crowds: Visit temples on weekdays",
        "Morning visits: 6-9 AM less crowded"
      ]
    },
    {
      category: "Safety",
      icon: Shield,
      tips: [
        "Generally very safe for tourists",
        "Keep valuables secure at hotels",
        "Use prepaid auto-rickshaw stands",
        "Drink only bottled/filtered water",
        "Carry prescribed medicines",
        "Emergency numbers: Police-100, Ambulance-108",
        "Women: Conservative dress recommended",
        "Avoid deserted areas after dark",
        "Keep photocopies of ID documents"
      ]
    },
    {
      category: "Accessibility",
      icon: Accessibility,
      tips: [
        "Some temples have wheelchair ramps",
        "Elderly assistance available at major temples",
        "Wheelchairs can be arranged at hotels",
        "Inner sanctums may have steps",
        "Auto-rickshaws not wheelchair accessible",
        "Private taxis recommended for mobility issues",
        "Most restaurants are ground floor",
        "Hotels: Request ground floor rooms",
        "Temple priests helpful with special needs"
      ]
    },
    {
      category: "Getting Around",
      icon: Bus,
      tips: [
        "Auto-rickshaws: ₹30-100 within town",
        "Full day taxi hire: ₹2,000-3,000",
        "Local buses: ₹10-30 per trip",
        "Walking ideal for Big Street area",
        "Bicycle rentals available",
        "Book taxis through hotels for fair prices",
        "Use metered autos or agree price beforehand",
        "Town is compact - most temples within 3 km"
      ]
    },
    {
      category: "Getting There",
      icon: Train,
      tips: [
        "Train: Kumbakonam Junction - well connected",
        "From Chennai: 6-7 hours by train",
        "From Trichy: 1.5 hours by bus/train",
        "Nearest airport: Trichy (90 km)",
        "Chennai airport: 250 km (5-6 hours)",
        "Regular bus services from major cities",
        "Taxi from Trichy airport: ₹2,000-2,500",
        "Book train tickets in advance for festivals"
      ]
    },
    {
      category: "Money Matters",
      icon: Info,
      tips: [
        "Cash preferred at most places",
        "ATMs available throughout town",
        "Major hotels accept cards",
        "Temple donations: Cash only",
        "Daily budget: ₹1,500-3,000 per person",
        "Bargaining expected in markets",
        "Keep small denominations handy",
        "Mobile wallets increasingly accepted"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="bg-gradient-temple text-primary-foreground py-16">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <Badge className="mb-4 bg-white/20 text-white">
              <Heart className="w-4 h-4 mr-2" />
              <TranslatedText text="Local Culture & Traditions" />
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              <TranslatedText text="Kumbakonam Local Guide" />
            </h1>
            <p className="text-xl opacity-90">
              <TranslatedText text="Experience authentic Tamil culture, traditions, food, and local wisdom" />
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <Tabs defaultValue="food" className="space-y-8">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 lg:grid-cols-5 h-auto gap-2">
            <TabsTrigger value="food" className="flex items-center gap-2">
              <Utensils className="w-4 h-4" />
              <span className="hidden sm:inline"><TranslatedText text="Food" /></span>
            </TabsTrigger>
            <TabsTrigger value="shopping" className="flex items-center gap-2">
              <ShoppingBag className="w-4 h-4" />
              <span className="hidden sm:inline"><TranslatedText text="Shopping" /></span>
            </TabsTrigger>
            <TabsTrigger value="festivals" className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span className="hidden sm:inline"><TranslatedText text="Festivals" /></span>
            </TabsTrigger>
            <TabsTrigger value="customs" className="flex items-center gap-2">
              <Heart className="w-4 h-4" />
              <span className="hidden sm:inline"><TranslatedText text="Customs" /></span>
            </TabsTrigger>
            <TabsTrigger value="tips" className="flex items-center gap-2">
              <Info className="w-4 h-4" />
              <span className="hidden sm:inline"><TranslatedText text="Travel Tips" /></span>
            </TabsTrigger>
          </TabsList>

          {/* Food Tab */}
          <TabsContent value="food" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Coffee className="w-6 h-6 text-temple-saffron" />
                  <TranslatedText text="Must-Try Local Food" />
                </CardTitle>
                <CardDescription>
                  <TranslatedText text="Authentic Kumbakonam culinary delights and traditional South Indian flavors" />
                </CardDescription>
              </CardHeader>
              <CardContent className="grid md:grid-cols-2 gap-6">
                {localFood.map((food, index) => (
                  <Card key={index} className={food.mustTry ? "border-temple-gold shadow-gold" : ""}>
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-lg flex items-center gap-2">
                          {food.mustTry && <Sparkles className="w-5 h-5 text-temple-gold" />}
                          <TranslatedText text={food.name} />
                        </CardTitle>
                        <Badge variant={food.mustTry ? "default" : "secondary"} className={food.mustTry ? "bg-gradient-gold" : ""}>
                          {food.price}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <p className="text-sm text-muted-foreground">
                        <TranslatedText text={food.description} />
                      </p>
                      <div className="flex items-start gap-2 text-sm">
                        <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0 text-temple-saffron" />
                        <span className="text-muted-foreground">
                          <strong><TranslatedText text="Where" />:</strong> {food.where}
                        </span>
                      </div>
                      {food.mustTry && (
                        <Badge className="bg-temple-gold/20 text-temple-gold border-temple-gold">
                          <Sparkles className="w-3 h-3 mr-1" />
                          <TranslatedText text="Must Try!" />
                        </Badge>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Shopping Tab */}
          <TabsContent value="shopping" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ShoppingBag className="w-6 h-6 text-temple-saffron" />
                  <TranslatedText text="Shopping & Souvenirs" />
                </CardTitle>
                <CardDescription>
                  <TranslatedText text="Authentic Kumbakonam products and traditional handicrafts" />
                </CardDescription>
              </CardHeader>
              <CardContent className="grid md:grid-cols-2 gap-6">
                {shopping.map((item, index) => (
                  <Card key={index}>
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-lg">
                          <TranslatedText text={item.name} />
                        </CardTitle>
                        <Badge variant="secondary">{item.price}</Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <p className="text-sm text-muted-foreground">
                        <TranslatedText text={item.description} />
                      </p>
                      <div className="flex items-start gap-2 text-sm">
                        <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0 text-temple-saffron" />
                        <span className="text-muted-foreground">
                          <strong><TranslatedText text="Where" />:</strong> {item.where}
                        </span>
                      </div>
                      <div className="mt-2 p-2 bg-temple-gold/10 rounded text-sm">
                        <strong className="text-temple-gold">💡 <TranslatedText text="Tip" />:</strong>{" "}
                        <TranslatedText text={item.tips} />
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Festivals Tab */}
          <TabsContent value="festivals" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="w-6 h-6 text-temple-saffron" />
                  <TranslatedText text="Major Festivals & Celebrations" />
                </CardTitle>
                <CardDescription>
                  <TranslatedText text="Experience the vibrant festivals and cultural celebrations of Kumbakonam" />
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {festivals.map((festival, index) => (
                  <Card key={index} className="border-temple-saffron/20">
                    <CardHeader>
                      <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-2">
                        <CardTitle className="text-xl">
                          <TranslatedText text={festival.name} />
                        </CardTitle>
                        <Badge variant="outline" className="w-fit">
                          <Clock className="w-3 h-3 mr-1" />
                          {festival.period}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <p className="text-muted-foreground">
                        <TranslatedText text={festival.description} />
                      </p>
                      <div className="p-3 bg-gradient-temple/10 rounded-lg border border-temple-saffron/20">
                        <p className="text-sm">
                          <strong className="text-temple-saffron"><TranslatedText text="Significance" />:</strong>{" "}
                          <TranslatedText text={festival.significance} />
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Customs Tab */}
          <TabsContent value="customs" className="space-y-6">
            {customs.map((custom, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <custom.icon className="w-6 h-6 text-temple-saffron" />
                    <TranslatedText text={custom.title} />
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="grid md:grid-cols-2 gap-3">
                    {custom.tips.map((tip, tipIndex) => (
                      <li key={tipIndex} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <span className="text-temple-gold mt-0.5">•</span>
                        <span><TranslatedText text={tip} /></span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          {/* Travel Tips Tab */}
          <TabsContent value="tips" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {travelTips.map((section, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <section.icon className="w-5 h-5 text-temple-saffron" />
                      <TranslatedText text={section.category} />
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {section.tips.map((tip, tipIndex) => (
                        <li key={tipIndex} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <span className="text-temple-gold mt-0.5">•</span>
                          <span><TranslatedText text={tip} /></span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Emergency Contacts */}
            <Card className="border-destructive/20 bg-destructive/5">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-destructive">
                  <AlertCircle className="w-6 h-6" />
                  <TranslatedText text="Emergency Contacts" />
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <p className="font-semibold"><TranslatedText text="Police" /></p>
                    <p className="text-muted-foreground">100 / +91 435 242 2100</p>
                  </div>
                  <div>
                    <p className="font-semibold"><TranslatedText text="Ambulance" /></p>
                    <p className="text-muted-foreground">108 / 102</p>
                  </div>
                  <div>
                    <p className="font-semibold"><TranslatedText text="Fire Service" /></p>
                    <p className="text-muted-foreground">101</p>
                  </div>
                  <div>
                    <p className="font-semibold"><TranslatedText text="Tourist Help" /></p>
                    <p className="text-muted-foreground">+91 435 243 0888</p>
                  </div>
                  <div>
                    <p className="font-semibold"><TranslatedText text="Hospital" /></p>
                    <p className="text-muted-foreground">Government Hospital: +91 435 243 0444</p>
                  </div>
                  <div>
                    <p className="font-semibold"><TranslatedText text="Women Helpline" /></p>
                    <p className="text-muted-foreground">1091</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default LocalGuide;