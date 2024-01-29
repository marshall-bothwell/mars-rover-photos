import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { type CookieOptions, createServerClient } from '@supabase/ssr';

export async function GET(request: Request) {
    const requestUrl = new URL(request.url);
    const { searchParams, origin } = requestUrl;
    console.log("Origin: " + origin);
    console.log("Search Parameters: " + searchParams);
    const code = searchParams.get('code');
    let returnToAddress = searchParams.get('returnToAddress');
    const date = searchParams.get('date');
    const camera = searchParams.get('camera');

    if (date) {
        returnToAddress = returnToAddress + '&date=' + date;
    }
    if (camera) {
        returnToAddress = returnToAddress + '&camera=' + camera;
    }

    console.log("Returning to " + returnToAddress);
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
            return NextResponse.redirect(returnToAddress || requestUrl.origin);
        } else {
                console.log(error);
        }
    }

    return NextResponse.redirect(`${origin}/error`);
}