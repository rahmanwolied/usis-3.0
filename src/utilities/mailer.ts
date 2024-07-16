import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import { render } from '@react-email/components';
import { VerifyIdentityEmail } from '../../emails/verificationEmail';
import { ResetPasswordEmail } from '../../emails/resetPasswordEmail';

dotenv.config();

export const sendVerificationEmail = async (email: string, username: string, verificationCode: number) => {
	try {
		const transport = nodemailer.createTransport({
			host: 'sandbox.smtp.mailtrap.io',
			port: 2525,
			auth: {
				user: process.env.MAILTRAP_USERNAME,
				pass: process.env.MAILTRAP_PASSWORD,
			},
		});
		const verifyHtml = render(VerifyIdentityEmail({ validationCode: verificationCode.toString(), username }));
		const mailOptions = {
			from: 'usis3.0',
			to: email,
			subject: 'Verify your email',
			html: verifyHtml,
		};
		const mailResponse = await transport.sendMail(mailOptions);
		return mailResponse;
	} catch (error: any) {
		throw new Error(error.message);
	}
};

export const sendPasswordResetEmail = async (email: string, username: string, resetCode: number) => {
	try {
		const transport = nodemailer.createTransport({
			host: 'sandbox.smtp.mailtrap.io',
			port: 2525,
			auth: {
				user: process.env.MAILTRAP_USERNAME,
				pass: process.env.MAILTRAP_PASSWORD,
			},
		});
		const resetHtml = render(ResetPasswordEmail({ resetCode: resetCode.toString(), username }));
		const mailOptions = {
			from: 'usis3.0',
			to: email,
			subject: 'Reset your password',
			html: resetHtml,
		};
		const mailResponse = await transport.sendMail(mailOptions);
		return mailResponse;
	} catch (error: any) {
		throw new Error(error.message);
	}
};
