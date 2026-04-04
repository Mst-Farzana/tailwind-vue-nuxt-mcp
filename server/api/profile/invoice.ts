import { defineEventHandler, readBody } from 'h3';
import { db } from '~/server/db';
import { invoices } from '~/server/db/schemas';

export default defineEventHandler(async event => {
  const method = event.req.method;

  try {
    // ---------------- POST ----------------
    if (method === 'POST') {
      const body = (await readBody(event)) as {
        date: string;
        amount: string;
        status: string;
        invoiceUrl: string;
      };

      if (!body || !body.date || !body.amount) {
        return { success: false, message: 'Invalid invoice data' };
      }

      const [newInvoice] = await db
        .insert(invoices)
        .values({
          date: body.date,
          amount: body.amount,
          status: body.status,
          invoiceUrl: body.invoiceUrl,
        })
        .returning({
          // এখানে invoices টেবিলের টাইপ specify করুন
          id: invoices.id,
          date: invoices.date,
          amount: invoices.amount,
          status: invoices.status,
          invoiceUrl: invoices.invoiceUrl,
        });

      return { success: true, message: 'Invoice added', data: newInvoice };
    }

    // ---------------- GET ----------------
    const invoiceList = await db.select().from(invoices).orderBy(invoices.id);

    return {
      success: true,
      data: invoiceList,
    };
  } catch (error) {
    console.error('❌ Invoices API error:', error);
    return { success: false, data: [] };
  }
});
