"use client";

import CameraSelector from '@/components/search/camera-selector';
import RoverPhotoCard from '@/components/common/rover-photo-card';
import InfiniteScrollPhotos from '@/components/common/infinite-scroll-photos';
import type { RoverApiResponse, Manifest } from '@/lib/types';
import { createSupabaseBrowserClient } from '@/supabase/create-supabase-browser-client';
import type { Session } from '@supabase/supabase-js';
import { useQueryState } from 'nuqs';
import { useState, useEffect } from 'react';

interface RoverPhotoListProps {
    roverPhotos: RoverApiResponse;
    manifest: Manifest;
}

export default function RoverPhotoList({ roverPhotos, manifest }: RoverPhotoListProps) {
    const [session, setSession] = useState<Session | null>(null);
    const supabase = createSupabaseBrowserClient();
    const [camera] = useQueryState("camera");

    useEffect(() => {
        const getSession = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            setSession(session);
        }
        getSession();
    }, [])

    const renderedRoverPhotos = roverPhotos.photos?.
        filter((photo) => {
            if (camera === "all") {
                return true;
            } else {
                return photo.camera.name.toUpperCase() === camera
            }
        }).
        map((photo) => {
            return (
                <RoverPhotoCard 
                    key={photo.id}
                    roverName={photo.rover.name}
                    cameraFullName={photo.camera.full_name}
                    earthDate={photo.earth_date}
                    sol={photo.sol}
                    imageSource={photo.img_src}
                    saveable={!!session?.user}
                />
            )
        })

    return (
        <div className="flex flex-col items-center">
            <CameraSelector manifest={manifest} />
            <InfiniteScrollPhotos roverPhotos={renderedRoverPhotos} pageSize={12} />
        </div>
    )
}