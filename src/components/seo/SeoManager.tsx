import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { equipment } from "../../data/equipment";
import { events } from "../../data/events";
import {
  businessProfile,
  createLocalBusinessStructuredData,
  createOrganizationStructuredData,
  seoMetadata,
  siteName,
  siteUrl,
  toAbsoluteUrl,
} from "../../data/seo";
import { services } from "../../data/services";
import type { SeoMetadata, StructuredData } from "../../types";
import { applySeo } from "../../utils/seo";

function createBreadcrumbStructuredData(items: Array<{ name: string; path: string }>): StructuredData {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${siteUrl}${item.path}`,
    })),
  };
}

function withGlobalStructuredData(metadata: SeoMetadata): SeoMetadata {
  const globalStructuredData = [createOrganizationStructuredData(), createLocalBusinessStructuredData()];
  const pageStructuredData = metadata.structuredData
    ? Array.isArray(metadata.structuredData)
      ? metadata.structuredData
      : [metadata.structuredData]
    : [];

  return {
    ...metadata,
    structuredData: [...globalStructuredData, ...pageStructuredData],
  };
}

function resolveServiceSeo(pathname: string): SeoMetadata | null {
  const slug = pathname.replace("/prestations/", "");
  const service = services.find((item) => item.slug === slug);
  if (!service) return null;

  return withGlobalStructuredData({
    title: `${service.title} | Prestations Fredmusic`,
    description: service.shortDescription,
    canonical: `${siteUrl}${pathname}`,
    ogTitle: `${service.title} | ${siteName}`,
    ogDescription: service.longDescription,
    ogImage: toAbsoluteUrl(service.image),
    ogType: "website",
    keywords: [service.title, service.category, ...service.recommendedFor, "Fredmusic"],
    structuredData: [
      createBreadcrumbStructuredData([
        { name: "Accueil", path: "/" },
        { name: "Prestations", path: "/prestations" },
        { name: service.title, path: pathname },
      ]),
      {
        "@context": "https://schema.org",
        "@type": "Service",
        name: service.title,
        description: service.longDescription,
        serviceType: service.category,
        provider: {
          "@type": "LocalBusiness",
          name: businessProfile.name,
          url: siteUrl,
        },
        areaServed: businessProfile.areaServed,
        image: toAbsoluteUrl(service.image),
        url: `${siteUrl}${pathname}`,
      },
    ],
  });
}

function resolveEquipmentSeo(pathname: string): SeoMetadata | null {
  const slug = pathname.replace("/location/", "");
  const item = equipment.find((entry) => entry.slug === slug) ?? null;
  if (!item) return null;

  return withGlobalStructuredData({
    title: `${item.name} ${item.brand} | Location Fredmusic`,
    description: item.shortDescription,
    canonical: `${siteUrl}${pathname}`,
    ogTitle: `${item.name} | Matériel événementiel Fredmusic`,
    ogDescription: item.longDescription,
    ogImage: toAbsoluteUrl(item.marketingImage),
    ogType: "website",
    keywords: [item.name, item.brand, "location matériel", ...item.recommendedFor],
    structuredData: [
      createBreadcrumbStructuredData([
        { name: "Accueil", path: "/" },
        { name: "Location", path: "/location" },
        { name: item.name, path: pathname },
      ]),
      {
        "@context": "https://schema.org",
        "@type": "Product",
        name: item.name,
        brand: item.brand,
        category: item.category,
        description: item.longDescription,
        image: toAbsoluteUrl(item.marketingImage),
        url: `${siteUrl}${pathname}`,
      },
    ],
  });
}

function resolveEventSeo(pathname: string): SeoMetadata | null {
  const slug = pathname.replace("/evenements/", "");
  const event = events.find((entry) => entry.slug === slug && entry.isPublic);
  if (!event) return null;

  return withGlobalStructuredData({
    title: `${event.title} | Référence événement Fredmusic`,
    description: event.description,
    canonical: `${siteUrl}${pathname}`,
    ogTitle: `${event.title} | ${siteName}`,
    ogDescription: event.ambiance,
    ogImage: toAbsoluteUrl(event.image),
    ogType: "website",
    keywords: [event.type, event.location, "DJ événement", "Fredmusic"],
    structuredData: [
      createBreadcrumbStructuredData([
        { name: "Accueil", path: "/" },
        { name: "Événements privés", path: "/evenements-prives" },
        { name: event.title, path: pathname },
      ]),
      {
        "@context": "https://schema.org",
        "@type": "Event",
        name: event.title,
        description: event.description,
        startDate: event.date,
        eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
        eventStatus: "https://schema.org/EventScheduled",
        image: event.gallery.map((image) => toAbsoluteUrl(image)),
        location: {
          "@type": "Place",
          name: event.location,
          address: {
            "@type": "PostalAddress",
            addressLocality: event.location,
            addressCountry: "FR",
          },
        },
        organizer: {
          "@type": "LocalBusiness",
          name: businessProfile.name,
          url: siteUrl,
          telephone: businessProfile.phone,
          email: businessProfile.email,
        },
        performer: {
          "@type": "Person",
          name: businessProfile.founder,
        },
        url: `${siteUrl}${pathname}`,
      },
    ],
  });
}

function resolveSeo(pathname: string): SeoMetadata {
  if (pathname === "/") return seoMetadata.home;
  if (pathname === "/mariages") return withGlobalStructuredData(seoMetadata.wedding);
  if (pathname === "/evenements") {
    return withGlobalStructuredData({
      ...seoMetadata.privateEvents,
      canonical: `${siteUrl}/evenements-prives`,
      robots: "noindex, follow",
    });
  }
  if (pathname === "/evenements-prives") return withGlobalStructuredData(seoMetadata.privateEvents);
  if (pathname === "/evenements-pro") return withGlobalStructuredData(seoMetadata.professionalEvents);
  if (pathname === "/prestations") return withGlobalStructuredData(seoMetadata.services);
  if (pathname.startsWith("/prestations/")) {
    return resolveServiceSeo(pathname) ?? withGlobalStructuredData({
      ...seoMetadata.notFound,
      canonical: `${siteUrl}${pathname}`,
    });
  }
  if (pathname === "/location") return withGlobalStructuredData(seoMetadata.rental);
  if (pathname.startsWith("/location/")) {
    return resolveEquipmentSeo(pathname) ?? withGlobalStructuredData({
      ...seoMetadata.notFound,
      canonical: `${siteUrl}${pathname}`,
    });
  }
  if (pathname === "/galerie") return withGlobalStructuredData(seoMetadata.gallery);
  if (pathname.startsWith("/evenements/")) {
    return resolveEventSeo(pathname) ?? withGlobalStructuredData({
      ...seoMetadata.notFound,
      canonical: `${siteUrl}${pathname}`,
    });
  }
  if (pathname === "/demande-musique") return withGlobalStructuredData(seoMetadata.musicRequest);
  if (pathname === "/contact") return withGlobalStructuredData(seoMetadata.contact);
  if (pathname === "/mentions-legales") return withGlobalStructuredData(seoMetadata.legalNotice);
  if (pathname === "/confidentialite") return withGlobalStructuredData(seoMetadata.privacy);
  if (pathname === "/conditions-utilisation") return withGlobalStructuredData(seoMetadata.terms);
  if (pathname === "/admin") return withGlobalStructuredData(seoMetadata.admin);

  return withGlobalStructuredData({
    ...seoMetadata.notFound,
    canonical: `${siteUrl}${pathname}`,
  });
}

export function SeoManager() {
  const { pathname } = useLocation();

  useEffect(() => {
    applySeo(resolveSeo(pathname));
  }, [pathname]);

  return null;
}
