"use client";

import RoverSelector from '@/components/search/rover-selector';
import DateSelector from '@/components/search/date-selector';
import FormButton from '@/components/common/form-button';
import { useState } from 'react';
import * as actions from '@/actions';

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
            <form action={actions.redirectToSearch}>
                <div className="flex flex-col items-center space-y-4">
                    <RoverSelector currentRover={rover} handleRoverChange={handleRoverChange} />
                    <DateSelector selectedRover={selectedRover}/>
                    <FormButton>Search</FormButton>
                </div>
            </form>
        </div>
    )
}