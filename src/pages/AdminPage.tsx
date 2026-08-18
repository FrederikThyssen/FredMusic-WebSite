import { useCallback, useEffect, useState } from "react";
import { CalendarDays, Check, Disc3, Inbox, Mail, MapPin, Music2, Phone, Plus, Power, PowerOff, UserRound, X, Download } from "lucide-react";
import {
  activateEvent,
  archiveEvent,
  createEvent,
  fetchAllEvents,
  fetchMusicRequests,
  fetchQuoteRequests,
  updateMusicStatus,
  updateQuoteStatus,
} from "../lib/api";
import { supabase } from "../lib/supabase";
import type { MusicRequestStatus, QuoteRequestStatus } from "../lib/database.types";
import { Badge } from "../components/ui/Badge";
import { Button } from "../components/ui/Button";
import { formatDateShort, formatDateTime } from "../utils/formatDate";

const quoteStatusLabels: Record<QuoteRequestStatus, string> = {
  pending: "Nouvelle",
  accepted: "Traitée",
  refused: "Refusée",
};

const musicStatusLabels: Record<MusicRequestStatus, string> = {
  pending: "En attente",
  accepted: "Acceptée",
  played: "Jouée",
  refused: "Refusée",
};

const statusClasses = {
  pending: "border-gold-300/30 bg-gold-300/[0.08] text-gold-200",
  accepted: "border-emerald-300/25 bg-emerald-300/[0.08] text-emerald-200",
  played: "border-sky-300/25 bg-sky-300/[0.08] text-sky-200",
  refused: "border-red-300/25 bg-red-300/[0.08] text-red-200",
} satisfies Record<MusicRequestStatus, string>;

type QuoteRow = {
  id: string; name: string; email: string; phone: string | null;
  event_type: string; event_date: string | null; location: string | null;
  guests_count: number | null; message: string | null;
  status: QuoteRequestStatus; created_at: string;
};

type MusicRow = {
  id: string; event_id: string | null; guest_name: string | null;
  artist: string; song_title: string; message: string | null;
  status: MusicRequestStatus; created_at: string;
};

type EventRow = {
  id: string; name: string; is_active: boolean;
  created_at: string; archived_at: string | null;
};

type AdminAction =
  | `quote:${string}:${QuoteRequestStatus}`
  | `music:${string}:${MusicRequestStatus}`
  | `event:activate:${string}`
  | `event:archive:${string}`
  | "event:create"
  | "signout";

