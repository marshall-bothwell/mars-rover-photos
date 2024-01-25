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
    
    const { data: { session } } = await supabase.auth.getSession();
    const userId = session?.user.id;

    const roverName = formData.get('roverName');
    const cameraFullName = formData.get('cameraFullName');
    const earthDate = formData.get('earthDate');
    const sol = formData.get('sol');
    const imageSource = formData.get('imageSource');

    const { data, error } = await supabase
        .from('saved_photos')
        .upsert({
            user_id: userId,
            rover_name: roverName,
            camera_full_name: cameraFullName,
            earth_date: earthDate,
            sol: sol,
            image_source: imageSource
        },
        {
            onConflict: 'user_id, image_source',
            ignoreDuplicates: true
        })
        .select();
    if (error) {
        // Something has gone wrong with the insert.
        return { errors: { message: error.message } }
    } else if (data.length === 0) {
        // The user has already saved this photo.
        console.log("you've already saved this one.")
        return { errors: { message: "You have already saved this photo."} }
    } else {
        // Successful insert, no duplicate photo has been saved by the user.
        console.log("success.")
        return { errors: {}, success: true }
    }
}