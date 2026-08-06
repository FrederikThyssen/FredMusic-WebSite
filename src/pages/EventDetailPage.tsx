import { useEffect, useState, type FormEvent } from "react";
import { useParams } from "react-router-dom";
import { CheckCircle2, Disc3, Music2, Send } from "lucide-react";
import { events } from "../data/events";
import { Badge } from "../components/ui/Badge";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { Textarea } from "../components/ui/Textarea";
import { fetchActiveEvent, insertMusicRequest } from "../lib/api";

export function EventDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const event = events.find((e) => e.slug === slug);

  const [activeEventId, setActiveEventId] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedSong, setSubmittedSong] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitError, setSubmitError] = useState("");

  useEffect(() => {
    fetchActiveEvent().then(({ data }) => {
      if (data) {
        setActiveEventId(data.id);
      }
    });
  }, []);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
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

    if (guestName.length > 80) nextErrors.guestName = "Le prénom ne peut pas dépasser 80 caractères.";
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

  const eventName = event?.title ?? "Soirée Fredmusic";

  return (
    <div className="relative min-h-screen overflow-hidden bg-night-950 text-ivory">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(214,177,73,0.12),transparent_40%)]" />

      <section className="relative px-4 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-lg text-center">
          <Disc3 className="mx-auto h-10 w-10 text-gold-300" aria-hidden="true" />
          <Badge className="mt-4">Ce soir</Badge>
          <h1 className="mt-4 font-display text-3xl leading-tight text-ivory sm:text-4xl">
            {eventName}
          </h1>
          {event?.ambiance ? (
            <p className="mt-3 text-ivory/60">{event.ambiance}</p>
          ) : null}
        </div>
      </section>

      <section className="relative px-4 pb-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-lg">
          <div className="rounded-lg border border-white/[0.08] bg-white/[0.035] p-6 shadow-[0_24px_80px_rgba(0,0,0,0.32)] backdrop-blur sm:p-8">
            {isSubmitted ? (
              <div className="grid place-items-center py-8 text-center">
                <CheckCircle2 className="h-12 w-12 text-gold-300" aria-hidden="true" />
                <h2 className="mt-4 font-display text-2xl text-ivory">Proposition envoyée !</h2>
                <p className="mt-2 break-words text-ivory/70">{submittedSong}</p>
                <p className="mt-2 text-sm text-ivory/48">
                  Fredmusic fait de son mieux pour jouer votre titre.
                </p>
                <Button
                  variant="secondary"
                  size="md"
                  className="mt-6"
                  onClick={() => setIsSubmitted(false)}
                >
                  Proposer un autre titre
                </Button>
              </div>
            ) : (
              <>
                <div className="mb-6 flex items-center gap-3">
                  <Music2 className="h-5 w-5 text-gold-300" aria-hidden="true" />
                  <h2 className="font-semibold text-ivory">Proposer une musique</h2>
                </div>
                <form className="grid gap-4" onSubmit={handleSubmit}>
                  <input
                    type="text"
                    name="website"
                    tabIndex={-1}
                    autoComplete="off"
                    className="hidden"
                    aria-hidden="true"
                  />
                  <Input
                    label="Votre prénom"
                    name="guestName"
                    placeholder="Optionnel"
                    autoComplete="given-name"
                    className="rounded-md border-white/[0.1] bg-night-900/72"
                    maxLength={80}
                    error={errors.guestName}
                  />
                  <div className="grid gap-4 sm:grid-cols-2">
                    <Input
                      label="Artiste"
                      name="artist"
                      placeholder="Ex. Daft Punk"
                      className="rounded-md border-white/[0.1] bg-night-900/72"
                      maxLength={120}
                      error={errors.artist}
                      required
                    />
                    <Input
                      label="Titre"
                      name="songTitle"
                      placeholder="Ex. Get Lucky"
                      className="rounded-md border-white/[0.1] bg-night-900/72"
                      maxLength={160}
                      error={errors.songTitle}
                      required
                    />
                  </div>
                  <Textarea
                    label="Message"
                    name="message"
                    placeholder="Dédicace, moment souhaité..."
                    className="rounded-md border-white/[0.1] bg-night-900/72"
                    maxLength={500}
                    error={errors.message}
                  />
                  <Button
                    type="submit"
                    size="lg"
                    icon={<Send className="h-4 w-4" />}
                    className="w-full"
                    showArrow
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Envoi…" : "Envoyer ma proposition"}
                  </Button>
                  {submitError ? <p role="alert" className="text-sm text-red-300">{submitError}</p> : null}
                </form>
              </>
            )}
          </div>
          <p className="mt-4 text-center text-xs text-ivory/32">
            Fredmusic garde la main sur la playlist pour préserver l'ambiance.
          </p>
        </div>
      </section>
    </div>
  );
}
