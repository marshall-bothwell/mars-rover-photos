import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/theme-provider';
import NextTopLoader from 'nextjs-toploader';
import { Toaster } from '@/components/ui/toaster';
import Header from '@/components/header/header';
import { Analytics } from '@vercel/analytics/next';


import SpaceBackground from '@/components/common/space-background';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'Mars Rover Photos',
    description: 'A web application for searching and saving Mars rover photos.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en" suppressHydrationWarning={true}>
            <head>
                <link rel="icon" href="/favicon.ico" sizes="any" />
            </head>
            <body className={inter.className}>
                <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
                    <Header />
                    <NextTopLoader showSpinner={false} />
                    <div className="select-none">{children}</div>
                    <Analytics />
                    <Toaster />
                    <SpaceBackground starCount={8000} />
                </ThemeProvider>
            </body>
        </html>
    );
}
