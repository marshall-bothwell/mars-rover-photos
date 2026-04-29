'use client';

import RoverSelector from '@/components/search/rover-selector';
import DateSelector from '@/components/search/date-selector';
import { Card, CardContent } from '@/components/ui/card';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { ManifestDatesCollection, Rover } from '@/lib/types';

interface SearchFormProps {
    manifestDates: ManifestDatesCollection;
}

export default function SearchForm({ manifestDates }: SearchFormProps) {
    const searchParams = useSearchParams();
    const defaultRover = (searchParams.get('rover') as Rover) || 'perseverance';
    const [selectedRover, setSelectedRover] = useState<Rover>(defaultRover);

    const handleRoverChange = (selectedRover: Rover) => {
        setSelectedRover(selectedRover);
    };

    return (
        <Card className="mx-auto mt-8 w-full max-w-lg">
            <CardContent className="pt-6">
                <div className="flex flex-col space-y-6 text-center">

                    <div className="flex flex-col space-y-2 w-full">
                        <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Rover</p>
                        <RoverSelector selectedRover={selectedRover} handleRoverChange={handleRoverChange} />
                    </div>

                    <div className="flex flex-col space-y-2 w-full">
                        <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Date</p>
                        <DateSelector selectedRover={selectedRover} manifestDates={manifestDates} />
                    </div>

                </div>
            </CardContent>
        </Card>
    );
}
