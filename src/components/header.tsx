import Link from 'next/link';
import { Rocket } from 'lucide-react';
import { DarkModeToggle } from '@/components/common/dark-mode-toggle';
import { Separator } from '@/components/ui/separator';
import { buttonVariants } from '@/components/ui/button';

// TODO: Replace the home logo with a more appropriate logo for mars rover photo
//       Add OAuth Google sign-in with next-auth

export default function Header() {

    return (
        <header>
            <div className="flex flex-row items-center mx-4 my-4 sm:mx-8">
                <Link href="/" className="flex flex-row">
                    <Rocket className="mr-4" /> 
                    <div className="sm:text-lg font-bold">Mars Rover Photos</div>
                </Link>
                <div className="ml-auto">
                    <Link href="/" className={buttonVariants({variant: "outline"})}>
                        Sign In
                    </Link>
                </div>
                <div className="ml-4">
                    <DarkModeToggle />
                </div>
            </div>
            <Separator className="shadow"/>
        </header>
    )
}