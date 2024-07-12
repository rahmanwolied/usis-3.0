'use client';
import React, { useState } from 'react';
import { signIn } from 'next-auth/react';
import GoogleButton from 'react-google-button';
import SignupForm from './components/signup-form'; // Adjust the path as necessary
import Footer from './components/footer'; // Adjust the path as necessary
import Image from 'next/image';

function Page() {
	return (
		<form>
			<div className="h-screen flex flex-col items-center justify-center space-y-4">
				<Image src="/static/usis-logo.png" width={100} height={100} alt="usis"></Image>
				<SignupForm />
				<GoogleButton onClick={() => signIn('google')} />
				<Footer />
			</div>
		</form>
	);
}

export default Page;
