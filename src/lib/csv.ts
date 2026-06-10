export function escapeCsvCell(input: unknown): string {
  let value = input === null || input === undefined ? "" : String(input);

  if (/^[=+\-@]/.test(value)) {
    value = `'${value}`;
  }

  if (/[",\r\n]/.test(value)) {
    value = `"${value.replaceAll('"', '""')}"`;
  }

  return value;
}

export function buildCsv(rows: unknown[][]) {
  return `\uFEFF${rows
    .map((row) => row.map(escapeCsvCell).join(","))
    .join("\r\n")}`;
}
