"use client";

import RoverSelector from '@/components/search/rover-selector';
import DateSelector from '@/components/search/date-selector';
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
                <DateSelector selectedRover={selectedRover}/> 
            </div>
        </div>
    )
}