// server/api/dashboard/change-password.ts
import { defineEventHandler, readBody } from 'h3';
import { eq } from 'drizzle-orm';
import bcrypt from 'bcryptjs';
import { db } from '~/server/db';
import { profileSettings } from '~/server/db/schemas';

export default defineEventHandler(async event => {
  // Only allow POST requests
  if (event.method !== 'POST') {
    return { success: false, message: 'Method not allowed' };
  }

  try {
    const body = (await readBody(event)) as {
      currentPassword: string;
      newPassword: string;
      confirmPassword?: string;
    };

    // Validate input
    if (!body.currentPassword || !body.newPassword) {
      return { success: false, message: 'Current and new password are required' };
    }

    if (body.newPassword !== body.confirmPassword) {
      return { success: false, message: 'New password and confirm password do not match' };
    }

    // Fetch user (assuming single user with id = 1)
    const [user] = await db.select().from(profileSettings).where(eq(profileSettings.id, 1));

    if (!user) {
      return { success: false, message: 'User not found' };
    }

    // Compare current password
    const isMatch = await bcrypt.compare(body.currentPassword, user.password);
    if (!isMatch) {
      return { success: false, message: 'Current password is incorrect' };
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(body.newPassword, 10);

    // Update password in DB
    await db
      .update(profileSettings)
      .set({ password: hashedPassword })
      .where(eq(profileSettings.id, 1));

    return { success: true, message: 'Password updated successfully' };
  } catch (err) {
    console.error('❌ Change-password API error:', err);
    return { success: false, message: 'Internal server error' };
  }
});
