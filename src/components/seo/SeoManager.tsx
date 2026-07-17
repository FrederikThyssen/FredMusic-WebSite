import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { seoMetadata, siteUrl } from "../../data/seo.mock";
import type { SeoMetadata } from "../../types";
import { applySeo } from "../../utils/seo";

function resolveSeo(pathname: string): SeoMetadata {
  if (pathname === "/") return seoMetadata.home;
  if (pathname === "/mariages") return seoMetadata.wedding;
  if (pathname === "/evenements" || pathname === "/evenements-prives") return seoMetadata.privateEvents;
  if (pathname === "/evenements-pro") return seoMetadata.professionalEvents;
  if (pathname === "/prestations") return seoMetadata.services;
  if (pathname.startsWith("/prestations/")) {
    return {
      ...seoMetadata.services,
      canonical: `${siteUrl}${pathname}`,
    };
  }
  if (pathname === "/location") return seoMetadata.rental;
  if (pathname.startsWith("/location/")) {
    return {
      ...seoMetadata.rental,
      canonical: `${siteUrl}${pathname}`,
    };
  }
  if (pathname === "/galerie") return seoMetadata.gallery;
  if (pathname === "/demande-musique") return seoMetadata.musicRequest;
  if (pathname === "/contact") return seoMetadata.contact;
  if (pathname === "/mentions-legales") return seoMetadata.legalNotice;
  if (pathname === "/confidentialite") return seoMetadata.privacy;
  if (pathname === "/conditions-utilisation") return seoMetadata.terms;
  if (pathname === "/admin") return seoMetadata.admin;

  return {
    ...seoMetadata.notFound,
    canonical: `${siteUrl}${pathname}`,
  };
}

export function SeoManager() {
  const { pathname } = useLocation();

  useEffect(() => {
    applySeo(resolveSeo(pathname));
  }, [pathname]);

  return null;
}
