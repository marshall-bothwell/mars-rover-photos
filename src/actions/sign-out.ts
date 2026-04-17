"use server";

import { createSupabaseServerActionClient } from '@/supabase/create-supabase-server-action-client';
import { headers } from 'next/headers';
import { redirect, RedirectType } from 'next/navigation';

export async function signOut() {
    const supabase = await createSupabaseServerActionClient();
    const headersList = await headers()
    const fullUrl = headersList.get('referer' || "");

    await supabase.auth.signOut();

    redirect(fullUrl || '/', 'replace');
}