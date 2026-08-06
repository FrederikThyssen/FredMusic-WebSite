import { describe, expect, it } from "vitest";
import { formatDate, formatDateShort, formatDateTime } from "./formatDate";

describe("formatDate", () => {
  it("formats a full French date", () => {
    expect(formatDate("2026-09-12T10:30:00.000Z")).toContain("2026");
    expect(formatDate("2026-09-12T10:30:00.000Z")).toMatch(/septembre/i);
  });

  it("formats a short French date", () => {
    expect(formatDateShort("2026-09-12T10:30:00.000Z")).toContain("2026");
  });

  it("formats a date with time", () => {
    expect(formatDateTime("2026-09-12T10:30:00.000Z")).toMatch(/\d{2}:\d{2}/);
  });
});
