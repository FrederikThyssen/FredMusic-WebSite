import { useMemo, useState } from "react";
import { Camera, Images, Video } from "lucide-react";
import { CTASection } from "../components/sections/CTASection";
import { Badge } from "../components/ui/Badge";

type GalleryCategory = "weddings" | "events" | "videos";
type PhotoGalleryItem = {
  category: Exclude<GalleryCategory, "videos">;
  src: string;
  alt: string;
  title: string;
};

const categories: { id: GalleryCategory; label: string; description: string }[] = [
  {
    id: "weddings",
    label: "Mariages réalisés",
    description: "Ambiances élégantes, moments forts, salles préparées et effets pour les mariages.",
  },
  {
    id: "events",
    label: "Nos différents événements",
    description: "Soirées privées, anniversaires, fêtes familiales, prestations DJ et installations.",
  },
  {
    id: "videos",
    label: "Vidéos",
    description: "Extraits vidéo des ambiances, installations, ouvertures de bal et temps forts.",
  },
];

const weddingPhotos = [
  {
    src: "/images/conception/mariage45.jpg",
    alt: "Mariés entourés d'invités avec étincelles froides en extérieur",
    title: "Temps fort mariage",
  },
  {
    src: "/images/conception/wedding-sparkles.webp",
    alt: "Mariés sur la piste avec étincelles froides et invités autour",
    title: "Ouverture de soirée",
  },
  {
    src: "/images/conception/photo36.webp",
    alt: "Salle de mariage élégante avec décoration florale et tables dressées",
    title: "Salle de réception",
  },
  {
    src: "/images/conception/wedding-room-premium.webp",
    alt: "Salle de mariage premium avec ambiance lumineuse douce",
    title: "Ambiance premium",
  },
  {
    src: "/images/conception/photo566.webp",
    alt: "Moment de mariage avec effets lumineux et ambiance festive",
    title: "Moment festif",
  },
  {
    src: "/images/conception/photo84.webp",
    alt: "Décoration de mariage et mise en lumière chaleureuse",
    title: "Mise en lumière",
  },
  {
    src: "/images/conception/wedding-soft-room.webp",
    alt: "Salle de mariage lumineuse avec décoration douce et tables préparées",
    title: "Décoration de salle",
  },
  {
    src: "/images/conception/photo2.png",
    alt: "Ambiance de mariage avec piste, invités et éclairage chaleureux",
    title: "Ambiance mariage",
  },
  {
    src: "/images/conception/photo45.webp",
    alt: "Moment de mariage animé avec éclairages et invités",
    title: "Soirée de mariage",
  },
  {
    src: "/images/conception/IMG_9319.jpeg",
    alt: "Installation lumineuse préparée pour une réception de mariage",
    title: "Installation mariage",
  },
  {
    src: "/images/conception/IMG_9419.jpeg",
    alt: "Salle décorée pour un mariage avec ambiance lumineuse",
    title: "Salle décorée",
  },
  {
    src: "/images/conception/IMG_9426.jpeg",
    alt: "Réception de mariage avec mise en lumière et décoration",
    title: "Réception élégante",
  },
  {
    src: "/images/conception/IMG_9432.jpeg",
    alt: "Espace de réception de mariage préparé avec soin",
    title: "Espace réception",
  },
  {
    src: "/images/conception/IMG_9477.jpeg",
    alt: "Ambiance lumineuse pour une soirée de mariage",
    title: "Lumière de soirée",
  },
  {
    src: "/images/conception/IMG_9484.jpeg",
    alt: "Mariage avec éclairage d'ambiance et décoration de salle",
    title: "Ambiance élégante",
  },
  {
    src: "/images/conception/IMG_9486.jpeg",
    alt: "Décor de mariage mis en valeur par la lumière",
    title: "Décor lumineux",
  },
  {
    src: "/images/conception/493321499_1222232386579632_1418138987315331829_n.jpg",
    alt: "Photo de mariage avec ambiance de réception et invités",
    title: "Réception mariage",
  },
  {
    src: "/images/conception/493877466_1222232376579633_315128859827922248_n.jpg",
    alt: "Moment de réception de mariage accompagné par Fredmusic",
    title: "Moment de réception",
  },
  {
    src: "/images/conception/503793330_1258607319608805_6810771809969021833_n.jpg",
    alt: "Soirée de mariage avec ambiance festive et éclairage",
    title: "Soirée festive",
  },
  {
    src: "/images/conception/504287699_1256403699829167_181238860985716007_n.jpg",
    alt: "Salle de mariage avec installation DJ et ambiance lumineuse",
    title: "Installation DJ mariage",
  },
].map((item) => ({ ...item, category: "weddings" as const }));

