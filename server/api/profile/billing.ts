// server/api/dashboard/billing.ts
import { defineEventHandler, readBody } from 'h3';
import { db } from '~/server/db';
import { billing } from '~/server/db/schemas';

export default defineEventHandler(async event => {
  const method = event.req.method;

  try {
    // ---------------- POST ----------------
    if (method === 'POST') {
      const body = (await readBody(event)) as {
        nextPaymentDate: string;
        lastBilledDate: string;
        amountDue: string;
        status: string;
        invoiceUrl: string;
      };

      if (!body || !body.nextPaymentDate || !body.amountDue) {
        return { success: false, message: 'Invalid data' };
      }

      const [newBilling] = await db
        .insert(billing)
        .values({
          nextPaymentDate: body.nextPaymentDate,
          lastBilledDate: body.lastBilledDate,
          amountDue: body.amountDue,
          status: body.status,
          invoiceUrl: body.invoiceUrl,
        })
        .returning(); // ✅ Remove '*' - use default return type

      return { success: true, message: 'Billing added', data: newBilling };
    }

    // ---------------- GET ----------------
    const [billingSummary] = await db.select().from(billing).limit(1);

    return {
      success: true,
      data: billingSummary
        ? {
            nextPaymentDate: billingSummary.nextPaymentDate,
            lastBilledDate: billingSummary.lastBilledDate,
            amountDue: billingSummary.amountDue,
            status: billingSummary.status,
            invoiceUrl: billingSummary.invoiceUrl,
          }
        : null,
    };
  } catch (error) {
    console.error('❌ Billing API error:', error);
    return { success: false, data: null };
  }
});
