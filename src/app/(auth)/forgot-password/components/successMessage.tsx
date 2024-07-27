import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle2 } from 'lucide-react';

export function SuccessMessage() {
	return (
		<Card>
			<CardHeader className="pb-4">
				<CheckCircle2 />
				<CardTitle>Email sent</CardTitle>
			</CardHeader>
			<CardContent>
				<CardDescription>Your password reset link has been sent to your email.</CardDescription>
			</CardContent>
		</Card>
	);
}
