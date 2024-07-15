'use client';
import { Button } from '@/components/ui/button';
import { DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useState } from 'react';
import { OTPForm } from './otp-form';
import axios from 'axios';
import { Loader2 } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { useRouter } from 'next/navigation';
import { getSession, signIn } from 'next-auth/react';

export function OTPDialog({ username, password }: { username: string; password: string }) {
	const router = useRouter();
	const { toast } = useToast();
	const [verificationCode, setVerificationCode] = useState('');
	const [submitting, setSubmitting] = useState(false);
	const handleSubmit = async (event: any) => {
		setSubmitting(true);
		event.preventDefault();
		try {
			const res = await axios.post('/api/users/verify-email', { username, token: verificationCode });
			toast({
				title: 'Success',
				description: res.data.message,
				variant: 'success',
			});
			try {
				const response = await signIn('credentials', {
					identifier: username,
					password,
					redirect: false,
				});
				if (response?.error) {
					toast({
						title: 'Sign In Failed',
						description: response.error,
						variant: 'destructive',
					});
				} else {
					const session = await getSession();
					toast({
						title: 'Success',
						description: "Login successful. You're being redirected to your profile",
					});
					if (session?.user) {
						router.push(`/user/${session.user.username}/profile`);
					}
				}
			} catch (error: any) {
				console.error('Error during sign-in:', error);
			}
		} catch (error: any) {
			console.error('Error during email verification:', error);
			toast({
				title: 'Email Verification Failed',
				description: error.response.data.message,
				variant: 'destructive',
			});
		} finally {
			setSubmitting(false);
		}
	};

	return (
		<DialogContent className="sm:max-w-[425px]">
			<DialogHeader>
				<DialogTitle>Verify Email</DialogTitle>
				<DialogDescription>Enter the 6 digit verificaiton code sent to your email</DialogDescription>
			</DialogHeader>
			<div className="grid gap-4 py-4">
				<OTPForm verificationCode={verificationCode} setVerificationCode={setVerificationCode} />
			</div>
			<DialogFooter>
				<DialogClose asChild>
					<Button type="button" variant="secondary">
						Verify Later
					</Button>
				</DialogClose>
				<Button type="submit" onClick={handleSubmit}>
					{submitting ? <Loader2 className="animate-spin" /> : 'Verify'}
				</Button>
			</DialogFooter>
		</DialogContent>
	);
}
