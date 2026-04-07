"use client";

import { useEffect, useRef } from "react";
import { useTheme } from "./theme-provider";

interface ParticleNameProps {
  name: string;
}

interface Particle {
  x: number;
  y: number;
  originX: number;
  originY: number;
  size: number;
  color: string;
  vx: number;
  vy: number;
}

export function ParticleName({ name }: ParticleNameProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let particles: Particle[] = [];
    const mouse = { x: -9999, y: -9999 };

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      createParticles();
    };

    const createParticles = () => {
      particles = [];
      const rect = canvas.getBoundingClientRect();

      // Create offscreen canvas to render text
      const offscreen = document.createElement("canvas");
      offscreen.width = rect.width;
      offscreen.height = rect.height;
      const offCtx = offscreen.getContext("2d");
      if (!offCtx) return;

      // Calculate responsive font size (reduced to 90%)
      const fontSize = Math.min(rect.width / 5, 120) * 0.9;

      offCtx.fillStyle = theme === "dark" ? "#ffffff" : "#000000";
      offCtx.font = `bold ${fontSize}px var(--font-mono), "JetBrains Mono", "Fira Code", "SF Mono", Menlo, Monaco, Consolas, monospace`;
      offCtx.textAlign = "center";
      offCtx.textBaseline = "middle";
      offCtx.fillText(name, rect.width / 2, rect.height / 2);

      // Sample pixels
      const imageData = offCtx.getImageData(0, 0, rect.width, rect.height);
      const data = imageData.data;
      const gap = 3; // Density of particles

      for (let y = 0; y < rect.height; y += gap) {
        for (let x = 0; x < rect.width; x += gap) {
          const index = (y * rect.width + x) * 4;
          const alpha = data[index + 3] ?? 0;

          if (alpha > 128) {
            particles.push({
              x: Math.random() * rect.width,
              y: Math.random() * rect.height,
              originX: x,
              originY: y,
              size: Math.random() * 1.5 + 1,
              color:
                theme === "dark"
                  ? `rgba(255, 255, 255, ${0.6 + Math.random() * 0.4})`
                  : `rgba(0, 0, 0, ${0.6 + Math.random() * 0.4})`,
              vx: 0,
              vy: 0,
            });
          }
        }
      }
    };

    const animate = () => {
      const rect = canvas.getBoundingClientRect();
      ctx.clearRect(0, 0, rect.width, rect.height);

      particles.forEach((p) => {
        // Mouse repulsion
        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const maxDist = 80;

        if (dist < maxDist) {
          const force = (maxDist - dist) / maxDist;
          const angle = Math.atan2(dy, dx);
          p.vx -= Math.cos(angle) * force * 2;
          p.vy -= Math.sin(angle) * force * 2;
        }

        // Return to origin
        p.vx += (p.originX - p.x) * 0.05;
        p.vy += (p.originY - p.y) * 0.05;

        // Friction
        p.vx *= 0.9;
        p.vy *= 0.9;

        // Update position
        p.x += p.vx;
        p.y += p.vy;

        // Draw particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();
      });

      animationId = requestAnimationFrame(animate);
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mouse.x = -9999;
      mouse.y = -9999;
    };

    resize();
    animate();

    window.addEventListener("resize", resize);
    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [name, theme]);

  return (
    <div className="relative w-full flex items-center justify-center">
      <canvas ref={canvasRef} className="w-full h-32 sm:h-40 md:h-48" />
    </div>
  );
}
