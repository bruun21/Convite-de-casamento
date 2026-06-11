import { describe, expect, it } from "vitest";

import {
  isNamedAddressee,
  personalizeClosing,
  personalizeInvitation,
  resolveAddressee,
} from "./personalize";

describe("personalize", () => {
  it("falls back to você when there is no display name", () => {
    expect(resolveAddressee()).toBe("você");
    expect(resolveAddressee("   ")).toBe("você");
    expect(isNamedAddressee("você")).toBe(false);
  });

  it("uses the guest name when available", () => {
    expect(resolveAddressee("Adriele")).toBe("Adriele");
    expect(isNamedAddressee("Adriele")).toBe(true);
    expect(personalizeInvitation("Adriele")).toContain("Adriele, convidamos você");
    expect(personalizeClosing("Adriele")).toBe("Esperamos por Adriele!");
  });

  it("keeps anonymous copy with você", () => {
    expect(personalizeInvitation("você")).toBe(
      "Convidamos você para testemunhar o momento em que nossas vidas se tornam uma só jornada."
    );
    expect(personalizeClosing("você")).toBe("Esperamos por você!");
  });
});
