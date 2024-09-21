'use client';



import { useEffect, useState } from 'react';
import axios from 'axios';
import { useSession } from 'next-auth/react';

import { Card, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

import { allCourses } from './all-courses';
import { prereq } from './prereq';

type CourseSuggestion = {
    course: string;
    softPreRequisites: string[];
}[];

export default function Page() {
    // const usis = new UsisSDK();

    // const data = await usis.showGradesheet();
    // const root = parse(data);

    // const table = root.querySelector('.previous-result-table');
    // const rows = table!.querySelectorAll('tr');

    // const courseRows = rows.filter((row) => {
    //     const columns = row.querySelectorAll('td');
    //     return (
    //         columns.length > 0 && columns[0].text.trim().match(/[A-Z]{3}\d{3}/)
    //     );
    // });

    // const courses = courseRows.map((row) => {
    //     const columns = row.querySelectorAll('td');
    //     return columns[0].text.trim();
    // });

    // const advisedCoursesRes = await usis.getAdvisedCourse();
    // const root2 = parse(advisedCoursesRes);
    // const table2 = root2.getElementsByTagName('table')[0];
    // const rows2 = table2.querySelectorAll('tr');
    // const advisedCourseRows = rows2.filter((row) => {
    //     const columns = row.querySelectorAll('td');
    //     return (
    //         columns.length > 0 && columns[0].text.trim().match(/[A-Z]{3}\d{3}/)
    //     );
    // });

    // const advisedCourses = advisedCourseRows.map((row) => {
    //     const columns = row.querySelectorAll('td');
    //     return columns[0].text.trim();
    // });
    // console.log(advisedCourses);

    // console.log(mergedCourses);
    const [detailedSuggestions, setDetailedSuggestions] =
        useState<CourseSuggestion>([]);
    const { data: session } = useSession();

    useEffect(() => {
        async function fetchData() {
            const res = await axios.post('/api/users/courses', {
                email: session?.user.email,
            });

            const { courses, advisedCourses } = res.data.data;

            const mergedCourses = [...courses, ...advisedCourses];

            const suggestions = allCourses.filter(
                (course) => !mergedCourses.includes(course),
            );

            const suggestedCourses = prereq.courses
                .filter((courseItem) => {

                    return courseItem.hard_pre_requisite.every((prereqCourse) =>
                        courses.includes(prereqCourse),
                    );
                })
                .map((courseItem) => courseItem.course)
                .filter((course) => !courses.includes(course));
            console.log(suggestedCourses);

            const validSuggestions = suggestedCourses
                .filter((course) => allCourses.includes(course))
                .filter((course) => !advisedCourses.includes(course));

            const detailedSuggestions = validSuggestions.map((course) => {
                const courseDetails = prereq.courses.find(
                    (c) => c.course === course,
                );
                return {
                    course,
                    softPreRequisites: courseDetails
                        ? courseDetails.soft_pre_requisite
                        : [],
                };
            });
            setDetailedSuggestions(detailedSuggestions);
        }
        fetchData();
    }, [session]);

    return (
        <div className="mt-10">
            <h1 className="text-3xl font-bold mb-6 text-center">Course Suggestions</h1>
            <div className="flex-grid container flex items-center justify-center gap-3">
                {detailedSuggestions.map((detail, index) => (
                    <Card key={index} className="w-1/5">
                        <CardHeader>
                            <CardTitle>{detail.course}</CardTitle>
                        </CardHeader>
                        <CardFooter>
                            {detail.softPreRequisites.length > 0 ? (
                                <div>
                                    <h3>Soft Prerequisites:</h3>
                                    <ul>
                                        {detail.softPreRequisites.map(
                                            (prereq, idx) => (
                                                <li key={idx}>{prereq}</li>
                                            ),
                                        )}
                                    </ul>
                                </div>
                            ) : (
                                ''
                            )}
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </div>
    );
}