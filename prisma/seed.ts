import { PrismaClient } from '../src/generated/prisma'
import { PrismaPg } from '@prisma/adapter-pg'

const adapter = new PrismaPg({ connectionString: process.env.DIRECT_URL! })
const prisma = new PrismaClient({ adapter })

async function main() {
    console.log("✅ Seed succeed! Input data trhough admin panel.")
}

main()
    .catch(console.error)
    .finally(() => prisma.$disconnect())