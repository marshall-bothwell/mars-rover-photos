'use server';

import { redirect } from 'next/navigation';

export async function redirectToSearch(formData: FormData) {
    const rover = formData.get('rover');
    const date = formData.get('date');
    //console.log(rover);
    //console.log(date);

    redirect(`/search?rover=${rover}&date=${date}`);
}