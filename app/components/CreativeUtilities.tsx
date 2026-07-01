import Image from "next/image";

function PlayIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 12 12"
      className={className}
      fill="white"
      aria-hidden="true"
    >
      <path d="M2 1 L10 6 L2 11 Z" />
    </svg>
  );
}

interface HighlightRowProps {
  src: string;
  filename: string;
  timecode: string;
  description: string;
  bg?: string;
  dimmed?: boolean;
}

function HighlightRow({
  src,
  filename,
  timecode,
  description,
  bg = "#1f140c",
  dimmed = false,
}: HighlightRowProps) {
  return (
    <div
      className={`flex items-start gap-[10px] overflow-hidden rounded-[10px] p-[8px] ${
        dimmed ? "opacity-65" : ""
      }`}
      style={{
        background: "#15151B",
        boxShadow:
          "inset 0 0 0 1px rgba(255,255,255,0.12), 0 4px 10px rgba(0,0,0,0.30)",
      }}
    >
      <div
        className="relative size-[64px] shrink-0 overflow-hidden rounded-[6px]"
        style={{ background: bg }}
      >
        <Image src={src} alt="" fill className="object-cover" sizes="64px" />
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 110% 110% at 50% 50%, transparent 55%, rgba(0,0,0,0.45) 100%)",
          }}
          aria-hidden="true"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="flex size-[24px] items-center justify-center rounded-full bg-white/20 backdrop-blur-[3px]">
            <PlayIcon className="ml-[1px] size-[9px]" />
          </div>
        </div>
      </div>

      <div className="min-w-0 flex-1 pt-[1px]">
        <div
          className="truncate text-[9.5px] leading-none text-white/65"
          style={{ fontFamily: "var(--font-marketing-sans)" }}
        >
          {filename}
        </div>
        <div
          className="mt-[3px] text-[9px] leading-none text-white/40 tabular-nums"
          style={{ fontFamily: "var(--font-marketing-sans)" }}
        >
          {timecode}
        </div>
        <p className="mt-[5px] line-clamp-2 text-[10px] leading-[1.4] text-white/55">
          {description}
        </p>
      </div>
    </div>
  );
}

function MiniPlayer() {
  return (
    <div
      className="overflow-hidden rounded-[12px] p-[10px] "
      style={{
        background: "#15151B",
        boxShadow:
          "0 0 0 1px rgba(255,255,255,0.10), 0 -3px 5px rgba(0,0,0,0.09), 0 13px 14px rgba(0,0,0,0.20), 0 4px 6px rgba(0,0,0,0.12), 0 -13px 32px rgba(0,0,0,0.12), 0 57px 58px rgba(0,0,0,0.25)",
      }}
    >
      <div className="relative h-[142px] w-full cursor-pointer overflow-hidden rounded-[7px] bg-[#1f140c]">
        <video
          poster="https://assets.usecardboard.com/marketing/features-find-highlights-poster.jpg"
          preload="none"
          playsInline
          className="absolute inset-0 h-full w-full object-cover"
        >
          <source
            src="https://assets.usecardboard.com/marketing/features-find-highlights.webm"
            type="video/webm"
          />
          <source
            src="https://assets.usecardboard.com/marketing/features-find-highlights.mp4"
            type="video/mp4"
          />
        </video>
      </div>

      <div
        className="mt-[10px] flex h-[28px] items-center rounded-[8px] px-[10px] text-white"
        style={{
          background: "#1B1B22",
          boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.06)",
        }}
      >
        <button
          type="button"
          tabIndex={-1}
          aria-label="Play"
          className="flex size-[14px] cursor-pointer items-center justify-center text-white transition-opacity hover:opacity-75"
        >
          <svg
            viewBox="0 0 16 16"
            className="size-[11px]"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M4 2 L13 8 L4 14 Z" />
          </svg>
        </button>

        <span
          className="ml-[8px] text-[9px] text-white/90 tabular-nums"
          style={{ fontFamily: "Delight, sans-serif" }}
        >
          03:57 / 04:11
        </span>

        <div className="relative mx-[10px] flex h-full flex-1 cursor-pointer touch-none items-center select-none">
          <div className="absolute inset-x-0 top-1/2 h-[2px] -translate-y-1/2 rounded-full bg-white/15" />
          <div
            className="absolute top-1/2 left-0 h-[2px] -translate-y-1/2 rounded-full bg-white"
            style={{ width: "0%" }}
          />
          <div
            className="absolute top-1/2 size-[7px] -translate-y-1/2 rounded-full bg-white shadow-[0_0_0_2px_rgba(255,255,255,0.18)]"
            style={{ left: "calc(0% - 3.5px)" }}
          />
        </div>

        <button
          type="button"
          tabIndex={-1}
          aria-label="Mute"
          className="flex size-[14px] cursor-pointer items-center justify-center text-white transition-opacity hover:opacity-75"
        >
          <svg
            viewBox="0 0 16 16"
            className="size-[11px]"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M3 5h2l3-3v12l-3-3H3z" />
            <path
              d="M10 5 Q12 8 10 11"
              stroke="currentColor"
              strokeWidth="1.2"
              fill="none"
              strokeLinecap="round"
            />
          </svg>
        </button>

        <button
          type="button"
          tabIndex={-1}
          aria-label="Playback speed: 1x"
          className="ml-[8px] cursor-pointer text-[9px] text-white/90 transition-opacity hover:opacity-75"
        >
          1x
        </button>
      </div>

      <div className="mt-[12px] flex items-start gap-[8px]">
        <div className="flex-1 text-[14px] leading-[1.2] font-medium text-white">
          Theory vs. real-world judgment
        </div>
        <button
          type="button"
          tabIndex={-1}
          aria-hidden="true"
          className="flex size-[26px] shrink-0 items-center justify-center rounded-[7px] bg-white/[0.08] text-white/80 ring-1 ring-inset ring-white/[0.14] transition-colors hover:bg-white/[0.14] hover:text-white"
        >
          <svg
            viewBox="0 0 16 16"
            className="size-[11px]"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            aria-hidden="true"
          >
            <path d="M8 3v10M3 8h10" />
          </svg>
        </button>
      </div>

      <div
        className="mt-[-3px] flex items-center gap-[5px]"
        style={{ fontFamily: "var(--font-marketing-sans)" }}
      >
        <span className="text-[10.5px] leading-none text-white/40 tabular-nums">
          3:57 - 4:11
        </span>
        <span className="inline-block size-[2px] rounded-full bg-white/30" />
        <span className="text-[10.5px] leading-none text-white/40">14s</span>
      </div>

      <p className="mt-[10px] line-clamp-2 text-[11px] leading-[1.45] text-white/70">
        Anthropic&apos;s philosopher on why real decisions need context, not
        just narrow theory.
      </p>

      <div
        className="mt-[10px] text-[9.5px] leading-none text-white/25"
        style={{ fontFamily: "var(--font-marketing-sans)" }}
      >
        askell-anthropic-interview
      </div>
    </div>
  );
}

