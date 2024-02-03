'use client';

import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { Check } from 'lucide-react';

export default function CopyUrlButton() {
    const [copied, setCopied] = useState(false);

    const copy = () => {
        navigator.clipboard.writeText(window.location.toString());
        setCopied(true);
    };

    return (
        <Button onClick={copy} variant="outline">
            {copied ? <Check className="mr-2" /> : null}
            {copied ? 'Copied' : 'Copy Link'}
        </Button>
    );
}
