"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useTheme } from "./theme-provider";

interface ParticleNameProps {
  name: string;
}

export function ParticleName({ name }: ParticleNameProps) {
  const [ParticlesComponent, setParticlesComponent] = useState<any>(null);
  const [init, setInit] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    // Dynamic import of particles to avoid SSR issues
    Promise.all([
      import("@tsparticles/react"),
      import("@tsparticles/slim"),
    ]).then(async ([{ default: Particles, initParticlesEngine }, { loadSlim }]) => {
      await initParticlesEngine(async (engine: any) => {
        await loadSlim(engine);
      });
      setParticlesComponent(() => Particles);
      setInit(true);
    });
  }, []);

  const particlesLoaded = useCallback(async (container: any) => {
    // Particles loaded
  }, []);

  const options = useMemo(
    () => ({
      fullScreen: false,
      background: {
        color: {
          value: "transparent",
        },
      },
      fpsLimit: 60,
      interactivity: {
        events: {
          onHover: {
            enable: true,
            mode: "grab",
          },
        },
        modes: {
          grab: {
            distance: 140,
            links: {
              opacity: 0.5,
            },
          },
        },
      },
      particles: {
        color: {
          value: theme === "dark" ? "#ffffff" : "#000000",
        },
        links: {
          color: theme === "dark" ? "#ffffff" : "#000000",
          distance: 120,
          enable: true,
          opacity: 0.3,
          width: 1,
        },
        move: {
          direction: "none" as const,
          enable: true,
          outModes: {
            default: "bounce" as const,
          },
          random: true,
          speed: 0.8,
          straight: false,
        },
        number: {
          density: {
            enable: true,
          },
          value: 60,
        },
        opacity: {
          value: 0.6,
        },
        shape: {
          type: "circle",
        },
        size: {
          value: { min: 1, max: 3 },
        },
      },
      detectRetina: true,
    }),
    [theme]
  );

  return (
    <div className="relative w-full flex items-center justify-center">
      <div className="relative">
        {init && ParticlesComponent && (
          <ParticlesComponent
            id="tsparticles"
            className="absolute inset-0 -inset-x-16 -inset-y-8 pointer-events-auto"
            particlesLoaded={particlesLoaded}
            options={options}
          />
        )}
        <h1 className="relative z-10 text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight text-center pointer-events-none">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-neutral-900 via-neutral-700 to-neutral-900 dark:from-white dark:via-neutral-300 dark:to-white">
            {name}
          </span>
        </h1>
      </div>
    </div>
  );
}