function FindHighlightsCard() {
  const highlights = [
    {
      src: "https://assets.usecardboard.com/marketing/features-find-highlights-h1.jpg",
      filename: "askell_a-cam.mp4",
      timecode: "6:24 - 6:58",
      description:
        "Close-up of a woman with cropped orange hair in a black top, lighting up as she explains why one early model felt special.",
      dimmed: true,
    },
    {
      src: "https://assets.usecardboard.com/marketing/features-find-highlights-h2.jpg",
      filename: "askell_b-cam.mp4",
      timecode: "15:33 - 16:07",
      description:
        "Close-up of an interviewer in a striped sweater, leaning in to ask whether AI models are moral patients.",
      dimmed: true,
    },
    {
      src: "https://assets.usecardboard.com/marketing/features-find-highlights-poster.jpg",
      filename: "askell_wide.mp4",
      timecode: "3:57 - 4:11",
      description:
        "Two people on a park bench by the Golden Gate Bridge, weighing philosophical ideals against real-world judgment.",
      dimmed: false,
    },
  ];

  return (
    <div
      className="relative overflow-hidden rounded-[24px] h-[430px] md:row-span-2 md:h-[502px]"
      style={{
        background:
          "radial-gradient(circle at 4% 4%, rgb(11,11,15) 0%, rgb(7,7,10) 65%, rgb(5,5,7) 100%)",
        boxShadow:
          "rgba(255,255,255,0.06) 0px 1px 0px inset, rgba(255,255,255,0.05) 0px 0px 0px 1px inset, rgba(0,0,0,0.4) 0px 4px 16px -4px",
      }}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 100% at 110% 55%, rgba(180,210,255,0.10) 0%, transparent 60%)",
        }}
      />

      <div className="absolute top-[72px] right-[16px] bottom-[16px] left-[16px] overflow-hidden rounded-[18px] md:top-[120px] md:right-[-14px] md:bottom-[24px] md:left-[24px]">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 hidden rounded-[18px] md:block"
          style={{
            background:
              "linear-gradient(155deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.005) 50%, rgba(255,255,255,0.03) 100%)",
            boxShadow:
              "inset 0 0 0 1px rgba(255,255,255,0.07), inset 0 1px 0 rgba(255,255,255,0.04)",
          }}
        />

        <div
          className="absolute top-[8px] right-[-10px] bottom-[8px] left-[8px] hidden overflow-hidden rounded-[12px] p-[8px] md:block"
          style={{
            boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.08)",
            WebkitMaskImage:
              "linear-gradient(to top, black 25%, transparent 95%), linear-gradient(to right, black 30%, transparent 100%)",
            WebkitMaskComposite: "source-in",
            maskImage:
              "linear-gradient(to top, black 25%, transparent 95%), linear-gradient(to right, black 30%, transparent 100%)",
            maskComposite: "intersect",
          }}
        >
          <Image
            src="/images/marketing/features/find-highlights-bg.jpg"
            alt=""
            fill
            className="object-cover"
            sizes="(min-width: 768px) 560px, 100vw"
          />

          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0"
            style={{ background: "rgba(7,7,10,0.82)" }}
          />

          <div className="relative h-full w-full rounded-xl bg-black/50 p-4">
            <div className="relative h-full w-full">
              <div className="absolute top-[14px] right-0 left-[290px] flex flex-col gap-[10px] pt-[14px]">
                {highlights.map((h) => (
                  <HighlightRow key={h.filename} {...h} />
                ))}
              </div>
            </div>
          </div>

          <div className="absolute top-[16px] right-[8px] left-[8px]  overflow-hidden rounded-[12px] p-[10px] md:w-[270px]">
            <MiniPlayer />
          </div>
        </div>
      </div>

      <div className="absolute top-[24px] left-[24px] z-10">
        <h3
          className="font-marketing-sans text-[18px] leading-none font-medium text-white"
          style={{ fontFamily: "var(--font-marketing-sans)" }}
        >
          Find Highlights
        </h3>
        <p
          className="mt-[6px] text-[14px] leading-[1.15] text-[#9B9B9B] max-w-[280px]"
          style={{ fontFamily: "var(--font-marketing-sans)" }}
        >
          Instantly surface the strongest moments from long-form footage.
        </p>
      </div>
    </div>
  );
}

type CaptionStyle = "subtitle" | "stacked" | "minimal" | "serif";

interface CaptionButtonProps {
  style: CaptionStyle;
  active?: boolean;
}

