import { prisma } from '@/src/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const project = await prisma.projects.findUnique({
      where: { slug: params.slug },
    });

    if (!project) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    return NextResponse.json(project);
  } catch (error) {
    console.error("[GET /api/projects/:slug]", error);
    return NextResponse.json({ error: "Failed to fetch project" }, { status: 500 });
  }
}
