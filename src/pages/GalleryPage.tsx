import { Images } from "lucide-react";
import { CTASection } from "../components/sections/CTASection";
import { HeroMedia } from "../components/sections/HeroMedia";
import { Badge } from "../components/ui/Badge";

type PhotoGalleryItem = {
  src: string;
  alt: string;
  title: string;
};

const eventTypes = ["Mariage", "Soirée privée", "Anniversaire", "Garden-party", "Événement professionnel", "Prestation DJ"];

const weddingPhotos = [
  {
    src: "/images/conception/galerie-evenement-001.jpg",
    alt: "Mariés entourés d'invités avec étincelles froides en extérieur",
    title: "Temps fort mariage",
  },
  {
    src: "/images/conception/galerie-evenement-002.webp",
    alt: "Mariés sur la piste avec étincelles froides et invités autour",
    title: "Ouverture de soirée",
  },
  {
    src: "/images/conception/galerie-evenement-003.webp",
    alt: "Salle de mariage élégante avec décoration florale et tables dressées",
    title: "Salle de réception",
  },
  {
    src: "/images/conception/galerie-evenement-004.webp",
    alt: "Salle de mariage premium avec ambiance lumineuse douce",
    title: "Ambiance premium",
  },
  {
    src: "/images/conception/galerie-evenement-005.webp",
    alt: "Moment de mariage avec effets lumineux et ambiance festive",
    title: "Moment festif",
  },
  {
    src: "/images/conception/galerie-evenement-006.webp",
    alt: "Décoration de mariage et mise en lumière chaleureuse",
    title: "Mise en lumière",
  },
  {
    src: "/images/conception/galerie-evenement-007.webp",
    alt: "Salle de mariage lumineuse avec décoration douce et tables préparées",
    title: "Décoration de salle",
  },
  {
    src: "/images/conception/galerie-evenement-008.webp",
    alt: "Ambiance de mariage avec piste, invités et éclairage chaleureux",
    title: "Ambiance mariage",
  },
  {
    src: "/images/conception/galerie-evenement-009.webp",
    alt: "Moment de mariage animé avec éclairages et invités",
    title: "Soirée de mariage",
  },
  {
    src: "/images/conception/galerie-evenement-010.webp",
    alt: "Installation lumineuse préparée pour une réception de mariage",
    title: "Installation mariage",
  },
  {
    src: "/images/conception/galerie-evenement-011.webp",
    alt: "Salle décorée pour un mariage avec ambiance lumineuse",
    title: "Salle décorée",
  },
  {
    src: "/images/conception/galerie-evenement-012.webp",
    alt: "Réception de mariage avec mise en lumière et décoration",
    title: "Réception élégante",
  },
  {
    src: "/images/conception/galerie-evenement-013.webp",
    alt: "Espace de réception de mariage préparé avec soin",
    title: "Espace réception",
  },
  {
    src: "/images/conception/galerie-evenement-014.webp",
    alt: "Ambiance lumineuse pour une soirée de mariage",
    title: "Lumière de soirée",
  },
  {
    src: "/images/conception/galerie-evenement-015.webp",
    alt: "Mariage avec éclairage d'ambiance et décoration de salle",
    title: "Ambiance élégante",
  },
  {
    src: "/images/conception/galerie-evenement-016.webp",
    alt: "Décor de mariage mis en valeur par la lumière",
    title: "Décor lumineux",
  },
  {
    src: "/images/conception/galerie-evenement-017.jpg",
    alt: "Photo de mariage avec ambiance de réception et invités",
    title: "Réception mariage",
  },
  {
    src: "/images/conception/galerie-evenement-018.jpg",
    alt: "Moment de réception de mariage accompagné par Fredmusic",
    title: "Moment de réception",
  },
  {
    src: "/images/conception/galerie-evenement-019.webp",
    alt: "Soirée de mariage avec ambiance festive et éclairage",
    title: "Soirée festive",
  },
  {
    src: "/images/conception/galerie-evenement-020.jpg",
    alt: "Salle de mariage avec installation DJ et ambiance lumineuse",
    title: "Installation DJ mariage",
  },
];

