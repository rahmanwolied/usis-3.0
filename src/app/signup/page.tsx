'use client';
import { signIn } from 'next-auth/react';
import React from 'react';
import GoogleButton from 'react-google-button';

function page() {
	return (
		<div className="h-screen flex items-center">
			<GoogleButton onClick={() => signIn('google')} />
		</div>
	);
}

export default page;
