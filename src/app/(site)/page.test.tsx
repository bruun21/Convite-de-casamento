import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { HomeContent } from "./home-content";

describe("Home content", () => {
  it("renders the couple names as the main heading", () => {
    render(<HomeContent />);

    expect(
      screen.getByRole("heading", {
        level: 1,
        name: "Adriele & João Paulo",
      })
    ).toBeInTheDocument();
  });

  it("renders a machine-readable wedding date", () => {
    const { container } = render(<HomeContent />);

    expect(container.querySelector("time[datetime]")).toHaveAttribute(
      "datetime",
      "2026-06-26T20:00:00-04:00"
    );
  });

  it("labels the ceremony location with a heading", () => {
    render(<HomeContent />);

    expect(
      screen.getByRole("heading", {
        level: 2,
        name: "Paróquia Nossa Senhora Mãe dos Homens",
      })
    ).toBeInTheDocument();
  });
});
