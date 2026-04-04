import { desc } from 'drizzle-orm';
import { defineEventHandler } from 'h3';
import { db } from '~/server/db';
import { trendsTable } from '~/server/db/schemas';

export default defineEventHandler(async () => {
  const rows = await db.select().from(trendsTable).orderBy(desc(trendsTable.createdAt)).limit(1);

  if (!rows.length) {
    return {
      success: false,
      data: {
        graph: {
          labels: [],
          datasets: [],
        },
        accounts: [],
      },
    };
  }

  const trend = rows[0];

  return {
    success: true,
    data: {
      graph: trend ? trend.graph : [],
      accounts: [
        {
          name: 'Checking Account',
          balance: '$28,450',
          percentage: '+12%',
          color: 'bg-green-500',
        },
        {
          name: 'Savings Account',
          balance: '$15,200',
          percentage: '-3%',
          color: 'bg-red-500',
        },
        {
          name: 'Home Loan Account',
          balance: '$98,726.20',
          percentage: '-24%',
          color: 'bg-red-500',
        },
      ],
    },
  };
});
