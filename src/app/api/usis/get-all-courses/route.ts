import { NextRequest, NextResponse } from 'next/server';
import { CourseModel } from '@/model/Course';

import { ApiResponse } from '@/types/ApiResponse.type';
import dbConnect from '@/lib/dbConnect';

export async function GET(request: NextRequest) {
    await dbConnect();

    try {
        const courses = await CourseModel.find(
            {},
            {
                code: 1,
                _id: 0,
            },
        ).lean();

        return NextResponse.json<ApiResponse<string[]>>({
            message: 'Faculties fetched',
            status: 'success',
            data: courses.map((course) => course.code),
            code: 200,
        });
    } catch (error) {
        console.error(error);
        return NextResponse;
    }
}
