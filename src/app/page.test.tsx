import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import Home from "./page";

describe("Home page", () => {
  it("renders the couple names as the main heading", () => {
    render(<Home />);

    expect(
      screen.getByRole("heading", {
        level: 1,
        name: "Adriele & João Paulo",
      })
    ).toBeInTheDocument();
  });

  it("renders a machine-readable wedding date", () => {
    const { container } = render(<Home />);

    expect(container.querySelector("time[datetime]")).toHaveAttribute(
      "datetime",
      "2026-06-26T20:00:00-04:00"
    );
  });

  it("labels the ceremony location with a heading", () => {
    render(<Home />);

    expect(
      screen.getByRole("heading", {
        level: 2,
        name: "Paróquia Nossa Senhora Mãe dos Homens",
      })
    ).toBeInTheDocument();
  });
});
