'use client';

import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';

import ClassSchedule from './components/class-schedule';
import Filter from './components/filter';
import FilteredCourses from './components/filtered-courses';

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

export default function CourseScheduler() {
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [selectedCourses, setSelectedCourses] = useState([]);
    const [filteredCourses, setFilteredCourses] = useState([]);

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
                        <ClassSchedule
                            setSelectedCourses={setSelectedCourses}
                            selectedCourses={selectedCourses}
                        />
                    </CardContent>
                </Card>
            </div>

            <Card
                className={`relative bg-zinc-900 transition-all duration-300 ease-in-out ${isFilterOpen ? 'w-96' : 'w-12'}`}>
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
                    <div className="p-3">
                        <Filter setFilteredCourses={setFilteredCourses} />

                        <FilteredCourses
                            setSelectedCourses={setSelectedCourses}
                            selectedCourses={selectedCourses}
                            filteredCourses={filteredCourses}
                        />
                    </div>
                )}
            </Card>
        </div>
    );
}
