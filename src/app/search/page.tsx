import SearchForm from '@/components/search/search-form';
import RoverPhotoList from '@/components/rover-photo-list';
import { Separator } from '@/components/ui/separator';

export default function SearchPage() {

    return (
        <div>
            <SearchForm />
            <Separator />
            <RoverPhotoList />
        </div>
    )
}