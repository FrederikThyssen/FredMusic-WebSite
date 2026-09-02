import { Headphones, ListMusic, Music2, Sparkles, Users } from "lucide-react";
import { ServiceCard } from "../components/cards/ServiceCard";
import { TestimonialCard } from "../components/cards/TestimonialCard";
import { CTASection } from "../components/sections/CTASection";
import { HeroSection } from "../components/sections/HeroSection";
import { SectionHeader } from "../components/sections/SectionHeader";
import { Badge } from "../components/ui/Badge";
import { ButtonLink } from "../components/ui/Button";
import { Card } from "../components/ui/Card";
import { useGoogleReviews } from "../hooks/useGoogleReviews";
import { services } from "../data/services";

const weddingHighlights = [
  { title: "Ouverture de bal", text: "Un moment magique qui vous ressemble.", icon: Music2 },
  { title: "Scénographie lumineuse", text: "Ambiances élégantes et harmonieuses.", icon: Sparkles },
  { title: "Effets & show haut de gamme", text: "Fumée lourde, étincelles et mise en scène.", icon: Sparkles },
  { title: "Accompagnement sur mesure", text: "Écoute, conseils et suivi jusqu'au jour J.", icon: Headphones },
];

const qrFeatures = [
  { title: "Demandes en direct", text: "Vos invités suggèrent leurs titres facilement depuis leur téléphone.", icon: Music2 },
  { title: "Playlist intelligente", text: "Les demandes sont ajoutées à une playlist et triées en live.", icon: ListMusic },
  { title: "Ambiance fluide", text: "Zéro interruption, 100% danse et satisfaction garantie.", icon: Users },
];

const homeGalleryHighlights = [
  {
    id: "home-gallery-regie-privee",
    image: "/images/conception/galerie-evenement-027.webp",
    alt: "Régie DJ Fredmusic face à une réception privée colorée",
  },
  {
    id: "home-gallery-dancefloor",
    image: "/images/conception/galerie-evenement-022.jpg",
    alt: "Piste de danse avec invités et faisceaux lumineux violets et bleus",
  },
  {
    id: "home-gallery-warm-room",
    image: "/images/conception/galerie-evenement-045.jpg",
    alt: "Salle de réception décorée avec guirlandes lumineuses et ambiance chaude",
  },
];

