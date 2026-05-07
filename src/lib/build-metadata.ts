import type { Metadata } from 'next';

export function buildMetadata(overrides: {
  title: string;
  description: string;
  path: string;
  image?: string;
}): Metadata {
  const url = `https://marsroverphotos.app${overrides.path}`;
  const image = overrides.image ?? '/opengraph-image';
  return {
    title: overrides.title,
    description: overrides.description,
    alternates: { canonical: url },
    openGraph: {
      type: 'website',
      url,
      title: overrides.title,
      description: overrides.description,
      siteName: 'Mars Rover Photos',
      locale: 'en_US',
      images: [{ url: image, width: 1200, height: 630, alt: overrides.title }],
    },
    twitter: {
      card: 'summary_large_image',
      title: overrides.title,
      description: overrides.description,
      images: [{ url: image, alt: overrides.title }],
    },
  };
}