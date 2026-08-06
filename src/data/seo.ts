import type { SeoMetadata, StructuredData } from "../types";

const siteUrl = "https://www.fredmusic.fr";
const defaultOgImage = `${siteUrl}/images/conception/424.webp`;
const siteName = "Fredmusic";

const businessProfile = {
  name: "Fredmusic",
  founder: "Frédéric Wilkosz",
  phone: "+33 6 48 13 55 56",
  email: "djfredmusic@outlook.fr",
  addressLocality: "Vis-en-Artois",
  postalCode: "62156",
  addressCountry: "FR",
  areaServed: ["Pas-de-Calais", "Nord", "Hauts-de-France", "Arras", "Douai", "Cambrai", "Lille"],
  sameAs: [
    "https://instagram.com/fredmusic",
    "https://facebook.com/fredmusic",
    "https://youtube.com/@fredmusic",
  ],
} as const;

export { businessProfile, defaultOgImage, siteName, siteUrl };

export function toAbsoluteUrl(path: string) {
  if (path.startsWith("http://") || path.startsWith("https://")) {
    return path;
  }

  return `${siteUrl}${path.startsWith("/") ? path : `/${path}`}`;
}

export function createOrganizationStructuredData(): StructuredData {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: businessProfile.name,
    url: siteUrl,
    founder: businessProfile.founder,
    email: businessProfile.email,
    telephone: businessProfile.phone,
    sameAs: businessProfile.sameAs,
    logo: toAbsoluteUrl("/images/conception/logo-du-site.png"),
  };
}

export function createLocalBusinessStructuredData(): StructuredData {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: businessProfile.name,
    image: defaultOgImage,
    url: siteUrl,
    telephone: businessProfile.phone,
    email: businessProfile.email,
    address: {
      "@type": "PostalAddress",
      addressLocality: businessProfile.addressLocality,
      postalCode: businessProfile.postalCode,
      addressCountry: businessProfile.addressCountry,
    },
    areaServed: businessProfile.areaServed,
    sameAs: businessProfile.sameAs,
    priceRange: "EUR",
    serviceType: [
      "DJ mariage",
      "Animation événementielle",
      "Sonorisation",
      "Mise en lumière",
      "Location de matériel",
    ],
  };
}

export function createWebsiteStructuredData(): StructuredData {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteName,
    url: siteUrl,
    inLanguage: "fr-FR",
  };
}

