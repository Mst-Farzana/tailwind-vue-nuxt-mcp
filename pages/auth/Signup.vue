<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuth } from '~/composables/useAuth';

const form = ref({ name: '', email: '', password: '', confirm: '' });
const loading = ref(false);
const error = ref('');

const { signUp } = useAuth();
const router = useRouter();

const submit = async () => {
  error.value = '';

  if (!form.value.name || !form.value.email || !form.value.password || !form.value.confirm) {
    error.value = 'All fields are required';
    return;
  }

  if (form.value.password !== form.value.confirm) {
    error.value = 'Passwords do not match';
    return;
  }

  if (form.value.password.length < 8) {
    error.value = 'Password must be at least 8 characters';
    return;
  }

  loading.value = true;

  try {
    const result = await signUp({
      name: form.value.name,
      email: form.value.email,
      password: form.value.password,
    });

    if (result.error) {
      error.value = result.error.message;
      return;
    }

    // Redirect after successful signup
    router.push('/sidebar/auth');
  } catch (e: any) {
    error.value = 'Signup failed';
    console.error(e);
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <div class="mx-auto w-full max-w-sm">
    <form class="space-y-4" @submit.prevent="submit">
      <h2 class="text-2xl font-bold">Create Account</h2>

      <input v-model="form.name" placeholder="Full Name" class="input w-full" required />
      <input v-model="form.email" type="email" placeholder="Email" class="input w-full" required />
      <input
        v-model="form.password"
        type="password"
        placeholder="Password"
        class="input w-full"
        required
      />
      <input
        v-model="form.confirm"
        type="password"
        placeholder="Confirm Password"
        class="input w-full"
        required
      />

      <p v-if="error" class="error">{{ error }}</p>

      <button
        class="w-full rounded-lg bg-blue-600 py-2 text-white disabled:opacity-50"
        :disabled="loading"
      >
        {{ loading ? 'Creating...' : 'Sign Up' }}
      </button>
    </form>
  </div>
</template>

<style scoped>
.input {
  border: 1px solid #d1d5db;
  padding: 0.6rem;
  border-radius: 0.5rem;
}
.error {
  color: #ef4444;
  font-size: 0.875rem;
}
</style>
