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
          d="M 20 100 Q 38 92, 50 80 Q 62 68, 56 56 Q 50 44, 38 50 Q 26 56, 32 68 Q 38 80, 58 72 Q 78 64, 100 46 Q 115 32, 125 24"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          fill="none"
          style={{
            strokeDasharray: 250,
            strokeDashoffset: visible ? 0 : 250,
            transition: "stroke-dashoffset 1.2s ease-out 0.3s",
          }}
        />
        {/* Arrow head */}
        <path
          d="M 115 20 Q 120 22, 125 24 M 125 24 Q 123 30, 121 36"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          fill="none"
          style={{
            strokeDasharray: 30,
            strokeDashoffset: visible ? 0 : 30,
            transition: "stroke-dashoffset 0.4s ease-out 1.4s",
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
            transition: "opacity 0.5s ease-out 1.6s",
          }}
        >
          blog
        </text>
      </svg>
    </div>
  );
}
