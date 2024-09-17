'use client';

import {
    Bell,
    BookOpen,
    Calendar,
    Clock,
    MapPin,
    MessageCircle,
    Search,
} from 'lucide-react';
import { useSession } from 'next-auth/react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';

export default function HomePage() {
    const { data: session } = useSession();
    return (
        <div className="min-h-screen">
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                <div className="space-y-8 lg:col-span-2">
                    <Card>
                        <CardHeader className="flex flex-row items-center space-x-4">
                            <Avatar className="h-16 w-16">
                                <AvatarImage
                                    src="/placeholder-avatar.jpg"
                                    alt="Student"
                                />
                                <AvatarFallback>JD</AvatarFallback>
                            </Avatar>
                            <div>
                                <CardTitle>{session?.user.name}</CardTitle>
                                <p className="text-sm text-gray-500">
                                    Computer Science, Year 3
                                </p>
                                <p className="text-lg font-semibold">
                                    CGPA: 4.00
                                </p>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-2">
                                <div className="flex justify-between text-sm">
                                    <span>Degree Progress</span>
                                    <span>75% (90/120 credits)</span>
                                </div>
                                <Progress value={75} className="w-full" />
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Todays Classes</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ul className="space-y-4">
                                {[
                                    {
                                        name: 'Advanced Algorithms',
                                        time: '10:00 AM - 11:30 AM',
                                        room: 'CSE-221',
                                    },
                                    {
                                        name: 'Database Systems',
                                        time: '2:00 PM - 3:30 PM',
                                        room: 'CSE-370',
                                    },
                                ].map((cls, index) => (
                                    <li
                                        key={index}
                                        className="flex items-center justify-between">
                                        <div>
                                            <p className="font-medium">
                                                {cls.name}
                                            </p>
                                            <div className="flex items-center space-x-2 text-sm text-gray-500">
                                                <Clock className="h-4 w-4" />
                                                <span>{cls.time}</span>
                                                <MapPin className="ml-2 h-4 w-4" />
                                                <span>{cls.room}</span>
                                            </div>
                                        </div>
                                        <Button variant="outline" size="sm">
                                            View Details
                                        </Button>
                                    </li>
                                ))}
                            </ul>
                            <Button className="mt-4 w-full" variant="outline">
                                View Weekly Schedule
                            </Button>
                        </CardContent>
                    </Card>
                </div>

                <div className="space-y-8">
                    <Card>
                        <CardHeader>
                            <CardTitle>Quick Links</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ul className="space-y-2">
                                {[
                                    {
                                        name: 'Course Registration',
                                        icon: BookOpen,
                                    },
                                    {
                                        name: 'Exam Schedule',
                                        icon: Calendar,
                                    },
                                    { name: 'Transcript', icon: BookOpen },
                                    {
                                        name: 'Financial Aid',
                                        icon: BookOpen,
                                    },
                                ].map((link, index) => (
                                    <li key={index}>
                                        <Button
                                            variant="ghost"
                                            className="w-full justify-start">
                                            <link.icon className="mr-2 h-4 w-4" />
                                            {link.name}
                                        </Button>
                                    </li>
                                ))}
                            </ul>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Course Suggestions</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ul className="space-y-2">
                                {[
                                    'Machine Learning',
                                    'Web Development',
                                    'Computer Networks',
                                    'Software Engineering',
                                ].map((course, index) => (
                                    <li key={index}>
                                        <Button
                                            variant="ghost"
                                            className="w-full justify-start">
                                            {course}
                                        </Button>
                                    </li>
                                ))}
                            </ul>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Empty Classroom Finder</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-2">
                                <Input type="time" />
                                <Button className="w-full">
                                    Find Empty Rooms
                                </Button>
                            </div>
                        </CardContent>
                    </Card>

                    <div className="grid grid-cols-2 gap-4">
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center">
                                    <MessageCircle className="mr-2 h-5 w-5" />
                                    Chat Rooms
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-sm text-gray-500">
                                    5 active chats
                                </p>
                                <Button
                                    className="mt-2 w-full"
                                    variant="outline">
                                    Open Chat
                                </Button>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center">
                                    <Bell className="mr-2 h-5 w-5" />
                                    Notifications
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-sm text-gray-500">
                                    3 new notifications
                                </p>
                                <Button
                                    className="mt-2 w-full"
                                    variant="outline">
                                    View All
                                </Button>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
}
