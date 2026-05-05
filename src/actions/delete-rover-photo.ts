"use server";

import { createSupabaseServerActionClient } from '@/supabase/create-supabase-server-action-client';
import { revalidatePath } from 'next/cache';

interface DeleteRoverPhotoFormState {
    errors: {
        message?: string;
    },
    success?: boolean;
}

export async function deleteRoverPhoto(formState: DeleteRoverPhotoFormState, formData: FormData): Promise<DeleteRoverPhotoFormState> {
    const supabase = await createSupabaseServerActionClient();
    
    const { data: { user } } = await supabase.auth.getUser();

    const userId = user?.id;
    const dbId = formData.get('dbId');

    const { data, error } = await supabase
        .from('saved_photos')
        .delete()
        .eq('user_id', userId)
        .eq('rover_photo_id', dbId)
        .select()

    if (error) {
        return { errors: { message: error.message } }
    } else if (data.length === 0) {
        return { errors: { message: "You have already deleted this photo."}, success: true }
    } else {
        revalidatePath(`/photos/${userId}`);
        return { errors: {}, success: true }
    }
}