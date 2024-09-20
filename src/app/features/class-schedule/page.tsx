'use client';

import { useState } from 'react';
import { ChevronLeft, ChevronRight, Filter } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ScrollArea } from '@/components/ui/scroll-area';

const daysOfWeek = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
];
const timeSlots = [
    '8:00 AM',
    '9:30 AM',
    '11:00 AM',
    '12:30 PM',
    '2:00 PM',
    '3:30 PM',
    '5:00 PM',
];

const courses = [
    {
        id: 1,
        name: 'Introduction to Computer Science',
        section: 'CS101-A',
        faculty: 'Dr. Smith',
        day: 'Monday',
        startTime: 10,
        duration: 2,
    },
    {
        id: 2,
        name: 'Data Structures',
        section: 'CS201-B',
        faculty: 'Prof. Johnson',
        day: 'Tuesday',
        startTime: 14,
        duration: 1.5,
    },
    {
        id: 3,
        name: 'Algorithms',
        section: 'CS301-C',
        faculty: 'Dr. Williams',
        day: 'Wednesday',
        startTime: 9,
        duration: 3,
    },
    {
        id: 4,
        name: 'Database Systems',
        section: 'CS401-A',
        faculty: 'Prof. Brown',
        day: 'Thursday',
        startTime: 13,
        duration: 2,
    },
    {
        id: 5,
        name: 'Machine Learning',
        section: 'CS501-B',
        faculty: 'Dr. Davis',
        day: 'Friday',
        startTime: 11,
        duration: 2.5,
    },
];

export default function CourseScheduler() {
    const [isFilterOpen, setIsFilterOpen] = useState(true);
    const [filters, setFilters] = useState({
        name: '',
        section: '',
        faculty: '',
        time: '',
    });

    const filteredCourses = courses.filter(
        (course) =>
            course.name.toLowerCase().includes(filters.name.toLowerCase()) &&
            course.section
                .toLowerCase()
                .includes(filters.section.toLowerCase()) &&
            course.faculty
                .toLowerCase()
                .includes(filters.faculty.toLowerCase()) &&
            `${course.startTime}:00`.includes(filters.time),
    );

    const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFilters({ ...filters, [e.target.name]: e.target.value });
    };

    return (
        <div className="flex h-screen">
            <div className="flex-1 overflow-auto p-6">
                <Card className="bg-zinc-900">
                    <CardHeader>
                        <div className="mb-4 grid grid-cols-8 gap-2">
                            <div className="col-span-1"></div>
                            {daysOfWeek.map((day) => (
                                <div key={day} className="text-center">
                                    {day}
                                </div>
                            ))}
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-8 gap-2">
                            {timeSlots.map((time) => (
                                <>
                                    <div
                                        key={time}
                                        className="self-center pr-2 text-right text-sm text-gray-400">
                                        {time}
                                    </div>
                                    {daysOfWeek.map((day) => (
                                        <div
                                            key={`${day}-${time}`}
                                            className="relative h-16 rounded-md bg-zinc-800">
                                            {filteredCourses
                                                .filter(
                                                    (course) =>
                                                        course.day === day &&
                                                        course.startTime ===
                                                            parseInt(
                                                                time.split(
                                                                    ':',
                                                                )[0],
                                                            ),
                                                )
                                                .map((course) => (
                                                    <div
                                                        key={course.id}
                                                        className="absolute inset-0 z-10 overflow-hidden rounded-md bg-primary p-2 text-xs"
                                                        style={{
                                                            height: `${course.duration * 64}px`,
                                                        }}>
                                                        <div className="font-semibold">
                                                            {course.name}
                                                        </div>
                                                        <div>
                                                            {course.section}
                                                        </div>
                                                        <div>
                                                            {course.faculty}
                                                        </div>
                                                    </div>
                                                ))}
                                        </div>
                                    ))}
                                </>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>

            <Card
                className={`bg-zinc-900 transition-all duration-300 ease-in-out ${isFilterOpen ? 'w-80' : 'w-12'}`}>
                <Button
                    variant="ghost"
                    size="icon"
                    className="h-12 w-12"
                    onClick={() => setIsFilterOpen(!isFilterOpen)}>
                    {isFilterOpen ? (
                        <ChevronRight className="h-6 w-6" />
                    ) : (
                        <ChevronLeft className="h-6 w-6" />
                    )}
                </Button>
                {isFilterOpen && (
                    <div className="p-4">
                        <h2 className="mb-4 flex items-center text-xl font-semibold">
                            <Filter className="mr-2" size={15} /> Filters
                        </h2>
                        <div className="space-y-4">
                            <div>
                                <Label htmlFor="name">Course Name</Label>
                                <Input
                                    id="name"
                                    name="name"
                                    value={filters.name}
                                    onChange={handleFilterChange}
                                    className="bg-zinc-700"
                                />
                            </div>
                            <div>
                                <Label htmlFor="section">Section</Label>
                                <Input
                                    id="section"
                                    name="section"
                                    value={filters.section}
                                    onChange={handleFilterChange}
                                    className="bg-zinc-700"
                                />
                            </div>
                            <div>
                                <Label htmlFor="faculty">Faculty</Label>
                                <Input
                                    id="faculty"
                                    name="faculty"
                                    value={filters.faculty}
                                    onChange={handleFilterChange}
                                    className="bg-zinc-700"
                                />
                            </div>
                            <div>
                                <Label htmlFor="time">Time</Label>
                                <Input
                                    id="time"
                                    name="time"
                                    value={filters.time}
                                    onChange={handleFilterChange}
                                    className="bg-zinc-700"
                                />
                            </div>
                        </div>
                        <ScrollArea className="mt-6 h-64">
                            <h3 className="mb-2 font-semibold">
                                Filtered Results
                            </h3>
                            {filteredCourses.map((course) => (
                                <div
                                    key={course.id}
                                    className="mb-2 rounded-md bg-zinc-700 p-2">
                                    <div className="font-semibold">
                                        {course.name}
                                    </div>
                                    <div>{course.section}</div>
                                    <div>{course.faculty}</div>
                                    <div>
                                        {course.day} {course.startTime}:00 -{' '}
                                        {course.startTime + course.duration}
                                        :00
                                    </div>
                                </div>
                            ))}
                        </ScrollArea>
                    </div>
                )}
            </Card>
        </div>
    );
}
