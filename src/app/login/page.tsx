'use client';
import React from 'react';
import { signIn } from 'next-auth/react';
import GoogleButton from 'react-google-button';
import LoginForm from './components/login-form'; // Adjust the path as necessary
import Footer from './components/footer'; // Adjust the path as necessary

function Page() {
	return (
		<form>
			<div className="h-screen flex flex-col items-center justify-center space-y-4">
				<LoginForm />
				<GoogleButton onClick={() => signIn('google', { callbackUrl: '/profile' })} />
				<Footer />
			</div>
		</form>
	);
}

export default Page;
