import { NextRequest, NextResponse } from 'next/server';
import { CourseModel } from '@/model/Course';

import { ApiResponse } from '@/types/ApiResponse.type';
import dbConnect from '@/lib/dbConnect';

export async function POST(request: NextRequest) {
    await dbConnect();
    const {
        courses: codes,
        facultyInitials,
        days,
        startTimes,
    } = await request.json();

    const query: any = {
        code: { $in: codes },
    };

    const projection: any = {
        code: 1,
        sections: {
            $filter: {
                input: '$sections',
                as: 'section',
                cond: {
                    $or: [],
                },
            },
        },
    };

    if (facultyInitials.length > 0) {
        projection.sections.$filter.cond.$or.push({
            $in: ['$$section.facultyInitial', facultyInitials],
        });
    }

    if (days.length > 0) {
        days.forEach((day: string) => {
            projection.sections.$filter.cond.$or.push({
                $in: [day, '$$section.days'],
            });
        });
    }

    if (startTimes.length > 0) {
        startTimes.forEach((startTime: string) => {
            projection.sections.$filter.cond.$or.push({
                $in: [startTime, '$$section.startTimes'],
            });
        });
    }

    if (projection.sections.$filter.cond.$or.length === 0) {
        projection.sections = 1;
    }

    const courses = await CourseModel.find(query, projection).lean();
    console.log('courses', courses);

    try {
        return NextResponse.json<ApiResponse<typeof courses>>({
            message: 'Courses fetched',
            status: 'success',
            data: courses,
            code: 200,
        });
    } catch (error) {
        console.error(error);
        return NextResponse;
    }
}
