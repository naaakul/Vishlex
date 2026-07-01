"use client";

import { useRef, useCallback } from "react";

export default function VishlexWatermark() {
  const wrapperRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    const rect = wrapper.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    wrapper.style.setProperty("--spot-x", `${x}px`);
    wrapper.style.setProperty("--spot-y", `${y}px`);
  }, []);

  const handleMouseLeave = useCallback(() => {
  }, []);

  return (
    <div
      className="group relative flex justify-center pt-8 pb-12"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div
        ref={wrapperRef}
        aria-hidden="true"
        className="relative w-max"
        style={
          {
            "--spot-x": "495px",
            "--spot-y": "-27px",
          } as React.CSSProperties
        }
      >
        <span
          aria-hidden="true"
          className="
            font-instrument
            pointer-events-none
            absolute inset-x-0 z-0
            block
            translate-y-[0.08em]
            text-[clamp(3.5rem,11vw,17rem)]
            leading-[0.8]
            whitespace-nowrap
            text-transparent
            opacity-0
            transition-opacity duration-700
            select-none
            group-hover:opacity-100
          "
          style={{
            top: "-0.4em",
            bottom: "-0.4em",
            paddingTop: "0.4em",
            paddingBottom: "0.4em",
            backgroundImage: `radial-gradient(
              circle 380px at var(--spot-x) calc(var(--spot-y) + 0.4em),
              rgba(150, 200, 255, 0.55),
              rgba(96, 170, 255, 0.18) 52%,
              transparent 82%
            )`,
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            filter: "blur(22px)",
          }}
        >
          Vishlex Analytics
        </span>

        <span
          className="
            font-instrument
            relative z-10
            block
            translate-y-[0.08em]
            text-[clamp(3.5rem,11vw,17rem)]
            leading-[0.8]
            whitespace-nowrap
            text-white/10
            select-none
          "
          style={{
            WebkitTextStroke: "0.8px rgba(255, 255, 255, 0.19)",
          }}
        >
          Vishlex Analytics
        </span>

        <span
          aria-hidden="true"
          className="
            font-instrument
            pointer-events-none
            absolute inset-x-0 z-20
            block
            translate-y-[0.08em]
            text-[clamp(3.5rem,11vw,17rem)]
            leading-[0.8]
            whitespace-nowrap
            text-transparent
            opacity-0
            transition-opacity duration-700
            select-none
            group-hover:opacity-100
          "
          style={{
            top: "-0.4em",
            bottom: "-0.4em",
            paddingTop: "0.4em",
            paddingBottom: "0.4em",
            backgroundImage: `radial-gradient(
              circle 340px at var(--spot-x) calc(var(--spot-y) + 0.4em),
              rgba(214, 235, 255, 0.7),
              rgba(150, 200, 255, 0.24) 46%,
              transparent 78%
            )`,
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            filter: "drop-shadow(0 0 16px rgba(120, 190, 255, 0.4))",
          }}
        >
          Vishlex Analytics
        </span>
      </div>
    </div>
  );
}