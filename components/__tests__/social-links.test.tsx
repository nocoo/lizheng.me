import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { SocialLinks } from "../social-links";

describe("SocialLinks", () => {
  it("renders all social links", () => {
    render(<SocialLinks />);

    expect(screen.getByLabelText("Blog")).toBeInTheDocument();
    expect(screen.getByLabelText("LinkedIn")).toBeInTheDocument();
    expect(screen.getByLabelText("X (Twitter)")).toBeInTheDocument();
    expect(screen.getByLabelText("GitHub")).toBeInTheDocument();
  });

  it("all links open in new tab", () => {
    render(<SocialLinks />);

    const links = screen.getAllByRole("link");
    links.forEach((link) => {
      expect(link).toHaveAttribute("target", "_blank");
      expect(link).toHaveAttribute("rel", "noopener noreferrer");
    });
  });

  it("links have correct hrefs", () => {
    render(<SocialLinks />);

    expect(screen.getByLabelText("Blog")).toHaveAttribute("href", "https://lizheng.blog");
    expect(screen.getByLabelText("LinkedIn")).toHaveAttribute(
      "href",
      "https://www.linkedin.com/in/nocoo/",
    );
    expect(screen.getByLabelText("X (Twitter)")).toHaveAttribute("href", "https://x.com/zhengli");
    expect(screen.getByLabelText("GitHub")).toHaveAttribute("href", "https://github.com/nocoo");
  });

  it("applies custom className", () => {
    const { container } = render(<SocialLinks className="custom-class" />);
    expect(container.firstChild).toHaveClass("custom-class");
  });
});
