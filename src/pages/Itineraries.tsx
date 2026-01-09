import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  Clock, 
  MapPin, 
  Coffee, 
  Utensils, 
  Camera, 
  Moon,
  Calendar,
  Navigation,
  Bus,
  Train,
  Printer,
  Share2
} from "lucide-react";
import { Link } from "react-router-dom";
import TranslatedText from "@/components/TranslatedText";
import ShareButton from "@/components/ShareButton";
import { useLanguage } from "@/hooks/useLanguage";
import { toast } from "@/hooks/use-toast";

const itineraries = [
  {
    id: "1-day",
    title: "1-Day Temple Circuit",
    duration: "8-10 hours",
    difficulty: "Easy",
    description: "Perfect for first-time visitors. Cover the most important temples with time for meals and rest.",
    stops: [
      {
        time: "6:00 AM",
        location: "Adi Kumbeswarar Temple",
        duration: "1.5 hours",
        description: "Start your day with the main Shiva temple. Attend morning prayers.",
        transport: "Auto-rickshaw from hotel (₹50-80)",
        tips: "Arrive early to avoid crowds. Photography allowed in outer areas only."
      },
      {
        time: "8:00 AM",
        location: "Breakfast at Murugan Idli Shop",
        duration: "45 mins",
        description: "Traditional South Indian breakfast - idli, dosa, vada with filter coffee.",
        transport: "5 min walk",
        tips: "Try their special sambar and coconut chutney. Cash only."
      },
      {
        time: "9:00 AM",
        location: "Sarangapani Temple",
        duration: "1.5 hours",
        description: "Visit the magnificent Vishnu temple with its towering gopuram.",
        transport: "Auto-rickshaw (₹30-50)",
        tips: "Climb the gopuram for panoramic views. Remove leather items."
      },
      {
        time: "11:00 AM",
        location: "Mahamaham Tank",
        duration: "30 mins",
        description: "Visit the sacred bathing ghat. Learn about the Mahamaham festival.",
        transport: "Walking distance",
        tips: "Good photo opportunity. Respect religious sentiments."
      },
      {
        time: "12:00 PM",
        location: "Lunch at Arya Bhavan",
        duration: "1 hour",
        description: "Authentic vegetarian meals served on banana leaf.",
        transport: "Auto-rickshaw (₹40)",
        tips: "Try the unlimited thali. Very popular, expect queues."
      },
      {
        time: "2:00 PM",
        location: "Rest at Hotel",
        duration: "1.5 hours",
        description: "Afternoon rest during peak heat.",
        transport: "Return to hotel",
        tips: "Essential for energy. Temples close during afternoon."
      },
      {
        time: "4:00 PM",
        location: "Ramaswamy Temple",
        duration: "1 hour",
        description: "Admire the beautiful frescoes and Nayak period architecture.",
        transport: "Auto-rickshaw (₹60)",
        tips: "Take guided tour to understand the paintings (₹100)."
      },
      {
        time: "5:30 PM",
        location: "Shopping at Big Street",
        duration: "1 hour",
        description: "Buy silk sarees, bronze idols, and temple souvenirs.",
        transport: "Walking",
        tips: "Bargain expected. Check quality of silk carefully."
      },
      {
        time: "7:00 PM",
        location: "Evening Prayer at Nageshwara Temple",
        duration: "45 mins",
        description: "Experience the evening aarti ceremony.",
        transport: "Auto-rickshaw (₹40)",
        tips: "Beautiful lamp lighting ceremony. Dress modestly."
      },
      {
        time: "8:00 PM",
        location: "Dinner at Hotel Shanmuga Bhavan",
        duration: "1 hour",
        description: "End the day with delicious South Indian dinner.",
        transport: "Auto-rickshaw back to hotel",
        tips: "Try their dosa varieties. Open till 10 PM."
      }
    ],
    estimatedCost: "₹800-1,200 per person (excluding accommodation)",
    bestSeason: "October to March"
  },
  {
    id: "2-day",
    title: "2-Day Heritage Experience",
    duration: "2 days",
    difficulty: "Moderate",
    description: "Comprehensive tour covering major temples, cultural sites, and local experiences.",
    stops: [
      // Day 1
      {
        day: "Day 1",
        time: "6:00 AM",
        location: "Adi Kumbeswarar Temple",
        duration: "2 hours",
        description: "Detailed exploration of the main Shiva temple. Attend abhishekam.",
        transport: "Auto-rickshaw from hotel",
        tips: "Join the morning rituals. Learn about temple history from priests."
      },
      {
        day: "Day 1",
        time: "8:30 AM",
        location: "Breakfast & Coffee",
        duration: "45 mins",
        description: "Traditional breakfast at local eatery.",
        transport: "Walking",
        tips: "Try pongal and vadai."
      },
      {
        day: "Day 1",
        time: "9:30 AM",
        location: "Sarangapani Temple",
        duration: "2 hours",
        description: "Detailed visit including temple museum and gopuram climb.",
        transport: "Auto-rickshaw",
        tips: "Take the audio guide (available in English & Tamil)."
      },
      {
        day: "Day 1",
        time: "12:00 PM",
        location: "Lunch at Hotel Raya's",
        duration: "1 hour",
        description: "Traditional Chettinad cuisine.",
        transport: "Auto-rickshaw",
        tips: "Book in advance for lunch thali."
      },
      {
        day: "Day 1",
        time: "2:00 PM",
        location: "Afternoon Rest",
        duration: "2 hours",
        description: "Rest at hotel during afternoon heat.",
        transport: "Hotel",
        tips: "Most temples close 12:30-4 PM."
      },
      {
        day: "Day 1",
        time: "4:30 PM",
        location: "Chakrapani Temple & Navagraha Circuit",
        duration: "2 hours",
        description: "Visit the Venus temple and learn about planetary worship.",
        transport: "Hired taxi recommended (₹500 for circuit)",
        tips: "Consider visiting 2-3 Navagraha temples in the circuit."
      },
      {
        day: "Day 1",
        time: "7:00 PM",
        location: "Kaveri River Evening Walk",
        duration: "1 hour",
        description: "Peaceful evening by the river. Watch sunset.",
        transport: "Auto-rickshaw",
        tips: "Good for photography. Less crowded."
      },
      {
        day: "Day 1",
        time: "8:30 PM",
        location: "Dinner & Cultural Show",
        duration: "2 hours",
        description: "Traditional Tamil dinner with Bharatanatyam performance.",
        transport: "Return to hotel",
        tips: "Check local cultural centers for evening performances."
      },
      // Day 2
      {
        day: "Day 2",
        time: "6:00 AM",
        location: "Someswarar Temple",
        duration: "1.5 hours",
        description: "Morning prayers at the moon temple.",
        transport: "Auto-rickshaw",
        tips: "Especially auspicious on Mondays."
      },
      {
        day: "Day 2",
        time: "8:00 AM",
        location: "Breakfast at Murugan Idli Shop",
        duration: "45 mins",
        description: "Famous local breakfast spot.",
        transport: "Walking",
        tips: "Try different types of idli."
      },
      {
        day: "Day 2",
        time: "9:00 AM",
        location: "Ramaswamy Temple",
        duration: "1.5 hours",
        description: "Explore the famous frescoes with a guide.",
        transport: "Auto-rickshaw",
        tips: "Photography requires special permission."
      },
      {
        day: "Day 2",
        time: "11:00 AM",
        location: "Nageshwara Temple",
        duration: "1 hour",
        description: "Visit the eclipse temple and astronomy center.",
        transport: "Auto-rickshaw",
        tips: "Learn about ancient astronomical knowledge."
      },
      {
        day: "Day 2",
        time: "12:30 PM",
        location: "Lunch at Vegetarian Restaurant",
        duration: "1 hour",
        description: "Authentic Tamil Nadu meals.",
        transport: "Walking distance",
        tips: "Unlimited rice and variety of curries."
      },
      {
        day: "Day 2",
        time: "2:00 PM",
        location: "Shopping & Silk Weaving Workshop",
        duration: "2 hours",
        description: "Visit silk weaving unit. Buy authentic Kumbakonam silk.",
        transport: "Taxi",
        tips: "Watch artisans at work. Negotiate prices."
      },
      {
        day: "Day 2",
        time: "4:30 PM",
        location: "Mahamaham Tank & Surroundings",
        duration: "1 hour",
        description: "Detailed exploration of the sacred tank area.",
        transport: "Auto-rickshaw",
        tips: "Visit the 16 mandapams around the tank."
      },
      {
        day: "Day 2",
        time: "6:00 PM",
        location: "Evening at Town Market",
        duration: "1.5 hours",
        description: "Experience local life. Buy spices, bronze items, and handicrafts.",
        transport: "Walking",
        tips: "Best time for fresh flowers and evening snacks."
      },
      {
        day: "Day 2",
        time: "8:00 PM",
        location: "Farewell Dinner",
        duration: "1.5 hours",
        description: "Special dinner at best local restaurant.",
        transport: "Auto-rickshaw",
        tips: "Book in advance at premium restaurants."
      }
    ],
    estimatedCost: "₹2,000-3,000 per person (excluding accommodation)",
    bestSeason: "October to March"
  },
  {
    id: "3-day",
    title: "3-Day Complete Exploration",
    duration: "3 days",
    difficulty: "Comprehensive",
    description: "Deep dive into Kumbakonam's temples, culture, nearby attractions, and local life.",
    stops: [
      // Day 1
      {
        day: "Day 1",
        time: "Full Day",
        location: "Temple Circuit Day",
        duration: "10 hours",
        description: "Follow the 1-day itinerary covering main temples.",
        transport: "Mix of auto-rickshaw and walking",
        tips: "Focus on major temples: Adi Kumbeswarar, Sarangapani, Ramaswamy."
      },
      // Day 2
      {
        day: "Day 2",
        time: "7:00 AM",
        location: "Navagraha Temple Circuit",
        duration: "Full day",
        description: "Visit all 9 planetary temples around Kumbakonam (requires full day with hired vehicle).",
        transport: "Hired car with driver (₹2,500-3,000)",
        tips: "Start early. Carry water and snacks. Wear comfortable shoes."
      },
      {
        day: "Day 2",
        location: "Circuit includes:",
        description: "Suriyanar Koil (Sun), Thingalur (Moon), Angarakan (Mars), Alangudi (Jupiter), Kanjanur (Venus), Tirunageswaram (Rahu), Keezhaperumpallam (Kethu), Vaitheeswaran Koil (Mars), Thiruvenkadu (Mercury)",
        tips: "Complete circuit brings astrological benefits. Lunch break at Vaitheeswaran Koil."
      },
      // Day 3  
      {
        day: "Day 3",
        time: "6:00 AM",
        location: "Early Temple Visit",
        duration: "1.5 hours",
        description: "Visit any remaining temples or revisit favorites.",
        transport: "Auto-rickshaw",
        tips: "Good time for peaceful darshan."
      },
      {
        day: "Day 3",
        time: "8:00 AM",
        location: "Darasuram Airavatesvara Temple",
        duration: "2 hours",
        description: "UNESCO World Heritage Site. 12th century Chola masterpiece (15 km from Kumbakonam).",
        transport: "Taxi or bus (₹200-300)",
        tips: "Must-visit. Exceptional stone carvings and architecture."
      },
      {
        day: "Day 3",
        time: "11:00 AM",
        location: "Swamimalai Murugan Temple",
        duration: "1.5 hours",
        description: "One of six abodes of Lord Murugan (8 km away).",
        transport: "Bus or taxi",
        tips: "Climb 60 steps. Beautiful views from top."
      },
      {
        day: "Day 3",
        time: "1:00 PM",
        location: "Lunch & Rest",
        duration: "2 hours",
        description: "Return to Kumbakonam for lunch and rest.",
        transport: "Return taxi",
        tips: "Try different restaurant than previous days."
      },
      {
        day: "Day 3",
        time: "3:30 PM",
        location: "Traditional Arts Workshop",
        duration: "2 hours",
        description: "Visit bronze casting workshop or silk weaving unit. Learn traditional crafts.",
        transport: "Taxi",
        tips: "Can purchase authentic handicrafts directly from artisans."
      },
      {
        day: "Day 3",
        time: "6:00 PM",
        location: "Kaveri River Ghats",
        duration: "1 hour",
        description: "Evening aarti ceremony at the river.",
        transport: "Auto-rickshaw",
        tips: "Beautiful sunset. Peaceful atmosphere."
      },
      {
        day: "Day 3",
        time: "7:30 PM",
        location: "Final Shopping & Departure Prep",
        duration: "1.5 hours",
        description: "Last minute shopping at Big Street market.",
        transport: "Walking",
        tips: "Buy prasadam, silk, bronze items as souvenirs."
      },
      {
        day: "Day 3",
        time: "9:00 PM",
        location: "Farewell Dinner",
        duration: "1 hour",
        description: "Celebration dinner at premium restaurant.",
        transport: "Auto-rickshaw",
        tips: "Reflect on your spiritual journey."
      }
    ],
    estimatedCost: "₹4,000-6,000 per person (excluding accommodation)",
    bestSeason: "October to March"
  }
];

