import { d as defineEventHandler, a as toWebRequest, c as createError } from '../../../_/nitro.mjs';
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

const ____all_ = defineEventHandler(async (event) => {
  try {
    return await auth.handler(toWebRequest(event));
  } catch (error) {
    console.error("Auth handler error:", error);
    throw createError({ statusCode: 500, statusMessage: "Internal Server Error" });
  }
});

export { ____all_ as default };
//# sourceMappingURL=_...all_.mjs.map
