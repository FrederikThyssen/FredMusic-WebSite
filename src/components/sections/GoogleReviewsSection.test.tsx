import { render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

// Le hook met la requête en cache au niveau du module : on le recharge à chaque test.
async function renderSection() {
  const { GoogleReviewsSection } = await import("./GoogleReviewsSection");
  return render(<GoogleReviewsSection />);
}

describe("GoogleReviewsSection", () => {
  beforeEach(() => {
    vi.resetModules();
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("renders real Google reviews with the overall rating", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: true,
        json: async () => ({
          reviews: [
            { id: "r1", author: "Julie D.", quote: "DJ génial pour notre mariage !", rating: 5, relativeTime: "il y a 2 mois" },
          ],
          rating: 4.9,
          totalCount: 37,
          mapsUrl: "https://maps.google.com/?cid=123",
        }),
      }),
    );

    await renderSection();

    expect(await screen.findByText("Julie D.")).toBeInTheDocument();
    expect(screen.getByText(/sur 37 avis Google/i)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /voir tous les avis sur google/i })).toHaveAttribute(
      "href",
      "https://maps.google.com/?cid=123",
    );
  });

  it("falls back to a link to the Google profile when the API fails", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({ ok: false, status: 502 }));

    await renderSection();

    const link = await screen.findByRole("link", { name: /lire les avis de nos clients sur google/i });
    expect(link).toHaveAttribute("href", "https://share.google/lOdpzsTJIUClxI4dz");
    expect(screen.queryByRole("blockquote")).not.toBeInTheDocument();
  });
});
