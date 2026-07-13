import { d as defineEventHandler, b as db, H as paymentMethods, r as readBody } from '../../../_/nitro.mjs';
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

const paymentsMethod = defineEventHandler(async (event) => {
  var _a;
  try {
    if (event.method === "GET") {
      const data = await db.select().from(paymentMethods);
      return {
        success: true,
        data
      };
    }
    if (event.method === "POST") {
      const body = await readBody(event);
      if (!(body == null ? void 0 : body.cardType) || !(body == null ? void 0 : body.lastFour) || !(body == null ? void 0 : body.expiryDate) || !(body == null ? void 0 : body.cardholderName)) {
        return {
          success: false,
          message: "Missing required fields"
        };
      }
      if (!/^\d{4}$/.test(body.lastFour)) {
        return { success: false, message: "Last four must be 4 digits" };
      }
      if (!/^\d{2}\/\d{2}$/.test(body.expiryDate)) {
        return { success: false, message: "Expiry must be MM/YY" };
      }
      if (body.isPrimary === true) {
        await db.update(paymentMethods).set({ isPrimary: false });
      }
      const [newMethod] = await db.insert(paymentMethods).values({
        cardType: body.cardType,
        lastFour: body.lastFour,
        expiryDate: body.expiryDate,
        cardholderName: body.cardholderName,
        isPrimary: (_a = body.isPrimary) != null ? _a : false
      }).returning();
      return {
        success: true,
        data: newMethod
      };
    }
    return { success: false, message: "Method not allowed" };
  } catch (err) {
    console.error("\u274C Payment methods error:", err);
    return { success: false, message: "Internal server error" };
  }
});

export { paymentsMethod as default };
//# sourceMappingURL=payments-method.mjs.map
