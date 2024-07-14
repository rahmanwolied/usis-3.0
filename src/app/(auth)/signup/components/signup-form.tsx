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
	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
				<FormField
					control={form.control}
					name="email"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Email</FormLabel>
							<FormControl>
								<Input {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="password"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Password</FormLabel>
							<FormControl>
								<div className="flex">
									<Input {...field} type={showPassword ? 'text' : 'password'} />
									<Button variant="ghost" type="button" onClick={togglePasswordVisibility}>
										{showPassword ? <FaEyeSlash /> : <FaEye />}
									</Button>
								</div>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="username"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Username</FormLabel>
							<FormControl>
								<Input {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<Button type="submit" className="bg-blue-500 w-full">
					Sign Up
				</Button>
			</form>
		</Form>
	);
}
