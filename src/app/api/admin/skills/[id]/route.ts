import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/src/lib/prisma';
import { isAuthenticated } from '@/src/lib/auth';

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    if (!isAuthenticated(req)) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const { id } = await params;
        const skill = await prisma.skill.findUnique({
            where: { id: Number(id) },
        });

        if (!skill) {
            return NextResponse.json({ error: "Skill not found" }, { status: 404 });
        }

        return NextResponse.json(skill);
    } catch (error) {
        console.error("[GET /api/admin/skills/[id]]", error);
        return NextResponse.json({ error: "Failed to fetch skill" }, { status: 500 });
    }
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    if (!isAuthenticated(req)) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const { id } = await params;
        const body = await req.json();
        const { name, imageUrl } = body;

        const existing = await prisma.skill.findUnique({ where: { id: Number(id) } });
        if (!existing) {
            return NextResponse.json({ error: "Skill not found" }, { status: 404 });
        }

        const updated = await prisma.skill.update({
            where: { id: Number(id) },
            data: {
                ...(name !== undefined && { name }),
                ...(imageUrl !== undefined && { imageUrl }),
            },
        });

        return NextResponse.json(updated);
    } catch (error) {
        console.error("[PUT /api/admin/skills/[id]]", error);
        return NextResponse.json({ error: "Failed to update skill" }, { status: 500 });
    }
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    if (!isAuthenticated(req)) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const { id } = await params;

        const existing = await prisma.skill.findUnique({ where: { id: Number(id) } });
        if (!existing) {
            return NextResponse.json({ error: "Skill not found" }, { status: 404 });
        }

        await prisma.skill.delete({ where: { id: Number(id) } });

        return NextResponse.json({ success: true, message: "Skill deleted" });
    } catch (error) {
        console.error("[DELETE /api/admin/skills/[id]]", error);
        return NextResponse.json({ error: "Failed to delete skill" }, { status: 500 });
    }
}