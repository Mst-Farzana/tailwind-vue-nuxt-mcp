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

const dummyStats = {
  revenue: 45231.89,
  growth: 20.1,
  users: 2352,
  orders: 12405,
  series: [
    { name: "Revenue", data: [10, 41, 35, 51, 49, 62, 69, 91, 148] },
    { name: "Orders", data: [5, 20, 17, 25, 24, 31, 35, 46, 74] }
  ]
};
const stats = defineEventHandler(async () => {
  try {
    return dummyStats;
  } catch (error) {
    console.warn("Analytics stats API error:", error);
    return dummyStats;
  }
});

export { stats as default };
//# sourceMappingURL=stats.mjs.map
