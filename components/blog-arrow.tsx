"use client";

import { useEffect, useState } from "react";

export function BlogArrow() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Delay animation start for dramatic effect
    const timer = setTimeout(() => setVisible(true), 640);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className={`absolute -bottom-32 -left-28 sm:-bottom-32 sm:-left-32 pointer-events-none transition-opacity duration-700 ${visible ? "opacity-100" : "opacity-0"}`}
      aria-hidden="true"
    >
      <svg
        width="150"
        height="130"
        viewBox="0 0 150 130"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="text-neutral-500 dark:text-neutral-400"
      >
        {/* Hand-drawn arrow with loop: start from bottom-left, loop, then point to top-right */}
        <path
          d="M 20 100 Q 38 92, 50 80 Q 62 68, 56 56 Q 50 44, 38 50 Q 26 56, 32 68 Q 38 80, 58 72 Q 78 64, 100 52 Q 112 44, 120 38"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          fill="none"
          style={{
            strokeDasharray: 250,
            strokeDashoffset: visible ? 0 : 250,
            transition: "stroke-dashoffset 0.96s ease-out 0.24s",
          }}
        />
        {/* Arrow head */}
        <path
          d="M 110 34 Q 115 36, 120 38 M 120 38 Q 118 44, 116 50"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          fill="none"
          style={{
            strokeDasharray: 30,
            strokeDashoffset: visible ? 0 : 30,
            transition: "stroke-dashoffset 0.32s ease-out 1.12s",
          }}
        />
        {/* Hand-written "blog" text - tilted, positioned at bottom left with more spacing */}
        <text
          x="6"
          y="126"
          fill="currentColor"
          fontSize="20"
          fontFamily="var(--font-caveat), cursive"
          fontWeight="700"
          className="select-none"
          transform="rotate(-10, 6, 126)"
          style={{
            opacity: visible ? 1 : 0,
            transition: "opacity 0.4s ease-out 1.28s",
          }}
        >
          blog
        </text>
      </svg>
    </div>
  );
}
