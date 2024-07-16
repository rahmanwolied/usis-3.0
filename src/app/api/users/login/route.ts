import dbConnect from '@/lib/dbConnect';
import User from '@/model/User';
import { NextRequest, NextResponse } from 'next/server';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { ApiResponse } from '@/types/ApiResponse.type';

export async function POST(request: NextRequest) {
	try {
		await dbConnect();
		const reqBody = await request.json();
		const { identifier, password } = reqBody;
		console.log('reqBody', reqBody);

		const user = await User.findOne({ $or: [{ email: identifier }, { username: identifier }] });
		if (!user) {
			return NextResponse.json<ApiResponse<null>>({ message: 'Invalid username or email', status: 'error' });
		}
		console.log('user exist');

		const validPassword = await bcryptjs.compare(password, user.password);
		console.log('validPassword', validPassword);

		if (!validPassword) {
			return NextResponse.json<ApiResponse<null>>({ message: 'Incorrect password', status: 'error' });
		}

		const tokenData = {
			id: user._id,
			username: user.username,
			email: user.email,
		};
		let token;
		try {
			token = jwt.sign(tokenData, process.env.TOKEN_SECRET!, { expiresIn: '1d' });
		} catch (error) {
			console.log('token error');
			token = '';
		}

		const response = NextResponse.json<ApiResponse<typeof user>>({ message: 'Login successful', status: 'success', data: user }, { status: 200 });

		response.cookies.set('token', token, {
			httpOnly: true,
		});
		return response;
	} catch (error: any) {
		return NextResponse.json({ error: error.message }, { status: 500 });
	}
}
