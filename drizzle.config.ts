import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  schema: './server/db/schemas/index.ts',
  out: './server/db/migrations',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
});
