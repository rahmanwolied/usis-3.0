import mongoose, { Document, Schema } from 'mongoose';

import { Course, LabSection, Section } from '@/types/usisReponse.type';

export interface CourseModel extends Document, Course {}
export interface SectionModel extends Document, Section {}
interface LabModel extends Document, LabSection {}

const labSectionSchema = new Schema<LabModel>({
    days: [String],
    startTimes: [String],
    endTimes: [String],
    roomNumber: String,
    facultyInitials: [String],
    facultyNames: [String],
});

const sectionSchema = new Schema<SectionModel>({
    sectionId: {
        type: Number,
        index: true,
    },
    section: String,
    days: {
        type: [String],
        index: true,
    },
    startTimes: [String],
    endTimes: [String],
    roomNumber: String,
    facultyInitial: String,
    facultyName: String,
    closed: Boolean,
    examDate: String,
    examDay: String,
    seats: Number,
    seatsRemaining: Number,
    lab: labSectionSchema,
});

const reviewSchema = new Schema({
    reviewer: {
        type: Schema.Types.ObjectId || null,
        ref: 'User',
    },
    message: String,
    hearts: Number,
});

export const courseSchema: Schema<CourseModel> = new Schema({
    code: {
        type: String,
        required: true,
        index: true,
        unique: true,
    },
    tarc: {
        type: Boolean,
        required: true,
    },
    title: String,
    rating: { type: Number, default: 0 },
    reviews: reviewSchema,
    sections: [sectionSchema],
    department: {
        type: String,
        index: true,
    },
    program: {
        type: String,
        index: true,
    },
    faculties: [String],
});

export const CourseModel =
    (mongoose.models.Course as mongoose.Model<Course>) ||
    mongoose.model<Course>('Course', courseSchema);
