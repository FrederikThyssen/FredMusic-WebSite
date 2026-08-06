import { describe, expect, it } from "vitest";
import { slugify } from "./slugify";

describe("slugify", () => {
  it("normalizes accents, spaces and punctuation", () => {
    expect(slugify("Événement privé à Arras !")).toBe("evenement-prive-a-arras");
  });

  it("trims duplicate separators", () => {
    expect(slugify("  DJ --- Mariage  ")).toBe("dj-mariage");
  });
});
