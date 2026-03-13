import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
    const isAdminRoute = request.nextUrl.pathname.startsWith("/admin");
    const isLoginPage = request.nextUrl.pathname === "/admin";

    if (isAdminRoute && !isLoginPage) {
        const token = request.cookies.get("token")?.value;
        if (token !== process.env.ADMIN_PASSWORD) {
            return NextResponse.redirect(new URL("/admin", request.url));
        }
    }

    return NextResponse.next()
}

export const config = {
    matcher: ["/admin/:path*", "/admin"],
}