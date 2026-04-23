"use client";

import { useCallback, useEffect, useState } from "react";
import { Header } from "./header";
import { SocialLinks } from "./social-links";
import { TerminalPrompt } from "./terminal-prompt";
import { TerminalWindow } from "./terminal-window";
import { ThemeProvider } from "./theme-provider";
import { TypingEffect } from "./typing-effect";

interface HomeClientProps {
  locale: string;
  translations: {
    role: string;
    tagline: string;
  };
}

type Step = 0 | 1 | 2 | 3 | 4;

const PAUSE_BETWEEN_PROMPTS = 400;

export function HomeClient({ locale: _locale, translations }: HomeClientProps) {
  const [step, setStep] = useState<Step>(0);
  const [instant, setInstant] = useState(false);

  useEffect(() => {
    const hasTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0;
    if (hasTouch) {
      setInstant(true);
      setStep(4);
    } else {
      setStep(1);
    }
  }, []);

  const advance = useCallback(
    (next: Step) => () => {
      if (instant) return;
      setTimeout(() => setStep(next), PAUSE_BETWEEN_PROMPTS);
    },
    [instant],
  );

  return (
    <ThemeProvider>
      <main className="min-h-screen bg-[#FAFAFA] dark:bg-[#0A0A0A] text-neutral-900 dark:text-neutral-100 transition-colors duration-300 bg-grid">
        <Header locale={_locale} />

        <div className="flex items-start sm:items-center justify-center min-h-screen px-4 py-16 sm:py-24">
          <TerminalWindow>
            <TerminalPrompt
              active={step >= 1}
              instant={instant}
              command="whoami"
              onOutputReady={advance(2)}
              output={
                <p className="text-[24px] sm:text-[28px] font-bold tracking-tight text-neutral-900 dark:text-neutral-100">
                  Zheng Li
                </p>
              }
            />

            <TerminalPrompt
              active={step >= 2}
              instant={instant}
              command="cat role.txt"
              onOutputReady={advance(3)}
              output={
                <p className="text-neutral-700 dark:text-neutral-300 text-[15px] sm:text-[16px]">
                  {translations.role}
                </p>
              }
            />

            <TerminalPrompt
              active={step >= 3}
              instant={instant}
              command="cat bio.txt"
              output={
                <p className="text-neutral-700 dark:text-neutral-300 text-[15px] sm:text-[16px] leading-[1.6]">
                  {instant ? (
                    translations.tagline
                  ) : (
                    <TypingEffect
                      text={translations.tagline}
                      speed={30}
                      showCursor
                      onDone={advance(4)}
                    />
                  )}
                </p>
              }
            />

            <TerminalPrompt
              active={step >= 4}
              instant={instant}
              command="ls links/"
              output={<SocialLinks stagger={!instant} />}
            />
          </TerminalWindow>
        </div>
      </main>
    </ThemeProvider>
  );
}
