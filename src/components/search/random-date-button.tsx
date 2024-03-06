'use client';

import { Button } from '@/components/ui/button';
import { ManifestDatesCollection, Rover } from '@/lib/types';
import Link from 'next/link';

interface RandomDateButtonProps {
    manifestDates: ManifestDatesCollection;
    rover: Rover;
}

export default function RandomDateButton({ manifestDates, rover }: RandomDateButtonProps) {
    const roverDates = manifestDates[rover];
    const length = roverDates.enabledDates.length;
    const randomizedIndex = Math.floor(Math.random() * length);

    const handleClick = () => {
        console.log(roverDates.enabledDates[randomizedIndex]);
    };

    return (
        <Button variant="outline" asChild>
            <Link href={`/search?rover=${rover}&date=${roverDates.enabledDates[randomizedIndex]}&camera=all`}>
                Search Random Date
            </Link>
        </Button>
    );
}
