import { useParams, Link } from "react-router-dom";
import { ArrowLeft, MapPin, Clock, Navigation, Phone, Car, Bus, Footprints, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import TransportOption from "@/components/TransportOption";
import { kumbakonamTransportation, generalTransportInfo } from "@/data/transportationData";

// Temple database
const templeDetails: Record<string, any> = {
  "adi-kumbeswarar": {
    name: "Adi Kumbeswarar Temple",
    deity: "Lord Shiva",
    description: "The Adi Kumbeswarar Temple stands as one of the most ancient and architecturally magnificent temples in Kumbakonam. Built during the reign of the Chola dynasty in the 7th century CE, this sacred shrine is dedicated to Lord Shiva in his form as Adi Kumbeswarar.",
    history: "According to Hindu mythology, this temple marks the sacred spot where Lord Brahma's kamandalu (sacred pot) broke during the cosmic deluge. The temple was originally constructed by the Chola kings and later renovated by various dynasties.",
    timings: { morning: "6:00 AM - 12:30 PM", evening: "4:00 PM - 9:00 PM" },
    location: {
      address: "Big Street, Kumbakonam, Tamil Nadu 612001",
      latitude: 10.9577,
      longitude: 79.3773,
    },
    contact: { phone: "+91 435 242 1234" },
    facilities: ["Free Parking", "Wheelchair Access", "Prasadam Counter"],
    dresscode: "Traditional attire recommended. Shoulders and legs should be covered.",
    image: "/src/assets/adi-kumbeswarar.jpg",
  },
  "sarangapani": {
    name: "Sarangapani Temple",
    deity: "Lord Vishnu",
    description: "The magnificent Sarangapani Temple is one of the most prominent Vaishnavite temples in South India and holds the distinction of being one of the 108 Divya Desams. The temple's towering 12-tier gopuram dominates the Kumbakonam skyline.",
    history: "Built during the early Chola period and later expanded by subsequent rulers, the temple has a rich history spanning over 1,000 years. It finds mention in the Divya Prabandham, composed by the Alvars.",
    timings: { morning: "6:00 AM - 12:00 PM", evening: "4:00 PM - 8:30 PM" },
    location: {
      address: "Sarangapani Sannidhi Street, Kumbakonam, Tamil Nadu 612001",
      latitude: 10.9614,
      longitude: 79.3776,
    },
    contact: { phone: "+91 435 242 5678" },
    facilities: ["Paid Parking", "Temple Museum", "Pilgrimage Accommodation"],
    dresscode: "Conservative traditional attire mandatory.",
    image: "/src/assets/sarangapani.jpg",
  },
  "ramaswamy": {
    name: "Ramaswamy Temple",
    deity: "Lord Rama",
    description: "The Ramaswamy Temple stands as a masterpiece of Nayak period architecture, renowned for its exquisite frescoes and intricate sculptural work depicting scenes from the Ramayana.",
    history: "Constructed during the Nayak period in the 17th century by King Raghunatha Nayak. Famous for its 'Corridor of Stories' with stunning frescoes narrating the Ramayana.",
    timings: { morning: "6:00 AM - 12:00 PM", evening: "4:00 PM - 8:00 PM" },
    location: {
      address: "Ramaswamy Temple Street, Kumbakonam, Tamil Nadu 612001",
      latitude: 10.9598,
      longitude: 79.3751,
    },
    contact: { phone: "+91 435 242 9012" },
    facilities: ["Free Parking", "Guided Tours", "Art Gallery"],
    dresscode: "Modest traditional clothing required.",
    image: "/src/assets/ramaswamy.jpg",
  },
  "nageshwara": {
    name: "Nageshwara Temple",
    deity: "Lord Shiva",
    description: "The Nageshwara Temple is an ancient Shiva temple renowned for its association with Rahu worship and eclipse-related rituals. Uniquely designed so sunlight falls directly on the sanctum during solar eclipses.",
    history: "Built in the 9th century during the reign of Aditya Chola I. Known for its unique astronomical alignment where sunlight illuminates the deity during eclipses.",
    timings: { morning: "6:00 AM - 12:00 PM", evening: "4:00 PM - 8:00 PM" },
    location: {
      address: "Nageshwara Temple Street, Kumbakonam, Tamil Nadu 612001",
      latitude: 10.9589,
      longitude: 79.3792,
    },
    contact: { phone: "+91 435 242 3456" },
    facilities: ["Limited Parking", "Eclipse Viewing Gallery", "Astronomy Center"],
    dresscode: "Traditional attire required for eclipse ceremonies.",
    image: "/src/assets/nageshwara.jpg",
  },
  "chakrapani": {
    name: "Chakrapani Temple",
    deity: "Lord Vishnu",
    description: "The Chakrapani Temple is one of the nine Navagraha temples dedicated to Sukran (Venus). Known for its healing properties, particularly for diabetes and skin conditions.",
    history: "Constructed during the early Chola period as part of the Navagraha temple circuit. Gained prominence for its miraculous healing powers.",
    timings: { morning: "6:00 AM - 12:00 PM", evening: "4:00 PM - 8:00 PM" },
    location: {
      address: "Chakrapani Temple Road, Kumbakonam, Tamil Nadu 612001",
      latitude: 10.9561,
      longitude: 79.3724,
    },
    contact: { phone: "+91 435 242 7890" },
    facilities: ["Healing Center", "Astrological Consultation", "Meditation Hall"],
    dresscode: "Clean traditional attire. White or light colors preferred.",
    image: "/src/assets/chakrapani.jpg",
  },
  "kasi-viswanathar": {
    name: "Kasi Viswanathar Temple",
    deity: "Lord Shiva",
    description: "Known as the 'Kashi of the South,' this temple is believed to grant the same spiritual merits as visiting Varanasi. Beautiful Nayak period architecture.",
    history: "According to legend, sage Vyaghrapada performed penance here. One of the few temples outside Varanasi where devotees can attain moksha.",
    timings: { morning: "6:00 AM - 12:00 PM", evening: "4:00 PM - 9:00 PM" },
    location: {
      address: "Kasi Viswanathar Street, Kumbakonam, Tamil Nadu 612001",
      latitude: 10.9553,
      longitude: 79.3781,
    },
    contact: { phone: "+91 435 242 6789" },
    facilities: ["Free Parking", "Ganga Water Available", "Special Pooja Services"],
    dresscode: "Traditional Hindu attire strictly required.",
    image: "/src/assets/kasi-viswanathar.jpg",
  },
  "someswarar": {
    name: "Someswarar Temple",
    deity: "Lord Shiva",
    description: "Dedicated to Lord Shiva in his moon-aspect form. Important for Monday worship and lunar-related rituals. Known for mental peace and emotional healing.",
    history: "Built during the Chola dynasty. Named after Soma (the moon), where Chandra performed penance to overcome his curse.",
    timings: { morning: "6:00 AM - 12:00 PM", evening: "4:00 PM - 8:00 PM" },
    location: {
      address: "Someswarar Temple Lane, Kumbakonam, Tamil Nadu 612001",
      latitude: 10.9542,
      longitude: 79.3758,
    },
    contact: { phone: "+91 435 242 4567" },
    facilities: ["Meditation Garden", "Mental Wellness Center", "Lunar Calendar Display"],
    dresscode: "White or light-colored attire preferred.",
    image: "/src/assets/someswarar.jpg",
  },
  "oppiliappan": {
    name: "Oppiliappan Temple",
    deity: "Lord Vishnu",
    description: "Famous for its unique traditions - prasadam is prepared without salt or tamarind. One of the 108 Divya Desams with beautiful architecture.",
    history: "Ancient temple where Lord Vishnu appeared to bless sage Markandeya. Known for special wedding rituals and unique offerings.",
    timings: { morning: "6:30 AM - 12:00 PM", evening: "4:00 PM - 8:30 PM" },
    location: {
      address: "Thirunageswaram, Tamil Nadu 612204",
      latitude: 10.9489,
      longitude: 79.4152,
    },
    contact: { phone: "+91 435 243 1234" },
    facilities: ["Free Parking", "Pilgrimage Rest House", "Special Prasadam Counter"],
    dresscode: "Traditional attire mandatory.",
    image: "/src/assets/oppiliappan.jpg",
  },
};

const TempleDetail = () => {
  const { id } = useParams();
  const temple = templeDetails[id || ""];
  const transportData = kumbakonamTransportation.find(t => t.templeId === id);

  if (!temple) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="text-center">
          <MapPin className="w-12 h-12 mx-auto text-muted-foreground/50 mb-4" />
          <h2 className="text-xl font-semibold text-foreground mb-2">Temple not found</h2>
          <p className="text-muted-foreground mb-4">The temple you're looking for doesn't exist.</p>
          <Button asChild>
            <Link to="/temples">View all temples</Link>
          </Button>
        </div>
      </div>
    );
  }

  const openGoogleMaps = () => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${temple.location.latitude},${temple.location.longitude}&travelmode=driving`;
    window.open(url, "_blank");
  };

  return (
    <div className="min-h-screen bg-background pb-8">
      {/* Hero Image */}
      <div className="relative h-56 bg-muted">
        <img
          src={temple.image}
          alt={temple.name}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.currentTarget.src = "/placeholder.svg";
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        
        {/* Back button */}
        <Button
          variant="ghost"
          size="icon"
          asChild
          className="absolute top-4 left-4 bg-black/30 hover:bg-black/50 text-white"
        >
          <Link to="/temples">
            <ArrowLeft className="w-5 h-5" />
          </Link>
        </Button>

        {/* Temple name */}
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <Badge className="mb-2 bg-primary text-primary-foreground">{temple.deity}</Badge>
          <h1 className="text-2xl font-bold text-white">{temple.name}</h1>
        </div>
      </div>

      <main className="px-4 space-y-6 pt-4">
        {/* Quick Actions */}
        <div className="flex gap-3">
          <Button onClick={openGoogleMaps} className="flex-1 h-12 gap-2">
            <Navigation className="w-5 h-5" />
            Navigate
          </Button>
          <Button variant="outline" className="h-12 px-4" asChild>
            <a href={`tel:${temple.contact.phone}`}>
              <Phone className="w-5 h-5" />
            </a>
          </Button>
        </div>

        {/* Timings & Address */}
        <section className="bg-card rounded-xl border border-border p-4 space-y-4">
          <div className="flex items-start gap-3">
            <Clock className="w-5 h-5 text-primary mt-0.5" />
            <div>
              <h3 className="font-medium text-foreground">Temple Timings</h3>
              <p className="text-sm text-muted-foreground">Morning: {temple.timings.morning}</p>
              <p className="text-sm text-muted-foreground">Evening: {temple.timings.evening}</p>
            </div>
          </div>
          <Separator />
          <div className="flex items-start gap-3">
            <MapPin className="w-5 h-5 text-primary mt-0.5" />
            <div>
              <h3 className="font-medium text-foreground">Location</h3>
              <p className="text-sm text-muted-foreground">{temple.location.address}</p>
            </div>
          </div>
        </section>

        {/* About */}
        <section>
          <h2 className="text-lg font-semibold text-foreground mb-2">About</h2>
          <p className="text-muted-foreground leading-relaxed">{temple.description}</p>
        </section>

        {/* Transport Options */}
        <section>
          <h2 className="text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
            <Car className="w-5 h-5 text-primary" />
            How to Get There
          </h2>
          <div className="space-y-3">
            {transportData?.transportOptions.map((option, index) => (
              <TransportOption
                key={index}
                type={option.type}
                name={option.name}
                duration={option.duration}
                cost={option.cost.replace(/₹/g, "")}
                description={option.tips[0]}
              />
            )) || (
              <>
                <TransportOption
                  type="auto"
                  name="Auto Rickshaw"
                  duration="5-10 mins"
                  cost="30-80"
                  description="Most convenient option for temple visits"
                />
                <TransportOption
                  type="taxi"
                  name="Taxi / Cab"
                  duration="5-15 mins"
                  cost="200-500"
                  description="Comfortable for families and groups"
                />
                <TransportOption
                  type="bus"
                  name="Town Bus"
                  duration="15-25 mins"
                  cost="10-20"
                  description="Most economical option"
                />
                <TransportOption
                  type="walk"
                  name="Walking"
                  duration="15-30 mins"
                  cost="Free"
                  description="Pleasant walk through heritage streets"
                />
              </>
            )}
          </div>

          {/* Transport tips */}
          <div className="mt-4 p-4 bg-muted rounded-xl">
            <h4 className="font-medium text-foreground mb-2">Transport Tips</h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Auto: Agree on fare before starting</li>
              <li>• Taxi: Book through hotels for reliability</li>
              <li>• Bus: Routes 1, 2, 5 pass most temples</li>
              <li>• Railway Station: {generalTransportInfo.railwayStation.autoFare}</li>
            </ul>
          </div>
        </section>

        {/* Facilities */}
        <section>
          <h2 className="text-lg font-semibold text-foreground mb-3">Facilities</h2>
          <div className="flex flex-wrap gap-2">
            {temple.facilities.map((facility: string, index: number) => (
              <Badge key={index} variant="secondary" className="px-3 py-1.5">
                {facility}
              </Badge>
            ))}
          </div>
        </section>

        {/* Dress Code */}
        <section className="bg-accent rounded-xl p-4">
          <h3 className="font-medium text-foreground mb-1">Dress Code</h3>
          <p className="text-sm text-muted-foreground">{temple.dresscode}</p>
        </section>

        {/* Emergency Contacts */}
        <section className="bg-card rounded-xl border border-border p-4">
          <h3 className="font-medium text-foreground mb-3">Important Contacts</h3>
          <div className="space-y-2 text-sm">
            <a href={`tel:${temple.contact.phone}`} className="flex items-center gap-2 text-primary">
              <Phone className="w-4 h-4" />
              Temple: {temple.contact.phone}
            </a>
            <a href="tel:+914352430888" className="flex items-center gap-2 text-muted-foreground">
              <Phone className="w-4 h-4" />
              Tourist Police: +91 435 243 0888
            </a>
          </div>
        </section>
      </main>
    </div>
  );
};

export default TempleDetail;
