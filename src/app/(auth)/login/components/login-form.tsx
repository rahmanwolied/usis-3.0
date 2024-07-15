import React, { useState } from 'react';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input, PasswordInput } from '@/components/ui/input';

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
						<FormLabel>Password</FormLabel>
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
