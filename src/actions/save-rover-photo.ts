"use server";

import { createSupabaseServerActionClient } from '@/supabase/create-supabase-server-action-client';

interface SaveRoverPhotoFormState {
    errors: {
        message?: string;
    },
    success?: boolean;
}

export async function saveRoverPhoto(formState: SaveRoverPhotoFormState, formData: FormData): Promise<SaveRoverPhotoFormState> {
    const supabase = createSupabaseServerActionClient();
    const { data: { user } } = await supabase.auth.getUser();
    const userId = user?.id;

    const roverName = formData.get('roverName');
    const cameraFullName = formData.get('cameraFullName');
    const earthDate = formData.get('earthDate');
    const sol = formData.get('sol');
    const imageSource = formData.get('imageSource');

    const { error } = await supabase
        .from('saved_photos')
        .insert({
            user_id: userId,
            rover_name: roverName,
            camera_full_name: cameraFullName,
            earth_date: earthDate,
            sol: sol,
            image_source: imageSource
        })

    if (error) {
        if (error.message === 'duplicate key value violates unique constraint "unique_image_user"') {
            return { errors: { message: "You have already saved this photo."} }
        }
        return { errors: { message: error.message } }
    } else {
        return { errors: {}, success: true }
    }
}