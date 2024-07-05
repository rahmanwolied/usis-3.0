import mongoose, { Schema, Document } from 'mongoose';

export interface User extends Document {
	username: string;
	email: string;
	password: string;
	isFaculty: boolean;
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
		required: [true, 'Please provide a username'],
	},
	email: {
		type: String,
		required: [true, 'Please provide an email'],
		unique: true,
	},
	password: {
		type: String,
		required: [true, 'Please provide a password'],
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
