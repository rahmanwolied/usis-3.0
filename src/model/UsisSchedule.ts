import mongoose, { Document, Schema } from 'mongoose';

import { Course } from '@/types/usisReponse.type';

import { courseSchema } from './Schedule';

export interface UsisSchedule extends Document {
    lastUpdated: Date;
    courses: Course[];
}

const usisScheduleSchema: Schema<UsisSchedule> = new Schema({
    lastUpdated: {
        type: Date,
        required: true,
    },
    courses: [courseSchema],
});

export const UsisScheduleModel =
    (mongoose.models.UsisSchedule as mongoose.Model<UsisSchedule>) || mongoose.model<UsisSchedule>('UsisSchedule', usisScheduleSchema);
