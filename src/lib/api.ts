import { supabase } from "./supabase";
import type { MusicRequestStatus, QuoteRequestStatus } from "./database.types";

const FORM_SUBMIT_TIMEOUT_MS = 12_000;

type SubmitFormResult = Awaited<ReturnType<typeof supabase.functions.invoke>>;

async function invokeSubmitForm(body: Record<string, unknown>): Promise<SubmitFormResult> {
  try {
    return await supabase.functions.invoke("submit-form", {
      body,
      timeout: FORM_SUBMIT_TIMEOUT_MS,
    });
  } catch (error) {
    return {
      data: null,
      error: error instanceof Error ? error : new Error("Form submission failed."),
    };
  }
}

// ── Quote Requests ───────────────────────────────────────────

export type NewQuoteRequest = {
  name: string;
  email: string;
  phone?: string;
  eventType: string;
  eventDate?: string;
  location?: string;
  guestsCount?: number;
  message?: string;
};

export async function insertQuoteRequest(data: NewQuoteRequest) {
  return invokeSubmitForm({
    type: "quote",
    payload: data,
  });
}

export async function fetchQuoteRequests() {
  return supabase
    .from("quote_requests")
    .select("*")
    .order("created_at", { ascending: false });
}

export async function updateQuoteStatus(id: string, status: QuoteRequestStatus) {
  return supabase.from("quote_requests").update({ status }).eq("id", id);
}

/**
 * Supprime un ou plusieurs devis. Renvoie les identifiants réellement supprimés :
 * si les règles de sécurité refusent une ligne, Supabase ne renvoie pas d'erreur
 * mais l'identifiant manque dans la réponse.
 */
export async function deleteQuoteRequests(ids: string[]) {
  return supabase.from("quote_requests").delete().in("id", ids).select("id");
}

// ── Music Requests ───────────────────────────────────────────

export type NewMusicRequest = {
  eventId?: string | null;
  guestName?: string;
  artist: string;
  songTitle: string;
  message?: string;
};

export async function insertMusicRequest(data: NewMusicRequest) {
  return invokeSubmitForm({
    type: "music",
    payload: data,
  });
}

export async function fetchMusicRequests() {
  return supabase
    .from("music_requests")
    .select("*")
    .order("created_at", { ascending: false });
}

export async function updateMusicStatus(id: string, status: MusicRequestStatus) {
  return supabase.from("music_requests").update({ status }).eq("id", id);
}

// ── Active Events ────────────────────────────────────────────

export async function fetchActiveEvent() {
  return supabase
    .from("active_events")
    .select("id, name")
    .eq("is_active", true)
    .maybeSingle();
}

export async function fetchAllEvents() {
  return supabase
    .from("active_events")
    .select("*")
    .order("created_at", { ascending: false });
}

export async function createEvent(name: string) {
  return supabase.from("active_events").insert({ name, is_active: false });
}

export async function activateEvent(id: string) {
  return supabase.rpc("activate_event", { p_event_id: id });
}

export async function archiveEvent(id: string) {
  return supabase
    .from("active_events")
    .update({ is_active: false, archived_at: new Date().toISOString() })
    .eq("id", id);
}
