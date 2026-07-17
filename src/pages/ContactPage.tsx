import { useState, type FormEvent } from "react";
import { CheckCircle2, Mail, MapPin, PhoneCall, Send } from "lucide-react";
import { Badge } from "../components/ui/Badge";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { Select } from "../components/ui/Select";
import { Textarea } from "../components/ui/Textarea";
import { useAppStore } from "../store/useAppStore";

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
  const addQuoteRequest = useAppStore((state) => state.addQuoteRequest);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedName, setSubmittedName] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const guestsValue = String(formData.get("guests") ?? "").trim();
    const guestsCount = guestsValue ? Number(guestsValue) : undefined;

    addQuoteRequest({
      name: String(formData.get("name") ?? ""),
      email: String(formData.get("email") ?? ""),
      phone: String(formData.get("phone") ?? ""),
      eventType: String(formData.get("eventType") ?? ""),
      eventDate: String(formData.get("eventDate") ?? ""),
      location: String(formData.get("location") ?? ""),
      guestsCount: Number.isFinite(guestsCount) ? guestsCount : undefined,
      message: String(formData.get("message") ?? ""),
    });

    setSubmittedName(String(formData.get("name") ?? ""));
    setIsSubmitted(true);
    event.currentTarget.reset();
  }

  return (
    <div className="relative overflow-hidden bg-night-950 text-ivory">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(214,177,73,0.12),transparent_34%),linear-gradient(180deg,#090a0d_0%,#101216_54%,#090a0d_100%)]" />

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
                  <h2 className="mt-6 font-display text-4xl text-ivory">Demande enregistrée</h2>
                  <p className="mt-4 leading-7 text-ivory/70">
                    Merci{submittedName ? ` ${submittedName}` : ""}, votre demande de devis est enregistrée dans
                    l'admin mocké.
                  </p>
                  <Button className="mt-8" variant="secondary" onClick={() => setIsSubmitted(false)}>
                    Modifier la demande
                  </Button>
                </div>
              </div>
            ) : (
              <form className="grid gap-5" onSubmit={handleSubmit}>
                <div className="grid gap-5 sm:grid-cols-2">
                  <Input
                    label="Nom / prénom"
                    name="name"
                    autoComplete="name"
                    className="rounded-md border-white/[0.1] bg-night-900/72"
                    required
                  />
                  <Input
                    label="Téléphone"
                    name="phone"
                    type="tel"
                    autoComplete="tel"
                    className="rounded-md border-white/[0.1] bg-night-900/72"
                    required
                  />
                </div>

                <Input
                  label="Email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  className="rounded-md border-white/[0.1] bg-night-900/72"
                  required
                />

                <div className="grid gap-5 sm:grid-cols-2">
                  <Select
                    label="Type d'événement"
                    name="eventType"
                    options={eventTypeOptions}
                    placeholder="Choisir"
                    className="rounded-md border-white/[0.1] bg-night-900/72"
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
                  />
                  <Input
                    label="Nombre d'invités"
                    name="guests"
                    type="number"
                    min="1"
                    placeholder="Ex. 120"
                    className="rounded-md border-white/[0.1] bg-night-900/72"
                  />
                </div>

                <Textarea
                  label="Votre message"
                  name="message"
                  placeholder="Décrivez votre événement, vos besoins et l'ambiance souhaitée..."
                  className="rounded-md border-white/[0.1] bg-night-900/72"
                  required
                />

                <Button type="submit" size="lg" icon={<Send className="h-4 w-4" />} className="mt-2 w-full sm:w-fit" showArrow>
                  Envoyer ma demande
                </Button>
              </form>
            )}
          </div>

          <aside className="border-t border-white/[0.08] bg-night-950/72 p-5 sm:p-7 lg:border-l lg:border-t-0 lg:p-9">
            <div className="rounded-md border border-gold-300/18 bg-gold-300/[0.06] p-5">
              <h2 className="font-display text-3xl text-ivory">Contact</h2>
              <p className="mt-2 text-sm uppercase text-gold-300">Fréderic WILKOSZ</p>
            </div>

            <div className="mt-6 grid gap-4">
              {contactDetails.map((item) => {
                const Icon = item.icon;
                const content = (
                  <>
                    <Icon className="mt-1 h-4 w-4 flex-none text-gold-300" aria-hidden="true" />
                    <span>
                      <span className="block text-xs font-semibold uppercase text-ivory/48">{item.label}</span>
                      <span className="mt-1 block text-ivory/78">{item.value}</span>
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
