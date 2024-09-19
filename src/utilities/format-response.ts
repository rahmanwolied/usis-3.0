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

export function formatClassScheduleWithLab(
    rows: USISClassScheduleWithLabs[],
    classRoomInfo: [string, string, string[], string[], string[], string[]][],
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

        const _days = [
            'Sunday',
            'Monday',
            'Tuesday',
            'Wednesday',
            'Thursday',
            'Friday',
            'Saturday',
        ];

        const days: string[] = [];
        const startTimes: string[] = [];
        const endTimes: string[] = [];

        for (let i = 11; i < 18; i++) {
            if (row.cell[i]) {
                days.push(_days[i - 11]);
                const { startTime, endTime } = extractAndCombineTimes(
                    row.cell[i] as string,
                );
                startTimes.push(startTime);
                endTimes.push(endTime);
            }
        }

        const sectionInfo: Section = {
            days,
            startTimes,
            endTimes,
            facultyInitial,
            number: section,
            roomNumber: '',
            closed: isClosed,
            examDate,
            examDay,
            facultyName,
        };

        const addedCourse = courses.find(
            (course) => course.code === courseCode,
        );
        if (!addedCourse) {
            const course = {} as Course;
            course.code = courseCode;
            course.tarc = isTarc;
            course.title = courseTitle;
            course.faculties = [facultyInitial];
            course.sections = [sectionInfo];
            courses.push(course);
            return;
        }
        const addedSection = addedCourse.sections.find(
            (_section) => _section.number === section,
        );

        if (!addedSection) {
            addedCourse.sections.push(sectionInfo);
            addedCourse.sections.sort(
                (a, b) => _toNumber(a.number) - _toNumber(b.number),
            );
            return;
        }

        return;
    });
    return courses;
}

export function getClassroomsFromSchedule(html: string) {
    const document = parse(html);
    const rows = document.querySelectorAll('#customers tbody tr');
    const result = Array<{
        courseCode: string;
        sections: {
            section: string;
            days: string[];
            startTimes: string[];
            endTimes: string[];
            roomNumbers: string[];
        }[];
    }>();

    rows.forEach((row) => {
        const cells = row.querySelectorAll('td');
        const courseCode = cells[1].textContent.trim();

        const section = cells[5].textContent.trim();
        const dayTimeRoom = cells[6].textContent.trim();
        const { days, startTimes, endTimes, roomNumbers } =
            extractDayTimeRoom(dayTimeRoom);

        const existingCourse = result.find(
            (course) => course.courseCode === courseCode,
        );
        if (!existingCourse)
            result.push({
                courseCode,
                sections: [
                    {
                        section,
                        days,
                        startTimes,
                        endTimes,
                        roomNumbers,
                    },
                ],
            });
        else {
            existingCourse.sections.push({
                section,
                days,
                startTimes,
                endTimes,
                roomNumbers,
            });
        }
    });
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
