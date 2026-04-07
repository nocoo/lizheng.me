import { act, fireEvent, render } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { Flashlight } from "../flashlight";
import { ThemeProvider } from "../theme-provider";

describe("Flashlight", () => {
  beforeEach(() => {
    vi.stubGlobal("matchMedia", vi.fn().mockReturnValue({
      matches: false,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    }));
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("renders hidden initially", () => {
    const { container } = render(
      <ThemeProvider>
        <Flashlight />
      </ThemeProvider>
    );
    const wrapper = container.querySelector("[aria-hidden='true']");
    expect(wrapper).toHaveStyle({ opacity: "0" });
  });

  it("becomes visible on mouse move", () => {
    const { container } = render(
      <ThemeProvider>
        <Flashlight />
      </ThemeProvider>
    );

    act(() => {
      fireEvent.mouseMove(window, { clientX: 100, clientY: 100 });
    });

    const wrapper = container.querySelector("[aria-hidden='true']");
    expect(wrapper).toHaveStyle({ opacity: "1" });
  });

  it("follows mouse position", () => {
    const { container } = render(
      <ThemeProvider>
        <Flashlight />
      </ThemeProvider>
    );

    act(() => {
      fireEvent.mouseMove(window, { clientX: 200, clientY: 150 });
    });

    const spotlight = container.querySelector(".rounded-full");
    expect(spotlight).toHaveStyle({ left: "140px", top: "90px" }); // 200-60, 150-60
  });

  it("hides when mouse leaves document", () => {
    const { container } = render(
      <ThemeProvider>
        <Flashlight />
      </ThemeProvider>
    );

    act(() => {
      fireEvent.mouseMove(window, { clientX: 100, clientY: 100 });
    });

    act(() => {
      fireEvent.mouseLeave(document);
    });

    const wrapper = container.querySelector("[aria-hidden='true']");
    expect(wrapper).toHaveStyle({ opacity: "0" });
  });
});
