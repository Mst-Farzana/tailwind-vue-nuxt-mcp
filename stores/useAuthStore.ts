// import { defineStore } from 'pinia';
// import { z } from 'zod';

// // Zod schema for user
// const userSchema = z.object({
//   name: z.string().min(1),
//   email: z.string().email(),
// });

// export type User = z.infer<typeof userSchema>;

// export const useUser = defineStore('user', {
//   state: () => ({
//     user: null as User | null,
//   }),

//   actions: {
//     setUser(payload: User) {
//       const parsed = userSchema.safeParse(payload);

//       if (!parsed.success) {
//         console.error(parsed.error);
//         return;
//       }

//       this.user = parsed.data;
//     },
//   },
// });
