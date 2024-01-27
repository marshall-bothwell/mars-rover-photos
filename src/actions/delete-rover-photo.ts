"use server";

import { createSupabaseServerActionClient } from '@/supabase/create-supabase-server-action-client';

interface DeleteRoverPhotoFormState {
    errors: {
        message?: string;
    },
    success?: boolean;
}

export async function deleteRoverPhoto(formState: DeleteRoverPhotoFormState, formData: FormData): Promise<DeleteRoverPhotoFormState> {
    const supabase = createSupabaseServerActionClient();
    
    const { data: { session } } = await supabase.auth.getSession();

    const userId = session?.user.id;
    const imageSource = formData.get('imageSource');

    const { data, error } = await supabase
        .from('saved_photos')
        .delete()
        .eq('user_id', userId)
        .eq('image_source', imageSource)
        .select()

    if (error) {
        return { errors: { message: error.message } }
    } else if (data.length === 0) {
        return { errors: { message: "You have already deleted this photo."} } // display a deleted icon on photos to discourage users from double-deletion
    } else {
        return { errors: {}, success: true }
    }
}