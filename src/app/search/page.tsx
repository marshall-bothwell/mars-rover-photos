import SearchForm from '@/components/search/search-form';
import RoverPhotoList from '@/components/search/rover-photo-list';
import { fetchRoverPhotos } from '@/lib/utils/fetch-rover-photos';
import { fetchManifestDates } from '@/lib/utils/fetch-manifest-dates';
import * as actions from '@/actions';

import { RoverApiResponse, Manifest, ManifestDatesCollection } from '@/lib/types';

interface SearchPageProps {
    searchParams: {
        rover: string;
        date: string;
    };
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
    const { rover, date } = searchParams;
    let roverPhotos: RoverApiResponse | undefined;
    let manifest: Manifest | undefined;

    if (date && rover) {
        roverPhotos = await fetchRoverPhotos(rover, date);
        const { photo_manifest } = await actions.getManifest(rover);
        manifest = photo_manifest;
    }

    const perseveranceData = fetchManifestDates('perseverance');
    const curiosityData = fetchManifestDates('curiosity');
    const opportunityData = fetchManifestDates('opportunity');
    const spiritData = fetchManifestDates('spirit');

    const [perseverance, curiosity, opportunity, spirit] = await Promise.all([
        perseveranceData,
        curiosityData,
        opportunityData,
        spiritData,
    ]);

    const manifestDates = { perseverance, curiosity, opportunity, spirit } as ManifestDatesCollection;

    return (
        <div>
            <SearchForm manifestDates={manifestDates} />
            {roverPhotos && manifest ? <RoverPhotoList roverPhotos={roverPhotos} manifest={manifest} /> : null}
        </div>
    );
}