const eventPhotos = [
  {
    src: "/images/conception/galerie-evenement-021.webp",
    alt: "Régie DJ face à une salle événementielle avec invités et éclairage",
    title: "Régie en événement",
  },
  {
    src: "/images/conception/galerie-evenement-022.jpg",
    alt: "Soirée privée avec piste de danse, tables dressées et jeux de lumière",
    title: "Soirée privée",
  },
  {
    src: "/images/conception/galerie-evenement-023.webp",
    alt: "Régie DJ dans une salle en briques avec invités sur la piste",
    title: "Ambiance dansante",
  },
  {
    src: "/images/conception/galerie-evenement-024.webp",
    alt: "Salle préparée pour un anniversaire avec décoration et espace DJ",
    title: "Anniversaire",
  },

  {
    src: "/images/conception/galerie-evenement-025.png",
    alt: "Garden-party avec ambiance extérieure et éclairage chaleureux",
    title: "Garden-party",
  },

  {
    src: "/images/conception/galerie-evenement-026.webp",
    alt: "Salle de réception décorée avec tables rondes et éclairage",
    title: "Réception privée",
  },

  {
    src: "/images/conception/galerie-evenement-027.webp",
    alt: "Régie DJ avec console et éclairages pour un événement privé",
    title: "Régie privée",
  },

  {
    src: "/images/conception/galerie-evenement-028.webp",
    alt: "Soirée privée avec ambiance lumineuse et espace de danse",
    title: "Ambiance privée",
  },
  {
    src: "/images/conception/galerie-evenement-029.webp",
    alt: "Éclairage d'ambiance pour un événement privé",
    title: "Éclairage d'ambiance",
  },
  {
    src: "/images/conception/galerie-evenement-030.webp",
    alt: "Événement privé avec installation son et lumière",
    title: "Prestation privée",
  },
  {
    src: "/images/conception/galerie-evenement-031.webp",
    alt: "Salle événementielle avec matériel DJ et lumières",
    title: "Salle événementielle",
  },
  {
    src: "/images/conception/galerie-evenement-032.webp",
    alt: "Événement professionnel ou public avec installation technique",
    title: "Événement pro",
  },
  {
    src: "/images/conception/galerie-evenement-033.webp",
    alt: "Installation son et lumière dans un lieu de réception",
    title: "Installation technique",
  },
  {
    src: "/images/conception/galerie-evenement-034.webp",
    alt: "Éclairage et sonorisation pour événement en salle",
    title: "Son et lumière",
  },
  {
    src: "/images/conception/galerie-evenement-035.webp",
    alt: "Prestation DJ avec ambiance lumineuse en salle",
    title: "Prestation DJ",
  },
  {
    src: "/images/conception/galerie-evenement-036.webp",
    alt: "Événement avec invités, piste et éclairage de soirée",
    title: "Ambiance événement",
  },
  {
    src: "/images/conception/galerie-evenement-037.webp",
    alt: "Soirée avec régie DJ et éclairage festif",
    title: "Soirée animée",
  },
  {
    src: "/images/conception/galerie-evenement-038.webp",
    alt: "Soirée privée avec invités et ambiance DJ",
    title: "Soirée entre invités",
  },
  {
    src: "/images/conception/galerie-evenement-039.webp",
    alt: "Événement professionnel avec matériel son et lumière",
    title: "Prestation professionnelle",
  },
  {
    src: "/images/conception/galerie-evenement-040.webp",
    alt: "Salle préparée pour événement professionnel ou associatif",
    title: "Événement public",
  },
  {
    src: "/images/conception/galerie-evenement-041.webp",
    alt: "Installation technique pour événement professionnel",
    title: "Technique événement",
  },
  {
    src: "/images/conception/galerie-evenement-042.webp",
    alt: "Sonorisation et lumière installées pour un événement",
    title: "Sonorisation événement",
  },
  {
    src: "/images/conception/galerie-evenement-043.webp",
    alt: "Lieu événementiel préparé avec matériel professionnel",
    title: "Lieu préparé",
  },
  {
    src: "/images/conception/galerie-evenement-044.webp",
    alt: "Installation Fredmusic dans un espace événementiel",
    title: "Installation Fredmusic",
  },
  {
    src: "/images/conception/galerie-evenement-045.jpg",
    alt: "Soirée à thème avec ambiance lumineuse",
    title: "Soirée à thème",
  },
  {
    src: "/images/conception/galerie-evenement-046.webp",
    alt: "Salle événementielle avec jeux de lumière et ambiance festive",
    title: "Jeux de lumière",
  },
  {
    src: "/images/conception/galerie-evenement-047.jpg",
    alt: "Salle de réception préparée pour un événement",
    title: "Salle de réception",
  },
  {
    src: "/images/conception/galerie-evenement-048.jpg",
    alt: "Photo d'événement accompagné par Fredmusic",
    title: "Événement Fredmusic",
  },
  {
    src: "/images/conception/galerie-evenement-049.jpg",
    alt: "Ambiance de soirée avec installation musicale",
    title: "Ambiance de soirée",
  },
  {
    src: "/images/conception/galerie-evenement-050.jpg",
    alt: "Moment d'événement avec éclairage et invités",
    title: "Moment événement",
  },
  {
    src: "/images/conception/galerie-evenement-051.jpg",
    alt: "Photo de réception privée avec ambiance lumineuse",
    title: "Réception en lumière",
  },
  {
    src: "/images/conception/galerie-evenement-052.jpg",
    alt: "Soirée ou événement familial animé par Fredmusic",
    title: "Événement familial",
  },
  {
    src: "/images/conception/galerie-evenement-053.jpg",
    alt: "Ambiance événementielle avec éclairage de salle",
    title: "Ambiance lumineuse",
  },
  {
    src: "/images/conception/galerie-evenement-054.jpg",
    alt: "Photo de soirée événementielle avec prestation DJ",
    title: "Soirée événementielle",
  },
  {
    src: "/images/conception/galerie-evenement-055.jpg",
    alt: "Salle animée avec lumière et musique",
    title: "Salle animée",
  },
  {
    src: "/images/conception/galerie-evenement-056.jpg",
    alt: "Prestation événementielle avec ambiance festive",
    title: "Ambiance festive",
  },
  {
    src: "/images/conception/galerie-evenement-057.jpg",
    alt: "Événement avec installation sonore et lumineuse",
    title: "Installation sonore",
  },
  {
    src: "/images/conception/galerie-evenement-058.jpg",
    alt: "Ambiance de fête avec éclairage de soirée",
    title: "Ambiance de fête",
  },
  {
    src: "/images/conception/galerie-evenement-059.jpg",
    alt: "Photo de soirée avec lumières et piste de danse",
    title: "Piste de danse",
  },
  {
    src: "/images/conception/galerie-evenement-060.jpg",
    alt: "Événement accompagné par Fredmusic avec lumière et son",
    title: "Événement accompagné",
  },
  {
    src: "/images/conception/galerie-evenement-061.jpg",
    alt: "Ambiance événementielle avec installation Fredmusic",
    title: "Ambiance événementielle",
  },
  {
    src: "/images/conception/galerie-evenement-062.jpg",
    alt: "Soirée animée avec sonorisation et éclairage",
    title: "Soirée animée",
  },
  {
    src: "/images/conception/galerie-evenement-063.jpg",
    alt: "Événement avec espace de réception et ambiance lumineuse",
    title: "Espace de réception",
  },
  {
    src: "/images/conception/galerie-evenement-064.jpg",
    alt: "Prestation DJ pour événement privé ou public",
    title: "Prestation événement",
  },
  {
    src: "/images/conception/galerie-evenement-065.jpg",
    alt: "Ambiance festive avec invités et lumière de soirée",
    title: "Ambiance festive",
  },
];

