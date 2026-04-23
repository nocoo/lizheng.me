"use client";

import { useEffect, useState } from "react";

interface TypingEffectProps {
  text: string;
  speed?: number;
  startDelay?: number;
  onDone?: () => void;
  instant?: boolean;
  className?: string;
  showCursor?: boolean;
}

export function TypingEffect({
  text,
  speed = 50,
  startDelay = 0,
  onDone,
  instant = false,
  className,
  showCursor = false,
}: TypingEffectProps) {
  const [displayed, setDisplayed] = useState(instant ? text : "");
  const [done, setDone] = useState(instant);

  useEffect(() => {
    if (instant) {
      setDisplayed(text);
      setDone(true);
      onDone?.();
      return;
    }

    setDisplayed("");
    setDone(false);

    let cancelled = false;
    let index = 0;
    let intervalId: ReturnType<typeof setInterval> | undefined;

    const startTimeout = setTimeout(() => {
      if (cancelled) return;
      intervalId = setInterval(() => {
        index += 1;
        if (cancelled) return;
        setDisplayed(text.slice(0, index));
        if (index >= text.length) {
          if (intervalId) clearInterval(intervalId);
          setDone(true);
          onDone?.();
        }
      }, speed);
    }, startDelay);

    return () => {
      cancelled = true;
      clearTimeout(startTimeout);
      if (intervalId) clearInterval(intervalId);
    };
  }, [text, speed, startDelay, onDone, instant]);

  return (
    <span className={className}>
      {displayed}
      {showCursor && !done && <span className="terminal-cursor" aria-hidden="true" />}
    </span>
  );
}
