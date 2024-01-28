import Link from 'next/link';
import { Rocket } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import HeaderAuth from '@/components/header/header-auth';


export default function Header() {

    return (
        <header>
            <div className="flex flex-row items-center mx-4 my-4 sm:mx-8">
                <Link href="/" className="flex flex-row">
                    <Rocket color="#86d0fe" className="mr-4 hover:animate-pulse" /> 
                    <div className="sm:text-lg font-bold hover:animate-pulse">Mars Rover Photos</div>
                </Link>
                <div className="ml-auto flex flex-row space-x-2">
                    <HeaderAuth />
                </div>
            </div>
            <Separator className="shadow "/>
        </header>
    )
}