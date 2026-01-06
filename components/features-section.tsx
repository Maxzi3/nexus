import { Clock, MapPin, ShieldCheck, Truck } from "lucide-react";

const Featuressection = () => {
  const features = [
    {
      icon: Truck,
      title: "Fast & Reliable Delivery",
      description:
        "We move shipments quickly and safely across cities and regions.",
      details: "Optimized routes ensure timely deliveries.",
    },
    {
      icon: MapPin,
      title: "Real-Time Tracking",
      description: "Track your shipment status at every stage of the journey.",
      details: "Know exactly where your package is at all times.",
    },
    {
      icon: ShieldCheck,
      title: "Secure Handling",
      description:
        "Every shipment is handled with strict safety and security standards.",
      details: "Your goods are protected from pickup to delivery.",
    },
    {
      icon: Clock,
      title: "On-Time Performance",
      description:
        "We prioritize punctual deliveries for businesses and individuals.",
      details: "Consistent delivery schedules you can rely on.",
    },
  ];

  return (
    <section className="py-24 border-y border-white/5">
      {/* Section Header */}
      <div className="text-center mb-16">
        <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
          Why Choose <span className="text-primary">Nexus</span>?
        </h1>
        <p className="text-lg text-soft-gray max-w-2xl mx-auto">
          The difference that makes us your trusted logistics partner
        </p>
      </div>
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-foreground">
          {features.map((feature, i) => {
            const Icon = feature.icon;

            return (
              <div
                key={i}
                className="p-8 group hover:bg-white/2 transition-colors"
              >
                <Icon className="w-8 h-8 mb-4 group-hover:text-primary transition-colors" />

                <p className="text-lg font-bold mb-2">{feature.title}</p>

                <p className="text-muted-foreground text-sm mb-4 leading-tight">
                  {feature.description}
                </p>

                <p className="text-xs font-black uppercase tracking-widest text-white/20">
                  {feature.details}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Featuressection;
