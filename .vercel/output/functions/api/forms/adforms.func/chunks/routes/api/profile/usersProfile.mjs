import { eq } from 'drizzle-orm';
import { d as defineEventHandler, o as getMethod, b as db, M as usersprofile, r as readBody } from '../../../_/nitro.mjs';
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

const MAX_AMOUNT = 1e3;
const DEFAULT_PASSWORD_HASH = "$2a$10$N9qo8uLOickgxKfFOC9FZuBjzHiUHxR3Wkm2QKm7VJlYbT7wGqKHO";
const usersProfile = defineEventHandler(async (event) => {
  var _a;
  const method = getMethod(event);
  if (method === "GET") {
    try {
      const userList = await db.select().from(usersprofile);
      const data = userList.map((user) => ({
        ...user,
        percentage: Math.min(100, Math.round(user.amount / MAX_AMOUNT * 100))
      }));
      return { success: true, data };
    } catch (error) {
      console.warn("\u274C GET users error - database unavailable, returning empty array:", error);
      return { success: false, data: [], message: "Failed to fetch users" };
    }
  }
  if (method === "POST") {
    try {
      const body = await readBody(event);
      const { id, name, email, avatar, amount } = body;
      if (!name || !email || amount == null) {
        return { success: false, message: "Name, email, and amount are required" };
      }
      if (amount < 0 || amount > MAX_AMOUNT) {
        return {
          success: false,
          message: `Amount must be between 0 and ${MAX_AMOUNT}`
        };
      }
      let result;
      if (id) {
        const [updated] = await db.update(usersprofile).set({
          name,
          email,
          avatar: avatar || null,
          amount,
          lastLoginAt: (/* @__PURE__ */ new Date()).toISOString()
        }).where(eq(usersprofile.id, id)).returning();
        if (!updated) return { success: false, message: "User not found" };
        result = updated;
      } else {
        const [created] = await db.insert(usersprofile).values({
          name,
          email,
          avatar: avatar || null,
          amount,
          password: DEFAULT_PASSWORD_HASH,
          verified: false,
          isVerified: false,
          createdAt: (/* @__PURE__ */ new Date()).toISOString()
        }).returning();
        result = created;
      }
      return {
        success: true,
        message: id ? "User updated" : "User created",
        data: {
          ...result,
          percentage: Math.min(100, Math.round(((_a = result == null ? void 0 : result.amount) != null ? _a : 0) / MAX_AMOUNT * 100))
        }
      };
    } catch (error) {
      console.error("\u274C POST user error:", error);
      return { success: false, message: "Failed to save user" };
    }
  }
  return { success: false, message: "Method not allowed" };
});

export { usersProfile as default };
//# sourceMappingURL=usersProfile.mjs.map
