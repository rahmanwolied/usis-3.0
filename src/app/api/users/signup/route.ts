import { connect } from '@/dbConfig/dbConfig';
import User from '@/model/User';
import { NextRequest, NextResponse } from 'next/server';
import bcryptjs from 'bcryptjs';
import { sendEmail } from '@/utilities/mailer';

export async function POST(request: NextRequest) {
	connect();
	try {
		const reqBody = await request.json()
		const { username, email, password } = reqBody
		//Validation
		console.log(reqBody);

		const user = await User.findOne({ email });
		if (user) {
			return NextResponse.json({ error: 'User already exists' }, { status: 400 });
		}

		const salt = await bcryptjs.genSalt(10);
		const hashedPassword = await bcryptjs.hash(password, salt);

		const newUser = new User({
			username,
			email,
			password: hashedPassword,
		});
		const savedUser = await newUser.save();
		console.log(savedUser);

		//send verify email
		await sendEmail({ email, mailtype: 'verify', userID: savedUser._id });
		return NextResponse.json({
			message: 'User Registered Successfully',
			success: true,
			savedUser,
		});
	} catch (error: any) {
		return NextResponse.json({ error: error.message }, { status: 500 });
	}
}
