import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/src/lib/prisma';
import { isAuthenticated } from '@/src/lib/auth';

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    if (!isAuthenticated(req)) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    try {
        const { id } = await params;
        const project = await prisma.projects.findUnique({
            where: { id },
        });
        if (!project) {
            return NextResponse.json({ error: "Project not found" }, { status: 404 });
        }
        return NextResponse.json(project);
    } catch (error) {
        console.error("[GET /api/admin/projects/[id]]", error);
        return NextResponse.json({ error: "Failed to fetch project" }, { status: 500 });
    }
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    if (!isAuthenticated(req)) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    try {
        const { id } = await params;
        const body = await req.json();
        const {
            slug,
            title,
            description,
            background,
            method,
            result,
            images,
            organization,
            startDate,
            endDate,
            techStack,
            githubUrl,
            liveUrl,
            featured,
            order,
        } = body;

        const existing = await prisma.projects.findUnique({ where: { id } });
        if (!existing) {
            return NextResponse.json({ error: "Project not found" }, { status: 404 });
        }

        const updated = await prisma.projects.update({
            where: { id },
            data: {
                ...(slug !== undefined && { slug }),
                ...(title !== undefined && { title }),
                ...(description !== undefined && { description }),
                ...(background !== undefined && { background }),
                ...(method !== undefined && { method }),
                ...(result !== undefined && { result }),
                ...(images !== undefined && { images }),
                ...(organization !== undefined && { organization }),
                ...(startDate !== undefined && { startDate }),
                ...(endDate !== undefined && { endDate }),
                ...(techStack !== undefined && { techStack }),
                ...(githubUrl !== undefined && { githubUrl }),
                ...(liveUrl !== undefined && { liveUrl }),
                ...(featured !== undefined && { featured }),
                ...(order !== undefined && { order }),
            },
        });
        return NextResponse.json(updated);
    } catch (error) {
        console.error("[PUT /api/admin/projects/[id]]", error);
        return NextResponse.json({ error: "Failed to update project" }, { status: 500 });
    }
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    if (!isAuthenticated(req)) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    try {
        const { id } = await params;
        const existing = await prisma.projects.findUnique({ where: { id } });
        if (!existing) {
            return NextResponse.json({ error: "Project not found" }, { status: 404 });
        }
        await prisma.projects.delete({ where: { id } });
        return NextResponse.json({ success: true, message: "Project deleted" });
    } catch (error) {
        console.error("[DELETE /api/admin/projects/[id]]", error);
        return NextResponse.json({ error: "Failed to delete project" }, { status: 500 });
    }
}
