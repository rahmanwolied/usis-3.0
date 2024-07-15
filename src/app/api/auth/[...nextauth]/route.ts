import axios from 'axios';
import { randomBytes } from 'crypto';
import nextAuth from 'next-auth';
import Google from 'next-auth/providers/google';
import User from '@/model/User';
import dbConnect from '@/lib/dbConnect';
import { authOptions } from './options';

const handler = nextAuth(authOptions);

export { handler as GET, handler as POST };
