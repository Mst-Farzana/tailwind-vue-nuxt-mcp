// server/api/dashboard/products/index.ts
import { defineEventHandler } from 'h3';
import { db } from '~/server/db';
import { products } from '~/server/db/schemas/index';

export default defineEventHandler(async () => {
  try {
    // ✅ Try to fetch from database
    const data = await db.select().from(products);

    // ✅ If data exists, return it
    if (data.length > 0) {
      return {
        success: true,
        data,
      };
    }
  } catch (err) {
    console.error('❌ Error fetching from DB:', err);
  }

  // ✅ Fallback: Return mock data
  const mockProducts = [
    {
      id: 1,
      name: 'Refined Soft Chicken',
      date: '5 days ago',
      tags: ['Licensed', 'Rubber', 'Hat'],
      price: '$431',
      avatar: 'https://picsum.photos/seed/chicken/40/40',
    },
    {
      id: 2,
      name: 'Intelligent Metal Bacon',
      date: '4 days ago',
      tags: ['Rustic', 'Plastic', 'Sausages'],
      price: '$184',
      avatar: 'https://picsum.photos/seed/bacon/40/40',
    },
    {
      id: 3,
      name: 'Rustic Wooden Shoes',
      date: '2 days ago',
      tags: ['Awesome', 'Rubber', 'Shoes'],
      price: '$788',
      avatar: 'https://picsum.photos/seed/shoes/40/40',
    },
    {
      id: 4,
      name: 'Ergonomic Frozen Bike',
      date: '7 days ago',
      tags: ['Unbranded', 'Concrete', 'Bike'],
      price: '$604',
      avatar: 'https://picsum.photos/seed/bike/40/40',
    },
    {
      id: 5,
      name: 'Rustic Rubber Tuna',
      date: '4 days ago',
      tags: ['Sleek', 'Plastic', 'Pants'],
      price: '$172',
      avatar: 'https://picsum.photos/seed/tuna/40/40',
    },
    {
      id: 6,
      name: 'Incredible Soft Keyboard',
      date: '7 days ago',
      tags: ['Sleek', 'Fresh', 'Shoes'],
      price: '$294',
      avatar: 'https://picsum.photos/seed/keyboard/40/40',
    },
  ];

  return {
    success: true,
    data: mockProducts,
  };
});
