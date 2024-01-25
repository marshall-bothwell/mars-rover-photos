'use server';

import { RoverApiResponse } from '@/lib/types';

export async function searchRoverPhotos(date: string, rover: string): Promise<RoverApiResponse> {
    const response = await fetch(`https://api.nasa.gov/mars-photos/api/v1/rovers/${rover}/photos?earth_date=${date}&api_key=${process.env.NASA_API_KEY}`, { next: { revalidate: 3600 }})

    const data = response.json()

    const remainingRequests = response.headers.get('x-ratelimit-remaining');

    console.log("Searched " + rover + " on " + date + " - Requests Remaining: " + remainingRequests);

    //console.log(response.headers);

    return data as Promise<RoverApiResponse>;
}

