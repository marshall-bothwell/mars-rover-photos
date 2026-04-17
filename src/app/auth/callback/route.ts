import { NextResponse } from 'next/server';
import { createSupabaseServerClient } from '@/supabase/create-supabase-server-client';

export async function GET(request: Request) {
    const requestUrl = new URL(request.url);
    const { searchParams, origin } = requestUrl;
    const code = searchParams.get('code');
    const returnPath = searchParams.get('pathname');
    searchParams.delete('code');
    searchParams.delete('pathname');

    const returnUrl = `${origin}${returnPath}${searchParams.get('rover') !== 'null' ? '?' + searchParams : ''}`;

    if (code) {
        const supabase = await createSupabaseServerClient();

        const { error } = await supabase.auth.exchangeCodeForSession(code);
        if (!error) {
            return NextResponse.redirect(returnUrl || requestUrl.origin);
        } else {
            console.error(error);
        }
    }

    return NextResponse.redirect(`${origin}/error`);
}