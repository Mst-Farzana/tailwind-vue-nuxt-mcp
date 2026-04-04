// server/api/profile/profile.ts
import { useRuntimeConfig } from '#imports';
import { drizzle } from 'drizzle-orm/node-postgres';
import { createError, defineEventHandler } from 'h3';
import { Pool } from 'pg';

const globalForDb = globalThis as unknown as {
  db?: ReturnType<typeof drizzle>;
  pool?: Pool;
};

async function useDb() {
  if (!globalForDb.db) {
    const config = useRuntimeConfig();
    const connectionString = config.DATABASE_URL;

    if (!connectionString) {
      throw new Error('DATABASE_URL is missing');
    }

    globalForDb.pool = new Pool({
      connectionString,
      ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
    });

    await globalForDb.pool.query('SELECT 1');
    globalForDb.db = drizzle(globalForDb.pool);
  }

  return globalForDb.db;
}

export default defineEventHandler(async _event => {
  try {
    const db = await useDb();

    // Fetch profile data (mock for now)
    const mockProfile = {
      id: 1,
      name: 'John Doe',
      role: 'Developer',
      company: 'Kiehn-Green',
      city: 'Emelyside',
      avatar: 'https://picsum.photos/seed/johndoe/200/200', // ✅ No extra spaces
      likes: 499,
      posts: 128,
      media: 256,
      links: 384,
      files: 512,
    };

    // In real app, fetch from DB:
    // const [profileData] = await db.select().from(profile).where(eq(profile.id, 1));

    return {
      success: true,
      data: mockProfile,
    };
  } catch (error) {
    console.error('Database error:', error);
    throw createError({ statusCode: 500, message: 'Operation failed' });
  }
});
