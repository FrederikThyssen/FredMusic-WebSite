import { useEffect, useState } from "react";

export type GoogleReview = {
  id: string;
  author: string;
  quote: string;
  rating: 1 | 2 | 3 | 4 | 5;
  relativeTime: string;
  photoUri?: string;
};

type State =
  | { status: "loading" }
  | { status: "error" }
  | { status: "success"; reviews: GoogleReview[] };

export function useGoogleReviews(): State {
  const [state, setState] = useState<State>({ status: "loading" });

  useEffect(() => {
    fetch("/api/reviews")
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json() as Promise<{ reviews: GoogleReview[] }>;
      })
      .then((data) => setState({ status: "success", reviews: data.reviews }))
      .catch(() => setState({ status: "error" }));
  }, []);

  return state;
}
