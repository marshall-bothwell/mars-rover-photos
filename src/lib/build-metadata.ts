import type { Metadata } from 'next';

export function buildMetadata(overrides: {
  title: string;
  description: string;
  path: string;
}): Metadata {
  const url = `https://marsroverphotos.app${overrides.path}`;
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
    },
    twitter: {
      card: 'summary_large_image',
      title: overrides.title,
      description: overrides.description,
    },
  };
}