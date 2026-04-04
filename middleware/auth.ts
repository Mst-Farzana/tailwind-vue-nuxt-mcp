// middleware/auth.global.ts
export default defineNuxtRouteMiddleware((to, _from) => {
  if (import.meta.server) return;

  const { session } = useAuth();

  const protectedRoutes = ['/dashboard', '/billing', '/settings', '/organization', '/subscription'];
  const publicAuthRoutes = ['/login', '/signup', '/register'];

  // ✅ প্রোটেক্টেড পেজ → লগইন না থাকলে রিডাইরেক্ট
  if (protectedRoutes.some(route => to.path.startsWith(route)) && !session.value?.user) {
    return navigateTo(`/login?redirect=${to.fullPath}`);
  }

  // ✅ লগইন/সাইনআপ পেজ → অলরেডি লগইন করা → ড্যাশবোর্ডে রিডাইরেক্ট
  if (publicAuthRoutes.includes(to.path) && session.value?.user) {
    return navigateTo('/dashboard');
  }
});
