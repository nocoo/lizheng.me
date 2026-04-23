import { act, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { TerminalPrompt } from "../terminal-prompt";

describe("TerminalPrompt", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("renders nothing when inactive", () => {
    const { container } = render(
      <TerminalPrompt active={false} command="whoami" output={<p>out</p>} />,
    );
    expect(container.firstChild).toBeNull();
  });

  it("renders command and output instantly when instant=true", () => {
    render(<TerminalPrompt active instant command="whoami" output={<p>zheng</p>} />);
    expect(screen.getByText("whoami")).toBeInTheDocument();
    expect(screen.getByText("zheng")).toBeInTheDocument();
  });

  it("shows output only after command is typed", async () => {
    render(<TerminalPrompt active command="ls" commandSpeed={10} output={<p>files</p>} />);

    expect(screen.queryByText("files")).not.toBeInTheDocument();

    await act(async () => {
      await vi.advanceTimersByTimeAsync(30);
    });
    expect(screen.getByText("files")).toBeInTheDocument();
  });

  it("calls onCommandDone and onOutputReady when typing completes", async () => {
    const onCommandDone = vi.fn();
    const onOutputReady = vi.fn();
    render(
      <TerminalPrompt
        active
        command="a"
        commandSpeed={10}
        onCommandDone={onCommandDone}
        onOutputReady={onOutputReady}
        output={<p>o</p>}
      />,
    );

    await act(async () => {
      await vi.advanceTimersByTimeAsync(20);
    });

    expect(onCommandDone).toHaveBeenCalled();
    expect(onOutputReady).toHaveBeenCalled();
  });

  it("delays onOutputReady by outputDelay ms", async () => {
    const onOutputReady = vi.fn();
    render(
      <TerminalPrompt
        active
        command="a"
        commandSpeed={10}
        outputDelay={100}
        onOutputReady={onOutputReady}
        output={<p>o</p>}
      />,
    );

    await act(async () => {
      await vi.advanceTimersByTimeAsync(20);
    });
    expect(onOutputReady).not.toHaveBeenCalled();

    await act(async () => {
      await vi.advanceTimersByTimeAsync(120);
    });
    expect(onOutputReady).toHaveBeenCalled();
  });

  it("renders the $ prompt marker", () => {
    render(<TerminalPrompt active instant command="whoami" output={<p>o</p>} />);
    expect(screen.getByText("$")).toBeInTheDocument();
  });
});
