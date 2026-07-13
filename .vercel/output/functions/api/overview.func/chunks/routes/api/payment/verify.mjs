import { d as defineEventHandler, r as readBody, c as createError, b as db, y as subscriptions } from '../../../_/nitro.mjs';
import { eq } from 'drizzle-orm';
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

const verify = defineEventHandler(async (event) => {
  var _a;
  const body = await readBody(event);
  const tranId = (_a = body.tran_id) != null ? _a : body.tranId;
  if (!tranId) {
    throw createError({ statusCode: 400, message: "Missing transaction ID" });
  }
  try {
    await db.update(subscriptions).set({
      status: "active",
      plan: body.plan,
      updatedAt: /* @__PURE__ */ new Date()
    }).where(eq(subscriptions.tranId, tranId));
    return { success: true };
  } catch (error) {
    console.error("Update failed:", error);
    throw createError({
      statusCode: 500,
      message: "Failed to update subscription"
    });
  }
});

export { verify as default };
//# sourceMappingURL=verify.mjs.map
