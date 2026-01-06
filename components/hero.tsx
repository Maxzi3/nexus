"use client";
import { Button } from "@/components/ui/button";
import { ArrowRight, Box, CheckCircle, Truck } from "lucide-react";
import TrackingInput from "./tracking-input";

export function Hero() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };
  return (
    <section className="relative min-h-screen flex flex-col justify-center pt-10 overflow-hidden bg-linear-to-b from-background via-background to-secondary/20 lg:p-20 mt-10">
      {/* Background Truck Visualization (Simplified Grid/Line version) */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-40">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-7xl">
          <div className="absolute top-1/4 right-0 w-200 h-125 border border-accent/20 rounded-3xl mask-[linear-gradient(to_bottom,black,transparent)]" />
          <div className="absolute bottom-0 left-0 w-full h-0.5 bg-linear-to-r from-transparent via-accent to-transparent shadow-[0_0_20px_rgba(80,185,255,0.5)]" />
          <div className="absolute bottom-10 left-0 w-full h-0.5 bg-linear-to-r from-transparent via-primary to-transparent shadow-[0_0_20px_rgba(255,100,50,0.5)]" />
        </div>
      </div>

      <div className="container mx-auto px-4 relative z-10 grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <h1 className="text-6xl md:text-8xl font-bold tracking-tighter leading-[0.9] text-foreground mb-8">
            Unified <br />
            <span className="text-primary italic">Logistics</span> <br />
            Platform
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-lg mb-10 leading-relaxed text-pretty">
            Unlock unequalled business performance with real-time insights,
            automation, an expanding marketplace, and digital payments. Join the
            logistics revolution.
          </p>

          <TrackingInput className="max-w-md mx-auto md:hidden" />

          <div className="md:flex flex-col sm:flex-row gap-4 hidden ">
            <Button
              onClick={() => scrollToSection("track")}
              size="lg"
              className="bg-primary text-lg h-14 px-8 rounded-full"
            >
              Track Package
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            {/* <Button
              size="lg"
              variant="outline"
              className="text-lg h-14 px-8 rounded-full border-white/10 hover:bg-white/5 bg-transparent"
            >
              Explore Product
            </Button> */}
          </div>
        </div>

        {/* Floating Callouts */}
        <div className="relative h-100 hidden lg:block">
          <div className="absolute top-10 left-10 p-4 rounded-2xl bg-background/40 backdrop-blur-xl border border-white/10 shadow-2xl flex items-center gap-4 animate-bounce-slow">
            <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center text-accent">
              <Box className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm font-bold ">Shipment Efficiency</p>
              <p className="text-xs text-muted-foreground">+32% Increase</p>
            </div>
          </div>

          <div className="absolute bottom-20 right-0 p-4 rounded-2xl bg-background/40 backdrop-blur-xl border border-white/10 shadow-2xl flex items-center gap-4 animate-bounce-slow [animation-delay:1s]">
            <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary">
              <CheckCircle className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm font-bold ">Driver Compliance</p>
              <p className="text-xs text-muted-foreground">99.8% Accuracy</p>
            </div>
          </div>

          <div className="absolute bottom-0 left-20 p-4 rounded-2xl bg-background/40 backdrop-blur-xl border border-white/10 shadow-2xl flex items-center gap-4 animate-bounce-slow [animation-delay:2s]">
            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm font-bold ">Vehicle & Route</p>
              <p className="text-xs text-muted-foreground">Optimal Pathing</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
