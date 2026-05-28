export type EquipmentCategory = "dj" | "sound" | "microphone" | "lighting" | "effects" | "mixing";

export type SeoMetadata = {
  title: string;
  description: string;
  canonical?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  keywords?: string[];
};
