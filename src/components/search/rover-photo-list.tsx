'use client';

import RoverPhotoCard from '@/components/common/rover-photo-card';
import InfiniteScrollPhotos from '@/components/common/infinite-scroll-photos';
import type { RoverApiResponse } from '@/lib/types';
import { createSupabaseBrowserClient } from '@/supabase/create-supabase-browser-client';
import type { Session } from '@supabase/supabase-js';
import { useQueryState } from 'nuqs';
import { useState, useEffect } from 'react';

interface RoverPhotoListProps {
    roverPhotos: RoverApiResponse;
}

export default function RoverPhotoList({ roverPhotos }: RoverPhotoListProps) {
    const [session, setSession] = useState<Session | null>(null);
    const supabase = createSupabaseBrowserClient();
    const [camera] = useQueryState('camera');

    useEffect(() => {
        const getSession = async () => {
            const {
                data: { session },
            } = await supabase.auth.getSession();
            setSession(session);
        };
        getSession();
    }, []);

    const renderedRoverPhotos = roverPhotos.photos
        ?.filter((photo) => {
            if (camera === 'all') {
                return true;
            } else {
                return photo.camera.name.toUpperCase() === camera;
            }
        })
        .map((photo) => {
            return (
                <RoverPhotoCard
                    key={photo.id}
                    roverName={photo.rover.name}
                    cameraFullName={photo.camera.full_name}
                    earthDate={photo.date_taken_utc}
                    sol={photo.sol}
                    imageSource={photo.image_files.full_res}
                    saveable={!!session?.user}
                />
            );
        });

    return (
        <div className="flex flex-col items-center">
            <InfiniteScrollPhotos roverPhotos={renderedRoverPhotos} pageSize={12} />
        </div>
    );
}
