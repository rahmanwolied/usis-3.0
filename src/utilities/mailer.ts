import User from '@/model/User';
import nodemailer from 'nodemailer';
import bcryptjs from 'bcryptjs';

export const sendEmail = async ({ email, mailtype, userID }: any) => {
	try {
		const hashedToken = await bcryptjs.hash(userID.toString(), 10);
		if (mailtype === 'verify') {
			await User.findByIdAndUpdate(userID, { verifyCode: hashedToken, verifyCodeExpiration: Date.now() + 3600000 });
		} else if (mailtype === 'reset') {
			await User.findByIdAndUpdate(userID, { resetPasswordCode: hashedToken, resetPasswordCodeExpiration: Date.now() + 3600000 });
		}

		const transport = nodemailer.createTransport({
			host: 'sandbox.smtp.mailtrap.io',
			port: 2525,
			auth: {
				user: '76de9642e70f0e',
				pass: '0d5682dd5f5c69',
			},
		});
		const verifyHtml = `<p>Click <a href='${process.env.DOMAIN}/verify-email?token=${hashedToken}'>here</a> to verify your email or copy and paste the link belwo in your browser.<br>${process.env.DOMAIN}/verifyemail?token=${hashedToken} </p>`;
		const resetHtml = `<p>Click <a href='${process.env.DOMAIN}/reset-password?token=${hashedToken}'>here</a> to reset your password or copy and paste the link below in your browser.<br>${process.env.DOMAIN}/reset-password?token=${hashedToken} </p>`;
		const html = mailtype === 'verify' ? verifyHtml : resetHtml;
		const mailOptions = {
			from: process.env.EMAIL_USER,
			to: email,

			subject: mailtype === 'verify' ? 'Verify your email' : 'Reset your password',
			html,
		};
		const mailResponse = await transport.sendMail(mailOptions);
	} catch (error: any) {
		throw new Error(error.message);
	}
};
