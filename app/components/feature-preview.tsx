"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Feature } from "./feature-section";

type Props = {
  feature: Feature;
};

export default function FeaturePreview({ feature }: Props) {
  return (
    <div className="relative flex h-full items-center justify-center ">

      <motion.div
        key={`${feature.color}-glow`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.45 }}
        className="absolute h-[500px] w-[500px] rounded-full blur-[120px]"
        style={{
          background: feature.color,
          opacity: 0.18,
        }}
      />

      <AnimatePresence mode="popLayout">
        <motion.div
          key={feature.title}
          initial={{
            opacity: 0,
            scale: 0.96,
            y: 30,
            filter: "blur(8px)",
          }}
          animate={{
            opacity: 1,
            scale: 1,
            y: 0,
            filter: "blur(0px)",
          }}
          exit={{
            opacity: 0,
            scale: 0.96,
            y: -20,
            filter: "blur(8px)",
          }}
          transition={{
            duration: 0.45,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="relative"
        >

          <div
            className="relative h-[610px] w-[760px] rounded-[22px]"
            style={{
              background:
                "linear-gradient(135deg,rgba(255,255,255,.06) 0%,rgba(255,255,255,.02) 45%,rgba(255,255,255,.05) 100%)",

              boxShadow: `
0 1px 0 rgba(255,255,255,.20) inset,
1px 0 0 rgba(255,255,255,.10) inset,
-1px 0 0 rgba(255,255,255,.04) inset,
0 -1px 0 rgba(255,255,255,.06) inset,
0 0 0 1px rgba(255,255,255,.06) inset,
0 24px 60px -20px rgba(0,0,0,.50),
0 12px 30px -12px rgba(0,0,0,.35)
`,
            }}
          >

            <div className="absolute inset-[8px] overflow-hidden rounded-[16px] border border-white/5 bg-[#090909]">

              <motion.div
                animate={{
                  background: `
linear-gradient(
135deg,
${feature.color}40,
#111111,
#050505
)
`,
                }}
                transition={{
                  duration: 0.5,
                }}
                className="absolute inset-0"
              />


              <div
                className="absolute inset-0 opacity-[0.07]"
                style={{
                  backgroundImage: `
linear-gradient(rgba(255,255,255,.1) 1px,transparent 1px),
linear-gradient(90deg,rgba(255,255,255,.1) 1px,transparent 1px)
`,
                  backgroundSize: "34px 34px",
                }}
              />


              <div className="relative flex h-full items-center justify-center">
                <div className="text-center">
                  <motion.div
                    layout
                    className="mx-auto mb-8 h-28 w-28 rounded-full"
                    style={{
                      background: feature.color,
                    }}
                  />

                  <motion.h3
                    layout
                    className="font-instrument text-5xl text-white"
                  >
                    {feature.title}
                  </motion.h3>

                  <motion.p
                    layout
                    className="mx-auto mt-5 max-w-md text-white/60"
                  >
                    Replace this panel with your actual analytics UI.
                  </motion.p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      <div className="absolute h-[150%] w-full bg-gradient-to-l from-[#070707] from-10% to-transparent -right-[9.69rem]"></div>
    </div>
  );
}
