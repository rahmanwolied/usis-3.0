import mongoose, { Document, Schema } from 'mongoose';

import { courseSchema } from './Schedule';

interface Grade extends Document {
    courseCode: string;
    courseTitle: string;
    credit: string;
    creditEarned: string;
    grade: string;
    gradePoint: string;
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
    grades: { courseCode: string; courseTitle: string; credit: string; creditEarned: string; grade: string; gradePoint: string }[];
    advisedCourses: {
        code: string;
        title: string;
        section: string;
        faculty: string;
        credit: string;
    }[];
    isUsisConnected: boolean;
    program: string;
    studentId: string;
    mobile: string;
    homePhone: string;
    bloodGroup: string;
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
            courseCode: String,
            courseTitle: String,
            credit: String,
            creditEarned: String,
            grade: String,
            gradePoint: String,
        },
    ],
    advisedCourses: [
        {
            code: String,
            title: String,
            section: String,
            faculty: String,
            credit: String,
        },
    ],
    isUsisConnected: {
        type: Boolean,
        default: false,
    },
    program: String,
    studentId: String,
    mobile: String,
    homePhone: String,
    bloodGroup: String,
});

const UserModel = (mongoose.models?.User as mongoose.Model<User>) || mongoose.model<User>('User', userSchema);

export default UserModel;
