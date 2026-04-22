import { ManifestApiResponse } from '@/lib/types';

export async function fetchManifestDates(rover: string | null) {
    const fallback = {
        disabledDays: [] as ({ from: Date; to: Date } | Date)[],
        enabledDates: [] as string[],
        landingDate: new Date(),
        maxDate: new Date(),
    };

    if (!rover) {
        return fallback;
    }

    if (!process.env.NASA_API_KEY) {
        console.error('NASA_API_KEY is not set');
        return fallback;
    }

    let manifest: ManifestApiResponse['photo_manifest'] | undefined;

    try {
        const response = await fetch(
            `https://mars-photos-api.fly.dev/manifests/${encodeURIComponent(rover)}`,
            { next: { revalidate: 3600 } }
        );

        if (!response.ok) {
            console.error(`NASA API returned ${response.status} for rover "${rover}"`);
            return fallback;
        }

        const contentType = response.headers.get('content-type') ?? '';
        if (!contentType.includes('application/json')) {
            console.error(`NASA API returned non-JSON content-type: ${contentType}`);
            return fallback;
        }

        const data = (await response.json()) as ManifestApiResponse;
        manifest = data.photo_manifest;
    } catch (err) {
        console.error('Failed to fetch Mars rover manifest:', err);
        return fallback;
    }

    if (!manifest) {
        return fallback;
    }

    const disabledDays: ({ from: Date; to: Date } | Date)[] = [];
    const enabledDates: string[] = [];
    const landingDate = new Date(manifest.landing_date + 'T12:00:00');
    const maxDate = new Date(manifest.max_date + 'T12:00:00');
    const endDate = new Date(manifest.max_date);

    let manifestIter = 0;

    for (
        const iter = new Date(manifest.landing_date + 'T12:00:00');
        iter < endDate;
        iter.setDate(iter.getDate() + 1)
    ) {
        const currentPhoto = manifest.photos[manifestIter];
        if (!currentPhoto) {
            disabledDays.unshift(new Date(iter));
            continue;
        }

        if (iter.toISOString().split('T')[0] === currentPhoto.earth_date) {
            enabledDates.unshift(currentPhoto.earth_date);
            manifestIter += 1;
        } else {
            disabledDays.unshift(new Date(iter));
        }
    }

    return { disabledDays, landingDate, maxDate, enabledDates };
}