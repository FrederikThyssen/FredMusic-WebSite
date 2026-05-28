import {
  CalendarHeart,
  Check,
  Gem,
  GlassWater,
  HeartHandshake,
  Music2,
  PartyPopper,
  Sparkles,
  UsersRound,
} from "lucide-react";
import { TestimonialCard } from "../components/cards/TestimonialCard";
import { CTASection } from "../components/sections/CTASection";
import { ButtonLink } from "../components/ui/Button";
import { useAppStore } from "../store/useAppStore";

const weddingMoments = [
  { title: "Cérémonie", detail: "Sonorisation élégante et discrète.", icon: HeartHandshake },
  { title: "Vin d'honneur", detail: "Ambiance chic et progressive.", icon: GlassWater },
  { title: "Repas", detail: "Transitions fluides et interventions maîtrisées.", icon: UsersRound },
  { title: "Ouverture de bal", detail: "Un moment mis en scène avec émotion.", icon: Music2 },
  { title: "Soirée dansante", detail: "Une piste vivante jusqu'au dernier titre.", icon: PartyPopper },
  { title: "Effets premium", detail: "Étincelles, fumée lourde et lumière sur mesure.", icon: Sparkles },
];

const reasons = [
  "Plus de 10 ans d'expérience dans le mariage",
  "Premier rendez-vous et repérage si nécessaire",
  "Accompagnement personnalisé de A à Z",
  "Écoute, conseils et préparation musicale",
  "Matériel professionnel et lumière élégante",
  "Présence soignée et tenue adaptée au jour J",
];

const gallery = [
  {
    src: "/images/conception/photo36.png",
    alt: "Cérémonie de mariage en forêt avec arche fleurie et invités assis",
  },
  {
    src: "/images/conception/wedding-room-premium.png",
    alt: "Salle de mariage préparée avec tables dressées et mise en lumière chaude",
  },
  {
    src: "/images/conception/photo45.png",
    alt: "Réception de mariage dans une grange décorée de guirlandes lumineuses",
  },
];

