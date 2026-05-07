import Link from 'next/link';
import { Rocket } from 'lucide-react';
import { MarsPatch } from '@/components/icons/MarsPatch';
import HeaderAuth from '@/components/header/header-auth';
import AboutButton from '@/components/common/about-button';

export default function Header() {
    return (
        <header>
            <div className="flex flex-row items-center mx-4 my-4 sm:mx-8">
                <Link href="/" className="flex flex-row">
                    <MarsPatch size={30} className="mr-2 hover:animate-pulse" />
                    <div className="sm:text-lg font-bold hover:animate-pulse ">Mars Rover Photos</div>
                </Link>
                <div className="ml-auto flex flex-row space-x-2">
                    <AboutButton />
                    <HeaderAuth />
                </div>
            </div>
        </header>
    );
}
