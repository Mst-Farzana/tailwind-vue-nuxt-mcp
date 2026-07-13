import { d as defineEventHandler } from '../../../_/nitro.mjs';
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

const states_get = defineEventHandler(() => {
  return {
    revenue: 12430,
    users: 1240,
    orders: 320,
    growth: 12,
    series: [10, 23, 15, 42, 30, 50]
  };
});

export { states_get as default };
//# sourceMappingURL=states.get.mjs.map
