import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { type CookieOptions, createServerClient } from '@supabase/ssr';

export async function GET(request: Request) {
    const requestUrl = new URL(request.url);
    const { searchParams, origin } = requestUrl;
    const code = searchParams.get('code');
    let returnTo = searchParams.get('returnTo');
    const date = searchParams.get('date');
    const camera = searchParams.get('camera');

    if (date) {
        returnTo = returnTo + '&date=' + date;
    }
    if (camera) {
        returnTo = returnTo + '&camera=' + camera;
    }

    if (code) {
        const cookieStore = cookies()
        const supabase = createServerClient(
            process.env.NEXT_PUBLIC_SUPABASE_URL!,
            process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
            {
                cookies: {
                    get(name: string) {
                        return cookieStore.get(name)?.value;
                    },
                    set(name: string, value: string, options: CookieOptions) {
                        cookieStore.set({ name, value, ...options });
                    },
                    remove(name: string, options: CookieOptions) {
                        cookieStore.delete({ name, ...options });
                    },
                },
            }
        )

        const { error } = await supabase.auth.exchangeCodeForSession(code);
        if (!error) {
            return NextResponse.redirect(returnTo || requestUrl.origin);
        } else {
                console.log(error);
        }
    }

    return NextResponse.redirect(`${origin}/error`);
}