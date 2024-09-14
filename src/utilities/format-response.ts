import { Days, Times } from '@/enums';

import type { Course, Section, UsisScheduleResponseType } from '@/types/usisReponse.type';

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

export function formatClassScheduleResponse(response: UsisScheduleResponseType): Course[] {
    const courses: Course[] = [];
    response.rows.forEach((row) => {
        let [rowCount, id, courseCode, facultyInitial, section, courseDay, startTime, endTime, roomNumber] = row.cell;
        let tarc = false;
        let closed = false;
        if (section.includes('CLOSED')) {
            closed = true;
        }
        if (section.startsWith('S')) {
            tarc = true;
        }

        const addedCourse = courses.find((course) => course.code === courseCode);
        const sectionInfo: Section = {
            days: [Days[courseDay]],
            startTime: [Times[startTime]],
            endTime: [Times[endTime]],
            facultyInitial,
            number: id,
            section,
            roomNumber,
            closed,
        };

        if (!addedCourse) {
            const course = {} as Course;
            course.code = courseCode;
            course.tarc = tarc;
            course.sections = [sectionInfo];
            courses.push(course);
            return;
        }
        const addedSection = addedCourse.sections.find((section) => section.number === id);

        if (!addedSection) {
            addedCourse.sections.push(sectionInfo);
            addedCourse.sections.sort((a, b) => _toNumber(a.section) - _toNumber(b.section));
            return;
        }

        const dayIdx = addedSection.days.findIndex((day) => day === Days[courseDay]);

        if (dayIdx === -1 || Math.abs(addedSection.endTime[dayIdx] - Times[startTime]) > 1) {
            addedSection.days.push(Days[courseDay]);
            addedSection.startTime.push(Times[startTime]);
            addedSection.endTime.push(Times[endTime]);

            return;
        }

        addedSection.startTime[dayIdx] = Math.min(addedSection.startTime[dayIdx], Times[startTime]);
        addedSection.endTime[dayIdx] = Math.max(addedSection.endTime[dayIdx], Times[endTime]);

        return;
    });
    return courses;
}