function CaptionStyleButton({ style, active = false }: CaptionButtonProps) {
  const labels: Record<CaptionStyle, string> = {
    subtitle: "Subtitle",
    stacked: "Stacked",
    minimal: "Minimal",
    serif: "Serif",
  };

  const previews: Record<CaptionStyle, React.ReactNode> = {
    subtitle: (
      <div className="text-[10px] font-medium text-white">Feels real</div>
    ),
    stacked: (
      <div className="flex flex-col items-center text-[8.5px] font-extrabold leading-[1.05] uppercase">
        <span style={{ color: "#FFFFFF" }}>Feels</span>
        <span style={{ color: "#FFD24A" }}>real</span>
      </div>
    ),
    minimal: (
      <div className="text-[8.5px] font-normal tracking-[0.18em] uppercase text-white/85">
        Feels real
      </div>
    ),
    serif: (
      <div
        className="italic text-[10px] leading-none"
        style={{
          color: "#F6E8C6",
          fontFamily: '"Denton-Light", "Times New Roman", serif',
        }}
      >
        Feels real
      </div>
    ),
  };

  return (
    <button
      type="button"
      tabIndex={-1}
      aria-label={`Caption style ${labels[style]}`}
      aria-pressed={active}
      className={`relative flex flex-1 cursor-pointer flex-col items-center justify-center overflow-hidden rounded-[10px] px-[6px] py-[10px] transition ${
        active ? "bg-white/[0.06]" : "bg-white/[0.02] hover:bg-white/[0.04]"
      }`}
      style={{
        boxShadow: active
          ? "inset 0 0 0 1px rgba(255,255,255,0.18)"
          : "inset 0 0 0 1px rgba(255,255,255,0.06)",
      }}
    >
      {previews[style]}
      <span className="mt-[6px] text-[9px] leading-none font-medium tracking-[-0.01em] text-white/55">
        {labels[style]}
      </span>

      {active && (
        <div
          className="absolute top-[6px] right-[6px] flex size-[12px] items-center justify-center rounded-full bg-white"
          style={{ opacity: 1 }}
        >
          <svg
            viewBox="0 0 12 12"
            className="size-[7px]"
            fill="none"
            stroke="#0B0B0F"
            strokeWidth="2"
            aria-hidden="true"
          >
            <path
              d="M3 6 L5 8 L9 4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      )}
    </button>
  );
}

function CaptionsCard() {
  return (
    <div
      className="relative overflow-hidden rounded-[24px] h-[366px] md:h-[384px]"
      style={{
        background:
          "radial-gradient(circle at 4% 4%, rgb(11,11,15) 0%, rgb(7,7,10) 65%, rgb(5,5,7) 100%)",
        boxShadow:
          "rgba(255,255,255,0.06) 0px 1px 0px inset, rgba(255,255,255,0.05) 0px 0px 0px 1px inset, rgba(0,0,0,0.4) 0px 4px 16px -4px",
      }}
    >
      <div className="absolute top-[106px] right-[20px] left-[20px] h-[170px] overflow-hidden rounded-[12px] bg-[#1f140c] md:h-[198px]">
        <video
          poster="https://assets.usecardboard.com/marketing/features-captions-poster.jpg"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="absolute inset-0 h-full w-full object-cover object-[center_32%]"
        >
          <source
            src="https://assets.usecardboard.com/marketing/features-captions.webm"
            type="video/webm"
          />
          <source
            src="https://assets.usecardboard.com/marketing/features-captions.mp4"
            type="video/mp4"
          />
        </video>

        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 h-[80px]"
          style={{
            background:
              "linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.55) 60%, rgba(0,0,0,0.85) 100%)",
          }}
        />

        <div className="absolute inset-x-0 bottom-[14px] flex justify-center px-[14px]">
          <div
            className="pointer-events-none text-center"
            style={{ opacity: 1 }}
          >
            <div
              className="text-[14px] leading-[1.25] font-medium tracking-[-0.005em] text-white"
              style={{
                textShadow:
                  "rgba(0,0,0,0.85) 0px 1px 3px, rgba(0,0,0,0.95) 0px 0px 1px",
              }}
            >
              Okay, here&apos;s what nobody tells you
            </div>
          </div>
        </div>
      </div>

      <div className="absolute right-[20px] bottom-[20px] left-[20px] flex gap-[8px]">
        <CaptionStyleButton style="subtitle" active />
        <CaptionStyleButton style="stacked" />
        <CaptionStyleButton style="minimal" />
        <CaptionStyleButton style="serif" />
      </div>

      <div className="absolute top-[24px] left-[24px] z-10">
        <h3
          className="text-[18px] leading-none font-medium text-white"
          style={{ fontFamily: "var(--font-marketing-sans)" }}
        >
          Captions
        </h3>
        <p
          className="mt-[6px] text-[14px] leading-[1.15] text-[#9B9B9B] max-w-[280px]"
          style={{ fontFamily: "var(--font-marketing-sans)" }}
        >
          Generate animated captions with multiple cinematic styles.
        </p>
      </div>
    </div>
  );
}

function FastRenderingCard() {
  return (
    <div
      className="relative overflow-hidden rounded-[24px] h-[124px] md:h-[100px]"
      style={{
        background:
          "radial-gradient(circle at 4% 4%, rgb(11,11,15) 0%, rgb(7,7,10) 65%, rgb(5,5,7) 100%)",
        boxShadow:
          "rgba(255,255,255,0.06) 0px 1px 0px inset, rgba(255,255,255,0.05) 0px 0px 0px 1px inset, rgba(0,0,0,0.4) 0px 4px 16px -4px",
      }}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 160% at 100% 60%, rgba(10,144,248,0.32) 0%, transparent 65%), linear-gradient(115deg, transparent 42%, rgba(220,235,255,0.05) 70%, rgba(255,255,255,0.12) 100%)",
        }}
      />

      <div className="pointer-events-none absolute inset-0 origin-right scale-[0.72] md:scale-100">
        <svg
          aria-hidden="true"
          width="233"
          height="129"
          viewBox="0 0 233 129"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="pointer-events-none absolute top-0 right-0 h-full w-auto"
          preserveAspectRatio="xMaxYMid meet"
        >
          <path
            d="M168.6 -39.4033C170 -39.6447 171.442 -39.4296 172.707 -38.79C173.972 -38.1505 174.992 -37.1223 175.612 -35.8613C176.232 -34.6014 176.422 -33.1766 176.151 -31.8018L163.203 32.1182L163.118 32.5381L163.52 32.6865L214.279 51.5029C215.284 51.8802 216.179 52.4964 216.886 53.2959C217.593 54.0959 218.089 55.0552 218.331 56.0889C218.573 57.1226 218.555 58.1998 218.276 59.2246C217.998 60.2493 217.467 61.1907 216.732 61.9658L215.933 62.8105H215.97L118.12 166.453C117.149 167.477 115.867 168.162 114.467 168.403C113.066 168.645 111.624 168.43 110.358 167.79C109.093 167.151 108.075 166.122 107.454 164.861C106.834 163.601 106.644 162.176 106.915 160.801L119.827 96.9512L119.912 96.5322L119.511 96.3828L68.752 77.541L68.751 77.54C67.7377 77.1653 66.8345 76.5484 66.1221 75.7451C65.4098 74.9419 64.9097 73.9772 64.667 72.9375C64.4243 71.8978 64.4465 70.8147 64.7305 69.7852C65.0145 68.7556 65.552 67.811 66.2959 67.0361L66.2988 67.0332L164.945 -37.4541L164.946 -37.4531C165.917 -38.4772 167.199 -39.1619 168.6 -39.4033Z"
            stroke="url(#fast-render-echo-1)"
            strokeOpacity="0.28"
          />
          <path
            d="M172.754 -87.3604C174.776 -87.7097 176.858 -87.3985 178.686 -86.4727C180.513 -85.5469 181.985 -84.0573 182.882 -82.2305C183.779 -80.4038 184.052 -78.3382 183.66 -76.3447L165.367 14.1807L165.282 14.5996L165.683 14.749L237.401 41.3975V41.3965C238.853 41.9426 240.147 42.8357 241.168 43.9941C242.189 45.1527 242.906 46.5424 243.256 48.04C243.606 49.5379 243.579 51.0982 243.176 52.583C242.773 54.0679 242.007 55.432 240.945 56.5547L240.148 57.3984H240.201L101.615 204.537C100.213 206.02 98.3609 207.011 96.3389 207.36C94.3169 207.71 92.2352 207.398 90.4082 206.473C88.5811 205.547 87.108 204.057 86.2109 202.23C85.3143 200.404 85.0413 198.34 85.4326 196.347L103.676 105.918L103.761 105.499L103.36 105.351L31.6426 78.6641H31.6416C30.1784 78.1217 28.874 77.2286 27.8447 76.0654C26.8155 74.9022 26.0931 73.5045 25.7422 71.998C25.3913 70.4914 25.4225 68.9215 25.833 67.4297C26.2436 65.9379 27.0209 64.5696 28.0957 63.4473L28.0986 63.4443L167.478 -84.5381C168.88 -86.0207 170.732 -87.011 172.754 -87.3604Z"
            stroke="url(#fast-render-echo-2)"
            strokeOpacity="0.24"
          />
          <path
            d="M181.469 -121.327C183.977 -121.761 186.558 -121.373 188.824 -120.224C191.09 -119.074 192.918 -117.225 194.031 -114.956C195.144 -112.688 195.482 -110.123 194.996 -107.647L172.526 3.67773L172.441 4.09668L172.842 4.24512L260.935 37.0166V37.0156C262.735 37.6937 264.34 38.8016 265.606 40.2402C266.873 41.6793 267.763 43.406 268.197 45.2666C268.632 47.1271 268.597 49.0649 268.098 50.9092C267.598 52.7536 266.648 54.4485 265.331 55.8428L264.534 56.6865H264.599L94.1904 237.82C92.4507 239.662 90.1534 240.893 87.6455 241.327C85.1377 241.761 82.5561 241.373 80.29 240.224C78.0239 239.074 76.1969 237.225 75.084 234.956C73.9714 232.688 73.6324 230.122 74.1182 227.646L96.5273 116.443L96.6113 116.025L96.2109 115.876L8.11914 83.0596H8.11816C6.30323 82.386 4.68509 81.2769 3.4082 79.832C2.13142 78.3873 1.23516 76.6517 0.799805 74.7803C0.364464 72.9087 0.403711 70.9586 0.913086 69.1055C1.4225 67.2526 2.38649 65.5529 3.71973 64.1592L3.72266 64.1562L174.925 -117.821L174.924 -117.822C176.663 -119.664 178.961 -120.893 181.469 -121.327Z"
            stroke="url(#fast-render-echo-3)"
            strokeOpacity="0.22"
          />

          <defs>
            <linearGradient
              id="fast-render-echo-1"
              x1="77.3813"
              y1="2.24468"
              x2="205.242"
              y2="125.479"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="white" />
              <stop offset="0.514678" stopColor="white" stopOpacity="0" />
              <stop offset="1" stopColor="white" stopOpacity="0.29" />
            </linearGradient>
            <linearGradient
              id="fast-render-echo-2"
              x1="43.9065"
              y1="-28.1702"
              x2="224.975"
              y2="145.932"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="white" />
              <stop offset="0.514678" stopColor="white" stopOpacity="0" />
              <stop offset="1" stopColor="white" stopOpacity="0.29" />
            </linearGradient>
            <linearGradient
              id="fast-render-echo-3"
              x1="23.223"
              y1="-48.4255"
              x2="245.878"
              y2="165.416"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="white" stopOpacity="0.29" />
              <stop offset="0.485322" stopColor="white" stopOpacity="0" />
              <stop offset="1" stopColor="white" />
            </linearGradient>
          </defs>
        </svg>

        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-1/2 right-[34px] -translate-y-1/2"
          style={{
            filter: "drop-shadow(rgba(10,144,248,0.35) 0px 8px 18px)",
          }}
        >
          <svg
            width="79"
            height="107"
            viewBox="0 0 79 107"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M78.012 52.9094L28.4255 105.883C27.9 106.443 27.2064 106.816 26.4493 106.948C25.6922 107.079 24.9127 106.962 24.2285 106.613C23.5442 106.264 22.9923 105.703 22.6561 105.014C22.3198 104.325 22.2175 103.545 22.3644 102.793L28.855 70.4217L3.34005 60.8687C2.79209 60.6644 2.30343 60.3278 1.91773 59.8892C1.53204 59.4506 1.26132 58.9235 1.12977 58.3551C0.998212 57.7867 1.00992 57.1946 1.16384 56.6318C1.31777 56.069 1.60911 55.553 2.01184 55.1299L51.5983 2.1559C52.1238 1.59674 52.8174 1.22316 53.5745 1.09155C54.3316 0.959934 55.1111 1.07742 55.7954 1.42628C56.4796 1.77513 57.0315 2.33643 57.3678 3.02547C57.704 3.71452 57.8064 4.49391 57.6594 5.24605L51.1512 37.6529L76.6661 47.1926C77.21 47.3984 77.6948 47.7345 78.0774 48.1714C78.4601 48.6083 78.729 49.1325 78.8603 49.6976C78.9916 50.2627 78.9813 50.8513 78.8302 51.4115C78.6792 51.9717 78.3921 52.4861 77.9943 52.9094H78.012Z"
              fill="url(#fast-render-bolt-back)"
              fillOpacity="0.5"
            />
            <path
              d="M75.9466 50.8533L27.0213 102.789C26.5028 103.337 25.8185 103.703 25.0715 103.832C24.3245 103.961 23.5554 103.846 22.8802 103.504C22.2051 103.162 21.6606 102.612 21.3288 101.936C20.997 101.261 20.896 100.496 21.041 99.759L27.445 68.0222L2.27031 58.6565C1.72965 58.4562 1.24751 58.1262 0.866954 57.6962C0.486401 57.2662 0.219294 56.7495 0.0894941 56.1922C-0.0403055 55.6349 -0.0287536 55.0545 0.123117 54.5027C0.274987 53.9509 0.562445 53.4451 0.959812 53.0302L49.8852 1.09494C50.4036 0.546741 51.088 0.180492 51.835 0.0514577C52.582 -0.0775767 53.3511 0.0376049 54.0262 0.379621C54.7014 0.721638 55.2459 1.27193 55.5777 1.94746C55.9094 2.62299 56.0104 3.38711 55.8654 4.1245L49.444 35.8959L74.6187 45.2486C75.1553 45.4503 75.6336 45.7799 76.0112 46.2082C76.3888 46.6365 76.6541 47.1504 76.7836 47.7044C76.9132 48.2584 76.903 48.8355 76.754 49.3847C76.6049 49.9339 76.3217 50.4383 75.9292 50.8533H75.9466Z"
              fill="url(#fast-render-bolt-front)"
              fillOpacity="0.95"
            />
            <defs>
              <linearGradient
                id="fast-render-bolt-back"
                x1="39.9954"
                y1="1.03906"
                x2="39.9954"
                y2="107"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="white" />
                <stop offset="1" stopColor="#0A90F8" />
              </linearGradient>
              <linearGradient
                id="fast-render-bolt-front"
                x1="38.4369"
                y1="0"
                x2="38.4369"
                y2="103.883"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="white" />
                <stop offset="1" stopColor="#0A90F8" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>

      <div className="absolute inset-0 z-20 cursor-pointer" />

      <div className="absolute top-[24px] left-[24px] z-10">
        <h3
          className="text-[18px] leading-none font-medium text-white"
          style={{ fontFamily: "var(--font-marketing-sans)" }}
        >
          Fast Rendering
        </h3>
        <p
          className="mt-[6px] text-[14px] leading-[1.15] text-[#9B9B9B] max-w-[200px] md:max-w-[280px]"
          style={{ fontFamily: "var(--font-marketing-sans)" }}
        >
          Turn 1 hour of footage into a finished render in around 5 minutes.
        </p>
      </div>
    </div>
  );
}

