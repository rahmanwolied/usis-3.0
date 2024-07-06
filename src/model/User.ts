import mongoose, { Schema, Document } from 'mongoose';

export interface User extends Document {
	username: string;
	email: string;
	image: string;
	password: string;
	isFaculty: boolean;
	name: string;
	isAdmin: boolean;
	isVerified: boolean;
	verifyCode: string | null;
	verifyCodeExpiration: Date | null;
	resetPasswordCode: string | null;
	resetPasswordCodeExpiration: Date | null;
}

const UserSchema: Schema<User> = new Schema({
	username: {
		type: String,
		required: [false, 'Please provide a username'],
	},
	name: String,
	email: {
		type: String,
		required: [true, 'Please provide an email'],
		unique: true,
	},
	image: {
		type: String,
		default: 'default.jpg',
	},
	password: {
		type: String,
		required: [false, 'Please provide a password'],
	},
	isFaculty: {
		type: Boolean,
		default: false,
	},
	isAdmin: {
		type: Boolean,
		default: false,
	},
	isVerified: {
		type: Boolean,
		default: false,
	},
	verifyCode: {
		type: String || null,
	},
	verifyCodeExpiration: {
		type: Date || null,
	},
	resetPasswordCode: {
		type: String || null,
	},
	resetPasswordCodeExpiration: {
		type: Date || null,
	},
});

const UserModel = (mongoose.models.User as mongoose.Model<User>) || mongoose.model<User>('User', UserSchema);

export default UserModel;
