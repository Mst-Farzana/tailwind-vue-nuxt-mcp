import { d as defineEventHandler, r as readBody, b as db, i as billing$1 } from '../../../_/nitro.mjs';
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

const billing = defineEventHandler(async (event) => {
  const method = event.req.method;
  try {
    if (method === "POST") {
      const body = await readBody(event);
      if (!body || !body.nextPaymentDate || !body.amountDue) {
        return { success: false, message: "Invalid data" };
      }
      try {
        const [newBilling] = await db.insert(billing$1).values({
          nextPaymentDate: body.nextPaymentDate,
          lastBilledDate: body.lastBilledDate,
          amountDue: body.amountDue,
          status: body.status,
          invoiceUrl: body.invoiceUrl
        }).returning();
        return { success: true, message: "Billing added", data: newBilling };
      } catch {
        console.warn("Database unavailable for billing POST, returning error response");
        return { success: false, message: "Database unavailable", data: null };
      }
    }
    try {
      const [billingSummary] = await db.select().from(billing$1).limit(1);
      return {
        success: true,
        data: billingSummary ? {
          nextPaymentDate: billingSummary.nextPaymentDate,
          lastBilledDate: billingSummary.lastBilledDate,
          amountDue: billingSummary.amountDue,
          status: billingSummary.status,
          invoiceUrl: billingSummary.invoiceUrl
        } : null
      };
    } catch {
      console.warn("Database unavailable for billing query, returning null");
      return {
        success: false,
        data: null
      };
    }
  } catch (error) {
    console.error("\u274C Billing API error:", error);
    return { success: false, data: null };
  }
});

export { billing as default };
//# sourceMappingURL=billing.mjs.map
