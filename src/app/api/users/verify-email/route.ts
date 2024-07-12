import { dbConnect } from '@/lib/dbConfig';
import User from '@/model/User';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
	try {
		await dbConnect();
		const reqBody = await request.json();
		const { username, token } = reqBody;
		console.log(token);

		const user = await User.findOne({ username });

		if (!user) {
			return NextResponse.json({ status: 'error', message: 'User not found!' }, { status: 404 });
		}
		console.log(user);

		if (user.verifyCode !== token) {
			return NextResponse.json({ status: 'error', message: 'Invalid token!' }, { status: 400 });
		}

		if (user.verifyCodeExpiration! < new Date(Date.now())) {
			return NextResponse.json({ status: 'error', message: 'Token expired!' }, { status: 400 });
		}

		user.isVerified = true;
		user.verifyCode = null;
		user.verifyCodeExpiration = null;

		await user.save();

		return NextResponse.json({ message: 'Email verified successfully', success: true }, { status: 500 });
	} catch (error: any) {
		return NextResponse.json({ error: error.message }, { status: 500 });
	}
}
