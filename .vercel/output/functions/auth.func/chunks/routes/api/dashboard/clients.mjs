import { sql } from 'drizzle-orm';
import { d as defineEventHandler, j as getQuery, b as db, k as clients$1 } from '../../../_/nitro.mjs';
import 'drizzle-orm/node-postgres';
import 'pg';
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

const clients = defineEventHandler(async (event) => {
  var _a, _b, _c, _d;
  const { page = "1", limit = "5" } = getQuery(event);
  const pageNumber = parseInt(page) || 1;
  const limitNumber = parseInt(limit) || 5;
  try {
    const data = await db.select().from(clients$1).limit(limitNumber).offset((pageNumber - 1) * limitNumber);
    if (data.length > 0) {
      const total = await db.select({ count: sql`count(*)` }).from(clients$1);
      const totalCount = (_b = (_a = total[0]) == null ? void 0 : _a.count) != null ? _b : 0;
      const totalPages2 = Math.ceil(totalCount / limitNumber);
      return {
        success: true,
        data,
        pagination: {
          currentPage: pageNumber,
          totalPages: totalPages2,
          totalItems: (_d = (_c = total[0]) == null ? void 0 : _c.count) != null ? _d : 0,
          itemsPerPage: limitNumber
        }
      };
    }
  } catch (err) {
    console.error("\u274C Error fetching from DB:", err);
  }
  const mockClients = [
    {
      id: 1,
      name: "Howell Hand",
      company: "Kiehn-Green",
      city: "Emelyside",
      progress: 70,
      created: "Mar 3, 2025",
      avatar: "https://picsum.photos/seed/howell/40/40",
      // ✅ স্পেস মুছুন
      via: "Turcotte"
    },
    {
      id: 2,
      name: "Hope Howe",
      company: "Nolan Inc",
      city: "Paristown",
      progress: 60,
      created: "Dec 1, 2025",
      avatar: "https://picsum.photos/seed/hope/40/40",
      // ✅ স্পেস মুছুন
      via: "Murazik - Graham"
    },
    {
      id: 3,
      name: "Nelson Jerde",
      company: "Nitzsche LLC",
      city: "Jailynbury",
      progress: 50,
      created: "May 18, 2025",
      avatar: "https://picsum.photos/seed/nelson/40/40",
      // ✅ স্পেস মুছুন
      via: "Fahey - Keebler"
    },
    {
      id: 4,
      name: "Kim Weimann",
      company: "Brown-Lueilwitz",
      city: "New Emie",
      progress: 40,
      created: "May 4, 2025",
      avatar: "https://picsum.photos/seed/kim/40/40",
      // ✅ স্পেস মুছুন
      via: "Collier - Hintz"
    },
    {
      id: 5,
      name: "Justice O'Reilly",
      company: "Lakin-Muller",
      city: "New Kacie",
      progress: 80,
      created: "Mar 27, 2025",
      avatar: "https://picsum.photos/seed/justice/40/40",
      // ✅ স্পেস মুছুন
      via: "Turcotte"
    },
    {
      id: 6,
      name: "Adrienne Mayer III",
      company: "Kozey, McLaughlin and Kuhn",
      city: "Howardbury",
      progress: 75,
      created: "Mar 29, 2025",
      avatar: "https://picsum.photos/seed/adrienne/40/40",
      // ✅ স্পেস মুছুন
      via: "Murazik - Graham"
    },
    {
      id: 7,
      name: "Mr. Julien Ebert",
      company: "Cormier LLC",
      city: "South Serenaburgh",
      progress: 65,
      created: "Jun 25, 2025",
      avatar: "https://picsum.photos/seed/julien/40/40",
      // ✅ স্পেস মুছুন
      via: "Fahey - Keebler"
    },
    {
      id: 8,
      name: "Lenna Smitham",
      company: "King Inc",
      city: "McCulloughfort",
      progress: 55,
      created: "Oct 8, 2025",
      avatar: "https://picsum.photos/seed/lenna/40/40",
      // ✅ স্পেস মুছুন
      via: "Turcotte"
    },
    {
      id: 9,
      name: "Travis Davis",
      company: "Leannon and Sons",
      city: "West Frankton",
      progress: 45,
      created: "Oct 20, 2025",
      avatar: "https://picsum.photos/seed/travis/40/40",
      // ✅ স্পেস মুছুন
      via: "Murazik - Graham"
    },
    {
      id: 10,
      name: "Prof. Esteban Steuber",
      company: "Langosh-Ernser",
      city: "East Sedrick",
      progress: 85,
      created: "May 16, 2025",
      avatar: "https://picsum.photos/seed/prof/40/40",
      // ✅ স্পেস মুছুন
      via: "Fahey - Keebler"
    },
    {
      id: 11,
      name: "Russell Goodwin V",
      company: "Nolan-Stracke",
      city: "Williamsonmouth",
      progress: 70,
      created: "Apr 22, 2025",
      avatar: "https://picsum.photos/seed/russell/40/40",
      // ✅ স্পেস মুছুন
      via: "Turcotte"
    },
    {
      id: 12,
      name: "Ms. Cassidy Wiegand DVM",
      company: "Kuhlman-Hahn",
      city: "New Ruthiehaven",
      progress: 60,
      created: "Sep 16, 2025",
      avatar: "https://picsum.photos/seed/cassidy/40/40",
      // ✅ স্পেস মুছুন
      via: "Murazik - Graham"
    },
    {
      id: 13,
      name: "Mr. Watson Brakus PhD",
      company: "Osinski, Bins and Kuhn",
      city: "Lake Gloria",
      progress: 50,
      created: "Jun 22, 2025",
      avatar: "https://picsum.photos/seed/watson/40/40",
      // ✅ স্পেস মুছুন
      via: "Fahey - Keebler"
    },
    {
      id: 14,
      name: "Mr. Garrison Friesen V",
      company: "VonRueden, Rippin and Pfeffer",
      city: "Port Cieloport",
      progress: 40,
      created: "Oct 19, 2025",
      avatar: "https://picsum.photos/seed/garrison/40/40",
      // ✅ স্পেস মুছুন
      via: "Turcotte"
    },
    {
      id: 15,
      name: "Ms. Sister Morar",
      company: "Gusikowski, Altenwerth and Abbott",
      city: "Lake Macville",
      progress: 80,
      created: "Jun 11, 2025",
      avatar: "https://picsum.photos/seed/sister/40/40",
      // ✅ স্পেস মুছুন
      via: "Murazik - Graham"
    },
    {
      id: 16,
      name: "Ms. Laisha Reinger",
      company: "Boehm PLC",
      city: "West Alexiemouth",
      progress: 75,
      created: "Nov 2, 2025",
      avatar: "https://picsum.photos/seed/laisha/40/40",
      // ✅ স্পেস মুছুন
      via: "Fahey - Keebler"
    },
    {
      id: 17,
      name: "Cameron Lind",
      company: "Tremblay, Padberg and Pouros",
      city: "Naderview",
      progress: 65,
      created: "Sep 14, 2025",
      avatar: "https://picsum.photos/seed/cameron/40/40",
      // ✅ স্পেস মুছুন
      via: "Turcotte"
    },
    {
      id: 18,
      name: "Sarai Little",
      company: "Deckow LLC",
      city: "Jeanieborough",
      progress: 55,
      created: "Jun 13, 2025",
      avatar: "https://picsum.photos/seed/sarai/40/40",
      // ✅ স্পেস মুছুন
      via: "Murazik - Graham"
    },
    {
      id: 19,
      name: "Shyann Kautzer",
      company: "Osinski, Boehm and Kihn",
      city: "New Alvera",
      progress: 45,
      created: "Feb 15, 2025",
      avatar: "https://picsum.photos/seed/shyann/40/40",
      // ✅ স্পেস মুছুন
      via: "Fahey - Keebler"
    },
    {
      id: 20,
      name: "Lorna Christiansen",
      company: "Altenwerth-Friesen",
      city: "Port Elbertland",
      progress: 85,
      created: "Mar 9, 2025",
      avatar: "https://picsum.photos/seed/lorna/40/40",
      // ✅ স্পেস মুছুন
      via: "Turcotte"
    }
  ];
  const start = (pageNumber - 1) * limitNumber;
  const end = start + limitNumber;
  const paginatedData = mockClients.slice(start, end);
  const totalPages = Math.ceil(mockClients.length / limitNumber);
  return {
    success: true,
    data: paginatedData,
    pagination: {
      currentPage: pageNumber,
      totalPages,
      totalItems: mockClients.length,
      itemsPerPage: limitNumber
    }
  };
});

export { clients as default };
//# sourceMappingURL=clients.mjs.map
