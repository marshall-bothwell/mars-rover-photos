import { createSupabaseServerClient } from "@/supabase/create-supabase-server-client"
import RoverPhotoCard from '@/components/common/rover-photo-card';
import InfiniteScrollPhotos from "@/components/common/infinite-scroll-photos";

interface SavedPhotosPageProps {
    params: {
        userslug: string
    }
}

type SavedPhoto = {
    id: string,
    created_at: string,
    user_id: string,
    rover_name: string,
    camera_full_name: string,
    earth_date: string,
    sol: string,
    image_source: string
}

export default async function SavedPhotosPage({ params }: SavedPhotosPageProps) {
    const { userslug } = params;
    const supabase = createSupabaseServerClient();
    const { data: {session} } = await supabase.auth.getSession();
    const { data, error }  = await supabase.from("saved_photos").select().eq('user_id', userslug);

    const deletable = session?.user.id === userslug;

    const savedPhotos = data as SavedPhoto[];

    const renderedSavedPhotos = savedPhotos.map((photo) => {
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
        <div className="flex flex-wrap justify-center">
            <InfiniteScrollPhotos roverPhotos={renderedSavedPhotos} pageSize={9} />
        </div>
    )
}