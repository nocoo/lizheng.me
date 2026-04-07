import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { Header } from "../header";
import { ThemeProvider } from "../theme-provider";

// Create mock push function outside to verify it's called
const mockPush = vi.fn();

// Mock next/navigation
vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}));

describe("Header", () => {
  it("renders locale switch button", () => {
    render(
      <ThemeProvider>
        <Header locale="en" />
      </ThemeProvider>,
    );

    expect(screen.getByLabelText("Switch to 中文")).toBeInTheDocument();
  });

  it("renders theme toggle button", () => {
    render(
      <ThemeProvider>
        <Header locale="en" />
      </ThemeProvider>,
    );

    expect(screen.getByLabelText(/Switch to.*mode/)).toBeInTheDocument();
  });

  it("shows correct target locale for en -> zh", () => {
    render(
      <ThemeProvider>
        <Header locale="en" />
      </ThemeProvider>,
    );

    expect(screen.getByLabelText("Switch to 中文")).toBeInTheDocument();
  });

  it("shows correct target locale for zh -> en", () => {
    render(
      <ThemeProvider>
        <Header locale="zh" />
      </ThemeProvider>,
    );

    expect(screen.getByLabelText("Switch to English")).toBeInTheDocument();
  });

  it("toggles theme when theme button is clicked", () => {
    render(
      <ThemeProvider>
        <Header locale="en" />
      </ThemeProvider>,
    );

    const themeButton = screen.getByLabelText(/Switch to.*mode/);
    fireEvent.click(themeButton);

    // After click, should now show opposite mode option
    expect(screen.getByLabelText(/Switch to.*mode/)).toBeInTheDocument();
  });

  it("calls router.push when locale switch button is clicked", () => {
    mockPush.mockClear();
    render(
      <ThemeProvider>
        <Header locale="en" />
      </ThemeProvider>,
    );

    const localeButton = screen.getByLabelText("Switch to 中文");
    fireEvent.click(localeButton);

    expect(mockPush).toHaveBeenCalledWith("/zh");
  });
});
