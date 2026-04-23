"use client";

interface SocialLinksProps {
  stagger?: boolean;
}

const links = [
  { href: "https://lizheng.blog", label: "Blog", file: "blog.md" },
  { href: "https://www.linkedin.com/in/nocoo/", label: "LinkedIn", file: "linkedin.md" },
  { href: "https://x.com/zhengli", label: "X (Twitter)", file: "x.md" },
  { href: "https://github.com/nocoo", label: "GitHub", file: "github.md" },
];

export function SocialLinks({ stagger = false }: SocialLinksProps) {
  return (
    <div className="flex flex-wrap gap-x-6 gap-y-2 text-[15px] sm:text-[16px] text-neutral-700 dark:text-neutral-300">
      {links.map(({ href, label, file }, index) => (
        <a
          key={href}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={label}
          className="relative inline-block font-mono text-neutral-700 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white transition-colors duration-150 hover:underline underline-offset-4 decoration-green-500 dark:decoration-green-400"
          style={
            stagger
              ? {
                  opacity: 0,
                  animation: `terminal-fade-in 0.2s ease-out ${index * 80}ms forwards`,
                }
              : undefined
          }
        >
          {file}
        </a>
      ))}
    </div>
  );
}
