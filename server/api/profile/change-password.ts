// server/api/dashboard/change-password.ts
import { defineEventHandler, readBody } from 'h3';
import { eq } from 'drizzle-orm';
import bcrypt from 'bcryptjs';
import { auth } from '~/server/auth';
import { db } from '~/server/db';
import { profileSettings } from '~/server/db/schemas';

export default defineEventHandler(async event => {
  // Only allow POST requests
  if (event.method !== 'POST') {
    return { success: false, message: 'Method not allowed' };
  }

  try {
    // Get authenticated session — never trust a client-supplied ID
    const session = await auth.api.getSession({ headers: event.headers });
    if (!session?.user?.email) {
      return { success: false, message: 'Unauthorized' };
    }

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

    if (body.newPassword.length < 8) {
      return { success: false, message: 'New password must be at least 8 characters' };
    }

    // Fetch user by email from session (not by hardcoded id)
    const [user] = await db
      .select()
      .from(profileSettings)
      .where(eq(profileSettings.email, session.user.email));

    if (!user) {
      return { success: false, message: 'User not found' };
    }

    // Compare current password
    const isMatch = await bcrypt.compare(body.currentPassword, user.password);
    if (!isMatch) {
      return { success: false, message: 'Current password is incorrect' };
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(body.newPassword, 12);

    // Update password in DB
    await db
      .update(profileSettings)
      .set({ password: hashedPassword })
      .where(eq(profileSettings.email, session.user.email));

    return { success: true, message: 'Password updated successfully' };
  } catch (err) {
    console.error('❌ Change-password API error:', err);
    return { success: false, message: 'Internal server error' };
  }
});
