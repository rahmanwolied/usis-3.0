'use client';
import React, { useRef, useState } from 'react';
import { signIn } from 'next-auth/react';
import GoogleButton from 'react-google-button';
import SignupForm from './components/signup-form'; // Adjust the path as necessary
import Footer from './components/footer'; // Adjust the path as necessary
import { USI3S } from '@/components/shared/usi3s';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { signupSchema } from '@/schema/signup.schema';
import { z } from 'zod';
import axios, { AxiosError } from 'axios';
import { ApiResponse } from '@/types/ApiResponse.type';
import { useToast } from '@/components/ui/use-toast';
import { useRouter } from 'next/navigation';

function Page() {
	const [isSubmitting, setIsSubmitting] = useState(false);
	const { toast } = useToast();
	const router = useRouter();
	const usernameRef = useRef<HTMLInputElement>(null);

	const form = useForm<z.infer<typeof signupSchema>>({
		resolver: zodResolver(signupSchema),
	});

	const onSubmit = async (data: z.infer<typeof signupSchema>) => {
		setIsSubmitting(true);
		try {
			const response = await axios.post('/api/sign-up', data);

			toast({
				title: 'Success',
				description: response.data.message,
			});

			router.replace(`/verify/${username}`);

			setIsSubmitting(false);
		} catch (error) {
			console.error('Error during sign-up:', error);

			const axiosError = error as AxiosError<ApiResponse<any>>;

			let errorMessage = axiosError.response?.data.message;
			('There was a problem with your sign-up. Please try again.');

			toast({
				title: 'Sign Up Failed',
				description: errorMessage,
				variant: 'destructive',
			});

			setIsSubmitting(false);
		}
	};

	return (
		<div className="h-screen flex items-center justify-center">
			<div className="flex flex-col items-center justify-center space-y-4">
				<SignupForm onSubmit={onSubmit} form={form} usernameRef={usernameRef} />
				<GoogleButton onClick={() => signIn('google')} />
				<Footer />
			</div>

			<div className="h-screen flex items-center">
				<USI3S variant="large" />
			</div>
		</div>
	);
}

export default Page;
