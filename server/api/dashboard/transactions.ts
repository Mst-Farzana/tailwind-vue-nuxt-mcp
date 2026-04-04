import { db } from '~/server/db';
import { transactions } from '~/server/db/schemas/transactions';

export default defineEventHandler(async event => {
  const method = event.node.req.method;
  console.log('🔥 API Hit, Method:', method);

  // ================= POST (DEV SEED) =================
  if (method === 'POST') {
    try {
      console.log('💾 Seeding transactions...');

      const transactionsData = [
        {
          amount: 37553,
          type: 'Deposit',
          label: 'Home Loan',
          time: '2025-12-08',
          via: 'Bank',
          account: 'Bank',
          icon: 'mdi:cash-plus',
          icon_bg: 'bg-green-500',
        },
        {
          amount: 47026,
          type: 'Payment',
          label: 'Savings',
          time: '2025-12-08',
          via: 'Bank',
          account: 'Bank',
          icon: 'mdi:credit-card',
          icon_bg: 'bg-blue-500',
        },
        {
          amount: 97134,
          type: 'Invoice',
          label: 'Checking',
          time: '2025-12-06',
          via: 'Bank',
          account: 'Bank',
          icon: 'mdi:receipt',
          icon_bg: 'bg-yellow-500',
        },
      ];

      // 🔥 DEV SAFE RESET (IMPORTANT)
      await db.delete(transactions);

      await db.insert(transactions).values(transactionsData);

      return {
        success: true,
        message: 'Transactions seeded successfully',
      };
    } catch (error) {
      console.error('❌ TRANSACTION POST ERROR:', error);
      return {
        success: false,
        message: 'Transaction seed failed',
        error,
      };
    }
  }

  // ================= GET =================
  if (method === 'GET') {
    try {
      const trans = await db.select().from(transactions);

      return {
        success: true,
        transactions: trans,
      };
    } catch (error) {
      console.error('❌ TRANSACTION GET ERROR:', error);
      return {
        success: false,
        message: 'Transaction fetch failed',
        error,
      };
    }
  }

  // ================= FALLBACK =================
  return {
    success: false,
    message: 'Method not allowed',
  };
});
