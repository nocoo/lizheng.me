"use client";

import { BookOpen, Linkedin, Twitter, Github } from "lucide-react";

interface SocialLinksProps {
  className?: string;
}

const links = [
  {
    href: "https://lizheng.blog",
    icon: BookOpen,
    label: "Blog",
  },
  {
    href: "https://linkedin.com/in/zhengli",
    icon: Linkedin,
    label: "LinkedIn",
  },
  {
    href: "https://x.com/zhengli",
    icon: Twitter,
    label: "X (Twitter)",
  },
  {
    href: "https://github.com/nocoo",
    icon: Github,
    label: "GitHub",
  },
];

export function SocialLinks({ className = "" }: SocialLinksProps) {
  return (
    <div className={`flex items-center justify-center gap-6 ${className}`}>
      {links.map(({ href, icon: Icon, label }) => (
        <a
          key={href}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="group p-3 rounded-full bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-all duration-200 hover:scale-110"
          aria-label={label}
        >
          <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-neutral-600 dark:text-neutral-400 group-hover:text-neutral-900 dark:group-hover:text-white transition-colors" />
        </a>
      ))}
    </div>
  );
}
