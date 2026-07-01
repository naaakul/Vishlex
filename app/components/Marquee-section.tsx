import Marquee from "@/components/Marquee";
import PromptChip from "@/components/prompt-chip";

import { Search, Flame, Scan, Film, Quote, Laugh } from "lucide-react";

export const prompts = [
  {
    icon: Search,
    text: "Find the best moments",
  },
  {
    icon: Flame,
    text: "Pull the hot takes",
  },
  {
    icon: Scan,
    text: "Auto-cut between angles",
  },
  {
    icon: Film,
    text: "Make a 15s teaser",
  },
  {
    icon: Quote,
    text: "Find every mention",
  },
  {
    icon: Laugh,
    text: "Grab the funniest bits",
  },
];

const MarqueeSection = () => {
  return (
    <section className="relative z-10 w-full pt-14">
        {/* Background Glow */}
        <div
          aria-hidden
          className="pointer-events-none bg-[rgba(10,144,248,.22)] absolute left-1/2 top-1/2 -z-10 h-[60%] w-screen -translate-x-1/2 -translate-y-1/2 rounded-full blur-[160px]"
        />

        <div className="mx-auto w-full max-w-[1280px] px-6 md:px-10">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between md:gap-10">
            <h2 className="max-w-[520px] font-instrument text-[36px] font-thin leading-[1.05] tracking-[-0.01em] text-white md:text-[40px]">
              Turn Data Into {" "}
              <span className="relative inline-block">
                Decisions.
                <span
                  className="pointer-events-none absolute left-0 -bottom-2 h-3 w-full bg-no-repeat"
                  style={{
                    backgroundImage:
                      "url('/images/marketing/hero-underline.svg')",
                    backgroundSize: "100% 100%",
                  }}
                />
              </span>
            </h2>

            <p className="max-w-[380px] text-[16px] leading-[1.4] text-[#9B9B9B] md:text-right">
              Turn raw footage into structured edits with intelligent timeline
              decisions and automated workflows.
            </p>
          </div>
        </div>

        {/* Marquee comes here */}
        <div className="mt-20">
          <div className="relative left-1/2 mt-20 flex w-screen -translate-x-1/2 flex-col gap-[9px]">
            <Marquee speed={42}>
              {prompts.map((item) => (
                <PromptChip key={item.text} icon={item.icon} text={item.text} />
              ))}
            </Marquee>

            <Marquee reverse speed={35}>
              {prompts.map((item) => (
                <PromptChip key={item.text} icon={item.icon} text={item.text} />
              ))}
            </Marquee>
          </div>
        </div>
      </section>
  )
}

export default MarqueeSection
