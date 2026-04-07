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
      className={`absolute -bottom-28 -left-24 sm:-bottom-28 sm:-left-28 pointer-events-none transition-opacity duration-700 ${visible ? "opacity-100" : "opacity-0"}`}
      aria-hidden="true"
    >
      <svg
        width="140"
        height="110"
        viewBox="0 0 140 110"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="text-neutral-900 dark:text-white"
      >
        {/* Hand-drawn arrow with loop: start from bottom-left, loop, then point to top-right */}
        <path
          d="M 12 90 Q 30 82, 42 70 Q 54 58, 48 46 Q 42 34, 30 40 Q 18 46, 24 58 Q 30 70, 50 62 Q 70 54, 90 36 Q 105 22, 115 14"
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
          d="M 105 10 Q 110 12, 115 14 M 115 14 Q 113 20, 111 26"
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
        {/* Hand-written "blog" text - tilted, positioned at bottom left */}
        <text
          x="6"
          y="108"
          fill="currentColor"
          fontSize="20"
          fontFamily="var(--font-caveat), cursive"
          fontWeight="700"
          className="select-none"
          transform="rotate(-10, 6, 108)"
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
