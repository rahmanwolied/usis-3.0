import { NextRequest, NextResponse } from 'next/server';
import { scheduleData } from '@/data/schedule-data';
import { Days, Times } from '@/enums';
import UsisSDK from '@/services/usis-sdk';
import { formatClassScheduleResponse } from '@/utilities/format-response';

import { CourseInfoType } from '@/types/usisReponse.type';
import { FilterType } from '@/app/features/class-schedule/components/course-info';

export async function POST(request: NextRequest) {
    const filters: FilterType[] = await request.json();
    console.log(filters);
    const usis = new UsisSDK();
    const data = await usis.getClassSchedule();

    // const data = scheduleData;
    const res = formatClassScheduleResponse(data);

    const filtered = applyFilter(res, filters);

    return NextResponse.json(filtered);
}

function applyFilter(courses: CourseInfoType[], filters: FilterType[]) {
    let courseFilters = filters.find((filter) => filter.name === 'Courses')?.items as string[];
    let facultyFilters = filters.find((filter) => filter.name === 'Faculties')?.items;
    let dayFilters = filters.find((filter) => filter.name === 'Days')?.items;
    let timeFilters = filters.find((filter) => filter.name === 'Start Times')?.items;

    return courses
        .filter((course) =>
            !courseFilters ? 1 : courseFilters?.includes(course.code) ? 1 : courseFilters.find((filter) => course.code.includes(filter)),
        )
        .filter((course) => (!facultyFilters ? 1 : course.sections.find((section) => facultyFilters?.includes(section.facultyInitial))))
        .map((course) => ({
            ...course,
            sections: course.sections.filter((section) => (!facultyFilters ? 1 : facultyFilters?.includes(section.facultyInitial))),
        }))
        .filter((course) => (!dayFilters ? 1 : course.sections.find((section) => section.days.find((day) => dayFilters?.includes(Days[day])))))
        .map((course) => ({
            ...course,
            sections: course.sections.filter((section) => (!dayFilters ? 1 : section.days.find((day) => dayFilters?.includes(Days[day])))),
        }))
        .filter((course) =>
            !timeFilters ? 1 : course.sections.find((section) => section.startTime.find((time) => timeFilters?.includes(Times[time]))),
        )
        .map((course) => ({
            ...course,
            sections: course.sections.filter((section) => (!timeFilters ? 1 : section.startTime.find((time) => timeFilters?.includes(Times[time])))),
        }));
}
