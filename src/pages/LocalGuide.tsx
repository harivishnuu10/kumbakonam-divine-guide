import { Phone, Bus, Train, Car, Clock, IndianRupee, MapPin, AlertCircle, Coffee, Utensils } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { generalTransportInfo } from "@/data/transportationData";

const LocalGuide = () => {
  return (
    <div className="min-h-screen bg-background pb-4">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="px-4 py-4">
          <h1 className="text-xl font-bold text-foreground">Local Guide</h1>
          <p className="text-sm text-muted-foreground">Transport, food & essential info</p>
        </div>
      </header>

      <main className="px-4 space-y-6 pt-4">
        {/* Transport Section */}
        <section>
          <h2 className="text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
            <Bus className="w-5 h-5 text-primary" />
            Getting Around
          </h2>
          
          <div className="space-y-3">
            {/* Auto */}
            <div className="p-4 bg-card rounded-xl border border-border">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-lg bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center">
                  <Car className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                </div>
                <div>
                  <h3 className="font-medium text-foreground">Auto Rickshaw</h3>
                  <p className="text-sm text-muted-foreground">Most convenient option</p>
                </div>
              </div>
              <div className="flex gap-4 text-sm mt-3">
                <span className="flex items-center gap-1 text-muted-foreground">
                  <IndianRupee className="w-3.5 h-3.5" />
                  {generalTransportInfo.localTransport.autoRickshaw.baseFare} base
                </span>
                <span className="flex items-center gap-1 text-muted-foreground">
                  <Clock className="w-3.5 h-3.5" />
                  5-10 mins
                </span>
              </div>
              <ul className="text-xs text-muted-foreground mt-2 space-y-1">
                <li>• Agree fare before starting</li>
                <li>• Full day: {generalTransportInfo.localTransport.autoRickshaw.fullDayHire}</li>
              </ul>
            </div>

            {/* Taxi */}
            <div className="p-4 bg-card rounded-xl border border-border">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                  <Car className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <h3 className="font-medium text-foreground">Taxi / Cab</h3>
                  <p className="text-sm text-muted-foreground">Comfortable for groups</p>
                </div>
              </div>
              <div className="flex gap-4 text-sm mt-3">
                <span className="flex items-center gap-1 text-muted-foreground">
                  <IndianRupee className="w-3.5 h-3.5" />
                  {generalTransportInfo.localTransport.taxi.baseFare} base
                </span>
                <span className="flex items-center gap-1 text-muted-foreground">
                  <Clock className="w-3.5 h-3.5" />
                  10-20 mins
                </span>
              </div>
              <ul className="text-xs text-muted-foreground mt-2 space-y-1">
                <li>• Book through hotels for reliability</li>
                <li>• Full day: {generalTransportInfo.localTransport.taxi.fullDayHire}</li>
              </ul>
            </div>

            {/* Bus */}
            <div className="p-4 bg-card rounded-xl border border-border">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-lg bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                  <Bus className="w-5 h-5 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <h3 className="font-medium text-foreground">Town Bus</h3>
                  <p className="text-sm text-muted-foreground">Most economical</p>
                </div>
              </div>
              <div className="flex gap-4 text-sm mt-3">
                <span className="flex items-center gap-1 text-muted-foreground">
                  <IndianRupee className="w-3.5 h-3.5" />
                  {generalTransportInfo.localTransport.bus.fare}
                </span>
                <span className="flex items-center gap-1 text-muted-foreground">
                  <Clock className="w-3.5 h-3.5" />
                  {generalTransportInfo.localTransport.bus.timings}
                </span>
              </div>
            </div>
          </div>
        </section>

        <Separator />

        {/* Getting Here */}
        <section>
          <h2 className="text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
            <Train className="w-5 h-5 text-primary" />
            Getting to Kumbakonam
          </h2>
          
          <div className="space-y-3">
            <div className="p-4 bg-card rounded-xl border border-border">
              <h3 className="font-medium text-foreground mb-1">{generalTransportInfo.railwayStation.name}</h3>
              <p className="text-sm text-muted-foreground mb-2">{generalTransportInfo.railwayStation.distance}</p>
              <div className="flex gap-2 flex-wrap">
                <Badge variant="secondary">Auto: {generalTransportInfo.railwayStation.autoFare}</Badge>
                <Badge variant="secondary">Taxi: {generalTransportInfo.railwayStation.taxiFare}</Badge>
              </div>
            </div>

            <div className="p-4 bg-card rounded-xl border border-border">
              <h3 className="font-medium text-foreground mb-1">{generalTransportInfo.busStand.name}</h3>
              <p className="text-sm text-muted-foreground mb-2">{generalTransportInfo.busStand.distance}</p>
              <Badge variant="secondary">Auto: {generalTransportInfo.busStand.autoFare}</Badge>
            </div>

            {generalTransportInfo.airports.map((airport, idx) => (
              <div key={idx} className="p-4 bg-card rounded-xl border border-border">
                <h3 className="font-medium text-foreground mb-1">{airport.name}</h3>
                <p className="text-sm text-muted-foreground mb-2">{airport.distance}</p>
                <p className="text-xs text-muted-foreground">{airport.transport}</p>
              </div>
            ))}
          </div>
        </section>

        <Separator />

        {/* Local Food */}
        <section>
          <h2 className="text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
            <Utensils className="w-5 h-5 text-primary" />
            Must-Try Food
          </h2>
          
          <div className="grid grid-cols-1 gap-3">
            <div className="p-4 bg-accent rounded-xl">
              <div className="flex items-center gap-2 mb-1">
                <Coffee className="w-4 h-4 text-primary" />
                <h3 className="font-medium text-foreground">Kumbakonam Degree Coffee</h3>
              </div>
              <p className="text-sm text-muted-foreground">Famous filter coffee made with chicory</p>
              <p className="text-xs text-muted-foreground mt-1">₹30-50 at local coffee houses</p>
            </div>

            <div className="p-4 bg-card rounded-xl border border-border">
              <h3 className="font-medium text-foreground mb-1">Temple Prasadam</h3>
              <p className="text-sm text-muted-foreground">Sweet pongal, vadai, coconut laddus</p>
              <p className="text-xs text-muted-foreground mt-1">₹10-50 at all major temples</p>
            </div>

            <div className="p-4 bg-card rounded-xl border border-border">
              <h3 className="font-medium text-foreground mb-1">Traditional Thali</h3>
              <p className="text-sm text-muted-foreground">Complete meal on banana leaf</p>
              <p className="text-xs text-muted-foreground mt-1">₹120-200 at Arya Bhavan, Hotel Shanmuga</p>
            </div>
          </div>
        </section>

        <Separator />

        {/* Emergency Contacts */}
        <section>
          <h2 className="text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-primary" />
            Important Contacts
          </h2>
          
          <div className="space-y-2">
            <a href="tel:+914352430888" className="flex items-center gap-3 p-3 bg-card rounded-xl border border-border">
              <Phone className="w-5 h-5 text-primary" />
              <div>
                <p className="font-medium text-foreground">Tourist Police</p>
                <p className="text-sm text-muted-foreground">+91 435 243 0888</p>
              </div>
            </a>
            
            <a href="tel:108" className="flex items-center gap-3 p-3 bg-card rounded-xl border border-border">
              <Phone className="w-5 h-5 text-destructive" />
              <div>
                <p className="font-medium text-foreground">Ambulance</p>
                <p className="text-sm text-muted-foreground">108</p>
              </div>
            </a>

            <a href="tel:139" className="flex items-center gap-3 p-3 bg-card rounded-xl border border-border">
              <Train className="w-5 h-5 text-muted-foreground" />
              <div>
                <p className="font-medium text-foreground">Railway Enquiry</p>
                <p className="text-sm text-muted-foreground">139</p>
              </div>
            </a>

            {generalTransportInfo.importantNumbers.taxiBooking.map((num, idx) => (
              <a key={idx} href={`tel:${num}`} className="flex items-center gap-3 p-3 bg-card rounded-xl border border-border">
                <Car className="w-5 h-5 text-muted-foreground" />
                <div>
                  <p className="font-medium text-foreground">Taxi Booking</p>
                  <p className="text-sm text-muted-foreground">{num}</p>
                </div>
              </a>
            ))}
          </div>
        </section>

        {/* Best Time to Visit */}
        <section className="bg-accent rounded-xl p-4">
          <h3 className="font-medium text-foreground mb-2">Best Time to Visit</h3>
          <ul className="text-sm text-muted-foreground space-y-1">
            <li>• October - March: Pleasant weather (20-30°C)</li>
            <li>• Morning visits: 6-9 AM less crowded</li>
            <li>• Avoid midday heat (12-3 PM)</li>
            <li>• Weekend: More crowded at temples</li>
          </ul>
        </section>
      </main>
    </div>
  );
};

export default LocalGuide;
