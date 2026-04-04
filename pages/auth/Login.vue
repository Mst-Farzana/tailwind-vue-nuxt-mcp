<script setup lang="ts">
import { useRoute, useRouter } from '#imports';
import { ref } from 'vue';
import { useAuth } from '~/composables/useAuth';

interface AuthError {
  statusCode?: number;
  message: string;
  code?: string;
}

const router = useRouter();
const route = useRoute();

const email = ref('');
const password = ref('');
const remember = ref(false);
const loading = ref(false);
const errorMessage = ref('');

const { signIn, fetchSession } = useAuth();

const submit = async () => {
  loading.value = true;
  errorMessage.value = '';

  try {
    const result = await signIn(email.value, password.value);

    if (result.error) {
      if (typeof result.error === 'object' && result.error !== null) {
        const err = result.error as AuthError;
        if (err.statusCode === 401) {
          errorMessage.value = 'Invalid email or password';
        } else if (err.statusCode === 400) {
          errorMessage.value = 'Please fill in all fields';
        } else {
          errorMessage.value = err.message || 'Login failed';
        }
      } else {
        errorMessage.value = String(result.error);
      }
      return;
    }

    // Update session
    await fetchSession();

    // Redirect logic:
    // 1. check route.query.redirect (comes from any page, e.g., /pricing)
    // 2. fallback default is dashboard
    const redirectPath = (route.query.redirect as string) || '/sidebar/dashboard';
    router.push(redirectPath);
  } catch (err: any) {
    console.error('Login error:', err);
    errorMessage.value = 'Something went wrong. Please try again.';
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <form class="mx-auto w-full max-w-md rounded-xl bg-white p-5 shadow-lg" @submit.prevent="submit">
    <h2 class="mb-4 text-xl font-bold">Login</h2>

    <!-- Email -->
    <div class="mb-4">
      <input
        v-model="email"
        type="email"
        placeholder="Enter your email"
        class="w-full rounded-lg border px-4 py-2 focus:ring-2 focus:ring-purple-500 focus:outline-none"
        required
        autocomplete="email"
      />
    </div>

    <!-- Password -->
    <div class="mb-4">
      <input
        v-model="password"
        type="password"
        placeholder="••••••••"
        class="w-full rounded-lg border px-4 py-2 focus:ring-2 focus:ring-purple-500 focus:outline-none"
        required
        autocomplete="current-password"
      />
    </div>

    <!-- Remember + Forgot -->
    <div class="mb-6 flex items-center justify-between text-sm">
      <label class="flex cursor-pointer items-center text-sm">
        <input v-model="remember" type="checkbox" class="mr-2 rounded border-gray-300" />
        Remember me
      </label>
      <NuxtLink to="/auth/forgot-password" class="text-purple-600 hover:underline">
        Forgot password?
      </NuxtLink>
    </div>

    <!-- Buttons -->
    <div class="flex gap-3">
      <button
        type="submit"
        class="flex-1 rounded-lg bg-purple-600 py-2 text-white transition hover:bg-purple-700 disabled:cursor-not-allowed disabled:opacity-50"
        :disabled="loading"
      >
        {{ loading ? 'Logging in...' : 'Login' }}
      </button>

      <NuxtLink
        to="/auth/signup"
        class="flex-1 rounded-lg border border-purple-600 py-2 text-center text-purple-600 transition hover:bg-purple-50"
      >
        Sign up
      </NuxtLink>
    </div>

    <!-- Error Message -->
    <p v-if="errorMessage" class="mt-4 text-center text-sm text-red-500" role="alert">
      {{ errorMessage }}
    </p>
  </form>
</template>
