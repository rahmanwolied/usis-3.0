import dbConnect from '@/lib/dbConnect';
import UserModel, { User } from '@/model/User';
import { NextRequest, NextResponse } from 'next/server';
import { sendVerificationEmail } from '@/utilities/mailer';
import { ApiResponse } from '@/types/ApiResponse.type';
import { hashPassword } from '@/lib/hashPassword';
import { Document } from 'mongoose';

export async function POST(request: NextRequest) {
	await dbConnect();
	try {
		const reqBody = await request.json();
		const { username, email, password, image, name } = reqBody;
		//Validation
		console.log(reqBody);

		const user = await UserModel.findOne({ $or: [{ email }, { username }] });
		if (user) {
			return NextResponse.json<ApiResponse<null>>({ status: 'error', message: 'User already exists' }, { status: 400 });
		}
		const hashedPassword = await hashPassword(password);
		const verifyCode = Math.floor(100000 + Math.random() * 900000).toString();
		const verifyCodeExpiration = Date.now() + 5 * 60 * 1000;

		const newUser = new UserModel({
			username: username ?? '',
			email,
			password: hashedPassword,
			image: image ?? undefined,
			name: name ?? '',
			verifyCode,
			verifyCodeExpiration: new Date(verifyCodeExpiration),
		});
		const savedUser = await newUser.save();
		console.log(savedUser);

		//send verify email
		const emailResponse = await sendVerificationEmail(email, username, parseInt(verifyCode));
		return NextResponse.json<ApiResponse<Document>>(
			{
				message: 'User Registered Successfully',
				status: 'success',
				data: savedUser,
			},
			{ status: 201 }
		);
	} catch (error: any) {
		console.log(error);
		return NextResponse.json<ApiResponse<null>>({ message: error.message, status: 'error' }, { status: 500 });
	}
}
