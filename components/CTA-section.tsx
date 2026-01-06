import { Shield } from "lucide-react";
import { Button } from "@/components/ui/button";

const CTASection = () => {
  return (
    <section className="py-32 relative overflow-hidden">
      {/* Subtle gradient line */}
      <div className="absolute top-0 left-0 w-full h-px bg-linear-to-r from-transparent via-white/10 to-transparent" />

      <div className="container mx-auto px-4 text-center relative z-10">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-widest mb-8">
          <Shield className="w-3 h-3" />
          Enterprise Ready
        </div>

        {/* Headline */}
        <h2 className="text-5xl md:text-7xl font-bold text-white tracking-tighter mb-10 text-balance">
          Join the future of <span className="text-primary italic">global</span>{" "}
          supply chain.
        </h2>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            size="lg"
            className="bg-primary hover:bg-primary/90 text-white rounded-full h-16 px-10 text-lg"
          >
            Get Started Free
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-white/10 hover:bg-white/5 text-white rounded-full h-16 px-10 text-lg bg-transparent"
          >
            Contact Sales
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
