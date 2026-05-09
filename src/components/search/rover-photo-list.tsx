'use client';

import RoverPhotoCard from '@/components/common/rover-photo-card';
import InfiniteScrollPhotos from '@/components/common/infinite-scroll-photos';
import type { RoverApiResponse } from '@/lib/types';
import { createSupabaseBrowserClient } from '@/supabase/create-supabase-browser-client';
import type { Session } from '@supabase/supabase-js';
import { useQueryState } from 'nuqs';
import { useState, useEffect } from 'react';

function formatEarthDateShort(iso: string | null | undefined): string | undefined {
    if (!iso) return undefined;
    const date = new Date(iso);
    if (Number.isNaN(date.getTime())) return undefined;
    return date.toLocaleDateString('en-US', {
        timeZone: 'UTC',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
}

function formatEarthDateLong(iso: string | null | undefined): string | undefined {
    if (!iso) return undefined;
    const date = new Date(iso);
    if (Number.isNaN(date.getTime())) return undefined;
    const datePart = date.toLocaleDateString('en-US', {
        timeZone: 'UTC',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
    const hh = String(date.getUTCHours()).padStart(2, '0');
    const mm = String(date.getUTCMinutes()).padStart(2, '0');
    return `${datePart} · ${hh}:${mm} UTC`;
}

function formatMarsTime(raw: string | null | undefined): string | undefined {
    if (!raw) return undefined;
    const match = raw.match(/M(\d{1,2}):(\d{2})/);
    if (!match) return undefined;
    const hh = match[1].padStart(2, '0');
    return `${hh}:${match[2]} LMST`;
}

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
                    dbId={photo.id}
                    roverName={photo.rover.name}
                    cameraFullName={photo.camera.full_name}
                    earthDate={formatEarthDateShort(photo.date_taken_utc)}
                    sol={photo.sol}
                    imageSource={photo.image_files.full_res}
                    description={photo.caption || undefined}
                    transitMs={new Date(photo.date_received || '').getTime() - new Date(photo.date_taken_utc).getTime()}
                    marsTime={formatMarsTime(photo.date_taken_mars)}
                    earthTimeFull={formatEarthDateLong(photo.date_taken_utc)}
                    site={photo.site || undefined}
                    drive={photo.drive || undefined}
                    credit={photo.credit || undefined}
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
