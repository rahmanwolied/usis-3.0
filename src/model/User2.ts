import mongoose, { Document, Schema } from 'mongoose';

interface Grade {
    courseCode: string;
    courseTitle: string;
    credit: string;
    creditEarned: string;
    grade: string;
    gradePoint: string;
}

interface AdvisedCourses {
    code: string;
    title: string;
    section: string;
    faculty: string;
    credit: string;
}

interface Class {
    code: string;
    theorySection: number;
    labSection: number;
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
    grades: Grade[];
    advisedCourses: AdvisedCourses[];
    isUsisConnected: boolean;
    program: string;
    studentId: string;
    mobile: string;
    classes: Class[];
}

const gradeSchema = new Schema({
    courseCode: String,
    courseTitle: String,
    credit: String,
    creditEarned: String,
    grade: String,
    gradePoint: String,
});

const advisedCoursesSchema = new Schema({
    code: String,
    title: String,
    section: String,
    faculty: String,
    credit: String,
});

const classSchema = new Schema({
    code: String,
    theorySection: Number,
    labSection: Number,
});

export const userSchema: Schema<User> = new Schema({
    name: String,
    username: {
        type: String,
        required: [true, 'Please provide a username'],
        unique: true,
        index: true,
        trim: true,
    },
    email: {
        type: String,
        required: [true, 'Please provide an email'],
        unique: true,
        index: true,
        trim: true,
        lowercase: true,
    },
    studentId: {
        type: String,
        required: false,
        unique: true,
        index: true,
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
        type: String,
        default: null,
    },
    verifyCodeExpiration: {
        type: Date,
        default: null,
    },
    resetPasswordCode: {
        type: String,
        default: null,
    },
    resetPasswordCodeExpiration: {
        type: Date,
        default: null,
    },
    grades: [gradeSchema],
    advisedCourses: [advisedCoursesSchema],
    classes: [classSchema],
    isUsisConnected: {
        type: Boolean,
        default: false,
    },
    program: String,
    mobile: String,

});

const UserModel =
    (mongoose.models?.User as mongoose.Model<User>) ||
    mongoose.model<User>('User', userSchema);

export default UserModel;
