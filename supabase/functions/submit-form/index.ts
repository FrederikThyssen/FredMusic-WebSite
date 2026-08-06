import { createClient } from "https://esm.sh/@supabase/supabase-js@2.112.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

type FormType = "quote" | "music";

type QuotePayload = {
  name?: string;
  email?: string;
  phone?: string;
  eventType?: string;
  eventDate?: string;
  location?: string;
  guestsCount?: number;
  message?: string;
};

type MusicPayload = {
  eventId?: string | null;
  guestName?: string;
  artist?: string;
  songTitle?: string;
  message?: string;
};

type SubmitBody =
  | { type: "quote"; payload: QuotePayload; website?: string }
  | { type: "music"; payload: MusicPayload; website?: string };

const supabaseUrl = Deno.env.get("SUPABASE_URL");
const secretKeys = Deno.env.get("SUPABASE_SECRET_KEYS");
const serviceRoleKey = secretKeys
  ? JSON.parse(secretKeys).default
  : Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
const resendApiKey = Deno.env.get("RESEND_API_KEY");
const quoteNotificationEmail = Deno.env.get("QUOTE_NOTIFICATION_EMAIL") ?? "djfredmusic@outlook.fr";
const quoteEmailFrom = Deno.env.get("QUOTE_EMAIL_FROM") ?? "FredMusic <onboarding@resend.dev>";

if (!supabaseUrl || !serviceRoleKey) {
  throw new Error("Missing Supabase Edge Function environment variables.");
}

const supabase = createClient(supabaseUrl, serviceRoleKey, {
  auth: { persistSession: false },
});

function jsonResponse(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      ...corsHeaders,
      "Content-Type": "application/json",
    },
  });
}

function clean(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function clientIp(req: Request) {
  const forwarded = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  return (
    req.headers.get("cf-connecting-ip") ||
    req.headers.get("x-real-ip") ||
    forwarded ||
    "unknown"
  );
}

function validateQuote(payload: QuotePayload) {
  const name = clean(payload.name);
  const email = clean(payload.email).toLowerCase();
  const phone = clean(payload.phone);
  const eventType = clean(payload.eventType);
  const eventDate = clean(payload.eventDate);
  const location = clean(payload.location);
  const message = clean(payload.message);
  const guestsCount = Number(payload.guestsCount);
  const allowedEventTypes = new Set(["mariage", "evenement-prive", "evenement-pro", "location", "autre"]);

  if (name.length < 2 || name.length > 100) return { error: "Nom invalide." };
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 254) return { error: "Email invalide." };
  if (phone.replace(/\D/g, "").length < 8 || phone.length > 30) return { error: "Téléphone invalide." };
  if (!allowedEventTypes.has(eventType)) return { error: "Type d'événement invalide." };
  if (location.length > 160) return { error: "Lieu invalide." };
  if (message.length > 2000) return { error: "Message trop long." };
  if (payload.guestsCount !== undefined && (!Number.isInteger(guestsCount) || guestsCount < 1 || guestsCount > 5000)) {
    return { error: "Nombre d'invités invalide." };
  }

  return {
    data: {
      name,
      email,
      phone,
      event_type: eventType,
      event_date: eventDate || null,
      location: location || null,
      guests_count: Number.isInteger(guestsCount) ? guestsCount : null,
      message: message || null,
    },
  };
}

function escapeHtml(value: string | number | null | undefined) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

