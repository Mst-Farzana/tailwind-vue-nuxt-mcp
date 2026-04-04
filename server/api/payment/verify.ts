// server/api/payment/verify.ts
import { eq } from 'drizzle-orm';
import { db } from '~/server/db';
import { subscriptions } from '~/server/db/schemas/index';

export default defineEventHandler(async event => {
  const body = await readBody(event);

  // SSLCommerz sends 'tran_id' (snake_case), normalise both formats
  const tranId: string | undefined = body.tran_id ?? body.tranId;

  if (!tranId) {
    throw createError({ statusCode: 400, message: 'Missing transaction ID' });
  }

  try {
    await db
      .update(subscriptions)
      .set({
        status: 'active',
        plan: body.plan,
        updatedAt: new Date(),
      })
      .where(eq(subscriptions.tranId, tranId));

    return { success: true };
  } catch (error) {
    console.error('Update failed:', error);
    throw createError({
      statusCode: 500,
      message: 'Failed to update subscription',
    });
  }
});
