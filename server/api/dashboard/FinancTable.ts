import { formatDistanceToNowStrict } from 'date-fns';
import { defineEventHandler } from 'h3';
import { db } from '~/server/db';
import { financetable } from '~/server/db/schemas/index';

function formatUSD(value: string | number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  }).format(Number(value));
}

function formatDateAgo(date: Date): string {
  try {
    return formatDistanceToNowStrict(date, { unit: 'day' }) + ' ago';
  } catch {
    return 'Just now';
  }
}

export default defineEventHandler(async () => {
  try {
    const dbData = await db.select().from(financetable);

    if (dbData.length > 0) {
      const formattedData = dbData.map(tx => ({
        id: tx.id,
        amount: formatUSD(tx.amount),
        date: formatDateAgo(tx.date), // tx.date is Date object
        via: tx.via,
        account: tx.account,
        action: tx.action,
        icon: tx.icon, // e.g., "heroicons:arrow-down-circle"
      }));

      return { success: true, data: formattedData };
    }
  } catch (err) {
    console.error('❌ DB Error:', err);
  }

  // Fallback mock (Iconify-ready)
  const mockTransactions = [
    {
      id: 1,
      amount: '$375.53',
      date: '3 days ago',
      via: 'Turcotte',
      account: 'Home Loan Account',
      action: 'Deposit',
      icon: 'heroicons:arrow-down-circle',
    },
    {
      id: 2,
      amount: '$470.26',
      date: '3 days ago',
      via: 'Murazik - Graham',
      account: 'Savings Account',
      action: 'Payment',
      icon: 'heroicons:credit-card',
    },
    {
      id: 3,
      amount: '$971.34',
      date: '5 days ago',
      via: 'Fahey - Keebler',
      account: 'Checking Account',
      action: 'Invoice',
      icon: 'heroicons:document-text',
    },
    {
      id: 4,
      amount: '$374.63',
      date: '7 days ago',
      via: 'Collier - Hintz',
      account: 'Auto Loan Account',
      action: 'Withdrawal',
      icon: 'heroicons:arrow-up-circle',
    },
  ];

  return { success: true, data: mockTransactions };
});
