'use client';

import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Form } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import CookieTutorial from './cookie-tutorial';

const schema = z.object({
    JSESSIONID: z.string({ required_error: 'JSESSIONID is required' }),
    SRVNAME: z.string({ required_error: 'SRVNAME is required' }),
});

export default function UsisLoginModal() {
    const [open, setOpen] = useState(false);
    const form = useForm({
        resolver: zodResolver(schema),
    });

    const onSubmit = (data: any) => {
        console.log(data);
        setOpen(false);
    };

    return (
        <div>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                    <Button variant="outline">Enter USIS Cookie</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Enter USIS Cookie</DialogTitle>
                    </DialogHeader>
                    <DialogDescription>
                        To access USIS, you need to provide your `JSESSIONID` and `SRVNAME` cookie values. Follow the tutorial below to get the
                        values.
                    </DialogDescription>
                    <CookieTutorial />
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                            <Button type="submit" className="w-full">
                                {isSubmitting ? <Loader2 className="animate-spin" /> : 'Sign Up'}
                            </Button>
                        </form>
                    </Form>
                </DialogContent>
            </Dialog>
        </div>
    );
}
