import { randomBytes } from 'crypto';
import UserModel from '@/model/User';
import axios from 'axios';
import dotenv from 'dotenv';
import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import Google from 'next-auth/providers/google';

import dbConnect from '@/lib/dbConnect';

dotenv.config();

export const authOptions: NextAuthOptions = {
    providers: [
        Google({
            clientId: process.env.GOOGLE_CLIENT_ID || '',
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
        }),
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                username: {
                    label: 'Username',
                    type: 'text',
                    placeholder: 'jsmith',
                },
                password: { label: 'Password', type: 'password' },
            },
            async authorize(credentials) {
                const res = await axios.post(
                    `http://localhost:3000/api/users/login`,
                    credentials,
                );
                const user = await res.data.data;
                if (user) {
                    return user;
                } else {
                    throw new Error(res.data.message);
                }
            },
        }),
    ],
    callbacks: {
        async signIn({ user, account }): Promise<string | boolean> {
            if (account?.provider === 'google') {
                user.username = user.name?.split(' ')[0] + user.id;
                user.isVerified = true;
                try {
                    const _user = {
                        email: user.email,
                        username: user.username,
                        image: user.image,
                        name: user.name,
                        password: randomBytes(16).toString('hex'),
                        isVerified: user.isVerified,
                    };
                    await dbConnect();
                    const userExists = await UserModel.findOne({
                        email: _user.email,
                    });
                    if (userExists) {
                        console.log('User already exists');
                        return true;
                    }
                    const newUser = new UserModel(_user);
                    const savedUser = await newUser.save();
                    console.log('User saved', savedUser);
                    if (savedUser) {
                        console.log('User signed up successfully');
                        return true;
                    }
                    return false;
                } catch (error: any) {
                    console.error('Error while signing in with google');

                    console.log(error.response.data);
                }
            }
            return true;
        },
        async jwt({ token, user }) {
            console.log('jwt', user);
            if (user) {
                token.id = user._id?.toString();
                token.isVerified = user.isVerified;
                token.username = user.username;
            }
            return token;
        },
        async session({ session, token }) {
            if (token) {
                session.user._id = token._id as string;
                session.user.isVerified = token.isVerified as boolean;
                session.user.username = token.username as string;
            }

            return session;
        },
    },
    pages: {
        signIn: '/login',
    },
    secret: process.env.AUTH_SECRET || '',
    session: {
        strategy: 'jwt',
    },
};
