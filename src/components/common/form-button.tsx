"use client";

import { useFormStatus } from 'react-dom';
import { Button } from '@/components/ui/button';
import { LoaderIcon } from 'lucide-react';

interface FormButtonProps {
    children: React.ReactNode;
    className?: string;
    variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link" | null | undefined;
}

export default function FormButton({ children, className, variant }: FormButtonProps) {
    const { pending } = useFormStatus();

    return (
        <Button type="submit" className={className} variant={variant}>
            { pending ? <LoaderIcon className="animate-spin"/> : null }
            {children}
        </Button>
    )
}