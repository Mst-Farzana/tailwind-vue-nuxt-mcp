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

const submit = defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    console.log("\u{1F4E6} Form Data:", body);
    return {
      success: true,
      message: "Thank you! Your message has been received.",
      metadata: {
        timestamp: (/* @__PURE__ */ new Date()).toISOString()
      }
    };
  } catch (error) {
    console.error("\u274C Error:", error);
    if (error instanceof Error) {
      throw createError({
        statusCode: 500,
        message: error.message || "Failed to process your request"
      });
    }
    throw createError({
      statusCode: 500,
      message: "An unknown error occurred"
    });
  }
});

export { submit as default };
//# sourceMappingURL=submit.mjs.map
