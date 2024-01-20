"use client";

import { useFormStatus } from 'react-dom';
import { Button } from '@/components/ui/button';
import { LoaderIcon } from 'lucide-react';

interface FormButtonProps {
    children: React.ReactNode;
    className?: string;
}

export default function FormButton({ children, className }: FormButtonProps) {
    const { pending } = useFormStatus();

    return (
        <Button type="submit" className={className}>
            { pending ? <LoaderIcon className="animate-spin"/> : null }
            {children}
        </Button>
    )
}