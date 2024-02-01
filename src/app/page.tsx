import SearchForm from '@/components/search/search-form'
import AboutButton from '@/components/common/about-button'
import { AiFillGithub, AiFillLinkedin } from 'react-icons/ai'
import Link from 'next/link'

export default function Home() {

    return (
        <div className="flex flex-col items-center text-center">
            <div className="text-7xl font-bold my-4 px-8 bg-gradient-to-r from-teal-200 via-cyan-400 to-cyan-200 inline-block text-transparent bg-clip-text">Mars Rover Photos</div>
            <div className="flex flex-col space-y-4 items-center px-8 text-lg text-center">
                <AboutButton />
            </div>
            <SearchForm />
            <div className="fixed bottom-0 left-0 w-full flex flex-row-reverse space-x-4 mb-2 items-center">
                <Link href="https://linkedin.com/in/marshall-bothwell" className="mx-4"> 
                    <AiFillLinkedin size={24} />
                </Link>
                <Link href="https://github.com/marshall-bothwell" className="mr-4">                  
                    <AiFillGithub size={24}/>
                </Link>
                <p className="text-sm">Made by Marshall Bothwell</p>
            </div>
        </div>
    )
}

/*
<p>
    Search photos from any of the four Mars Rovers<br /><br />
    Dates are automatically filtered - no sifting through empty pages<br /><br />
    Create an account or sign in through GitHub to save photos<br /><br />
    Share any interesting photos you find by through a link to your profile page
</p> 
*/