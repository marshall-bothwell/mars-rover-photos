import { createSupabaseServerClient } from "@/supabase/create-supabase-server-client"
import RoverPhotoCard from '@/components/common/rover-photo-card';
import InfiniteScrollPhotos from "@/components/common/infinite-scroll-photos";
import CopyUrlButton from "@/components/common/copy-url-button";
import { SavedPhoto } from '@/lib/types';

interface SavedPhotosPageProps {
    params: {
        userslug: string
    }
}

// We never want to cache the saved photos page.
//
// By default, the full route cache caches the user's saved photos page on the first visit
// Every subsequent visit will serve the cached page until a revalidation occurs,
// So users will save a photo from their search, navigate to their saved page, and not see the new photo
// We could manually revalidate the page on deletes and inserts to the table
// But calling revalidate in the server actions used to manipulate the table refreshes the page,
// Causing the user to lose their place in their search.
// The benefits of caching these profile pages do not outweigh the cost in user experience.

export const dynamic = 'force-dynamic';

export default async function SavedPhotosPage({ params }: SavedPhotosPageProps) {
    const { userslug } = params;
    const supabase = createSupabaseServerClient();
    const { data: { user } } = await supabase.auth.getUser();
    const { data, error }  = await supabase.from("saved_photos").select().eq('user_id', userslug);

    const deletable = user?.id === userslug;

    const savedPhotos = data as SavedPhoto[];

    const renderedSavedPhotos = savedPhotos?.map((photo) => {
        return (
            <RoverPhotoCard
                key={photo.id}
                roverName={photo.rover_name}
                cameraFullName={photo.camera_full_name}
                earthDate={photo.earth_date}
                sol={parseInt(photo.sol)}
                imageSource={photo.image_source}
                deletable={deletable}
            />
        )
    })

    return (
        <div>
            <div className="text-center mt-4">
                <CopyUrlButton />
                <h1 className="text-4xl font-bold">Copy the link to this page and share it! Anyone can view your saved photos.</h1>
            </div>
            <div className="flex flex-wrap justify-center">
                <InfiniteScrollPhotos roverPhotos={renderedSavedPhotos} pageSize={9} />
            </div>
        </div>
    )
}