"use client";

import CameraSelector from '@/components/search/camera-selector';
import RoverPhotoCard from '@/components/common/rover-photo-card';
import type { RoverApiResponse, Manifest } from '@/lib/types';
import { createSupabaseBrowserClient } from '@/supabase/create-supabase-browser-client';
import type { Session } from '@supabase/supabase-js';
import { useState, useEffect } from 'react';

interface RoverPhotoListProps {
    rover: string;
    date: string;
    roverPhotos: RoverApiResponse;
    manifest: Manifest;
}

export default function RoverPhotoList({ roverPhotos, rover, date, manifest }: RoverPhotoListProps) {
    const [camera, setCamera] = useState("all");
    const [session, setSession] = useState<Session | null>(null);
    const supabase = createSupabaseBrowserClient();
    let saveable = false;

    const handleCameraChange = (camera: string) => {
        setCamera(camera);
    }

    useEffect(() => {
        const getSession = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            setSession(session);
        }
        getSession();
    }, [])

    useEffect(() => {
        setCamera("all");
    }, [rover, date])

    if (session?.user) {
        saveable = true;
    }

    const renderedRoverPhotos = roverPhotos.photos?.
        filter((photo) => {
            if (camera === "all") {
                return true;
            } else {
                return photo.camera.name.toUpperCase() === camera.toUpperCase()
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
                    saveable={saveable}
                />
            )
        })

    return (
        <div className="flex flex-col items-center">
            <CameraSelector rover={rover} date={date} manifest={manifest} handleCameraChange={handleCameraChange}/>
            <div className="flex flex-wrap justify-center">
                {renderedRoverPhotos}
            </div>
        </div>
    )
}