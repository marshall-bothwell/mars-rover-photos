'use server';

import { cookies } from 'next/headers';
import { createSupabaseServerActionClient } from '@/supabase/create-supabase-server-action-client';
import { z } from 'zod';

const signUpSchema = z.object({
    email: z.string().email('Must be a valid email address'),
    password: z.string()
                .min(8, 'Must be at least 8 characters')
                .refine((value) => /[A-Z]/.test(value), 'Must contain an uppercase letter')
                .refine((value) => /[a-z]/.test(value), 'Must contain a lowercase letter')
                .refine((value) => /\d/.test(value), 'Must contain a number')
                .refine((value) => /[^\w\d]/.test(value), 'Must contain a symbol')

})

interface SignUpFormState {
    errors: {
        email?: string[];
        password?: string[];
        _form?: string[];
    };
    success?: boolean;
}

export async function signUp(formState: SignUpFormState, formData: FormData): Promise<SignUpFormState> {
    const cookieStore = cookies();
    const supabase = createSupabaseServerActionClient(cookieStore);

    const result = signUpSchema.safeParse({
        email: formData.get("email"),
        password: formData.get("password")
    })

    if (!result.success) {
        return {
            errors: result.error.flatten().fieldErrors
        }
    }

    const data = { email: result.data.email, password: result.data.password };

    const { data: authReturn, error } = await supabase.auth.signUp(data);

    if (error) {
        return {
            errors: {
                _form: [error.message]
            }
        }
    } else if (authReturn.user?.identities?.length === 0) {
        return {
            errors: {
                _form: ["There is already an account associated with this email address."]
            }
        }
    }

    return {
        errors: {},
        success: true
    }
}