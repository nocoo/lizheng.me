"use client";

import type { ReactNode } from "react";

interface TerminalWindowProps {
  title?: string;
  children: ReactNode;
}

export function TerminalWindow({ title = "zheng@lizheng.me ~ %", children }: TerminalWindowProps) {
  return (
    <section
      className="w-full max-w-[720px] rounded-[12px] border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#141414] overflow-hidden font-mono"
      aria-label="terminal"
    >
      <div className="flex items-center gap-2 px-4 py-3 border-b border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-[#1a1a1a]">
        <div className="flex items-center gap-2" aria-hidden="true">
          <span className="w-3 h-3 rounded-full bg-[#ff5f57]" />
          <span className="w-3 h-3 rounded-full bg-[#febc2e]" />
          <span className="w-3 h-3 rounded-full bg-[#28c840]" />
        </div>
        <div className="flex-1 flex items-center justify-center gap-2">
          <span className="w-6 h-6 rounded-full overflow-hidden ring-1 ring-neutral-200 dark:ring-neutral-700">
            <picture>
              <source srcSet="/images/profile.webp" type="image/webp" />
              <img
                src="/images/profile.jpg"
                alt="Zheng Li"
                width={24}
                height={24}
                className="object-cover w-full h-full"
                decoding="async"
                fetchPriority="high"
              />
            </picture>
          </span>
          <span className="text-[14px] text-neutral-500 dark:text-neutral-400 select-none">
            {title}
          </span>
        </div>
        <div className="w-[46px]" aria-hidden="true" />
      </div>
      <div className="px-5 sm:px-8 py-6 sm:py-8 text-[16px] leading-[1.6] text-neutral-900 dark:text-neutral-100">
        {children}
      </div>
    </section>
  );
}
