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

const FinanceStatus = defineEventHandler(async () => {
  const financeData = {
    unpaidBalance: "$120,489.67",
    pendingTransactions: "$756.49",
    pendingWithdrawals: "$50,124.28",
    stats: [
      {
        label: "Unpaid balance",
        value: "$120,489.67",
        icon: "\u{1F4BC}",
        color: "bg-blue-500"
      },
      {
        label: "Pending transactions",
        value: "$756.49",
        icon: "\u{1F4C5}",
        color: "bg-yellow-500"
      },
      {
        label: "Pending withdrawals",
        value: "$50,124.28",
        icon: "\u{1F4B8}",
        color: "bg-red-500"
      }
    ]
  };
  return {
    success: true,
    data: financeData
  };
});

export { FinanceStatus as default };
//# sourceMappingURL=FinanceStatus.mjs.map
