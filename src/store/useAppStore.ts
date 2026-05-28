import { create } from "zustand";
import { equipment, rentalPacks } from "../data/equipment.mock";
import { events } from "../data/events.mock";
import { galleryItems } from "../data/gallery.mock";
import { services } from "../data/services.mock";
import { testimonials } from "../data/testimonials.mock";
import type {
  EquipmentCategory,
  EquipmentItem,
  Event,
  GalleryItem,
  MusicRequest,
  MusicRequestStatus,
  QuoteRequest,
  QuoteRequestStatus,
  RentalPack,
  RentalRequest,
  RentalRequestStatus,
  Service,
  Testimonial,
} from "../types";

type AppState = {
  services: Service[];
  equipment: EquipmentItem[];
  rentalPacks: RentalPack[];
  events: Event[];
  galleryItems: GalleryItem[];
  testimonials: Testimonial[];
  quoteRequests: QuoteRequest[];
  rentalRequests: RentalRequest[];
  musicRequests: MusicRequest[];
  getServiceBySlug: (slug: string) => Service | undefined;
  getEquipmentBySlug: (slug: string) => EquipmentItem | undefined;
  getEquipmentByCategory: (category: EquipmentCategory) => EquipmentItem[];
  getEventBySlug: (slug: string) => Event | undefined;
  getMusicRequestsByEventId: (eventId: string) => MusicRequest[];
  addQuoteRequest: (request: NewQuoteRequest) => QuoteRequest;
  addRentalRequest: (request: NewRentalRequest) => RentalRequest;
  addMusicRequest: (request: NewMusicRequest) => MusicRequest;
  updateQuoteRequestStatus: (id: string, status: QuoteRequestStatus) => void;
  updateRentalRequestStatus: (id: string, status: RentalRequestStatus) => void;
  updateMusicRequestStatus: (id: string, status: MusicRequestStatus) => void;
};

type NewQuoteRequest = Omit<QuoteRequest, "id" | "status" | "createdAt">;
type NewRentalRequest = Omit<RentalRequest, "id" | "status" | "createdAt">;
type NewMusicRequest = Omit<MusicRequest, "id" | "status" | "createdAt">;

function createId(prefix: string) {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return `${prefix}-${crypto.randomUUID()}`;
  }

  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

function cleanOptional(value: string | undefined) {
  const cleanValue = value?.trim();
  return cleanValue ? cleanValue : undefined;
}

function cleanText(value: string) {
  return value.trim();
}

const initialMusicRequests: MusicRequest[] = [
  {
    id: "music-request-1",
    eventId: "event-claire-thomas",
    guestName: "Invité",
    artist: "Sade",
    songTitle: "Smooth Operator",
    message: "Pour le début de soirée.",
    status: "pending",
    createdAt: "2026-05-20T20:45:00.000Z",
  },
  {
    id: "music-request-2",
    eventId: "event-private-birthday",
    guestName: "Marie",
    artist: "The Weeknd",
    songTitle: "Blinding Lights",
    status: "accepted",
    createdAt: "2026-05-21T18:20:00.000Z",
  },
];

const initialQuoteRequests: QuoteRequest[] = [
  {
    id: "quote-request-1",
    name: "Claire Martin",
    email: "claire.martin@example.com",
    phone: "06 11 22 33 44",
    eventType: "Mariage",
    eventDate: "2026-06-24",
    location: "Arras",
    guestsCount: 140,
    message: "Nous cherchons une prestation complète pour notre mariage.",
    status: "pending",
    createdAt: "2026-05-18T09:30:00.000Z",
  },
];

const initialRentalRequests: RentalRequest[] = [
  {
    id: "rental-request-1",
    name: "Association Horizon",
    email: "contact@horizon.example",
    phone: "03 00 00 00 00",
    equipmentIds: ["equipment-ekx-15", "equipment-shure-slx-d"],
    eventDate: "2026-07-02",
    rentalDuration: "1 journée",
    location: "Douai",
    guestsCount: 220,
    needsInstallation: true,
    needsTechnician: true,
    message: "Besoin d'une solution fiable pour discours et musique d'ambiance.",
    status: "pending",
    createdAt: "2026-05-19T13:10:00.000Z",
  },
];

export const useAppStore = create<AppState>((set, get) => ({
  services,
  equipment,
  rentalPacks,
  events,
  galleryItems,
  testimonials,
  quoteRequests: initialQuoteRequests,
  rentalRequests: initialRentalRequests,
  musicRequests: initialMusicRequests,
  getServiceBySlug: (slug) => get().services.find((service) => service.slug === slug),
  getEquipmentBySlug: (slug) => get().equipment.find((item) => item.slug === slug),
  getEquipmentByCategory: (category) => get().equipment.filter((item) => item.category === category),
  getEventBySlug: (slug) => get().events.find((event) => event.slug === slug),
  getMusicRequestsByEventId: (eventId) =>
    get().musicRequests.filter((request) => request.eventId === eventId),
  addQuoteRequest: (request) => {
    const quoteRequest: QuoteRequest = {
      ...request,
      id: createId("quote"),
      name: cleanText(request.name),
      email: cleanText(request.email),
      phone: cleanOptional(request.phone),
      eventType: cleanText(request.eventType),
      eventDate: cleanText(request.eventDate),
      location: cleanText(request.location),
      message: cleanOptional(request.message),
      status: "pending",
      createdAt: new Date().toISOString(),
    };

    set((state) => ({ quoteRequests: [quoteRequest, ...state.quoteRequests] }));
    return quoteRequest;
  },
  addRentalRequest: (request) => {
    const rentalRequest: RentalRequest = {
      ...request,
      id: createId("rental"),
      name: cleanText(request.name),
      email: cleanText(request.email),
      phone: cleanOptional(request.phone),
      eventDate: cleanText(request.eventDate),
      rentalDuration: cleanText(request.rentalDuration),
      location: cleanText(request.location),
      message: cleanOptional(request.message),
      status: "pending",
      createdAt: new Date().toISOString(),
    };

    set((state) => ({ rentalRequests: [rentalRequest, ...state.rentalRequests] }));
    return rentalRequest;
  },
  addMusicRequest: (request) => {
    const musicRequest: MusicRequest = {
      ...request,
      id: createId("music"),
      guestName: cleanOptional(request.guestName),
      artist: cleanText(request.artist),
      songTitle: cleanText(request.songTitle),
      message: cleanOptional(request.message),
      status: "pending",
      createdAt: new Date().toISOString(),
    };

    set((state) => ({ musicRequests: [musicRequest, ...state.musicRequests] }));
    return musicRequest;
  },
  updateQuoteRequestStatus: (id, status) => {
    set((state) => ({
      quoteRequests: state.quoteRequests.map((request) =>
        request.id === id ? { ...request, status } : request,
      ),
    }));
  },
  updateRentalRequestStatus: (id, status) => {
    set((state) => ({
      rentalRequests: state.rentalRequests.map((request) =>
        request.id === id ? { ...request, status } : request,
      ),
    }));
  },
  updateMusicRequestStatus: (id, status) => {
    set((state) => ({
      musicRequests: state.musicRequests.map((request) =>
        request.id === id ? { ...request, status } : request,
      ),
    }));
  },
}));
