import { NextRequest, NextResponse } from 'next/server';
import UsisSDK from '@/services/usis-sdk';

export async function GET(request: NextRequest) {
    const usis = new UsisSDK();
    const data = await usis.getSeatStatus();
    return NextResponse.json(data);
}
