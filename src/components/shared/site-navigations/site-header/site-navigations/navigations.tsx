'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { navigations } from '@/config/navigations';
import { cn } from '@/lib/utils';
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';

interface NavigationsProps {
    className?: string;
    mobile?: boolean;
}

const Navigations = ({ className, mobile = false }: NavigationsProps) => {
    const pathname = usePathname();

    if (mobile) {
        return (
            <NavigationMenu>
                <NavigationMenuList className={cn('grid h-full w-full grid-cols-2 grid-rows-2 gap-4 space-x-0', className)}>
                    {navigations.map((navigation, index) => (
                        <NavigationMenuItem
                            key={index}
                            className={cn('mr-0 h-full w-40 rounded-md bg-white/5 p-4 text-white', { 'bg-white/10': pathname === navigation.url })}>
                            <Link href={navigation.url} legacyBehavior passHref>
                                <NavigationMenuLink className={cn('', 'flex flex-col items-center justify-center gap-2')}>
                                    <navigation.icon className="size-5" />
                                    <span>{navigation.name}</span>
                                </NavigationMenuLink>
                            </Link>
                        </NavigationMenuItem>
                    ))}
                </NavigationMenuList>
            </NavigationMenu>
        );
    }

    return (
        <NavigationMenu>
            <NavigationMenuList className={className}>
                {navigations.map((navigation, index) => (
                    <NavigationMenuItem key={index} className="w-full">
                        <Link href={navigation.url} legacyBehavior passHref>
                            <NavigationMenuLink
                                className={cn(navigationMenuTriggerStyle(), 'items-center justify-center gap-2', {
                                    'bg-white/10': pathname === navigation.url,
                                })}>
                                <span>{navigation.name}</span>
                            </NavigationMenuLink>
                        </Link>
                    </NavigationMenuItem>
                ))}
            </NavigationMenuList>
        </NavigationMenu>
    );
};

Navigations.displayName = 'Navigations';

export default Navigations;
