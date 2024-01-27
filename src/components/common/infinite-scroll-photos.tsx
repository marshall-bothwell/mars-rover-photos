"use client";

import { LoaderIcon } from 'lucide-react';
import { useState, useEffect } from 'react';
import { InView } from 'react-intersection-observer';
import { useQueryState } from 'nuqs';
import { useSearchParams } from 'next/navigation';


interface InfiniteScrollPhotosProps {
    roverPhotos: JSX.Element[],
    pageSize: number
}

export default function InfiniteScrollPhotos({ roverPhotos, pageSize }: InfiniteScrollPhotosProps) {
    const [page, setPage] = useState(1);
    const [camera] = useQueryState('camera');
    const maxPages = Math.ceil(roverPhotos?.length / pageSize);
    const searchParams = useSearchParams();

    useEffect(() => {
        setPage(1);
    }, [camera, searchParams])

    const incrementPage = (inView: boolean) => {
        if (inView) {
            setPage((page) => page + 1);
        }
    }

    return (
        <div>
            <div className="flex flex-wrap justify-center">
                {roverPhotos?.slice(0, page*pageSize)}
            </div>
            {page >= maxPages || !maxPages ? 
                null 
                : 
                <div className="h-96 flex flex-col justify-end items-center">
                    <div className="flex grow mb-auto text-sm">
                        Keep scrolling to load more photos...
                    </div>
                    <InView as="div" onChange={(inView, entry) => incrementPage(inView)}>
                        <LoaderIcon size={128} />
                    </InView>
                </div>
                }
        </div>
    )
}