import { createSupabaseServerClient } from "@/supabase/create-supabase-server-client";
import FormButton from '@/components/common/form-button';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cookies } from 'next/headers';
import { User } from "lucide-react";
import SignInForm from '@/components/header/sign-in-form';
import Link from 'next/link';

import * as actions from '@/actions';

export default async function HeaderAuth() {
    const cookieStore = cookies()
    const supabase = createSupabaseServerClient(cookieStore);
    const { data: { user } } = await supabase.auth.getUser();
    const metadata = user?.user_metadata;

    let authDisplay: JSX.Element;

    if (user) {
        authDisplay = (
            <div className="flex flex-row space-x-4">
                <Popover>
                    <PopoverTrigger>
                        <Avatar>
                            <AvatarImage src={metadata?.avatar_url} />
                            <AvatarFallback><User /></AvatarFallback>
                        </Avatar>
                    </PopoverTrigger>
                    <PopoverContent align="end">
                        <div className="flex flex-col space-y-2">
                            <div>
                            <Button asChild variant="outline">
                                <Link href={`/photos/${user.id}`}>Saved Photos</Link>
                            </Button>
                            </div>
                            <form>
                                <FormButton variant="outline" action={actions.signOut}>Sign Out</FormButton>
                            </form>
                        </div>
                    </PopoverContent>
                </Popover>
            </div>
        )
    } else {
        authDisplay = (
            <SignInForm />
        )
    }

    return (
        <div>
            {authDisplay}
        </div>
    )
}
/*
<form action={actions.signInWithGithub}>
    <FormButton variant="outline">Sign In With Github</FormButton>
</form>
*/
/*
<Dialog>
    <DialogTrigger asChild>
        <Button variant="outline">Sign In</Button>
    </DialogTrigger>
    <DialogContent>
        <DialogHeader>
            <DialogTitle>Sign In</DialogTitle>
            <DialogDescription>Sign in with your email address, or use your Google or Github account.</DialogDescription>
        </DialogHeader>
        <form className="w-2/3">
            <Label htmlFor="email">Email</Label>
            <Input id="email" name="email" type="email" required autoComplete="off" />
            <Label htmlFor="password">Password</Label>
            <Input id="password" name="password" type="password" required autoComplete="off" />
            <Button className="mt-4 mr-4" variant="outline">Sign In</Button>
            <Button className="mt-4 mx-4" variant="outline">Sign Up</Button>
        </form>
        <DialogFooter>
            <form action={actions.signInWithGithub}>
                <input type="hidden" value={fullUrl ? fullUrl : ""} name="fullUrl" />
                <FormButton variant="outline" size="sm">Sign in with Github</FormButton>
            </form>
            <form>
                <FormButton variant="outline" size="sm">Sign in with Google</FormButton>
            </form>
        </DialogFooter>
    </DialogContent>
</Dialog>
*/
