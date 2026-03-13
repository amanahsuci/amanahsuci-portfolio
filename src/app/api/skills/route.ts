import { NextResponse } from 'next/server';
import { PrismaClient } from '@/src/generated/prisma';

const prisma = new PrismaClient();

export async function GET() {
    try {
        const skills = await prisma.skill.findMany({
            orderBy: { id: "asc" },
        });
        return NextResponse.json(skills);
    } catch (error) {
        console.error("[GET /api/skills]", error);
        return NextResponse.json({ error: "Failed to fetch skills" }, { status: 500 });
    }
}