'use client';

import React from 'react';

type ScheduleData = {
    range: string;
    majorDimension: string;
    values: (string[] | string)[][];
};

const scheduleData: ScheduleData = {
    range: 'TAW!A1:L17',
    majorDimension: 'ROWS',
    values: [
        [
            "NOTE: Please drag and select cells A2 to J17 (the red line area) to print / export to PDF On the printing menu (first option), select 'Selected cells'. Scroll down to Row 19 and onwards to add your consultation hours",
        ],
        ['', 'BRAC University'],
        ['', 'Consultation Hour Planner'],
        ['', '', 'Faculty:', 'Mr. Md. Tawhid Anwar', '', 'Initial', 'TAW'],
        ['', '', 'Programme:', 'CSE', '', 'Semester:', 'Summer 2024'],
        ['', '', 'Email:', 'tawhid.anwar@bracu.ac.bd', '', 'Room:', '4G03'],
        [],
        [
            '',
            '8:00 AM',
            '9:30 AM',
            '11:00 AM',
            '12:30 PM',
            '2:00 PM',
            '3:30 PM',
            '5:00 PM',
            '6:00 PM',
            '7:30 PM',
            '',
            '#REF!',
        ],
        ['Saturday', '', '', '', '', '', '', '', '', '', '0'],
        [
            'Sunday',
            '',
            'Consultation',
            'CSE111-05 10A-09C',
            'CSE111-06 10A-09C',
            '',
            '',
            '',
            '',
            '',
            '2',
        ],
        [
            'Monday',
            '',
            'Consultation',
            'CSE110-06 10A-09C',
            'CSE111-07 10A-09C',
            '',
            '',
            '',
            '',
            '',
            '2',
        ],
        [
            'Tuesday',
            '',
            'Consultation',
            'CSE111-05 10A-09C',
            'CSE111-06 10A-09C',
            '',
            '',
            '',
            '',
            '',
            '2',
        ],
        [
            'Wednesday',
            '',
            '',
            'CSE110-06 10A-09C',
            'CSE111-07 10A-09C',
            'CSE111-05 (LAB) RHS,TAW 12F-31L',
            'CSE111-05 (LAB) RHS,TAW 12F-31L',
            '',
            '',
            '',
            '4',
        ],
        [
            'Thursday',
            '',
            'Consultation',
            'CSE111-07 (LAB) TAW,ADU 12F-31L',
            'CSE111-07 (LAB) TAW,ADU 12F-31L',
            '',
            '',
            '',
            '',
            '',
            '2',
        ],
        ['Friday', '', '', '', '', '', '', '', '', '', '0'],
        ['**Each slot is of 1 hour 20 minutes '],
        ['**You can edit this footnote'],
    ],
};

const values = scheduleData['values'];
const fullName = values[3][3];
const room = values[5][6];
const email = values[5][3];

const times = values[7];
console.log('times', times);
const consultationDays = values.filter((item) => {
    const consultation = item.find((string) => string === 'Consultation');
    if (consultation) return true;
});

type Consultation = {
    day: string;
    time: string[];
}[];

console.log(consultationDays);

const consultation: Consultation = consultationDays.map((item) => {
    const day = item[0];
    const time: string[] = [];
    item.forEach((string, index) => {
        if (string === 'Consultation') time.push(times[index] as string);
    });

    return {
        day: day,
        time: time,
    };
});

console.log(consultation);

const ComponentName = () => {
    return <div></div>;
};

export default ComponentName;
