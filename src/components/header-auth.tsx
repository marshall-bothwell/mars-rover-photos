import { createSupabaseServerClient } from "@/supabase/create-supabase-server-client";
import FormButton from '@/components/common/form-button';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Link from 'next/link';

import * as actions from '@/actions';

export default async function HeaderAuth() {
    const supabase = createSupabaseServerClient();
    const { data: { user } } = await supabase.auth.getUser();
    const metadata = user?.user_metadata;

    let authDisplay: JSX.Element;

    if (user) {
        authDisplay = (
            <div className="flex flex-row space-x-4">
                <Avatar>
                    <AvatarImage src={metadata?.avatar_url} />
                    <AvatarFallback className="bg-red-500" />
                </Avatar>
                <Button asChild variant="outline">
                    <Link href={`/photos/${user.id}`}>Saved Photos</Link>
                </Button>
                <form action={actions.signOut}>
                    <FormButton variant="outline">Sign Out</FormButton>
                </form>
            </div>
        )
    } else {
        authDisplay = (
            <form action={actions.signInWithGithub}>
                <FormButton variant="outline">Sign In With Github</FormButton>
            </form>
        )
    }

    return (
        <div>
            {authDisplay}
        </div>
    )
}
