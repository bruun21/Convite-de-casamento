import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { HomeContent } from "./home-content";

describe("Home content", () => {
  it("renders the graduate name as the main heading", () => {
    render(<HomeContent />);

    expect(
      screen.getByRole("heading", {
        level: 1,
        name: "Suzyellen dos Santos Lavareda",
      })
    ).toBeInTheDocument();
  });

  it("renders a machine-readable event date", () => {
    const { container } = render(<HomeContent />);

    expect(container.querySelector("time[datetime]")).toHaveAttribute(
      "datetime",
      "2026-08-25T19:00:00-03:00"
    );
  });

  it("labels the venue location with a heading", () => {
    render(<HomeContent />);

    expect(
      screen.getByRole("heading", {
        level: 2,
        name: "Travessa São Francisco, 60",
      })
    ).toBeInTheDocument();
  });
});
