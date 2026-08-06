export type Service = {
  id: string;
  title: string;
  slug: string;
  category: string;
  shortDescription: string;
  longDescription: string;
  image: string;
  icon: string;
  benefits: string[];
  recommendedFor: string[];
};

export type EquipmentCategory = "dj" | "sound" | "microphone" | "lighting" | "effects" | "mixing";

export type EquipmentItem = {
  id: string;
  name: string;
  brand: string;
  slug: string;
  category: EquipmentCategory;
  shortDescription: string;
  longDescription: string;
  image: string;
  marketingImage: string;
  keyFeatures: string[];
  recommendedFor: string[];
  availableForRental: boolean;
  availableWithTechnician: boolean;
  installationAvailable: boolean;
  capacity?: string;
  complementaryEquipmentSlugs: string[];
};

export type GalleryCategory =
  | "private-events"
  | "corporate"
  | "lighting"
  | "effects"
  | "equipment";

export type GalleryItem = {
  id: string;
  title: string;
  category: GalleryCategory;
  image: string;
  alt: string;
};

export type Event = {
  id: string;
  slug: string;
  title: string;
  type: string;
  date: string;
  location: string;
  description: string;
  image: string;
  gallery: string[];
  program: string[];
  ambiance: string;
  isPublic: boolean;
  musicRequestsEnabled: boolean;
};

export type Testimonial = {
  id: string;
  author: string;
  eventType: string;
  quote: string;
  rating: 1 | 2 | 3 | 4 | 5;
};

export type RentalPack = {
  id: string;
  title: string;
  slug: string;
  description: string;
  equipmentIds: string[];
  recommendedFor: string;
};

export type StructuredData = Record<string, unknown>;

export type SeoMetadata = {
  title: string;
  description: string;
  canonical?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  ogType?: string;
  robots?: string;
  structuredData?: StructuredData | StructuredData[];
  keywords?: string[];
};
