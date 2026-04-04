import { eq } from 'drizzle-orm';
import { defineEventHandler, readBody } from 'h3';
import { db } from '~/server/db';
import { paymentMethods } from '~/server/db/schemas';

export default defineEventHandler(async event => {
  const id = Number(event.context.params?.id);

  if (!id) {
    return { success: false, message: 'Invalid ID' };
  }

  try {
    // ---------------- GET SINGLE ----------------
    if (event.method === 'GET') {
      const [data] = await db.select().from(paymentMethods).where(eq(paymentMethods.id, id));

      return data ? { success: true, data } : { success: false, message: 'Not found' };
    }

    // ---------------- PUT EDIT ----------------
    if (event.method === 'PUT') {
      const body = await readBody(event);

      if (!body) {
        return { success: false, message: 'Invalid body' };
      }

      if (body.isPrimary === true) {
        await db.update(paymentMethods).set({ isPrimary: false });
      }

      const [updated] = await db
        .update(paymentMethods)
        .set({
          cardType: body.cardType,
          lastFour: body.lastFour,
          expiryDate: body.expiryDate,
          cardholderName: body.cardholderName,
          isPrimary: body.isPrimary,
        })
        .where(eq(paymentMethods.id, id))
        .returning();

      return updated ? { success: true, data: updated } : { success: false, message: 'Not found' };
    }

    // ---------------- DELETE ----------------
    if (event.method === 'DELETE') {
      const [deleted] = await db
        .delete(paymentMethods)
        .where(eq(paymentMethods.id, id))
        .returning();

      return deleted ? { success: true } : { success: false, message: 'Not found' };
    }

    return { success: false, message: 'Method not allowed' };
  } catch (err) {
    console.error('❌ Payment method ID error:', err);
    return { success: false, message: 'Internal server error' };
  }
});
