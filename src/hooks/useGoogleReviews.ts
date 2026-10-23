import { useEffect, useState } from "react";

/** Lien public vers la fiche Google, utilisé quand l'API ne renvoie pas le sien. */
export const GOOGLE_REVIEWS_FALLBACK_URL = "https://share.google/lOdpzsTJIUClxI4dz";

export type GoogleReview = {
  id: string;
  author: string;
  quote: string;
  rating: 1 | 2 | 3 | 4 | 5;
  relativeTime: string;
  authorUri?: string;
  photoUri?: string;
};

export type GoogleReviewsData = {
  reviews: GoogleReview[];
  rating: number | null;
  totalCount: number | null;
  mapsUrl: string | null;
};

type State =
  | { status: "loading" }
  | { status: "error" }
  | ({ status: "success" } & GoogleReviewsData);

// Une seule requête par chargement de page, partagée entre les composants.
let reviewsRequest: Promise<GoogleReviewsData> | null = null;

function loadReviews() {
  reviewsRequest ??= fetch("/api/reviews")
    .then((res) => {
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return res.json() as Promise<Partial<GoogleReviewsData>>;
    })
    .then((data) => ({
      reviews: data.reviews ?? [],
      rating: data.rating ?? null,
      totalCount: data.totalCount ?? null,
      mapsUrl: data.mapsUrl ?? null,
    }))
    .catch((error: unknown) => {
      reviewsRequest = null;
      throw error;
    });
  return reviewsRequest;
}

export function useGoogleReviews(): State {
  const [state, setState] = useState<State>({ status: "loading" });

  useEffect(() => {
    let cancelled = false;
    loadReviews()
      .then((data) => {
        if (!cancelled) setState({ status: "success", ...data });
      })
      .catch(() => {
        if (!cancelled) setState({ status: "error" });
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return state;
}
