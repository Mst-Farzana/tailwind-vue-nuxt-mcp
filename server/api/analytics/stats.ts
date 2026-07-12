import { defineEventHandler } from 'h3';

// Dummy stats data for GitHub Pages deployment
const dummyStats = {
  revenue: 45231.89,
  growth: 20.1,
  users: 2352,
  orders: 12405,
  series: [
    { name: 'Revenue', data: [10, 41, 35, 51, 49, 62, 69, 91, 148] },
    { name: 'Orders', data: [5, 20, 17, 25, 24, 31, 35, 46, 74] },
  ],
};

export default defineEventHandler(async () => {
  try {
    // In a real application, you would fetch actual stats from the database
    // For now, return dummy data
    return dummyStats;
  } catch (error) {
    console.warn('Analytics stats API error:', error);
    // Return dummy data even on error to allow page to render
    return dummyStats;
  }
});
