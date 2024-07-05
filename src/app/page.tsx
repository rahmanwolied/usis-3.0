'use client';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function Page() {
	return (
		<div className="flex h-screen items-center justify-center gap-5">
			<Link href="/signup">
				<Button>Signup</Button>
			</Link>
			<Link href="/login">
				<Button>Login</Button>
			</Link>
		</div>
	);
}
