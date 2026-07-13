import bcrypt from 'bcryptjs';
import { eq } from 'drizzle-orm';
import { d as defineEventHandler, o as getMethod, b as db, C as profileSettings$1, r as readBody, I as getRequestIP } from '../../../_/nitro.mjs';
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

const DEFAULT_AVATAR = "https://picsum.photos/seed/default/200/200";
const profileSettings = defineEventHandler(async (event) => {
  var _a, _b, _c, _d, _e, _f;
  try {
    const method = getMethod(event);
    if (method === "GET") {
      const [profile] = await db.select().from(profileSettings$1).limit(1);
      if (!profile) {
        return {
          success: true,
          data: {
            avatar: DEFAULT_AVATAR,
            name: "",
            email: "",
            notificationsEnabled: false,
            isVerified: false,
            lastLoginAt: null,
            lastLoginIp: null
          }
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
          lastLoginIp: profile.lastLoginIp
        }
      };
    }
    if (method === "POST") {
      const body = await readBody(event);
      if (!body.name || !body.email) {
        return { success: false, message: "Name and Email are required" };
      }
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(body.email)) {
        return { success: false, message: "Invalid email format" };
      }
      const [existing] = await db.select().from(profileSettings$1).limit(1);
      if (!existing) {
        if (!body.password || body.password.length < 6) {
          return { success: false, message: "Password must be at least 6 characters" };
        }
        const passwordHash2 = await bcrypt.hash(body.password, 10);
        const [created] = await db.insert(profileSettings$1).values({
          avatar: (_a = body.avatar) != null ? _a : DEFAULT_AVATAR,
          name: body.name,
          email: body.email,
          password: passwordHash2,
          notificationsEnabled: (_b = body.notificationsEnabled) != null ? _b : false,
          isVerified: true,
          lastLoginAt: /* @__PURE__ */ new Date(),
          lastLoginIp: (_c = getRequestIP(event)) != null ? _c : null
        }).returning();
        return { success: true, data: created };
      }
      let passwordHash = existing.password;
      if (typeof body.password === "string" && body.password.length > 0) {
        if (body.password.length < 6) {
          return { success: false, message: "Password must be at least 6 characters" };
        }
        passwordHash = await bcrypt.hash(body.password, 10);
      }
      const [updated] = await db.update(profileSettings$1).set({
        avatar: (_d = body.avatar) != null ? _d : existing.avatar,
        name: body.name,
        email: body.email,
        notificationsEnabled: (_e = body.notificationsEnabled) != null ? _e : existing.notificationsEnabled,
        password: passwordHash,
        lastLoginAt: /* @__PURE__ */ new Date(),
        lastLoginIp: (_f = getRequestIP(event)) != null ? _f : existing.lastLoginIp
      }).where(eq(profileSettings$1.id, existing.id)).returning();
      return { success: true, data: updated };
    }
    return { success: false, message: "Method not allowed" };
  } catch (err) {
    console.error("\u274C Profile API error:", err);
    return { success: false, message: "Internal server error" };
  }
});

export { profileSettings as default };
//# sourceMappingURL=profile-settings.mjs.map
