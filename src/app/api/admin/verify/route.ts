import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
    const token = req.cookies.get('admin_token');
    
    if (!token || token.value !== process.env.ADMIN_PASSWORD) {
        return NextResponse.json({ authenticated: false }, { status: 401 });
    }
    
    return NextResponse.json({ authenticated: true });
}