const eventPhotos = [
  {
    src: "/images/conception/image745.webp",
    alt: "Régie DJ face à une salle événementielle avec invités et éclairage",
    title: "Régie en événement",
  },
  {
    src: "/images/conception/22442.jpg",
    alt: "Soirée privée avec piste de danse, tables dressées et jeux de lumière",
    title: "Soirée privée",
  },
  {
    src: "/images/conception/IMG_0437.jpeg",
    alt: "Régie DJ dans une salle en briques avec invités sur la piste",
    title: "Ambiance dansante",
  },
  {
    src: "/images/conception/64img.jpg",
    alt: "Salle préparée pour un anniversaire avec décoration et espace DJ",
    title: "Anniversaire",
  },
  
  {
    src: "/images/conception/gardenparty1.png",
    alt: "Garden-party avec ambiance extérieure et éclairage chaleureux",
    title: "Garden-party",
  },
  
  {
    src: "/images/conception/IMG_8620.jpeg",
    alt: "Salle de réception décorée avec tables rondes et éclairage",
    title: "Réception privée",
  },
  
  {
    src: "/images/conception/private-events-hero-console.jpeg",
    alt: "Régie DJ avec console et éclairages pour un événement privé",
    title: "Régie privée",
  },
  
  {
    src: "/images/conception/IMG_0432.jpeg",
    alt: "Soirée privée avec ambiance lumineuse et espace de danse",
    title: "Ambiance privée",
  },
  {
    src: "/images/conception/IMG_0441.jpeg",
    alt: "Éclairage d'ambiance pour un événement privé",
    title: "Éclairage d'ambiance",
  },
  {
    src: "/images/conception/IMG_8428.jpeg",
    alt: "Événement privé avec installation son et lumière",
    title: "Prestation privée",
  },
  {
    src: "/images/conception/IMG_8430.jpeg",
    alt: "Salle événementielle avec matériel DJ et lumières",
    title: "Salle événementielle",
  },
  {
    src: "/images/conception/IMG_8473.jpeg",
    alt: "Événement professionnel ou public avec installation technique",
    title: "Événement pro",
  },
  {
    src: "/images/conception/IMG_8478.jpeg",
    alt: "Installation son et lumière dans un lieu de réception",
    title: "Installation technique",
  },
  {
    src: "/images/conception/IMG_8484.jpeg",
    alt: "Éclairage et sonorisation pour événement en salle",
    title: "Son et lumière",
  },
  {
    src: "/images/conception/IMG_8492.jpeg",
    alt: "Prestation DJ avec ambiance lumineuse en salle",
    title: "Prestation DJ",
  },
  {
    src: "/images/conception/IMG_9192.JPG",
    alt: "Événement avec invités, piste et éclairage de soirée",
    title: "Ambiance événement",
  },
  {
    src: "/images/conception/IMG_9196.jpeg",
    alt: "Soirée avec régie DJ et éclairage festif",
    title: "Soirée animée",
  },
  {
    src: "/images/conception/IMG_9522.jpeg",
    alt: "Soirée privée avec invités et ambiance DJ",
    title: "Soirée entre invités",
  },
  {
    src: "/images/conception/IMG_9653.jpeg",
    alt: "Événement professionnel avec matériel son et lumière",
    title: "Prestation professionnelle",
  },
  {
    src: "/images/conception/IMG_9656.jpeg",
    alt: "Salle préparée pour événement professionnel ou associatif",
    title: "Événement public",
  },
  {
    src: "/images/conception/IMG_9658.jpeg",
    alt: "Installation technique pour événement professionnel",
    title: "Technique événement",
  },
  {
    src: "/images/conception/IMG_9696.jpeg",
    alt: "Sonorisation et lumière installées pour un événement",
    title: "Sonorisation événement",
  },
  {
    src: "/images/conception/IMG_9703.jpeg",
    alt: "Lieu événementiel préparé avec matériel professionnel",
    title: "Lieu préparé",
  },
  {
    src: "/images/conception/IMG_9711.jpeg",
    alt: "Installation Fredmusic dans un espace événementiel",
    title: "Installation Fredmusic",
  },
  {
    src: "/images/conception/4555.jpg",
    alt: "Soirée à thème avec ambiance lumineuse",
    title: "Soirée à thème",
  },
  {
    src: "/images/conception/event-lighting-room.webp",
    alt: "Salle événementielle avec jeux de lumière et ambiance festive",
    title: "Jeux de lumière",
  },
  {
    src: "/images/conception/salle4.jpg",
    alt: "Salle de réception préparée pour un événement",
    title: "Salle de réception",
  },
  {
    src: "/images/conception/11.jpg",
    alt: "Photo d'événement accompagné par Fredmusic",
    title: "Événement Fredmusic",
  },
  {
    src: "/images/conception/12.jpg",
    alt: "Ambiance de soirée avec installation musicale",
    title: "Ambiance de soirée",
  },
  {
    src: "/images/conception/23.jpg",
    alt: "Moment d'événement avec éclairage et invités",
    title: "Moment événement",
  },
  {
    src: "/images/conception/27.jpg",
    alt: "Photo de réception privée avec ambiance lumineuse",
    title: "Réception en lumière",
  },
  {
    src: "/images/conception/68.jpg",
    alt: "Soirée ou événement familial animé par Fredmusic",
    title: "Événement familial",
  },
  {
    src: "/images/conception/222.jpg",
    alt: "Ambiance événementielle avec éclairage de salle",
    title: "Ambiance lumineuse",
  },
  {
    src: "/images/conception/234.jpg",
    alt: "Photo de soirée événementielle avec prestation DJ",
    title: "Soirée événementielle",
  },
  {
    src: "/images/conception/235.jpg",
    alt: "Salle animée avec lumière et musique",
    title: "Salle animée",
  },
  {
    src: "/images/conception/277.jpg",
    alt: "Prestation événementielle avec ambiance festive",
    title: "Ambiance festive",
  },
  {
    src: "/images/conception/455.jpg",
    alt: "Événement avec installation sonore et lumineuse",
    title: "Installation sonore",
  },
  {
    src: "/images/conception/757.jpg",
    alt: "Ambiance de fête avec éclairage de soirée",
    title: "Ambiance de fête",
  },
  {
    src: "/images/conception/858.jpg",
    alt: "Photo de soirée avec lumières et piste de danse",
    title: "Piste de danse",
  },
  {
    src: "/images/conception/868.jpg",
    alt: "Événement accompagné par Fredmusic avec lumière et son",
    title: "Événement accompagné",
  },
  {
    src: "/images/conception/25242.jpg",
    alt: "Ambiance événementielle avec installation Fredmusic",
    title: "Ambiance événementielle",
  },
  {
    src: "/images/conception/424242.jpg",
    alt: "Soirée animée avec sonorisation et éclairage",
    title: "Soirée animée",
  },
  {
    src: "/images/conception/44545.jpg",
    alt: "Événement avec espace de réception et ambiance lumineuse",
    title: "Espace de réception",
  },
  {
    src: "/images/conception/7475.jpg",
    alt: "Prestation DJ pour événement privé ou public",
    title: "Prestation événement",
  },
  {
    src: "/images/conception/7556.jpg",
    alt: "Ambiance festive avec invités et lumière de soirée",
    title: "Ambiance festive",
  },
].map((item) => ({ ...item, category: "events" as const }));