async function sendQuoteEmail(quote: NonNullable<ReturnType<typeof validateQuote>["data"]>) {
  if (!resendApiKey) {
    console.warn("RESEND_API_KEY is not configured; quote notification skipped.");
    return;
  }

  const subject = `Nouvelle demande de devis FredMusic - ${quote.name}`;
  const html = `
    <h1>Nouvelle demande de devis</h1>
    <p><strong>Nom :</strong> ${escapeHtml(quote.name)}</p>
    <p><strong>Email :</strong> ${escapeHtml(quote.email)}</p>
    <p><strong>Téléphone :</strong> ${escapeHtml(quote.phone)}</p>
    <p><strong>Type d'événement :</strong> ${escapeHtml(quote.event_type)}</p>
    <p><strong>Date :</strong> ${escapeHtml(quote.event_date ?? "À préciser")}</p>
    <p><strong>Lieu :</strong> ${escapeHtml(quote.location ?? "À préciser")}</p>
    <p><strong>Invités :</strong> ${escapeHtml(quote.guests_count ?? "À préciser")}</p>
    <p><strong>Message :</strong></p>
    <p>${escapeHtml(quote.message ?? "").replaceAll("\n", "<br>")}</p>
  `;

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${resendApiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: quoteEmailFrom,
      to: quoteNotificationEmail,
      reply_to: quote.email,
      subject,
      html,
      text: [
        "Nouvelle demande de devis",
        `Nom : ${quote.name}`,
        `Email : ${quote.email}`,
        `Téléphone : ${quote.phone ?? ""}`,
        `Type d'événement : ${quote.event_type}`,
        `Date : ${quote.event_date ?? "À préciser"}`,
        `Lieu : ${quote.location ?? "À préciser"}`,
        `Invités : ${quote.guests_count ?? "À préciser"}`,
        `Message : ${quote.message ?? ""}`,
      ].join("\n"),
    }),
  });

  if (!response.ok) {
    const details = await response.text();
    throw new Error(`Resend notification failed: ${details}`);
  }
}

function validateMusic(payload: MusicPayload) {
  const guestName = clean(payload.guestName);
  const artist = clean(payload.artist);
  const songTitle = clean(payload.songTitle);
  const message = clean(payload.message);
  const eventId = clean(payload.eventId);

  if (guestName.length > 80) return { error: "Nom invité invalide." };
  if (artist.length < 1 || artist.length > 120) return { error: "Artiste invalide." };
  if (songTitle.length < 1 || songTitle.length > 160) return { error: "Titre invalide." };
  if (message.length > 500) return { error: "Message trop long." };
  if (eventId && !/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(eventId)) {
    return { error: "Événement invalide." };
  }

  return {
    data: {
      event_id: eventId || null,
      guest_name: guestName || null,
      artist,
      song_title: songTitle,
      message: message || null,
    },
  };
}

async function isRateLimited(type: FormType, ip: string) {
  const limit = type === "quote" ? 5 : 20;
  const windowMs = 60 * 60 * 1000;
  const key = `${type}:${ip}`;
  const now = new Date();

  const { data, error } = await supabase
    .from("form_rate_limits")
    .select("key, window_start, request_count")
    .eq("key", key)
    .maybeSingle();

  if (error) throw error;

  if (!data) {
    const { error: insertError } = await supabase.from("form_rate_limits").insert({
      key,
      window_start: now.toISOString(),
      request_count: 1,
      updated_at: now.toISOString(),
    });
    if (insertError) throw insertError;
    return false;
  }

  const windowStart = new Date(data.window_start);
  const expired = now.getTime() - windowStart.getTime() > windowMs;
  const nextCount = expired ? 1 : data.request_count + 1;

  const { error: updateError } = await supabase
    .from("form_rate_limits")
    .update({
      window_start: expired ? now.toISOString() : data.window_start,
      request_count: nextCount,
      updated_at: now.toISOString(),
    })
    .eq("key", key);

  if (updateError) throw updateError;
  return !expired && nextCount > limit;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  if (req.method !== "POST") return jsonResponse({ error: "Method not allowed." }, 405);

  let body: SubmitBody;
  try {
    body = await req.json();
  } catch {
    return jsonResponse({ error: "Invalid JSON." }, 400);
  }

  if (body.website && clean(body.website)) {
    return jsonResponse({ ok: true });
  }

  if (body.type !== "quote" && body.type !== "music") {
    return jsonResponse({ error: "Invalid form type." }, 400);
  }

  try {
    if (await isRateLimited(body.type, clientIp(req))) {
      return jsonResponse({ error: "Too many requests." }, 429);
    }

    if (body.type === "quote") {
      const validated = validateQuote(body.payload);
      if ("error" in validated) return jsonResponse({ error: validated.error }, 400);
      const { error } = await supabase.from("quote_requests").insert(validated.data);
      if (error) throw error;
      await sendQuoteEmail(validated.data);
      return jsonResponse({ ok: true });
    }

    const validated = validateMusic(body.payload);
    if ("error" in validated) return jsonResponse({ error: validated.error }, 400);
    const { error } = await supabase.from("music_requests").insert(validated.data);
    if (error) throw error;
    return jsonResponse({ ok: true });
  } catch (error) {
    console.error(error);
    return jsonResponse({ error: "Server error." }, 500);
  }
});
