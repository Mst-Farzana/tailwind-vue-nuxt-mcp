import { d as defineEventHandler, r as readBody } from '../../../_/nitro.mjs';
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

let featureState = {
  darkMode: false,
  notifications: false
};
const darkmode = defineEventHandler(async (event) => {
  if (event.method === "POST") {
    const body = await readBody(event);
    featureState = {
      darkMode: Boolean(body.darkMode),
      notifications: Boolean(body.notifications)
    };
  }
  return {
    success: true,
    data: featureState
  };
});

export { darkmode as default };
//# sourceMappingURL=darkmode.mjs.map
