"use client";

import { Particles, ParticlesProvider } from "@tsparticles/react";
import { useReducedMotion } from "framer-motion";
import { loadSlim } from "@tsparticles/slim";

/**
 * HAVEN pizzazz — dust motes in afternoon light. Thirty-odd soft lavender
 * particles drifting almost imperceptibly through the hero. tsparticles v4
 * (ParticlesProvider registers the slim engine); no interactivity, no links,
 * nothing demanding attention — the point is ambience. Skipped entirely for
 * prefers-reduced-motion.
 */
export function ParticleField({ className }: { className?: string }) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) return null;

  return (
    <ParticlesProvider
      init={async (engine) => {
        await loadSlim(engine);
      }}
    >
      <Particles
        id="haven-motes"
        className={className}
        options={{
          fullScreen: { enable: false },
          fpsLimit: 60,
          detectRetina: true,
          background: { color: { value: "transparent" } },
          interactivity: {
            events: { onHover: { enable: false }, onClick: { enable: false } },
          },
          particles: {
            number: { value: 34, density: { enable: true } },
            color: { value: ["#8897bf", "#b4bedd", "#d8d4ea"] },
            opacity: {
              value: { min: 0.12, max: 0.4 },
              animation: { enable: true, speed: 0.4, sync: false },
            },
            size: { value: { min: 1, max: 3.2 } },
            move: {
              enable: true,
              speed: 0.35,
              direction: "none",
              random: true,
              straight: false,
              outModes: { default: "out" },
            },
            links: { enable: false },
          },
        }}
      />
    </ParticlesProvider>
  );
}
