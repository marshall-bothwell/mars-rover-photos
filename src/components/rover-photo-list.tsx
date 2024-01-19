'use client';

import { useSearchParams } from 'next/navigation';

export default function RoverPhotoList() {
    const searchParams = useSearchParams()

    const rover = searchParams.get('rover');
    const date = searchParams.get('date');

    return (
        <div>
            {rover}
            {date}
        </div>
    )
}