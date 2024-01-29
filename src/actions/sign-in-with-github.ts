"use server";

import { createSupabaseServerActionClient } from '@/supabase/create-supabase-server-action-client';
import { redirect } from 'next/navigation';
import { headers, cookies } from 'next/headers';

export async function signInWithGithub() {
    const cookieStore = cookies()
    const supabase = createSupabaseServerActionClient(cookieStore);
    const headersList = headers()
    const fullUrlString = headersList.get('referer');
    const fullUrl = new URL(fullUrlString ?? "")
    const { origin } = fullUrl
    console.log(origin)

    const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'github',
        options: {
            redirectTo: `${origin}/auth/callback?returnToAddress=${fullUrlString}`
        }
    })
    if (!error) {
        redirect(data.url);
    } else {
        console.log(error);
    }
}