"use client";

import { useRef } from "react";
import { useScroll, useMotionValueEvent } from "framer-motion";
import { useState } from "react";
import FeatureList from "@/components/feature-list";
import FeaturePreview from "@/components/feature-preview";

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
      className="relative h-[400vh]"
    >
      <div className="sticky top-0 flex h-screen items-center">
        <div className="mx-auto grid w-full max-w-7xl grid-cols-2 gap-20 px-8">

          <FeatureList
            features={features}
            active={active}
          />

          <FeaturePreview
            feature={features[active]}
          />

        </div>
      </div>
    </section>
  );
}