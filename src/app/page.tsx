'use client';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';

export default function Page() {
	const { status } = useSession();
	return (
		<div className="flex h-screen items-center justify-center gap-5">
			{status === 'authenticated' ? (
				<>
					<Link href="/profile">
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
		</div>
	);
}
