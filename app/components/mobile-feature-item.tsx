"use client";

import { Feature } from "./feature-section";

type Props = {
  feature: Feature;
  index: number;
};

export default function MobileFeatureItem({ feature, index }: Props) {
  return (
    <div>
      <h3 className="text-[21px] font-medium leading-none text-white">
        {feature.title}
      </h3>

      <p className="mt-3 max-w-[440px] text-[15px] leading-[1.5] text-white/65">
        {feature.description}
      </p>

      <div className="relative mt-7">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-1/2 left-1/2 -z-10 h-[55%] w-[80%] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[60px]"
          style={{ background: `${feature.color}1F` }} // ~12% opacity hex
        />

        <div className="[container-type:inline-size]">
          <div
            className="overflow-hidden"
            style={{ borderRadius: "calc(18px * 100cqw / 690)" }}
          >
            <div
              className="[container-type:inline-size] relative isolate w-full overflow-visible"
              style={{ aspectRatio: "690 / 500" }}
            >
              <div
                className="absolute top-0 left-0 origin-top-left"
                style={{
                  width: 690,
                  height: 500,
                  transform: "scale(calc(100cqw / 690px)) translateZ(0)",
                  willChange: "transform",
                  maskImage:
                    "linear-gradient(to bottom, black 0%, black 92%, transparent 100%)",
                  WebkitMaskImage:
                    "linear-gradient(to bottom, black 0%, black 92%, transparent 100%)",
                }}
              >
                <div
                  className="absolute inset-0 rounded-[18px]"
                  style={{
                    background:
                      "linear-gradient(135deg,rgba(255,255,255,.06) 0%,rgba(255,255,255,.02) 45%,rgba(255,255,255,.05) 100%)",
                    boxShadow: `
                      inset 0 1px 0 rgba(255,255,255,.20),
                      inset 1px 0 0 rgba(255,255,255,.10),
                      inset -1px 0 0 rgba(255,255,255,.04),
                      inset 0 -1px 0 rgba(255,255,255,.06),
                      inset 0 0 0 1px rgba(255,255,255,.06),
                      0 24px 60px -20px rgba(0,0,0,.50),
                      0 12px 30px -12px rgba(0,0,0,.35)
                    `,
                  }}
                />

                <div className="absolute top-[8px] left-[8px] right-[8px] bottom-[8px] overflow-hidden rounded-[12px] bg-[#090909]">
                  <div
                    className="absolute inset-0"
                    style={{
                      background: `linear-gradient(135deg, ${feature.color}40, #111111, #050505)`,
                    }}
                  />

                  <div
                    className="absolute inset-0 opacity-[0.07]"
                    style={{
                      backgroundImage: `
                        linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)
                      `,
                      backgroundSize: "34px 34px",
                    }}
                  />

                  <div className="relative flex h-full items-center justify-center">
                    <div className="text-center">
                      <div
                        className="mx-auto mb-8 h-28 w-28 rounded-full"
                        style={{ background: feature.color }}
                      />
                      <h4 className="text-5xl font-light text-white">
                        {feature.title}
                      </h4>
                      <p className="mx-auto mt-5 max-w-md text-white/60">
                        Replace with your actual UI for feature {index + 1}.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
