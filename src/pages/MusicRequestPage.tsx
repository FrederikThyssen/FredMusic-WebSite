import { useState, type FormEvent } from "react";
import { CheckCircle2, Disc3, ListMusic, Send } from "lucide-react";
import { Badge } from "../components/ui/Badge";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { Textarea } from "../components/ui/Textarea";
import { useAppStore } from "../store/useAppStore";

const publicQrEventId = "event-public-qr";

export function MusicRequestPage() {
  const addMusicRequest = useAppStore((state) => state.addMusicRequest);
  const musicRequests = useAppStore((state) => state.musicRequests);
  const latestRequests = musicRequests.slice(0, 3);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedSong, setSubmittedSong] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const artist = String(formData.get("artist") ?? "");
    const songTitle = String(formData.get("songTitle") ?? "");

    addMusicRequest({
      eventId: publicQrEventId,
      guestName: String(formData.get("guestName") ?? ""),
      artist,
      songTitle,
      message: String(formData.get("message") ?? ""),
    });

    setSubmittedSong(`${artist} - ${songTitle}`);
    setIsSubmitted(true);
    event.currentTarget.reset();
  }

  return (
    <div className="relative overflow-hidden bg-night-950 text-ivory">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(214,177,73,0.12),transparent_34%),linear-gradient(180deg,#090a0d_0%,#111317_56%,#090a0d_100%)]" />

      <section className="relative px-4 py-14 sm:px-6 sm:py-18 lg:px-8">
        <div className="mx-auto max-w-5xl text-center">
          <Badge>Demande de musique</Badge>
          <h1 className="mx-auto mt-5 max-w-4xl font-display text-4xl leading-tight text-ivory sm:text-5xl xl:text-6xl">
            Proposez votre musique
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-ivory/72">
            Envoyez une suggestion au DJ. Fredmusic garde la main sur la playlist pour préserver l'ambiance de la
            soirée.
          </p>
        </div>
      </section>

      <section className="relative px-4 pb-16 sm:px-6 sm:pb-20 lg:px-8">
        <div className="mx-auto grid max-w-5xl overflow-hidden rounded-lg border border-white/[0.08] bg-white/[0.035] shadow-[0_24px_80px_rgba(0,0,0,0.32)] backdrop-blur lg:grid-cols-[1fr_0.52fr]">
          <div className="p-5 sm:p-7 lg:p-9">
            {isSubmitted ? (
              <div className="grid min-h-[420px] place-items-center text-center">
                <div className="max-w-xl">
                  <CheckCircle2 className="mx-auto h-12 w-12 text-gold-300" aria-hidden="true" />
                  <h2 className="mt-6 font-display text-3xl text-ivory sm:text-4xl">Demande envoyée</h2>
                  <p className="mt-4 break-words leading-7 text-ivory/70">
                    Merci, votre proposition est bien enregistrée : {submittedSong}.
                  </p>
                  <Button className="mt-8 w-full sm:w-auto" variant="secondary" onClick={() => setIsSubmitted(false)}>
                    Proposer un autre titre
                  </Button>
                </div>
              </div>
            ) : (
              <form className="grid gap-5" onSubmit={handleSubmit}>
                <Input
                  label="Votre prénom ou nom"
                  name="guestName"
                  placeholder="Optionnel"
                  autoComplete="name"
                  className="rounded-md border-white/[0.1] bg-night-900/72"
                />

                <div className="grid gap-5 sm:grid-cols-2">
                  <Input
                    label="Artiste"
                    name="artist"
                    placeholder="Ex. Earth, Wind & Fire"
                    className="rounded-md border-white/[0.1] bg-night-900/72"
                    required
                  />
                  <Input
                    label="Titre de la musique"
                    name="songTitle"
                    placeholder="Ex. September"
                    className="rounded-md border-white/[0.1] bg-night-900/72"
                    required
                  />
                </div>

                <Textarea
                  label="Petit message"
                  name="message"
                  placeholder="Optionnel : dédicace, moment souhaité, souvenir..."
                  className="rounded-md border-white/[0.1] bg-night-900/72"
                />

                <Button type="submit" size="lg" icon={<Send className="h-4 w-4" />} className="mt-2 w-full sm:w-fit" showArrow>
                  Envoyer ma demande
                </Button>
              </form>
            )}
          </div>

          <aside className="border-t border-white/[0.08] bg-night-950/72 p-5 sm:p-7 lg:border-l lg:border-t-0 lg:p-9">
            <div className="rounded-md bg-gold-300/[0.06] p-5">
              <Disc3 className="h-6 w-6 text-gold-300" aria-hidden="true" />
              <h2 className="mt-4 font-display text-3xl text-ivory">Le DJ valide</h2>
              <p className="mt-3 text-sm leading-6 text-ivory/66">
                Les titres proposés sont des suggestions. Fredmusic choisit le bon moment selon l'énergie de la piste.
              </p>
            </div>

            <div className="mt-6 rounded-md border border-white/[0.08] bg-white/[0.04] p-5">
              <div className="flex items-center gap-3">
                <ListMusic className="h-5 w-5 text-gold-300" aria-hidden="true" />
                <h3 className="font-display text-2xl text-ivory">Dernières demandes</h3>
              </div>
              <div className="mt-5 grid gap-3">
                {latestRequests.map((request) => (
                  <div key={request.id} className="rounded-sm border border-white/[0.07] bg-night-950/50 p-3">
                    <p className="break-words text-sm font-semibold text-ivory">
                      {request.artist} - {request.songTitle}
                    </p>
                    <p className="mt-1 text-xs uppercase text-gold-300">{request.status}</p>
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
}
