import { d as defineEventHandler, c as createError, j as getQuery, b as db, x as members, y as subscriptions } from '../../../_/nitro.mjs';
import { and, eq } from 'drizzle-orm';
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

const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
const current_get = defineEventHandler(async (event) => {
  var _a;
  const userId = (_a = event.context.user) == null ? void 0 : _a.id;
  if (!userId) {
    throw createError({
      statusCode: 401,
      statusMessage: "Authentication required"
    });
  }
  const query = getQuery(event);
  const orgId = query.orgId;
  if (!orgId || !UUID_REGEX.test(orgId)) {
    throw createError({
      statusCode: 400,
      statusMessage: "Invalid organization ID"
    });
  }
  const membership = await db.query.members.findFirst({
    where: and(eq(members.userId, userId), eq(members.organizationId, orgId))
  });
  if (!membership) {
    throw createError({
      statusCode: 403,
      statusMessage: "You do not have access to this organization"
    });
  }
  const subscription = await db.query.subscriptions.findFirst({
    where: eq(subscriptions.organizationId, orgId)
  });
  if (!subscription) {
    throw createError({
      statusCode: 404,
      statusMessage: "Subscription not found"
    });
  }
  return {
    id: subscription.id,
    plan: subscription.plan,
    status: subscription.status,
    currentPeriodEnd: subscription.currentPeriodEnd
  };
});

export { current_get as default };
//# sourceMappingURL=current.get.mjs.map
