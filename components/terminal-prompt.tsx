"use client";

import { type ReactNode, useEffect, useState } from "react";
import { TypingEffect } from "./typing-effect";

interface TerminalPromptProps {
  command: string;
  output: ReactNode;
  active: boolean;
  instant?: boolean;
  commandSpeed?: number;
  onCommandDone?: () => void;
  onOutputReady?: () => void;
  outputDelay?: number;
}

export function TerminalPrompt({
  command,
  output,
  active,
  instant = false,
  commandSpeed = 50,
  onCommandDone,
  onOutputReady,
  outputDelay = 0,
}: TerminalPromptProps) {
  const [commandDone, setCommandDone] = useState(instant);

  useEffect(() => {
    if (active && !instant) {
      setCommandDone(false);
    }
  }, [active, instant]);

  if (!active) {
    return null;
  }

  return (
    <div className="mb-4">
      <div className="flex flex-wrap text-[14px] sm:text-[15px]">
        <span className="text-green-500 dark:text-green-400 font-semibold select-none mr-2">$</span>
        <TypingEffect
          text={command}
          speed={commandSpeed}
          instant={instant}
          className="font-semibold text-neutral-900 dark:text-neutral-100"
          onDone={() => {
            setCommandDone(true);
            onCommandDone?.();
            if (outputDelay === 0) onOutputReady?.();
            else
              setTimeout(() => {
                onOutputReady?.();
              }, outputDelay);
          }}
        />
      </div>
      {commandDone && <div className="mt-2">{output}</div>}
    </div>
  );
}
