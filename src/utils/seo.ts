import type { SeoMetadata } from "../types";

function setMeta(selector: string, attribute: "content" | "href", value?: string) {
  if (!value) return;

  const element = document.querySelector<HTMLMetaElement | HTMLLinkElement>(selector);
  if (element) {
    element.setAttribute(attribute, value);
  }
}

export function applySeo(metadata: SeoMetadata) {
  document.title = metadata.title;

  setMeta("meta[name='description']", "content", metadata.description);
  setMeta("link[rel='canonical']", "href", metadata.canonical);
  setMeta("meta[property='og:title']", "content", metadata.ogTitle ?? metadata.title);
  setMeta("meta[property='og:description']", "content", metadata.ogDescription ?? metadata.description);
  setMeta("meta[property='og:url']", "content", metadata.canonical);
  setMeta("meta[property='og:image']", "content", metadata.ogImage);
  setMeta("meta[name='twitter:title']", "content", metadata.ogTitle ?? metadata.title);
  setMeta("meta[name='twitter:description']", "content", metadata.ogDescription ?? metadata.description);
  setMeta("meta[name='twitter:image']", "content", metadata.ogImage);
}
