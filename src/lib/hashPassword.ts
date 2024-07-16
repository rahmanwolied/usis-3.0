import bcryptjs from 'bcryptjs';

export async function hashPassword(password: string) {
	const salt = await bcryptjs.genSalt(10);
	const hashedPassword = await bcryptjs.hash(password, salt);
	return hashedPassword;
}
