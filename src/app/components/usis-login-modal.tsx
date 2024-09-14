'use client';

import { useEffect, useState } from 'react';
import UserModel from '@/model/User';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { Loader2 } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';

import CookieTutorial from './cookie-tutorial';

const schema = z.object({
    jsessionid: z.string({ required_error: 'JSESSIONID is required' }),
    srvname: z.string({ required_error: 'SRVNAME is required' }),
});

export default function UsisLoginModal() {
    const { data: session } = useSession();

    const [open, setOpen] = useState(false);
    const form = useForm<z.infer<typeof schema>>({
        resolver: zodResolver(schema),
    });

    useEffect(() => {
        const checkUsis = async () => {
            const res = await axios.get(`/api/users/check-usis-connect?username=${session?.user?.username}`);
            if (res?.data.isUsisConnected) {
                setOpen(false);
            } else {
                setOpen(true);
            }
        };
        console.log('se', session);
        if (session) {
            checkUsis();
        }
    }, [session]);

    const { isSubmitting } = form.formState;

    const onSubmit = async (data: z.infer<typeof schema>) => {
        try {
            await axios.post('/api/users/connect-usis', { ...data, username: session?.user?.username });
            setOpen(false);
        } catch (error) {
            console.error('Error connecting USIS:', error);
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="outline">Enter USIS Cookie</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Enter USIS Cookie</DialogTitle>
                </DialogHeader>
                <DialogDescription>
                    To access USIS, you need to provide your `JSESSIONID` and `SRVNAME` cookie values. Follow the tutorial below to get the values.
                </DialogDescription>
                <CookieTutorial />
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <FormField
                            control={form.control}
                            name="jsessionid"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>JSESSIONID</FormLabel>
                                    <FormControl>
                                        <Input autoComplete="off" className="w-3/4" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="srvname"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>SRVNAME</FormLabel>
                                    <FormControl>
                                        <Input autoComplete="off" className="w-3/4" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </form>
                </Form>
                <DialogFooter className="flex w-full justify-center">
                    <Button onClick={() => setOpen(false)}>Cancel</Button>
                    <Button onClick={form.handleSubmit(onSubmit)}>{isSubmitting ? <Loader2 className="animate-spin" /> : 'Submit'}</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
