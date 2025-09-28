"use client";

import { motion } from "framer-motion";
import AnimatedNumber from "@/app/components/ui/animated-number";

const stats = [
  { value: 70, label: "Components", suffix: "+" },
  { value: 14, label: "Templates", suffix: "" },
  { value: 6, label: "Categories", suffix: "" },
  { value: 0, label: "Open Source", suffix: "", isText: true },
];

export default function NumbersBar() {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="border-y border-border py-8"
    >
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-12 md:gap-16">
          {stats.map((stat, i) => (
            <div key={i} className="flex items-center gap-6 sm:gap-12 md:gap-16">
              {i > 0 && (
                <span className="text-border-light text-lg hidden sm:block">
                  •
                </span>
              )}
              <div className="text-center font-mono">
                {stat.isText ? (
                  <span className="text-lg sm:text-xl font-bold text-chalk">
                    Open Source
                  </span>
                ) : (
                  <span className="text-lg sm:text-xl font-bold text-chalk">
                    <AnimatedNumber
                      value={stat.value}
                      className="text-lg sm:text-xl font-bold text-chalk"
                    />
                    {stat.suffix && (
                      <span className="text-ignite">{stat.suffix}</span>
                    )}
                    <span className="ml-2 text-sm font-normal text-blush">
                      {stat.label}
                    </span>
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
