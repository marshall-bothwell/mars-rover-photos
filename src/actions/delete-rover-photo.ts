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
    
    const { data: { user } } = await supabase.auth.getUser();

    const userId = user?.id;
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
        return { errors: { message: "You have already deleted this photo."}, success: true }
    } else {
        revalidatePath(`/photos/${userId}`);
        return { errors: {}, success: true }
    }
}