"use client";

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Calendar as CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { Manifest } from '@/lib/types';
import { handleDisabledDays } from '@/lib/utils/handle-disabled-days';

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
    }, [])

    useEffect(() => {
        const updateManifest = async () => {
            const { photo_manifest } = await actions.getManifest(selectedRover)
            setManifest(photo_manifest);
        }

        updateManifest();
    }, [selectedRover])

    const { disabledDays, landingDate, maxDate } = handleDisabledDays(manifest)

    let formattedDate = "";
    let defaultMonth = maxDate

    if (date) {
        formattedDate = format(date, 'y-MM-dd');
        if (date >= landingDate && date <= maxDate) {
            defaultMonth = date;
        }
    }

    return (
        <div className="flex flex-row items-center space-x-4">
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
                        disabled={disabledDays}
                        defaultMonth={defaultMonth}
                        fromDate={landingDate}
                        toDate={maxDate}
                        initialFocus 
                    />
                </PopoverContent>
            </Popover>
            <Button variant="outline" asChild>
                <Link href={`/search?rover=${selectedRover}&date=${formattedDate}&camera=all`}>Search</Link>
            </Button>
        </div>
    )
}