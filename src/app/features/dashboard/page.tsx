'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { useSession } from 'next-auth/react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';

type CurrentCourse = {
    code: string;
    facultyName: string;
    facultyInitial: string;
    section: string;
    days: string[];
    startTimes: string[];
    endTimes: string[];
    roomNumber: string;
};

type DaySchedule = {
    [key in
        | 'Sunday'
        | 'Monday'
        | 'Tuesday'
        | 'Wednesday'
        | 'Thursday'
        | 'Friday'
        | 'Saturday']: string;
};

type RoutineRow = DaySchedule & {
    time: string;
};

export default function Component() {
    const [currentCourses, setCurrentCourses] = useState<CurrentCourse[]>([]); // Add the type here
    const [completedCredits, setCompletedCredits] = useState(0);
    const totalCredits = 136;
    const { data: session } = useSession();

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

    const days: (keyof DaySchedule)[] = [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
    ];

    const timeSlots = [
        '8:00 AM - 9:20 AM',
        '9:30 AM - 10:50 AM',
        '11:00 AM - 12:20 PM',
        '12:30 PM - 1:50 PM',
        '2:00 PM - 3:20 PM',
        '3:30 PM - 4:50 PM',
    ];
    const classRoutine: RoutineRow[] = timeSlots.map((timeSlot) => {
        // Initialize the row with empty values for each day
        const row: RoutineRow = {
            time: timeSlot,
            Sunday: '',
            Monday: '',
            Tuesday: '',
            Wednesday: '',
            Thursday: '',
            Friday: '',
            Saturday: '',
        };

        // Iterate over current courses to populate each day's routine
        currentCourses?.forEach((course) => {
            course.startTimes?.forEach((startTime, index) => {
                if (timeSlot === `${startTime} - ${course.endTimes[index]}`) {
                    // Fill in the appropriate day with the course details
                    course.days.forEach((day) => {
                        if (row[day as keyof DaySchedule] === '') {
                            // Only fill if the cell is empty
                            row[day as keyof DaySchedule] =
                                `${course.code} (${course.facultyInitial}) ${course.roomNumber}`;
                        }
                    });
                }
            });
        });

        return row;
    });

    return (
        <div className="container mx-auto space-y-8 p-4">
            {/* Degree Progression */}
            <Card>
                <CardHeader>
                    <CardTitle>Your Degree Progression</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="h-4 w-full overflow-hidden rounded-full bg-secondary">
                        <div
                            className="h-full rounded-full bg-primary"
                            style={{
                                width: `${(completedCredits / totalCredits) * 100}%`,
                            }}
                        />
                    </div>
                    <p className="mt-2 text-sm text-muted-foreground">
                        {completedCredits} out of {totalCredits} credits
                        completed
                    </p>
                </CardContent>
            </Card>

            {/* Currently Doing Courses */}
            <Card>
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
                                            {course.facultyInitial}
                                        </span>
                                    </CardContent>
                                </Card>
                            ))}
                    </div>
                </CardContent>
            </Card>

            {/* Class Routine */}
            <Card>
                <CardHeader>
                    <CardTitle>Class Routine</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="overflow-x-auto">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="w-[120px]">
                                        Time
                                    </TableHead>
                                    {days.map((day) => (
                                        <TableHead
                                            key={day}
                                            className="text-center">
                                            {day}
                                        </TableHead>
                                    ))}
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {classRoutine.map((row, index) => (
                                    <TableRow key={index}>
                                        <TableCell className="text-xs font-medium">
                                            {row.time}
                                        </TableCell>
                                        {days.map((day) => (
                                            <TableCell
                                                key={day}
                                                className="p-1">
                                                {row[day] && (
                                                    <div className="rounded bg-secondary p-1 text-xs text-secondary-foreground">
                                                        {row[day]
                                                            .split(' ')
                                                            .map((item, i) => (
                                                                <div
                                                                    key={i}
                                                                    className={
                                                                        i === 1
                                                                            ? 'text-primary'
                                                                            : ''
                                                                    }>
                                                                    {item}
                                                                </div>
                                                            ))}
                                                    </div>
                                                )}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
