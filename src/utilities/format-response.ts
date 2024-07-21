import { Days, Times } from '@/enums';

import type { CourseInfoType, SectionInfo, UsisScheduleResponseType } from '@/types/usisReponse.type';

function _toNumber(section: string) {
    if (section.startsWith('S')) {
        section = section.slice(1);
    }
    return Number(section.slice(0, 2));
}

// Just to get all the unique start and end times for writing the types
function sortTimes(response: UsisScheduleResponseType): void {
    const AMtimes: string[] = [];
    const PMtimes: string[] = [];

    const startTimes: string[] = [];
    const endTimes: string[] = [];

    const timePairs = response.rows.forEach((row) => {
        let [rowCount, id, courseCode, facultyInitial, section, courseDay, startTime, endTime, roomNumber] = row.cell;

        let stTime = startTime.slice(0, 5);
        let enTime = endTime.slice(0, 5);

        if (!startTimes.includes(startTime)) startTimes.push(startTime);
        if (!endTimes.includes(endTime)) endTimes.push(endTime);

        if (startTime.includes('AM') && !AMtimes.includes(stTime)) AMtimes.push(stTime);
        if (endTime.includes('AM') && !AMtimes.includes(enTime)) AMtimes.push(enTime);

        if (startTime.includes('PM') && !PMtimes.includes(stTime)) PMtimes.push(stTime);
        if (endTime.includes('PM') && !PMtimes.includes(enTime)) PMtimes.push(enTime);
    });
    console.log(
        'startTimes Sorted',
        startTimes.sort(
            (a, b) => Number(a.replace(':', '').replace('AM', '').replace('PM', '')) - Number(b.replace(':', '').replace('AM', '').replace('PM', '')),
        ),
    );
    console.log(
        'endTimes Sorted',
        endTimes.sort(
            (a, b) => Number(a.replace(':', '').replace('AM', '').replace('PM', '')) - Number(b.replace(':', '').replace('AM', '').replace('PM', '')),
        ),
    );
}

export function formatClassScheduleResponse(response: UsisScheduleResponseType): CourseInfoType[] {
    const courses: CourseInfoType[] = [];
    response.rows.forEach((row) => {
        let [rowCount, id, courseCode, facultyInitial, section, courseDay, startTime, endTime, roomNumber] = row.cell;
        let tarc = false;
        let closed = false;
        if (section.includes('CLOSED')) {
            closed = true;
        }
        if (section.includes('S')) {
            tarc = true;
        }

        const addedCourse = courses.find((course) => course.code === courseCode);
        const sectionInfo: SectionInfo = {
            days: [Days[courseDay]],
            startTime: [Times[startTime]],
            endTime: [Times[endTime]],
            facultyInitial,
            id,
            section,
            roomNumber,
            closed,
        };

        if (addedCourse) {
            const addedSection = addedCourse.sections.find((section) => section.id === id);
            if (addedSection) {
                if (!addedSection.days.includes(Days[courseDay])) addedSection.days.push(Days[courseDay]);
                addedSection.startTime.push(Times[startTime]);
                addedSection.endTime.push(Times[endTime]);

                addedSection.days.sort((a, b) => a - b);
                addedSection.startTime.sort((a, b) => a - b);
                addedSection.endTime.sort((a, b) => b - a);
                return;
            }
            addedCourse.sections.push(sectionInfo);
            addedCourse.sections.sort((a, b) => _toNumber(a.section) - _toNumber(b.section));
            return;
        }

        const course = {} as CourseInfoType;
        course.code = courseCode;
        course.tarc = tarc;
        course.sections = [sectionInfo];
        courses.push(course);
    });
    return courses;
}
