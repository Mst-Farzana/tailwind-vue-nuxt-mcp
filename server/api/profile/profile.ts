// server/api/profile/profile.ts
import { createError, defineEventHandler } from 'h3';
import { db } from '~/server/db';
import { profile } from '~/server/db/schemas/index';

export default defineEventHandler(async _event => {
  try {
    const rows = await db.select().from(profile).limit(1);
    const profileData = rows[0];

    if (!profileData) {
      throw createError({ statusCode: 404, message: 'Profile not found' });
    }

    return {
      success: true,
      data: profileData,
    };
  } catch (error) {
    console.error('Database error:', error);
    throw createError({ statusCode: 500, message: 'Operation failed' });
  }
});