export function WeddingPage() {
  const testimonials = useAppStore((state) => state.testimonials);
  const weddingTestimonials = testimonials.filter((testimonial) => testimonial.eventType === "Mariage");

  return (
    <div className="bg-warm-100 text-night-950">
      <section className="relative overflow-hidden border-b border-warm-300">
        <div className="absolute inset-y-0 right-0 hidden w-[58%] lg:block">
          <img
            src="/images/conception/wedding-soft-room.png"
            alt="Mariés dans une salle de réception lumineuse avec fumée lourde"
            className="h-full w-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-warm-100 via-warm-100/48 to-warm-100/0" />
          <div className="absolute inset-0 bg-gradient-to-t from-warm-100 via-transparent to-transparent" />
        </div>

        <div className="relative mx-auto grid min-h-[620px] max-w-7xl items-center px-4 py-16 sm:px-6 lg:grid-cols-[0.45fr_0.55fr] lg:px-8">
          <div className="max-w-xl">
            <p className="text-xs font-semibold uppercase text-gold-400">Mariage</p>
            <h1 className="mt-5 font-wedding text-5xl leading-[1.02] text-night-950 sm:text-6xl">
              Votre mariage,
              <span className="block">une histoire unique</span>
            </h1>
            <p className="mt-6 max-w-md text-base leading-7 text-night-800">
              Chaque détail compte pour faire de votre journée un moment inoubliable, élégant et parfaitement orchestré.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <ButtonLink to="#experience" variant="weddingPrimary" showArrow>
                Découvrir l'expérience
              </ButtonLink>
              <ButtonLink to="/contact" variant="weddingSecondary" showArrow>
                Demander un devis
              </ButtonLink>
            </div>
          </div>

          <div className="mt-10 overflow-hidden border border-white bg-white shadow-glow lg:hidden">
            <img
              src="/images/conception/wedding-soft-room.png"
              alt="Mariés dans une salle de réception lumineuse avec fumée lourde"
              className="aspect-[4/3] w-full object-cover object-center"
            />
          </div>
        </div>
      </section>

      <section id="experience" className="border-b border-warm-300 bg-warm-50 px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <p className="font-wedding text-2xl text-night-950">Une expérience sur-mesure</p>
            <div className="mx-auto mt-3 h-px w-16 bg-gold-400" />
          </div>

          <div className="mt-8 grid divide-y divide-warm-300 border-y border-warm-300 sm:grid-cols-2 sm:divide-x sm:divide-y-0 lg:grid-cols-6">
            {weddingMoments.map((moment) => {
              const Icon = moment.icon;
              return (
                <article key={moment.title} className="px-4 py-6 text-center">
                  <Icon className="mx-auto h-6 w-6 text-gold-400" aria-hidden="true" />
                  <h2 className="mt-4 text-sm font-semibold text-night-950">{moment.title}</h2>
                  <p className="mt-2 text-xs leading-5 text-night-800">{moment.detail}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-warm-100 px-4 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.44fr_0.56fr] lg:items-center">
          <div>
            <p className="text-xs font-semibold uppercase text-gold-400">Pourquoi choisir Fredmusic ?</p>
            <h2 className="mt-4 font-wedding text-4xl leading-tight text-night-950">
              Une présence rassurante pour un jour qui ne se rejoue pas
            </h2>
            <ul className="mt-7 grid gap-3">
              {reasons.map((reason) => (
                <li key={reason} className="flex gap-3 text-sm leading-6 text-night-800">
                  <Check className="mt-0.5 h-5 w-5 shrink-0 text-gold-400" aria-hidden="true" />
                  <span>{reason}</span>
                </li>
              ))}
            </ul>
            <ButtonLink to="/contact" variant="weddingSecondary" className="mt-8" showArrow>
              En savoir plus
            </ButtonLink>
          </div>

          <div className="overflow-hidden border border-warm-300 bg-white p-2 shadow-glow">
            <img
              src="/images/conception/photo566.png"
              alt="Mariés accueillis par leurs invités en extérieur avec effets étincelles"
              className="aspect-[16/10] w-full object-cover object-center"
              loading="lazy"
            />
          </div>
        </div>
      </section>

      <section className="bg-white px-4 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 lg:grid-cols-[0.34fr_0.66fr] lg:items-end">
            <div>
              <p className="text-xs font-semibold uppercase text-gold-400">Galerie mariage</p>
              <h2 className="mt-4 font-wedding text-4xl leading-tight text-night-950">
                Des instants élégants, préparés avec précision
              </h2>
              <p className="mt-4 text-sm leading-6 text-night-800">
                Ambiance lumineuse, moments forts, régie discrète : chaque détail est pensé pour servir l'émotion.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-3">
              {gallery.map((image, index) => (
                <img
                  key={image.src}
                  src={image.src}
                  alt={image.alt}
                  className={index === 0 ? "aspect-[4/5] w-full object-cover sm:aspect-[3/4]" : "aspect-[4/5] w-full object-cover sm:aspect-[3/4]"}
                  loading="lazy"
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-warm-100 px-4 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.42fr_0.58fr] lg:items-center">
          <div className="overflow-hidden border border-warm-300 bg-white p-2">
            <img
              src="/images/conception/photo84.png"
              alt="Ouverture de bal des mariés dans une salle élégante avec fumée lourde et éclairage chaleureux"
              className="aspect-[4/3] w-full object-cover object-center"
              loading="lazy"
            />
          </div>
          <div>
            <div className="flex items-center gap-3 text-gold-400">
              <CalendarHeart className="h-6 w-6" aria-hidden="true" />
              <Gem className="h-6 w-6" aria-hidden="true" />
              <Sparkles className="h-6 w-6" aria-hidden="true" />
            </div>
            <h2 className="mt-5 font-wedding text-4xl leading-tight text-night-950">
              Une préparation claire, du premier échange jusqu'au jour J
            </h2>
            <p className="mt-5 max-w-2xl leading-7 text-night-800">
              Nous préparons ensemble les moments importants : cérémonie, entrée en salle, discours, ouverture de bal,
              ambiance repas et soirée dansante. Le résultat reste fluide, élégant et fidèle à votre histoire.
            </p>
          </div>
        </div>
      </section>

      {weddingTestimonials.length > 0 ? (
        <section className="bg-white px-4 py-14 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <p className="text-xs font-semibold uppercase text-gold-400">Témoignages</p>
            <h2 className="mt-4 font-wedding text-4xl text-night-950">Ils nous ont confié leur mariage</h2>
            <div className="mt-8">
              <TestimonialCard testimonial={weddingTestimonials[0]} theme="wedding" />
            </div>
          </div>
        </section>
      ) : null}

      <CTASection
        theme="wedding"
        title="Prêt à imaginer votre soirée de mariage ?"
        description="Parlons de votre date, de votre lieu et de l'ambiance que vous voulez offrir à vos invités."
        primaryLabel="Demander un devis"
        primaryTo="/contact"
        secondaryLabel="Voir les prestations"
        secondaryTo="/prestations"
      />
    </div>
  );
}
