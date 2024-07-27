import type { Metadata } from 'next';

import './globals.css';

import { AuthProvider } from '@/context/AuthProvider';

import { fontMono, fontSans } from '@/lib/fonts';
import { cn } from '@/lib/utils';
import { Toaster } from '@/components/ui/toaster';
import SiteFooter from '@/components/shared/site-navigations/site-footer';
import SiteHeader from '@/components/shared/site-navigations/site-header/site-header';
import { ThemeProvider } from '@/components/shared/theme-provider';

export const metadata: Metadata = {
    title: 'U3IS',
    description: 'For the students by the students',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <AuthProvider>
                <ThemeProvider
                    attribute="class"
                    defaultTheme="dark"
                    enableSystem
                    disableTransitionOnChange>
                    <body
                        className={cn(
                            'min-h-screen overflow-x-auto scroll-smooth bg-background font-sans antialiased',
                            fontSans.variable,
                            fontMono.variable,
                        )}>
                        <SiteHeader />
                        <main className="relative flex min-h-screen flex-col">{children}</main>
                        <SiteFooter />

                        <Toaster />
                    </body>
                </ThemeProvider>
            </AuthProvider>
        </html>
    );
}
