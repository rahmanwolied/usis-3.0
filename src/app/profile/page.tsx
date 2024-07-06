'use client';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import React from 'react';

function Page() {
	const { status, data: session } = useSession();
	console.log(session);
	if (status === 'unauthenticated') return <div>Please Login</div>;
	return (
		<div className="h-screen flex items-center">
			<div className="p-4 bg-slate-400 rounded-md flex flex-col justify-center items-center">
				<Image src={session?.user?.image!} width={60} height={60} alt="img" className="rounded-full" />
				<h1>Name: {session?.user?.name}</h1>
				<h1>Email: {session?.user?.email}</h1>
			</div>
		</div>
	);
}

export default Page;
