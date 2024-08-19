import { NextRequest, NextResponse } from 'next/server';
import UsisSDK from '@/services/usis-sdk';

export async function GET() {
    const usis = new UsisSDK();
    const data = await usis.getAcdemicSession('2024', 'Spring');
    return NextResponse.json(data);
}
