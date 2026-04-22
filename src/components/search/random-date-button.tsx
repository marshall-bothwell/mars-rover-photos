'use client';

import { Button } from '@/components/ui/button';
import { ManifestDatesCollection, Rover } from '@/lib/types';
import Link from 'next/link';
import { useState, useEffect } from 'react';

interface RandomDateButtonProps {
    manifestDates: ManifestDatesCollection;
    rover: Rover;
}

export default function RandomDateButton({ manifestDates, rover }: RandomDateButtonProps) {
    const roverDates = manifestDates[rover];
    const length = roverDates.enabledDates.length;
    const [randomDate, setRandomDate] = useState<string | null>(null);

    useEffect(() => {
        const randomizedIndex = Math.floor(Math.random() * length);
        setRandomDate(roverDates.enabledDates[randomizedIndex])
    }, [roverDates.enabledDates])

    if (!randomDate) {
        return (
            <Button variant="outline" disabled>
                Search Random Date
            </Button>
        )
    }

    return (
        <Button variant="outline" asChild>
            <Link href={`/search?rover=${rover}&date=${randomDate}&camera=all`}>
                Search Random Date
            </Link>
        </Button>
    );
}
