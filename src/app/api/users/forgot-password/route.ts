import dbConnect from '@/lib/dbConnect';
import User from '@/model/User';
import { NextRequest, NextResponse } from 'next/server';
import { sendPasswordResetEmail } from '@/utilities/mailer';
import { ApiResponse } from '@/types/ApiResponse.type';

export async function POST(request: NextRequest) {
	await dbConnect();
	try {
		const reqBody = await request.json();
		const { email } = reqBody;

		const user = await User.findOne({ email });
		if (!user) {
			return NextResponse.json<ApiResponse<null>>({ message: 'User with this email does not exist', status: 'error' }, { status: 400 });
		}

		user.resetPasswordCode = Math.floor(100000 + Math.random() * 900000).toString();
		user.resetPasswordCodeExpiration = new Date(Date.now() + 10 * 60 * 1000);
		await user.save();

		await sendPasswordResetEmail(user.email, user.username, parseInt(user.resetPasswordCode));
		return NextResponse.json<ApiResponse<null>>({
			message: 'Reset link is sent',
			status: 'success',
		});
	} catch (error: any) {
		return NextResponse.json({ error: error.message }, { status: 500 });
	}
}
