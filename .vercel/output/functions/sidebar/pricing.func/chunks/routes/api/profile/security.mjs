import { d as defineEventHandler, b as db, L as security$1, r as readBody } from '../../../_/nitro.mjs';
import 'drizzle-orm/node-postgres';
import 'pg';
import 'drizzle-orm';
import 'zod';
import 'drizzle-orm/pg-core';
import 'crypto';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import '@iconify/utils';
import 'node:crypto';
import 'consola';
import 'node:url';
import 'ipx';
import 'node:fs';
import 'node:path';

const security = defineEventHandler(async (event) => {
  try {
    if (event.method === "GET") {
      const data = await db.select().from(security$1);
      if (data.length > 0) {
        return { success: true, data: data[0] };
      }
      return {
        success: true,
        data: {
          lastLogin: "Thu, Jan 1, 2026",
          ip: "192.168.100.99",
          apiStatus: true,
          twoFactorAuth: true,
          passwordChangedAt: "long time ago"
        }
      };
    }
    if (event.method === "PUT") {
      const body = await readBody(event);
      await db.update(security$1).set({
        apiStatus: body.apiStatus,
        twoFactorAuth: body.twoFactorAuth
      });
      return {
        success: true,
        message: "Security settings updated"
      };
    }
    return {
      success: false,
      message: "Method not allowed"
    };
  } catch (error) {
    console.error("\u274C Security API error:", error);
    return {
      success: false,
      message: "Internal server error"
    };
  }
});

export { security as default };
//# sourceMappingURL=security.mjs.map