const Itineraries = () => {
  const { t } = useLanguage();

  const handlePrint = (itineraryId: string) => {
    const itinerary = itineraries.find(i => i.id === itineraryId);
    if (!itinerary) return;

    const printWindow = window.open('', '_blank');
    if (!printWindow) {
      toast({
        title: "Unable to print",
        description: "Please allow pop-ups for this site to print itineraries.",
        variant: "destructive",
      });
      return;
    }

    const printContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>${itinerary.title} - TempleXplore</title>
          <style>
            body { font-family: Georgia, serif; padding: 40px; max-width: 800px; margin: 0 auto; }
            h1 { color: #c45c26; border-bottom: 2px solid #c45c26; padding-bottom: 10px; }
            h2 { color: #1a1a2e; margin-top: 20px; }
            .meta { display: flex; gap: 20px; margin-bottom: 20px; color: #666; }
            .stop { margin: 15px 0; padding: 15px; border-left: 3px solid #c45c26; background: #f9f9f9; }
            .stop-time { font-weight: bold; color: #c45c26; }
            .stop-location { font-size: 1.1em; font-weight: bold; margin: 5px 0; }
            .stop-desc { color: #333; }
            .stop-tip { font-style: italic; color: #666; margin-top: 5px; }
            .day-header { background: #c45c26; color: white; padding: 8px 15px; margin: 20px 0 10px; }
            .footer { margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; font-size: 0.9em; color: #666; }
            @media print { body { padding: 20px; } }
          </style>
        </head>
        <body>
          <h1>${itinerary.title}</h1>
          <p>${itinerary.description}</p>
          <div class="meta">
            <span><strong>Duration:</strong> ${itinerary.duration}</span>
            <span><strong>Cost:</strong> ${itinerary.estimatedCost}</span>
            <span><strong>Best Season:</strong> ${itinerary.bestSeason}</span>
          </div>
          <h2>Detailed Itinerary</h2>
          ${itinerary.stops.map((stop: any, index: number) => {
            const prevStop = itinerary.stops[index - 1] as any;
            const showDay = stop.day && (!prevStop || stop.day !== prevStop.day);
            return `
              ${showDay ? `<div class="day-header">${stop.day}</div>` : ''}
              <div class="stop">
                ${stop.time ? `<span class="stop-time">${stop.time}</span>` : ''}
                <div class="stop-location">${stop.location}</div>
                <div class="stop-desc">${stop.description}</div>
                ${stop.tips ? `<div class="stop-tip">💡 Tip: ${stop.tips}</div>` : ''}
              </div>
            `;
          }).join('')}
          <div class="footer">
            <p>Printed from TempleXplore - Your Guide to Kumbakonam Temples</p>
            <p>Visit: ${window.location.origin}</p>
          </div>
        </body>
      </html>
    `;

    printWindow.document.write(printContent);
    printWindow.document.close();
    printWindow.print();
  };

  return (
    <div className="min-h-screen bg-background print:bg-white">
      {/* Hero Section */}
      <div className="bg-gradient-temple text-primary-foreground py-16">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <Badge className="mb-4 bg-white/20 text-white">
              <Calendar className="w-4 h-4 mr-2" />
              <TranslatedText text="Plan Your Journey" />
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              <TranslatedText text="Kumbakonam Travel Itineraries" />
            </h1>
            <p className="text-xl opacity-90">
              <TranslatedText text="Expertly crafted temple circuits and cultural experiences for every timeline and interest" />
            </p>
          </div>
        </div>
      </div>

      {/* Itineraries List */}
      <div className="container mx-auto px-4 py-12">
        <div className="space-y-12">
          {itineraries.map((itinerary) => (
            <Card key={itinerary.id} className="overflow-hidden shadow-soft hover:shadow-gold transition-temple">
              <CardHeader className="bg-gradient-to-r from-temple-saffron/10 to-temple-gold/10">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <div>
                    <CardTitle className="text-3xl mb-2">
                      <TranslatedText text={itinerary.title} />
                    </CardTitle>
                    <CardDescription className="text-lg">
                      <TranslatedText text={itinerary.description} />
                    </CardDescription>
                  </div>
                  <div className="flex flex-wrap gap-2 items-center">
                    <Badge variant="outline" className="text-sm">
                      <Clock className="w-4 h-4 mr-1" />
                      {itinerary.duration}
                    </Badge>
                    <Badge variant="outline" className="text-sm">
                      <Navigation className="w-4 h-4 mr-1" />
                      {itinerary.difficulty}
                    </Badge>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handlePrint(itinerary.id)}
                      className="print:hidden"
                    >
                      <Printer className="w-4 h-4 mr-1" />
                      Print
                    </Button>
                    <ShareButton
                      title={`${itinerary.title} - TempleXplore`}
                      text={`Check out this ${itinerary.duration} itinerary for Kumbakonam temples!`}
                      url={`${window.location.origin}/itineraries#${itinerary.id}`}
                      variant="outline"
                    />
                  </div>
                </div>
              </CardHeader>

              <CardContent className="p-6">
                {/* Cost & Season Info */}
                <div className="grid md:grid-cols-2 gap-4 mb-6 p-4 bg-secondary/50 rounded-lg">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">
                      <TranslatedText text="Estimated Cost" />
                    </p>
                    <p className="font-semibold">{itinerary.estimatedCost}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">
                      <TranslatedText text="Best Season" />
                    </p>
                    <p className="font-semibold">{itinerary.bestSeason}</p>
                  </div>
                </div>

                {/* Timeline */}
                <div className="space-y-6">
                  {itinerary.stops.map((stop: any, index: number) => {
                    const currentDay = stop.day;
                    const prevStop = itinerary.stops[index - 1] as any;
                    const showDayHeader = index === 0 || (stop.day && stop.day !== prevStop?.day);

                    return (
                      <div key={index}>
                        {showDayHeader && currentDay && (
                          <div className="mb-4">
                            <Badge className="bg-gradient-temple text-primary-foreground text-lg px-4 py-1">
                              {currentDay}
                            </Badge>
                          </div>
                        )}
                        
                        <div className="flex gap-4">
                          {/* Timeline Line */}
                          <div className="flex flex-col items-center">
                            <div className="w-10 h-10 rounded-full bg-gradient-temple flex items-center justify-center text-primary-foreground font-semibold shadow-temple">
                              {stop.time ? stop.time.split(' ')[0].split(':')[0] : <MapPin className="w-5 h-5" />}
                            </div>
                            {index < itinerary.stops.length - 1 && (
                              <div className="w-0.5 h-full min-h-[60px] bg-gradient-to-b from-temple-saffron to-temple-gold opacity-30 my-2" />
                            )}
                          </div>

                          {/* Stop Details */}
                          <div className="flex-1 pb-6">
                            <div className="flex items-start justify-between mb-2">
                              <div>
                                <h4 className="text-lg font-semibold text-foreground">
                                  <TranslatedText text={stop.location} />
                                </h4>
                                <p className="text-sm text-muted-foreground flex items-center gap-4">
                                  {stop.time && (
                                    <span className="flex items-center">
                                      <Clock className="w-3 h-3 mr-1" />
                                      {stop.time}
                                    </span>
                                  )}
                                  {stop.duration && (
                                    <span className="flex items-center">
                                      <Clock className="w-3 h-3 mr-1" />
                                      {stop.duration}
                                    </span>
                                  )}
                                </p>
                              </div>
                            </div>

                            <p className="text-muted-foreground mb-2">
                              <TranslatedText text={stop.description} />
                            </p>

                            {stop.transport && (
                              <div className="flex items-start gap-2 text-sm text-muted-foreground mb-1">
                                <Bus className="w-4 h-4 mt-0.5 flex-shrink-0 text-temple-saffron" />
                                <span>
                                  <strong><TranslatedText text="Transport" />:</strong> {stop.transport}
                                </span>
                              </div>
                            )}

                            {stop.tips && (
                              <div className="mt-2 p-3 bg-temple-gold/10 rounded-lg border border-temple-gold/20">
                                <p className="text-sm">
                                  <span className="font-semibold text-temple-gold">💡 <TranslatedText text="Tip" />:</span>{" "}
                                  <TranslatedText text={stop.tips} />
                                </p>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Action Buttons */}
                <Separator className="my-6" />
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button variant="temple" className="flex-1" asChild>
                    <Link to="/map">
                      <MapPin className="w-4 h-4 mr-2" />
                      <TranslatedText text="View on Map" />
                    </Link>
                  </Button>
                  <Button variant="gold" className="flex-1" asChild>
                    <Link to="/hotels">
                      <Moon className="w-4 h-4 mr-2" />
                      <TranslatedText text="Find Accommodation" />
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Additional Tips */}
        <Card className="mt-12 bg-gradient-to-r from-secondary/50 to-secondary/30">
          <CardHeader>
            <CardTitle>
              <TranslatedText text="Travel Tips" />
            </CardTitle>
          </CardHeader>
          <CardContent className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-2 flex items-center">
                <Bus className="w-5 h-5 mr-2 text-temple-saffron" />
                <TranslatedText text="Transportation" />
              </h4>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>• Auto-rickshaws: ₹30-100 per trip within town</li>
                <li>• Full day taxi hire: ₹2,000-3,000</li>
                <li>• Local buses: ₹10-30 per trip</li>
                <li>• Walking is ideal for Big Street area</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2 flex items-center">
                <Utensils className="w-5 h-5 mr-2 text-temple-saffron" />
                <TranslatedText text="Food" />
              </h4>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>• Most restaurants are vegetarian</li>
                <li>• Meals: ₹80-200 per person</li>
                <li>• Try local specialties: filter coffee, idli, dosa</li>
                <li>• Temples close 12:30-4 PM (lunch break)</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2 flex items-center">
                <Camera className="w-5 h-5 mr-2 text-temple-saffron" />
                <TranslatedText text="Photography" />
              </h4>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>• Allowed in outer areas of most temples</li>
                <li>• Not allowed inside sanctum sanctorum</li>
                <li>• Always ask permission from priests</li>
                <li>• Best light: early morning & late afternoon</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2 flex items-center">
                <Train className="w-5 h-5 mr-2 text-temple-saffron" />
                <TranslatedText text="Getting There" />
              </h4>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>• Train: Kumbakonam Junction (well connected)</li>
                <li>• Bus: Regular services from Chennai, Trichy</li>
                <li>• Airport: Trichy (90 km) or Chennai (250 km)</li>
                <li>• Best time to visit: October to March</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Itineraries;