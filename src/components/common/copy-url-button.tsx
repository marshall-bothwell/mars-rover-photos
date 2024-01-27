"use client";

import { Button } from '@/components/ui/button';

export default function CopyUrlButton() {
    const copy = () => {
        navigator.clipboard.writeText(window.location.toString())
    }

    return (
        <Button onClick={copy}>
            Copy URL!
        </Button>
    )
}