'use client';

import React, { useRef, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { signupSchema } from '@/schema/signup.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import axios, { AxiosError } from 'axios';
import { Loader2 } from 'lucide-react';
import { signIn } from 'next-auth/react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { ApiResponse } from '@/types/ApiResponse.type';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import { Form } from '@/components/ui/form';
import { useToast } from '@/components/ui/use-toast';
import { Logo } from '@/components/shared/logo';

import { OTPDialog } from './components/otp-dialog';
import SignupForm from './components/signup-form'; // Adjust the path as necessary

function Page() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { toast } = useToast();
    const router = useRouter();
    const usernameRef = useRef<HTMLInputElement>(null);
    const dialogButton = useRef<HTMLButtonElement>(null);

    const form = useForm<z.infer<typeof signupSchema>>({
        resolver: zodResolver(signupSchema),
        defaultValues: {
            isFaculty: false,
        },
    });

    const onSubmit = async (data: z.infer<typeof signupSchema>) => {
        console.log('data:', data);
        setIsSubmitting(true);
        try {
            const response = await axios.post('/api/users/signup', data);

            toast({
                title: 'Success',
                description: response.data.message,
                variant: 'success',
            });

            // Open the OTP dialog
            dialogButton.current?.click();

            setIsSubmitting(false);
        } catch (error) {
            console.error('Error during sign-up:', error);

            const axiosError = error as AxiosError<ApiResponse<any>>;

            let errorMessage = axiosError.response?.data.message;
            ('There was a problem with your sign-up. Please try again.');

            toast({
                title: 'Sign Up Failed',
                description: errorMessage,
                variant: 'destructive',
            });

            setIsSubmitting(false);
        }
    };

    return (
        <div className="flex h-screen w-full items-center justify-center gap-44">
            <div className="flex items-center justify-center py-12">
                <div className="mx-auto grid gap-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Sign Up</CardTitle>
                            <CardDescription>
                                Enter the information below to create a new account
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="grid gap-4">
                                <Form {...form}>
                                    <form
                                        onSubmit={form.handleSubmit(onSubmit)}
                                        className="space-y-4">
                                        <SignupForm form={form}></SignupForm>
                                        <Button type="submit" className="w-full">
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
                                    className="bg-card"
                                    onClick={() => signIn('google')}>
                                    Sign in with Google
                                </Button>
                            </div>
                        </CardContent>
                        <CardFooter className="flex gap-1">
                            Already have an account? {'  '}
                            <Link href="/login" className="underline">
                                {' '}
                                Login
                            </Link>
                        </CardFooter>
                    </Card>
                </div>
            </div>
            <div className="hidden items-center lg:flex">
                <Logo variant="large" />
            </div>
            <Dialog>
                <DialogTrigger>
                    <Button className="hidden" ref={dialogButton}>
                        Open Dialog
                    </Button>
                </DialogTrigger>
                <OTPDialog
                    username={form.getValues().username}
                    password={form.getValues().password}></OTPDialog>
            </Dialog>
        </div>
    );
}

export default Page;
