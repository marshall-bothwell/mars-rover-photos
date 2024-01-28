"use server";

import { createSupabaseServerActionClient } from '@/supabase/create-supabase-server-action-client';
import { redirect } from 'next/navigation';
import { headers, cookies } from 'next/headers';

export async function signInWithGithub() {
    const cookieStore = cookies()
    const supabase = createSupabaseServerActionClient(cookieStore);
    const headersList = headers()
    const fullUrl = headersList.get('referer' || "");
    console.log(fullUrl)

    const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'github',
        options: {
            redirectTo: `http://localhost:3000/auth/callback?returnTo=${fullUrl}`
        }
    })
    if (!error) {
        redirect(data.url);
    } else {
        console.log(error);
    }
}