import { Cable, Check, Mic2, SlidersHorizontal, Speaker, Wrench } from "lucide-react";
import { CTASection } from "../components/sections/CTASection";
import { HeroMedia } from "../components/sections/HeroMedia";
import { Badge } from "../components/ui/Badge";
import { ButtonLink } from "../components/ui/Button";
import { Card } from "../components/ui/Card";

const equipmentItems = [
  {
    name: "Pioneer DJM A9",
    brand: "Pioneer",
    usage: "Régie DJ",
    description: "Table de mixage professionnelle pour une régie fiable, précise et confortable.",
    image: "/images/conception/Pioneer-DJM-A9.webp",
    icon: SlidersHorizontal,
  },
  {
    name: "Pioneer CDJ 3000",
    brand: "Pioneer",
    usage: "Lecture & mix",
    description: "Lecteurs professionnels utilisés pour les prestations DJ exigeantes.",
    image: "/images/conception/Pioneer-CDJ-3000.png",
    icon: Cable,
  },
  {
    name: "Electro-Voice EKX 15",
    brand: "Electro-Voice",
    usage: "Sonorisation",
    description: "Enceintes adaptées aux salles et événements nécessitant un son clair et puissant.",
    image: "/images/conception/Electro-Voice-EKX-15.webp",
    icon: Speaker,
  },
  {
    name: "Mackie Thump 15 BST",
    brand: "Mackie",
    usage: "Renfort sonore",
    description: "Solution polyvalente pour cocktails, discours, petites salles et configurations mobiles.",
    image: "/images/conception/Mackie-Thump-15-BST.webp",
    icon: Speaker,
  },
  {
    name: "Shure SLX-D",
    brand: "Shure",
    usage: "Micro discours",
    description: "Micro sans fil fiable pour cérémonies, discours, animations et prises de parole.",
    image: "/images/conception/image.webp",
    icon: Mic2,
  },
  {
    name: "Soundcraft UI 16",
    brand: "Soundcraft",
    usage: "Gestion du son",
    description: "Console numérique pour gérer plusieurs micros, sources audio et interventions.",
    image: "/images/conception/Soundcraft-UI-16.webp",
    icon: Wrench,
  },
];

const reassurance = [
  "Matériel utilisé selon les besoins de votre événement",
  "Installation propre et adaptée au lieu",
  "Réglages réalisés avant l'arrivée des invités",
  "Location possible ou intégration dans une prestation complète",
];

export function RentalPage() {
  return (
    <div className="bg-night-950 text-ivory">
      <section className="relative min-h-[760px] overflow-hidden px-4 py-20 sm:px-6 lg:px-8">
        <div className="absolute inset-0 bg-night-950" aria-hidden="true" />
        <img
          src="/images/conception/image-loc.webp"
          alt=""
          className="absolute inset-0 h-full w-full scale-110 object-cover object-center opacity-18 blur-sm"
          aria-hidden="true"
        />
        <img
          src="/images/conception/image-loc.webp"
          alt=""
          className="absolute inset-0 h-full w-full object-contain object-center opacity-42"
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-night-950 via-night-950/88 to-night-950/46" />
        <div className="relative mx-auto max-w-7xl">
          <HeroMedia
            src="/images/conception/image-loc.webp"
            alt="Matériel professionnel de sonorisation et régie Fredmusic"
            imageClassName="aspect-[4/3] object-contain p-3"
          />
          <div className="max-w-4xl">
            <Badge>Location & matériel professionnel</Badge>
            <h1 className="mt-5 max-w-4xl font-display text-4xl leading-tight text-ivory sm:text-5xl xl:text-6xl">
              Du matériel professionnel pour un son propre et une prestation rassurante
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-ivory/72">
              Fredmusic utilise du matériel de qualité pour adapter le son, la lumière et les micros à votre lieu,
              votre public et les moments importants de votre événement.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <ButtonLink to="/contact" className="w-full sm:w-auto" showArrow>
                Demander un devis
              </ButtonLink>
              <ButtonLink to="/prestations" variant="secondary" className="w-full sm:w-auto" showArrow>
                Voir les prestations
              </ButtonLink>
            </div>
            <div className="mt-6 max-w-2xl">
              <p className="text-xs font-semibold uppercase text-gold-300">Location possible</p>
              <p className="mt-3 leading-7 text-ivory/72">
                Certains équipements peuvent être proposés à la location ou intégrés à une prestation complète selon les
                besoins de votre événement.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-night-900 px-4 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold uppercase text-gold-300">Matériel utilisé</p>
            <h2 className="mt-3 font-display text-4xl leading-tight text-ivory">Une sélection sobre, fiable et adaptée</h2>
          </div>
          <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {equipmentItems.map((item) => {
              const Icon = item.icon;
              return (
                <Card key={item.name} className="overflow-hidden">
                  <img src={item.image} alt={`${item.name} utilisé pour ${item.usage.toLowerCase()}`} className="aspect-[4/3] w-full object-cover" loading="lazy" />
                  <div className="p-6">
                    <Icon className="h-7 w-7 text-gold-300" aria-hidden="true" />
                    <p className="mt-5 text-xs font-semibold uppercase text-gold-300">{item.brand} · {item.usage}</p>
                    <h3 className="mt-2 font-display text-2xl text-ivory">{item.name}</h3>
                    <p className="mt-3 text-sm leading-6 text-ivory/68">{item.description}</p>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-night-950 px-4 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.38fr_0.62fr] lg:items-center">
          <div>
            <p className="text-xs font-semibold uppercase text-gold-300">Preuve de qualité</p>
            <h2 className="mt-4 font-display text-4xl leading-tight text-ivory">
              Le bon matériel, seulement quand il apporte quelque chose
            </h2>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {reassurance.map((item) => (
              <div key={item} className="flex items-center gap-3 rounded-md border border-white/[0.07] bg-white/[0.03] p-4 text-sm text-ivory/76">
                <Check className="h-5 w-5 shrink-0 text-gold-300" aria-hidden="true" />
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        title="Besoin d'une solution son, lumière ou micro ?"
        description="Expliquez-nous votre lieu, votre jauge et le type de prestation souhaitée."
        primaryLabel="Demander un devis"
        primaryTo="/contact"
        secondaryLabel="Voir les prestations"
        secondaryTo="/prestations"
      />
    </div>
  );
}
