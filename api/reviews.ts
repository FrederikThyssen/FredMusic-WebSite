type JsonResponse = {
  status(statusCode: number): JsonResponse;
  json(body: unknown): void;
  setHeader(name: string, value: string): void;
};

type JsonRequest = {
  method?: string;
};

type GoogleReview = {
  rating: number;
  text?: { text: string };
  originalText?: { text: string };
  authorAttribution: {
    displayName: string;
    photoUri?: string;
  };
  relativePublishTimeDescription: string;
};

type PlacesResponse = {
  reviews?: GoogleReview[];
};

export type NormalizedReview = {
  id: string;
  author: string;
  quote: string;
  rating: 1 | 2 | 3 | 4 | 5;
  relativeTime: string;
  photoUri?: string;
};

export default async function handler(req: JsonRequest, res: JsonResponse) {
  res.setHeader("Cache-Control", "public, s-maxage=86400, stale-while-revalidate=3600");

  if (req.method !== "GET") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  const placeId = process.env.VITE_GOOGLE_PLACE_ID;

  if (!apiKey || !placeId) {
    res.status(503).json({ error: "Google Places not configured" });
    return;
  }

  let response: Response;
  try {
    response = await fetch(`https://places.googleapis.com/v1/places/${placeId}?languageCode=fr`, {
      headers: {
        "X-Goog-Api-Key": apiKey,
        "X-Goog-FieldMask": "reviews",
      },
    });
  } catch (error) {
    console.error("Google Places fetch error:", error);
    res.status(502).json({ error: "Failed to reach Google Places API" });
    return;
  }

  if (!response.ok) {
    const text = await response.text();
    console.error("Google Places API error:", response.status, text);
    res.status(502).json({ error: "Google Places API error" });
    return;
  }

  const data = (await response.json()) as PlacesResponse;

  const reviews: NormalizedReview[] = (data.reviews ?? [])
    .filter((r) => {
      const text = r.text?.text ?? r.originalText?.text ?? "";
      return r.rating >= 4 && text.trim().length > 10;
    })
    .map((r, index) => ({
      id: `google-review-${index}`,
      author: r.authorAttribution.displayName,
      quote: (r.text?.text ?? r.originalText?.text ?? "").trim().slice(0, 500),
      rating: Math.min(5, Math.max(1, Math.round(r.rating))) as 1 | 2 | 3 | 4 | 5,
      relativeTime: r.relativePublishTimeDescription,
      photoUri: r.authorAttribution.photoUri,
    }));

  res.status(200).json({ reviews });
}
