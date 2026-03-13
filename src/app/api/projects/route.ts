import { prisma } from '@/src/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET() {
    try {
        const projects = await prisma.projects.findMany({
            orderBy: { order: "asc" },
        });
        return NextResponse.json(projects);
    } catch (error) {
        console.error("[GET /api/projects]", error);
        return NextResponse.json({ error: "Failed to fetch projects" }, { status: 500 });
    }
}