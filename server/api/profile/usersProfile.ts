import { eq } from 'drizzle-orm';
import { defineEventHandler, getMethod, readBody } from 'h3';
import { db } from '~/server/db';
import { usersprofile } from '~/server/db/schemas';

const MAX_AMOUNT = 1000;
const DEFAULT_PASSWORD_HASH = '$2a$10$N9qo8uLOickgxKfFOC9FZuBjzHiUHxR3Wkm2QKm7VJlYbT7wGqKHO';

export default defineEventHandler(async event => {
  const method = getMethod(event);

  // ================= GET =================
  if (method === 'GET') {
    try {
      const userList = await db.select().from(usersprofile);

      const data = userList.map(user => ({
        ...user,
        percentage: Math.min(100, Math.round((user.amount / MAX_AMOUNT) * 100)),
      }));

      return { success: true, data };
    } catch (error) {
      console.warn('❌ GET users error - database unavailable, returning empty array:', error);
      // Return empty array if database is unavailable (e.g., during static generation)
      return { success: false, data: [], message: 'Failed to fetch users' };
    }
  }

  // ================= POST =================
  if (method === 'POST') {
    try {
      const body = await readBody<{
        id?: number;
        name: string;
        email: string;
        avatar?: string;
        amount: number;
      }>(event);

      const { id, name, email, avatar, amount } = body;

      if (!name || !email || amount == null) {
        return { success: false, message: 'Name, email, and amount are required' };
      }

      if (amount < 0 || amount > MAX_AMOUNT) {
        return {
          success: false,
          message: `Amount must be between 0 and ${MAX_AMOUNT}`,
        };
      }

      let result;

      if (id) {
        // Update existing user
        const [updated] = await db
          .update(usersprofile)
          .set({
            name,
            email,
            avatar: avatar || null,
            amount,
            lastLoginAt: new Date().toISOString(),
          })
          .where(eq(usersprofile.id, id))
          .returning();

        if (!updated) return { success: false, message: 'User not found' };

        result = updated;
      } else {
        // Create new user
        const [created] = await db
          .insert(usersprofile)
          .values({
            name,
            email,
            avatar: avatar || null,
            amount,
            password: DEFAULT_PASSWORD_HASH,
            verified: false,
            isVerified: false,
            createdAt: new Date().toISOString(),
          })
          .returning();

        result = created;
      }

      return {
        success: true,
        message: id ? 'User updated' : 'User created',
        data: {
          ...result,
          percentage: Math.min(100, Math.round(((result?.amount ?? 0) / MAX_AMOUNT) * 100)),
        },
      };
    } catch (error) {
      console.error('❌ POST user error:', error);
      return { success: false, message: 'Failed to save user' };
    }
  }

  return { success: false, message: 'Method not allowed' };
});