const galleryItems: PhotoGalleryItem[] = [...weddingPhotos, ...eventPhotos];

const videoItems: { src: string; title: string; description: string; poster?: string }[] = [];

export function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState<GalleryCategory>("weddings");
  const activeCategoryMeta = categories.find((category) => category.id === activeCategory) ?? categories[0];
  const filteredItems = useMemo(
    () => galleryItems.filter((item) => item.category === activeCategory),
    [activeCategory],
  );
  const isVideoCategory = activeCategory === "videos";

  return (
    <div className="bg-night-950 text-ivory">
      <section className="relative overflow-hidden px-4 py-20 sm:px-6 lg:px-8">
        <img
          src="/images/conception/wedding-sparkles.webp"
          alt=""
          className="absolute inset-0 h-full w-full object-cover object-center opacity-34"
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-night-950 via-night-950/88 to-night-950/36" />
        <div className="absolute inset-0 bg-gradient-to-t from-night-950 via-transparent to-night-950" />
        <div className="relative mx-auto max-w-7xl">
          <div className="max-w-4xl">
            <Badge>Galerie</Badge>
            <h1 className="mt-5 max-w-4xl font-display text-4xl leading-tight text-ivory sm:text-5xl xl:text-6xl">
              Quelques ambiances signées Fredmusic
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-ivory/72">
              Découvrez des mariages réalisés et différents événements accompagnés avec son, lumière, animation et
              matériel professionnel.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-night-900 px-4 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <p className="text-xs font-semibold uppercase text-gold-300">
                {isVideoCategory ? "Vidéos" : "Photos"}
              </p>
              <h2 className="mt-3 font-display text-3xl leading-tight text-ivory sm:text-4xl">{activeCategoryMeta.label}</h2>
              <p className="mt-4 leading-7 text-ivory/70">{activeCategoryMeta.description}</p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row" aria-label="Catégories de galerie">
              {categories.map((category) => {
                const isActive = category.id === activeCategory;

                return (
                  <button
                    key={category.id}
                    type="button"
                    className={`w-full rounded-sm border px-4 py-3 text-xs font-semibold uppercase transition sm:w-auto ${
                      isActive
                        ? "border-gold-300 bg-gold-300 text-night-950"
                        : "border-white/[0.09] text-ivory/78 hover:border-gold-300 hover:text-gold-300"
                    }`}
                    onClick={() => setActiveCategory(category.id)}
                  >
                    {category.label}
                  </button>
                );
              })}
            </div>
          </div>

          {isVideoCategory ? (
            videoItems.length > 0 ? (
              <div className="mt-8 grid gap-4 lg:grid-cols-2">
                {videoItems.map((item) => (
                  <figure
                    key={item.src}
                    className="group overflow-hidden rounded-md border border-white/[0.07] bg-night-950"
                  >
                    <video
                      className="aspect-video w-full bg-night-950 object-cover"
                      controls
                      muted
                      playsInline
                      preload="metadata"
                      poster={item.poster}
                    >
                      <source src={item.src} />
                    </video>
                    <figcaption className="border-t border-white/[0.07] px-4 py-4">
                      <span className="flex items-center gap-3 text-sm font-semibold text-ivory">
                        <Video className="h-4 w-4 text-gold-300" aria-hidden="true" />
                        {item.title}
                      </span>
                      <p className="mt-2 text-sm leading-6 text-ivory/64">{item.description}</p>
                    </figcaption>
                  </figure>
                ))}
              </div>
            ) : (
              <div className="mt-8 rounded-md border border-white/[0.07] bg-night-950 px-6 py-8">
                <div className="flex max-w-2xl items-start gap-4">
                  <Video className="mt-1 h-5 w-5 flex-none text-gold-300" aria-hidden="true" />
                  <div>
                    <h3 className="font-display text-2xl text-ivory">Les vidéos seront ajoutées ici</h3>
                    <p className="mt-3 leading-7 text-ivory/68">
                      Ajoutez les fichiers vidéo dans le projet, puis nous les intégrerons dans cette catégorie avec un
                      lecteur propre et responsive.
                    </p>
                  </div>
                </div>
              </div>
            )
          ) : (
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {filteredItems.map((item, index) => (
                <figure
                  key={item.src}
                  className={`group overflow-hidden rounded-md border border-white/[0.07] bg-night-950 ${
                    index === 0 ? "sm:col-span-2" : ""
                  }`}
                >
                  <img
                    src={item.src}
                    alt={item.alt}
                    className="aspect-[4/3] h-full w-full object-cover opacity-88 transition duration-500 group-hover:scale-[1.03] group-hover:opacity-100"
                    loading={index < 2 ? "eager" : "lazy"}
                  />
                  <figcaption className="flex items-center gap-3 border-t border-white/[0.07] px-4 py-3 text-sm text-ivory/74">
                    {activeCategory === "weddings" ? (
                      <Camera className="h-4 w-4 text-gold-300" aria-hidden="true" />
                    ) : (
                      <Images className="h-4 w-4 text-gold-300" aria-hidden="true" />
                    )}
                    {item.title}
                  </figcaption>
                </figure>
              ))}
            </div>
          )}
        </div>
      </section>

      <CTASection
        title="Vous souhaitez une ambiance comme celle-ci ?"
        description="Parlons de votre événement, du lieu et du type d'ambiance que vous voulez créer."
        primaryLabel="Demander un devis"
        primaryTo="/contact"
        secondaryLabel="Voir les prestations"
        secondaryTo="/prestations"
      />
    </div>
  );
}
