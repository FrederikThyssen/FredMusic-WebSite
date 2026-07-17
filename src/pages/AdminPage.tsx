import { CalendarDays, Check, Disc3, Inbox, Mail, MapPin, Music2, Phone, UserRound, X } from "lucide-react";
import { Badge } from "../components/ui/Badge";
import { Button } from "../components/ui/Button";
import { useAppStore } from "../store/useAppStore";
import type { MusicRequestStatus, QuoteRequestStatus } from "../types";

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

function formatDate(value: string) {
  if (!value) return "Date à préciser";

  return new Intl.DateTimeFormat("fr-FR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(value));
}

function formatDateTime(value: string) {
  return new Intl.DateTimeFormat("fr-FR", {
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(value));
}

export function AdminPage() {
  const quoteRequests = useAppStore((state) => state.quoteRequests);
  const musicRequests = useAppStore((state) => state.musicRequests);
  const updateQuoteRequestStatus = useAppStore((state) => state.updateQuoteRequestStatus);
  const updateMusicRequestStatus = useAppStore((state) => state.updateMusicRequestStatus);

  const pendingQuotes = quoteRequests.filter((request) => request.status === "pending").length;
  const pendingMusic = musicRequests.filter((request) => request.status === "pending").length;

  return (
    <div className="bg-night-950 text-ivory">
      <section className="px-4 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <Badge>Admin mocké</Badge>
          <div className="mt-5 grid gap-6 lg:grid-cols-[1fr_0.58fr] lg:items-end">
            <div>
              <h1 className="font-display text-4xl leading-tight text-ivory sm:text-5xl xl:text-6xl">
                Tableau de bord Fredmusic
              </h1>
              <p className="mt-5 max-w-2xl leading-7 text-ivory/70">
                Espace de démonstration pour suivre les demandes de devis et les suggestions de musique. Le contenu du
                site reste géré côté développement.
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
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
              {quoteRequests.map((request) => (
                <article key={request.id} className="rounded-md border border-white/[0.07] bg-night-950 p-4">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <div className="flex flex-wrap items-center gap-3">
                        <h3 className="font-display text-2xl text-ivory">{request.name}</h3>
                        <span className={`rounded-full border px-3 py-1 text-xs font-semibold ${statusClasses[request.status]}`}>
                          {quoteStatusLabels[request.status]}
                        </span>
                      </div>
                      <p className="mt-2 text-sm text-gold-300">{request.eventType}</p>
                    </div>
                    <p className="text-sm text-ivory/48">{formatDateTime(request.createdAt)}</p>
                  </div>

                  <div className="mt-4 grid gap-3 text-sm text-ivory/68 sm:grid-cols-2">
                    <p className="flex items-center gap-2">
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
                      {formatDate(request.eventDate)}
                    </p>
                    <p className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-gold-300" aria-hidden="true" />
                      {request.location}
                    </p>
                  </div>

                  {request.guestsCount ? (
                    <p className="mt-3 text-sm text-ivory/58">{request.guestsCount} invités environ</p>
                  ) : null}
                  {request.message ? <p className="mt-4 leading-7 text-ivory/72">{request.message}</p> : null}

                  <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                    <Button size="sm" variant="secondary" onClick={() => updateQuoteRequestStatus(request.id, "accepted")}>
                      Marquer traité
                    </Button>
                    <Button size="sm" variant="ghost" onClick={() => updateQuoteRequestStatus(request.id, "refused")}>
                      Refuser
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
              {musicRequests.map((request) => (
                <article key={request.id} className="rounded-md border border-white/[0.07] bg-night-950 p-4">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <div className="flex items-start gap-3">
                        <Music2 className="mt-1 h-5 w-5 flex-none text-gold-300" aria-hidden="true" />
                        <div>
                          <h3 className="font-display text-2xl text-ivory">{request.songTitle}</h3>
                          <p className="mt-1 text-sm text-gold-300">{request.artist}</p>
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
                      {request.guestName ?? "Invité anonyme"}
                    </p>
                    <p className="text-ivory/42">{formatDateTime(request.createdAt)}</p>
                  </div>

                  {request.message ? <p className="mt-4 leading-7 text-ivory/72">{request.message}</p> : null}

                  <div className="mt-5 grid gap-3 sm:grid-cols-3">
                    <Button
                      size="sm"
                      variant="secondary"
                      icon={<Check className="h-4 w-4" />}
                      onClick={() => updateMusicRequestStatus(request.id, "accepted")}
                    >
                      Accepter
                    </Button>
                    <Button size="sm" variant="primary" onClick={() => updateMusicRequestStatus(request.id, "played")}>
                      Joué
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      icon={<X className="h-4 w-4" />}
                      onClick={() => updateMusicRequestStatus(request.id, "refused")}
                    >
                      Refuser
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
