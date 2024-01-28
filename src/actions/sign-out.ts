"use server";

import { createSupabaseServerActionClient } from '@/supabase/create-supabase-server-action-client';
import { headers, cookies } from 'next/headers';
import { redirect, RedirectType } from 'next/navigation';

export async function signOut() {
    const cookieStore = cookies();
    const supabase = createSupabaseServerActionClient(cookieStore);
    const headersList = headers()
    const fullUrl = headersList.get('referer' || "");

    await supabase.auth.signOut();

    redirect(fullUrl || '/', 'replace' as RedirectType);
}