import {
  Cake,
  Check,
  GlassWater,
  HeartHandshake,
  Mic2,
  Music2,
  PartyPopper,
  ScanLine,
  Sparkles,
  UsersRound,
} from "lucide-react";
import { CTASection } from "../components/sections/CTASection";
import { Badge } from "../components/ui/Badge";
import { ButtonLink } from "../components/ui/Button";
import { Card } from "../components/ui/Card";

const privateEventTypes = [
  {
    title: "Anniversaires",
    text: "Une soirée festive et personnalisée pour rassembler toutes les générations.",
    icon: Cake,
    image: "/images/conception/64img.jpg",
    alt: "Salle décorée pour un anniversaire avec tables hautes et installation DJ",
  },
  {
    title: "Baptêmes & communions",
    text: "Une animation élégante pour accompagner les moments familiaux.",
    icon: HeartHandshake,
    image: "/images/conception/bateme1.jpg",
    alt: "Salle lumineuse décorée pour un baptême ou une communion",
  },
  {
    title: "Soirées privées",
    text: "Un format sur mesure pour vos invités, votre lieu et votre ambiance.",
    icon: UsersRound,
    image: "/images/conception/IMG_9522.jpeg",
    alt: "Soirée privée avec ambiance lumineuse et espace de réception",
  },
  {
    title: "Soirées à thème",
    text: "Une programmation musicale cohérente avec votre univers.",
    icon: Music2,
    image: "/images/conception/4555.jpg",
    alt: "Décoration et éclairage pour une soirée à thème",
  },
  {
    title: "Départs en retraite",
    text: "Un temps fort convivial, bien rythmé et rassurant.",
    icon: GlassWater,
    image: "/images/conception/Fete-depart-en-retraite.jpg",
    alt: "Fête de départ en retraite avec décoration conviviale",
  },
  {
    title: "Garden-party",
    text: "Son, lumière et ambiance pour profiter d'un cadre extérieur.",
    icon: PartyPopper,
    image: "/images/conception/gardenparty1.png",
    alt: "Garden-party avec guirlandes lumineuses et ambiance extérieure",
  },
];

const options = [
  "Animation DJ",
  "Playlist personnalisée",
  "Sonorisation",
  "Micros pour discours",
  "Mise en lumière",
  "Fumée lourde",
  "Étincelles froides",
  "Éclairage d'ambiance",
  "Animation de soirée",
  "QR code musical en option",
];

const gallery = [
 {
    src: "/images/conception/22442.jpg",
    alt: "Soirée privée avec piste de danse, tables dressées et jeux de lumière colorés",
  },

  {
    src: "/images/conception/IMG_0437.jpeg",
    alt: "Régie DJ installée dans une salle en briques avec invités sur la piste de danse",
  },
  
  {
    src: "/images/conception/IMG_8620.jpeg",
    alt: "Salle de réception décorée avec tables rondes et éclairage pour une fête privée",
  },

  {
    src: "/images/conception/console1.jpeg",
    alt: "Régie DJ face à une soirée privée avec jeux de lumière et invités",
  },

 
  
];

export function EventsPage() {
  return (
    <div className="bg-night-950 text-ivory">
      <section className="relative overflow-hidden px-4 py-20 sm:px-6 lg:px-8">
        <img
          src="/images/conception/image745.png"
          alt=""
          className="absolute inset-0 h-full w-full object-cover object-center opacity-48"
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-night-950 via-night-950/88 to-night-950/42" />
        <div className="absolute inset-0 bg-gradient-to-t from-night-950 via-transparent to-transparent" />
        <div className="relative mx-auto w-full max-w-7xl">
          <div className="max-w-4xl">
            <Badge>Événements privés</Badge>
            <h1 className="mt-5 max-w-4xl font-display text-4xl leading-tight text-ivory sm:text-5xl xl:text-6xl">
              Animez vos événements privés avec une ambiance sur mesure
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-ivory/72">
              Anniversaire, baptême, communion ou soirée entre amis : Fredmusic adapte la musique, la lumière et
              l'animation à votre moment de vie.
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
        </div>
      </section>

      <section className="bg-night-900 px-4 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3">
              <Sparkles className="h-5 w-5 text-gold-300" aria-hidden="true" />
              <p className="text-xs font-semibold uppercase text-gold-300">Ambiance personnalisée</p>
            </div>
            <h2 className="mt-3 font-display text-4xl leading-tight text-ivory">Des formats privés, une vraie présence DJ</h2>
            <p className="mt-4 leading-7 text-ivory/70">
              La prestation est préparée selon votre public, vos goûts musicaux, le lieu, le timing et les temps forts
              que vous voulez marquer.
            </p>
          </div>
          <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {privateEventTypes.map((eventType) => {
              const Icon = eventType.icon;
              return (
                <Card key={eventType.title} className="overflow-hidden p-0">
                  <img
                    src={eventType.image}
                    alt={eventType.alt}
                    className="aspect-[16/10] w-full object-cover"
                    loading="lazy"
                  />
                  <div className="p-6">
                    <Icon className="h-7 w-7 text-gold-300" aria-hidden="true" />
                    <h3 className="mt-5 font-display text-2xl text-ivory">{eventType.title}</h3>
                    <p className="mt-3 text-sm leading-6 text-ivory/68">{eventType.text}</p>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-night-950 px-4 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.42fr_0.58fr] lg:items-center">
          <div>
            <p className="text-xs font-semibold uppercase text-gold-300">Son, lumière et animation</p>
            <h2 className="mt-4 font-display text-4xl leading-tight text-ivory">
              Une installation propre pour une soirée fluide
            </h2>
            <p className="mt-5 leading-7 text-ivory/70">
              Fredmusic apporte une solution complète : diffusion sonore adaptée, éclairage d'ambiance, animation micro
              si nécessaire et coordination des moments importants.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              { title: "Musique adaptée", icon: Music2 },
              { title: "Micros pour discours", icon: Mic2 },
              { title: "Éclairage d'ambiance", icon: Sparkles },
              { title: "Demandes QR code", icon: ScanLine },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="rounded-md border border-white/[0.07] bg-white/[0.03] p-5">
                  <Icon className="h-6 w-6 text-gold-300" aria-hidden="true" />
                  <p className="mt-4 font-semibold text-ivory">{item.title}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-night-900 px-4 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.36fr_0.64fr]">
          <div>
            <p className="text-xs font-semibold uppercase text-gold-300">Options possibles</p>
            <h2 className="mt-4 font-display text-4xl text-ivory">À composer selon votre soirée</h2>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {options.map((option) => (
              <div key={option} className="flex items-center gap-3 rounded-md border border-white/[0.07] bg-night-950/58 p-4 text-sm text-ivory/76">
                <Check className="h-5 w-5 shrink-0 text-gold-300" aria-hidden="true" />
                {option}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-night-950 px-4 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {gallery.map((image) => (
              <img
                key={image.src}
                src={image.src}
                alt={image.alt}
                className="aspect-[4/3] w-full rounded-sm border border-white/[0.07] object-cover"
                loading="lazy"
              />
            ))}
          </div>
        </div>
      </section>

      <CTASection
        title="Vous préparez un événement privé ?"
        description="Parlons de votre lieu, de vos invités et de l'ambiance que vous souhaitez créer."
        primaryLabel="Demander un devis"
        primaryTo="/contact"
        secondaryLabel="Voir les prestations"
        secondaryTo="/prestations"
      />
    </div>
  );
}
