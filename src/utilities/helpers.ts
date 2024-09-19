import { Times } from '@/enums';

import { UsisScheduleResponseType } from '@/types/usisReponse.type';

// Just to get all the unique start and end times for writing the types
function sortTimes(response: UsisScheduleResponseType): void {
    const AMtimes: string[] = [];
    const PMtimes: string[] = [];

    const startTimes: string[] = [];
    const endTimes: string[] = [];

    const timePairs = response.rows.forEach((row) => {
        let [
            rowCount,
            id,
            courseCode,
            facultyInitial,
            section,
            courseDay,
            startTime,
            endTime,
            roomNumber,
        ] = row.cell;

        let stTime = startTime.slice(0, 5);
        let enTime = endTime.slice(0, 5);

        if (!startTimes.includes(startTime)) startTimes.push(startTime);
        if (!endTimes.includes(endTime)) endTimes.push(endTime);

        if (startTime.includes('AM') && !AMtimes.includes(stTime))
            AMtimes.push(stTime);
        if (endTime.includes('AM') && !AMtimes.includes(enTime))
            AMtimes.push(enTime);

        if (startTime.includes('PM') && !PMtimes.includes(stTime))
            PMtimes.push(stTime);
        if (endTime.includes('PM') && !PMtimes.includes(enTime))
            PMtimes.push(enTime);
    });
    console.log(
        'startTimes Sorted',
        startTimes.sort(
            (a, b) =>
                Number(a.replace(':', '').replace('AM', '').replace('PM', '')) -
                Number(b.replace(':', '').replace('AM', '').replace('PM', '')),
        ),
    );
    console.log(
        'endTimes Sorted',
        endTimes.sort(
            (a, b) =>
                Number(a.replace(':', '').replace('AM', '').replace('PM', '')) -
                Number(b.replace(':', '').replace('AM', '').replace('PM', '')),
        ),
    );
}

export function _toNumber(section: string) {
    if (section.startsWith('S')) {
        section = section.slice(1);
    }
    return Number(section.slice(0, 2));
}

export function extractAndCombineTimes(timeString: string): {
    startTime: string;
    endTime: string;
} {
    const timePattern = /(\d{1,2}:\d{2} (?:AM|PM))-(\d{1,2}:\d{2} (?:AM|PM))/g;
    const startTimes: string[] = [];
    const endTimes: string[] = [];

    let match;
    while ((match = timePattern.exec(timeString)) !== null) {
        startTimes.push(match[1]);
        endTimes.push(match[2]);
    }

    if (startTimes.length > 1 || endTimes.length > 1) {
        const startTime = Math.min(
            ...startTimes.map((time) => Times.indexOf(time)),
        );
        const endTime = Math.max(
            ...endTimes.map((time) => Times.indexOf(time)),
        );
        return { startTime: Times[startTime], endTime: Times[endTime] };
    }

    return { startTime: startTimes[0], endTime: endTimes[0] };
}
