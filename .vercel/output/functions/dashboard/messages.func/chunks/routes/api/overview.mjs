import { d as defineEventHandler, A as getDb, r as readBody, c as createError, B as overview$1 } from '../../_/nitro.mjs';
import 'drizzle-orm/node-postgres';
import 'pg';
import 'drizzle-orm';
import 'zod';
import 'drizzle-orm/pg-core';
import 'crypto';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import '@iconify/utils';
import 'node:crypto';
import 'consola';
import 'node:url';
import 'ipx';
import 'node:fs';
import 'node:path';

const overview = defineEventHandler(async (event) => {
  const method = event.node.req.method;
  const db = getDb();
  try {
    if (method === "POST") {
      const body = await readBody(event);
      const isEmpty = !body || Array.isArray(body) && body.length === 0 || !Array.isArray(body) && Object.keys(body).length === 0;
      if (isEmpty) {
        throw createError({
          statusCode: 400,
          message: "No data provided"
        });
      }
      const rowsToInsert = Array.isArray(body) ? body : [body];
      const result = await db.insert(overview$1).values(rowsToInsert).returning();
      return {
        success: true,
        inserted: result.length
      };
    }
    if (method === "GET") {
      try {
        const rows = await db.select().from(overview$1);
        return rows.map((row) => {
          let statusColor = "blue";
          let statusText = "No change";
          if (row.trend_value > 0) {
            statusColor = "green";
            statusText = `\u2191 ${row.trend_value}%`;
          } else if (row.trend_value < 0) {
            statusColor = "red";
            statusText = `\u2193 ${Math.abs(row.trend_value)}%`;
          } else {
            statusColor = "yellow";
            statusText = "No change";
          }
          return {
            id: row.id,
            title: row.title,
            value: row.value,
            icon: row.icon,
            iconColor: row.icon_color,
            trendValue: row.trend_value,
            statusText,
            statusColor
          };
        });
      } catch {
        console.warn("Database unavailable for overview query, returning empty array");
        return [];
      }
    }
    throw createError({ statusCode: 405, message: "Method not allowed" });
  } catch (error) {
    console.error("Overview API Error:", error);
    if (error.statusCode) {
      throw error;
    }
    throw createError({
      statusCode: 500,
      message: "Overview API failed"
    });
  }
});

export { overview as default };
//# sourceMappingURL=overview.mjs.map
