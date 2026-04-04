import { createError, defineEventHandler, readBody } from 'h3';

export default defineEventHandler(async event => {
  const { username } = await readBody<{ username?: string }>(event);

  if (!username?.trim()) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Please enter a valid username',
    });
  }

  return {
    success: true,
    message: `Reminder will be sent to ${username.trim()}`,
  };
});
