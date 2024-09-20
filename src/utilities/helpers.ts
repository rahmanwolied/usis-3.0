import { Times } from '@/enums';

// Just to get all the unique start and end times for writing the types
function sortTimes(response: any): void {
    const AMtimes: string[] = [];
    const PMtimes: string[] = [];

    const startTimes: string[] = [];
    const endTimes: string[] = [];

    const timePairs = response.rows.forEach((row: any) => {
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

export function extractAndCombineTimes(timeString: string) {
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
        return {
            startTime: Times[startTime],
            endTime: Times[endTime],
            lab: true,
        };
    }

    return { startTime: startTimes[0], endTime: endTimes[0], lab: false };
}

export function extractDayTimeRoom(scheduleString: string) {
    const regex =
        /([A-Za-z]{2})\((\d{2}:\d{2} [APM]{2})-(\d{2}:\d{2} [APM]{2})-([A-Za-z0-9-]+)\)/g;
    let matches = [];
    let match;
    const fullDay = {
        Sa: 'Saturday',
        Su: 'Sunday',
        Mo: 'Monday',
        Tu: 'Tuesday',
        We: 'Wednesday',
        Th: 'Thursday',
        Fr: 'Friday',
    };
    while ((match = regex.exec(scheduleString)) !== null) {
        matches.push({
            day: fullDay[match[1] as keyof typeof fullDay],
            startTime: match[2],
            endTime: match[3],
            room: match[4],
        });
    }

    const theory = matches
        .filter((match) => isTheory(match.room))
        .reduce(
            (acc, curr) => {
                acc.days.push(curr.day);
                acc.startTimes.push(curr.startTime);
                acc.endTimes.push(curr.endTime);
                acc.roomNumber = curr.room;
                return acc;
            },
            {
                days: [] as string[],
                startTimes: [] as string[],
                endTimes: [] as string[],
                roomNumber: '',
            },
        );

    if (matches.filter((match) => isLab(match.room)).length === 0)
        return { theory, labs: undefined };

    const labs = matches
        .filter((match) => isLab(match.room))
        .reduce(
            (acc, curr) => {
                acc.days.push(curr.day);
                acc.startTimes.push(curr.startTime);
                acc.endTimes.push(curr.endTime);
                acc.roomNumber = curr.room;
                return acc;
            },
            {
                days: [] as string[],
                startTimes: [] as string[],
                endTimes: [] as string[],
                roomNumber: '',
            },
        );

    if (labs.days.every((val, i, arr) => val === arr[0])) {
        const startTime = Math.min(
            ...labs.startTimes.map((time) => Times.indexOf(time)),
        );
        const endTime = Math.max(
            ...labs.endTimes.map((time) => Times.indexOf(time)),
        );
        labs.days = [labs.days[0]];
        labs.startTimes = [Times[startTime]];
        labs.endTimes = [Times[endTime]];
        labs.roomNumber = labs.roomNumber;
    }

    return { labs, theory };
}

export function extractLabRoomNumber(scheduleString: string) {
    const regex =
        /([A-Za-z]{2})\((\d{2}:\d{2} [APM]{2})-(\d{2}:\d{2} [APM]{2})-([A-Za-z0-9-]+)\)/g;
    let rooms = [];
    let match;

    while ((match = regex.exec(scheduleString)) !== null) {
        rooms.push(match[4]);
    }
    if (rooms.filter(isLab).length === 0) return undefined;
    return rooms.filter(isLab)[0];
}

export function isLab(room: string) {
    return room.slice(-1) === 'L' && room.slice(0, 2) !== 'UB';
}

export function isTheory(room: string) {
    return room.slice(-1) === 'C' || room.slice(0, 2) === 'UB';
}
