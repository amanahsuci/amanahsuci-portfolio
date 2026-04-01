-- CreateTable
CREATE TABLE IF NOT EXISTS "Projects" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "background" TEXT,
    "method" TEXT,
    "result" TEXT,
    "images" TEXT[],
    "organization" TEXT,
    "startDate" TEXT,
    "endDate" TEXT,
    "techStack" TEXT[],
    "githubUrl" TEXT,
    "liveUrl" TEXT,
    "featured" BOOLEAN NOT NULL DEFAULT false,
    "order" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Projects_pkey" PRIMARY KEY ("id")
);
-- CreateIndex
CREATE UNIQUE INDEX IF NOT EXISTS "Projects_slug_key" ON "Projects"("slug");
-- CreateTable
CREATE TABLE IF NOT EXISTS "Skill" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "imageUrl" TEXT,
    CONSTRAINT "Skill_pkey" PRIMARY KEY ("id")
);
