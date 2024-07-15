'use client';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { User } from 'lucide-react';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import React from 'react';

function Page({ params }: { params: { username: string } }) {
	const { username } = params;
	const { data: session } = useSession();

	console.log(session);
	return (
		<div className="h-screen flex items-center">
			{!session?.user?.isVerified && <div className="w-full bg-yellow-950 px-3">You are not verified. Click here to verify</div>}
			<div className="p-4 bg-slate-400 rounded-md flex flex-col justify-center items-center">
				<Avatar>
					<AvatarImage src={session?.user.image!} />
					<AvatarFallback>
						<User />
					</AvatarFallback>
				</Avatar>
				<h1>Name: {session?.user?.name}</h1>
				<h1>Email: {session?.user?.email}</h1>
			</div>
		</div>
	);
}

export default Page;
