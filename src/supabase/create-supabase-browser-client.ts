import { createBrowserClient } from '@supabase/ssr';

export function createSupabaseBrowserClient() {
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
        throw new Error("Can't find Supabase credentials in environment variables.");
    }
    return createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL, 
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    )
}