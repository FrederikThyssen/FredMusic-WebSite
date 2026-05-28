import {
  BriefcaseBusiness,
  Building2,
  Check,
  Handshake,
  Landmark,
  Megaphone,
  Mic2,
  Music2,
  RadioTower,
  ShieldCheck,
  UsersRound,
} from "lucide-react";
import { CTASection } from "../components/sections/CTASection";
import { Badge } from "../components/ui/Badge";
import { ButtonLink } from "../components/ui/Button";
import { Card } from "../components/ui/Card";

const professionalEventTypes = [
  { title: "Soirées d'entreprise", text: "Une ambiance maîtrisée pour fédérer vos équipes.", icon: BriefcaseBusiness },
  { title: "Séminaires", text: "Sonorisation, micros et transitions propres pour vos temps forts.", icon: Mic2 },
  { title: "Comités d'entreprise", text: "Une animation adaptée aux familles, collaborateurs et invités.", icon: UsersRound },
  { title: "Fêtes de village", text: "Une prestation solide pour les événements publics et associatifs.", icon: Landmark },
  { title: "Fêtes de la musique", text: "Gestion son, animation et énergie adaptée au public.", icon: Music2 },
  { title: "Inaugurations", text: "Un cadre sonore professionnel pour lancer un lieu ou une marque.", icon: Megaphone },
];

const strengths = [
  "Ponctualité et préparation en amont",
  "Matériel fiable et adapté au lieu",
  "Sonorisation des prises de parole",
  "Gestion des micros et interventions",
  "Ambiance musicale adaptée au public",
  "Installation propre et rassurante",
];

export function ProfessionalEventsPage() {
  return (
    <div className="bg-night-950 text-ivory">
      <section className="relative overflow-hidden px-4 py-20 sm:px-6 lg:px-8">
        <img
          src="/images/conception/image3.png"
          alt=""
          className="absolute inset-0 h-full w-full object-cover object-center opacity-42"
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-night-950 via-night-950/90 to-night-950/42" />
        <div className="relative mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.58fr_0.42fr] lg:items-end">
          <div>
            <Badge>Événements professionnels & publics</Badge>
            <h1 className="mt-5 max-w-4xl font-display text-5xl leading-tight text-ivory sm:text-6xl">
              Sonorisation et animation pour vos événements professionnels et publics
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-ivory/72">
              Entreprises, associations, collectivités ou événements publics : Fredmusic apporte une prestation fiable,
              organisée et adaptée à votre public.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <ButtonLink to="/contact" showArrow>
                Demander un devis
              </ButtonLink>
              <ButtonLink to="/prestations" variant="secondary" showArrow>
                Voir les prestations
              </ButtonLink>
            </div>
          </div>
          <Card className="p-6">
            <ShieldCheck className="h-8 w-8 text-gold-300" aria-hidden="true" />
            <p className="mt-5 text-xs font-semibold uppercase text-gold-300">Fiabilité & organisation</p>
            <p className="mt-4 leading-7 text-ivory/72">
              Chaque intervention est préparée selon le lieu, les contraintes techniques, le public attendu et les
              temps de parole prévus.
            </p>
          </Card>
        </div>
      </section>

      <section className="bg-night-900 px-4 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold uppercase text-gold-300">Formats accompagnés</p>
            <h2 className="mt-3 font-display text-4xl leading-tight text-ivory">Des prestations adaptées aux publics pros</h2>
          </div>
          <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {professionalEventTypes.map((eventType) => {
              const Icon = eventType.icon;
              return (
                <Card key={eventType.title} className="p-6">
                  <Icon className="h-7 w-7 text-gold-300" aria-hidden="true" />
                  <h3 className="mt-5 font-display text-2xl text-ivory">{eventType.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-ivory/68">{eventType.text}</p>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-night-950 px-4 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.44fr_0.56fr] lg:items-center">
          <div>
            <p className="text-xs font-semibold uppercase text-gold-300">Technique, son et lumière</p>
            <h2 className="mt-4 font-display text-4xl leading-tight text-ivory">
              Une prestation propre, lisible et maîtrisée
            </h2>
            <p className="mt-5 leading-7 text-ivory/70">
              La sonorisation, les micros et la lumière sont choisis selon la salle, la jauge, les prises de parole et
              le niveau d'ambiance souhaité.
            </p>
          </div>
          <div className="overflow-hidden border border-white/10 bg-night-900">
            <img
              src="/images/conception/dj-console-gold.png"
              alt="Régie DJ professionnelle avec console et éclairage doré"
              className="aspect-[16/10] w-full object-cover"
              loading="lazy"
            />
          </div>
        </div>
      </section>

      <section className="bg-night-900 px-4 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.36fr_0.64fr]">
          <div>
            <p className="text-xs font-semibold uppercase text-gold-300">Organisation & accompagnement</p>
            <h2 className="mt-4 font-display text-4xl text-ivory">Un cadre rassurant pour vos équipes</h2>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {strengths.map((strength) => (
              <div key={strength} className="flex items-center gap-3 border border-white/10 bg-night-950/58 p-4 text-sm text-ivory/76">
                <Check className="h-5 w-5 shrink-0 text-gold-300" aria-hidden="true" />
                {strength}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-night-950 px-4 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-5 md:grid-cols-3">
          {[
            { title: "Adapté au lieu", text: "Salle, extérieur, mairie, espace associatif ou entreprise.", icon: Building2 },
            { title: "Adapté au public", text: "Ambiance ajustée selon l'âge, le contexte et le moment.", icon: Handshake },
            { title: "Adapté au timing", text: "Interventions, discours, lancement musical et temps forts.", icon: RadioTower },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <Card key={item.title} className="p-6">
                <Icon className="h-7 w-7 text-gold-300" aria-hidden="true" />
                <h3 className="mt-5 font-display text-2xl text-ivory">{item.title}</h3>
                <p className="mt-3 text-sm leading-6 text-ivory/68">{item.text}</p>
              </Card>
            );
          })}
        </div>
      </section>

      <CTASection
        title="Vous organisez un événement professionnel ou public ?"
        description="Présentez-nous le lieu, le public attendu et les temps forts à sonoriser ou animer."
        primaryLabel="Demander un devis"
        primaryTo="/contact"
        secondaryLabel="Voir les prestations"
        secondaryTo="/prestations"
      />
    </div>
  );
}
