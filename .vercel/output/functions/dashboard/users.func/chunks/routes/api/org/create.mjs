import { d as defineEventHandler, c as createError, r as readBody, b as db, v as saasOrganizations, x as members, y as subscriptions } from '../../../_/nitro.mjs';
import { a as auth } from '../../../_/auth.mjs';
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
import 'better-auth';
import 'better-auth/adapters/drizzle';
import 'better-auth/plugins';

const create = defineEventHandler(async (event) => {
  const session = await auth.api.getSession({ headers: event.headers });
  if (!(session == null ? void 0 : session.user)) {
    throw createError({ statusCode: 401, message: "Unauthorized" });
  }
  const body = await readBody(event);
  const orgName = body.name || `${session.user.name}'s Organization`;
  const orgSlug = body.slug || orgName.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "") || `org-${Date.now()}`;
  try {
    const [org] = await db.insert(saasOrganizations).values({ name: orgName, slug: orgSlug }).returning();
    if (!org) {
      throw createError({
        statusCode: 500,
        message: "Failed to create organization"
      });
    }
    await db.insert(members).values({
      userId: session.user.id,
      organizationId: org.id,
      // ✅ No more error!
      role: "owner",
      joinedAt: /* @__PURE__ */ new Date()
    });
    await db.insert(subscriptions).values({
      organizationId: org.id,
      // ✅ No more error!
      plan: "free",
      status: "active"
    });
    return { success: true, organization: org };
  } catch (error) {
    console.error("Organization creation failed:", error);
    throw createError({
      statusCode: 500,
      message: error instanceof Error ? error.message : "Failed to create organization"
    });
  }
});

export { create as default };
//# sourceMappingURL=create.mjs.map
