import { d as defineEventHandler, c as createError, r as readBody, b as db, x as members, z as session } from '../../../_/nitro.mjs';
import { and, eq } from 'drizzle-orm';
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

const select = defineEventHandler(async (event) => {
  const userSession = await auth.api.getSession({ headers: event.headers });
  if (!(userSession == null ? void 0 : userSession.user)) {
    throw createError({ statusCode: 401, message: "Unauthorized" });
  }
  const body = await readBody(event);
  const { organizationId } = body;
  if (!organizationId) {
    throw createError({ statusCode: 400, message: "organizationId is required" });
  }
  const membership = await db.query.members.findFirst({
    where: and(eq(members.userId, userSession.user.id), eq(members.organizationId, organizationId))
  });
  if (!membership) {
    throw createError({
      statusCode: 403,
      message: "Access denied: You are not a member of this organization"
    });
  }
  await db.update(session).set({ organizationId }).where(eq(session.id, userSession.session.id));
  return {
    success: true,
    organizationId,
    role: membership.role
  };
});

export { select as default };
//# sourceMappingURL=select.mjs.map
