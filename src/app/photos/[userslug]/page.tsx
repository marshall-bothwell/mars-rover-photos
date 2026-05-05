import { createSupabaseServerClient } from '@/supabase/create-supabase-server-client';
import RoverPhotoCard from '@/components/common/rover-photo-card';
import InfiniteScrollPhotos from '@/components/common/infinite-scroll-photos';
import CopyUrlButton from '@/components/common/copy-url-button';
import { SavedPhoto } from '@/lib/types';

interface SavedPhotosPageProps {
    params: {
        userslug: string;
    };
}

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function SavedPhotosPage({ params }: SavedPhotosPageProps) {
    const { userslug } = params;
    const supabase = await createSupabaseServerClient();
    const {
        data: { user },
    } = await supabase.auth.getUser();
    const { data } = await supabase
        .from('saved_photos')
        .select(`
            id,
            rover_photos (
                id,
                sol,
                date_taken_utc,
                img_src_full_res,
                cameras (
                    full_name
                ),
                rovers (
                    name
                )
            )
        `)
        .eq('user_id', userslug);

    const deletable = user?.id === userslug;

    // Fix this cast later - there is a way to generate types directly
    // from the schema for supabase client
    const savedPhotos = data as unknown as SavedPhoto[];

    const renderedSavedPhotos = savedPhotos?.map((photo) => {
        const rp = photo.rover_photos;
        return (
            <RoverPhotoCard
                key={photo.id}
                dbId={rp.id}
                roverName={rp.rovers.name}
                cameraFullName={rp.cameras.full_name}
                earthDate={rp.date_taken_utc}
                sol={rp.sol}
                imageSource={rp.img_src_full_res}
                deletable={deletable}
            />
        );
    });

    return (
        <div>
            {deletable ? (
                <div className="text-center mt-4 space-y-4 flex flex-col items-center">
                    <h1 className="text-5xl font-bold px-8 bg-gradient-to-r from-teal-200 via-cyan-400 to-cyan-200 inline-block text-transparent bg-clip-text">
                        Saved Photos
                    </h1>
                    <CopyUrlButton />
                </div>
            ) : null}
            <div className="flex flex-wrap justify-center">
                <InfiniteScrollPhotos roverPhotos={renderedSavedPhotos} pageSize={9} />
            </div>
        </div>
    );
}
