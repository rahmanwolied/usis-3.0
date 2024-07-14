'use client';
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { Dialog, DialogTrigger } from '@radix-ui/react-dialog';
import { OTPDialog } from './otp-dialog';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';

export default function SignupForm({ onSubmit, form, usernameRef }: { onSubmit: (values: any) => void; form: any; usernameRef: any }) {
	const [showPassword, setShowPassword] = useState(false);

	const togglePasswordVisibility = () => setShowPassword(!showPassword);
	const [formData, setFormData] = useState({ username: '', email: '', password: '' });

	const handleSubmit = async (event: any) => {};

	const handleChange = (event: any) => {
		const { name, value } = event.target;
		setFormData((prevState) => ({
			...prevState,
			[name]: value,
		}));
	};
	return (
		<div className="h-screen flex flex-col justify-between">
			<div className="w-full max-w-md mx-auto">
				<h1 className="text-center text-2xl font-bold my-10">USIS 3.0 Signup</h1>
				<nav className="border-sky-400 p-4 shadow rounded">
					<div className="flex flex-col gap-3 items-center">
						<Form {...form}>
							<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
								<FormField
									control={form.control}
									name="username"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Username</FormLabel>
											<FormControl>
												<Input placeholder="shadcn" {...field} ref={usernameRef} />
											</FormControl>
											<FormDescription>This is your public display name.</FormDescription>
											<FormMessage />
										</FormItem>
									)}
								/>
								<Button type="submit">Submit</Button>
							</form>
						</Form>
						<Dialog>
							<DialogTrigger>
								{/* <Button onClick={handleSubmit}>Sign Up</Button> */}
								<Button variant="default">Sign Up</Button>
							</DialogTrigger>
							<OTPDialog username={formData.username} />
						</Dialog>
					</div>
				</nav>
			</div>
		</div>
	);
}
