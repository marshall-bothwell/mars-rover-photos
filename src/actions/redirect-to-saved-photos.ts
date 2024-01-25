'use server';

import { redirect } from 'next/navigation';

export async function redirectToSavedPhotos(formData: FormData) {
    const userSlug = formData.get('userId');

    redirect(`/photos/${userSlug}`);
}