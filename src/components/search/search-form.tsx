"use client";

import RoverSelector from '@/components/search/rover-selector';
import DateSelector from '@/components/search/date-selector';
import { Suspense } from 'react';
import { useState } from 'react';

interface SearchFormProps {
    rover?: string;
}

export default function SearchForm({ rover }: SearchFormProps) {
    if (rover === undefined) {
        rover = "perseverance";
    }
    const [selectedRover, setSelectedRover] = useState(rover);

    const handleRoverChange = (selectedRover: string) => {
        setSelectedRover(selectedRover);
    }

    return (
        <div className="m-8">
            <div className="flex flex-col items-center space-y-8">
                <RoverSelector currentRover={rover} handleRoverChange={handleRoverChange} />
                <Suspense>
                    <DateSelector selectedRover={selectedRover}/> 
                </Suspense>
            </div>
        </div>
    )
}