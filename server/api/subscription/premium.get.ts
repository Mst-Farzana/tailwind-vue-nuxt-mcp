// server/api/premium-feature.get.ts

import { createError, getHeader } from 'h3';
import { requirePro } from '~/server/utils/requirePro';

// UUID validation
const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export default defineEventHandler(async event => {
  // 🔐 Authenticated user
  const userId = event.context.user?.id;

  if (!userId) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Unauthorized',
    });
  }

  // 🏢 Organization ID from header
  const orgIdHeader = getHeader(event, 'x-organization-id');

  if (!orgIdHeader || typeof orgIdHeader !== 'string') {
    throw createError({
      statusCode: 400,
      statusMessage: 'Organization ID required',
    });
  }

  if (!UUID_REGEX.test(orgIdHeader)) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Invalid organization ID format',
    });
  }

  // 🔐 Pro plan permission check
  await requirePro(orgIdHeader);

  return {
    success: true,
    data: {
      message: 'Welcome to Pro feature!',
      premiumContent: '🎉 This is exclusive content for Pro users',
    },
  };
});
