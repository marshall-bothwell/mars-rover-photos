import SearchForm from '@/components/search/search-form';
import RoverPhotoList from '@/components/rover-photo-list';
import { Separator } from '@/components/ui/separator';
import { Suspense } from 'react';

interface SearchPageProps {
    searchParams: {
        rover: string;
        date: string;
    }
}

export default function SearchPage({ searchParams }: SearchPageProps) {
    const { rover, date } = searchParams;

    return (
        <div>
            <SearchForm />
            <Separator />
            <Suspense>
                <RoverPhotoList rover={rover} date={date} />
            </Suspense>
        </div>
    )
}