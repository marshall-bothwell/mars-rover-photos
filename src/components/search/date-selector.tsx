"use client";

import { ChangeEventHandler, useState } from 'react';
import { format } from 'date-fns';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { Calendar as CalendarIcon } from 'lucide-react';

export default function DateSelector() {
    const [date, setDate] = useState<Date>();

    let formattedDate = "";

    if (date) {
        formattedDate = format(date, 'y-MM-dd');
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
                        initialFocus 
                    />
                </PopoverContent>
            </Popover>
        </div>
    )
}