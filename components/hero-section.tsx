"use client"
import { ArrowRight } from "lucide-react";
import { Button } from "./ui/button";

type HeroSectionProps = {
  title: string;
  subtitle: string;
  backgroundImage: string;
};

export const HeroSection = ({
  title,
  subtitle,
  backgroundImage,
}: HeroSectionProps) => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      className="relative h-[90vh] flex items-center justify-center text-center text-white"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/60" />

      {/* Content */}
      <div className="relative z-10 max-w-4xl px-4">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
          {title}
        </h1>
        <p className="text-lg md:text-xl text-white/80">{subtitle}</p>
        <Button
          onClick={() => scrollToSection("track")}
          size="sm"
          className="bg-primary text-xl h-14 px-8 mt-2 rounded-full"
        >
          Track Package
          <ArrowRight className="ml-2 w-5 h-5" />
        </Button>
      </div>
    </section>
  );
};
