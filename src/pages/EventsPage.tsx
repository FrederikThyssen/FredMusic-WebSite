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
  { title: "Anniversaires", text: "Une soirée festive et personnalisée pour rassembler toutes les générations.", icon: Cake },
  { title: "Baptêmes & communions", text: "Une animation élégante pour accompagner les moments familiaux.", icon: HeartHandshake },
  { title: "Soirées privées", text: "Un format sur mesure pour vos invités, votre lieu et votre ambiance.", icon: UsersRound },
  { title: "Soirées à thème", text: "Une programmation musicale cohérente avec votre univers.", icon: Music2 },
  { title: "Départs en retraite", text: "Un temps fort convivial, bien rythmé et rassurant.", icon: GlassWater },
  { title: "Garden-party", text: "Son, lumière et ambiance pour profiter d'un cadre extérieur.", icon: PartyPopper },
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
    src: "/images/conception/event-lighting-room.png",
    alt: "Salle événementielle avec mise en lumière premium pour une soirée privée",
  },
  {
    src: "/images/conception/photo566.png",
    alt: "Invités réunis en extérieur autour des mariés avec effets étincelles",
  },
  {
    src: "/images/conception/dj-console-gold.png",
    alt: "Régie DJ professionnelle avec éclairage doré",
  },
];

export function EventsPage() {
  return (
    <div className="bg-night-950 text-ivory">
      <section className="relative overflow-hidden px-4 py-20 sm:px-6 lg:px-8">
        <img
          src="/images/conception/event-lighting-room.png"
          alt=""
          className="absolute inset-0 h-full w-full object-cover opacity-34"
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-night-950 via-night-950/88 to-night-950/48" />
        <div className="relative mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.56fr_0.44fr] lg:items-end">
          <div>
            <Badge>Événements privés</Badge>
            <h1 className="mt-5 max-w-4xl font-display text-5xl leading-tight text-ivory sm:text-6xl">
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
          <Card className="p-6">
            <p className="text-xs font-semibold uppercase text-gold-300">Ambiance personnalisée</p>
            <p className="mt-4 leading-7 text-ivory/72">
              La prestation est préparée selon votre public, vos goûts musicaux, le lieu, le timing et les temps forts
              que vous voulez marquer.
            </p>
          </Card>
        </div>
      </section>

      <section className="bg-night-900 px-4 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold uppercase text-gold-300">Moments de vie</p>
            <h2 className="mt-3 font-display text-4xl leading-tight text-ivory">Des formats privés, une vraie présence DJ</h2>
          </div>
          <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {privateEventTypes.map((eventType) => {
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
                <div key={item.title} className="border border-white/10 bg-white/[0.03] p-5">
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
              <div key={option} className="flex items-center gap-3 border border-white/10 bg-night-950/58 p-4 text-sm text-ivory/76">
                <Check className="h-5 w-5 shrink-0 text-gold-300" aria-hidden="true" />
                {option}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-night-950 px-4 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-4 md:grid-cols-3">
            {gallery.map((image) => (
              <img
                key={image.src}
                src={image.src}
                alt={image.alt}
                className="aspect-[4/3] w-full border border-white/10 object-cover"
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
