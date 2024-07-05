import User from '@/model/User';
import nodemailer from 'nodemailer';
import bcryptjs from 'bcryptjs';

export const sendEmail = async ({ email, mailtype, userID }: any) => {
	try {
		const hashedToken = await bcryptjs.hash(userID.toString(), 10);
		if (mailtype === 'verify') {
			await User.findByIdAndUpdate(userID, { verifyCode: hashedToken, verifyCodeExpiration: Date.now() + 3600000 });
		} else if (email === 'reset') {
			await User.findByIdAndUpdate(userID, { set: { resetPasswordCode: hashedToken, resetPasswordCodeExpiration: Date.now() + 3600000 } });
		}

		const transport = nodemailer.createTransport({
			host: 'sandbox.smtp.mailtrap.io',
			port: 2525,
			auth: {
				user: '76de9642e70f0e',
				pass: '0d5682dd5f5c69',
			},
		});
		const mailOptions = {
			from: process.env.EMAIL_USER,
			to: email,

			//check this line of code ********************
			subject: mailtype === 'verify' ? 'Verify your email' : 'Reset your password',
			html: `<p>Click <a href='${process.env.DOMAIN}/verifyemail?token=${hashedToken}'>here</a> to $ {mailtype === 'Verify'? 'verify your email': 'Reset your password'} or copy and paste the link belwo in your braower.<br>${process.env.DOMAIN}/verifyemail?token=${hashedToken} </p>`,
		};
		const mailResponse = await transport.sendMail(mailOptions);
	} catch (error: any) {
		throw new Error(error.message);
	}
};
