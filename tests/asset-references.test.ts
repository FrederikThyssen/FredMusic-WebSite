import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative } from "node:path";
import { describe, expect, it } from "vitest";

const projectRoot = process.cwd();
const sourceRoot = join(projectRoot, "src");
const publicRoot = join(projectRoot, "public");
const sourceExtensions = new Set([".css", ".ts", ".tsx"]);
const publicImageReferencePattern = /\/images\/[^"'`)\]\s,]+/g;

function collectSourceFiles(directory: string): string[] {
  return readdirSync(directory).flatMap((entry) => {
    const path = join(directory, entry);
    const stats = statSync(path);

    if (stats.isDirectory()) return collectSourceFiles(path);
    if (![...sourceExtensions].some((extension) => path.endsWith(extension))) return [];

    return [path];
  });
}

describe("public asset references", () => {
  it("points every /images reference in source files to an existing public asset", () => {
    const missingAssets = collectSourceFiles(sourceRoot).flatMap((filePath) => {
      const content = readFileSync(filePath, "utf8");
      const imagePaths = [...content.matchAll(publicImageReferencePattern)].map(([match]) => match);

      return imagePaths
        .filter((imagePath) => !existsSync(join(publicRoot, imagePath)))
        .map((imagePath) => `${relative(projectRoot, filePath)} -> ${imagePath}`);
    });

    expect(missingAssets).toEqual([]);
  });
});
