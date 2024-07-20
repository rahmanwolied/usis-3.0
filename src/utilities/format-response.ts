import type { CourseInfoType, SectionInfo, UsisScheduleResponseType } from '@/types/usisReponse.type';

export function formatClassScheduleResponse(response: UsisScheduleResponseType): CourseInfoType[] {
    const courses: CourseInfoType[] = [];
    response.rows.forEach((row) => {
        const [rowCount, id, courseCode, facultyInitial, section, courseDay, startTime, endTime, roomNumber] = row.cell;

        const sectionInfo: SectionInfo = {
            days: [courseDay as string],
            startTime: [startTime as string],
            endTime: [endTime as string],
            facultyInitial,
            id,
            section: Number(section),
            roomNumber,
        };

        const courseIdx = courses.findIndex((course) => course.code === courseCode);

        if (courseIdx !== -1) {
            const sectionIdx = courses[courseIdx].sections.findIndex((section) => section.id === id);
            if (sectionIdx !== -1) {
                courses[courseIdx].sections[sectionIdx].days.push(courseDay!);
                courses[courseIdx].sections[sectionIdx].startTime.push(startTime!);
                courses[courseIdx].sections[sectionIdx].endTime.push(endTime!);
                return;
            }
            courses[courseIdx].sections.push(sectionInfo);
            courses[courseIdx].sections.sort((a, b) => a.section - b.section);
            return;
        }

        const course = {} as CourseInfoType;
        course.code = courseCode;
        course.sections = [sectionInfo];
        courses.push(course);
    });
    return courses;
}
