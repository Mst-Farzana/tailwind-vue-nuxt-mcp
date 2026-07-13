import { d as defineEventHandler, b as db, J as profile$1, c as createError } from '../../../_/nitro.mjs';
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

const profile = defineEventHandler(async (_event) => {
  try {
    const rows = await db.select().from(profile$1).limit(1);
    const profileData = rows[0];
    if (!profileData) {
      throw createError({ statusCode: 404, message: "Profile not found" });
    }
    return {
      success: true,
      data: profileData
    };
  } catch (error) {
    console.error("Database error:", error);
    throw createError({ statusCode: 500, message: "Operation failed" });
  }
});

export { profile as default };
//# sourceMappingURL=profile.mjs.map
