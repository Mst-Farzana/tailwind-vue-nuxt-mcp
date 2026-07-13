import { d as defineEventHandler, b as db } from '../../../_/nitro.mjs';
import { pgTable, timestamp, varchar, text, integer, serial } from 'drizzle-orm/pg-core';
import 'drizzle-orm/node-postgres';
import 'pg';
import 'drizzle-orm';
import 'zod';
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

const transactions$1 = pgTable("transactions", {
  id: serial("id").primaryKey(),
  amount: integer("amount").notNull(),
  type: varchar("type", { length: 100 }).notNull(),
  label: varchar("label", { length: 100 }),
  time: text("time").notNull(),
  via: varchar("via", { length: 100 }),
  account: varchar("account", { length: 100 }),
  icon: varchar("icon", { length: 150 }),
  icon_bg: varchar("icon_bg", { length: 150 }),
  created_at: timestamp("created_at").defaultNow()
});

const transactions = defineEventHandler(async (event) => {
  const method = event.node.req.method;
  console.log("\u{1F525} API Hit, Method:", method);
  if (method === "POST") {
    try {
      console.log("\u{1F4BE} Seeding transactions...");
      const transactionsData = [
        {
          amount: 37553,
          type: "Deposit",
          label: "Home Loan",
          time: "2025-12-08",
          via: "Bank",
          account: "Bank",
          icon: "mdi:cash-plus",
          icon_bg: "bg-green-500"
        },
        {
          amount: 47026,
          type: "Payment",
          label: "Savings",
          time: "2025-12-08",
          via: "Bank",
          account: "Bank",
          icon: "mdi:credit-card",
          icon_bg: "bg-blue-500"
        },
        {
          amount: 97134,
          type: "Invoice",
          label: "Checking",
          time: "2025-12-06",
          via: "Bank",
          account: "Bank",
          icon: "mdi:receipt",
          icon_bg: "bg-yellow-500"
        }
      ];
      await db.delete(transactions$1);
      await db.insert(transactions$1).values(transactionsData);
      return {
        success: true,
        message: "Transactions seeded successfully"
      };
    } catch (error) {
      console.error("\u274C TRANSACTION POST ERROR:", error);
      return {
        success: false,
        message: "Transaction seed failed",
        error
      };
    }
  }
  if (method === "GET") {
    try {
      const trans = await db.select().from(transactions$1);
      return {
        success: true,
        transactions: trans
      };
    } catch (error) {
      console.error("\u274C TRANSACTION GET ERROR:", error);
      return {
        success: false,
        message: "Transaction fetch failed",
        error
      };
    }
  }
  return {
    success: false,
    message: "Method not allowed"
  };
});

export { transactions as default };
//# sourceMappingURL=transactions.mjs.map
