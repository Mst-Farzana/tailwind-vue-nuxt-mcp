import { desc } from 'drizzle-orm';
import { d as defineEventHandler, b as db, n as trendsTable } from '../../../_/nitro.mjs';
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

const trends = defineEventHandler(async () => {
  const rows = await db.select().from(trendsTable).orderBy(desc(trendsTable.createdAt)).limit(1);
  if (!rows.length) {
    return {
      success: false,
      data: {
        graph: {
          labels: [],
          datasets: []
        },
        accounts: []
      }
    };
  }
  const trend = rows[0];
  return {
    success: true,
    data: {
      graph: trend ? trend.graph : [],
      accounts: [
        {
          name: "Checking Account",
          balance: "$28,450",
          percentage: "+12%",
          color: "bg-green-500"
        },
        {
          name: "Savings Account",
          balance: "$15,200",
          percentage: "-3%",
          color: "bg-red-500"
        },
        {
          name: "Home Loan Account",
          balance: "$98,726.20",
          percentage: "-24%",
          color: "bg-red-500"
        }
      ]
    }
  };
});

export { trends as default };
//# sourceMappingURL=trends.mjs.map
