'use server';

import User from '@/model/User';
import { sendPasswordResetEmail } from '@/utilities/mailer';

import { ApiResponse } from '@/types/ApiResponse.type';
import dbConnect from '@/lib/dbConnect';

export async function forgotPassword(
    prevSate: any,
    formData: FormData
): Promise<ApiResponse<null>> {
    console.log('forgotPassword-prevSate', prevSate);
    await dbConnect();
    try {
        const email = formData.get('email') as string;

        const user = await User.findOne({ email });
        if (!user) {
            return {
                message: 'User with this email does not exist',
                status: 'error',
                code: 404,
            };
        }

        user.resetPasswordCode = Math.floor(
            100000 + Math.random() * 900000
        ).toString();
        user.resetPasswordCodeExpiration = new Date(
            Date.now() + 10 * 60 * 1000
        );
        await user.save();

        await sendPasswordResetEmail(
            user.email,
            user.username,
            parseInt(user.resetPasswordCode)
        );
        return {
            message: 'Reset link has been sent. Please check your email.',
            status: 'success',
        };
    } catch (error: any) {
        return { message: error.message, status: 'error', code: 500 };
    }
}
