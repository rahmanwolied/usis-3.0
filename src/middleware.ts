import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(request: NextRequest) {
	const token = await getToken({ req: request });
	const url = request.nextUrl.pathname;
	if (
		token &&
		(url.startsWith('/login') ||
			url.startsWith('/signup') ||
			url.startsWith('/forgot-password') ||
			url.startsWith('/reset-password') ||
			url.startsWith('/verify-email'))
	) {
		return NextResponse.redirect(new URL(`/user/${token.username}/profile`, request.url));
	} else if (token === null && url.startsWith('/user')) {
		return NextResponse.redirect(new URL('/login', request.url));
	}
}

export const config = {
	matcher: ['/login', '/signup', '/user/:path*'],
};