export const seoMetadata: Record<string, SeoMetadata> = {
  home: {
    title: "Fredmusic | DJ mariage & événementiel premium dans les Hauts-de-France",
    description:
      "Fredmusic crée des expériences DJ, sonorisation et mise en lumière sur mesure pour mariages, soirées privées et événements professionnels.",
    canonical: `${siteUrl}/`,
    ogImage: defaultOgImage,
    ogType: "website",
    structuredData: [createOrganizationStructuredData(), createLocalBusinessStructuredData(), createWebsiteStructuredData()],
    keywords: ["DJ mariage", "DJ événementiel", "DJ Hauts-de-France", "sonorisation mariage"],
  },
  wedding: {
    title: "DJ mariage premium | Fredmusic",
    description:
      "Une expérience musicale et lumineuse sur mesure pour votre mariage : cérémonie, vin d'honneur, repas, ouverture de bal et soirée.",
    canonical: `${siteUrl}/mariages`,
    ogImage: `${siteUrl}/images/conception/galerie-evenement-002.webp`,
    ogType: "website",
    keywords: ["DJ mariage", "animation mariage", "sonorisation mariage", "DJ Arras"],
  },
  privateEvents: {
    title: "DJ pour événements privés | Fredmusic",
    description:
      "Animation DJ pour anniversaires, baptêmes, communions, soirées privées, garden-party et fêtes familiales dans le Pas-de-Calais.",
    canonical: `${siteUrl}/evenements-prives`,
    ogImage: `${siteUrl}/images/conception/galerie-evenement-021.webp`,
    ogType: "website",
    keywords: ["DJ anniversaire", "DJ soirée privée", "animation événement privé", "DJ Pas-de-Calais"],
  },
  professionalEvents: {
    title: "DJ événements professionnels et publics | Fredmusic",
    description:
      "Sonorisation et animation pour entreprises, associations, collectivités, fêtes publiques, séminaires et soirées professionnelles.",
    canonical: `${siteUrl}/evenements-pro`,
    ogImage: `${siteUrl}/images/conception/galerie-evenement-039.webp`,
    ogType: "website",
    keywords: ["DJ entreprise", "sonorisation séminaire", "animation événement professionnel"],
  },
  services: {
    title: "Prestations DJ, sonorisation et effets spéciaux | Fredmusic",
    description:
      "Découvrez les prestations Fredmusic : animation DJ, sonorisation, éclairage scénique, effets spéciaux, fumée lourde, étincelles froides et vidéo.",
    canonical: `${siteUrl}/prestations`,
    ogImage: defaultOgImage,
    ogType: "website",
    keywords: ["animation DJ", "sonorisation", "effets spéciaux", "étincelles froides", "fumée lourde"],
  },
  rental: {
    title: "Location de matériel son & lumière professionnel | Fredmusic",
    description:
      "Location de matériel DJ, sonorisation, micros, lumière et régie avec installation ou technicien pour vos événements.",
    canonical: `${siteUrl}/location`,
    ogImage: `${siteUrl}/images/conception/image-loc.webp`,
    ogType: "website",
    keywords: ["location matériel sonorisation", "location matériel DJ", "location matériel lumière"],
  },
  gallery: {
    title: "Galerie photos et vidéos | Fredmusic",
    description:
      "Découvrez les mariages réalisés, événements privés, prestations DJ, ambiances lumineuses et installations Fredmusic.",
    canonical: `${siteUrl}/galerie`,
    ogImage: `${siteUrl}/images/conception/galerie-evenement-002.webp`,
    ogType: "website",
    keywords: ["galerie DJ", "photos mariage DJ", "événements Fredmusic"],
  },
  contact: {
    title: "Demander un devis DJ | Fredmusic",
    description:
      "Contactez Fredmusic pour une demande de devis DJ mariage, soirée privée, événement professionnel, sonorisation ou prestation complète.",
    canonical: `${siteUrl}/contact`,
    ogImage: defaultOgImage,
    ogType: "website",
    keywords: ["devis DJ", "contact DJ mariage", "DJ Vis-en-Artois", "DJ Arras"],
  },
  musicRequest: {
    title: "Demande de musique | Fredmusic",
    description:
      "Proposez un titre au DJ pendant votre événement grâce à la demande de musique Fredmusic par QR code.",
    canonical: `${siteUrl}/demande-musique`,
    ogImage: `${siteUrl}/images/conception/qr-music-request.webp`,
    ogType: "website",
    robots: "noindex, nofollow",
    keywords: ["demande musique QR code", "playlist mariage", "DJ interaction invités"],
  },
  legalNotice: {
    title: "Mentions légales | Fredmusic",
    description:
      "Consultez les mentions légales du site Fredmusic, DJ et prestataire événementiel dans le Pas-de-Calais.",
    canonical: `${siteUrl}/mentions-legales`,
    ogImage: defaultOgImage,
    ogType: "website",
  },
  privacy: {
    title: "Politique de confidentialité | Fredmusic",
    description:
      "Informations sur la gestion des données personnelles collectées via les formulaires du site Fredmusic.",
    canonical: `${siteUrl}/confidentialite`,
    ogImage: defaultOgImage,
    ogType: "website",
  },
  terms: {
    title: "Conditions d'utilisation | Fredmusic",
    description: "Conditions d'utilisation du site Fredmusic et de ses formulaires de contact et demande de musique.",
    canonical: `${siteUrl}/conditions-utilisation`,
    ogImage: defaultOgImage,
    ogType: "website",
  },
  admin: {
    title: "Admin Fredmusic",
    description: "Espace privé Fredmusic pour suivre les demandes de devis et les demandes de musique.",
    canonical: `${siteUrl}/admin`,
    ogImage: defaultOgImage,
    ogType: "website",
    robots: "noindex, nofollow",
  },
  notFound: {
    title: "Page introuvable | Fredmusic",
    description: "La page demandée est introuvable. Revenez à l'accueil Fredmusic.",
    canonical: `${siteUrl}/404`,
    ogImage: defaultOgImage,
    ogType: "website",
    robots: "noindex, nofollow",
  },
};
