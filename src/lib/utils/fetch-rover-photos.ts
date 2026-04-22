import { RoverApiResponse } from '@/lib/types';

export async function fetchRoverPhotos(rover: string, date: string) {
    const response = await fetch(`https://mars-photos-api.fly.dev/rovers/${rover}/photos?earth_date=${date}`, { next: { revalidate: 3600 }})

    const data = response.json()

    //const remainingRequests = response.headers.get('x-ratelimit-remaining');

    return data as Promise<RoverApiResponse>;
}