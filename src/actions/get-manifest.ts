"use server";

import { ManifestApiResponse } from '@/lib/types';

export async function getManifest(rover: string | null): Promise<ManifestApiResponse> {
    const response = await fetch(`https://mars-photos-api.fly.dev/manifests/${rover}`, { next: { revalidate: 3600 }});
    const data = response.json()

    return data as Promise<ManifestApiResponse>;
}