import { connect } from '@/lib/dbConfig';
import User from '@/model/User';
import { NextRequest, NextResponse } from 'next/server';
import { sendEmail } from '@/utilities/mailer';

export async function POST(request: NextRequest) {
	connect();
	try {
		const reqBody = await request.json();
		const { email } = reqBody;

		console.log(reqBody);

		const user = await User.findOne({ email });
		if (!user) {
			return NextResponse.json({ error: 'User with this email does not exist' }, { status: 400 });
		}

		//send verify email
		await sendEmail({ email, mailtype: 'reset', userID: user._id });
		return NextResponse.json({
			message: 'Reset link is sent',
			success: true,
			user,
		});
	} catch (error: any) {
		return NextResponse.json({ error: error.message }, { status: 500 });
	}
}
