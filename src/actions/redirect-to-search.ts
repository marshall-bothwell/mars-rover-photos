'use server';

import { redirect } from 'next/navigation';

export async function redirectToSearch(formData: FormData) {
    const rover = formData.get('rover');
    const date = formData.get('date');

    redirect(`/search?rover=${rover}&date=${date}`);
}