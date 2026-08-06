import { beforeEach, describe, expect, it } from "vitest";
import { applySeo } from "./seo";

describe("applySeo", () => {
  beforeEach(() => {
    document.head.innerHTML = "";
  });

  it("updates title, meta tags, canonical and structured data", () => {
    applySeo({
      title: "FredMusic Test",
      description: "Description test",
      canonical: "https://www.fredmusic.fr/test",
      ogImage: "https://www.fredmusic.fr/image.jpg",
      keywords: ["DJ", "mariage"],
      structuredData: {
        "@context": "https://schema.org",
        "@type": "WebSite",
        name: "FredMusic",
      },
    });

    expect(document.title).toBe("FredMusic Test");
    expect(document.querySelector("meta[name='description']")).toHaveAttribute("content", "Description test");
    expect(document.querySelector("link[rel='canonical']")).toHaveAttribute("href", "https://www.fredmusic.fr/test");
    expect(document.querySelector("meta[property='og:image']")).toHaveAttribute("content", "https://www.fredmusic.fr/image.jpg");
    expect(document.querySelector("meta[name='keywords']")).toHaveAttribute("content", "DJ, mariage");
    expect(document.querySelectorAll("script[data-seo-structured='true']")).toHaveLength(1);
  });
});
