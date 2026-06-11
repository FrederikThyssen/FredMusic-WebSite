import {
  Check,
  Headphones,
  Sparkles,
  Volume2,
} from "lucide-react";
import { CTASection } from "../components/sections/CTASection";
import { Badge } from "../components/ui/Badge";
import { ButtonLink } from "../components/ui/Button";

const categories = [
  {
    title: "Animation DJ",
    text: "Une animation musicale adaptée à votre public, votre lieu et les temps forts de la soirée.",
    details: [
      "Prestations animations DJ pour mariages et anniversaires",
      "Animation d'événements associatifs et d'entreprise",
      "Ambiance musicale construite selon le public et le déroulé",
    ],
    examples: ["Mariages", "Anniversaires", "Événements associatifs", "Soirées d'entreprise"],
    icon: Headphones,
  },
  {
    title: "Sonorisation & éclairage scénique",
    text: "Une solution technique claire et fiable pour les scènes, prises de parole et événements professionnels.",
    details: [
      "Sonorisation et éclairage scénique de spectacles",
      "Accompagnement de pièces de théâtre et podiums",
      "Sonorisation pour prises de parole et séminaires",
    ],
    examples: ["Spectacles", "Pièces de théâtre", "Prises de parole", "Séminaires", "Podiums"],
    icon: Volume2,
  },
  {
    title: "Effets spéciaux & vidéo",
    text: "Des effets visuels pour marquer une entrée, une ouverture de bal ou un temps fort.",
    details: [
      "Pyrotechnie d'intérieur et étincelles froides",
      "Fumée lourde, jet CO2 et canons à confettis",
      "Poudre Holi et vidéoprojection selon les besoins",
    ],
    examples: ["Étincelles froides", "Fumée lourde", "Jet CO2", "Confettis", "Poudre Holi", "Vidéoprojection"],
    icon: Sparkles,
  },
];

const assurances = [
  "Matériel adapté au lieu et au nombre d'invités",
  "Installation propre et préparée en amont",
  "Réglages son et lumière sur place",
  "Options proposées selon les contraintes de votre événement",
];

export function ServicesPage() {
  return (
    <div className="bg-night-950 text-ivory">
      <section className="relative overflow-hidden px-4 py-20 sm:px-6 lg:px-8">
        <img
          src="/images/conception/IMG_9192.JPG"
          alt=""
          className="absolute inset-0 h-full w-full object-cover object-center opacity-38"
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-night-950 via-night-950/88 to-night-950/36" />
        <div className="absolute inset-0 bg-gradient-to-t from-night-950 via-transparent to-transparent" />
        <div className="relative mx-auto max-w-7xl">
          <div className="max-w-4xl">
            <Badge>Prestations</Badge>
            <h1 className="mt-5 max-w-4xl font-display text-4xl leading-tight text-ivory sm:text-5xl xl:text-6xl">
              Des prestations complètes pour vos événements
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-ivory/72">
              Fredmusic accompagne vos événements avec animation DJ, sonorisation, éclairage et effets spéciaux adaptés
              au lieu, au public et aux moments importants.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <ButtonLink to="/contact" showArrow>
                Demander un devis
              </ButtonLink>
              <ButtonLink to="/location" variant="secondary" showArrow>
                Voir le matériel
              </ButtonLink>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-night-900 px-4 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold uppercase text-gold-300">Trois univers</p>
            <h2 className="mt-3 font-display text-4xl leading-tight text-ivory">
              Une offre lisible, adaptée à votre projet
            </h2>
            <p className="mt-4 leading-7 text-ivory/70">
              Chaque prestation peut être proposée seule ou intégrée dans un accompagnement complet selon vos besoins.
            </p>
          </div>

          <div className="mt-8 grid gap-5 lg:grid-cols-3">
            {categories.map((category) => {
              const Icon = category.icon;

              return (
                <article
                  key={category.title}
                  className="rounded-md border border-white/[0.07] bg-white/[0.025] p-6"
                >
                  <Icon className="h-8 w-8 text-gold-300" aria-hidden="true" />
                  <div className="pt-4">
                    <h3 className="font-display text-2xl text-ivory">{category.title}</h3>
                    <p className="mt-3 text-sm leading-6 text-ivory/78">{category.text}</p>
                    <ul className="mt-5 space-y-3">
                      {category.details.map((detail) => (
                        <li key={detail} className="flex gap-3 text-sm leading-6 text-ivory/70">
                          <Check className="mt-0.5 h-4 w-4 shrink-0 text-gold-300" aria-hidden="true" />
                          {detail}
                        </li>
                      ))}
                    </ul>
                    <div className="mt-5 flex flex-wrap gap-2">
                      {category.examples.map((example) => (
                        <span
                          key={example}
                          className="rounded-sm border border-white/[0.07] bg-night-950/54 px-3 py-2 text-xs text-ivory/76"
                        >
                          {example}
                        </span>
                      ))}
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-night-950 px-4 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.42fr_0.58fr] lg:items-center">
          <div>
            <p className="text-xs font-semibold uppercase text-gold-300">Accompagnement</p>
            <h2 className="mt-4 font-display text-4xl leading-tight text-ivory">
              Une prestation adaptée à votre événement
            </h2>
            <p className="mt-5 leading-7 text-ivory/70">
              L'objectif est de proposer une solution claire, propre et rassurante : ni trop légère, ni inutilement
              complexe, mais ajustée à votre lieu et au déroulé prévu.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {assurances.map((assurance) => (
              <div
                key={assurance}
                className="flex items-center gap-3 rounded-md border border-white/[0.07] bg-white/[0.03] p-4 text-sm text-ivory/76"
              >
                <Check className="h-5 w-5 shrink-0 text-gold-300" aria-hidden="true" />
                {assurance}
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        title="Parlez-nous de votre projet"
        description="Expliquez-nous le lieu, le public, le déroulé et les options souhaitées pour préparer une prestation adaptée."
        primaryLabel="Demander un devis"
        primaryTo="/contact"
        secondaryLabel="Voir les événements privés"
        secondaryTo="/evenements-prives"
      />
    </div>
  );
}
