import { ManifestApiResponse } from '@/lib/types';

export async function fetchManifestDates(rover: string | null) {
    const response = await fetch(`https://api.nasa.gov/mars-photos/api/v1/manifests/${rover}?api_key=${process.env.NASA_API_KEY}`, { next: { revalidate: 3600 }});
    const data = response.json() as Promise<ManifestApiResponse>;
    const { photo_manifest: manifest } = await data;

    let disabledDays: ({from: Date, to: Date} | Date)[] = [];
    let landingDate = new Date();
    let maxDate = new Date();
    
    if (manifest) {
        landingDate = new Date(manifest.landing_date+"T12:00:00")
        maxDate = new Date(manifest.max_date+"T12:00:00")
        let manifestIter = 0;

        for ( let iter = new Date(manifest.landing_date+'T12:00:00'); iter < new Date(manifest.max_date); iter.setDate(iter.getDate() + 1) ) {
            if (iter.toISOString().split('T')[0] === manifest.photos[manifestIter].earth_date) {
                manifestIter += 1;
            } else {
                disabledDays.unshift(new Date(iter));
            }
        }
    }
    return { disabledDays, landingDate, maxDate };

    
}