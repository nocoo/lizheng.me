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
      className={`absolute -bottom-20 -left-16 sm:-bottom-20 sm:-left-20 pointer-events-none transition-opacity duration-700 ${visible ? "opacity-100" : "opacity-0"}`}
      aria-hidden="true"
    >
      <svg
        width="120"
        height="90"
        viewBox="0 0 120 90"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="text-neutral-900 dark:text-white"
      >
        {/* Hand-drawn arrow with loop: start from bottom-left, loop, then point to top-right */}
        <path
          d="M 10 75 Q 25 70, 35 60 Q 45 50, 40 40 Q 35 30, 25 35 Q 15 40, 20 50 Q 25 60, 40 55 Q 55 50, 70 35 Q 85 20, 95 12"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          fill="none"
          style={{
            strokeDasharray: 200,
            strokeDashoffset: visible ? 0 : 200,
            transition: "stroke-dashoffset 1.2s ease-out 0.3s",
          }}
        />
        {/* Arrow head */}
        <path
          d="M 85 8 Q 90 10, 95 12 M 95 12 Q 93 18, 91 24"
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
          x="8"
          y="88"
          fill="currentColor"
          fontSize="16"
          fontFamily="var(--font-caveat), 'Comic Sans MS', cursive"
          fontWeight="600"
          className="select-none"
          transform="rotate(-8, 8, 88)"
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
