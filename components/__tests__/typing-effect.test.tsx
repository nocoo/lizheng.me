import { act, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { TypingEffect } from "../typing-effect";

describe("TypingEffect", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("renders full text instantly when instant=true", () => {
    const onDone = vi.fn();
    render(<TypingEffect text="hello" instant onDone={onDone} />);
    expect(screen.getByText("hello")).toBeInTheDocument();
    expect(onDone).toHaveBeenCalledTimes(1);
  });

  it("types characters over time", async () => {
    const onDone = vi.fn();
    render(<TypingEffect text="abc" speed={10} onDone={onDone} />);

    await act(async () => {
      await vi.advanceTimersByTimeAsync(10);
    });
    expect(screen.getByText("a")).toBeInTheDocument();

    await act(async () => {
      await vi.advanceTimersByTimeAsync(10);
    });
    expect(screen.getByText("ab")).toBeInTheDocument();

    await act(async () => {
      await vi.advanceTimersByTimeAsync(10);
    });
    expect(screen.getByText("abc")).toBeInTheDocument();
    expect(onDone).toHaveBeenCalledTimes(1);
  });

  it("respects startDelay before typing starts", async () => {
    render(<TypingEffect text="xy" speed={10} startDelay={50} />);

    await act(async () => {
      await vi.advanceTimersByTimeAsync(40);
    });
    expect(screen.queryByText("x")).not.toBeInTheDocument();

    await act(async () => {
      await vi.advanceTimersByTimeAsync(20);
    });
    expect(screen.getByText("x")).toBeInTheDocument();
  });

  it("shows cursor until done when showCursor=true", async () => {
    const { container } = render(<TypingEffect text="ab" speed={10} showCursor />);

    await act(async () => {
      await vi.advanceTimersByTimeAsync(10);
    });
    expect(container.querySelector(".terminal-cursor")).not.toBeNull();

    await act(async () => {
      await vi.advanceTimersByTimeAsync(10);
    });
    expect(container.querySelector(".terminal-cursor")).toBeNull();
  });

  it("cleans up timers on unmount", async () => {
    const onDone = vi.fn();
    const { unmount } = render(<TypingEffect text="abcd" speed={10} onDone={onDone} />);
    unmount();
    await act(async () => {
      await vi.advanceTimersByTimeAsync(200);
    });
    expect(onDone).not.toHaveBeenCalled();
  });

  it("applies className to the wrapper span", () => {
    const { container } = render(<TypingEffect text="hi" instant className="my-class" />);
    const span = container.querySelector("span.my-class");
    expect(span).not.toBeNull();
  });
});
