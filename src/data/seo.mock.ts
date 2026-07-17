import type { SeoMetadata } from "../types";

const siteUrl = "https://www.fredmusic.fr";
const defaultOgImage = `${siteUrl}/images/conception/424.jpg`;

export const seoMetadata: Record<string, SeoMetadata> = {
  home: {
    title: "Fredmusic | DJ mariage & événementiel premium dans les Hauts-de-France",
    description:
      "Fredmusic crée des expériences DJ, sonorisation et mise en lumière sur mesure pour mariages, soirées privées et événements professionnels.",
    canonical: `${siteUrl}/`,
    ogImage: defaultOgImage,
    keywords: ["DJ mariage", "DJ événementiel", "DJ Hauts-de-France", "sonorisation mariage"],
  },
  wedding: {
    title: "DJ mariage premium | Fredmusic",
    description:
      "Une expérience musicale et lumineuse sur mesure pour votre mariage : cérémonie, vin d'honneur, repas, ouverture de bal et soirée.",
    canonical: `${siteUrl}/mariages`,
    ogImage: `${siteUrl}/images/conception/wedding-sparkles.png`,
    keywords: ["DJ mariage", "animation mariage", "sonorisation mariage", "DJ Arras"],
  },
  privateEvents: {
    title: "DJ pour événements privés | Fredmusic",
    description:
      "Animation DJ pour anniversaires, baptêmes, communions, soirées privées, garden-party et fêtes familiales dans le Pas-de-Calais.",
    canonical: `${siteUrl}/evenements-prives`,
    ogImage: `${siteUrl}/images/conception/image745.png`,
    keywords: ["DJ anniversaire", "DJ soirée privée", "animation événement privé", "DJ Pas-de-Calais"],
  },
  professionalEvents: {
    title: "DJ événements professionnels et publics | Fredmusic",
    description:
      "Sonorisation et animation pour entreprises, associations, collectivités, fêtes publiques, séminaires et soirées professionnelles.",
    canonical: `${siteUrl}/evenements-pro`,
    ogImage: `${siteUrl}/images/conception/IMG_9653.jpeg`,
    keywords: ["DJ entreprise", "sonorisation séminaire", "animation événement professionnel"],
  },
  services: {
    title: "Prestations DJ, sonorisation et effets spéciaux | Fredmusic",
    description:
      "Découvrez les prestations Fredmusic : animation DJ, sonorisation, éclairage scénique, effets spéciaux, fumée lourde, étincelles froides et vidéo.",
    canonical: `${siteUrl}/prestations`,
    ogImage: defaultOgImage,
    keywords: ["animation DJ", "sonorisation", "effets spéciaux", "étincelles froides", "fumée lourde"],
  },
  rental: {
    title: "Location de matériel son & lumière professionnel | Fredmusic",
    description:
      "Location de matériel DJ, sonorisation, micros, lumière et régie avec installation ou technicien pour vos événements.",
    canonical: `${siteUrl}/location`,
    ogImage: `${siteUrl}/images/conception/image-loc.png`,
    keywords: ["location matériel sonorisation", "location matériel DJ", "location matériel lumière"],
  },
  gallery: {
    title: "Galerie photos et vidéos | Fredmusic",
    description:
      "Découvrez les mariages réalisés, événements privés, prestations DJ, ambiances lumineuses et installations Fredmusic.",
    canonical: `${siteUrl}/galerie`,
    ogImage: `${siteUrl}/images/conception/wedding-sparkles.png`,
    keywords: ["galerie DJ", "photos mariage DJ", "événements Fredmusic"],
  },
  contact: {
    title: "Demander un devis DJ | Fredmusic",
    description:
      "Contactez Fredmusic pour une demande de devis DJ mariage, soirée privée, événement professionnel, sonorisation ou prestation complète.",
    canonical: `${siteUrl}/contact`,
    ogImage: defaultOgImage,
    keywords: ["devis DJ", "contact DJ mariage", "DJ Vis-en-Artois", "DJ Arras"],
  },
  musicRequest: {
    title: "Demande de musique | Fredmusic",
    description:
      "Proposez un titre au DJ pendant votre événement grâce à la demande de musique Fredmusic par QR code.",
    canonical: `${siteUrl}/demande-musique`,
    ogImage: `${siteUrl}/images/conception/qr-music-request.png`,
    keywords: ["demande musique QR code", "playlist mariage", "DJ interaction invités"],
  },
};
