import mongoose, { Document, Schema } from 'mongoose';

interface Grade extends Document {
    course: string;
    grade: string;
    semester: string;
    year: string;
}

export interface User extends Document {
    username: string;
    email: string;
    image: string;
    password: string;
    name: string;
    isFaculty?: boolean;
    isAdmin?: boolean;
    isVerified?: boolean;
    verifyCode: string | null;
    verifyCodeExpiration: Date | null;
    resetPasswordCode?: string | null;
    resetPasswordCodeExpiration?: Date | null;
    schedule: Schema.Types.ObjectId;
    grades: Grade[];
    advisedCourses: Schema.Types.ObjectId[];
}

export const userSchema: Schema<User> = new Schema({
    name: String,
    username: {
        type: String,
        required: [true, 'Please provide a username'],
        unique: true,
    },
    email: {
        type: String,
        required: [true, 'Please provide an email'],
        unique: true,
    },
    image: {
        type: String,
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
    schedule: {
        type: Schema.Types.ObjectId,
        ref: 'Schedule',
    },
    grades: [
        {
            course: String,
            grade: String,
            semester: String,
            year: String,
        },
    ],
    advisedCourses: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Course',
        },
    ],
});

const UserModel = (mongoose.models.User as mongoose.Model<User>) || mongoose.model<User>('User', userSchema);

export default UserModel;
