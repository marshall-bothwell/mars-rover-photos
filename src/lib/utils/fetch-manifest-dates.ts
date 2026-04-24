import { unstable_cache } from 'next/cache';
import { ManifestApiResponse } from '@/lib/types';

export interface ManifestDates {
    enabledDates: string[];
    landingDate: Date;
    maxDate: Date;
}

const fallback: ManifestDates = {
    enabledDates: [],
    landingDate: new Date(),
    maxDate: new Date(),
};

async function fetchManifestDatesUncached(rover: string | null): Promise<ManifestDates> {
    if (!rover) return fallback;

    let manifest: ManifestApiResponse['photo_manifest'] | undefined;

    try {
        const response = await fetch(
            `https://mars-photos-api.fly.dev/manifests/${encodeURIComponent(rover)}`,
            { next: { revalidate: 3600 } }
        );

        if (!response.ok) {
            console.error(`API returned ${response.status} for rover "${rover}"`);
            return fallback;
        }

        const data = (await response.json()) as ManifestApiResponse;
        manifest = data.photo_manifest;
    } catch (err) {
        console.error('Failed to fetch Mars rover manifest:', err);
        return fallback;
    }

    if (!manifest) return fallback;

    const enabledDates = Array.from(new Set(manifest.photos.map((p) => p.earth_date)));

    return {
        enabledDates,
        landingDate: new Date(manifest.landing_date + 'T12:00:00'),
        maxDate: new Date(manifest.max_date + 'T12:00:00'),
    };
}

export const fetchManifestDates = unstable_cache(
    fetchManifestDatesUncached,
    ['manifest-dates'],
    { revalidate: 3600, tags: ['manifest'] }
);