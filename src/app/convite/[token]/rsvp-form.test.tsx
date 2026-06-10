import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { RsvpForm } from "./rsvp-form";

describe("RSVP form", () => {
  it("renders one labelled choice group for each guest", () => {
    render(
      <RsvpForm
        guests={[
          { id: "1", name: "Pessoa Um", attendance: null },
          { id: "2", name: "Pessoa Dois", attendance: "attending" },
        ]}
        token={"a".repeat(32)}
      />
    );

    expect(
      screen.getByRole("group", { name: "Pessoa Um" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("group", { name: "Pessoa Dois" })
    ).toBeInTheDocument();
    expect(screen.getAllByRole("radio")).toHaveLength(4);
  });
});
