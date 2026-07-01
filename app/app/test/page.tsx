"use client";

import FeatureSection from "@/components/feature-section";
import Navbar from "@/components/Navbar";
import CreativeUtilities from "@/components/CreativeUtilities";
import Hero from "@/components/Hero";
import Footer from "@/components/Footer";
import MarqueeSection from "@/components/Marquee-section";

export default function Home() {
  return (
    <main className="text-white flex flex-col gap-24">
      <Navbar />
      <Hero />
      <FeatureSection />
      <MarqueeSection/>
      <CreativeUtilities />
      <Footer />
    </main>
  );
}
