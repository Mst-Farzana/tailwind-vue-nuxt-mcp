import { d as defineEventHandler, r as readBody, b as db, C as profileSettings } from '../../../_/nitro.mjs';
import { eq } from 'drizzle-orm';
import bcrypt from 'bcryptjs';
import { a as auth } from '../../../_/auth.mjs';
import 'drizzle-orm/node-postgres';
import 'pg';
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
import 'better-auth';
import 'better-auth/adapters/drizzle';
import 'better-auth/plugins';

const changePassword = defineEventHandler(async (event) => {
  var _a;
  if (event.method !== "POST") {
    return { success: false, message: "Method not allowed" };
  }
  try {
    const session = await auth.api.getSession({ headers: event.headers });
    if (!((_a = session == null ? void 0 : session.user) == null ? void 0 : _a.email)) {
      return { success: false, message: "Unauthorized" };
    }
    const body = await readBody(event);
    if (!body.currentPassword || !body.newPassword) {
      return { success: false, message: "Current and new password are required" };
    }
    if (body.newPassword !== body.confirmPassword) {
      return { success: false, message: "New password and confirm password do not match" };
    }
    if (body.newPassword.length < 8) {
      return { success: false, message: "New password must be at least 8 characters" };
    }
    const [user] = await db.select().from(profileSettings).where(eq(profileSettings.email, session.user.email));
    if (!user) {
      return { success: false, message: "User not found" };
    }
    const isMatch = await bcrypt.compare(body.currentPassword, user.password);
    if (!isMatch) {
      return { success: false, message: "Current password is incorrect" };
    }
    const hashedPassword = await bcrypt.hash(body.newPassword, 12);
    await db.update(profileSettings).set({ password: hashedPassword }).where(eq(profileSettings.email, session.user.email));
    return { success: true, message: "Password updated successfully" };
  } catch (err) {
    console.error("\u274C Change-password API error:", err);
    return { success: false, message: "Internal server error" };
  }
});

export { changePassword as default };
//# sourceMappingURL=change-password.mjs.map
