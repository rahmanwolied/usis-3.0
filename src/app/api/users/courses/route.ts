import { NextRequest, NextResponse } from 'next/server';
import UserModel from '@/model/User';
import UsisSDK from '@/services/usis-sdk';

import { ApiResponse } from '@/types/ApiResponse.type';
import dbConnect from '@/lib/dbConnect';

export async function POST(request: NextRequest) {
    await dbConnect();
    const { email } = await request.json();

    try {
        const user = await UserModel.findOne({ email }).lean();
        const courses = user?.grades.map((grade) => grade.courseCode);
        const advisedCourses = user?.advisedCourses.map(
            (course) => course.code,
        );

        const res = { courses, advisedCourses };
        return NextResponse.json<ApiResponse<typeof res>>({
            message: 'Course info fetched',
            status: 'success',
            data: res,
            code: 200,
        });
    } catch (error) {
        console.error(error);
        return NextResponse;
    }
}
