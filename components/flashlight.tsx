"use client";

import { useEffect, useRef } from "react";
import { useTheme } from "./theme-provider";

export function Flashlight() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -200, y: -200 });
  const { theme } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    const gridSize = 16;
    const radius = 60;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      ctx.scale(dpr, dpr);
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
    };

    const draw = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      ctx.clearRect(0, 0, width, height);

      const baseColor = theme === "dark" ? "255, 255, 255" : "0, 0, 0";
      const baseAlpha = 0.03;
      const maxAlpha = 0.2;
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      // Draw vertical line segments
      for (let x = 0; x <= width; x += gridSize) {
        for (let y = 0; y < height; y += gridSize) {
          // Calculate distance from segment midpoint to mouse
          const segMidY = y + gridSize / 2;
          const dist = Math.sqrt((x - mx) ** 2 + (segMidY - my) ** 2);

          let alpha = baseAlpha;
          if (dist < radius) {
            const factor = 1 - dist / radius;
            alpha = baseAlpha + (maxAlpha - baseAlpha) * factor * factor;
          }

          ctx.beginPath();
          ctx.moveTo(x, y);
          ctx.lineTo(x, Math.min(y + gridSize, height));
          ctx.strokeStyle = `rgba(${baseColor}, ${alpha})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }

      // Draw horizontal line segments
      for (let y = 0; y <= height; y += gridSize) {
        for (let x = 0; x < width; x += gridSize) {
          // Calculate distance from segment midpoint to mouse
          const segMidX = x + gridSize / 2;
          const dist = Math.sqrt((segMidX - mx) ** 2 + (y - my) ** 2);

          let alpha = baseAlpha;
          if (dist < radius) {
            const factor = 1 - dist / radius;
            alpha = baseAlpha + (maxAlpha - baseAlpha) * factor * factor;
          }

          ctx.beginPath();
          ctx.moveTo(x, y);
          ctx.lineTo(Math.min(x + gridSize, width), y);
          ctx.strokeStyle = `rgba(${baseColor}, ${alpha})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }

      animationId = requestAnimationFrame(draw);
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseLeave = () => {
      mouseRef.current = { x: -200, y: -200 };
    };

    resize();
    draw();

    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [theme]);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-0"
      aria-hidden="true"
    />
  );
}
