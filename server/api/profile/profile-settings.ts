import bcrypt from 'bcryptjs';
import { eq } from 'drizzle-orm';
import { defineEventHandler, getMethod, getRequestIP, readBody } from 'h3';
import { db } from '~/server/db';
import { profileSettings } from '~/server/db/schemas/index';

const DEFAULT_AVATAR = 'https://picsum.photos/seed/default/200/200';

export default defineEventHandler(async event => {
  try {
    const method = getMethod(event);

    /* ================= GET ================= */
    if (method === 'GET') {
      const [profile] = await db.select().from(profileSettings).limit(1);

      if (!profile) {
        return {
          success: true,
          data: {
            avatar: DEFAULT_AVATAR,
            name: '',
            email: '',
            notificationsEnabled: false,
            isVerified: false,
            lastLoginAt: null,
            lastLoginIp: null,
          },
        };
      }

      return {
        success: true,
        data: {
          avatar: profile.avatar,
          name: profile.name,
          email: profile.email,
          notificationsEnabled: profile.notificationsEnabled,
          isVerified: profile.isVerified,
          lastLoginAt: profile.lastLoginAt,
          lastLoginIp: profile.lastLoginIp,
        },
      };
    }

    /* ================= POST ================= */
    if (method === 'POST') {
      const body = await readBody<{
        avatar?: string;
        name: string;
        email: string;
        password?: string;
        notificationsEnabled?: boolean;
      }>(event);

      if (!body.name || !body.email) {
        return { success: false, message: 'Name and Email are required' };
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(body.email)) {
        return { success: false, message: 'Invalid email format' };
      }

      const [existing] = await db.select().from(profileSettings).limit(1);

      /* ===== CREATE ===== */
      if (!existing) {
        if (!body.password || body.password.length < 6) {
          return { success: false, message: 'Password must be at least 6 characters' };
        }

        const passwordHash = await bcrypt.hash(body.password, 10);

        const [created] = await db
          .insert(profileSettings)
          .values({
            avatar: body.avatar ?? DEFAULT_AVATAR,
            name: body.name,
            email: body.email,
            password: passwordHash,
            notificationsEnabled: body.notificationsEnabled ?? false,
            isVerified: true,
            lastLoginAt: new Date(),
            lastLoginIp: getRequestIP(event) ?? null,
          })
          .returning();

        return { success: true, data: created };
      }

      /* ===== UPDATE ===== */
      let passwordHash = existing.password;

      if (typeof body.password === 'string' && body.password.length > 0) {
        if (body.password.length < 6) {
          return { success: false, message: 'Password must be at least 6 characters' };
        }
        passwordHash = await bcrypt.hash(body.password, 10);
      }

      const [updated] = await db
        .update(profileSettings)
        .set({
          avatar: body.avatar ?? existing.avatar,
          name: body.name,
          email: body.email,
          notificationsEnabled: body.notificationsEnabled ?? existing.notificationsEnabled,
          password: passwordHash,
          lastLoginAt: new Date(),
          lastLoginIp: getRequestIP(event) ?? existing.lastLoginIp,
        })
        .where(eq(profileSettings.id, existing.id))
        .returning();

      return { success: true, data: updated };
    }

    return { success: false, message: 'Method not allowed' };
  } catch (err) {
    console.error('❌ Profile API error:', err);
    return { success: false, message: 'Internal server error' };
  }
});
