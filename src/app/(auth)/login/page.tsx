'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { signinSchema } from '@/schema/signin.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import { getSession, signIn } from 'next-auth/react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Form } from '@/components/ui/form';
import { useToast } from '@/components/ui/use-toast';
import { Logo } from '@/components/shared/logo';

import LoginForm from './components/login-form';

export default function Login() {
    const { toast } = useToast();
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const form = useForm<z.infer<typeof signinSchema>>({
        resolver: zodResolver(signinSchema),
    });

    const onSubmit = async (data: z.infer<typeof signinSchema>) => {
        setIsSubmitting(true);

        try {
            const response = await signIn('credentials', {
                identifier: data.identifier,
                password: data.password,
                redirect: false,
            });
            if (response?.error) {
                toast({
                    title: 'Sign In Failed',
                    description: response.error,
                    variant: 'destructive',
                });
                setIsSubmitting(false);
            } else {
                const session = await getSession();
                toast({
                    title: 'Success',
                    description:
                        "Login successful. You're being redirected to your profile",
                });
                if (session?.user) {
                    router.push(`/user/${session.user.username}/profile`);
                }
            }
        } catch (error: any) {
            console.error('Error during sign-in:', error);
        }
        setIsSubmitting(false);
    };

    return (
        <div className="flex h-screen w-full items-center justify-center gap-44">
            <div className="flex items-center justify-center py-12">
                <div className="mx-auto grid gap-6">
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-3xl font-bold">
                                Login
                            </CardTitle>
                            <CardDescription className="text-balance">
                                Enter your email below to login to your account
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="grid gap-4">
                                <Form {...form}>
                                    <form
                                        onSubmit={form.handleSubmit(onSubmit)}
                                        className="space-y-4">
                                        <LoginForm form={form}></LoginForm>
                                        <Button
                                            type="submit"
                                            className="w-full">
                                            {isSubmitting ? (
                                                <Loader2 className="animate-spin" />
                                            ) : (
                                                'Sign Up'
                                            )}
                                        </Button>
                                    </form>
                                </Form>
                                <Button
                                    variant="outline"
                                    onClick={() => signIn('google')}>
                                    Sign in with Google
                                </Button>
                            </div>
                        </CardContent>
                        <CardFooter className="flex gap-2">
                            Don&apos;t have an account?{' '}
                            <Link href="/signup" className="underline">
                                Sign up
                            </Link>
                        </CardFooter>
                    </Card>
                </div>
            </div>
            <div className="hidden items-center lg:flex">
                <Logo variant="large" />
            </div>
        </div>
    );
}

Login.displayName = 'Login';
