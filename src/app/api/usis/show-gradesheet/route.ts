import UsisSDK from '@/services/usisSDK';

import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
	const usis = new UsisSDK();
	const data = await usis.showGradesheet();
	return NextResponse.json(data);
}
