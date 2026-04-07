import { act, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { BlogArrow } from "../blog-arrow";

// Store original values
const originalOntouchstart = Object.getOwnPropertyDescriptor(window, "ontouchstart");
const originalMaxTouchPoints = Object.getOwnPropertyDescriptor(navigator, "maxTouchPoints");

describe("BlogArrow", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    // Mock non-touch device by default
    delete (window as unknown as Record<string, unknown>).ontouchstart;
    Object.defineProperty(navigator, "maxTouchPoints", {
      value: 0,
      writable: true,
      configurable: true,
    });
  });

  afterEach(() => {
    vi.useRealTimers();
    // Restore original values
    if (originalOntouchstart) {
      Object.defineProperty(window, "ontouchstart", originalOntouchstart);
    }
    if (originalMaxTouchPoints) {
      Object.defineProperty(navigator, "maxTouchPoints", originalMaxTouchPoints);
    }
  });

  it("renders hidden initially on non-touch device", async () => {
    const { container } = render(<BlogArrow />);

    // Wait for initial render and touch detection useEffect
    await act(async () => {
      vi.advanceTimersByTime(100);
    });

    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper).toHaveClass("opacity-0");
  });

  it("becomes visible after delay", async () => {
    const { container } = render(<BlogArrow />);

    await act(async () => {
      vi.advanceTimersByTime(800);
    });

    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper).toHaveClass("opacity-100");
  });

  it("renders blog text", async () => {
    render(<BlogArrow />);

    await act(async () => {
      vi.advanceTimersByTime(100);
    });

    expect(screen.getByText("blog")).toBeInTheDocument();
  });

  it("is aria-hidden for accessibility", async () => {
    const { container } = render(<BlogArrow />);

    await act(async () => {
      vi.advanceTimersByTime(100);
    });

    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper).toHaveAttribute("aria-hidden", "true");
  });

  it("cleans up timer on unmount", async () => {
    const { unmount } = render(<BlogArrow />);
    unmount();
    // If cleanup didn't work, advancing timers would cause an error
    await act(async () => {
      vi.advanceTimersByTime(1000);
    });
    // No error means cleanup worked
  });

  it("returns null on touch devices", async () => {
    // Mock touch device
    Object.defineProperty(window, "ontouchstart", {
      value: () => {},
      writable: true,
      configurable: true,
    });

    const { container } = render(<BlogArrow />);

    await act(async () => {
      vi.advanceTimersByTime(100);
    });

    expect(container.firstChild).toBeNull();
  });
});
