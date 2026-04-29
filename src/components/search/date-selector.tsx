'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Calendar as CalendarIcon, Shuffle } from 'lucide-react';
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
    const { enabledDates } = collection[selectedRover];
    const landingDate = new Date(collection[selectedRover].landingDate);
    const maxDate = new Date(collection[selectedRover].maxDate);
    const [date, setDate] = useState<Date>(maxDate);
    const searchParams = useSearchParams();
    const isMounted = useRef(false);

    useEffect(() => {
        const searchedDate = searchParams.get('date');
        if (searchedDate) {
            setDate(new Date(searchedDate + 'T12:00:00'));
        }
    }, [searchParams]);

    // isMounted ref starts as false, so the selected date is not reset on searches
    // from the home page, only when changing the rover
    useEffect(() => {
        if (!isMounted.current) {
            isMounted.current = true;
            return;
        }
        setDate(new Date(collection[selectedRover].maxDate));
    }, [selectedRover]);

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

    const handleRandomDate = () => {
        const randomIndex = Math.floor(Math.random() * enabledDates.length);
        setDate(new Date(enabledDates[randomIndex] + 'T12:00:00'));
    };

    const formattedDate = format(date, 'y-MM-dd');

    return (
        <div className="flex flex-col items-center w-full gap-2">
            <input name="date" value={formattedDate} type="hidden" />
            <Popover>
                <PopoverTrigger asChild>
                    <Button variant={'outline'}>
                        <CalendarIcon />
                        {format(date, 'PPP')}
                    </Button>
                </PopoverTrigger>

                <PopoverContent className="w-auto">
                    <Calendar
                        key={formattedDate}
                        mode="single"
                        selected={date}
                        onSelect={(d) => { if (d) setDate(d); }}
                        disabled={disabled}
                        defaultMonth={date}
                        startMonth={landingDate}
                        endMonth={maxDate}
                        hidden={[{ before: landingDate }, { after: maxDate }]}
                    />
                    <div className="border-t border-border p-2">
                        <Button variant="ghost" size="sm" className="w-full" onClick={handleRandomDate}>
                            <Shuffle />
                            Random Date
                        </Button>
                    </div>
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
