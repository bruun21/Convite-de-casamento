import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { RsvpForm } from "./rsvp-form";

describe("RSVP form", () => {
  it("renders one labelled choice group for each guest", () => {
    render(
      <RsvpForm
        guests={[
          { id: "1", name: "Pessoa Um", attendance: null, receptionAttendance: null },
          { id: "2", name: "Pessoa Dois", attendance: "attending", receptionAttendance: null },
        ]}
        token={"a".repeat(32)}
      />
    );

    expect(screen.getByRole("group", { name: "Pessoa Um" })).toBeInTheDocument();
    expect(screen.getByRole("group", { name: "Pessoa Dois" })).toBeInTheDocument();
    // 2 guests × 2 options + 2 companion options = 6 radios
    expect(screen.getAllByRole("radio")).toHaveLength(6);
    expect(screen.getByText(/Além das pessoas listadas/)).toBeInTheDocument();
  });
});
