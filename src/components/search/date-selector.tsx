'use client';

import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Calendar as CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { ManifestDatesCollection, Rover } from '@/lib/types';

interface DateSelectorProps {
    selectedRover: Rover;
    manifestDates: ManifestDatesCollection;
}

export default function DateSelector({ selectedRover, manifestDates: collection }: DateSelectorProps) {
    const [date, setDate] = useState<Date>();
    const searchParams = useSearchParams();

    useEffect(() => {
        const searchedDate = searchParams.get('date');
        if (searchedDate) {
            setDate(new Date(searchedDate + 'T12:00:00'));
        }
    }, [searchParams]);

    const { enabledDates, landingDate, maxDate } = collection[selectedRover];

    const enabledSet = useMemo(() => new Set(enabledDates), [enabledDates]);

    const disabled = useMemo(
        () => (d: Date) => {
            const y = d.getFullYear();
            const m = String(d.getMonth() + 1).padStart(2, '0');
            const day = String(d.getDate()).padStart(2, '0');
            return !enabledSet.has(`${y}-${m}-${day}`);
        },
        [enabledSet]
    );

    const formattedDate = date ? format(date, 'y-MM-dd') : '';
    const defaultMonth =
        date && date >= landingDate && date <= maxDate ? date : maxDate;

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
                        disabled={disabled}
                        defaultMonth={defaultMonth}
                        hidden={[{ before: landingDate }, { after: maxDate }]}
                        autoFocus
                    />
                </PopoverContent>
            </Popover>
            <Button variant="outline" asChild>
                <Link href={`/search?rover=${selectedRover}&date=${formattedDate}&camera=all`}>
                    Search
                </Link>
            </Button>
        </div>
    );
}