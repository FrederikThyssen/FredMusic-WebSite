import type { SeoMetadata } from "../types";

export const seoMetadata: Record<string, SeoMetadata> = {
  home: {
    title: "Fredmusic | DJ mariage & événementiel premium dans les Hauts-de-France",
    description:
      "Fredmusic crée des expériences DJ, sonorisation et mise en lumière sur mesure pour mariages, soirées privées et événements professionnels.",
    keywords: ["DJ mariage", "DJ événementiel", "DJ Hauts-de-France", "sonorisation mariage"],
  },
  wedding: {
    title: "DJ mariage premium | Fredmusic",
    description:
      "Une expérience musicale et lumineuse sur mesure pour votre mariage : cérémonie, vin d'honneur, repas, ouverture de bal et soirée.",
    keywords: ["DJ mariage", "animation mariage", "sonorisation mariage", "DJ Arras"],
  },
  rental: {
    title: "Location de matériel son & lumière professionnel | Fredmusic",
    description:
      "Location de matériel DJ, sonorisation, micros, lumière et régie avec installation ou technicien pour vos événements.",
    keywords: ["location matériel sonorisation", "location matériel DJ", "location matériel lumière"],
  },
};
