"use server";

import { createSupabaseServerActionClient } from '@/supabase/create-supabase-server-action-client';
import { redirect } from 'next/navigation';

export async function signOut() {
    const supabase = createSupabaseServerActionClient();
    await supabase.auth.signOut();
    redirect('/');
}