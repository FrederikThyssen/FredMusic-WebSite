// Empêche la mise en pause du projet Supabase (plan gratuit : pause après
// 7 jours sans activité). Appelée une fois par jour par Vercel Cron.

type JsonResponse = {
  status(statusCode: number): JsonResponse;
  json(body: unknown): void;
  setHeader(name: string, value: string): void;
};

type JsonRequest = {
  method?: string;
  headers: Record<string, string | string[] | undefined>;
};

const KEEP_ALIVE_TIMEOUT_MS = 10_000;

export default async function handler(req: JsonRequest, res: JsonResponse) {
  res.setHeader("Cache-Control", "no-store");

  if (req.method !== "GET") {
    res.status(405).json({ error: "Method not allowed." });
    return;
  }

  // Vercel envoie "Authorization: Bearer <CRON_SECRET>" quand la variable existe.
  const cronSecret = process.env.CRON_SECRET;
  if (cronSecret && req.headers.authorization !== `Bearer ${cronSecret}`) {
    res.status(401).json({ error: "Unauthorized." });
    return;
  }

  const supabaseUrl = process.env.SUPABASE_URL ?? process.env.VITE_SUPABASE_URL;
  const supabaseKey = process.env.VITE_SUPABASE_PUBLISHABLE_KEY;
  if (!supabaseUrl || !supabaseKey) {
    res.status(503).json({ error: "Supabase not configured." });
    return;
  }

  try {
    // Vraie requête SQL via PostgREST : compte comme activité de la base.
    const response = await fetch(`${supabaseUrl}/rest/v1/active_events?select=id&limit=1`, {
      headers: { apikey: supabaseKey, Authorization: `Bearer ${supabaseKey}` },
      signal: AbortSignal.timeout(KEEP_ALIVE_TIMEOUT_MS),
    });

    if (!response.ok) {
      console.error("Supabase keep-alive failed:", response.status, await response.text());
      res.status(502).json({ ok: false, status: response.status });
      return;
    }

    res.status(200).json({ ok: true, at: new Date().toISOString() });
  } catch (error) {
    console.error("Supabase keep-alive error:", error);
    res.status(502).json({ ok: false });
  }
}
