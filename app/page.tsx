import { Hero } from "@/components/hero";
import Navbar from "@/components/navbar";
import Featuressection from "@/components/features-section";
import ServicesSection from "@/components/services-section";
import TrackSection from "@/components/track-section";
import PlatformFeaturesSection from "@/components/platformFeatures-section";
import StatsSection from "@/components/stats-section";
import CTASection from "@/components/CTA-section";
import Footer from "@/components/Footer";

const page = () => {
  return (
    <>
      <Navbar />
      <Hero />
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
