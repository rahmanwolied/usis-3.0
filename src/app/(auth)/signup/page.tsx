'use client';
import React, { useRef, useState } from 'react';
import { signIn } from 'next-auth/react';
import SignupForm from './components/signup-form'; // Adjust the path as necessary
import { USI3S } from '@/components/shared/usi3s';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { signupSchema } from '@/schema/signup.schema';
import { z } from 'zod';
import axios, { AxiosError } from 'axios';
import { ApiResponse } from '@/types/ApiResponse.type';
import { useToast } from '@/components/ui/use-toast';
import { useRouter } from 'next/navigation';
import { Form } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import { OTPDialog } from './components/otp-dialog';

function Page() {
	const [isSubmitting, setIsSubmitting] = useState(false);
	const { toast } = useToast();
	const router = useRouter();
	const usernameRef = useRef<HTMLInputElement>(null);
	const dialogButton = useRef<HTMLButtonElement>(null);

	const form = useForm<z.infer<typeof signupSchema>>({
		resolver: zodResolver(signupSchema),
		defaultValues: {
			isFaculty: false,
		},
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

			// Open the OTP dialog
			dialogButton.current?.click();

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
					<Card>
						<CardHeader>
							<CardTitle>Sign Up</CardTitle>
							<CardDescription>Enter the information below to create a new account</CardDescription>
						</CardHeader>
						<CardContent>
							<div className="grid gap-4">
								<Form {...form}>
									<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
										<SignupForm form={form}></SignupForm>
										<Button type="submit" className=" w-full">
											{isSubmitting ? <Loader2 className="animate-spin" /> : 'Sign Up'}
										</Button>
									</form>
								</Form>
								<Button variant="outline" onClick={() => signIn('google')}>
									Sign in with Google
								</Button>
							</div>
						</CardContent>
						<CardFooter>
							Already have an account? {'  '}
							<Link href="/login" className="underline">
								{' '}
								Login
							</Link>
						</CardFooter>
					</Card>
				</div>
			</div>
			<div className="hidden lg:flex items-center">
				<USI3S variant="large" />
			</div>
			<Dialog>
				<DialogTrigger>
					<Button className="hidden" ref={dialogButton}>
						Open Dialog
					</Button>
				</DialogTrigger>
				<OTPDialog username={form.getValues().username} password={form.getValues().password}></OTPDialog>
			</Dialog>
		</div>
	);
}

export default Page;
