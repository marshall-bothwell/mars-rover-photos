import SearchForm from '@/components/search/search-form';
import RoverPhotoList from '@/components/search/rover-photo-list';
import RoverPhotoListSkeleton from '@/components/search/rover-photo-list-skeleton';
import { Separator } from '@/components/ui/separator';
import { fetchRoverPhotos } from '@/lib/utils/fetch-rover-photos';
import { Suspense } from 'react';
import * as actions from '@/actions';

import { RoverApiResponse, Manifest } from '@/lib/types';

interface SearchPageProps {
    searchParams: {
        rover: string;
        date: string;
    }
}

// TODO: Examine whether we still need RoverPhotoListSkeleton and suspense here.

export default async function SearchPage({ searchParams }: SearchPageProps) {
    const { rover, date } = searchParams;
    let roverPhotos: RoverApiResponse | undefined;
    let manifest: Manifest | undefined;
    if (date && rover) {
        roverPhotos = await fetchRoverPhotos(rover, date);
        const { photo_manifest } = await actions.getManifest(rover);
        manifest = photo_manifest;
    }


    return (
        <div>
            <SearchForm rover={rover} />
            <Separator />
            { roverPhotos && manifest ?
                <Suspense fallback={<RoverPhotoListSkeleton />}>
                    <RoverPhotoList roverPhotos={roverPhotos} manifest={manifest} />
                </Suspense>
                : null
            }
        </div>
    )
}