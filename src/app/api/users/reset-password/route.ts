import { connect } from '@/lib/dbConnect';
import User from '@/model/User';
import { NextRequest, NextResponse } from 'next/server';
import bcryptjs from 'bcryptjs';

connect();

export async function POST(request: NextRequest) {
	try {
		const reqBody = await request.json();
		const { token, newPassword } = reqBody;
		console.log(token);

		const user = await User.findOne({ resetPasswordCode: token, resetPasswordCodeExpiration: { $gt: Date.now() } });

		if (!user) {
			return NextResponse.json({ error: 'Invalid code or code expired' }, { status: 500 });
		}
		console.log(user);

		const salt = await bcryptjs.genSalt(10);
		const hashedPassword = await bcryptjs.hash(newPassword, salt);
		console.log(hashedPassword);
		user.password = hashedPassword;

		await user.save();

		return NextResponse.json({ message: 'Password reset successfully', success: true }, { status: 500 });
	} catch (error: any) {
		return NextResponse.json({ error: error.message }, { status: 500 });
	}
}
