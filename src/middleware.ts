import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    if (pathname.startsWith('/admin') && pathname !== '/admin') {
        const allCookies = request.cookies.getAll();
        console.log('All cookies in middleware:', JSON.stringify(allCookies));
        
        const auth = request.cookies.get('auth');
        console.log('Auth cookie:', auth);
        
        if (!auth) {
            return NextResponse.redirect(new URL('/admin', request.url));
        }
    }

    const response = NextResponse.next();
    response.headers.set("x-pathname", pathname);
    return response;
}

export const config = {
    matcher: ["/((?!_next|favicon.ico).*)"],
};