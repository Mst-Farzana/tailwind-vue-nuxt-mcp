import { d as defineEventHandler, c as createError, r as readBody, b as db, x as members, y as subscriptions } from '../../../_/nitro.mjs';
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
const VALID_PLANS = ["free", "beginner", "standard", "pro", "enterprise"];
const upgrade_post = defineEventHandler(async (event) => {
  var _a;
  const userId = (_a = event.context.user) == null ? void 0 : _a.id;
  if (!userId) {
    throw createError({ statusCode: 401, message: "Unauthorized" });
  }
  const body = await readBody(event);
  const {
    orgId,
    plan,
    billingPeriod = "monthly"
  } = body;
  if (!orgId || !UUID_REGEX.test(orgId)) {
    throw createError({ statusCode: 400, message: "Invalid organization ID" });
  }
  if (!plan || !VALID_PLANS.includes(plan)) {
    throw createError({
      statusCode: 400,
      message: `Invalid plan. Must be one of: ${VALID_PLANS.join(", ")}`
    });
  }
  const membership = await db.query.members.findFirst({
    where: and(eq(members.userId, userId), eq(members.organizationId, orgId))
  });
  if (!membership || !["owner", "admin"].includes(membership.role)) {
    throw createError({ statusCode: 403, message: "Permission denied" });
  }
  const existing = await db.query.subscriptions.findFirst({
    where: eq(subscriptions.organizationId, orgId)
  });
  const expires = /* @__PURE__ */ new Date();
  if (billingPeriod === "yearly") {
    expires.setFullYear(expires.getFullYear() + 1);
  } else {
    expires.setMonth(expires.getMonth() + 1);
  }
  const updateData = {
    plan,
    currentPeriodEnd: expires,
    status: "active",
    updatedAt: /* @__PURE__ */ new Date()
  };
  if (!existing) {
    await db.insert(subscriptions).values({
      organizationId: orgId,
      ...updateData,
      createdAt: /* @__PURE__ */ new Date()
    });
    console.log(`Subscription created: Org ${orgId} -> ${plan} (${billingPeriod}) by ${userId}`);
  } else {
    await db.update(subscriptions).set(updateData).where(eq(subscriptions.organizationId, orgId));
    console.log(`Subscription updated: Org ${orgId} -> ${plan} (${billingPeriod}) by ${userId}`);
  }
  return {
    success: true
  };
});

export { upgrade_post as default };
//# sourceMappingURL=upgrade.post.mjs.map
