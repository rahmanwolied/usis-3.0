'use client';

import Link from 'next/link';
import { signOut, useSession } from 'next-auth/react';

import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

export default function Page() {
    const { status, data: session } = useSession();
    return (
        <div className="flex h-screen items-center justify-center gap-5">
            {status === 'authenticated' ? (
                <>
                    <Link href={`/user/${session?.user.username}/profile`}>
                        <Button>Profile</Button>
                    </Link>

                    <Button onClick={() => signOut()}>Logout</Button>
                </>
            ) : (
                <>
                    <Link href="/signup">
                        <Button>Signup</Button>
                    </Link>
                    <Link href="/login">
                        <Button>Login</Button>
                    </Link>
                </>
            )}
            <Popover>
                <PopoverTrigger>Click</PopoverTrigger>
                <PopoverContent>
                    <Popover>
                        <PopoverTrigger>Click</PopoverTrigger>
                        <PopoverContent>Sex2</PopoverContent>
                    </Popover>
                </PopoverContent>
            </Popover>
        </div>
    );
}
