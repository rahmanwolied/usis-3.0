import { NextRequest, NextResponse } from 'next/server';
import { CourseModel } from '@/model/Course';

import { ApiResponse } from '@/types/ApiResponse.type';
import dbConnect from '@/lib/dbConnect';

export async function POST(request: NextRequest) {
    await dbConnect();
    const { courses: coursesQuery } = await request.json();

    try {
        const faculties = await CourseModel.find(
            {
                code: { $in: coursesQuery },
            },
            {
                faculties: 1,
                _id: 0,
            },
        ).lean();

        return NextResponse.json<ApiResponse<string[]>>({
            message: 'Faculties fetched',
            status: 'success',
            data: [
                ...new Set(faculties.map((course) => course.faculties).flat()),
            ],
            code: 200,
        });
    } catch (error) {
        console.error(error);
        return NextResponse;
    }
}
