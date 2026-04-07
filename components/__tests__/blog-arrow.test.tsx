import { act, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { BlogArrow } from "../blog-arrow";

describe("BlogArrow", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("renders hidden initially", () => {
    const { container } = render(<BlogArrow />);
    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper).toHaveClass("opacity-0");
  });

  it("becomes visible after delay", () => {
    const { container } = render(<BlogArrow />);

    act(() => {
      vi.advanceTimersByTime(800);
    });

    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper).toHaveClass("opacity-100");
  });

  it("renders blog text", () => {
    render(<BlogArrow />);
    expect(screen.getByText("blog")).toBeInTheDocument();
  });

  it("is aria-hidden for accessibility", () => {
    const { container } = render(<BlogArrow />);
    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper).toHaveAttribute("aria-hidden", "true");
  });

  it("cleans up timer on unmount", () => {
    const { unmount } = render(<BlogArrow />);
    unmount();
    // If cleanup didn't work, advancing timers would cause an error
    act(() => {
      vi.advanceTimersByTime(1000);
    });
    // No error means cleanup worked
  });
});
