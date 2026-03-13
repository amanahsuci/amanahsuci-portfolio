import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/src/lib/prisma';
import { isAuthenticated } from '@/src/lib/auth';

export async function GET(req: NextRequest) {
  if (!isAuthenticated(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const skills = await prisma.skill.findMany({
      orderBy: { id: "asc" },
    });
    return NextResponse.json(skills);
  } catch (error) {
    console.error("[GET /api/admin/skills]", error);
    return NextResponse.json({ error: "Failed to fetch skills" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  if (!isAuthenticated(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { name, imageUrl } = body;

    if (!name) {
      return NextResponse.json({ error: "Name is required" }, { status: 400 });
    }

    const skill = await prisma.skill.create({
      data: {
        name,
        imageUrl: imageUrl ?? null,
      },
    });

    return NextResponse.json(skill, { status: 201 });
  } catch (error) {
    console.error("[POST /api/admin/skills]", error);
    return NextResponse.json({ error: "Failed to create skill" }, { status: 500 });
  }
}