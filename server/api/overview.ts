import { createError, defineEventHandler, getMethod, readBody } from 'h3';
import { overview, type OverviewItem } from '~/server/db/schemas/index';
import { getDb } from '~/server/utils/db';

export default defineEventHandler(async event => {
  const method = getMethod(event);
  const db = getDb();

  try {
    // ================= POST REQUEST =================
    if (method === 'POST') {
      const body = await readBody(event);

      const isEmpty =
        !body ||
        (Array.isArray(body) && body.length === 0) ||
        (!Array.isArray(body) && Object.keys(body).length === 0);

      if (isEmpty) {
        throw createError({
          statusCode: 400,
          message: 'No data provided',
        });
      }

      const rowsToInsert = Array.isArray(body) ? body : [body];

      // ডেটাবেসে ইনসার্ট করা
      const result = await db.insert(overview).values(rowsToInsert).returning();

      return {
        success: true,
        inserted: result.length,
        data: result, // অপশনাল: ইনসার্ট হওয়া ডেটা ফেরত দিলে ফ্রন্টএন্ডে কাজে লাগে
      };
    }

    // ================= GET REQUEST =================
    if (method === 'GET') {
      const rows = await db.select().from(overview);

      return rows.map(row => {
        let statusColor: OverviewItem['statusColor'] = 'blue';
        let statusText = 'No change';

        if (row.trend_value > 0) {
          statusColor = 'green';
          statusText = `↑ ${row.trend_value}%`;
        } else if (row.trend_value < 0) {
          statusColor = 'red';
          statusText = `↓ ${Math.abs(row.trend_value)}%`;
        } else {
          statusColor = 'yellow';
          statusText = 'No change';
        }

        return {
          id: row.id,
          title: row.title,
          // ⚠️ গুরুত্বপূর্ণ: ফ্রন্টএন্ডে .replace() ব্যবহার করা হয়েছে, তাই value অবশ্যই String হতে হবে
          value: String(row.value),
          icon: row.icon,
          iconColor: row.icon_color,
          trendValue: row.trend_value,
          statusText,
          statusColor,
        };
      });
    }

    // ================= METHOD NOT ALLOWED =================
    throw createError({
      statusCode: 405,
      message: 'Method not allowed',
    });
  } catch (error: any) {
    console.error('Overview API Error:', error);

    // যদি ইতিমধ্যেই H3 এরর হয়, সেটি সরাসরি থ্রো করুন
    if (error.statusCode) {
      throw error;
    }

    // অন্যান্য আনএক্সপেক্টেড এররের জন্য 500 রিটার্ন করুন
    throw createError({
      statusCode: 500,
      message:
        process.env.NODE_ENV === 'development'
          ? (error as Error).message
          : 'Overview API failed. Please try again later.',
    });
  }
});
