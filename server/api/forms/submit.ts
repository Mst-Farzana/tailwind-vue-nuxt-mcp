// server/api/forms/submit.ts
import { createError, defineEventHandler, readBody } from 'h3';

export default defineEventHandler(async event => {
  try {
    const body = await readBody(event);
    console.log('📦 Form Data:', body);

    return {
      success: true,
      message: 'Thank you! Your message has been received.',
      metadata: {
        timestamp: new Date().toISOString(),
      },
    };
  } catch (error: unknown) {
    // ✅ 'unknown' ব্যবহার করুন
    console.error('❌ Error:', error);

    // ✅ টাইপ গার্ড: error কি Error টাইপ?
    if (error instanceof Error) {
      throw createError({
        statusCode: 500,
        message: error.message || 'Failed to process your request',
      });
    }

    // ✅ যদি Error না হয়
    throw createError({
      statusCode: 500,
      message: 'An unknown error occurred',
    });
  }
});
