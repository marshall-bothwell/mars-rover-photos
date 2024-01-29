"use client";

import { createSupabaseBrowserClient } from "@/supabase/create-supabase-browser-client";
import FormButton from '@/components/common/form-button';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { User as UserIcon } from 'lucide-react';
import type { User, UserMetadata } from "@supabase/supabase-js";
import { useEffect, useState } from 'react';
import SignInForm from '@/components/header/sign-in-form';
import Link from 'next/link';

import * as actions from '@/actions';

export default function HeaderAuth() {
    const [user, setUser] = useState<User | null>(null);
    const [metadata, setMetadata] = useState<UserMetadata | null>(null);
    const supabase = createSupabaseBrowserClient();

    useEffect(() => {
        const fetchUser = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            setMetadata(session?.user.user_metadata || null);
            setUser(session?.user || null);
        }
        fetchUser();
    }, [])

    let authDisplay: JSX.Element;

    if (user) {
        authDisplay = (
            <div className="flex flex-row space-x-4">
                <Popover>
                    <PopoverTrigger>
                        <Avatar>
                            <AvatarImage src={metadata?.avatar_url} />
                            <AvatarFallback><UserIcon /></AvatarFallback>
                        </Avatar>
                    </PopoverTrigger>
                    <PopoverContent align="end" className="bg-transparent border-none">
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