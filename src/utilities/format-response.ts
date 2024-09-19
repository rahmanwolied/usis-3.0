import { Days, Times } from '@/enums';
import UsisSDK from '@/services/usis-sdk';
import parse from 'node-html-parser';

import type {
    Course,
    Section,
    USISClassScheduleWithLabs,
    UsisScheduleResponseType,
} from '@/types/usisReponse.type';

import {
    _toNumber,
    extractAndCombineTimes,
    extractDayTimeRoom,
} from './helpers';

type RoomSchedule = ReturnType<typeof getClassroomsFromSchedule>;

export function formatClassScheduleWithLab(
    rows: USISClassScheduleWithLabs[],
    minimizedCourseInfo: RoomSchedule,
): Course[] {
    const courses: Course[] = [];
    rows.forEach((row) => {
        const [
            rowCount,
            courseCode,
            courseTitle,
            section,
            seats,
            department,
            program,
            facultyName,
            facultyInitial,
            examDate,
            examDay,
            sunday,
            monday,
            tuesday,
            wednesday,
            thursday,
            friday,
            saturday,
        ] = row.cell;

        const isTarc = section.startsWith('S');
        const isClosed = section.includes('CLOSED');

        const minimizedSectionInfo = minimizedCourseInfo
            .find((course) => course.courseCode === courseCode)
            ?.sections.find((_section) => _section.number === section);

        const sectionInfo: Section = {
            ...minimizedSectionInfo!,
            facultyInitial,
            roomNumber: '',
            closed: isClosed,
            examDate,
            examDay,
            facultyName,
            seats,
        };

        const addedCourse = courses.find(
            (course) => course.code === courseCode,
        );

        if (!addedCourse) {
            const course = {
                code: courseCode,
                tarc: isTarc,
                title: courseTitle,
                faculties: [facultyInitial],
                sections: [sectionInfo],
                department,
                program,
            };
            courses.push(course);
            return;
        }

        addedCourse.sections.push(sectionInfo);
        addedCourse.sections.sort(
            (a, b) => _toNumber(a.number) - _toNumber(b.number),
        );
    });
    return courses;
}

export function getClassroomsFromSchedule(html: string) {
    const document = parse(html);
    const rows = document.querySelectorAll('#customers tbody tr');
    const result: {
        courseCode: string;
        sections: {
            number: string;
            days: string[];
            startTimes: string[];
            endTimes: string[];
            roomNumber: string;
            lab?: {
                days: string[];
                startTimes: string[];
                endTimes: string[];
                roomNumber: string;
            };
        }[];
    }[] = [];

    rows.forEach((row) => {
        const cells = row.querySelectorAll('td');
        const courseCode = cells[1].textContent.trim();

        const number = cells[5].textContent.trim();
        const dayTimeRoom = cells[6].textContent.trim();
        const { theory, labs } = extractDayTimeRoom(dayTimeRoom);

        const existingCourse = result.find(
            (course) => course.courseCode === courseCode,
        );
        if (!existingCourse)
            result.push({
                courseCode,
                sections: [
                    {
                        number,
                        ...theory,
                        lab: labs ? { ...labs } : undefined,
                    },
                ],
            });
        else {
            existingCourse.sections.push({
                number,
                ...theory,
                lab: labs ? { ...labs } : undefined,
            });
        }
    });
    console.log(result);
    return result;
}

// export function formatClassScheduleResponse(
//     response: UsisScheduleResponseType,
// ): Course[] {
//     const courses: Course[] = [];
//     response.rows.forEach((row) => {
//         let [
//             rowCount,
//             id,
//             courseCode,
//             facultyInitial,
//             number,
//             courseDay,
//             startTime,
//             endTime,
//             roomNumber,
//         ] = row.cell;
//         let isTarc = number.startsWith('S');
//         let isClosed = number.includes('CLOSED');

//         const addedCourse = courses.find(
//             (course) => course.code === courseCode,
//         );

//         const sectionInfo: Section = {
//             days: [courseDay],
//             startTimes: [startTime],
//             endTimes: [endTime],
//             facultyInitial,
//             number,
//             roomNumber,
//             closed: isClosed,
//         };

//         if (!addedCourse) {
//             const course = {} as Course;
//             course.code = courseCode;
//             course.tarc = isTarc;
//             course.sections = [sectionInfo];
//             course.faculties = [facultyInitial];
//             courses.push(course);
//             return;
//         }
//         const addedSection = addedCourse.sections.find(
//             (section) => section.number === number,
//         );

//         if (!addedSection) {
//             addedCourse.sections.push(sectionInfo);
//             addedCourse.sections.sort(
//                 (a, b) => _toNumber(a.number) - _toNumber(b.number),
//             );
//             return;
//         }

//         const dayIdx = addedSection.days.findIndex((day) => day === courseDay);

//         if (
//             dayIdx === -1 ||
//             Math.abs(addedSection.endTimes[dayIdx] - Times[startTime]) > 1
//         ) {
//             addedSection.days.push(courseDay);
//             addedSection.startTimes.push(Times[startTime]);
//             addedSection.endTimes.push(Times[endTime]);

//             return;
//         }

//         addedSection.startTime[dayIdx] = Math.min(
//             addedSection.startTime[dayIdx],
//             Times[startTime],
//         );
//         addedSection.endTime[dayIdx] = Math.max(
//             addedSection.endTime[dayIdx],
//             Times[endTime],
//         );

//         return;
//     });
//     return courses;
// }
