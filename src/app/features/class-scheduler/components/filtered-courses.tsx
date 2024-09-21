'use client';

import React from 'react';

import { Course, Section } from '@/types/usisReponse.type';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { useToast } from '@/components/ui/use-toast';

export type SectionItem = {
    sectionId: number;
    code: string;
    facultyInitial: string;
    days: string[];
    startTimes: string[];
    endTimes: string[];
    labDays?: string[];
    labStartTimes?: string[];
    labEndTimes?: string[];
};

interface FilteredCoursesProps {
    filteredCourses: Course[];
    selectedCourses: SectionItem[];
    setSelectedCourses: any;
}

const FilteredCourses = ({
    filteredCourses,
    setSelectedCourses,
    selectedCourses,
}: FilteredCoursesProps) => {
    const { toast } = useToast();
    function isSelected(code: string, sectionId: number) {
        return selectedCourses.find(
            (selectedCourse) =>
                selectedCourse.code === code &&
                selectedCourse.sectionId === sectionId,
        )
            ? true
            : false;
    }

    function handleSelect(course: Course, section: Section) {
        console.log('Selected Course:', course.code, section.sectionId);
        console.log('Selected Courses:', selectedCourses);
        if (selectedCourses.find((c) => c.code === course.code)) {
            console.log('You have already selected this course');
            toast({
                title: 'Add Failed',
                description: 'You have already selected this course',
                variant: 'destructive',
            });
        }

        if (selectedCourses.find((c) => c.startTimes === section.startTimes)) {
            console.log('Time Conflict');
            toast({
                title: 'Add Failed',
                description: 'Time Conflict',
                variant: 'destructive',
            });
            return;
        }

        const selectedCourse = {
            sectionId: section.sectionId,
            code: course.code,
            facultyInitial: section.facultyInitial,
            days: section.days,
            startTimes: section.startTimes,
            endTimes: section.endTimes,
        };

        setSelectedCourses([...selectedCourses, selectedCourse]);
    }

    return (
        <div className="p-3">
            <ScrollArea className="h-56 rounded-md border">
                {filteredCourses.map((course) => (
                    <>
                        {course.sections.map((section) => (
                            <Card
                                key={course.code + section.section}
                                className={`mb-3 cursor-pointer hover:shadow-lg ${isSelected(course.code, section.sectionId) ? 'bg-green-950' : ''}`}
                                onClick={() => handleSelect(course, section)}>
                                <CardHeader>
                                    <CardTitle>{course.code}</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p>
                                        <strong>Section:</strong>{' '}
                                        {section.section}
                                    </p>
                                    <p>
                                        <strong>Faculty:</strong>{' '}
                                        {section.facultyInitial}
                                    </p>
                                    <p>
                                        <strong>Day:</strong>{' '}
                                        {section.days.join(', ')}
                                    </p>
                                    <p>
                                        <strong>Time:</strong>{' '}
                                        {section.startTimes.every(
                                            (t, i, a) => a[0] === t,
                                        )
                                            ? section.startTimes[0] +
                                              ' - ' +
                                              section.endTimes[0]
                                            : section.startTimes.join(', ') +
                                              ' - ' +
                                              section.endTimes.join(', ')}
                                    </p>
                                </CardContent>
                                <CardFooter>
                                    <ScrollBar>
                                        <Button variant={'default'}>
                                            Add to Schedule
                                        </Button>
                                    </ScrollBar>
                                </CardFooter>
                            </Card>
                        ))}
                    </>
                ))}
            </ScrollArea>
        </div>
    );
};

export default FilteredCourses;
