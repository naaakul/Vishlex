// components/liquid-filter.tsx

export default function LiquidFilter() {
  return (
    <svg
      className="absolute h-0 w-0"
      aria-hidden
    >
      <defs>
        <filter
          id="liquid-glass"
          x="0%"
          y="0%"
          width="100%"
          height="100%"
          colorInterpolationFilters="sRGB"
        >
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.012"
            numOctaves="2"
            seed="8"
            result="noise"
          />

          <feDisplacementMap
            in="SourceGraphic"
            in2="noise"
            scale="18"
          />

          <feGaussianBlur
            stdDeviation="0.35"
          />
        </filter>
      </defs>
    </svg>
  );
}