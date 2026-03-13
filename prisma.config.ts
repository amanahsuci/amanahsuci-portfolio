import 'dotenv/config'
import { defineConfig } from 'prisma/config'

export default defineConfig({
  schema: 'prisma/schema.prisma',
  migrations: {
    path: 'prisma/migrations',
    seed: 'tsx prisma/seed.ts',
  },
  datasource: {
    url: "postgresql://postgres.yexsxobjtrjvmiuxxwwk:MznxbcV0192@aws-1-ap-southeast-1.pooler.supabase.com:5432/postgres",
  },
})