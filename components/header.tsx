"use client";

import { useTheme } from "./theme-provider";
import { useRouter } from "next/navigation";
import { Sun, Moon, Globe } from "lucide-react";

interface HeaderProps {
  locale: string;
}

export function Header({ locale }: HeaderProps) {
  const { theme, toggleTheme } = useTheme();
  const router = useRouter();

  const targetLocale = locale === "en" ? "zh" : "en";

  const switchLocale = () => {
    router.push(`/${targetLocale}`);
  };

  return (
    <header className="fixed top-0 right-0 p-4 sm:p-6 z-50 flex items-center gap-2">
      <button
        onClick={switchLocale}
        className="p-2 rounded-full bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors"
        aria-label={`Switch to ${targetLocale === "zh" ? "中文" : "English"}`}
      >
        <Globe className="w-5 h-5 text-neutral-700 dark:text-neutral-300" />
      </button>
      <button
        onClick={toggleTheme}
        className="p-2 rounded-full bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors"
        aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
      >
        {theme === "light" ? (
          <Moon className="w-5 h-5 text-neutral-700" />
        ) : (
          <Sun className="w-5 h-5 text-neutral-300" />
        )}
      </button>
    </header>
  );
}
