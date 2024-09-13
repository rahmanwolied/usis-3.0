import UsisSDK from '@/services/usis-sdk';
import { parse } from 'node-html-parser';

import { Card, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

import { allCourses } from './all-courses';

export default async function Page() {
    const usis = new UsisSDK();
    const data = await usis.showGradesheet();
    const root = parse(data);

    const table = root.querySelector('.previous-result-table');
    const rows = table!.querySelectorAll('tr');

    const courseRows = rows.filter((row) => {
        const columns = row.querySelectorAll('td');
        return columns.length > 0 && columns[0].text.trim().match(/[A-Z]{3}\d{3}/);
    });

    const courses = courseRows.map((row) => {
        const columns = row.querySelectorAll('td');
        return columns[0].text.trim();
    });

    const advisedCoursesRes = await usis.getAdvisedCourse();
    const root2 = parse(advisedCoursesRes);
    const table2 = root2.getElementsByTagName('table')[0];
    const rows2 = table2.querySelectorAll('tr');
    const advisedCourseRows = rows2.filter((row) => {
        const columns = row.querySelectorAll('td');
        return columns.length > 0 && columns[0].text.trim().match(/[A-Z]{3}\d{3}/);
    });

    const advisedCourses = advisedCourseRows.map((row) => {
        const columns = row.querySelectorAll('td');
        return columns[0].text.trim();
    });

    const mergedCourses = [...courses, ...advisedCourses];
    console.log(mergedCourses);
    const suggestions = allCourses.filter((course) => !mergedCourses.includes(course));

    return (
        <div className="mt-10">
            <h1>Course Suggestion</h1>
            <div className="container flex flex-col items-center justify-center gap-3">
                {/* {suggestions.map((suggestion, index) => (
                    <Card key={index} className="w-1/2">
                        <CardHeader>
                            <CardTitle>{suggestion}</CardTitle>
                        </CardHeader>
                    </Card>
                ))} */}
            </div>
        </div>
    );
}
