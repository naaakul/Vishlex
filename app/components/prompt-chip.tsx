"use client";

import { LucideIcon } from "lucide-react";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";

interface PromptChipProps {
  icon: LucideIcon;
  text: string;
}

export default function PromptChip({
  icon: Icon,
  text,
}: PromptChipProps) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove(
    e: React.MouseEvent<HTMLButtonElement>
  ) {
    const rect = e.currentTarget.getBoundingClientRect();

    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  }

  const spotlight = useMotionTemplate`
    radial-gradient(
      140px circle at ${mouseX}px ${mouseY}px,
      rgba(255,255,255,.12),
      transparent 70%
    )
  `;

  return (
    <motion.button
      onMouseMove={handleMouseMove}
      whileHover={{
        y: -1,
      }}
      whileTap={{
        scale: 0.97,
      }}
      className="
        group
        relative
        overflow-hidden
        h-[40px]
        shrink-0
        rounded-[14px]
        px-[14px]
        pl-[11px]
        flex
        items-center
        gap-[6px]
      "
      style={{
        background:
          "radial-gradient(circle at 50% 3%, #131319 0%, #0D0D12 100%)",
        boxShadow:
          "inset 0 1px 0 rgba(255,255,255,.07), inset 0 0 0 1px rgba(255,255,255,.04), 0 3px 8px rgba(0,0,0,.24)",
      }}
    >
      {/* Mouse Spotlight */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: spotlight,
        }}
      />

      {/* Top Shine */}
      <div
        className="
          absolute
          left-0
          top-0
          h-px
          w-full
          bg-white/10
        "
      />

      {/* Border */}
      <div
        className="
          absolute
          inset-0
          rounded-[14px]
          border
          border-white/[0.04]
          group-hover:border-white/[0.08]
          transition-colors
        "
      />

      <Icon
        size={18}
        className="
          relative
          z-10
          text-white/85
          transition-colors
          group-hover:text-white
        "
      />

      <span
        className="
          relative
          z-10
          whitespace-nowrap
          text-[14px]
          leading-none
          text-white/85
          transition-colors
          group-hover:text-white
        "
      >
        {text}
      </span>
    </motion.button>
  );
}