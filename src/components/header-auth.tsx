import { createSupabaseServerClient } from "@/supabase/create-supabase-server-client";
import FormButton from '@/components/common/form-button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Link from 'next/link';
import * as actions from '@/actions';

export default async function HeaderAuth() {
    const supabase = createSupabaseServerClient();
    const { data: { session } } = await supabase.auth.getSession();
    const { data: { user } } = await supabase.auth.getUser();
    const metadata = user?.user_metadata;

    let display: JSX.Element;

    if (session && user) {
        display = (
            <div className="flex flex-row space-x-4">
                <Avatar>
                    <AvatarImage src={metadata?.avatar_url} />
                    <AvatarFallback className="bg-red-500" />
                </Avatar>
                <form action={actions.redirectToSavedPhotos}>
                    <FormButton variant="outline">Saved Photos</FormButton>
                    <input type="hidden" value={user.id} name="userId" />
                </form>
                <form action={actions.signOut}>
                    <FormButton variant="outline">Sign Out</FormButton>
                </form>
            </div>
        )
    } else {
        display = (
            <form action={actions.signInWithGithub}>
                <FormButton variant="outline">Sign In With Github</FormButton>
            </form>
        )
    }

    return (
        <div>
            {display}
        </div>
    )
}
