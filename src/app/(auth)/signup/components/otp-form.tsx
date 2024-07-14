'use client';

import * as React from 'react';

import { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator } from '@/components/ui/input-otp';

export function OTPForm({ verificationCode, setVerificationCode }: { verificationCode: string; setVerificationCode: (value: string) => void }) {
	return (
		<div className="flex justify-center items-center flex-col gap-4">
			<InputOTP maxLength={6} value={verificationCode} onChange={(value) => setVerificationCode(value)}>
				<InputOTPGroup>
					<InputOTPSlot index={0} />
					<InputOTPSlot index={1} />
					<InputOTPSlot index={2} />
				</InputOTPGroup>
				<InputOTPSeparator />
				<InputOTPGroup>
					<InputOTPSlot index={3} />
					<InputOTPSlot index={4} />
					<InputOTPSlot index={5} />
				</InputOTPGroup>
			</InputOTP>
			<div className="text-center text-sm">
				{verificationCode === '' ? <>Enter your verification code.</> : <>You entered: {verificationCode}</>}
			</div>
		</div>
	);
}
