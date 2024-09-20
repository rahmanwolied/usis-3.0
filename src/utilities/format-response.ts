import { Days, Times } from '@/enums';
import UsisSDK from '@/services/usis-sdk';
import parse from 'node-html-parser';

import type {
    ClassSchedule,
    ClassScheduleWithLabs,
    Course,
    LabSection,
    Section,
    USISResponseType,
} from '@/types/usisReponse.type';

import {
    _toNumber,
    extractAndCombineTimes,
    extractDayTimeRoom,
    extractLabRoomNumber,
    isLab,
} from './helpers';

export function combineCourseInfo(
    courseMetadata: ClassScheduleWithLabs[],
    roomInfoLab: ReturnType<typeof getLabRoomInfo>,
    roomInfoReliable: ReturnType<typeof getRoomInfoReliable>,
): Course[] {
    const courses: Course[] = [];
    courseMetadata.forEach((row) => {
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

        const isTarc = section?.startsWith('S');
        const isClosed = section.includes('CLOSED');
        const sectionId = Number(
            section.replace('-CLOSED', '').replace('S', ''),
        );
        let hasLab = false;
        const tempLabInfo: LabSection = {
            days: [],
            startTimes: [],
            endTimes: [],
            roomNumber: '',
        };

        const sectionInfo: Section = {
            sectionId,
            days: [],
            startTimes: [],
            endTimes: [],
            seatsRemaining: 0,
            section,
            facultyInitial,
            roomNumber: '',
            closed: isClosed,
            examDate,
            examDay,
            facultyName,
            seats,
        };

        const weekDays = [
            'Sunday',
            'Monday',
            'Tuesday',
            'Wednesday',
            'Thursday',
            'Friday',
            'Saturday',
        ];

        for (let i = 11; i < row.cell.length; i++) {
            if (row.cell[i]) {
                const { startTime, endTime, lab } = extractAndCombineTimes(
                    row.cell[i] as string,
                );
                if (lab) {
                    hasLab = true;
                    tempLabInfo.days = [weekDays[i - 11]];
                    tempLabInfo.startTimes = [startTime];
                    tempLabInfo.endTimes = [endTime];
                    tempLabInfo.roomNumber = '';
                } else {
                    sectionInfo.days.push(weekDays[i - 11]);
                    sectionInfo.startTimes.push(startTime);
                    sectionInfo.endTimes.push(endTime);
                }
            }
        }

        // if (minimizedSectionInfo) {
        //     if (!sectionInfo.roomNumber)
        //         console.log('No room number for', courseCode, section);
        // }

        const reliableRoomInfo = roomInfoReliable
            .find((course) => course.code === courseCode)
            ?.sections.find(
                (_section) => _section.sectionId === sectionInfo.sectionId,
            );

        if (reliableRoomInfo) {
            sectionInfo.roomNumber = reliableRoomInfo.roomNumber;
            if (isLab(reliableRoomInfo.roomNumber)) hasLab = false;
        }

        if (hasLab) {
            const labRoomInfo = roomInfoLab
                .find((course) => course.code === courseCode)
                ?.sections.find((_section) => _section.sectionId === sectionId);

            if (labRoomInfo) {
                if (!labRoomInfo.labRoomNumber) {
                    sectionInfo.days.concat(tempLabInfo.days);
                    sectionInfo.startTimes.concat(tempLabInfo.startTimes);
                    sectionInfo.endTimes.concat(tempLabInfo.endTimes);
                } else {
                    tempLabInfo.roomNumber = labRoomInfo.labRoomNumber;
                    sectionInfo.lab = tempLabInfo;
                }
            } else if (reliableRoomInfo) {
                console.log('Outdated Data for', courseCode, sectionInfo);
            }
        }

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
        addedCourse.sections.sort((a, b) => a.sectionId - b.sectionId);

        if (!addedCourse.faculties.includes(facultyInitial))
            addedCourse.faculties.push(facultyInitial);
    });
    return courses;
}

export function getLabRoomInfo(html: string) {
    const document = parse(html);
    const rows = document.querySelectorAll('#customers tbody tr');
    const courses: LabRoomInfo[] = [];

    rows.forEach((row) => {
        const cells = row.querySelectorAll('td');
        const courseCode = cells[1].textContent.trim();

        const section = cells[5].textContent.trim();
        const dayTimeRoom = cells[6].textContent.trim();
        const roomNumber = extractLabRoomNumber(dayTimeRoom);
        const sectionId = Number(
            section.replace('-CLOSED', '').replace('S', ''),
        );
        const existingCourse = courses.find(
            (course) => course.code === courseCode,
        );

        if (!existingCourse)
            courses.push({
                code: courseCode,
                sections: [
                    {
                        sectionId,
                        labRoomNumber: roomNumber,
                    },
                ],
            });
        else {
            existingCourse.sections.push({
                sectionId,
                labRoomNumber: roomNumber,
            });
        }
    });
    return courses;
}

export function getRoomInfoReliable(response: USISResponseType<ClassSchedule>) {
    const courses: RoomInfo[] = [];

    response.rows.forEach((row) => {
        let [
            rowCount,
            id,
            courseCode,
            facultyInitial,
            section,
            courseDay,
            startTime,
            endTime,
            roomNumber,
        ] = row.cell;
        const sectionId = Number(
            section.replace('-CLOSED', '').replace('S', ''),
        );

        const addedCourse = courses.find(
            (course) => course.code === courseCode,
        );

        const sectionInfo = {
            sectionId,
            roomNumber,
        };

        if (!addedCourse) {
            const course = {
                code: courseCode,
                sections: [sectionInfo],
            };
            courses.push(course);
            return;
        }
        const addedSection = addedCourse.sections.find(
            (_section) => _section.sectionId === sectionId,
        );

        if (!addedSection) {
            addedCourse.sections.push(sectionInfo);
            addedCourse.sections.sort((a, b) => a.sectionId - b.sectionId);
            return;
        }

        return;
    });
    return courses;
}

type RoomInfo = {
    code: string;
    sections: {
        sectionId: number;
        roomNumber: string;
    }[];
};

type LabRoomInfo = {
    code: string;
    sections: {
        sectionId: number;
        labRoomNumber: string | undefined;
    }[];
};
