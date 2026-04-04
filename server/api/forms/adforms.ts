import { desc } from 'drizzle-orm';
import { createError, defineEventHandler, getMethod, readBody } from 'h3';
import { z } from 'zod';
import { db } from '~/server/db';
import { formSubmissions } from '~/server/db/schemas';
import { formSchema } from '~/server/db/validators/adforms';

export default defineEventHandler(async event => {
  const method = getMethod(event);

  try {
    if (method === 'POST') {
      const body = await readBody(event);

      // Validate form data
      const validatedData = formSchema.parse(body);

      // If there's a file, only store file name
      const dataToInsert = {
        ...validatedData,
        file: validatedData.file?.name || null,
      };

      const [result] = await db
        .insert(formSubmissions)
        .values(dataToInsert)
        .returning({ id: formSubmissions.id });

      return {
        success: true,
        message: 'Form submitted successfully!',
        id: result?.id ?? null,
      };
    }

    if (method === 'GET') {
      const submissions = await db
        .select({
          id: formSubmissions.id,
          name: formSubmissions.name,
          email: formSubmissions.email,
          createdAt: formSubmissions.createdAt,
        })
        .from(formSubmissions)
        .orderBy(desc(formSubmissions.createdAt));

      return {
        success: true,
        count: submissions.length,
        submissions,
      };
    }

    throw createError({ statusCode: 405, message: 'Method Not Allowed' });
  } catch (err: unknown) {
    // Handle validation errors
    if (err instanceof z.ZodError) {
      return {
        success: false,
        message: 'Validation failed',
        errors: err.issues,
      };
    }

    // Other errors
    if (err instanceof Error) {
      return {
        success: false,
        message: err.message || 'Something went wrong',
      };
    }

    // Fallback for unknown error types
    return {
      success: false,
      message: 'Unknown error occurred',
    };
  }
});
