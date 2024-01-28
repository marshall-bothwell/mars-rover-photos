"use server";

import { cookies } from 'next/headers';
import { createSupabaseServerActionClient } from '@/supabase/create-supabase-server-action-client';
import { z } from 'zod';

const signInSchema = z.object({
    email: z.string().email('Must be a valid email address'),
    password: z.string()
                .min(8, 'Must be at least 8 characters')
                .refine((value) => /[A-Z]/.test(value), 'Must contain an uppercase letter')
                .refine((value) => /[a-z]/.test(value), 'Must contain a lowercase letter')
                .refine((value) => /\d/.test(value), 'Must contain a number')
                .refine((value) => /[^\w\d]/.test(value), 'Must contain a symbol')

})

interface SignInFormState {
    errors: {
        email?: string[];
        password?: string[];
        _form?: string[];
    };
    success?: boolean;
}

export async function signIn(formState: SignInFormState, formData: FormData): Promise<SignInFormState> {
    const cookieStore = cookies();
    const supabase = createSupabaseServerActionClient(cookieStore);

    console.log("Signing In")

    const result = signInSchema.safeParse({
        email: formData.get('email'),
        password: formData.get('password')
    })

    if (!result.success) {
        return {
            errors: result.error.flatten().fieldErrors
        }
    }

    const data = { email: result.data.email, password: result.data.password };

    const { data: authReturn, error } = await supabase.auth.signInWithPassword(data);

    if (error) {
        return {
            errors: {
                _form: [error.message]
            }
        }
    }

    console.log(authReturn)

    return {
        errors: {},
        success: true
    }
}