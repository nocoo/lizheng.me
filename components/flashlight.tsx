"use client";

import { useEffect, useState } from "react";
import { useTheme } from "./theme-provider";

export function Flashlight() {
  const [position, setPosition] = useState({ x: -200, y: -200 });
  const [isVisible, setIsVisible] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  const gradient =
    theme === "dark"
      ? "radial-gradient(circle, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 50%, transparent 70%)"
      : "radial-gradient(circle, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.05) 50%, transparent 70%)";

  return (
    <div
      className="pointer-events-none fixed inset-0 z-30 transition-opacity duration-300"
      style={{ opacity: isVisible ? 1 : 0 }}
      aria-hidden="true"
    >
      <div
        className="absolute w-[120px] h-[120px] rounded-full"
        style={{
          left: position.x - 60,
          top: position.y - 60,
          background: gradient,
        }}
      />
    </div>
  );
}
