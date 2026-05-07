import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/theme-provider';
import NextTopLoader from 'nextjs-toploader';
import { Toaster } from '@/components/ui/toaster';
import Header from '@/components/header/header';
import { Analytics } from '@vercel/analytics/next';
import { NuqsAdapter } from 'nuqs/adapters/next/app';


const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    metadataBase: new URL('https://marsroverphotos.app'),
    title: {
        default: 'Mars Rover Photos',
        template: '%s | Mars Rover Photos',
    },
    description: "Search and explore real photos from NASA's Mars rovers - Curiosity, Perseverance, and Ingenuity. " + 
                 "Browse by sol, camera, or mission to see Mars up close.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en" suppressHydrationWarning={true}>
            <head>
                <link rel="icon" href="/favicon.ico" sizes="any" />
            </head>
            <body className={inter.className}>
                <NuqsAdapter>
                    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
                        <Header />
                        <NextTopLoader showSpinner={false} color="#e87a3d"/>
                        <div className="select-none">{children}</div>
                        <Analytics />
                        <Toaster />
                    </ThemeProvider>
                </NuqsAdapter>
            </body>
        </html>
    );
}
