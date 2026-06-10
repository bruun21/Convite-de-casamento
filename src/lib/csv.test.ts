import { describe, expect, it } from "vitest";

import { buildCsv, escapeCsvCell } from "./csv";

describe("CSV helpers", () => {
  it("escapes quotes, separators and line breaks", () => {
    expect(escapeCsvCell('Nome, "Teste"\nLinha')).toBe(
      '"Nome, ""Teste""\nLinha"'
    );
  });

  it.each(["=SUM(A1:A2)", "+1", "-1", "@user"])(
    "protects formula-like value %s",
    (value) => {
      expect(escapeCsvCell(value)).toBe(`'${value}`);
    }
  );

  it("adds a UTF-8 BOM and CRLF rows", () => {
    expect(buildCsv([["Nome"], ["João"]])).toBe("\uFEFFNome\r\nJoão");
  });
});
