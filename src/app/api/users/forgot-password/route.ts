import dbConnect from '@/lib/dbConnect';
import User from '@/model/User';
import { NextRequest, NextResponse } from 'next/server';
import { sendVerificationEmail } from '@/utilities/mailer';

export async function POST(request: NextRequest) {
	await dbConnect();
	try {
		const reqBody = await request.json();
		const { email } = reqBody;

		console.log(reqBody);

		const user = await User.findOne({ email });
		if (!user) {
			return NextResponse.json({ error: 'User with this email does not exist' }, { status: 400 });
		}

		//send verify email
		await sendVerificationEmail({ email, mailtype: 'reset', userID: user._id });
		return NextResponse.json({
			message: 'Reset link is sent',
			success: true,
			user,
		});
	} catch (error: any) {
		return NextResponse.json({ error: error.message }, { status: 500 });
	}
}
