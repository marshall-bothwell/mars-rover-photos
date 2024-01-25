"use server";

import { createSupabaseServerActionClient } from '@/supabase/create-supabase-server-action-client';
import { redirect } from 'next/navigation';

export async function signInWithGithub() {
    const supabase = createSupabaseServerActionClient();

    const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'github',
        options: {
            redirectTo: 'http://localhost:3000/auth/callback'
        }
    })
    if (!error) {
        redirect(data.url);
    } else {
        console.log(error);
    }
}