import { NextRequest, NextResponse } from 'next/server';
import User from '@/model/User';
import bcryptjs from 'bcryptjs';

import { ApiResponse } from '@/types/ApiResponse.type';
import dbConnect from '@/lib/dbConnect';

export async function POST(request: NextRequest) {
    try {
        await dbConnect();
        const reqBody = await request.json();
        const { token, newPassword, username } = reqBody;

        const user = await User.findOne({
            username,
            resetPasswordCode: token,
            resetPasswordCodeExpiration: { $gt: Date.now() },
        });

        if (!user) {
            return NextResponse.json<ApiResponse<null>>(
                { message: 'Invalid code or code expired', status: 'error' },
                { status: 500 },
            );
        }
        console.log(user);

        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(newPassword, salt);
        console.log(hashedPassword);
        user.password = hashedPassword;

        await user.save();

        return NextResponse.json<ApiResponse<null>>(
            { message: 'Password reset successfully', status: 'success' },
            { status: 200 },
        );
    } catch (error: any) {
        return NextResponse.json<ApiResponse<null>>(
            { message: error.message, status: 'error' },
            { status: 500 },
        );
    }
}
