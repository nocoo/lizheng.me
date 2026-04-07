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
      const maxAlpha = 0.15;

      // Draw vertical lines
      for (let x = 0; x <= width; x += gridSize) {
        const dist = Math.abs(x - mouseRef.current.x);
        const yDist = Math.abs(mouseRef.current.y - height / 2);

        // Check if any point on this vertical line is within radius of mouse
        let minDist = dist;
        if (mouseRef.current.y >= 0 && mouseRef.current.y <= height) {
          minDist = dist;
        }

        // Calculate alpha based on distance to mouse
        let alpha = baseAlpha;
        if (minDist < radius) {
          const factor = 1 - minDist / radius;
          alpha = baseAlpha + (maxAlpha - baseAlpha) * factor * factor;
        }

        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.strokeStyle = `rgba(${baseColor}, ${alpha})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      // Draw horizontal lines
      for (let y = 0; y <= height; y += gridSize) {
        const dist = Math.abs(y - mouseRef.current.y);

        let alpha = baseAlpha;
        if (dist < radius) {
          const factor = 1 - dist / radius;
          alpha = baseAlpha + (maxAlpha - baseAlpha) * factor * factor;
        }

        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.strokeStyle = `rgba(${baseColor}, ${alpha})`;
        ctx.lineWidth = 1;
        ctx.stroke();
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
