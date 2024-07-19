'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import { getSession } from 'next-auth/react';
import { useFormState, useFormStatus } from 'react-dom';
import { useForm } from 'react-hook-form';
import { set, z } from 'zod';

import { ApiResponseInitialState } from '@/lib/initialStates';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import { Logo } from '@/components/shared/logo';
import { forgotPassword } from '@/app/actions';

import { SuccessMessage } from './components/successMessage';

const schema = z.object({
    email: z.string({
        invalid_type_error: 'Invalid Email',
    }),
});

export default function Login() {
    const [state, formAction] = useFormState(forgotPassword, ApiResponseInitialState);
    const { pending } = useFormStatus();
    const [submitting, setSubmitting] = useState(false);
    const [emailSent, setEmailSent] = useState(false);
    const { toast } = useToast();
    const router = useRouter();
    const form = useForm<z.infer<typeof schema>>({
        resolver: zodResolver(schema),
    });

    useEffect(() => {
        console.log('pending', pending);
    }, [pending]);

    useEffect(() => {
        if (state?.code === 0) return;
        setSubmitting(false);

        if (state?.status === 'success') {
            setEmailSent(true);
            toast({
                title: 'Success',
                description: state?.message,
            });
        } else if (state?.status === 'error') {
            toast({
                title: 'Error',
                description: state?.message,
                variant: 'destructive',
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [state]);

    return (
        <div className="flex h-screen w-full items-center justify-center gap-44">
            <div className="flex items-center justify-center py-12">
                <div className="mx-auto grid gap-6">
                    {emailSent ? (
                        <SuccessMessage />
                    ) : (
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-3xl font-bold">
                                    Forgot Password
                                </CardTitle>
                                <CardDescription className="text-balance">
                                    Enter your email and we will send you a link
                                    <br /> to reset your password
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="grid gap-4">
                                    <form action={formAction} className="space-y-4">
                                        <Form {...form}>
                                            <FormField
                                                control={form.control}
                                                name="email"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Email</FormLabel>
                                                        <FormControl>
                                                            <Input {...field} />
                                                        </FormControl>
                                                    </FormItem>
                                                )}
                                            />
                                        </Form>
                                        <Button
                                            type="submit"
                                            className="w-full"
                                            onClick={(e) => setSubmitting(true)}>
                                            {submitting ? (
                                                <Loader2 className="animate-spin" />
                                            ) : (
                                                'Submit'
                                            )}
                                        </Button>
                                    </form>
                                    <p aria-live="polite" className="sr-only">
                                        {state?.message}
                                    </p>
                                </div>
                            </CardContent>
                            <CardFooter className="flex gap-2">
                                Don&apos;t have an account?{' '}
                                <Link href="/signup" className="underline">
                                    Sign up
                                </Link>
                            </CardFooter>
                        </Card>
                    )}
                </div>
            </div>
            <div className="hidden items-center lg:flex">
                <Logo variant="large" />
            </div>
        </div>
    );
}

Login.displayName = 'Login';
