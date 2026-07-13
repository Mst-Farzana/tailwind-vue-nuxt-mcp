import { eq } from 'drizzle-orm';
import { d as defineEventHandler, b as db, H as paymentMethods, r as readBody } from '../../../../_/nitro.mjs';
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

const _id_ = defineEventHandler(async (event) => {
  var _a;
  const id = Number((_a = event.context.params) == null ? void 0 : _a.id);
  if (!id) {
    return { success: false, message: "Invalid ID" };
  }
  try {
    if (event.method === "GET") {
      const [data] = await db.select().from(paymentMethods).where(eq(paymentMethods.id, id));
      return data ? { success: true, data } : { success: false, message: "Not found" };
    }
    if (event.method === "PUT") {
      const body = await readBody(event);
      if (!body) {
        return { success: false, message: "Invalid body" };
      }
      if (body.isPrimary === true) {
        await db.update(paymentMethods).set({ isPrimary: false });
      }
      const [updated] = await db.update(paymentMethods).set({
        cardType: body.cardType,
        lastFour: body.lastFour,
        expiryDate: body.expiryDate,
        cardholderName: body.cardholderName,
        isPrimary: body.isPrimary
      }).where(eq(paymentMethods.id, id)).returning();
      return updated ? { success: true, data: updated } : { success: false, message: "Not found" };
    }
    if (event.method === "DELETE") {
      const [deleted] = await db.delete(paymentMethods).where(eq(paymentMethods.id, id)).returning();
      return deleted ? { success: true } : { success: false, message: "Not found" };
    }
    return { success: false, message: "Method not allowed" };
  } catch (err) {
    console.error("\u274C Payment method ID error:", err);
    return { success: false, message: "Internal server error" };
  }
});

export { _id_ as default };
//# sourceMappingURL=_id_.mjs.map