interface Language {
  flag: string;
  label: string;
  offset: number;
  scale: number;
  opacity: number;
}

const LANGUAGES: Language[] = [
  { flag: "🇩🇰", label: "Danish", offset: -200, scale: 0.45, opacity: 0 },
  { flag: "🇳🇱", label: "Dutch", offset: -94, scale: 0.67, opacity: 0.55 },
  { flag: "🇺🇸", label: "English (US)", offset: 0, scale: 1, opacity: 1 },
  { flag: "🇫🇷", label: "French", offset: 94, scale: 0.67, opacity: 0.55 },
  { flag: "🇩🇪", label: "German", offset: 200, scale: 0.45, opacity: 0 },
];

const RING_SIZES = [104, 200, 260, 320, 380, 440];

function TranslateCard() {
  return (
    <div
      className="relative overflow-hidden rounded-[24px] h-[300px] md:h-[408px]"
      style={{
        background:
          "radial-gradient(circle at 4% 4%, rgb(11,11,15) 0%, rgb(7,7,10) 65%, rgb(5,5,7) 100%)",
        boxShadow:
          "rgba(255,255,255,0.06) 0px 1px 0px inset, rgba(255,255,255,0.05) 0px 0px 0px 1px inset, rgba(0,0,0,0.4) 0px 4px 16px -4px",
      }}
    >
      <div
        className="absolute inset-0"
        style={{
          WebkitMaskImage:
            "linear-gradient(to bottom, transparent 0%, black 20%)",
          maskImage: "linear-gradient(to bottom, transparent 0%, black 20%)",
        }}
      >
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          {RING_SIZES.map((size, i) => {
            const baseOpacity = 0.087;
            const decay = 0.013;
            const opacity = Math.max(0.025, baseOpacity - i * decay);
            return (
              <div
                key={size}
                className="absolute rounded-full"
                style={{
                  width: size,
                  height: size,
                  border: `1px solid rgba(255,255,255,${opacity})`,
                }}
              />
            );
          })}
        </div>

        <div className="pointer-events-none absolute inset-0">
          {LANGUAGES.map((lang) => {
            const isCenter = lang.offset === 0;
            const shadow = isCenter
              ? "drop-shadow(0 14px 32px rgba(0,0,0,0.55)) drop-shadow(0 4px 14px rgba(0,0,0,0.35))"
              : "drop-shadow(0 6px 16px rgba(0,0,0,0.30))";

            return (
              <div
                key={lang.label}
                className="absolute top-1/2 left-1/2"
                style={{
                  marginLeft: "-43px",
                  marginTop: "-43px",
                  opacity: lang.opacity,
                  transform:
                    lang.offset === 0
                      ? "none"
                      : `translateX(${lang.offset}px) scale(${lang.scale})`,
                }}
              >
                <div
                  className="flex shrink-0 items-center justify-center"
                  style={{
                    width: 86,
                    height: 86,
                    fontSize: "81.7px",
                    lineHeight: 1,
                    filter: shadow,
                  }}
                >
                  <span
                    style={{
                      display: "inline-block",
                      transform: "translateY(0.05em)",
                    }}
                  >
                    {lang.flag}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        <div
          className="pointer-events-none absolute bottom-[64px] left-1/2 -translate-x-1/2 text-[13px] leading-none font-medium whitespace-nowrap text-white/85"
          style={{ opacity: 1 }}
        >
          English (US)
        </div>

        <div className="absolute bottom-[20px] left-1/2 flex -translate-x-1/2 items-center gap-[10px]">
          <button
            type="button"
            tabIndex={-1}
            aria-label="Previous language"
            className="flex size-[30px] cursor-pointer items-center justify-center rounded-[8px] bg-white/[0.06] text-white/80 transition hover:bg-white/[0.12] hover:text-white"
            style={{ boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.08)" }}
          >
            <svg
              viewBox="0 0 16 16"
              className="size-[12px]"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              aria-hidden="true"
            >
              <path
                d="M10 3 L5 8 L10 13"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          <span
            className="min-w-[42px] text-center text-[12px] leading-none text-white/55 tabular-nums"
            style={{ fontFamily: "var(--font-marketing-sans)", opacity: 1 }}
          >
            5 / 23
          </span>

          <button
            type="button"
            tabIndex={-1}
            aria-label="Next language"
            className="flex size-[30px] cursor-pointer items-center justify-center rounded-[8px] bg-white/[0.06] text-white/80 transition hover:bg-white/[0.12] hover:text-white"
            style={{ boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.08)" }}
          >
            <svg
              viewBox="0 0 16 16"
              className="size-[12px]"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              aria-hidden="true"
            >
              <path
                d="M6 3 L11 8 L6 13"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>

      <div className="absolute top-[24px] left-[24px] z-10">
        <h3
          className="text-[18px] leading-none font-medium text-white"
          style={{ fontFamily: "var(--font-marketing-sans)" }}
        >
          Translate Your Videos
        </h3>
        <p
          className="mt-[6px] text-[14px] leading-[1.15] text-[#9B9B9B] max-w-[280px]"
          style={{ fontFamily: "var(--font-marketing-sans)" }}
        >
          Make your videos available in multiple languages without re-recording
          a single word.
        </p>
      </div>
    </div>
  );
}

function MotionGraphicsCard() {
  return (
    <div
      className="relative overflow-hidden rounded-[24px] h-[400px] md:h-[408px]"
      style={{
        background:
          "radial-gradient(circle at 4% 4%, rgb(11,11,15) 0%, rgb(7,7,10) 65%, rgb(5,5,7) 100%)",
        boxShadow:
          "rgba(255,255,255,0.06) 0px 1px 0px inset, rgba(255,255,255,0.05) 0px 0px 0px 1px inset, rgba(0,0,0,0.4) 0px 4px 16px -4px",
      }}
    >
      <div className="absolute inset-x-[24px] top-[104px] bottom-[24px] flex gap-[14px] md:top-[120px]">
        <div
          className="relative flex-1 overflow-hidden rounded-[16px]"
          style={{
            WebkitMaskImage: "linear-gradient(0deg, black 0%, transparent 98%)",
            maskImage: "linear-gradient(0deg, black 0%, transparent 98%)",
          }}
        >
          <Image
            src="/images/marketing/motion-scene.jpg"
            alt=""
            fill
            className="object-cover"
            sizes="(min-width: 768px) 350px, 100vw"
          />

          <div className="absolute inset-0 bg-[#0A1A2E]/30" />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(135deg, rgba(0,0,0,0) 35%, rgba(0,0,0,0.45) 100%)",
            }}
          />

          <svg
            aria-hidden="true"
            className="absolute inset-0 size-full"
            viewBox="0 0 320 280"
            preserveAspectRatio="xMidYMid meet"
            style={{
              transform: "scale(1.25) translateX(-45px) translateY(-45px)",
            }}
          >
            <defs>
              <path
                id="motion-leader-circle"
                d="M 155 25 a 115 115 0 0 1 0 230 a 115 115 0 0 1 0 -230"
                fill="none"
              />
            </defs>

            <rect
              x="30"
              y="15"
              width="250"
              height="250"
              fill="none"
              stroke="white"
              strokeOpacity="0.45"
              strokeWidth="1"
            />

            <g>
              <rect
                x="269"
                y="254"
                width="22"
                height="22"
                fill="none"
                stroke="white"
                strokeWidth="1"
                strokeOpacity="0"
              />
              <rect
                x="275"
                y="260"
                width="10"
                height="10"
                fill="white"
                style={{
                  transformBox: "fill-box",
                  transformOrigin: "50% 50%",
                }}
              />
              <rect
                x="264"
                y="249"
                width="32"
                height="32"
                fill="transparent"
                style={{ cursor: "nwse-resize", touchAction: "none" }}
              />
            </g>

            <text
              fontSize="16"
              fill="white"
              fillOpacity="0.92"
              letterSpacing="0.05"
              style={{
                fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif",
              }}
            >
              <textPath href="#motion-leader-circle" startOffset="6">
                The atmospheric pressure across the northern ridge continued to
                fluctuate as dense cloud formations moved eastward through the
                valley.
              </textPath>
            </text>
          </svg>
        </div>

        <div
          className="relative w-[230px] overflow-hidden rounded-[18px] p-[18px]"
          style={{
            background:
              "radial-gradient(circle at 6% 3%, #1C1C21 0%, #15151B 100%)",
            boxShadow:
              "0 0 0 1px rgba(255,255,255,0.06), 0 3px 8px 0 rgba(0,0,0,0.24)",
          }}
        >
          <h4
            className="text-[15px] leading-none font-medium text-white"
            style={{ fontFamily: "var(--font-marketing-sans)" }}
          >
            Motion Settings
          </h4>

          <div className="mt-[10px] text-[11px] leading-none text-white/45">
            Bezier Curve
          </div>

          <div
            className="relative mt-[10px] h-[120px] w-full overflow-hidden rounded-[8px] border border-white/[0.06]"
            style={{ background: "#131319" }}
          >
            <div
              className="absolute inset-0"
              style={{
                backgroundImage:
                  "linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(0deg, rgba(255,255,255,0.05) 1px, transparent 1px)",
                backgroundSize: "32.5px 30px",
              }}
            />

            <svg
              aria-hidden="true"
              className="absolute inset-0 size-full"
              viewBox="0 0 195 150"
              preserveAspectRatio="none"
            >
              <path
                d="M 18 30 C 106 30, 90 120, 178 120"
                fill="none"
                stroke="rgba(255,255,255,0.85)"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>

            <div
              className="absolute touch-none bg-white select-none"
              style={{
                left: "9.23077%",
                top: "20%",
                cursor: "grab",
                transform: "translateX(-50%) translateY(-50%)",
                width: 8,
                height: 8,
              }}
            />

            <div
              className="absolute touch-none bg-white select-none"
              style={{
                left: "91.2821%",
                top: "80%",
                cursor: "grab",
                transform: "translateX(-50%) translateY(-50%)",
                width: 8,
                height: 8,
              }}
            />
          </div>

          <div className="mt-[10px] text-[11px] leading-none text-white/45">
            Scale
          </div>

          <div
            role="slider"
            aria-label="Scale"
            aria-valuemin={0}
            aria-valuemax={1}
            aria-valuenow={0.5}
            tabIndex={0}
            className="relative mt-[8px] flex h-[28px] w-full touch-none items-center select-none"
            style={{ cursor: "grab" }}
          >
            <div className="pointer-events-none absolute right-[8px] left-[55%] flex items-center justify-between">
              {[0, 1, 2, 3].map((i) => (
                <div key={i} className="size-[3px] rounded-full bg-white/30" />
              ))}
            </div>

            <div
              className="pointer-events-none absolute inset-y-0 left-0 rounded-[6px]"
              style={{ width: "50%", backgroundColor: "rgb(32,32,39)" }}
            />

            <div
              className="pointer-events-none absolute rounded-[2px] bg-white"
              style={{
                left: "calc(50% - 1.5px)",
                width: 3,
                top: 5,
                bottom: 5,
              }}
            />
          </div>
        </div>
      </div>

      <span
        className="absolute top-[27px] right-[24px] z-10 text-[12px] font-medium text-white/35 hidden md:block"
        style={{ fontFamily: "var(--font-marketing-sans)" }}
      >
        Coming soon
      </span>

      <div className="absolute top-[24px] left-[24px] z-10">
        <div className="flex items-baseline gap-2">
          <h3
            className="text-[18px] leading-none font-medium text-white"
            style={{ fontFamily: "var(--font-marketing-sans)" }}
          >
            Motion Graphics
          </h3>
          <span
            className="text-[12px] font-medium text-white/35 md:hidden"
            style={{ fontFamily: "var(--font-marketing-sans)" }}
          >
            Coming soon
          </span>
        </div>
        <p
          className="mt-[6px] text-[14px] leading-[1.15] text-[#9B9B9B] max-w-[280px]"
          style={{ fontFamily: "var(--font-marketing-sans)" }}
        >
          Animated overlays and cinematic graphics for polished edits.
        </p>
      </div>
    </div>
  );
}

interface AvatarProps {
  initial: string;
  bg: string;
  zIndex: number;
  marginLeft?: number;
}

function Avatar({ initial, bg, zIndex, marginLeft = -10 }: AvatarProps) {
  return (
    <div
      className="relative flex size-[32px] items-center justify-center rounded-full text-[12px] font-medium text-white"
      style={{
        background: bg,
        marginLeft: marginLeft === 0 ? 0 : marginLeft,
        boxShadow: "inset 0 0 0 2px #0B0B0F, 0 4px 10px rgba(0,0,0,0.35)",
        zIndex,
      }}
    >
      {initial}
    </div>
  );
}

function SharingCard() {
  const avatars: AvatarProps[] = [
    { initial: "M", bg: "#202EF5", zIndex: 3, marginLeft: 0 },
    { initial: "S", bg: "#00D49F", zIndex: 2, marginLeft: -10 },
    { initial: "I", bg: "#00B0EB", zIndex: 1, marginLeft: -10 },
  ];

  return (
    <div
      className="relative overflow-hidden rounded-[24px] h-[150px] md:h-[100px]"
      style={{
        background:
          "radial-gradient(circle at 4% 4%, rgb(11,11,15) 0%, rgb(7,7,10) 65%, rgb(5,5,7) 100%)",
        boxShadow:
          "rgba(255,255,255,0.06) 0px 1px 0px inset, rgba(255,255,255,0.05) 0px 0px 0px 1px inset, rgba(0,0,0,0.4) 0px 4px 16px -4px",
      }}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 right-[-10%] -z-0 h-[260%] w-[55%] -translate-y-1/2 rounded-full"
        style={{
          background:
            "radial-gradient(closest-side, rgba(32,46,245,0.20) 0%, rgba(0,176,235,0.10) 45%, transparent 75%)",
          filter: "blur(36px)",
        }}
      />

      <div className="absolute right-[20px] bottom-[18px] flex items-center gap-[10px] md:top-1/2 md:right-[24px] md:bottom-auto md:-translate-y-1/2">
        <button
          type="button"
          tabIndex={-1}
          aria-label="Share"
          className="flex h-[36px] cursor-pointer items-center gap-[6px] rounded-[10px] bg-white px-[14px] text-[#0B0B0F] transition hover:bg-white/90"
          style={{
            boxShadow:
              "0 6px 14px rgba(0,0,0,0.25), 0 1px 0 rgba(255,255,255,0.5)",
          }}
        >
          <svg
            viewBox="0 0 16 16"
            className="size-[12px]"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            aria-hidden="true"
          >
            <path d="M8 1.5 V10" strokeLinecap="round" />
            <path
              d="M5 4.5 L8 1.5 L11 4.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M3 9 V13 a1 1 0 0 0 1 1 H12 a1 1 0 0 0 1 -1 V9"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span className="text-[13px] font-medium">Share</span>
        </button>

        <div className="flex items-center">
          {avatars.map((a) => (
            <Avatar key={a.initial} {...a} />
          ))}

          <div
            className="relative ml-[6px] flex h-[28px] min-w-[34px] items-center justify-center rounded-full px-[8px] text-[11px] font-medium text-white/75"
            style={{
              background: "rgba(255,255,255,0.05)",
              boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.08)",
              fontFamily: "var(--font-marketing-sans)",
            }}
          >
            +2
          </div>
        </div>
      </div>

      <div className="absolute top-[24px] left-[24px] z-10">
        <div className="flex items-baseline gap-2">
          <h3
            className="text-[18px] leading-none font-medium text-white"
            style={{ fontFamily: "var(--font-marketing-sans)" }}
          >
            Sharing
          </h3>
          <span
            className="text-[12px] font-medium text-white/35"
            style={{ fontFamily: "var(--font-marketing-sans)" }}
          >
            Coming soon
          </span>
        </div>
        <p
          className="mt-[6px] text-[14px] leading-[1.15] text-[#9B9B9B] md:max-w-[260px]"
          style={{ fontFamily: "var(--font-marketing-sans)" }}
        >
          Share edits, collect feedback, and collaborate in real time.
        </p>
      </div>
    </div>
  );
}

const BARS_LEFT = [20.8, 37.44, 28.6, 46.8, 32.24, 52, 38.48, 44.72, 26, 34.32];
const BARS_GAP = [6.24, 4.16, 7.28];
const BARS_RIGHT = [
  31.2, 45.76, 27.04, 49.92, 35.36, 41.6, 26, 46.8, 32.24, 22.88,
];

interface WaveBarProps {
  height: number;
  opacity?: number;
}

function WaveBar({ height, opacity = 0.85 }: WaveBarProps) {
  return (
    <span
      className="shrink-0 rounded-full"
      style={{
        width: 3,
        height,
        backgroundColor: `rgba(255,255,255,${opacity})`,
      }}
    />
  );
}

function RemoveDeadAirCard() {
  return (
    <div
      className="relative overflow-hidden rounded-[24px] h-[188px] md:h-[100px]"
      style={{
        background:
          "radial-gradient(circle at 4% 4%, rgb(11,11,15) 0%, rgb(7,7,10) 65%, rgb(5,5,7) 100%)",
        boxShadow:
          "rgba(255,255,255,0.06) 0px 1px 0px inset, rgba(255,255,255,0.05) 0px 0px 0px 1px inset, rgba(0,0,0,0.4) 0px 4px 16px -4px",
      }}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-[62%] left-1/2 -z-0 h-[150%] w-[78%] -translate-x-1/2 -translate-y-1/2 rounded-full md:top-1/2 md:right-[-6%] md:left-auto md:h-[260%] md:w-[55%] md:translate-x-0"
        style={{
          background:
            "radial-gradient(closest-side, rgba(255,255,255,0.10) 0%, rgba(120,120,150,0.05) 50%, transparent 78%)",
          filter: "blur(32px)",
        }}
      />

      <div
        aria-hidden="true"
        className="absolute bottom-[22px] left-1/2 flex -translate-x-1/2 items-center md:top-1/2 md:right-[28px] md:bottom-auto md:left-auto md:translate-x-0 md:-translate-y-1/2"
        style={{ height: 52 }}
      >
        <div className="flex items-center" style={{ gap: 4 }}>
          {BARS_LEFT.map((h, i) => (
            <WaveBar key={`left-${i}`} height={h} />
          ))}
        </div>

        <div
          className="relative flex items-center"
          style={{ width: 30, gap: 4, opacity: 1 }}
        >
          {BARS_GAP.map((h, i) => (
            <WaveBar key={`gap-${i}`} height={h} opacity={0.25} />
          ))}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 inset-y-[-4px] rounded-[3px]"
            style={{
              boxShadow: "rgba(255,255,255,0.45) 0px 0px 0px 1px inset",
              opacity: 0,
            }}
          />
        </div>

        <div className="relative flex items-center" style={{ gap: 4 }}>
          <span
            aria-hidden="true"
            className="absolute top-1/2 left-[-3px] h-[130%] w-[7px] -translate-y-1/2 rounded-full"
            style={{
              background:
                "radial-gradient(closest-side, rgba(255,255,255,0.85), rgba(255,255,255,0))",
              filter: "blur(1.5px)",
              opacity: 0,
            }}
          />
          {BARS_RIGHT.map((h, i) => (
            <WaveBar key={`right-${i}`} height={h} />
          ))}
        </div>
      </div>

      <div aria-hidden="true" className="absolute inset-0 z-20" />

      <div className="absolute top-[24px] left-[24px] z-10">
        <h3
          className="text-[18px] leading-none font-medium text-white"
          style={{ fontFamily: "var(--font-marketing-sans)" }}
        >
          Remove dead air
        </h3>
        <p
          className="mt-[6px] text-[14px] leading-[1.15] text-[#9B9B9B] md:max-w-[300px]"
          style={{ fontFamily: "var(--font-marketing-sans)" }}
        >
          Strip out the &quot;ums,&quot; &quot;ahs,&quot; awkward pauses, and
          silences that slow your videos down.
        </p>
      </div>
    </div>
  );
}

export default function CreativeUtilities() {
  return (
    <div className="w-full flex flex-col items-center">
      <section className="relative z-10 w-full max-w-[1280px] px-6 pt-24 pb-[18px] md:px-10 md:pt-32">
        <h2
          className="font-instrument max-w-[600px] text-[36px] leading-[1.05] font-thin tracking-[-0.01em] text-white md:text-[40px]"
          style={{ opacity: 1 }}
        >
          Creative Utilities for Faster Editing
        </h2>

        <div
          className="mt-12 grid grid-cols-1 gap-[18px] md:mt-16 md:grid-cols-2"
          style={{ gridTemplateRows: "auto auto" }}
        >
          <FindHighlightsCard />
          <CaptionsCard />
          <FastRenderingCard />
        </div>
      </section>

      <section className="relative z-10 w-full max-w-[1280px] px-6 pt-0 pb-16 md:px-10 md:pb-24">
        <div className="grid grid-cols-1 gap-[18px] md:grid-cols-2">
          <TranslateCard />
          <MotionGraphicsCard />
          <SharingCard />
          <RemoveDeadAirCard />
        </div>
      </section>
    </div>
  );
}
