import { NextRequest, NextResponse } from 'next/server';
import UserModel from '@/model/User';
import UsisSDK from '@/services/usis-sdk';

import { ApiResponse } from '@/types/ApiResponse.type';
import dbConnect from '@/lib/dbConnect';

import { formatAdvisedCourses, formatGradesheet, formatProfile } from './helpers';

export async function POST(request: NextRequest) {
    const { jsessionid, srvname, username } = await request.json();
    const user = await UserModel.findOne({ username });
    const usis = new UsisSDK({ jsessionid, srvname });
    const advisedCourses = formatAdvisedCourses(await usis.getAdvisedCourse());
    const grades = formatGradesheet(await usis.showGradesheet());
    const profile = formatProfile(await usis.getProfile());

    if (!user) {
        return NextResponse.json<ApiResponse<null>>({ message: 'User not found', status: 'error' });
    }

    user.isUsisConnected = true;
    user.advisedCourses = advisedCourses;
    user.grades = grades;
    user.program = profile.program;
    user.mobile = profile.mobile;
    user.homePhone = profile.homePhone;
    user.studentId = profile.studentId;
    user.bloodGroup = profile.bloodGroup;

    await user.save();

    return NextResponse.json({ isUsisConnected: user.isUsisConnected });
}
