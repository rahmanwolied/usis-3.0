import { connect } from '@/lib/dbConfig';
import User from '@/model/User';
import { NextRequest, NextResponse } from 'next/server';

connect();

export async function POST(request: NextRequest) {
	try {
		const reqBody = await request.json();
		const { token } = reqBody;
		console.log(token);

		const user = await User.findOne({ verifyCode: token, verifyCodeExpiration: { $gt: Date.now() } });

		if (!user) {
			return NextResponse.json({ error: 'Invalid code or code expired' }, { status: 500 });
		}
		console.log(user);

		user.isVerified = true;
		user.verifyCode = null;
		user.verifyCodeExpiration = null;

		await user.save();

		return NextResponse.json({ message: 'Email verified successfully', success: true }, { status: 500 });
	} catch (error: any) {
		return NextResponse.json({ error: error.message }, { status: 500 });
	}
}
