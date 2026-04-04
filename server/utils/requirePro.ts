// server/utils/permissions.ts

import { eq } from 'drizzle-orm';
import { createError } from 'h3';
import { db } from '~/server/db';
import { subscriptions } from '~/server/db/schemas';

// UUID validation
const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

// Allowed plans
const PRO_PLANS = ['pro', 'enterprise'];

export async function requirePro(orgId: string) {
  if (!orgId || !UUID_REGEX.test(orgId)) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Invalid organization ID',
    });
  }

  const subscription = await db.query.subscriptions.findFirst({
    where: eq(subscriptions.organizationId, orgId),
  });

  if (!subscription) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Subscription not found',
    });
  }

  const validPlan = subscription.plan !== null && PRO_PLANS.includes(subscription.plan);
  const activeStatus = subscription.status === 'active';

  if (!validPlan || !activeStatus) {
    throw createError({
      statusCode: 403,
      statusMessage: 'Pro plan required',
      data: {
        currentPlan: subscription.plan,
        requiredPlan: 'pro',
      },
    });
  }

  return subscription;
}
