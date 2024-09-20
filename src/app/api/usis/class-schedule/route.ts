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
    const { searchParams } = new URL(request.url);
    const courseCode = searchParams.get('courseCode');
    const section = searchParams.get('section');
    const faculty = searchParams.get('faculty');
    const day = searchParams.get('day');
    const startTime = searchParams.get('startTime');
    const query: any = {};

    if (courseCode) query.code = courseCode;
    if (section) query['sections.section'] = section;
    if (faculty) query['sections.facultyName'] = faculty;
    if (day) query['sections.days'] = day;
    if (startTime) query['sections.startTimes'] = startTime;

    const res = await CourseModel.find(query).lean();

    try {
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
