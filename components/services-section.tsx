import { Truck, Package, Warehouse, Globe } from "lucide-react";

const ServicesSection = () => {
  const services = [
    {
      icon: Truck,
      title: "Express Delivery",
      description:
        "Fast and reliable delivery services for urgent shipments within cities and regions.",
    },
    {
      icon: Package,
      title: "Freight Shipping",
      description:
        "Secure transportation of bulk goods and commercial cargo across long distances.",
    },
    {
      icon: Warehouse,
      title: "Warehousing",
      description:
        "Safe storage solutions with inventory handling and distribution support.",
    },
    {
      icon: Globe,
      title: "International Shipping",
      description:
        "Cross-border shipping with customs handling and end-to-end tracking.",
    },
  ];

  return (
    <section id="services" className="py-24 border-y border-white/5">
      {/* Section Header */}
      <div className="text-center mb-16">
        <h1 className="text-3xl text-primary md:text-4xl font-bold mb-4">Our Services</h1>
        <p className="text-lg max-w-2xl px-2 mx-auto">
          Reliable logistics solutions designed to move your goods safely and on
          time.
        </p>
      </div>

      {/* Services Grid */}
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, i) => {
            const Icon = service.icon;

            return (
              <div key={i} className="p-8 border rounded-xl">
                <Icon className="w-8 h-8 mb-4" />

                <h3 className="text-lg font-semibold mb-2 text-primary">{service.title}</h3>

                <p className="text-sm leading-relaxed">{service.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
