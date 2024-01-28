import { type CookieOptions, createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

export function createSupabaseServerActionClient(cookieStore: ReturnType<typeof cookies>) {
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
        throw new Error("Can't find Supabase credentials in environment variables.");
    }
    return createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL, 
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
        {
            cookies: {
                get(name) {
                    return cookieStore.get(name)?.value;
                },
                set(name, value, options: CookieOptions) {
                    cookieStore.set({name, value, ...options});
                },
                remove(name, options: CookieOptions) {
                    cookieStore.set({name, value: "", ...options});
                }
            }
        }
    )
}