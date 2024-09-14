import { NextRequest, NextResponse } from 'next/server';
import UserModel from '@/model/User';

import { ApiResponse } from '@/types/ApiResponse.type';

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const queryParams = {
        username: searchParams.get('username'),
    };

    const { username } = queryParams;

    const user = await UserModel.findOne({ username });

    if (!user) {
        return NextResponse.json<ApiResponse<null>>({ message: 'User not found', status: 'error' });
    }

    return NextResponse.json({ isUsisConnected: user.isUsisConnected });
}
