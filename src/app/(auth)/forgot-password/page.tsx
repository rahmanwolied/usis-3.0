'use client';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { USI3S } from '@/components/shared/usi3s';
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from '@/components/ui/card';
import { set, z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useToast } from '@/components/ui/use-toast';
import { getSession } from 'next-auth/react';
import { useFormState, useFormStatus } from 'react-dom';
import { forgotPassword } from '@/app/actions';
import { ApiResponseInitialState } from '@/lib/initialStates';
import { Input } from '@/components/ui/input';
import { useEffect, useState } from 'react';
import { SuccessMessage } from './components/successMessage';

const schema = z.object({
	email: z.string({
		invalid_type_error: 'Invalid Email',
	}),
});

export default function Login() {
	const [state, formAction] = useFormState(forgotPassword, ApiResponseInitialState);
	const { pending } = useFormStatus();
	const [submitting, setSubmitting] = useState(false);
	const [emailSent, setEmailSent] = useState(false);
	const { toast } = useToast();
	const router = useRouter();
	const form = useForm<z.infer<typeof schema>>({
		resolver: zodResolver(schema),
	});

	useEffect(() => {
		console.log('pending', pending);
	}, [pending]);

	useEffect(() => {
		if (state?.code === 0) return;
		setSubmitting(false);

		if (state?.status === 'success') {
			setEmailSent(true);
			toast({
				title: 'Success',
				description: state?.message,
			});
		} else if (state?.status === 'error') {
			toast({
				title: 'Error',
				description: state?.message,
				variant: 'destructive',
			});
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [state]);

	return (
		<div className="w-full h-screen flex items-center justify-center gap-44">
			<div className="flex items-center justify-center py-12">
				<div className="mx-auto grid gap-6">
					{emailSent ? (
						<SuccessMessage />
					) : (
						<Card>
							<CardHeader>
								<CardTitle className="text-3xl font-bold">Reset Password</CardTitle>
								<CardDescription className="text-balance">
									Enter your email and we will send you a link
									<br /> to reset your password
								</CardDescription>
							</CardHeader>
							<CardContent>
								<div className="grid gap-4">
									<form action={formAction} className="space-y-4">
										<Form {...form}>
											<FormField
												control={form.control}
												name="email"
												render={({ field }) => (
													<FormItem>
														<FormLabel>Email</FormLabel>
														<FormControl>
															<Input {...field} />
														</FormControl>
													</FormItem>
												)}
											/>
										</Form>
										<Button type="submit" className=" w-full" onClick={(e) => setSubmitting(true)}>
											{submitting ? <Loader2 className="animate-spin" /> : 'Submit'}
										</Button>
									</form>
									<p aria-live="polite" className="sr-only">
										{state?.message}
									</p>
								</div>
							</CardContent>
							<CardFooter className="flex gap-2">
								Don&apos;t have an account?{' '}
								<Link href="/signup" className="underline">
									Sign up
								</Link>
							</CardFooter>
						</Card>
					)}
				</div>
			</div>
			<div className="hidden lg:flex items-center">
				<USI3S variant="large" />
			</div>
		</div>
	);
}

Login.displayName = 'Login';
