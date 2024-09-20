import { Days, Times } from '@/enums';

export interface USISResponseType<T> {
    page: number;
    total: number;
    records: number;
    rows: T[];
}

export interface ClassSchedule {
    cell: [
        RowCount,
        SectionID,
        CourseCode,
        FacultyInitial,
        CourseSection,
        CourseDay,
        StartTime,
        EndTime,
        RoomNumber,
    ];
    class: string;
    id: SectionID;
}

export interface Course {
    code: CourseCode;
    tarc: boolean;
    title?: string;
    rating?: number;
    faculties: FacultyInitial[];
    reviews?: CourseReview[];
    sections: Section[];
    department?: string;
    program?: string;
}
export interface CourseReview {
    reviewer: Username;
    message: string;
    hearts: number;
}
export interface Section {
    sectionId: number;
    section: string;
    days: string[];
    startTimes: string[];
    endTimes: string[];
    roomNumber: string;
    facultyInitial: string;
    closed: boolean;
    facultyName?: string;
    examDate?: string;
    examDay?: string;
    seats?: number;
    seatsRemaining?: number;
    lab?: LabSection;
}

export type LabSection = {
    days: string[];
    startTimes: string[];
    endTimes: string[];
    roomNumber: string;
    facultyInitials?: string[];
    facultyNames?: string[];
};
type Username = string;
type RowCount = string;
type SectionID = string | number;
type CourseCode = string;
type FacultyInitial = string;
type CourseSection = string;
type CourseDay =
    | 'Saturday'
    | 'Sunday'
    | 'Monday'
    | 'Tuesday'
    | 'Wednesday'
    | 'Thursday'
    | 'Friday';
type StartTime =
    | '08:00 AM'
    | '09:00 AM'
    | '09:30 AM'
    | '10:00 AM'
    | '10:05 AM'
    | '11:00 AM'
    | '02:00 PM'
    | '03:05 PM'
    | '03:30 PM'
    | '04:10 PM'
    | '05:00 PM'
    | '06:00 PM'
    | '06:30 PM'
    | '11:10 AM'
    | '12:15 PM'
    | '12:30 PM';
type EndTime =
    | '09:20 AM'
    | '09:55 AM'
    | '10:50 AM'
    | '11:00 AM'
    | '01:00 PM'
    | '01:10 PM'
    | '01:50 PM'
    | '02:55 PM'
    | '03:20 PM'
    | '04:00 PM'
    | '04:50 PM'
    | '05:05 PM'
    | '06:00 PM'
    | '06:20 PM'
    | '06:30 PM'
    | '08:40 PM'
    | '09:00 PM'
    | '09:30 PM'
    | '12:00 PM'
    | '12:05 PM'
    | '12:20 PM';
type RoomNumber = string;

export interface ClassScheduleWithLabs {
    cell: [
        RowCount, // "1" -> Index of the row
        CourseCode, // "CSE471" -> Course Code
        CourseTitle, // "SYSTEM ANALYSIS AND DESIGN" -> Course Title
        SectionNumber, // "09" or "09-Closed" -> Section number or closed indicator
        Seats, // 0 -> Seats available
        Department, // "DEPARTMENT OF COMPUTER SCIENCE & ENGINEERING" -> Department
        Program, // "CSE" -> Program name
        string, // "To Be Appointed" -> Faculty name
        string, // "TBA" -> Faculty Initials
        string | undefined, // undefined or "07-09-2024" -> Exam date
        string | undefined, // undefined or "MW Day 1 (07-09-2024)(04:30 PM-06:30 PM)" -> Exam day and time
        string | undefined, // "03:30 PM-04:50 PM02:00 PM-03:20 PM" -> Class timing for Sunday or undefined
        string | undefined, // undefined -> Class timing for Monday or undefined
        string | undefined, // undefined -> Class timing for Tuesday or undefined
        string | undefined, // undefined -> Class timing for Wednesday or undefined
        string | undefined, // undefined -> Class timing for Thursday or undefined
        string | undefined, // undefined -> Class timing for Friday or undefined
        string | undefined, // undefined -> Class timing for Saturday or null
    ];
    class: string;
    id: string | null;
}

type CourseTitle = string;
type SectionNumber = string;
type Seats = number;
type Department = string;
type Program = string;
