'use client';
import { Button } from '@/components/ui/button';
import { DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useState } from 'react';
import { OTPForm } from './otp-form';

export function OTPDialog({ username }: { username: string }) {
	const [verificationCode, setVerificationCode] = useState('');

	const handleSubmit = async (event: any) => {
		event.preventDefault();
		await fetch('/api/users/verify-email', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ username, value: verificationCode }),
		});
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
				<Button type="submit" onClick={handleSubmit}>
					Submit
				</Button>
			</DialogFooter>
		</DialogContent>
	);
}
