import { useState, type FormEvent } from "react";
import { CheckCircle2, Mail, MapPin, PhoneCall, Send } from "lucide-react";
import { insertQuoteRequest } from "../lib/api";
import { Badge } from "../components/ui/Badge";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { Select } from "../components/ui/Select";
import { Textarea } from "../components/ui/Textarea";

const eventTypeOptions = [
  { label: "Mariage", value: "mariage" },
  { label: "Événement privé", value: "evenement-prive" },
  { label: "Événement professionnel / public", value: "evenement-pro" },
  { label: "Location / matériel", value: "location" },
  { label: "Autre demande", value: "autre" },
];

const contactDetails = [
  {
    icon: PhoneCall,
    label: "Téléphone",
    value: "06 48 13 55 56",
    href: "tel:+33648135556",
  },
  {
    icon: Mail,
    label: "Email",
    value: "djfredmusic@outlook.fr",
    href: "mailto:djfredmusic@outlook.fr",
  },
  {
    icon: MapPin,
    label: "Adresse",
    value: "62156 Vis-en-Artois, France",
  },
];

export function ContactPage() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedName, setSubmittedName] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitError, setSubmitError] = useState("");

  function validate(formData: FormData): Record<string, string> {
    const errs: Record<string, string> = {};
    const name = String(formData.get("name") ?? "").trim();
    const email = String(formData.get("email") ?? "").trim();
    const phone = String(formData.get("phone") ?? "").trim();
    const eventType = String(formData.get("eventType") ?? "").trim();
    const location = String(formData.get("location") ?? "").trim();
    const guests = String(formData.get("guests") ?? "").trim();
    const message = String(formData.get("message") ?? "").trim();

    if (name.length < 2) errs.name = "Le nom doit comporter au moins 2 caractères.";
    if (name.length > 100) errs.name = "Le nom ne peut pas dépasser 100 caractères.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errs.email = "Adresse email invalide.";
    if (email.length > 254) errs.email = "Adresse email trop longue.";
    if (phone.replace(/\D/g, "").length < 8) errs.phone = "Numéro de téléphone invalide.";
    if (phone.length > 30) errs.phone = "Numéro de téléphone trop long.";
    if (!eventTypeOptions.some((option) => option.value === eventType)) errs.eventType = "Choisissez un type d'événement.";
    if (location.length > 160) errs.location = "Le lieu ne peut pas dépasser 160 caractères.";
    if (guests) {
      const guestsCount = Number(guests);
      if (!Number.isInteger(guestsCount) || guestsCount < 1 || guestsCount > 5000) {
        errs.guests = "Indiquez un nombre d'invités valide.";
      }
    }
    if (message.length > 2000) errs.message = `Message trop long (${message.length}/2000 caractères).`;
    return errs;
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    if (isSubmitting) return;

    const formData = new FormData(form);
    if (String(formData.get("website") ?? "").trim()) {
      setSubmittedName("");
      setIsSubmitted(true);
      form.reset();
      return;
    }

    const errs = validate(formData);
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setErrors({});
    setSubmitError("");
    setIsSubmitting(true);

    const guestsValue = String(formData.get("guests") ?? "").trim();
    const guestsCount = guestsValue ? Number(guestsValue) : undefined;
    const name = String(formData.get("name") ?? "");

    const { error } = await insertQuoteRequest({
      name,
      email: String(formData.get("email") ?? ""),
      phone: String(formData.get("phone") ?? ""),
      eventType: String(formData.get("eventType") ?? ""),
      eventDate: String(formData.get("eventDate") ?? ""),
      location: String(formData.get("location") ?? ""),
      guestsCount: Number.isFinite(guestsCount) ? guestsCount : undefined,
      message: String(formData.get("message") ?? ""),
    });

    setIsSubmitting(false);

    if (error) {
      setSubmitError("Une erreur est survenue. Veuillez réessayer ou nous contacter directement.");
      return;
    }

    setSubmittedName(name);
    setIsSubmitted(true);
    form.reset();
  }

  return (
    <div className="relative overflow-hidden bg-night-950 text-ivory">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(199,161,91,0.11),transparent_34%),linear-gradient(180deg,#08090b_0%,#111214_54%,#08090b_100%)]" />

      <section className="relative px-4 py-14 sm:px-6 sm:py-18 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-4xl">
            <Badge>Contact</Badge>
            <h1 className="mt-5 max-w-4xl font-display text-4xl leading-tight text-ivory sm:text-5xl xl:text-6xl">
              Demander un devis
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-ivory/72">
              Envoyez les informations principales de votre événement. Fredmusic reviendra vers vous avec une
              proposition adaptée.
            </p>
          </div>
        </div>
      </section>

      <section className="relative px-4 pb-16 sm:px-6 sm:pb-20 lg:px-8">
        <div className="mx-auto grid max-w-7xl overflow-hidden rounded-lg border border-white/[0.08] bg-white/[0.035] shadow-[0_24px_80px_rgba(0,0,0,0.32)] backdrop-blur lg:grid-cols-[1fr_0.52fr]">
          <div className="p-5 sm:p-7 lg:p-9">
            {isSubmitted ? (
              <div className="grid min-h-[420px] place-items-center text-center">
                <div className="max-w-xl">
                  <CheckCircle2 className="mx-auto h-12 w-12 text-gold-300" aria-hidden="true" />
                  <h2 className="mt-6 font-display text-3xl text-ivory sm:text-4xl">Demande enregistrée</h2>
                  <p className="mt-4 leading-7 text-ivory/70">
                    Merci{submittedName ? ` ${submittedName}` : ""}, votre demande de devis est enregistrée dans
                    l'espace admin Fredmusic.
                  </p>
                  <Button className="mt-8 w-full sm:w-auto" variant="secondary" onClick={() => setIsSubmitted(false)}>
                    Modifier la demande
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
                <div className="grid gap-5 sm:grid-cols-2">
                  <Input
                    label="Nom / prénom"
                    name="name"
                    autoComplete="name"
                    className="rounded-md border-white/[0.1] bg-night-900/72"
                    maxLength={100}
                    error={errors.name}
                    required
                  />
                  <Input
                    label="Téléphone"
                    name="phone"
                    type="tel"
                    autoComplete="tel"
                    className="rounded-md border-white/[0.1] bg-night-900/72"
                    maxLength={30}
                    error={errors.phone}
                    required
                  />
                </div>

                <Input
                  label="Email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  className="rounded-md border-white/[0.1] bg-night-900/72"
                  maxLength={254}
                  error={errors.email}
                  required
                />

                <div className="grid gap-5 sm:grid-cols-2">
                  <Select
                    label="Type d'événement"
                    name="eventType"
                    options={eventTypeOptions}
                    placeholder="Choisir"
                    className="rounded-md border-white/[0.1] bg-night-900/72"
                    error={errors.eventType}
                    required
                  />
                  <Input
                    label="Date souhaitée"
                    name="eventDate"
                    type="date"
                    className="rounded-md border-white/[0.1] bg-night-900/72"
                  />
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <Input
                    label="Lieu / ville"
                    name="location"
                    placeholder="Ex. Arras, Lille, salle privée..."
                    className="rounded-md border-white/[0.1] bg-night-900/72"
                    maxLength={160}
                    error={errors.location}
                  />
                  <Input
                    label="Nombre d'invités"
                    name="guests"
                    type="number"
                    min="1"
                    max="5000"
                    placeholder="Ex. 120"
                    className="rounded-md border-white/[0.1] bg-night-900/72"
                    error={errors.guests}
                  />
                </div>

                <Textarea
                  label="Votre message"
                  name="message"
                  placeholder="Décrivez votre événement, vos besoins et l'ambiance souhaitée..."
                  className="rounded-md border-white/[0.1] bg-night-900/72"
                  maxLength={2000}
                  error={errors.message}
                  required
                />

                <Button type="submit" size="lg" icon={<Send className="h-4 w-4" />} className="mt-2 w-full sm:w-fit" showArrow disabled={isSubmitting}>
                  {isSubmitting ? "Envoi en cours…" : "Envoyer ma demande"}
                </Button>
                {submitError ? (
                  <p role="alert" className="text-sm text-red-300">{submitError}</p>
                ) : null}
              </form>
            )}
          </div>

          <aside className="border-t border-white/[0.08] bg-night-950/72 p-5 sm:p-7 lg:border-l lg:border-t-0 lg:p-9">
            <div className="rounded-md bg-white/[0.04] p-5">
              <h2 className="font-display text-3xl text-ivory">Contact</h2>
              <p className="mt-2 text-sm uppercase text-gold-300">Fréderic WILKOSZ</p>
            </div>

            <div className="mt-6 grid gap-4">
              {contactDetails.map((item) => {
                const Icon = item.icon;
                const content = (
                  <>
                    <Icon className="mt-1 h-4 w-4 flex-none text-gold-300" aria-hidden="true" />
                    <span className="min-w-0">
                      <span className="block text-xs font-semibold uppercase text-ivory/48">{item.label}</span>
                      <span className="mt-1 block break-words text-ivory/78">{item.value}</span>
                    </span>
                  </>
                );

                return item.href ? (
                  <a
                    key={item.label}
                    href={item.href}
                    className="flex gap-3 rounded-md border border-white/[0.08] bg-white/[0.04] p-4 transition hover:border-gold-300/50 hover:bg-gold-300/[0.06]"
                  >
                    {content}
                  </a>
                ) : (
                  <div key={item.label} className="flex gap-3 rounded-md border border-white/[0.08] bg-white/[0.04] p-4">
                    {content}
                  </div>
                );
              })}
            </div>

            <p className="mt-6 rounded-md border border-white/[0.08] bg-white/[0.035] p-4 text-sm leading-6 text-ivory/58">
              SIREN : 813 426 483 - CODE APE : 9329 Z
            </p>
          </aside>
        </div>
      </section>
    </div>
  );
}
