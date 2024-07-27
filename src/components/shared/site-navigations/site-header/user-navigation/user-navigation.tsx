'use client';

import React from 'react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import UserNavigations from './user-navigations';

const UserNavigation = () => {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon" className="overflow-hidden rounded-full">
                    <Avatar>
                        <AvatarImage src="" />
                        <AvatarFallback />
                    </Avatar>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuLabel className="w-36 font-normal">
                    <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">Account</p>
                        <p className="truncate text-xs leading-none text-muted-foreground">
                            Wolied
                        </p>
                    </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <UserNavigations />
                <DropdownMenuSeparator />
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

UserNavigation.displayName = 'UserNavigation';

export default UserNavigation;
