import { useEffect, useState, type FormEvent } from "react";
import { CheckCircle2, Disc3, ListMusic, Send } from "lucide-react";
import { fetchActiveEvent, insertMusicRequest } from "../lib/api";
import { Badge } from "../components/ui/Badge";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { Textarea } from "../components/ui/Textarea";

export function MusicRequestPage() {
  const [activeEventId, setActiveEventId] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedSong, setSubmittedSong] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitError, setSubmitError] = useState("");

  useEffect(() => {
    fetchActiveEvent().then(({ data }) => {
      if (data) setActiveEventId(data.id);
    });
  }, []);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    if (isSubmitting) return;

    const formData = new FormData(form);
    if (String(formData.get("website") ?? "").trim()) {
      setSubmittedSong("Votre proposition");
      setIsSubmitted(true);
      form.reset();
      return;
    }

    const guestName = String(formData.get("guestName") ?? "").trim();
    const artist = String(formData.get("artist") ?? "").trim();
    const songTitle = String(formData.get("songTitle") ?? "").trim();
    const message = String(formData.get("message") ?? "").trim();
    const nextErrors: Record<string, string> = {};

    if (guestName.length > 80) nextErrors.guestName = "Le nom ne peut pas dépasser 80 caractères.";
    if (artist.length < 1) nextErrors.artist = "Indiquez un artiste.";
    if (artist.length > 120) nextErrors.artist = "L'artiste ne peut pas dépasser 120 caractères.";
    if (songTitle.length < 1) nextErrors.songTitle = "Indiquez un titre.";
    if (songTitle.length > 160) nextErrors.songTitle = "Le titre ne peut pas dépasser 160 caractères.";
    if (message.length > 500) nextErrors.message = `Message trop long (${message.length}/500 caractères).`;

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    setErrors({});
    setSubmitError("");
    setIsSubmitting(true);

    const { error } = await insertMusicRequest({
      eventId: activeEventId,
      guestName,
      artist,
      songTitle,
      message,
    });

    setIsSubmitting(false);

    if (error) {
      setSubmitError("Une erreur est survenue. Réessayez dans un instant.");
      return;
    }

    setSubmittedSong(`${artist} - ${songTitle}`);
    setIsSubmitted(true);
    form.reset();
  }

  return (
    <div className="relative overflow-hidden bg-night-950 text-ivory">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(199,161,91,0.11),transparent_34%),linear-gradient(180deg,#08090b_0%,#111214_56%,#08090b_100%)]" />

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
                <input
                  type="text"
                  name="website"
                  tabIndex={-1}
                  autoComplete="off"
                  className="hidden"
                  aria-hidden="true"
                />
                <Input
                  label="Votre prénom ou nom"
                  name="guestName"
                  placeholder="Optionnel"
                  autoComplete="name"
                  className="rounded-md border-white/[0.1] bg-night-900/72"
                  maxLength={80}
                  error={errors.guestName}
                />

                <div className="grid gap-5 sm:grid-cols-2">
                  <Input
                    label="Artiste"
                    name="artist"
                    placeholder="Ex. Earth, Wind & Fire"
                    className="rounded-md border-white/[0.1] bg-night-900/72"
                    maxLength={120}
                    error={errors.artist}
                    required
                  />
                  <Input
                    label="Titre de la musique"
                    name="songTitle"
                    placeholder="Ex. September"
                    className="rounded-md border-white/[0.1] bg-night-900/72"
                    maxLength={160}
                    error={errors.songTitle}
                    required
                  />
                </div>

                <Textarea
                  label="Petit message"
                  name="message"
                  placeholder="Optionnel : dédicace, moment souhaité, souvenir..."
                  className="rounded-md border-white/[0.1] bg-night-900/72"
                  maxLength={500}
                  error={errors.message}
                />

                <Button type="submit" size="lg" icon={<Send className="h-4 w-4" />} className="mt-2 w-full sm:w-fit" showArrow disabled={isSubmitting}>
                  {isSubmitting ? "Envoi en cours…" : "Envoyer ma demande"}
                </Button>
                {submitError ? <p role="alert" className="text-sm text-red-300">{submitError}</p> : null}
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
                <h3 className="font-display text-2xl text-ivory">Comment ça marche ?</h3>
              </div>
              <ol className="mt-5 grid gap-3">
                {["Scannez le QR code de la soirée.", "Proposez un artiste et un titre.", "Fredmusic valide et joue le bon moment venu."].map((step, i) => (
                  <li key={step} className="flex items-start gap-3 text-sm text-ivory/72">
                    <span className="flex h-5 w-5 flex-none items-center justify-center rounded-full bg-gold-300/10 text-xs font-semibold text-gold-300">{i + 1}</span>
                    {step}
                  </li>
                ))}
              </ol>
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
}
