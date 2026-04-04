// server/api/auth/[...all].ts
import { createError, toWebRequest } from 'h3';
import { auth } from '~/server/auth';

export default defineEventHandler(async event => {
  if (import.meta.dev) {
    console.debug('👉 Auth API hit:', event.node.req.url);
  }

  try {
    return await auth.handler(toWebRequest(event));
  } catch (error) {
    console.error('Auth handler error:', error);
    throw createError({ statusCode: 500, statusMessage: 'Internal Server Error' });
  }
});