export function HomePage() {
  const featuredServices = services.slice(0, 4);
  const reviewsState = useGoogleReviews();

  return (
    <>
      <HeroSection
        eyebrow="DJ mariage & événementiel premium"
        title="L'expérience DJ premium pour vos événements"
        description="Mariages, soirées privées, entreprises : une ambiance unique, une sonorisation d'exception et une mise en lumière sur mesure."
        image="/images/conception/galerie-evenement-021.webp"
        imageSrcSet="/images/conception/galerie-evenement-021-640w.webp 640w, /images/conception/galerie-evenement-021-960w.webp 960w, /images/conception/galerie-evenement-021-1200w.webp 1200w, /images/conception/galerie-evenement-021.webp 1536w"
        imageAlt="Régie DJ Fredmusic installée face à une salle événementielle chaleureuse"
        imageObjectPosition="center center"
        primaryLabel="Réserver ma date"
        primaryTo="/contact"
        secondaryLabel="Découvrir nos prestations"
        secondaryTo="/prestations"
      />

      <section className="bg-night-900 px-4 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            eyebrow="Nos prestations"
            title="Un service complet pour un événement inoubliable"
            align="center"
          />
          <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {featuredServices.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-warm-100 text-night-950">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-14 sm:px-6 lg:grid-cols-[0.48fr_0.52fr] lg:px-8">
          <div className="flex flex-col justify-center">
            <p className="text-xs font-semibold uppercase text-gold-700">Mariages</p>
            <h2 className="mt-4 max-w-lg font-wedding text-4xl leading-tight sm:text-5xl">
              Votre plus beau jour, notre plus belle mission
            </h2>
            <div className="mt-4 h-px w-12 bg-gold-400" />
            <p className="mt-5 max-w-lg text-sm leading-6 text-night-800">
              Chaque mariage est unique. Nous créons une ambiance sur mesure qui vous ressemble et accompagnons chaque moment clé avec élégance et émotion.
            </p>
            <div className="mt-8 grid gap-5 sm:grid-cols-4">
              {weddingHighlights.map((item) => {
                const Icon = item.icon;
                return (
                  <article key={item.title} className="text-center">
                    <Icon className="mx-auto h-7 w-7 text-gold-400" aria-hidden="true" />
                    <h3 className="mt-3 text-xs font-semibold">{item.title}</h3>
                    <p className="mt-2 text-xs leading-5 text-night-800">{item.text}</p>
                  </article>
                );
              })}
            </div>
            <ButtonLink to="/mariages" variant="weddingPrimary" className="mt-8 w-full sm:w-fit" showArrow>
              Découvrir l'offre mariage
            </ButtonLink>
          </div>
          <div className="min-h-[420px] overflow-hidden rounded-sm bg-white lg:-mr-8">
            <img
              src="/images/conception/galerie-evenement-007.webp"
              alt="Ambiance mariage premium lumineuse avec décor romantique"
              width={1536}
              height={1024}
              className="h-full w-full object-cover"
              loading="lazy"
              decoding="async"
            />
          </div>
        </div>
      </section>

      <section className="bg-night-950 px-4 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.44fr_0.56fr] lg:items-center">
          <div className="min-h-[360px] overflow-hidden rounded-sm border border-white/[0.07] bg-night-900">
            <img
              src="/images/conception/qr-music-request.webp"
              alt="Carte QR code et téléphone Fredmusic pour demander une musique"
              width={1536}
              height={1024}
              className="h-full w-full object-cover"
              loading="lazy"
              decoding="async"
            />
          </div>
          <div>
            <Badge>Technologie & interaction</Badge>
            <h2 className="mt-4 max-w-xl font-display text-4xl text-ivory">Demandez vos titres en un scan</h2>
            <p className="mt-4 max-w-2xl leading-7 text-ivory/70">
              Vos invités scannent le QR code et proposent leurs chansons en quelques secondes, sans interrompre la fête.
            </p>
            <div className="mt-8 grid gap-5 sm:grid-cols-3">
              {qrFeatures.map((feature) => {
                const Icon = feature.icon;
                return (
                  <article key={feature.title}>
                    <Icon className="h-6 w-6 text-gold-300" aria-hidden="true" />
                    <h3 className="mt-4 font-semibold text-ivory">{feature.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-ivory/66">{feature.text}</p>
                  </article>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-night-950 px-4 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.44fr_0.56fr] lg:items-center">
          <div>
            <SectionHeader
              title="Du matériel professionnel pour un rendu exceptionnel"
              description="Un matériel de pointe sélectionné pour offrir le meilleur du son et de la lumière."
            />
            <ul className="mt-8 grid gap-3 text-sm text-ivory/72">
              {["Son haute qualité", "Éclairage intelligent", "Installation discrète et soignée", "Fiabilité et sécurité"].map((item) => (
                <li key={item} className="flex items-center gap-3">
                  <span className="h-1.5 w-1.5 bg-gold-300" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="min-h-[360px] overflow-hidden rounded-sm">
            <img
              src="/images/conception/dj-console-gold.webp"
              alt="Régie DJ professionnelle avec éclairage doré"
              width={1122}
              height={1402}
              className="h-full w-full object-cover"
              loading="lazy"
              decoding="async"
            />
          </div>
        </div>
      </section>

      {reviewsState.status === "success" && reviewsState.reviews.length > 0 ? (
        <section className="border-t border-white/[0.07] bg-night-900 px-4 py-14 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="flex items-center gap-3">
              <p className="text-xs font-semibold uppercase text-gold-300">Avis clients</p>
              <span className="flex items-center gap-1 rounded-full border border-white/10 px-2 py-0.5 text-[10px] font-medium text-ivory/50">
                <svg width="10" height="10" viewBox="0 0 24 24" aria-hidden="true">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Google
              </span>
            </div>
            <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {reviewsState.reviews.slice(0, 3).map((review) => (
                <TestimonialCard
                  key={review.id}
                  testimonial={{
                    id: review.id,
                    author: review.author,
                    quote: review.quote,
                    rating: review.rating,
                    eventType: review.relativeTime,
                  }}
                />
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <section className="border-t border-white/[0.07] bg-night-900 px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-2 lg:items-start">
          <div>
            <p className="text-xs font-semibold uppercase text-gold-300">Galerie</p>
            <div className="mt-4 grid grid-cols-3 gap-3">
              {homeGalleryHighlights.map((item) => (
                <img
                  key={item.id}
                  src={item.image}
                  alt={item.alt}
                  width={1536}
                  height={1024}
                  className="aspect-[4/3] w-full rounded-sm border border-white/[0.07] object-cover"
                  loading="lazy"
                  decoding="async"
                />
              ))}
            </div>
            <ButtonLink to="/galerie" variant="ghost" className="mt-4 w-full px-0 sm:w-auto" showArrow>
              Voir plus de photos
            </ButtonLink>
          </div>
          <Card className="p-6">
            <p className="text-xs font-semibold uppercase text-gold-300">Prêt à créer votre événement ?</p>
            <h2 className="mt-3 font-display text-3xl text-ivory">Discutons de votre projet</h2>
            <p className="mt-4 text-sm leading-6 text-ivory/70">
              Chaque événement commence par une rencontre. Parlons de vos envies et vérifions ensemble une disponibilité.
            </p>
            <ButtonLink to="/contact" variant="primary" className="mt-6" showArrow>
              Demander un devis
            </ButtonLink>
          </Card>
        </div>
      </section>

      <CTASection
        title="Prêt à créer un souvenir inoubliable ?"
        description="Parlons de votre projet et vérifions ensemble la disponibilité de votre date."
        primaryLabel="Demander un devis"
        primaryTo="/contact"
        secondaryLabel="Voir les prestations"
        secondaryTo="/prestations"
      />
    </>
  );
}
