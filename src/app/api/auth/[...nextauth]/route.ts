import axios from 'axios';
import { randomBytes } from 'crypto';
import nextAuth from 'next-auth';
import Google from 'next-auth/providers/google';
import User from '@/model/User';
import { dbConnect } from '@/lib/dbConnect';

export const authOptions = {
	providers: [
		Google({
			clientId: process.env.GOOGLE_CLIENT_ID || '',
			clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
		}),
	],
	callbacks: {
		async signIn({ user, account }: { user: any; account: any }) {
			console.log('signIn', user, account);
			if (account.provider === 'google') {
				try {
					const _user = {
						email: user.email,
						username: user.name.split(' ')[0] + user.id,
						image: user.image,
						name: user.name,
						password: randomBytes(16).toString('hex'),
					};
					await dbConnect();
					const userExists = await User.findOne({ email: _user.email });
					if (userExists) {
						console.log('User already exists');
						return user;
					}
					const res = await axios.post(`http://localhost:3000/api/users/signup`, _user);
					if (res.data.success) {
						console.log('User signed up successfully');
						return user;
					}
				} catch (error: any) {
					console.error('Error while signing in with google');

					console.log(error.response.data);
				}
			}
		},
		async redirect({ url, baseUrl }: { url: string; baseUrl: string }) {
			return url.startsWith(baseUrl) ? url : baseUrl + '/profile';
		},
	},
	secret: process.env.SECRET || '',
};

const handler = nextAuth(authOptions);

export { handler as GET, handler as POST };
