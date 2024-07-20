import { NextRequest, NextResponse } from 'next/server';
import { scheduleData } from '@/data/schedule-data';
import UsisSDK from '@/services/usisSDK';
import { formatClassScheduleResponse } from '@/utilities/format-response';

export async function GET() {
    // const usis = new UsisSDK();
    // const data = await usis.getClassSchedule();
    const data = scheduleData;
    const res = formatClassScheduleResponse(data);
    return NextResponse.json(res);
}
