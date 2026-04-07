"use client";

import { Header } from "./header";
import { ParticleName } from "./particle-name";
import { SocialLinks } from "./social-links";
import { ThemeProvider } from "./theme-provider";

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
      <main className="min-h-screen bg-white dark:bg-neutral-950 text-neutral-900 dark:text-white transition-colors duration-300 bg-grid">
        <Header locale={locale} />

        <div className="flex flex-col items-center justify-center min-h-screen px-4 py-16 sm:py-24">
          {/* Avatar */}
          <div className="relative mb-8 sm:mb-10">
            <div className="w-40 h-40 sm:w-48 sm:h-48 rounded-full overflow-hidden shadow-xl">
              <img
                src="/images/profile.jpg"
                alt="Zheng Li"
                width={192}
                height={192}
                className="object-cover w-full h-full"
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
