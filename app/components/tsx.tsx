"use client";

import { useRef, useState } from "react";
import { useScroll, useMotionValueEvent } from "framer-motion";
import FeatureList from "@/components/feature-list";
import FeaturePreview from "@/components/feature-preview";
import MobileFeatureItem from "@/components/mobile-feature-item";

export type Feature = {
  title: string;
  description: string;
  color: string;
};

const features: Feature[] = [
  {
    title: "Realtime Analytics",
    description:
      "Watch visitors, events and performance update instantly as users interact with your website.",
    color: "#2563EB",
  },
  {
    title: "Session Replay",
    description:
      "Replay complete user journeys to understand friction and improve conversions.",
    color: "#7C3AED",
  },
  {
    title: "Heatmaps",
    description:
      "Visualize where users click, scroll and spend their attention.",
    color: "#16A34A",
  },
  {
    title: "Funnels",
    description:
      "Track every step in your conversion funnel and identify drop-offs instantly.",
    color: "#EA580C",
  },
];

export default function FeatureSection() {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const index = Math.min(
      features.length - 1,
      Math.floor(v * features.length)
    );
    setActive(index);
  });

  return (
    <section
      ref={ref}
      className="relative z-10 w-full scroll-mt-20 lg:h-[400vh]"
      aria-label="Features"
    >
      <div className="lg:sticky lg:top-0 lg:flex lg:h-screen lg:items-center">
        <div className="mx-auto bg-amber-400 grid w-full max-w-7xl grid-cols-1 gap-x-16 gap-y-16 px-6 md:grid-cols-12 md:gap-y-0 md:px-10 md:py-0">

          <div className="relative lg:col-span-5">
            <ul className="hidden flex-col md:flex">
              <FeatureList features={features} active={active} />
            </ul>

            <div className="mt-10 flex flex-col gap-16 lg:hidden">
              {features.map((feature, index) => (
                <MobileFeatureItem key={feature.title} feature={feature} index={index} />
              ))}
            </div>
          </div>

          <div className="relative hidden lg:col-span-7 lg:block">
            <FeaturePreview feature={features[active]} />
          </div>

        </div>
      </div>
    </section>
  );
}