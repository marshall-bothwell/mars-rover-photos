import { createSupabaseServerClient } from "@/supabase/create-supabase-server-client"
import RoverPhotoCard from '@/components/common/rover-photo-card';
import InfiniteScrollPhotos from "@/components/common/infinite-scroll-photos";
import CopyUrlButton from "@/components/common/copy-url-button";
import { SavedPhoto } from '@/lib/types';
import { cookies } from "next/headers";

interface SavedPhotosPageProps {
    params: {
        userslug: string
    }
}

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function SavedPhotosPage({ params }: SavedPhotosPageProps) {
    const { userslug } = params;
    const cookieStore = cookies()
    const supabase = createSupabaseServerClient(cookieStore);
    const { data: { user } } = await supabase.auth.getUser();
    const { data }  = await supabase.from("saved_photos").select().eq('user_id', userslug);

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
            {
                deletable ? 
                    <div className="text-center mt-4 space-y-4 flex flex-col items-center">
                        <h1 className="text-5xl font-bold px-8 bg-gradient-to-r from-teal-200 via-cyan-400 to-cyan-200 inline-block text-transparent bg-clip-text">Your Saved Photos</h1>
                        <CopyUrlButton />
                        <p className="px-8 text-lg text-center">Anyone can view your saved photos from this link</p>
                    </div>
                    :
                    null
            }
            <div className="flex flex-wrap justify-center">
                <InfiniteScrollPhotos roverPhotos={renderedSavedPhotos} pageSize={9} />
            </div>
        </div>
    )
}