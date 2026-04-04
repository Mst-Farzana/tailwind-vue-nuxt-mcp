// server/api/subscription/current.get.ts

import { and, eq } from 'drizzle-orm';
import { createError, getQuery } from 'h3';

import { db } from '~/server/db';
import { members, subscriptions } from '~/server/db/schemas';

// UUID validation
const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export default defineEventHandler(async event => {
  const userId = event.context.user?.id;

  if (!userId) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Authentication required',
    });
  }

  const query = getQuery(event);
  const orgId = query.orgId as string | undefined;

  if (!orgId || !UUID_REGEX.test(orgId)) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Invalid organization ID',
    });
  }

  // Check membership
  const membership = await db.query.members.findFirst({
    where: and(eq(members.userId, userId), eq(members.organizationId, orgId)),
  });

  if (!membership) {
    throw createError({
      statusCode: 403,
      statusMessage: 'You do not have access to this organization',
    });
  }

  // Get subscription
  const subscription = await db.query.subscriptions.findFirst({
    where: eq(subscriptions.organizationId, orgId),
  });

  if (!subscription) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Subscription not found',
    });
  }

  return {
    id: subscription.id,
    plan: subscription.plan,
    status: subscription.status,
    currentPeriodEnd: subscription.currentPeriodEnd,
  };
});
