import { d as defineEventHandler, c as createError, b as db, x as members } from '../../../_/nitro.mjs';
import { eq } from 'drizzle-orm';
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

const list = defineEventHandler(async (event) => {
  const session = await auth.api.getSession({ headers: event.headers });
  if (!(session == null ? void 0 : session.user)) {
    throw createError({ statusCode: 401, message: "Unauthorized" });
  }
  const userMemberships = await db.query.members.findMany({
    where: eq(members.userId, session.user.id),
    with: {
      organization: {
        with: { subscriptions: true }
      }
    }
  });
  const organizations = userMemberships.map((m) => {
    var _a;
    return {
      id: m.organization.id,
      name: m.organization.name,
      slug: m.organization.slug,
      role: m.role,
      subscription: ((_a = m.organization.subscriptions) == null ? void 0 : _a.find((s) => s.status === "active")) || null
    };
  });
  return organizations;
});

export { list as default };
//# sourceMappingURL=list.mjs.map
