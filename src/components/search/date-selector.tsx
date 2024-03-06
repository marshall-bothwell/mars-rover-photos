'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Calendar as CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { ManifestDates, ManifestDatesCollection, Rover } from '@/lib/types';

interface DateSelectorProps {
    selectedRover: Rover;
    manifestDates: ManifestDatesCollection;
}

export default function DateSelector({ selectedRover, manifestDates: collection }: DateSelectorProps) {
    const [date, setDate] = useState<Date>();
    const [manifestDates, setManifestDates] = useState<ManifestDates>();
    const searchParams = useSearchParams();

    useEffect(() => {
        const searchedDate = searchParams.get('date');

        if (searchedDate) {
            setDate(new Date(searchedDate + 'T12:00:00'));
        }
    }, [searchParams]);

    useEffect(() => {
        setManifestDates(collection[selectedRover]);
    }, [selectedRover]);

    let formattedDate = '';
    let defaultMonth = manifestDates?.maxDate;

    if (date && manifestDates) {
        formattedDate = format(date, 'y-MM-dd');
        if (date >= manifestDates.landingDate && date <= manifestDates.maxDate) {
            defaultMonth = date;
        }
    }

    return (
        <div className="flex flex-row items-center space-x-4">
            <input name="date" value={formattedDate} type="hidden" />
            <Popover>
                <PopoverTrigger asChild>
                    <Button variant={'outline'}>
                        <CalendarIcon />
                        {date ? format(date, 'PPP') : <span>Pick a date</span>}
                    </Button>
                </PopoverTrigger>

                <PopoverContent className="w-auto">
                    <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        disabled={manifestDates?.disabledDays}
                        defaultMonth={defaultMonth}
                        fromDate={manifestDates?.landingDate}
                        toDate={manifestDates?.maxDate}
                        initialFocus
                    />
                </PopoverContent>
            </Popover>
            <Button variant="outline" asChild>
                <Link href={`/search?rover=${selectedRover}&date=${formattedDate}&camera=all`}>Search</Link>
            </Button>
        </div>
    );
}
