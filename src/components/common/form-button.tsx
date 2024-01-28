"use client";

import { useFormStatus } from 'react-dom';
import { Button } from '@/components/ui/button';
import { LoaderIcon } from 'lucide-react';

interface FormButtonProps {
    children: React.ReactNode;
    className?: string;
    variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link" | null | undefined;
    size?: "default" | "sm" | "lg" | "icon" | null | undefined;
    action?: (payload: FormData) => void;
}

export default function FormButton({ children, className, variant, size, action }: FormButtonProps) {
    const { pending } = useFormStatus();

    return (
        <Button type="submit" className={className} variant={variant} size={size} formAction={action}>
            { pending ? <LoaderIcon className="animate-spin"/> : null }
            {children}
        </Button>
    )
}