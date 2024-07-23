import { Days, Times } from '@/enums';

export interface USISResponseType {
    page: number;
    total: number;
    records: number;
}
export interface UsisScheduleResponseType extends USISResponseType {
    rows: UsisScheduleType[];
}
export interface UsisScheduleType {
    cell: [RowCount, SectionID, CourseCode, FacultyInitial, CourseSection, CourseDay, StartTime, EndTime, RoomNumber];
    class: string;
    id: SectionID;
}
export interface CourseInfoType {
    code: CourseCode;
    tarc: boolean;
    title?: string;
    rating?: number;
    reviews?: CourseReviewType[];
    sections: SectionInfo[];
}
export interface CourseReviewType {
    reviewer: Username;
    message: string;
    hearts: number;
}
export interface SectionInfo {
    id: SectionID;
    section: string;
    days: Days[];
    startTime: Times[];
    endTime: Times[];
    roomNumber: RoomNumber;
    facultyInitial: FacultyInitial;
    facultyName?: string;
    closed: boolean;
}

type Username = string;
type RowCount = string;
type SectionID = string | number;
type CourseCode = string;
type FacultyInitial = string;
type CourseSection = string;
type CourseDay = 'Saturday' | 'Sunday' | 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday';
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
type RoomNumber = string | null;

/*
const scheduleData = {
    page: 1,
    total: 1,
    records: 3421,
    rows: [
        {
            cell: [
                '1',
                '2305399',
                'ACT201',
                'TBA',
                '07',
                'Monday',
                '05:00 PM',
                '06:20 PM',
                'UB20802',
            ],
            class: 'com.docu.common.GridEntity',
            id: 2305399,
        },
        {
            cell: [
                '2',
                '2305396',
                'ACT201',
                'AFZ',
                '04',
                'Tuesday',
                '02:00 PM',
                '03:20 PM',
                'UB20702',
            ],
            class: 'com.docu.common.GridEntity',
            id: 2305396,
        },
    ],
};

*/
