import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/src/lib/prisma';  
import { isAuthenticated } from '@/src/lib/auth';

export async function GET(req: NextRequest) {
    if (!isAuthenticated(req)) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const projects = await prisma.projects.findMany({
            orderBy: [{ order: "asc" }, { createdAt: "desc" }],
        });
        return NextResponse.json(projects);
    } catch (error) {
        console.error("[GET /api/admin/projects]", error);
        return NextResponse.json({ error: "Failed to fetch projects" }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    if (!isAuthenticated(req)) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const body = await req.json();
        const { title, description, techStack, imageUrl, githubUrl, liveUrl, featured, order } = body;

        if (!title || !description) {
        return NextResponse.json({ error: "Title and description are required" }, { status: 400 });
        }

        const project = await prisma.projects.create({
        data: {
            title,
            description,
            techStack: techStack ?? [],
            imageUrl: imageUrl ?? null,
            githubUrl: githubUrl ?? null,
            liveUrl: liveUrl ?? null,
            featured: featured ?? false,
            order: order ?? 0,
        },
    });

    return NextResponse.json(project, { status: 201 });
        } catch (error) {
            console.error("[POST /api/admin/projects]", error);
            return NextResponse.json({ error: "Failed to create project" }, { status: 500 });
        }
}