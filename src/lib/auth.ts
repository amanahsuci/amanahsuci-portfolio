import { NextRequest } from "next/server";

export function isAuthenticated(req: NextRequest): boolean {
    const token = req.cookies.get("admin_token")?.value;
    return token === process.env.ADMIN_PASSWORD;
}