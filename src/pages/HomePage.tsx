import { CalendarCheck, Headphones, ListMusic, Music2, ShieldCheck, Sparkles, Users } from "lucide-react";
import { ServiceCard } from "../components/cards/ServiceCard";
import { TestimonialCard } from "../components/cards/TestimonialCard";
import { CTASection } from "../components/sections/CTASection";
import { HeroSection } from "../components/sections/HeroSection";
import { SectionHeader } from "../components/sections/SectionHeader";
import { Badge } from "../components/ui/Badge";
import { ButtonLink } from "../components/ui/Button";
import { Card } from "../components/ui/Card";
import { useAppStore } from "../store/useAppStore";

const proofItems = [
  { label: "+10 ans", detail: "d'expérience", icon: ShieldCheck },
  { label: "+300", detail: "événements", icon: CalendarCheck },
  { label: "Matériel", detail: "haut de gamme", icon: Headphones },
  { label: "Accompagnement", detail: "sur mesure", icon: Users },
];

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

export function HomePage() {
  const services = useAppStore((state) => state.services);
  const galleryItems = useAppStore((state) => state.galleryItems);
  const testimonials = useAppStore((state) => state.testimonials);

  const featuredServices = services.slice(0, 4);
  const featuredGallery = galleryItems.slice(0, 3);
  const featuredTestimonial = testimonials[0];

  return (
    <>
      <HeroSection
        eyebrow="DJ mariage & événementiel premium"
        title="L'expérience DJ premium pour vos événements"
        description="Mariages, soirées privées, entreprises : une ambiance unique, une sonorisation d'exception et une mise en lumière sur mesure."
        image="/images/conception/event-lighting-room.png"
        imageAlt="Salle événementielle premium avec mise en lumière bleue et dorée"
        primaryLabel="Réserver ma date"
        primaryTo="/contact"
        secondaryLabel="Découvrir nos prestations"
        secondaryTo="/prestations"
      >
        <div className="grid max-w-4xl gap-0 border-y border-white/10 sm:grid-cols-2 lg:grid-cols-4">
          {proofItems.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.label} className="border-white/10 px-5 py-4 sm:border-r">
                <Icon className="h-5 w-5 text-gold-300" aria-hidden="true" />
                <p className="mt-3 text-sm font-semibold text-ivory">{item.label}</p>
                <p className="text-xs uppercase text-ivory/58">{item.detail}</p>
              </div>
            );
          })}
        </div>
      </HeroSection>

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
            <p className="text-xs font-semibold uppercase text-gold-400">Mariages</p>
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
            <ButtonLink to="/mariages" variant="weddingPrimary" className="mt-8 w-fit" showArrow>
              Découvrir l'offre mariage
            </ButtonLink>
          </div>
          <div className="min-h-[420px] overflow-hidden bg-white lg:-mr-8">
            <img
              src="/images/conception/wedding-soft-room.png"
              alt="Ambiance mariage premium lumineuse avec décor romantique"
              className="h-full w-full object-cover"
              loading="lazy"
            />
          </div>
        </div>
      </section>

      <section className="bg-night-950 px-4 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.44fr_0.56fr] lg:items-center">
          <div className="min-h-[360px] overflow-hidden border border-white/10 bg-night-900">
            <img
              src="/images/conception/qr-music-request.png"
              alt="Carte QR code et téléphone Fredmusic pour demander une musique"
              className="h-full w-full object-cover"
              loading="lazy"
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
          <div className="min-h-[360px] overflow-hidden">
            <img
              src="/images/conception/dj-console-gold.png"
              alt="Régie DJ professionnelle avec éclairage doré"
              className="h-full w-full object-cover"
              loading="lazy"
            />
          </div>
        </div>
      </section>

      <section className="border-t border-white/10 bg-night-900 px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.36fr_0.28fr_0.36fr] lg:items-start">
          <div>
            <p className="text-xs font-semibold uppercase text-gold-300">Galerie</p>
            <div className="mt-4 grid grid-cols-3 gap-3">
              {featuredGallery.map((item) => (
                <img
                  key={item.id}
                  src={item.image}
                  alt={item.alt}
                  className="aspect-[4/3] w-full border border-white/10 object-cover"
                  loading="lazy"
                />
              ))}
            </div>
            <ButtonLink to="/galerie" variant="ghost" className="mt-4 px-0" showArrow>
              Voir plus de photos
            </ButtonLink>
          </div>
          {featuredTestimonial ? (
            <div>
              <p className="mb-4 text-xs font-semibold uppercase text-gold-300">Ils nous font confiance</p>
              <TestimonialCard testimonial={featuredTestimonial} />
            </div>
          ) : null}
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
