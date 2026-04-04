import { defineEventHandler, readBody } from 'h3';
import { db } from '~/server/db';
import { paymentMethods } from '~/server/db/schemas';

export default defineEventHandler(async event => {
  try {
    // ---------------- GET ALL ----------------
    if (event.method === 'GET') {
      const data = await db.select().from(paymentMethods);

      return {
        success: true,
        data,
      };
    }

    // ---------------- POST ADD ----------------
    if (event.method === 'POST') {
      const body = await readBody(event);

      if (!body?.cardType || !body?.lastFour || !body?.expiryDate || !body?.cardholderName) {
        return {
          success: false,
          message: 'Missing required fields',
        };
      }

      // validation
      if (!/^\d{4}$/.test(body.lastFour)) {
        return { success: false, message: 'Last four must be 4 digits' };
      }

      if (!/^\d{2}\/\d{2}$/.test(body.expiryDate)) {
        return { success: false, message: 'Expiry must be MM/YY' };
      }

      // unset previous primary
      if (body.isPrimary === true) {
        await db.update(paymentMethods).set({ isPrimary: false });
      }

      const [newMethod] = await db
        .insert(paymentMethods)
        .values({
          cardType: body.cardType,
          lastFour: body.lastFour,
          expiryDate: body.expiryDate,
          cardholderName: body.cardholderName,
          isPrimary: body.isPrimary ?? false,
        })
        .returning();

      return {
        success: true,
        data: newMethod,
      };
    }

    return { success: false, message: 'Method not allowed' };
  } catch (err) {
    console.error('❌ Payment methods error:', err);
    return { success: false, message: 'Internal server error' };
  }
});
