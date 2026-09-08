"use client";

import { useReducedMotion } from "framer-motion";
import { ReactLenis } from "lenis/react";

/**
 * Lenis inertial smooth scrolling, tuned slower than usual — Haven should
 * feel like moving through water. Disabled for prefers-reduced-motion.
 */
export function SmoothScroll() {
  const reduceMotion = useReducedMotion();
  if (reduceMotion) return null;

  return (
    <ReactLenis
      root
      options={{
        duration: 1.4,
        touchMultiplier: 1.4,
      }}
    />
  );
}
