// server/api/dashboard/finance/index.ts
import { defineEventHandler } from 'h3';

export default defineEventHandler(async () => {
  // ✅ Mock Data (Database-এর পরিবর্তে)
  const financeData = {
    unpaidBalance: '$120,489.67',
    pendingTransactions: '$756.49',
    pendingWithdrawals: '$50,124.28',
    stats: [
      {
        label: 'Unpaid balance',
        value: '$120,489.67',
        icon: '💼',
        color: 'bg-blue-500',
      },
      {
        label: 'Pending transactions',
        value: '$756.49',
        icon: '📅',
        color: 'bg-yellow-500',
      },
      {
        label: 'Pending withdrawals',
        value: '$50,124.28',
        icon: '💸',
        color: 'bg-red-500',
      },
    ],
  };

  return {
    success: true,
    data: financeData,
  };
});
