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
  | "weddings"
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

export type MusicRequestStatus = "pending" | "accepted" | "played" | "refused";

export type MusicRequest = {
  id: string;
  eventId: string;
  guestName?: string;
  artist: string;
  songTitle: string;
  message?: string;
  status: MusicRequestStatus;
  createdAt: string;
};

export type QuoteRequestStatus = "pending" | "accepted" | "refused";

export type QuoteRequest = {
  id: string;
  name: string;
  email: string;
  phone?: string;
  eventType: string;
  eventDate: string;
  location: string;
  guestsCount?: number;
  message?: string;
  status: QuoteRequestStatus;
  createdAt: string;
};

export type RentalRequestStatus = "pending" | "accepted" | "refused";

export type RentalRequest = {
  id: string;
  name: string;
  email: string;
  phone?: string;
  equipmentIds: string[];
  eventDate: string;
  rentalDuration: string;
  location: string;
  guestsCount?: number;
  needsInstallation: boolean;
  needsTechnician: boolean;
  message?: string;
  status: RentalRequestStatus;
  createdAt: string;
};

export type RentalPack = {
  id: string;
  title: string;
  slug: string;
  description: string;
  equipmentIds: string[];
  recommendedFor: string;
};

export type ContactInfo = {
  phone: string;
  email: string;
  serviceArea: string;
  socialLinks: Array<{
    label: string;
    url: string;
  }>;
};

export type SeoMetadata = {
  title: string;
  description: string;
  canonical?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  keywords?: string[];
};
