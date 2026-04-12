"use client";

import { useEffect, useRef, useState } from "react";
import { useTheme } from "./theme-provider";

export function Flashlight() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -200, y: -200 });
  const { theme } = useTheme();
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    // Detect touch device
    const hasTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0;
    setIsTouchDevice(hasTouch);
  }, []);

  useEffect(() => {
    // Skip canvas rendering on touch devices
    if (isTouchDevice) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    const gridSize = 16;
    const radius = 60;
    // Only draw lines within this range of mouse (with padding for smooth edges)
    const drawRange = radius + gridSize;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      ctx.scale(dpr, dpr);
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
    };

    const drawBaseGrid = (
      ctx: CanvasRenderingContext2D,
      width: number,
      height: number,
      baseColor: string,
      baseAlpha: number,
    ) => {
      ctx.strokeStyle = `rgba(${baseColor}, ${baseAlpha})`;
      ctx.lineWidth = 1;
      ctx.beginPath();
      for (let x = 0; x <= width; x += gridSize) {
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
      }
      for (let y = 0; y <= height; y += gridSize) {
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
      }
      ctx.stroke();
    };

    const drawEnhancedVerticalSegments = (
      ctx: CanvasRenderingContext2D,
      startX: number,
      endX: number,
      startY: number,
      endY: number,
      mx: number,
      my: number,
      height: number,
      baseColor: string,
      baseAlpha: number,
      maxAlpha: number,
    ) => {
      for (let x = startX; x <= endX; x += gridSize) {
        for (let y = startY; y < endY; y += gridSize) {
          const segMidY = y + gridSize / 2;
          const dist = Math.sqrt((x - mx) ** 2 + (segMidY - my) ** 2);

          if (dist < radius) {
            const factor = 1 - dist / radius;
            const alpha = baseAlpha + (maxAlpha - baseAlpha) * factor * factor;

            ctx.beginPath();
            ctx.moveTo(x, y);
            ctx.lineTo(x, Math.min(y + gridSize, height));
            ctx.strokeStyle = `rgba(${baseColor}, ${alpha})`;
            ctx.stroke();
          }
        }
      }
    };

    const drawEnhancedHorizontalSegments = (
      ctx: CanvasRenderingContext2D,
      startX: number,
      endX: number,
      startY: number,
      endY: number,
      mx: number,
      my: number,
      width: number,
      baseColor: string,
      baseAlpha: number,
      maxAlpha: number,
    ) => {
      for (let y = startY; y <= endY; y += gridSize) {
        for (let x = startX; x < endX; x += gridSize) {
          const segMidX = x + gridSize / 2;
          const dist = Math.sqrt((segMidX - mx) ** 2 + (y - my) ** 2);

          if (dist < radius) {
            const factor = 1 - dist / radius;
            const alpha = baseAlpha + (maxAlpha - baseAlpha) * factor * factor;

            ctx.beginPath();
            ctx.moveTo(x, y);
            ctx.lineTo(Math.min(x + gridSize, width), y);
            ctx.strokeStyle = `rgba(${baseColor}, ${alpha})`;
            ctx.stroke();
          }
        }
      }
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

      // Draw base grid (very faint, full screen)
      drawBaseGrid(ctx, width, height, baseColor, baseAlpha);

      // Only draw enhanced segments near mouse cursor
      if (mx > -100 && my > -100) {
        const startX = Math.max(0, Math.floor((mx - drawRange) / gridSize) * gridSize);
        const endX = Math.min(width, Math.ceil((mx + drawRange) / gridSize) * gridSize);
        const startY = Math.max(0, Math.floor((my - drawRange) / gridSize) * gridSize);
        const endY = Math.min(height, Math.ceil((my + drawRange) / gridSize) * gridSize);

        // Draw vertical line segments near mouse
        drawEnhancedVerticalSegments(
          ctx,
          startX,
          endX,
          startY,
          endY,
          mx,
          my,
          height,
          baseColor,
          baseAlpha,
          maxAlpha,
        );

        // Draw horizontal line segments near mouse
        drawEnhancedHorizontalSegments(
          ctx,
          startX,
          endX,
          startY,
          endY,
          mx,
          my,
          width,
          baseColor,
          baseAlpha,
          maxAlpha,
        );
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
  }, [theme, isTouchDevice]);

  // Don't render canvas on touch devices
  if (isTouchDevice) {
    return null;
  }

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-0"
      aria-hidden="true"
      tabIndex={-1}
    />
  );
}
