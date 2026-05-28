import { CalendarCheck, Headphones, Music2, ShieldCheck, Sparkles, Users } from "lucide-react";
import { EquipmentCard } from "../components/cards/EquipmentCard";
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
  { title: "Ouverture de bal", text: "Un moment préparé avec soin, au rythme de votre histoire.", icon: Music2 },
  { title: "Scénographie lumineuse", text: "Des ambiances chaudes et élégantes pour sublimer le lieu.", icon: Sparkles },
  { title: "Effets premium", text: "Fumée lourde, étincelles et mise en scène des temps forts.", icon: Sparkles },
  { title: "Suivi jour J", text: "Une préparation claire pour une soirée fluide et rassurante.", icon: ShieldCheck },
];

const qrCells = Array.from({ length: 81 }, (_, index) => {
  const row = Math.floor(index / 9);
  const column = index % 9;
  return row < 2 || column < 2 || (row > 5 && column > 5) || [12, 22, 28, 36, 44, 52, 60].includes(index);
});

export function HomePage() {
  const services = useAppStore((state) => state.services);
  const equipment = useAppStore((state) => state.equipment);
  const galleryItems = useAppStore((state) => state.galleryItems);
  const testimonials = useAppStore((state) => state.testimonials);

  const featuredServices = services.slice(0, 4);
  const featuredEquipment = equipment.slice(0, 3);
  const featuredGallery = galleryItems.slice(0, 4);
  const featuredTestimonial = testimonials[0];

  return (
    <>
      <HeroSection
        eyebrow="DJ mariage & événementiel premium"
        title="L'expérience DJ premium pour vos événements"
        description="Mariages, soirées privées et événements professionnels : une ambiance musicale élégante, une sonorisation fiable et une mise en lumière sur mesure."
        image="/images/conception/page-site-principal.png"
        imageAlt="Maquette sombre Fredmusic avec DJ, piste de danse et lumières premium"
        primaryLabel="Réserver ma date"
        primaryTo="/contact"
        secondaryLabel="Découvrir nos prestations"
        secondaryTo="/prestations"
      >
        <div className="grid max-w-4xl gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {proofItems.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.label} className="border border-white/12 bg-night-950/62 p-4 backdrop-blur">
                <Icon className="h-5 w-5 text-gold-300" aria-hidden="true" />
                <p className="mt-3 text-lg font-semibold text-ivory">{item.label}</p>
                <p className="text-xs uppercase text-ivory/58">{item.detail}</p>
              </div>
            );
          })}
        </div>
      </HeroSection>

      <section className="bg-night-900 px-4 py-18 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            eyebrow="Nos prestations"
            title="Un service complet pour un événement inoubliable"
            description="Fredmusic réunit animation DJ, lumière, sonorisation, effets premium et accompagnement technique dans une expérience cohérente."
            align="center"
          />
          <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {featuredServices.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-warm-100 text-night-950">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-18 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
          <div className="flex flex-col justify-center">
            <Badge variant="wedding">Mariages</Badge>
            <h2 className="mt-5 max-w-xl font-wedding text-4xl leading-tight sm:text-5xl">
              Votre plus beau jour, notre plus belle mission
            </h2>
            <p className="mt-5 max-w-xl leading-7 text-night-800">
              Chaque mariage est unique. Fredmusic prépare une ambiance sur mesure, du vin d'honneur à la soirée dansante, avec élégance et attention.
            </p>
            <div className="mt-8 grid gap-5 sm:grid-cols-2">
              {weddingHighlights.map((item) => {
                const Icon = item.icon;
                return (
                  <article key={item.title} className="border-l border-warm-400 pl-4">
                    <Icon className="h-6 w-6 text-gold-400" aria-hidden="true" />
                    <h3 className="mt-3 font-semibold">{item.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-night-800">{item.text}</p>
                  </article>
                );
              })}
            </div>
            <ButtonLink to="/mariages" variant="weddingPrimary" className="mt-8 w-fit" showArrow>
              Découvrir l'offre mariage
            </ButtonLink>
          </div>
          <div className="min-h-96 overflow-hidden border border-warm-300 bg-white">
            <img
              src="/images/conception/wedding-reference.png"
              alt="Ambiance mariage premium lumineuse avec décor romantique"
              className="h-full w-full object-cover"
              loading="lazy"
            />
          </div>
        </div>
      </section>

      <section className="bg-night-950 px-4 py-18 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <Card className="grid gap-6 p-6 sm:grid-cols-[180px_1fr] sm:items-center">
            <div className="mx-auto grid h-44 w-44 grid-cols-9 gap-1 border border-white/12 bg-ivory p-4" aria-label="QR code mocké">
              {qrCells.map((isActive, index) => (
                <span key={index} className={isActive ? "bg-night-950" : "bg-transparent"} />
              ))}
            </div>
            <div>
              <Badge>Technologie & interaction</Badge>
              <h2 className="mt-4 font-display text-3xl text-ivory">Demandez vos titres en un scan</h2>
              <p className="mt-4 leading-7 text-ivory/70">
                Vos invités scannent un QR code, proposent leurs chansons et les demandes remontent dans l'admin mocké pour préparer une playlist fluide.
              </p>
              <ButtonLink to="/demande-musique" variant="secondary" className="mt-6" showArrow>
                Tester la demande musique
              </ButtonLink>
            </div>
          </Card>
          <div className="grid gap-5 sm:grid-cols-3">
            {[
              ["Demandes en direct", "Les invités proposent leurs titres depuis leur téléphone."],
              ["Playlist intelligente", "Les suggestions sont centralisées pour le DJ."],
              ["Ambiance fluide", "La soirée garde son rythme sans interruption."],
            ].map(([title, text]) => (
              <Card key={title} className="p-5">
                <Music2 className="h-6 w-6 text-gold-300" aria-hidden="true" />
                <h3 className="mt-4 font-semibold text-ivory">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-ivory/66">{text}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-night-900 px-4 py-18 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <SectionHeader
              eyebrow="Galerie"
              title="Ambiances réelles, énergie maîtrisée"
              description="Un aperçu de l'univers Fredmusic : mariages, soirées privées, lumière, effets et matériel professionnel."
            />
            <ButtonLink to="/galerie" variant="secondary" showArrow>
              Voir plus de photos
            </ButtonLink>
          </div>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {featuredGallery.map((item) => (
              <article key={item.id} className="group overflow-hidden border border-white/12 bg-night-950">
                <img
                  src={item.image}
                  alt={item.alt}
                  className="aspect-[4/3] w-full object-cover opacity-82 transition duration-500 group-hover:scale-105 group-hover:opacity-100"
                  loading="lazy"
                />
                <div className="p-4">
                  <p className="text-xs font-semibold uppercase text-gold-300">{item.title}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-night-950 px-4 py-18 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
            <div>
              <SectionHeader
                eyebrow="Matériel professionnel"
                title="Un rendu technique fiable, propre et premium"
                description="Sonorisation, régie DJ, micros et mixage : le matériel est choisi selon votre lieu, votre jauge et votre niveau d'accompagnement."
              />
              <ul className="mt-8 grid gap-3 text-sm text-ivory/72">
                {["Son haute qualité", "Éclairage intelligent", "Installation discrète et soignée", "Fiabilité et sécurité"].map((item) => (
                  <li key={item} className="flex items-center gap-3">
                    <span className="h-1.5 w-1.5 bg-gold-300" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
              <ButtonLink to="/location" variant="primary" className="mt-8" showArrow>
                Découvrir la location
              </ButtonLink>
            </div>
            <div className="grid gap-5 md:grid-cols-3">
              {featuredEquipment.map((item) => (
                <EquipmentCard key={item.id} item={item} />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-night-900 px-4 py-18 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
          <SectionHeader
            eyebrow="Ils nous font confiance"
            title="Une présence rassurante, une soirée qui respire"
            description="Le ton Fredmusic reste premium, humain et fiable : exactement ce qu'il faut pour des moments qui comptent."
          />
          {featuredTestimonial ? <TestimonialCard testimonial={featuredTestimonial} /> : null}
        </div>
      </section>

      <CTASection
        eyebrow="Prêt à créer votre événement ?"
        title="Discutons de votre projet"
        description="Chaque événement commence par une rencontre. Parlons de vos envies, de votre lieu et de l'expérience que vous souhaitez offrir."
        primaryLabel="Demander un devis"
        primaryTo="/contact"
        secondaryLabel="Voir les prestations"
        secondaryTo="/prestations"
      />
    </>
  );
}
