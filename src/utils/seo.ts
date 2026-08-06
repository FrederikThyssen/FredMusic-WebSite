import type { SeoMetadata, StructuredData } from "../types";

function upsertMeta(selector: string, attributes: Record<string, string>, value: string) {
  const existing = document.querySelector<HTMLMetaElement>(selector);
  const element = existing ?? document.createElement("meta");

  Object.entries(attributes).forEach(([key, content]) => {
    element.setAttribute(key, content);
  });
  element.setAttribute("content", value);

  if (!existing) {
    document.head.appendChild(element);
  }

  return element;
}

function upsertLink(selector: string, rel: string, href: string) {
  const existing = document.querySelector<HTMLLinkElement>(selector);
  const element = existing ?? document.createElement("link");

  element.setAttribute("rel", rel);
  element.setAttribute("href", href);

  if (!existing) {
    document.head.appendChild(element);
  }
}

function updateStructuredData(structuredData?: StructuredData | StructuredData[]) {
  document.querySelectorAll("script[data-seo-structured='true']").forEach((node) => node.remove());

  if (!structuredData) {
    return;
  }

  const payloads = Array.isArray(structuredData) ? structuredData : [structuredData];
  payloads.forEach((payload) => {
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.dataset.seoStructured = "true";
    script.text = JSON.stringify(payload);
    document.head.appendChild(script);
  });
}

export function applySeo(metadata: SeoMetadata) {
  document.title = metadata.title;

  upsertMeta("meta[name='description']", { name: "description" }, metadata.description);
  upsertMeta("meta[name='robots']", { name: "robots" }, metadata.robots ?? "index, follow");

  if (metadata.canonical) {
    upsertLink("link[rel='canonical']", "canonical", metadata.canonical);
  }

  upsertMeta("meta[property='og:type']", { property: "og:type" }, metadata.ogType ?? "website");
  upsertMeta("meta[property='og:title']", { property: "og:title" }, metadata.ogTitle ?? metadata.title);
  upsertMeta("meta[property='og:description']", { property: "og:description" }, metadata.ogDescription ?? metadata.description);
  upsertMeta("meta[property='og:url']", { property: "og:url" }, metadata.canonical ?? window.location.href);
  if (metadata.ogImage) {
    upsertMeta("meta[property='og:image']", { property: "og:image" }, metadata.ogImage);
  }

  upsertMeta("meta[name='twitter:card']", { name: "twitter:card" }, "summary_large_image");
  upsertMeta("meta[name='twitter:title']", { name: "twitter:title" }, metadata.ogTitle ?? metadata.title);
  upsertMeta("meta[name='twitter:description']", { name: "twitter:description" }, metadata.ogDescription ?? metadata.description);
  if (metadata.ogImage) {
    upsertMeta("meta[name='twitter:image']", { name: "twitter:image" }, metadata.ogImage);
  }

  const keywords = metadata.keywords?.join(", ");
  const keywordsElement = document.querySelector<HTMLMetaElement>("meta[name='keywords']");
  if (keywords && keywordsElement) {
    keywordsElement.content = keywords;
  } else if (keywords) {
    upsertMeta("meta[name='keywords']", { name: "keywords" }, keywords);
  }

  updateStructuredData(metadata.structuredData);
}
