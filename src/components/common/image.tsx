"use client";

import { useState, useEffect, useRef } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { SyntheticEvent } from 'react';

interface ImageProps {
    src: string;
}

export default function Image({ src }: ImageProps) {
    const imageRef = useRef<HTMLImageElement>(null);
    const [loaded, setLoaded] = useState(false);

    let imgClassName = "w-full h-auto transition duration-1000";

    const onLoad = () => {
        imgClassName += "visible opacity-100 blur-none";
        setLoaded(true);
    }
    const onError = (e: SyntheticEvent<HTMLImageElement, Event>) => {
        (e.target as HTMLImageElement).src = src
        
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
            <img alt="A photo taken by a Mars Rover." className={imgClassName} ref={imageRef} src={src} onLoad={onLoad} onError={onError} loading="lazy" />
        </div>
    )
}