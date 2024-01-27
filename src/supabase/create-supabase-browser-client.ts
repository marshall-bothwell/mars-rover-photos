import { createBrowserClient } from '@supabase/ssr';

//Don't think this is being used at all. Can try removing NEXT_PUBLIC from environment variables for security.

export function createSupabaseBrowserClient() {
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
        throw new Error("Can't find Supabase credentials in environment variables.");
    }
    return createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL, 
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    )
}