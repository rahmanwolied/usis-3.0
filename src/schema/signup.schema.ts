import { z } from 'zod';

const usernameSchema = z
	.string()
	.min(2, { message: 'Username must be atleast 2 characters' })
	.max(20, { message: 'Username must be within 20 characters' });

export const signupSchema = z.object({
	email: z.string().email({ message: 'Invalid email' }),
	password: z.string().min(6, { message: 'Password must be at least 6 characters' }),
	name: z.string().min(2),
	username: usernameSchema,
	isFaculty: z.boolean(),
	department: z.string().min(2),
});
