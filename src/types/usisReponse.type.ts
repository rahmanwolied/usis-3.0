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
    section: number;
    days: [string, string?];
    startTime: [string, string?];
    endTime: [string, string?];
    roomNumber: RoomNumber;
    facultyInitial: FacultyInitial;
    facultyName?: string;
    slot?: number;
}

type Username = string;
type RowCount = string | null;
type SectionID = string | number;
type CourseCode = string | null;
type FacultyInitial = string | null;
type CourseSection = string | number;
type CourseDay = string | null;
type StartTime = string | null;
type EndTime = string | null;
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
