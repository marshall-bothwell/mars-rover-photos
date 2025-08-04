import SearchForm from '@/components/search/search-form';
import AboutButton from '@/components/common/about-button';
import { fetchManifestDates } from '@/lib/utils/fetch-manifest-dates';
import { ManifestDatesCollection } from '@/lib/types';
import { AiFillGithub, AiFillLinkedin } from 'react-icons/ai';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default async function Home() {
    const perseveranceData = fetchManifestDates('perseverance');
    const curiosityData = fetchManifestDates('curiosity');

    const [perseverance, curiosity] = await Promise.all([
        perseveranceData,
        curiosityData,
    ]);

    const manifestDates = { perseverance, curiosity } as ManifestDatesCollection;

    return (
        <div className="flex flex-col items-center text-center">
            <div className="text-7xl font-bold my-4 px-8 bg-gradient-to-r from-teal-200 via-cyan-400 to-cyan-200 inline-block text-transparent bg-clip-text">
                Mars Rover Photos
            </div>
            <div className="flex flex-col space-y-4 items-center px-8 text-lg text-center">
                <AboutButton />
            </div>
            <SearchForm manifestDates={manifestDates} />
            <div className="fixed bottom-0 left-0 w-full flex flex-row-reverse space-x-4 mb-2 items-center">
                <Link href="https://linkedin.com/in/marshall-bothwell" className="mx-4">
                    <AiFillLinkedin size={24} />
                </Link>
                <Link href="https://github.com/marshall-bothwell" className="mr-4">
                    <AiFillGithub size={24} />
                </Link>
                <p className="text-sm">Made by Marshall Bothwell</p>
            </div>
        </div>
    );
}
