import type { SeoMetadata } from "../types";

export function applySeo(metadata: SeoMetadata) {
  document.title = metadata.title;

  const description = document.querySelector<HTMLMetaElement>("meta[name='description']");
  if (description) {
    description.content = metadata.description;
  }
}
