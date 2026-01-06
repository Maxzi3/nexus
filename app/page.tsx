import { Hero } from "@/components/hero";
import Navbar from "@/components/navbar";
import Featuressection from "@/components/features-section";
import ServicesSection from "@/components/services-section";
import TrackSection from "@/components/track-section";
import PlatformFeaturesSection from "@/components/platformFeatures-section";
import StatsSection from "@/components/stats-section";
import CTASection from "@/components/CTA-section";
import Footer from "@/components/Footer";
import { HeroSection } from "@/components/hero-section";

const page = () => {
  return (
    <>
      <Navbar />
      <Hero />
      {/* Global Air Freight */}
      <HeroSection
        title="Global Air Freight"
        subtitle="Fast, secure, and time-critical air cargo solutions connecting continents."
        backgroundImage="/hero-1.jpg"
      />

      {/* Ocean Logistics */}
      <HeroSection
        title="Ocean Logistics"
        subtitle="Reliable container shipping solutions for global trade at scale."
        backgroundImage="/her0-2.jpg"
      />

      {/* Warehouse Excellence */}
      <HeroSection
        title="Built for Volume"
        subtitle="Warehouse Excellence designed for speed, accuracy, and scale."
        backgroundImage="/hero-3.jpg"
      />

      {/* Last-Mile */}
      <HeroSection
        title="Last-Mile Excellence"
        subtitle="Door-to-Door delivery with precision, transparency, and trust."
        backgroundImage="/hero-4.jpg"
      />
      <Featuressection />
      <ServicesSection />
      <TrackSection />
      <StatsSection />
      <PlatformFeaturesSection />
      <CTASection />
      <Footer />
    </>
  );
};

export default page;
