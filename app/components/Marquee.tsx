"use client";

import { ReactNode } from "react";

interface MarqueeProps {
  children: ReactNode;
  reverse?: boolean;
  speed?: number;
}

export default function Marquee({
  children,
  reverse = false,
  speed = 40,
}: MarqueeProps) {
  return (
    <div className="relative w-screen overflow-hidden">
      {/* Fade */}
      <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-40 bg-gradient-to-r from-[#07070A] to-transparent" />
      <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-40 bg-gradient-to-l from-[#07070A] to-transparent" />

      <div
        className={`flex w-max gap-3 ${
          reverse ? "animate-marquee-reverse" : "animate-marquee"
        }`}
        style={{
          animationDuration: `${speed}s`,
        }}
      >
        {children}
        {children}
        {children}
      </div>
    </div>
  );
}