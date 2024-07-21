'use client';

import React from 'react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';

import { Separator } from '@/components/ui/separator';
import Container from '@/components/shared/container';
import { Logo } from '@/components/shared/logo';

import { MobileNavigations, Navigations } from './site-navigations';
import { ThemeSwitcher } from './theme-switcher';
import UserNavigation from './user-navigation';

const SiteHeader = () => {
    const { status } = useSession();
    return (
        <header className="sticky top-0 z-50 w-full bg-black/5 backdrop-blur supports-[backdrop-filter]:bg-black/10">
            <Container className="flex h-16 items-center justify-between">
                <div className="flex items-center">
                    <Link href="/">
                        <Logo variant="small" />
                    </Link>
                    <Separator orientation="vertical" className="ml-6 mr-1 hidden h-8 md:block" />
                    <div className="hidden md:flex">
                        <Navigations />
                    </div>
                </div>
                <div className="flex items-center gap-x-4">
                    {status === 'authenticated' ? <UserNavigation /> : <Link href="/login">Login</Link>}
                    <ThemeSwitcher />
                    <div className="md:hidden">
                        <MobileNavigations />
                    </div>
                </div>
            </Container>
        </header>
    );
};

SiteHeader.displayName = 'SiteHeader';
export default SiteHeader;
