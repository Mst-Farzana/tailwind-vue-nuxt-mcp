// server/api/profile/avatar.ts
import { useRuntimeConfig } from '#imports';
import { drizzle } from 'drizzle-orm/node-postgres';
import { createError, defineEventHandler } from 'h3';
import { Pool } from 'pg';
import { profile } from '~/server/db/schemas/index';

// ✅ Import eq from drizzle-orm
import { eq } from 'drizzle-orm';

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

export default defineEventHandler(async event => {
  try {
    const db = await useDb();

    const userId = 1;

    const formData = await readFormData(event);
    const file = formData.get('avatar') as File | null;

    if (!file) {
      throw createError({ statusCode: 400, message: 'No file uploaded' });
    }

    // Validate file type
    if (!file.type.startsWith('image/')) {
      throw createError({ statusCode: 400, message: 'Only image files are allowed' });
    }

    // Validate file size (5MB max)
    if (file.size > 5 * 1024 * 1024) {
      throw createError({ statusCode: 400, message: 'File size must be less than 5MB' });
    }

    // Generate unique filename
    const extension = file.name.split('.').pop();
    const fileName = `${userId}_${Date.now()}.${extension}`;

    // In real app, save to cloud storage or public folder
    // For demo, we'll just generate a URL based on the filename

    const avatarUrl = `/uploads/${fileName}`;

    // Update database
    await db.update(profile).set({ avatar: avatarUrl }).where(eq(profile.id, userId));

    return {
      success: true,
      avatarUrl,
      message: 'Avatar updated successfully',
    };
  } catch (error) {
    console.error('Upload error:', error);
    throw createError({ statusCode: 500, message: 'Failed to upload avatar' });
  }
});
