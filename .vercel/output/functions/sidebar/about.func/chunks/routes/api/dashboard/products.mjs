import { d as defineEventHandler, b as db, m as products$1 } from '../../../_/nitro.mjs';
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

const products = defineEventHandler(async () => {
  try {
    const data = await db.select().from(products$1);
    if (data.length > 0) {
      return {
        success: true,
        data
      };
    }
  } catch (err) {
    console.error("\u274C Error fetching from DB:", err);
  }
  const mockProducts = [
    {
      id: 1,
      name: "Refined Soft Chicken",
      date: "5 days ago",
      tags: ["Licensed", "Rubber", "Hat"],
      price: "$431",
      avatar: "https://picsum.photos/seed/chicken/40/40"
    },
    {
      id: 2,
      name: "Intelligent Metal Bacon",
      date: "4 days ago",
      tags: ["Rustic", "Plastic", "Sausages"],
      price: "$184",
      avatar: "https://picsum.photos/seed/bacon/40/40"
    },
    {
      id: 3,
      name: "Rustic Wooden Shoes",
      date: "2 days ago",
      tags: ["Awesome", "Rubber", "Shoes"],
      price: "$788",
      avatar: "https://picsum.photos/seed/shoes/40/40"
    },
    {
      id: 4,
      name: "Ergonomic Frozen Bike",
      date: "7 days ago",
      tags: ["Unbranded", "Concrete", "Bike"],
      price: "$604",
      avatar: "https://picsum.photos/seed/bike/40/40"
    },
    {
      id: 5,
      name: "Rustic Rubber Tuna",
      date: "4 days ago",
      tags: ["Sleek", "Plastic", "Pants"],
      price: "$172",
      avatar: "https://picsum.photos/seed/tuna/40/40"
    },
    {
      id: 6,
      name: "Incredible Soft Keyboard",
      date: "7 days ago",
      tags: ["Sleek", "Fresh", "Shoes"],
      price: "$294",
      avatar: "https://picsum.photos/seed/keyboard/40/40"
    }
  ];
  return {
    success: true,
    data: mockProducts
  };
});

export { products as default };
//# sourceMappingURL=products.mjs.map
