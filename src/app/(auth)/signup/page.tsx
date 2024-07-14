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
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

function Page() {
	const [isSubmitting, setIsSubmitting] = useState(false);
	const { toast } = useToast();
	const router = useRouter();
	const usernameRef = useRef<HTMLInputElement>(null);

	const form = useForm<z.infer<typeof signupSchema>>({
		resolver: zodResolver(signupSchema),
	});

	const onSubmit = async (data: z.infer<typeof signupSchema>) => {
		console.log('data:', data);
		setIsSubmitting(true);
		try {
			const response = await axios.post('/api/users/signup', data);

			toast({
				title: 'Success',
				description: response.data.message,
				variant: 'success',
			});

			// router.replace(`/verify/${usernameRef.current?.value}`);

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
		<div className="w-full h-screen flex items-center justify-center gap-44">
			<div className="flex items-center justify-center py-12">
				<div className="mx-auto grid gap-6">
					<div className="grid gap-2 text-center">
						<h1 className="text-3xl font-bold">Sign Up</h1>
						<p className="text-balance text-muted-foreground">Enter the information below to sign up</p>
					</div>
					<div className="grid gap-4">
						<SignupForm onSubmit={onSubmit} form={form} usernameRef={usernameRef}></SignupForm>

						<Button onClick={() => signIn('google')}>Sign in with Google</Button>
					</div>
					<div className="mt-4 text-center text-sm">
						Already have an account?{' '}
						<Link href="/login" className="underline">
							Login
						</Link>
					</div>
				</div>
			</div>
			<div className="hidden lg:flex items-center">
				<USI3S variant="large" />
			</div>
		</div>
	);
}

export default Page;
