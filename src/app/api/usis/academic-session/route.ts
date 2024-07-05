import UsisSDK from '@/services/usisSDK';
import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
	const usis = new UsisSDK();
	const data = await usis.getAcdemicSession('2024', 'Spring');
	return NextResponse.json(data);
}
