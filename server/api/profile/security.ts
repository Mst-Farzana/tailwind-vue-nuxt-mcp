import { defineEventHandler, readBody } from 'h3';
import { db } from '~/server/db';
import { security } from '~/server/db/schemas';

export default defineEventHandler(async event => {
  try {
    // ---------------- GET ----------------
    if (event.method === 'GET') {
      const data = await db.select().from(security);

      if (data.length > 0) {
        return { success: true, data: data[0] };
      }

      return {
        success: true,
        data: {
          lastLogin: 'Thu, Jan 1, 2026',
          ip: '192.168.100.99',
          apiStatus: true,
          twoFactorAuth: true,
          passwordChangedAt: 'long time ago',
        },
      };
    }

    // ---------------- PUT ----------------
    if (event.method === 'PUT') {
      const body = await readBody(event);

      await db.update(security).set({
        apiStatus: body.apiStatus,
        twoFactorAuth: body.twoFactorAuth,
      });

      return {
        success: true,
        message: 'Security settings updated',
      };
    }

    return {
      success: false,
      message: 'Method not allowed',
    };
  } catch (error) {
    console.error('❌ Security API error:', error);
    return {
      success: false,
      message: 'Internal server error',
    };
  }
});
