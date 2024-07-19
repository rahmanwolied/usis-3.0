'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { getSearchParams } from '@/utilities/get-search-params';
import { zodResolver } from '@hookform/resolvers/zod';
import axios, { AxiosError } from 'axios';
import { Loader2 } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { ApiResponse } from '@/types/ApiResponse.type';
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
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Input, PasswordInput } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import { Logo } from '@/components/shared/logo';
import { forgotPassword } from '@/app/actions';

import { SuccessMessage } from './components/successMessage';

const schema = z.object({
    newPassword: z.string({ required_error: 'Please type a new password' }),
    confirmPassword: z.string(),
    username: z.string(),
    token: z.string(),
});

interface ResetPasswordURLParams {
    username: string;
    token: string;
}

export default function Login() {
    const passRef = useRef<HTMLInputElement>(null);
    const confPassRef = useRef<HTMLInputElement>(null);
    const [message, setMessage] = useState('');

    const [submitting, setSubmitting] = useState(false);
    const [emailSent, setEmailSent] = useState(false);
    const { toast } = useToast();
    const router = useRouter();
    const form = useForm<z.infer<typeof schema>>({
        resolver: zodResolver(schema),
    });

    const { username, token } = getSearchParams<ResetPasswordURLParams>(window.location.search);

    const onSubmit = async (data: z.infer<typeof schema>) => {
        setSubmitting(true);
        console.log('data', data);
        if (passRef.current?.value !== confPassRef.current?.value) {
            toast({
                title: 'Passwords dont match',
                variant: 'destructive',
            });
            setSubmitting(false);
            return;
        }
        try {
            const response = await axios.post('/api/users/reset-password', data);

            toast({
                title: 'Success',
                description: response.data.message,
                variant: 'success',
            });

            setSubmitting(false);
            router.replace('/login', { scroll: true });
        } catch (error) {
            console.error('Error during reset password', error);

            const axiosError = error as AxiosError<ApiResponse<any>>;

            let errorMessage = axiosError.response?.data.message;
            ('There was a problem with resetting your password. Please try again.');

            toast({
                title: 'Reset password failed',
                description: errorMessage,
                variant: 'destructive',
            });

            setSubmitting(false);
        }
    };

    return (
        <div className={'flex h-screen w-full items-center justify-center gap-44'}>
            <div className="flex items-center justify-center py-12">
                <div className="grid gap-6">
                    {emailSent ? (
                        <SuccessMessage />
                    ) : (
                        <Card className="w-full">
                            <CardHeader>
                                <CardTitle className="text-3xl font-bold">Reset Password</CardTitle>
                                <CardDescription className="text-balance">
                                    Enter a new password
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="grid gap-4">
                                    <form
                                        onSubmit={form.handleSubmit(onSubmit)}
                                        className="space-y-4">
                                        <Form {...form}>
                                            <FormField
                                                control={form.control}
                                                name="newPassword"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>New Password</FormLabel>
                                                        <FormControl>
                                                            <PasswordInput
                                                                {...field}
                                                                ref={passRef}
                                                            />
                                                        </FormControl>
                                                    </FormItem>
                                                )}
                                            />
                                            <FormField
                                                control={form.control}
                                                name="confirmPassword"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Confirm Password</FormLabel>
                                                        <FormControl>
                                                            <PasswordInput
                                                                {...field}
                                                                ref={confPassRef}
                                                            />
                                                        </FormControl>
                                                        <FormMessage>{message}</FormMessage>
                                                    </FormItem>
                                                )}
                                            />
                                            <FormField
                                                control={form.control}
                                                name="username"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormControl>
                                                            <Input
                                                                {...field}
                                                                type="hidden"
                                                                value={username}
                                                            />
                                                        </FormControl>
                                                    </FormItem>
                                                )}
                                            />
                                            <FormField
                                                control={form.control}
                                                name="token"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormControl>
                                                            <Input
                                                                {...field}
                                                                type="hidden"
                                                                value={token}
                                                            />
                                                        </FormControl>
                                                    </FormItem>
                                                )}
                                            />
                                        </Form>
                                        <Button
                                            type="submit"
                                            className="w-full"
                                            onClick={(e) => setSubmitting(true)}
                                            disabled={
                                                message !== '' || passRef.current?.value === ''
                                            }>
                                            {submitting ? (
                                                <Loader2 className="animate-spin" />
                                            ) : (
                                                'Submit'
                                            )}
                                        </Button>
                                    </form>
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
