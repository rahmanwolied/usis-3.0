import React from 'react';
import Link from 'next/link';
import { LogOut, User2 } from 'lucide-react';
import { signOut, useSession } from 'next-auth/react';

import { DropdownMenuGroup, DropdownMenuItem } from '@/components/ui/dropdown-menu';

const userNavigations = [
    {
        name: 'Profile',
        icon: User2,
        href: '#',
    },
    {
        name: 'Logout',
        icon: LogOut,
        href: '#',
    },
];

const UserNavigations = () => {
    const { data: session } = useSession();

    userNavigations[0].href = `/user/wolied/profile`;
    return (
        <DropdownMenuGroup>
            <Link href={`/user/${session?.user.username}/profile`}>
                <DropdownMenuItem>
                    <User2 className="mr-2 size-4" />
                    <span>Profile</span>
                </DropdownMenuItem>
            </Link>

            <DropdownMenuItem>
                <LogOut className="mr-2 size-4" />
                <span>Logout</span>
            </DropdownMenuItem>
        </DropdownMenuGroup>
    );
};

UserNavigations.displayName = 'UserNavigations';

export default UserNavigations;
