'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import axios from 'axios';
import { useSession } from 'next-auth/react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function UserProfileSettings() {
    const { data: session } = useSession();
    const [mounted, setMounted] = useState(false);
    const [usisConnected, setUsisConnected] = useState(false);
    const [id, setId] = useState('');
    const [mobile, setMobile] = useState('');
    const [homePhone, setHomePhone] = useState('');
    const [bloodGroup, setBloodGroup] = useState('');
    const [program, setProgram] = useState('');

    useEffect(() => {
        async function getUser() {
            if (!session) {
                return;
            }
            const res = await axios.get(`/api/users/get-user?username=${session?.user?.username}`);
            if (res?.data) {
                console.log(res.data);
                setUsisConnected(res.data.isUsisConnected);
                setId(res.data.studentId ?? '');
                setMobile(res.data.mobile ?? '');
                setHomePhone(res.data.homePhone ?? '');
                setBloodGroup(res.data.bloodGroup ?? '');
                setProgram(res.data.program ?? '');
            }
        }

        if (session) {
            getUser();
        }
        setMounted(true);
    }, [session]);

    if (!mounted) {
        return null;
    }

    return (
        <div className="min-h-screen bg-background text-foreground">
            <div className="container mx-auto p-4">
                <Card className="mx-auto w-full max-w-4xl">
                    <CardHeader className="flex flex-row items-center justify-between">
                        <CardTitle>User Profile</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="flex items-center space-x-4">
                            <Image
                                src={session?.user.image! || '/static/default.jpg'}
                                alt="Profile"
                                width={300}
                                height={300}
                                className="h-24 w-24 rounded-full object-cover"
                            />
                        </div>
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                            <div className="space-y-2">
                                <Label htmlFor="full-name">Full Name</Label>
                                <Input id="full-name" value={session?.user.name || ''} disabled />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="student-id">Student ID</Label>
                                <Input id="student-id" value={usisConnected ? id : 'Connect your Usis account'} disabled />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="email">Email</Label>
                                <Input id="email" type="email" value={session?.user.email || ''} disabled />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="mobile">Mobile Number</Label>
                                <Input id="mobile" value={usisConnected ? mobile : 'Connect your Usis account'} disabled />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="home-phone">Home Phone</Label>
                                <Input id="home-phone" value={usisConnected ? homePhone : 'Connect your Usis account'} disabled />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="blood-group">Blood Group</Label>
                                <Input id="program" value={usisConnected ? bloodGroup : 'Connect your Usis account'} disabled />
                            </div>
                            <div className="space-y-2 md:col-span-2">
                                <Label htmlFor="program">Program</Label>
                                <Input id="program" value={usisConnected ? program : 'Connect your Usis account'} disabled className="bg-muted" />
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
