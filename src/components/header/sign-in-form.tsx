"use client";

import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import FormButton from '@/components/common/form-button';
import { useFormState } from 'react-dom';
import * as actions from '@/actions';

export default function SignInForm() {
    const [signUpState, signUpAction] = useFormState(actions.signUp, { errors: {} })
    const [signInState, signInAction] = useFormState(actions.signIn, { errors: {} })

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline">Sign In</Button>
            </DialogTrigger>
            <DialogContent className="w-[90vw] sm:w-auto rounded-xl">
                <DialogHeader>
                    <DialogTitle>Sign In</DialogTitle>
                    <DialogDescription>Sign in with your email address, or use your Google or Github account.</DialogDescription>
                </DialogHeader>
                <form action={signInAction}>
                    { !!signUpState.errors._form ? <p className="text-sm text-red-400 text-right mb-2">{signUpState.errors._form}</p> : null }
                    { !!signInState.errors._form ? <p className="text-sm text-red-400 text-right mb-2">{signInState.errors._form}</p> : null }
                    <div className="grid grid-cols-4 items-center">
                        <Label className="text-right mr-2" htmlFor="email">Email</Label>
                        <Input className="col-span-3" id="email" name="email" autoComplete="off" />
                    </div>
                    { !!signUpState.errors.email ? <p className="text-sm text-red-400 text-right">{signUpState.errors.email.join(", ")}</p> : null }
                    { !!signInState.errors.email ? <p className="text-sm text-red-400 text-right">{signInState.errors.email.join(", ")}</p> : null }
                    <div className="grid grid-cols-4 items-center mt-6">
                        <Label className="text-right mr-2" htmlFor="password">Password</Label>
                        <Input className="col-span-3" id="password" name="password" type="password" autoComplete="off" />
                    </div>
                    { !!signUpState.errors.password ? <p className="text-sm text-red-400 text-right">{signUpState.errors.password.join(", ")}</p> : null }
                    { !!signInState.errors.password ? <p className="text-sm text-red-400 text-right">{signInState.errors.password.join(", ")}</p> : null }
                    <div className="flex flex-row-reverse items-center mt-6">
                        <FormButton className="ml-6" variant="outline" action={signInAction}>Sign In</FormButton>
                        <FormButton variant="outline" action={signUpAction}>Sign Up</FormButton>
                    </div>
                    { signUpState.success ? <p className="text-sm text-green-400 text-right">Email sent. Click the link in the email to confirm your account.</p> : null }
                </form>
                <Separator />
                <DialogFooter>
                    <div className="flex flex-col w-full">
                    <DialogDescription className="mb-4">Sign in with Github or Google</DialogDescription>
                    <div className="flex flex-row-reverse">
                        <form action={actions.signInWithGithub}>
                            <FormButton className="ml-6" variant="outline" size="sm">Github</FormButton>
                        </form>
                        <form>
                            <FormButton variant="outline" size="sm">Google</FormButton>
                        </form>
                    </div>
                    </div>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}