"use client";

import { ThemeProvider } from "./theme-provider";
import { Header } from "./header";
import { ParticleName } from "./particle-name";
import { SocialLinks } from "./social-links";
import Image from "next/image";

interface HomeClientProps {
  locale: string;
  translations: {
    role: string;
    tagline: string;
  };
}

export function HomeClient({ locale, translations }: HomeClientProps) {
  return (
    <ThemeProvider>
      <main className="min-h-screen bg-white dark:bg-neutral-950 text-neutral-900 dark:text-white transition-colors duration-300">
        <Header locale={locale} />

        <div className="flex flex-col items-center justify-center min-h-screen px-4 py-16 sm:py-24">
          {/* Avatar */}
          <div className="relative mb-8 sm:mb-10">
            <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-full overflow-hidden ring-4 ring-neutral-200 dark:ring-neutral-800 shadow-xl">
              <Image
                src="/images/profile.jpg"
                alt="Zheng Li"
                width={160}
                height={160}
                className="object-cover w-full h-full"
                priority
              />
            </div>
          </div>

          {/* Name with Particles */}
          <div className="mb-6 sm:mb-8 w-full max-w-3xl">
            <ParticleName name="Zheng Li" />
          </div>

          {/* Role & Location */}
          <p className="text-lg sm:text-xl text-neutral-600 dark:text-neutral-400 text-center mb-4">
            {translations.role}
          </p>

          {/* Tagline */}
          <p className="text-base sm:text-lg text-neutral-500 dark:text-neutral-500 text-center max-w-xl mb-10 sm:mb-12 px-4">
            {translations.tagline}
          </p>

          {/* Social Links */}
          <SocialLinks />
        </div>
      </main>
    </ThemeProvider>
  );
}
