'use client';

import RoverSelector from '@/components/search/rover-selector';
import DateSelector from '@/components/search/date-selector';
import RandomDateButton from '@/components/search/random-date-button';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { ManifestDatesCollection, Rover } from '@/lib/types';

interface SearchFormProps {
    manifestDates: ManifestDatesCollection;
}

//TODO:
//Look at moving DateSelector into SearchForm to eliminate some state
//Stutter when opening the dateSelector, likely due to radix calendar taking time to load with lots of disabled dates

export default function SearchForm({ manifestDates }: SearchFormProps) {
    const searchParams = useSearchParams();
    const defaultRover = (searchParams.get('rover') as Rover) || 'perseverance';
    const [selectedRover, setSelectedRover] = useState<Rover>(defaultRover);

    const handleRoverChange = (selectedRover: Rover) => {
        setSelectedRover(selectedRover);
    };

    return (
        <div className="m-8">
            <div className="flex flex-col items-center space-y-8">
                <RoverSelector defaultRover={defaultRover} handleRoverChange={handleRoverChange} />
                <DateSelector selectedRover={selectedRover} manifestDates={manifestDates} />
                <RandomDateButton rover={selectedRover} manifestDates={manifestDates} />
            </div>
        </div>
    );
}
