import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { TerminalWindow } from "../terminal-window";

describe("TerminalWindow", () => {
  it("renders default title", () => {
    render(
      <TerminalWindow>
        <p>body</p>
      </TerminalWindow>,
    );
    expect(screen.getByText("zheng@lizheng.me ~ %")).toBeInTheDocument();
  });

  it("renders custom title", () => {
    render(
      <TerminalWindow title="custom@host %">
        <p>body</p>
      </TerminalWindow>,
    );
    expect(screen.getByText("custom@host %")).toBeInTheDocument();
  });

  it("renders children content", () => {
    render(
      <TerminalWindow>
        <p>hello world</p>
      </TerminalWindow>,
    );
    expect(screen.getByText("hello world")).toBeInTheDocument();
  });

  it("renders avatar image", () => {
    render(
      <TerminalWindow>
        <p>body</p>
      </TerminalWindow>,
    );
    expect(screen.getByAltText("Zheng Li")).toBeInTheDocument();
  });

  it("uses a semantic section with aria-label", () => {
    const { container } = render(
      <TerminalWindow>
        <p>body</p>
      </TerminalWindow>,
    );
    const section = container.querySelector("section");
    expect(section).not.toBeNull();
    expect(section).toHaveAttribute("aria-label", "terminal");
  });
});
