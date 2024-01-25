import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

// Server components do not have access to set or delete cookies.
export function createSupabaseServerClient() {
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
        throw new Error("Can't find Supabase credentials in environment variables.");
    }
    return createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL, 
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
        {
            cookies: {
                get(name) {
                    return cookies().get(name)?.value;
                }
            }
        }
    )
}