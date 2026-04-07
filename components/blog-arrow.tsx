"use client";

import { useEffect, useState } from "react";

export function BlogArrow() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Delay animation start for dramatic effect
    const timer = setTimeout(() => setVisible(true), 800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className={`absolute -bottom-16 -left-4 sm:-bottom-14 sm:-left-6 pointer-events-none transition-opacity duration-700 ${visible ? "opacity-100" : "opacity-0"}`}
      aria-hidden="true"
    >
      <svg
        width="80"
        height="60"
        viewBox="0 0 80 60"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="text-amber-600 dark:text-amber-400"
      >
        {/* Hand-drawn arrow pointing up-right */}
        <path
          d="M 8 52 Q 20 45, 35 30 Q 50 15, 58 8"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          fill="none"
          className={`${visible ? "animate-draw-arrow" : ""}`}
          style={{
            strokeDasharray: 100,
            strokeDashoffset: visible ? 0 : 100,
            transition: "stroke-dashoffset 0.8s ease-out 0.3s",
          }}
        />
        {/* Arrow head - two strokes */}
        <path
          d="M 48 6 Q 54 7, 58 8 M 58 8 Q 57 14, 56 20"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          fill="none"
          style={{
            strokeDasharray: 30,
            strokeDashoffset: visible ? 0 : 30,
            transition: "stroke-dashoffset 0.4s ease-out 1s",
          }}
        />
        {/* Hand-written "blog" text - tilted */}
        <g
          transform="rotate(-12, 40, 48)"
          style={{
            opacity: visible ? 1 : 0,
            transition: "opacity 0.5s ease-out 1.2s",
          }}
        >
          <text
            x="5"
            y="58"
            fill="currentColor"
            fontSize="14"
            fontFamily="var(--font-caveat), 'Comic Sans MS', cursive"
            fontWeight="600"
            className="select-none"
          >
            blog
          </text>
        </g>
      </svg>
    </div>
  );
}
