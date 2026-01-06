const statsData = [
  {
    value: "98.7%",
    label: "On-Time Delivery",
    subLabel: "195 Countries Served",
  },
  {
    value: "50K+",
    label: "Packages Daily",
    subLabel: "",
  },
  {
    value: "99.2%",
    label: "Customer Satisfaction",
    subLabel: "",
  },
];

const StatsSection = () => {
  return (
    <section id="about" className="py-24 border-y border-white/5">
      <div className="container mx-auto px-4 text-center">
        <div className="max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-primary">
            Key Performance Stats
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Delivering reliability and excellence across our logistics network.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {statsData.map((stat, i) => (
            <div
              key={i}
              className="p-8 rounded-xl border border-white/10 bg-background/30"
            >
              <p className="text-4xl font-bold text-white mb-2">{stat.value}</p>
              <p className="text-muted-foreground text-sm mb-2">{stat.label}</p>
              {stat.subLabel && (
                <p className="text-xs font-black uppercase tracking-widest text-white/20">
                  {stat.subLabel}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
