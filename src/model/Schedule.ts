import mongoose, { Document, Schema } from 'mongoose';

import { Course } from '@/types/usisReponse.type';

export interface CourseModel extends Document, Course {}
export interface Schedule extends Document {
    user: Schema.Types.ObjectId;
    courses: CourseModel[];
}

export const courseSchema: Schema<CourseModel> = new Schema({
    code: {
        type: String,
        required: true,
    },
    tarc: {
        type: Boolean,
        required: true,
    },
    title: String,
    rating: { type: Number, default: 0 },
    reviews: {
        type: [
            {
                reviewer: {
                    type: Schema.Types.ObjectId || null,
                    ref: 'User',
                },
                message: String,
                hearts: Number,
            },
        ],
        default: [],
    },
    sections: [
        {
            number: String,
            section: String,
            days: [String],
            startTime: [String],
            endTime: [String],
            roomNumber: String,
            facultyInitial: String,
            facultyName: String,
            closed: Boolean,
        },
    ],
});

export const scheduleSchema: Schema<Schedule> = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    courses: [courseSchema],
});

export const CourseModel = (mongoose.models.Course as mongoose.Model<Course>) || mongoose.model<Course>('Course', courseSchema);
export const ScheduleModel = (mongoose.models.Schedule as mongoose.Model<Schedule>) || mongoose.model<Schedule>('Schedule', scheduleSchema);
