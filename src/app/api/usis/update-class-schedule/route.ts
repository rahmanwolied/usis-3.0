import { NextRequest, NextResponse } from 'next/server';
import { CourseModel } from '@/model/Course';
import UsisSDK from '@/services/usis-sdk';
import {
    combineCourseInfo,
    getLabRoomInfo,
    getRoomInfoReliable,
} from '@/utilities/format-response';

import { ApiResponse } from '@/types/ApiResponse.type';
import { Course } from '@/types/usisReponse.type';
import dbConnect from '@/lib/dbConnect';

export async function POST(request: NextRequest) {
    await dbConnect();
    try {
        const usis = new UsisSDK();
        const schedule = await usis.getClassScheduleWithLabs();
        const minimizedCourseInfo = getLabRoomInfo(
            await usis.getMinimizedClassSchedule(),
        );
        const reliableRoomInfo = getRoomInfoReliable(
            await usis.getClassSchedule(),
        );

        const courses: Course[] = combineCourseInfo(
            schedule.rows,
            minimizedCourseInfo,
            reliableRoomInfo,
        );

        await CourseModel.deleteMany({});
        console.log('Courses deleted');
        const courseBatch = await CourseModel.insertMany(courses);
        console.log('Courses inserted');

        return NextResponse.json<ApiResponse<typeof courseBatch>>({
            message: 'Courses updated',
            data: courseBatch,
            status: 'success',
            code: 200,
        });
    } catch (error) {
        console.error(error);
        return NextResponse;
    }
}

// function applyFilter(courses: Course[], filters: FilterType[]) {
//     let courseFilters = filters.find((filter) => filter.name === 'Courses')
//         ?.items as string[];
//     let facultyFilters = filters.find(
//         (filter) => filter.name === 'Faculties',
//     )?.items;
//     let dayFilters = filters.find((filter) => filter.name === 'Days')?.items;
//     let timeFilters = filters.find(
//         (filter) => filter.name === 'Start Times',
//     )?.items;

//     return courses
//         .filter((course) =>
//             !courseFilters
//                 ? 1
//                 : courseFilters?.includes(course.code)
//                   ? 1
//                   : courseFilters.find((filter) =>
//                         course.code.includes(filter),
//                     ),
//         )
//         .filter((course) =>
//             !facultyFilters
//                 ? 1
//                 : course.sections.find((section) =>
//                       facultyFilters?.includes(section.facultyInitial),
//                   ),
//         )
//         .map((course) => ({
//             ...course,
//             sections: course.sections.filter((section) =>
//                 !facultyFilters
//                     ? 1
//                     : facultyFilters?.includes(section.facultyInitial),
//             ),
//         }))
//         .filter((course) =>
//             !dayFilters
//                 ? 1
//                 : course.sections.find((section) =>
//                       section.days.find((day) =>
//                           dayFilters?.includes(Days[day]),
//                       ),
//                   ),
//         )
//         .map((course) => ({
//             ...course,
//             sections: course.sections.filter((section) =>
//                 !dayFilters
//                     ? 1
//                     : section.days.find((day) =>
//                           dayFilters?.includes(Days[day]),
//                       ),
//             ),
//         }))
//         .filter((course) =>
//             !timeFilters
//                 ? 1
//                 : course.sections.find((section) =>
//                       section.startTime.find((time) =>
//                           timeFilters?.includes(Times[time]),
//                       ),
//                   ),
//         )
//         .map((course) => ({
//             ...course,
//             sections: course.sections.filter((section) =>
//                 !timeFilters
//                     ? 1
//                     : section.startTime.find((time) =>
//                           timeFilters?.includes(Times[time]),
//                       ),
//             ),
//         }));
// }
