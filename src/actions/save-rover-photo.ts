"use server";

import { createSupabaseServerActionClient } from '@/supabase/create-supabase-server-action-client';
import { revalidatePath } from 'next/cache';

interface SaveRoverPhotoFormState {
    errors: {
        message?: string;
    },
    success?: boolean;
}

export async function saveRoverPhoto(formState: SaveRoverPhotoFormState, formData: FormData): Promise<SaveRoverPhotoFormState> {
    const supabase = await createSupabaseServerActionClient();
    const { data: { user } } = await supabase.auth.getUser();
    const userId = user?.id;

    const dbId = formData.get('dbId')

    const { error } = await supabase
        .from('saved_photos')
        .insert({
            user_id: userId,
            rover_photo_id: dbId,
        })

    if (error) {
        if (error.message === 'duplicate key value violates unique constraint "saved_photos_user_photo_unique"') {
            return { errors: { message: "You have already saved this photo."}, success: true }
        }
        return { errors: { message: error.message } }
    } else {
        revalidatePath(`/photos/${userId}`, 'page');
        return { errors: {}, success: true }
    }
}