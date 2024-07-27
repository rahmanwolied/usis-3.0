import React, { useState } from 'react';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input, PasswordInput } from '@/components/ui/input';
import Link from 'next/link';

export default function LoginForm({ form }: { form: any }) {
	return (
		<>
			<FormField
				control={form.control}
				name="identifier"
				render={({ field }) => (
					<FormItem>
						<FormLabel>Email</FormLabel>
						<FormControl>
							<Input {...field} />
						</FormControl>
					</FormItem>
				)}
			/>
			<FormField
				control={form.control}
				name="password"
				render={({ field }) => (
					<FormItem>
						<FormLabel>
							<div className="flex justify-between">
								<div>Password</div>
								<Link href="/forgot-password" className="ml-auto inline-block text-sm underline">
									Forgot your password?
								</Link>
							</div>
						</FormLabel>
						<FormControl>
							<PasswordInput {...field} />
						</FormControl>
					</FormItem>
				)}
			/>
		</>
	);
}

LoginForm.displayName = 'LoginForm';
