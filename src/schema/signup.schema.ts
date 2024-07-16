import { z } from 'zod';

export const usernameSchema = z
	.string({ required_error: 'Username is required' })
	.min(2, { message: 'Username must be atleast 2 characters' })
	.max(20, { message: 'Username must be within 20 characters' });

export const signupSchema = z.object({
	email: z.string({ required_error: 'Please enter an email address' }).email({ message: 'Invalid email' }),
	password: z.string({ required_error: 'Please enter a password' }).min(6, { message: 'Password must be at least 6 characters' }),
	username: usernameSchema,
	isFaculty: z.boolean(),
	department: z.string({ required_error: 'Please select a department' }).min(2),
});
