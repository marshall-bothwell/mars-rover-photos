"use server";

import { ManifestApiResponse } from '@/lib/types';

export async function getManifest(rover: string | null): Promise<ManifestApiResponse> {
    const response = await fetch(`https://api.nasa.gov/mars-photos/api/v1/manifests/${rover}?api_key=${process.env.NASA_API_KEY}`, { next: { revalidate: 3600 }});
    const data = response.json()

    return data as Promise<ManifestApiResponse>;
}