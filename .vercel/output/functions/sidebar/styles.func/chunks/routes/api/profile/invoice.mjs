import { d as defineEventHandler, r as readBody, b as db, G as invoices } from '../../../_/nitro.mjs';
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

const invoice = defineEventHandler(async (event) => {
  const method = event.req.method;
  try {
    if (method === "POST") {
      const body = await readBody(event);
      if (!body || !body.date || !body.amount) {
        return { success: false, message: "Invalid invoice data" };
      }
      try {
        const [newInvoice] = await db.insert(invoices).values({
          date: body.date,
          amount: body.amount,
          status: body.status,
          invoiceUrl: body.invoiceUrl
        }).returning({
          // এখানে invoices টেবিলের টাইপ specify করুন
          id: invoices.id,
          date: invoices.date,
          amount: invoices.amount,
          status: invoices.status,
          invoiceUrl: invoices.invoiceUrl
        });
        return { success: true, message: "Invoice added", data: newInvoice };
      } catch {
        console.warn("Database unavailable for invoice POST, returning success anyway");
        return { success: false, message: "Database unavailable", data: [] };
      }
    }
    try {
      const invoiceList = await db.select().from(invoices).orderBy(invoices.id);
      return {
        success: true,
        data: invoiceList
      };
    } catch {
      console.warn("Database unavailable for invoices query, returning empty array");
      return {
        success: false,
        data: []
      };
    }
  } catch (error) {
    console.error("\u274C Invoices API error:", error);
    return { success: false, data: [] };
  }
});

export { invoice as default };
//# sourceMappingURL=invoice.mjs.map
