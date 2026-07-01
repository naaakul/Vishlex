"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Feature } from "./feature-section";

type Props = {
  features: Feature[];
  active: number;
};

export default function FeatureList({
  features,
  active,
}: Props) {
  return (
    <div className="flex h-full flex-col justify-center">
      <h2 className="font-instrument text-[52px] font-light leading-[1.05] tracking-[-0.02em] text-white">
        Powerful
        <br />
        analytics.
      </h2>

      <p className="mt-5 max-w-md font-delight text-[16px] leading-7 text-white/55">
        Everything you need to understand your users and build
        better products.
      </p>

      <ul className="mt-24">
        {features.map((feature, index) => {
          const isActive = active === index;

          return (
            <li key={feature.title}>
              <button
                className="group w-full cursor-default py-6 text-left"
              >
                <motion.h3
                  animate={{
                    opacity: isActive ? 1 : 0.35,
                  }}
                  transition={{
                    duration: 0.35,
                  }}
                  className="font-delight text-[22px] font-medium text-white"
                >
                  {feature.title}
                </motion.h3>

                <AnimatePresence initial={false}>
                  {isActive && (
                    <motion.p
                      initial={{
                        opacity: 0,
                        height: 0,
                        marginTop: 0,
                      }}
                      animate={{
                        opacity: 1,
                        height: "auto",
                        marginTop: 14,
                      }}
                      exit={{
                        opacity: 0,
                        height: 0,
                        marginTop: 0,
                      }}
                      transition={{
                        duration: 0.35,
                      }}
                      className="max-w-md overflow-hidden font-delight text-[15px] leading-7 text-white/65"
                    >
                      {feature.description}
                    </motion.p>
                  )}
                </AnimatePresence>
              </button>

              {/* Divider */}

              <div className="relative h-px w-[85%] overflow-hidden bg-white/10">

                <motion.div
                  animate={{
                    scaleX: isActive ? 1 : 0,
                    opacity: isActive ? 1 : 0,
                  }}
                  transition={{
                    duration: 0.45,
                  }}
                  className="absolute inset-y-0 left-0 w-[75%] origin-left bg-gradient-to-r from-white via-white/50 to-transparent"
                />

              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}