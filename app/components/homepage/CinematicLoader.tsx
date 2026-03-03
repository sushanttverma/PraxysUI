"use client";

import React, { useRef, useCallback, useSyncExternalStore } from "react";
import { motion, AnimatePresence, useMotionValue } from "framer-motion";

function getReducedMotion() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function subscribeReducedMotion(cb: () => void) {
  const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
  mql.addEventListener("change", cb);
  return () => mql.removeEventListener("change", cb);
}

export default function CinematicLoader() {
  const reducedMotion = useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotion,
    () => false
  );

  const progress = useMotionValue(0);
  const [visible, setVisible] = React.useState(!reducedMotion);
  const started = useRef(false);

  const refCallback = useCallback(
    (node: HTMLDivElement | null) => {
      if (!node || started.current || reducedMotion) return;
      started.current = true;

      const start = performance.now();
      const duration = 1200;

      const tick = (now: number) => {
        const elapsed = now - start;
        const p = Math.min(elapsed / duration, 1);
        progress.set(1 - Math.pow(1 - p, 3));

        if (p < 1) {
          requestAnimationFrame(tick);
        } else {
          setTimeout(() => setVisible(false), 300);
        }
      };

      requestAnimationFrame(tick);
    },
    [reducedMotion, progress]
  );

  if (reducedMotion) return null;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          ref={refCallback}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-void"
          initial={{ clipPath: "inset(0 0 0 0)" }}
          exit={{ clipPath: "inset(0 0 100% 0)" }}
          transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
        >
          <motion.div
            initial={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.5, opacity: 0, y: -60 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="flex flex-col items-center gap-6"
          >
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-ignite">
              <span className="font-pixel text-xl font-bold text-void">P</span>
            </div>

            <div className="flex gap-2">
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className="h-1.5 w-1.5 rounded-full bg-ignite"
                  animate={{
                    opacity: [0.3, 1, 0.3],
                    scale: [0.8, 1.2, 0.8],
                  }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                    delay: i * 0.15,
                    ease: "easeInOut",
                  }}
                />
              ))}
            </div>

            <div className="w-48 h-[2px] bg-border rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-ignite rounded-full origin-left"
                style={{ scaleX: progress }}
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
