'use client';

import React from 'react';
import { Bars3Icon } from '@heroicons/react/24/solid';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import Searchbar from '@/components/shared/search-bar';

import { Navigations } from '.';

const MobileNavigations = () => {
    // TODO use pathname to dynamically show fame navigations
    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                    <Bars3Icon className="size-6 text-gray-400" />
                </Button>
            </SheetTrigger>
            <SheetContent className="flex flex-col gap-y-8">
                <Searchbar />
                <NavigationSection>
                    <NavigationSectionHeader>
                        <NavigationSectionTitle>Discover</NavigationSectionTitle>
                    </NavigationSectionHeader>
                    <Navigations mobile />
                </NavigationSection>
                <NavigationSection>
                    <NavigationSectionHeader>
                        <NavigationSectionTitle>U3IS</NavigationSectionTitle>
                    </NavigationSectionHeader>
                </NavigationSection>
                <NavigationSection>
                    <NavigationSectionHeader>
                        <NavigationSectionTitle>Neworks</NavigationSectionTitle>
                    </NavigationSectionHeader>
                </NavigationSection>
            </SheetContent>
        </Sheet>
    );
};

MobileNavigations.displayName = 'MobileNavigations';

export default MobileNavigations;

interface NavigationSectionProps {
    children: React.ReactNode;
    className?: string;
}

const NavigationSection = ({ children, className }: NavigationSectionProps) => {
    return <section className={cn('flex flex-col gap-4', className)}>{children}</section>;
};

NavigationSection.displayName = 'NavigationSection';

const NavigationSectionHeader = ({ children, className }: NavigationSectionProps) => {
    return (
        <header className={cn('flex items-center justify-between gap-4', className)}>
            {children}
            <Separator className="w-[70%]" />
        </header>
    );
};

const NavigationSectionTitle = ({ children, className }: NavigationSectionProps) => {
    return <h2 className={cn('text-lg font-semibold text-gray-50', className)}>{children}</h2>;
};

NavigationSectionTitle.displayName = 'NavigationSectionTitle';
