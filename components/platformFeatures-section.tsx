import { Target, Share2, Clock, Truck } from "lucide-react";
import Image from "next/image";

const featuresData = [
  {
    icon: Target,
    title: "Precision Tracking",
    description:
      "Real-time visibility into every shipment, warehouse, and vehicle in your network. Identify bottlenecks before they become delays.",
    visual: "tracking", // identifier for custom visual inside card
  },
  {
    icon: Share2,
    title: "Seamless Collaboration",
    description:
      "Connect your team, drivers, and partners in a single unified workspace. Share real-time feedback and iterate faster.",
    visual: "team",
  },
  {
    icon: Truck,
    title: "Optimized Delivery",
    description:
      "Automatically plan the most efficient routes and schedules for your fleet to save time and reduce costs.",
    visual: "fleet",
  },
  {
    icon: Clock,
    title: "On-Time Performance",
    description:
      "Monitor deliveries and pickups to ensure timely shipments and reliable customer satisfaction.",
    visual: "schedule",
  },
];

const PlatformFeaturesSection = () => {
  const renderVisual = (type: string) => {
    // You can customize each card's visual here
    switch (type) {
      case "tracking":
        return (
          <div className="aspect-video rounded-xl bg-muted/50 border border-white/5 overflow-hidden">
            <div className="w-full h-full flex items-center justify-center">
              <div className="w-3/4 h-1/2 bg-background/80 rounded-lg border border-white/10 p-4 shadow-2xl relative overflow-hidden">
                <div className="w-full h-2 bg-primary/20 rounded mb-2" />
                <div className="w-1/2 h-2 bg-muted rounded mb-4" />
                <div className="flex gap-2">
                  <div className="w-8 h-8 rounded-full bg-primary/20 animate-pulse" />
                  <div className="flex-1 h-2 bg-muted rounded self-center" />
                </div>
              </div>
            </div>
          </div>
        );
      case "team":
        return (
          <div className="aspect-video rounded-xl bg-muted/50 border border-white/5 overflow-hidden">
            <div className="w-full h-full flex items-center justify-center">
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="w-12 h-12 rounded-full border-4 border-background bg-secondary flex items-center justify-center text-xs font-bold text-white"
                  >
                    {String.fromCharCode(64 + i)}
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      case "fleet":
        return (
          <div className="aspect-video rounded-xl bg-muted/50 border border-white/5 relative overflow-hidden">
            <Image
              src="/image-1.jpeg"
              alt="Optimized Delivery"
              fill
              className="object-cover"
              priority
            />
          </div>
        );
      case "schedule":
        return (
          <div className="aspect-video rounded-xl bg-muted/50 border border-white/5 relative overflow-hidden">
            <Image
              src="/image-2.jpeg"
              alt="On-Time Performance"
              fill
              className="object-cover"
              priority
            />
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <section className="py-32 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto mb-20 text-center">
          <h2 className="text-4xl md:text-6xl font-bold tracking-tighter mb-6 text-balance">
            The complete platform to{" "}
            <span className="text-primary italic">optimize</span> the logistics
            lifecycle.
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            Your team’s toolkit to stop guessing and start innovating. Securely
            track, predict, and scale the best shipping experiences.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {featuresData.map((feature, i) => {
            const Icon = feature.icon;
            return (
              <div
                key={i}
                className="p-10 rounded-3xl bg-secondary/30 border border-white/5 flex flex-col justify-between group hover:border-primary/20 transition-all"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-6">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-3xl font-bold  mb-4">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground mb-8 text-lg">
                    {feature.description}
                  </p>
                </div>

                {renderVisual(feature.visual)}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default PlatformFeaturesSection;
