"use client";

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { format } from 'date-fns';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { Manifest } from '@/lib/types';
import { Calendar as CalendarIcon } from 'lucide-react';
import * as actions from '@/actions';

interface DateSelectorProps {
    selectedRover: string;
}

export default function DateSelector({ selectedRover }: DateSelectorProps) {
    const [date, setDate] = useState<Date>();
    const [manifest, setManifest] = useState<Manifest>();
    const searchParams = useSearchParams();

    useEffect(() => {
        const searchedDate = searchParams.get('date');
        if (searchedDate) {
            setDate(new Date(searchedDate+'T12:00:00'))
        }
    }, [searchParams])

    useEffect(() => {
        const updateManifest = async () => {
            const { photo_manifest } = await actions.getManifest(selectedRover)
            setManifest(photo_manifest);
        }

        updateManifest();

    }, [selectedRover])

    let formattedDate = "";

    if (date) {
        formattedDate = format(date, 'y-MM-dd');
    }

    const handleDisabledDays = (manifest: Manifest | undefined): ({from: Date, to: Date} | Date)[] => {
        let disabledDays: ({from: Date, to: Date} | Date)[] = [];
        if (manifest) {
            let manifestIter = 0;
            for ( let iter = new Date(manifest.landing_date+'T12:00:00'); iter < new Date(manifest.max_date); iter.setDate(iter.getDate() + 1) ) {
                if (iter.toISOString().split('T')[0] === manifest.photos[manifestIter].earth_date) {
                    manifestIter += 1;
                } else {
                    disabledDays.unshift(new Date(iter));
                }
            }
        }
        return disabledDays;
    }

    let landingDate = new Date();
    let maxDate = new Date();

    if (manifest) {
        landingDate = new Date(manifest.landing_date+"T12:00:00")
        maxDate = new Date(manifest.max_date+"T12:00:00")
    }

    return (
        <div>
            <input name="date" value={formattedDate} type="hidden"/>
            <Popover>
                <PopoverTrigger asChild>
                    <Button variant={"outline"}>
                        <CalendarIcon />
                        {date ? format(date, "PPP") : <span>Pick a date</span>}
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto">
                    <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        disabled={handleDisabledDays(manifest)}
                        defaultMonth={maxDate}
                        fromDate={landingDate}
                        toDate={maxDate}
                        initialFocus 
                    />
                </PopoverContent>
            </Popover>
        </div>
    )
}