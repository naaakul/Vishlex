"use client";

import React, {
  CSSProperties,
  ReactNode,
  Ref,
  useEffect,
  useId,
  useRef,
  useState,
} from "react";

interface LiquidGlassProps {
  children?: ReactNode;
  className?: string;
  style?: CSSProperties;

  borderRadius?: number;
  borderWidth?: number;

  brightness?: number;
  opacity?: number;

  blur?: number;
  backdropBlur?: number;

  backgroundOpacity?: number;

  saturation?: number;

  distortionScale?: number;

  redOffset?: number;
  greenOffset?: number;
  blueOffset?: number;

  displace?: number;

  rimIntensity?: number;

  xChannel?: "R" | "G" | "B" | "A";
  yChannel?: "R" | "G" | "B" | "A";

  mixBlendMode?: string;

  theme?: "dark" | "light";

  forwardedRef?: Ref<HTMLDivElement>;
}

export default function LiquidGlass({
  children,
  className,
  style,

  borderRadius = 18,
  borderWidth = 0.035,

  brightness = 32,
  opacity = 0.55,

  blur = 11,
  backdropBlur = 8,

  backgroundOpacity = 0.02,

  saturation = 1,

  distortionScale = -180,

  redOffset = 0,
  greenOffset = 20,
  blueOffset = 40,

  displace = 1.5,

  rimIntensity = 0.25,

  xChannel = "R",
  yChannel = "G",

  mixBlendMode = "difference",

  theme = "dark",

  forwardedRef,
}: LiquidGlassProps) {
  const uid = useId().replace(/[^a-zA-Z0-9]/g, "");

  const filterId = `glass-filter-${uid}`;
  const redGradient = `glass-red-${uid}`;
  const blueGradient = `glass-blue-${uid}`;

  const rootRef = useRef<HTMLDivElement>(null);

  const feImage = useRef<SVGFEImageElement>(null);

  const dispRed = useRef<SVGFEDisplacementMapElement>(null);
  const dispGreen = useRef<SVGFEDisplacementMapElement>(null);
  const dispBlue = useRef<SVGFEDisplacementMapElement>(null);

  const blurRef = useRef<SVGFEGaussianBlurElement>(null);

  const [mode, setMode] = useState<"svg" | "blur" | "plain">("plain");
  const generateSvg = () => {
    const rect = rootRef.current?.getBoundingClientRect();

    const width = rect?.width ?? 400;
    const height = rect?.height ?? 60;

    const inset = borderWidth * 0.5 * Math.min(width, height);

    const svg = `
<svg
viewBox="0 0 ${width} ${height}"
xmlns="http://www.w3.org/2000/svg"
>

<defs>

<linearGradient
id="${redGradient}"
x1="100%"
y1="0%"
x2="0%"
y2="0%"
>

<stop offset="0%" stop-color="#0000"/>

<stop offset="100%" stop-color="red"/>

</linearGradient>

<linearGradient
id="${blueGradient}"
x1="0%"
y1="0%"
x2="0%"
y2="100%"
>

<stop offset="0%" stop-color="#0000"/>

<stop offset="100%" stop-color="blue"/>

</linearGradient>

</defs>

<rect
x="0"
y="0"
width="${width}"
height="${height}"
fill="black"
/>

<rect
x="0"
y="0"
width="${width}"
height="${height}"
rx="${borderRadius}"
fill="url(#${redGradient})"
/>

<rect
x="0"
y="0"
width="${width}"
height="${height}"
rx="${borderRadius}"
fill="url(#${blueGradient})"
style="mix-blend-mode:${mixBlendMode}"
/>

<rect
x="${inset}"
y="${inset}"
width="${width - inset * 2}"
height="${height - inset * 2}"
rx="${borderRadius}"
fill="hsl(0 0% ${brightness}% / ${opacity})"
style="filter:blur(${blur}px)"
/>

</svg>
`;

    feImage.current?.setAttribute(
      "href",
      `data:image/svg+xml,${encodeURIComponent(svg)}`,
    );
  };
  useEffect(() => {
    generateSvg();

    [
      {
        ref: dispRed,
        offset: redOffset,
      },

      {
        ref: dispGreen,
        offset: greenOffset,
      },

      {
        ref: dispBlue,
        offset: blueOffset,
      },
    ].forEach(({ ref, offset }) => {
      const node = ref.current;

      if (!node) return;

      node.setAttribute("scale", String(distortionScale + offset));

      node.setAttribute("xChannelSelector", xChannel);

      node.setAttribute("yChannelSelector", yChannel);
    });

    blurRef.current?.setAttribute("stdDeviation", String(displace));
  }, [
    borderRadius,
    borderWidth,
    brightness,
    opacity,
    blur,
    distortionScale,
    redOffset,
    greenOffset,
    blueOffset,
    displace,
    mixBlendMode,
    xChannel,
    yChannel,
  ]);
  useEffect(() => {
    if (!rootRef.current) return;

    const observer = new ResizeObserver(() => {
      requestAnimationFrame(generateSvg);
    });

    observer.observe(rootRef.current);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const supportsSvgBackdrop = (() => {
      if (typeof document === "undefined") return false;

      // Safari & Firefox don't support SVG backdrop filters correctly.
      if (
        typeof navigator !== "undefined" &&
        /Safari/.test(navigator.userAgent) &&
        !/Chrome/.test(navigator.userAgent)
      ) {
        return false;
      }

      if (
        typeof navigator !== "undefined" &&
        /Firefox/.test(navigator.userAgent)
      ) {
        return false;
      }

      const div = document.createElement("div");

      div.style.backdropFilter = `url(#${filterId})`;

      return div.style.backdropFilter !== "";
    })();

    if (supportsSvgBackdrop) {
      setMode("svg");
    } else if (CSS.supports("backdrop-filter", "blur(10px)")) {
      setMode("blur");
    } else {
      setMode("plain");
    }
  }, [filterId]);

  const styles: CSSProperties = {
    ...style,
    borderRadius,
  };

  if (mode === "svg") {
    styles.background =
      theme === "dark"
        ? `hsl(0 0% 0% / ${backgroundOpacity})`
        : `hsl(0 0% 100% / ${backgroundOpacity})`;

    styles.backdropFilter = `blur(${backdropBlur}px) url(#${filterId}) saturate(${saturation})`;

    styles.WebkitBackdropFilter = `blur(${backdropBlur}px) saturate(${saturation})`;

    styles.boxShadow =
      theme === "dark"
        ? `
0 0 2px 1px color-mix(in oklch, white, transparent ${
            100 - 35 * rimIntensity
          }%) inset,
0 0 10px 4px color-mix(in oklch, white, transparent ${
            100 - 15 * rimIntensity
          }%) inset,
0 4px 16px rgba(17,17,26,.05),
0 8px 24px rgba(17,17,26,.05),
0 16px 56px rgba(17,17,26,.05)
`
        : `
0 0 2px 1px color-mix(in oklch, black, transparent ${
            100 - 15 * rimIntensity
          }%) inset,
0 0 10px 4px color-mix(in oklch, black, transparent ${
            100 - 10 * rimIntensity
          }%) inset
`;
  } else if (mode === "blur") {
    const amount = backdropBlur || 12;

    if (theme === "dark") {
      styles.background = `rgba(0,0,0,.45)`;

      styles.backdropFilter = `blur(${amount}px) saturate(1.3)`;

      styles.WebkitBackdropFilter = `blur(${amount}px) saturate(1.3)`;

      styles.boxShadow = `
0 0 2px 1px rgba(255,255,255,.12) inset,
0 0 10px 4px rgba(255,255,255,.05) inset
`;
    } else {
      styles.background = "rgba(255,255,255,.25)";

      styles.backdropFilter = `blur(${amount}px) saturate(1.8) brightness(1.1)`;

      styles.WebkitBackdropFilter = `blur(${amount}px) saturate(1.8) brightness(1.1)`;

      styles.border = "1px solid rgba(255,255,255,.3)";
    }
  } else {
    styles.background =
      theme === "dark" ? "rgba(0,0,0,.4)" : "rgba(255,255,255,.4)";

    styles.border =
      theme === "dark"
        ? "1px solid rgba(255,255,255,.2)"
        : "1px solid rgba(255,255,255,.3)";
  }

  return (
    <div
      ref={(node) => {
        rootRef.current = node;

        if (typeof forwardedRef === "function") {
          forwardedRef(node);
        } else if (forwardedRef) {
          (
            forwardedRef as React.MutableRefObject<HTMLDivElement | null>
          ).current = node;
        }
      }}
      className={`relative overflow-hidden ${className ?? ""}`}
      style={styles}
    >
      <svg
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 h-full w-full opacity-0"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <filter
            id={filterId}
            colorInterpolationFilters="sRGB"
            x="0%"
            y="0%"
            width="100%"
            height="100%"
          >
            <feImage
              ref={feImage}
              x="0"
              y="0"
              width="100%"
              height="100%"
              preserveAspectRatio="none"
              result="map"
            />

            {/* RED */}
            <feDisplacementMap
              ref={dispRed}
              in="SourceGraphic"
              in2="map"
              result="dispRed"
            />

            <feColorMatrix
              in="dispRed"
              type="matrix"
              values="
            1 0 0 0 0
            0 0 0 0 0
            0 0 0 0 0
            0 0 0 1 0
          "
              result="red"
            />

            {/* GREEN */}
            <feDisplacementMap
              ref={dispGreen}
              in="SourceGraphic"
              in2="map"
              result="dispGreen"
            />

            <feColorMatrix
              in="dispGreen"
              type="matrix"
              values="
            0 0 0 0 0
            0 1 0 0 0
            0 0 0 0 0
            0 0 0 1 0
          "
              result="green"
            />

            {/* BLUE */}
            <feDisplacementMap
              ref={dispBlue}
              in="SourceGraphic"
              in2="map"
              result="dispBlue"
            />

            <feColorMatrix
              in="dispBlue"
              type="matrix"
              values="
            0 0 0 0 0
            0 0 0 0 0
            0 0 1 0 0
            0 0 0 1 0
          "
              result="blue"
            />

            <feBlend in="red" in2="green" mode="screen" result="rg" />

            <feBlend in="rg" in2="blue" mode="screen" result="output" />

            <feGaussianBlur ref={blurRef} in="output" stdDeviation="0.7" />
          </filter>
        </defs>
      </svg>

      {children}
    </div>
  );
}
