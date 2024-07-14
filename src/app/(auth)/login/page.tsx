import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { USI3S } from '@/components/shared/usi3s';
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from '@/components/ui/card';
import { signinSchema } from '@/schema/signin.schema';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

export default function Login() {
	const form = useForm<z.infer<typeof signinSchema>>({
		resolver: zodResolver(signinSchema),
	});

	return (
		<div className="w-full h-screen flex items-center justify-center gap-44">
			<div className="flex items-center justify-center py-12">
				<div className="mx-auto grid gap-6">
					<Card>
						<CardHeader>
							<CardTitle className="text-3xl font-bold">Login</CardTitle>
							<CardDescription className="text-balance">Enter your email below to login to your account</CardDescription>
						</CardHeader>
						<CardContent>
							<div className="grid gap-4">
								<div className="grid gap-2">
									<Label htmlFor="email">Email</Label>
									<Input id="email" type="email" placeholder="m@example.com" required />
								</div>
								<div className="grid gap-2">
									<div className="flex items-center">
										<Label htmlFor="password">Password</Label>
										<Link href="/forgot-password" className="ml-auto inline-block text-sm underline">
											Forgot your password?
										</Link>
									</div>
									<Input id="password" type="password" required />
								</div>
								<Button type="submit" className="w-full">
									Login
								</Button>
								<Button variant="outline" className="w-full">
									Login with Google
								</Button>
							</div>
						</CardContent>
						<CardFooter className="flex gap-2">
							Don&apos;t have an account?{' '}
							<Link href="#" className="underline">
								Sign up
							</Link>
						</CardFooter>
					</Card>
				</div>
			</div>
			<div className="hidden lg:flex items-center">
				<USI3S variant="large" />
			</div>
		</div>
	);
}

Login.displayName = 'Login';
