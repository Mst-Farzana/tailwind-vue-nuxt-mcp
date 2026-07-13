import { d as defineEventHandler, c as createError, N as getHeader, O as requirePro } from '../../../_/nitro.mjs';
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

const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
const premium_get = defineEventHandler(async (event) => {
  var _a;
  const userId = (_a = event.context.user) == null ? void 0 : _a.id;
  if (!userId) {
    throw createError({
      statusCode: 401,
      statusMessage: "Unauthorized"
    });
  }
  const orgIdHeader = getHeader(event, "x-organization-id");
  if (!orgIdHeader || typeof orgIdHeader !== "string") {
    throw createError({
      statusCode: 400,
      statusMessage: "Organization ID required"
    });
  }
  if (!UUID_REGEX.test(orgIdHeader)) {
    throw createError({
      statusCode: 400,
      statusMessage: "Invalid organization ID format"
    });
  }
  await requirePro(orgIdHeader);
  return {
    success: true,
    data: {
      message: "Welcome to Pro feature!",
      premiumContent: "\u{1F389} This is exclusive content for Pro users"
    }
  };
});

export { premium_get as default };
//# sourceMappingURL=premium.get.mjs.map
