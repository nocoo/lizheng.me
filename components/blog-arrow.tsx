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
      className={`absolute -bottom-20 -left-16 sm:-bottom-24 sm:-left-24 pointer-events-none transition-opacity duration-700 ${visible ? "opacity-100" : "opacity-0"}`}
      aria-hidden="true"
    >
      <svg
        width="100"
        height="85"
        viewBox="0 0 130 110"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="text-neutral-500 dark:text-neutral-400 sm:w-[130px] sm:h-[110px]"
      >
        {/* Hand-drawn arrow with loop: start from bottom-left, loop, then point to top-right */}
        <path
          d="M 15 85 Q 30 78, 40 68 Q 50 58, 45 48 Q 40 38, 30 43 Q 20 48, 25 58 Q 30 68, 48 62 Q 66 56, 85 42 Q 100 30, 112 20"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          fill="none"
          style={{
            strokeDasharray: 220,
            strokeDashoffset: visible ? 0 : 220,
            transition: "stroke-dashoffset 0.96s ease-out 0.24s",
          }}
        />
        {/* Arrow head */}
        <path
          d="M 102 16 Q 107 18, 112 20 M 112 20 Q 110 26, 108 32"
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
          y="106"
          fill="currentColor"
          fontSize="20"
          fontFamily="var(--font-caveat), cursive"
          fontWeight="700"
          className="select-none"
          transform="rotate(-10, 6, 106)"
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
