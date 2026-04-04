import { createError, defineEventHandler, readBody } from 'h3';
import { overview, type OverviewItem } from '~/server/db/schemas/index';
import { getDb } from '~/server/utils/db';

export default defineEventHandler(async event => {
  const method = event.node.req.method;
  const db = getDb();

  try {
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
      const result = await db.insert(overview).values(rowsToInsert).returning();

      return {
        success: true,
        inserted: result.length,
      };
    }

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
          value: row.value,
          icon: row.icon,
          iconColor: row.icon_color,
          trendValue: row.trend_value,
          statusText,
          statusColor,
        };
      });
    }

    throw createError({ statusCode: 405, message: 'Method not allowed' });
  } catch (error: any) {
    console.error('Overview API Error:', error);

    if (error.statusCode) {
      throw error;
    }

    // অন্যান্য আনএক্সপেক্টেড এররের জন্য 500 রিটার্ন করুন
    throw createError({
      statusCode: 500,
      message:
        process.env.NODE_ENV === 'development' ? (error as Error).message : 'Overview API failed',
    });
  }
});
