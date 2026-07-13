import { d as defineEventHandler, r as readBody, c as createError } from '../../../_/nitro.mjs';
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

const remind_post = defineEventHandler(async (event) => {
  const { username } = await readBody(event);
  if (!(username == null ? void 0 : username.trim())) {
    throw createError({
      statusCode: 400,
      statusMessage: "Please enter a valid username"
    });
  }
  return {
    success: true,
    message: `Reminder will be sent to ${username.trim()}`
  };
});

export { remind_post as default };
//# sourceMappingURL=remind.post.mjs.map
