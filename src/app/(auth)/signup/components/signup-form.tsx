'use client';
import React, { useState } from 'react';
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input, PasswordInput } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';

export default function SignupForm({ form }: { form: any }) {
	return (
		<>
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
							<PasswordInput {...field} />
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
			<FormField
				control={form.control}
				name="department"
				render={({ field }) => (
					<FormItem>
						<FormLabel>Department (Program)</FormLabel>
						<Select onValueChange={field.onChange} defaultValue={field.value}>
							<FormControl>
								<SelectTrigger className="bg-card">
									<SelectValue placeholder="Select your department" />
								</SelectTrigger>
							</FormControl>
							<SelectContent>
								<SelectItem value="CSE">Computer Science and Engineering (CSE)</SelectItem>
								<SelectItem value="CS">Computer Science (CS)</SelectItem>
								<SelectItem value="EEE">Electrical and Electronic Engineering (EEE)</SelectItem>
								<SelectItem value="ARCH">Architecture</SelectItem>
								<SelectItem value="ECO">Economics</SelectItem>
								<SelectItem value="ANT">Anthropology</SelectItem>
								<SelectItem value="PHR">Pharmacy</SelectItem>
								<SelectItem value="ENG">English</SelectItem>
								<SelectItem value="APE">Applied Physics and Electronics</SelectItem>
								<SelectItem value="MBC">Microbiology</SelectItem>
								<SelectItem value="MAT">Mathematics</SelectItem>
								<SelectItem value="PHY">Physics</SelectItem>
							</SelectContent>
						</Select>
						<FormMessage />
					</FormItem>
				)}
			/>
			<FormField
				control={form.control}
				name="isFaculty"
				render={({ field }) => (
					<FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
						<FormControl>
							<Checkbox checked={field.value} onCheckedChange={field.onChange} />
						</FormControl>
						<div className="space-y-1 leading-none">
							<FormLabel>I am a faculty</FormLabel>
							<FormDescription>
								<h1 className="mb-1">Select this if you are a faculty member of the university.</h1>
								This will limit the features you can use.
							</FormDescription>
							<FormMessage />
						</div>
					</FormItem>
				)}
			/>
		</>
	);
}
