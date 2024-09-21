'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
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
import UsisLoginModal from '@/app/components/usis-login-modal';

type CurrentCourse = {
    code: string;
    facultyName: string;
    faculty: string;
    section: string;
    days: string[];
    startTimes: string[];
    endTimes: string[];
    roomNumber: string;
};
export default function HomePage() {
    const [currentCourses, setCurrentCourses] = useState<CurrentCourse[]>([]); // Add the type here
    const [completedCredits, setCompletedCredits] = useState(0);
    const [mounted, setMounted] = useState(false);
    const [usisConnected, setUsisConnected] = useState(false);
    const [id, setId] = useState('');
    const [mobile, setMobile] = useState('');
    const [homePhone, setHomePhone] = useState('');
    const [bloodGroup, setBloodGroup] = useState('');
    const [program, setProgram] = useState('');
    const [user, setUser] = useState<any>({});
    const [totalCredits, setTotalCredits] = useState(136);

    const { data: session } = useSession();

    const calcCGPA = (grades: any) => {
        let total = 0;
        if (!grades) {
            return '0.00';
        }
        for (const grade of grades) {
            total += Number(grade.gradePoint);
        }
        return (total / grades.length).toFixed(2);
    };

    useEffect(() => {
        async function fetchData() {
            try {
                const res = await axios.post('/api/users/dashboard', {
                    email: session?.user.email,
                });
                setCurrentCourses(res.data.currentCourses); // Match advised courses with section details
                setCompletedCredits(res.data.completedCredits); // Fetch completed credits
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }

        fetchData();
    }, [session?.user?.email]);

    useEffect(() => {
        async function getUser() {
            if (!session) {
                return;
            }
            const res = await axios.get(
                `/api/users/get-user?username=${session?.user?.username}`,
            );
            if (res?.data) {
                console.log(res.data);
                setUsisConnected(res.data.isUsisConnected);
                setId(res.data.studentId ?? '');
                setMobile(res.data.mobile ?? '');
                setHomePhone(res.data.homePhone ?? '');
                setBloodGroup(res.data.bloodGroup ?? '');
                setProgram(res.data.program ?? '');
                setTotalCredits(
                    res.data.program.includes('ENGINEERING') ? 136 : 124,
                );
                setUser(res.data);
            }
        }

        if (session) {
            getUser();
        }
        setMounted(true);
    }, [session]);

    return (
        <div className="container min-h-screen">
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                <Card className="col-span-2">
                    <CardHeader className="flex flex-row items-center space-x-4">
                        <Avatar className="h-16 w-16">
                            <AvatarImage
                                src={session?.user.image!}
                                alt="Student"
                            />
                            <AvatarFallback>JD</AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col gap-2">
                            <CardTitle>{session?.user.name}</CardTitle>
                            <p className="text-sm text-gray-500">
                                {program}, Year{' '}
                                {Number(
                                    new Date()
                                        .getFullYear()
                                        .toString()
                                        .slice(2),
                                ) - Number(id.slice(0, 2))}
                            </p>
                            <p className="text-lg font-semibold">
                                CGPA: {calcCGPA(user.grades)}
                            </p>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                                <span>Degree Progress</span>
                                <span>
                                    {(
                                        (completedCredits / totalCredits) *
                                        100
                                    ).toFixed(2)}
                                    % ({completedCredits}/{totalCredits}{' '}
                                    credits)
                                </span>
                            </div>
                            <Progress
                                value={(completedCredits / totalCredits) * 100}
                                className="w-full"
                            />
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

                <Card className="col-span-2">
                    <CardHeader>
                        <CardTitle>Currently Doing Courses</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
                            {currentCourses &&
                                currentCourses.map((course, index) => (
                                    <Card key={index}>
                                        <CardContent className="flex items-center justify-between p-4">
                                            <span className="font-medium">
                                                {course.code}
                                            </span>
                                            <span className="text-muted-foreground">
                                                {course.section}
                                            </span>
                                            <span className="text-muted-foreground">
                                                {course.faculty}
                                            </span>
                                        </CardContent>
                                    </Card>
                                ))}
                        </div>
                    </CardContent>
                </Card>
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
                            <Button className="w-full">Find Empty Rooms</Button>
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
                            <Button className="mt-2 w-full" variant="outline">
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
                            <Button className="mt-2 w-full" variant="outline">
                                View All
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </div>
            <UsisLoginModal />
        </div>
    );
}
