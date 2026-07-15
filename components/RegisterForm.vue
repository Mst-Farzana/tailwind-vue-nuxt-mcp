<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod';
import { useField, useForm } from 'vee-validate';
import { z } from 'zod';

const schema = z.object({
  name: z.string().min(3, 'Name must be at least 3 characters'),
  email: z.string().email('Enter a valid email'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

const { handleSubmit, errors } = useForm({
  validationSchema: toTypedSchema(schema),
});

const { value: name } = useField('name');
const { value: email } = useField('email');
const { value: password } = useField('password');

const onSubmit = handleSubmit(data => {
  alert('Form Submitted: ' + JSON.stringify(data, null, 2));
});
</script>

<template>
  <form
    class="mx-auto max-w-sm space-y-4 dark:bg-gray-900 dark:text-gray-100"
    @submit.prevent="onSubmit"
  >
    <div>
      <label>Name</label>
      <input v-model="name" class="input input-bordered w-full" />
      <p class="text-sm text-red-500">{{ errors.name }}</p>
    </div>

    <div>
      <label>Email</label>
      <input v-model="email" class="input input-bordered w-full" />
      <p class="text-sm text-red-500">{{ errors.email }}</p>
    </div>

    <div>
      <label>Password</label>
      <input v-model="password" type="password" class="input input-bordered w-full" />
      <p class="text-sm text-red-500">{{ errors.password }}</p>
    </div>

    <button class="btn btn-primary w-full">Register</button>
  </form>
</template>
