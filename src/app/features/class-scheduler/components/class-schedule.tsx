'use client';

import React, { useEffect } from 'react';

import { SectionItem } from './filtered-courses';

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

const endTimeSlots = [
    '9:20 AM',
    '10:50 AM',
    '12:20 PM',
    '1:50 PM',
    '3:20 PM',
    '4:50 PM',
    '6:20 PM',
];

const grid = daysOfWeek.map((day) => {
    return {
        day,
        slots: timeSlots.map((time) => ({
            time,
            course: null,
        })),
    };
});

const ClassSchedule = ({
    selectedCourses,
    setSelectedCourses,
}: {
    selectedCourses: SectionItem[];
    setSelectedCourses: any;
}) => {
    function handleRemove(course: SectionItem) {
        setSelectedCourses(
            selectedCourses.filter(
                (selectedCourse) =>
                    selectedCourse.sectionId !== course.sectionId,
            ),
        );
    }
    function isDayTime(
        sectionDay: string,
        day: string,
        course: SectionItem,
        index: number,
        time: string,
    ) {
        const isTrue = sectionDay === day && course.startTimes[index] === time;
        if (isTrue) {
            console.log('isTrue:', course.code, sectionDay, time);
        } else {
            console.log(
                'False:',
                course.code,
                sectionDay,
                day,
                course.startTimes[index],
                time,
            );
        }
        return isTrue;
    }

    useEffect(() => {}, [[...selectedCourses]]);

    return (
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
                            {selectedCourses.map((course) => (
                                <>
                                    {course.days.map(
                                        (sectionDay, index) =>
                                            isDayTime(
                                                sectionDay,
                                                day,
                                                course,
                                                index,
                                                time,
                                            ) && (
                                                <div
                                                    key={course.sectionId}
                                                    onClick={() =>
                                                        handleRemove(course)
                                                    }
                                                    className="absolute inset-0 z-10 cursor-not-allowed overflow-hidden rounded-md bg-primary p-2 text-xs"
                                                    style={{
                                                        height: `${(endTimeSlots.indexOf(course.endTimes[index]) - timeSlots.indexOf(course.startTimes[index]) + 1) * 64}px`,
                                                    }}>
                                                    <div className="font-semibold">
                                                        {course.code}
                                                    </div>
                                                    <div>
                                                        {course.sectionId}
                                                    </div>
                                                    <div>
                                                        {course.facultyInitial}
                                                    </div>
                                                </div>
                                            ),
                                    )}
                                </>
                            ))}
                        </div>
                    ))}
                </>
            ))}
        </div>
    );
};

export default ClassSchedule;