export function AdminPage() {
  const [quotes, setQuotes] = useState<QuoteRow[]>([]);
  const [music, setMusic] = useState<MusicRow[]>([]);
  const [events, setEvents] = useState<EventRow[]>([]);
  const [newEventName, setNewEventName] = useState("");
  const [loading, setLoading] = useState(true);
  const [qrGenerating, setQrGenerating] = useState(false);
  const [qrError, setQrError] = useState<string | null>(null);
  const [actionError, setActionError] = useState<string | null>(null);
  const [actionInFlight, setActionInFlight] = useState<AdminAction | null>(null);

  const loadData = useCallback(async () => {
    const [q, m, e] = await Promise.all([
      fetchQuoteRequests(),
      fetchMusicRequests(),
      fetchAllEvents(),
    ]);
    setQuotes((q.data as QuoteRow[]) ?? []);
    setMusic((m.data as MusicRow[]) ?? []);
    setEvents((e.data as EventRow[]) ?? []);
    setLoading(false);
  }, []);

  useEffect(() => { loadData(); }, [loadData]);

  async function handleQuoteStatus(id: string, status: QuoteRequestStatus) {
    const action: AdminAction = `quote:${id}:${status}`;
    if (actionInFlight) return;
    setActionInFlight(action);
    setActionError(null);
    try {
      const { error } = await updateQuoteStatus(id, status);
      if (error) {
        setActionError("Impossible de modifier le statut du devis.");
        return;
      }
      setQuotes((prev) => prev.map((q) => q.id === id ? { ...q, status } : q));
    } finally {
      setActionInFlight(null);
    }
  }

  async function handleMusicStatus(id: string, status: MusicRequestStatus) {
    const action: AdminAction = `music:${id}:${status}`;
    if (actionInFlight) return;
    setActionInFlight(action);
    setActionError(null);
    try {
      const { error } = await updateMusicStatus(id, status);
      if (error) {
        setActionError("Impossible de modifier le statut de la demande musique.");
        return;
      }
      setMusic((prev) => prev.map((m) => m.id === id ? { ...m, status } : m));
    } finally {
      setActionInFlight(null);
    }
  }

  async function handleActivateEvent(id: string) {
    const action: AdminAction = `event:activate:${id}`;
    if (actionInFlight) return;
    setActionInFlight(action);
    setActionError(null);
    try {
      const { error } = await activateEvent(id);
      if (error) {
        setActionError("Impossible d'activer cette soirée.");
        return;
      }
      setEvents((prev) => prev.map((e) => ({ ...e, is_active: e.id === id })));
    } finally {
      setActionInFlight(null);
    }
  }

  async function handleArchiveEvent(id: string) {
    if (actionInFlight) return;
    const event = events.find((item) => item.id === id);
    const eventName = event?.name ?? "cette soirée";
    if (!window.confirm(`Archiver "${eventName}" ? Les nouvelles demandes musique ne seront plus liées à cette soirée.`)) {
      return;
    }

    const action: AdminAction = `event:archive:${id}`;
    setActionInFlight(action);
    setActionError(null);
    try {
      const { error } = await archiveEvent(id);
      if (error) {
        setActionError("Impossible d'archiver cette soirée.");
        return;
      }
      setEvents((prev) => prev.map((e) => e.id === id ? { ...e, is_active: false, archived_at: new Date().toISOString() } : e));
    } finally {
      setActionInFlight(null);
    }
  }

  async function handleCreateEvent() {
    if (actionInFlight) return;
    const name = newEventName.trim();
    if (!name) return;
    if (name.length > 160) {
      setActionError("Le nom de la soirée ne peut pas dépasser 160 caractères.");
      return;
    }
    setActionInFlight("event:create");
    setActionError(null);
    try {
      const { error } = await createEvent(name);
      if (error) {
        setActionError("Impossible de créer cette soirée.");
        return;
      }
      setNewEventName("");
      await loadData();
    } finally {
      setActionInFlight(null);
    }
  }

  async function handleSignOut() {
    if (actionInFlight) return;
    setActionInFlight("signout");
    await supabase.auth.signOut();
    window.location.reload();
  }

  async function handleDownloadQR(useEvent: boolean) {
    setQrError(null);
    setQrGenerating(true);
    try {
      const mod = await import('qrcode');
      const QRCode = mod.default ?? mod;
      const base = `${window.location.origin}/demande-musique`;
      const url = useEvent && activeEvent ? `${base}?event=${activeEvent.id}` : base;
      const dataUrl = await QRCode.toDataURL(url, { margin: 1, scale: 8 });
      const a = document.createElement('a');
      const fileName = useEvent && activeEvent ? `fredmusic-qr-${activeEvent.id.slice(0,8)}.png` : `fredmusic-qr.png`;
      a.href = dataUrl;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      a.remove();
    } catch (err) {
      console.error(err);
      setQrError('Erreur lors de la génération du QR.');
    } finally {
      setQrGenerating(false);
    }
  }

  const pendingQuotes = quotes.filter((q) => q.status === "pending").length;
  const pendingMusic = music.filter((m) => m.status === "pending").length;
  const activeEvent = events.find((e) => e.is_active);
  const hasActionInFlight = actionInFlight !== null;

  if (loading) {
    return (
      <div className="grid min-h-[60vh] place-items-center bg-night-950">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-gold-300/30 border-t-gold-300" />
      </div>
    );
  }

  return (
    <div className="bg-night-950 text-ivory">
      <section className="px-4 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <Badge>Admin</Badge>
          {actionError ? (
            <p role="alert" className="mt-4 rounded-md border border-red-300/25 bg-red-300/[0.08] px-4 py-3 text-sm text-red-200">
              {actionError}
            </p>
          ) : null}
          <div className="mt-5 grid gap-6 lg:grid-cols-[1fr_0.58fr] lg:items-end">
            <div>
              <h1 className="font-display text-4xl leading-tight text-ivory sm:text-5xl xl:text-6xl">
                Tableau de bord Fredmusic
              </h1>
              <p className="mt-5 max-w-2xl leading-7 text-ivory/70">
                Suivez les demandes de devis, gérez la playlist de la soirée et activez les événements.
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
              <Button
                size="sm"
                variant="ghost"
                className="sm:col-span-2 lg:col-span-1 xl:col-span-2"
                onClick={handleSignOut}
                disabled={hasActionInFlight}
              >
                {actionInFlight === "signout" ? "Déconnexion…" : "Déconnexion"}
              </Button>
              <div className="rounded-md border border-white/[0.07] bg-night-900 p-5">
                <p className="text-xs font-semibold uppercase text-ivory/48">Nouveaux devis</p>
                <p className="mt-2 font-display text-4xl text-gold-300">{pendingQuotes}</p>
              </div>
              <div className="rounded-md border border-white/[0.07] bg-night-900 p-5">
                <p className="text-xs font-semibold uppercase text-ivory/48">Musiques à valider</p>
                <p className="mt-2 font-display text-4xl text-gold-300">{pendingMusic}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 pb-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl rounded-lg border border-white/[0.08] bg-night-900 p-4 sm:p-6">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase text-gold-300">Gestion soirée QR code</p>
              <h2 className="mt-2 font-display text-3xl text-ivory">Soirée active</h2>
            </div>
            <Power className="h-7 w-7 text-gold-300" aria-hidden="true" />
          </div>

          {activeEvent ? (
            <div className="mt-4 flex items-center gap-3 rounded-md border border-emerald-300/25 bg-emerald-300/[0.08] px-4 py-3">
              <span className="h-2 w-2 rounded-full bg-emerald-400" />
              <span className="font-semibold text-emerald-200">{activeEvent.name}</span>
              <Button
                size="sm"
                variant="ghost"
                icon={<PowerOff className="h-4 w-4" />}
                className="ml-auto"
                onClick={() => handleArchiveEvent(activeEvent.id)}
                disabled={hasActionInFlight}
              >
                {actionInFlight === `event:archive:${activeEvent.id}` ? "Archivage…" : "Archiver"}
              </Button>
            </div>
          ) : (
            <p className="mt-4 text-sm text-ivory/48">Aucune soirée active. Les demandes musique ne seront pas liées à un événement.</p>
          )}

          <div className="mt-4 flex gap-3">
            <Button
              size="sm"
              variant="secondary"
              icon={<Download className="h-4 w-4" />}
              onClick={() => handleDownloadQR(false)}
              disabled={qrGenerating}
            >
              {qrGenerating ? "Génération…" : "Télécharger QR"}
            </Button>

            <Button
              size="sm"
              variant="ghost"
              icon={<Download className="h-4 w-4" />}
              onClick={() => handleDownloadQR(true)}
              disabled={!activeEvent || qrGenerating}
            >
              {qrGenerating ? "Génération…" : "Télécharger QR (soirée)"}
            </Button>
          </div>

          {qrError ? <p role="alert" className="mt-2 text-sm text-red-300">{qrError}</p> : null}

          <div className="mt-4 flex gap-3">
            <input
              type="text"
              placeholder="Nom de la soirée (ex. Mariage Claire & Thomas)"
              value={newEventName}
              onChange={(e) => setNewEventName(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleCreateEvent()}
              disabled={hasActionInFlight}
              maxLength={160}
              className="min-h-10 flex-1 rounded-sm border border-white/[0.08] bg-white/5 px-3 text-sm text-ivory placeholder:text-ivory/30 focus:border-gold-300 focus:outline-none"
            />
            <Button
              size="sm"
              variant="secondary"
              icon={<Plus className="h-4 w-4" />}
              onClick={handleCreateEvent}
              disabled={hasActionInFlight || !newEventName.trim()}
            >
              {actionInFlight === "event:create" ? "Création…" : "Créer"}
            </Button>
          </div>

          {events.filter((e) => !e.is_active).length > 0 ? (
            <div className="mt-4 grid gap-2">
              {events.filter((e) => !e.is_active).map((e) => (
                <div key={e.id} className="flex items-center gap-3 rounded-sm border border-white/[0.07] bg-night-950/50 px-4 py-2 text-sm">
                  <span className="flex-1 text-ivory/68">{e.name}</span>
                  {e.archived_at ? (
                    <span className="text-xs text-ivory/32">Archivée</span>
                  ) : (
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleActivateEvent(e.id)}
                      disabled={hasActionInFlight}
                    >
                      {actionInFlight === `event:activate:${e.id}` ? "Activation…" : "Activer"}
                    </Button>
                  )}
                </div>
              ))}
            </div>
          ) : null}
        </div>
      </section>

      <section className="px-4 pb-16 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-8 xl:grid-cols-[1.05fr_0.95fr]">
          <section className="rounded-lg border border-white/[0.08] bg-night-900 p-4 sm:p-6">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase text-gold-300">Demandes de devis</p>
                <h2 className="mt-2 font-display text-3xl text-ivory">Contacts entrants</h2>
              </div>
              <Inbox className="h-7 w-7 text-gold-300" aria-hidden="true" />
            </div>

            <div className="mt-6 grid gap-4">
              {quotes.length === 0 ? (
                <p className="text-sm text-ivory/42">Aucune demande pour l'instant.</p>
              ) : quotes.map((request) => (
                <article key={request.id} className="rounded-md border border-white/[0.07] bg-night-950 p-4">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-3">
                        <h3 className="min-w-0 break-words font-display text-2xl text-ivory">{request.name}</h3>
                        <span className={`rounded-full border px-3 py-1 text-xs font-semibold ${statusClasses[request.status]}`}>
                          {quoteStatusLabels[request.status]}
                        </span>
                      </div>
                      <p className="mt-2 text-sm text-gold-300">{request.event_type}</p>
                    </div>
                    <p className="text-sm text-ivory/48">{formatDateTime(request.created_at)}</p>
                  </div>

                  <div className="mt-4 grid gap-3 text-sm text-ivory/68 sm:grid-cols-2">
                    <p className="flex min-w-0 items-center gap-2 break-all">
                      <Mail className="h-4 w-4 text-gold-300" aria-hidden="true" />
                      {request.email}
                    </p>
                    {request.phone ? (
                      <p className="flex items-center gap-2">
                        <Phone className="h-4 w-4 text-gold-300" aria-hidden="true" />
                        {request.phone}
                      </p>
                    ) : null}
                    <p className="flex items-center gap-2">
                      <CalendarDays className="h-4 w-4 text-gold-300" aria-hidden="true" />
                      {request.event_date ? formatDateShort(request.event_date) : "Date à préciser"}
                    </p>
                    <p className="flex min-w-0 items-center gap-2 break-words">
                      <MapPin className="h-4 w-4 text-gold-300" aria-hidden="true" />
                      {request.location}
                    </p>
                  </div>

                  {request.guests_count ? (
                    <p className="mt-3 text-sm text-ivory/58">{request.guests_count} invités environ</p>
                  ) : null}
                  {request.message ? <p className="mt-4 leading-7 text-ivory/72">{request.message}</p> : null}

                  <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                    <Button
                      size="sm"
                      variant="secondary"
                      onClick={() => handleQuoteStatus(request.id, "accepted")}
                      disabled={hasActionInFlight || request.status === "accepted"}
                    >
                      {actionInFlight === `quote:${request.id}:accepted` ? "Mise à jour…" : "Marquer traité"}
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleQuoteStatus(request.id, "refused")}
                      disabled={hasActionInFlight || request.status === "refused"}
                    >
                      {actionInFlight === `quote:${request.id}:refused` ? "Mise à jour…" : "Refuser"}
                    </Button>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section className="rounded-lg border border-white/[0.08] bg-night-900 p-4 sm:p-6">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase text-gold-300">Demandes de musique</p>
                <h2 className="mt-2 font-display text-3xl text-ivory">Playlist proposée</h2>
              </div>
              <Disc3 className="h-7 w-7 text-gold-300" aria-hidden="true" />
            </div>

            <div className="mt-6 grid gap-4">
              {music.length === 0 ? (
                <p className="text-sm text-ivory/42">Aucune demande pour l'instant.</p>
              ) : music.map((request) => (
                <article key={request.id} className="rounded-md border border-white/[0.07] bg-night-950 p-4">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <div className="flex items-start gap-3">
                        <Music2 className="mt-1 h-5 w-5 flex-none text-gold-300" aria-hidden="true" />
                        <div className="min-w-0">
                          <h3 className="break-words font-display text-2xl text-ivory">{request.song_title}</h3>
                          <p className="mt-1 break-words text-sm text-gold-300">{request.artist}</p>
                        </div>
                      </div>
                    </div>
                    <span className={`w-fit rounded-full border px-3 py-1 text-xs font-semibold ${statusClasses[request.status]}`}>
                      {musicStatusLabels[request.status]}
                    </span>
                  </div>

                  <div className="mt-4 grid gap-2 text-sm text-ivory/62">
                    <p className="flex items-center gap-2">
                      <UserRound className="h-4 w-4 text-gold-300" aria-hidden="true" />
                      {request.guest_name ?? "Invité anonyme"}
                    </p>
                    <p className="text-ivory/42">{formatDateTime(request.created_at)}</p>
                  </div>

                  {request.message ? <p className="mt-4 leading-7 text-ivory/72">{request.message}</p> : null}

                  <div className="mt-5 grid gap-3 sm:grid-cols-3">
                    <Button
                      size="sm"
                      variant="secondary"
                      icon={<Check className="h-4 w-4" />}
                      onClick={() => handleMusicStatus(request.id, "accepted")}
                      disabled={hasActionInFlight || request.status === "accepted"}
                    >
                      {actionInFlight === `music:${request.id}:accepted` ? "Mise à jour…" : "Accepter"}
                    </Button>
                    <Button
                      size="sm"
                      variant="primary"
                      onClick={() => handleMusicStatus(request.id, "played")}
                      disabled={hasActionInFlight || request.status === "played"}
                    >
                      {actionInFlight === `music:${request.id}:played` ? "Mise à jour…" : "Joué"}
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      icon={<X className="h-4 w-4" />}
                      onClick={() => handleMusicStatus(request.id, "refused")}
                      disabled={hasActionInFlight || request.status === "refused"}
                    >
                      {actionInFlight === `music:${request.id}:refused` ? "Mise à jour…" : "Refuser"}
                    </Button>
                  </div>
                </article>
              ))}
            </div>
          </section>
        </div>
      </section>
    </div>
  );
}