const hiddenGalleryImages = new Set([
  "/images/conception/galerie-evenement-002.webp",
  "/images/conception/galerie-evenement-007.webp",
  "/images/conception/galerie-evenement-008.webp",
  "/images/conception/galerie-evenement-011.webp",
  "/images/conception/galerie-evenement-013.webp",
  "/images/conception/galerie-evenement-015.webp",
  "/images/conception/galerie-evenement-017.jpg",
  "/images/conception/galerie-evenement-018.jpg",
  "/images/conception/galerie-evenement-028.webp",
  "/images/conception/galerie-evenement-041.webp",
  "/images/conception/galerie-evenement-044.webp",
  "/images/conception/galerie-evenement-046.webp",
  "/images/conception/galerie-evenement-047.jpg",
  "/images/conception/galerie-evenement-048.jpg",
]);
const featuredGalleryImage = "/images/conception/galerie-evenement-027.webp";

const galleryItems: PhotoGalleryItem[] = [...weddingPhotos, ...eventPhotos]
  .filter((item) => !hiddenGalleryImages.has(item.src))
  .sort((a, b) => {
    if (a.src === featuredGalleryImage) return -1;
    if (b.src === featuredGalleryImage) return 1;
    return 0;
  });

export function GalleryPage() {
  return (
    <div className="bg-night-950 text-ivory">
      <section className="relative overflow-hidden px-4 py-20 sm:px-6 lg:px-8">
        <img
          src="/images/conception/galerie-evenement-002.webp"
          alt=""
          className="absolute inset-0 hidden h-full w-full object-cover object-center opacity-34 lg:block"
          aria-hidden="true"
        />
        <div className="absolute inset-0 hidden bg-gradient-to-r from-night-950 via-night-950/88 to-night-950/36 lg:block" />
        <div className="absolute inset-0 hidden bg-gradient-to-t from-night-950 via-transparent to-night-950 lg:block" />
        <div className="relative mx-auto max-w-7xl">
          <HeroMedia
            src="/images/conception/galerie-evenement-002.webp"
            alt="Mariés sur la piste avec étincelles froides et invités autour"
          />
          <div className="max-w-4xl">
            <Badge>Galerie</Badge>
            <h1 className="mt-5 max-w-4xl font-display text-4xl leading-tight text-ivory sm:text-5xl xl:text-6xl">
              Quelques ambiances signées Fredmusic
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-ivory/72">
              Découvrez différents événements réalisés avec son, lumière, animation et matériel professionnel.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-night-900 px-4 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <p className="text-xs font-semibold uppercase text-gold-300">Photos</p>
              <h2 className="mt-3 font-display text-3xl leading-tight text-ivory sm:text-4xl">
                Nos différents événements réalisés
              </h2>
              <p className="mt-4 leading-7 text-ivory/70">
                Une sélection d'ambiances captées lors de mariages, soirées privées, anniversaires, événements
                professionnels et prestations DJ.
              </p>
            </div>

            <ul className="flex flex-wrap gap-2" aria-label="Types d'événements réalisés">
              {eventTypes.map((type) => (
                <li
                  key={type}
                  className="rounded-sm border border-white/[0.09] px-3 py-2 text-xs font-semibold uppercase text-ivory/78"
                >
                  {type}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {galleryItems.map((item, index) => (
              <figure
                key={item.src}
                className={`group overflow-hidden rounded-md border border-white/[0.07] bg-night-950 ${
                  item.src === featuredGalleryImage ? "sm:col-span-2" : ""
                }`}
              >
                <img
                  src={item.src}
                  alt={item.alt}
                  className="aspect-[4/3] h-full w-full object-cover opacity-88 transition duration-500 group-hover:scale-[1.03] group-hover:opacity-100"
                  loading={index < 2 ? "eager" : "lazy"}
                />
                <figcaption className="flex items-center gap-3 border-t border-white/[0.07] px-4 py-3 text-sm text-ivory/74">
                  <Images className="h-4 w-4 text-gold-300" aria-hidden="true" />
                  <span>{item.title}</span>
                </figcaption>
              </figure>
            ))}
          </div>
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
