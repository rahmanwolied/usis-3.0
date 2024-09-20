import mongoose, { Document, Schema } from 'mongoose';

// Define Section Schema
const sectionSchema = new Schema({
    sectionId: { type: Number, required: true },
    section: { type: String, required: true },
    days: { type: [String], required: true },
    startTimes: { type: [String], required: true },
    endTimes: { type: [String], required: true },
    roomNumber: { type: String, required: true },
    facultyInitial: { type: String, required: true },
    facultyName: { type: String, required: true },
    closed: { type: Boolean, default: false },
    examDate: { type: String, required: true },
    examDay: { type: String, required: true },
    seats: { type: Number, required: true },
    seatsRemaining: { type: Number, required: true },
    lab: {
        days: [String],
        startTimes: [String],
        endTimes: [String],
        roomNumber: String,
        facultyInitials: [String],
        facultyNames: [String],
    }
});

// Define Course Schema
const courseSchema = new Schema({
    code: { type: String, required: true },
    tarc: { type: Boolean, required: true },
    title: { type: String, required: true },
    rating: { type: Number, default: 0 },
    sections: [sectionSchema],
    department: { type: String, required: true },
    program: { type: String, required: true },
    faculties: { type: [String], required: true }
});

// Create the Course Model
const CourseModel =
    mongoose.models?.Course || mongoose.model('Course', courseSchema);

export default CourseModel;
