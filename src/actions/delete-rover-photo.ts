"use server";

import { createSupabaseServerActionClient } from '@/supabase/create-supabase-server-action-client';
import { cookies } from 'next/headers';
import { revalidatePath } from 'next/cache';

interface DeleteRoverPhotoFormState {
    errors: {
        message?: string;
    },
    success?: boolean;
}

export async function deleteRoverPhoto(formState: DeleteRoverPhotoFormState, formData: FormData): Promise<DeleteRoverPhotoFormState> {
    const cookieStore = cookies()
    const supabase = createSupabaseServerActionClient(cookieStore);
    
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
        return { errors: { message: "You have already deleted this photo."}, success: true } // display a deleted icon on photos to discourage users from double-deletion
    } else {
        revalidatePath(`/photos/${userId}`);
        return { errors: {}, success: true }
    }
}