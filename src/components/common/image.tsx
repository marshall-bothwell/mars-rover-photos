"use client";

import { useState, useEffect, useRef } from 'react';
import { Skeleton } from '@/components/ui/skeleton';

interface ImageProps {
    src: string;
}

export default function Image({ src }: ImageProps) {
    const imageRef = useRef<HTMLImageElement>(null);
    const [loaded, setLoaded] = useState(false);

    let imgClassName = "transition duration-1000";

    const onLoad = () => {
        imgClassName += "visible opacity-100 blur-none";
        setLoaded(true);
    }

    useEffect(() => {
        const image = imageRef.current;
        if (image) {
            imgClassName += "visible opacity-100 blur-none"
            setLoaded(image.complete);
        }
    }, [imageRef])

    if (!loaded) {
        imgClassName += "invisible opacity-0 blur-sm";
    }

    // { loaded ? null : <div className="bg-red-400 h-full w-full absolute"></div>}

    return (
        <div className="h-full w-full">
            { loaded ? null : <Skeleton className="h-full w-full absolute" /> }
            <img className={imgClassName} ref={imageRef} src={src} onLoad={onLoad} loading="lazy" />
        </div>
    )
}