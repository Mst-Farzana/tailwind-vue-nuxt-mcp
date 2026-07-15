<script setup lang="ts">
import ActionDrop from '@/components/dashboard/actionDrop.vue';
import { Icon } from '@iconify/vue';
import { onMounted, ref } from 'vue';

interface Product {
  id: number;
  name: string;
  date: string;
  tags: string[];
  price: string;
  avatar: string;
}

const products = ref<Product[]>([]);
const loading = ref(false);

const fetchProducts = async () => {
  loading.value = true;
  try {
    const res = await $fetch<{ data: Product[] }>('/api/dashboard/products');
    products.value = res.data;
  } finally {
    loading.value = false;
  }
};

const handleProductAction = (productId: number, index: number) => {
  if (index === 0) console.log('View', productId);
  if (index === 1) console.log('Edit', productId);
  if (index === 2) console.log('Delete', productId);
};
const getTagColor = (tag: string) => {
  const greenTags = ['Awesome', 'Unbranded', 'Sleek', 'Rustic'];
  const blueTags = ['Rubber', 'Concrete', 'Plastic', 'Fresh'];
  const yellowTags = ['Shoes', 'Bike', 'Pants', 'Hat', 'Sausages'];

  if (greenTags.includes(tag)) return 'bg-green-500 text-white';
  if (blueTags.includes(tag)) return 'bg-blue-500 text-white';
  if (yellowTags.includes(tag)) return 'bg-yellow-500 text-white';

  // Default fallback
  return 'bg-gray-200 text-gray-800';
};
onMounted(fetchProducts);
</script>

<template>
  <div class="min-h-screen bg-gray-50 p-6 dark:bg-gray-900 dark:text-gray-100">
    <!-- Header -->
    <div class="mb-8 flex items-center justify-between">
      <div class="flex items-center justify-center gap-2">
        <svg viewBox="0 0 24 24" class="h-6 w-6" fill="currentColor">
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="12" x2="12" y2="20" stroke="white" stroke-width="2" />
          <line x1="12" y1="12" x2="20" y2="12" stroke="white" stroke-width="2" />
        </svg>
        <h1 class="text-2xl font-bold">Products</h1>
      </div>
      <button class="rounded-lg bg-gray-100 px-4 py-2 text-gray-900 hover:bg-gray-200">
        <Icon icon="mdi:cog" class="h-4 w-4" />
      </button>
    </div>

    <!-- Products -->
    <div class="space-y-4">
      <div
        v-for="product in products"
        :key="product.id"
        class="flex items-center justify-between rounded-lg bg-white p-4 shadow"
      >
        <!-- LEFT -->
        <div class="flex items-center gap-4">
          <img :src="product.avatar" class="h-10 w-10 rounded-full" />
          <div>
            <div class="font-medium">{{ product.name }}</div>
            <div class="text-sm text-gray-500">{{ product.date }}</div>
          </div>
        </div>

        <!-- RIGHT -->
        <div class="flex items-center gap-3">
          <span
            v-for="tag in product.tags"
            :key="tag"
            class="rounded-full px-2 py-1 text-xs font-medium"
            :class="getTagColor(tag)"
          >
            {{ tag }}
          </span>

          <div class="font-bold">{{ product.price }}</div>

          <ActionDrop
            :options="[
              { label: 'View', icon: 'mdi:eye' },
              { label: 'Edit', icon: 'mdi:pencil' },
              { label: 'Delete', icon: 'mdi:delete', isLast: true },
            ]"
            :on-action="index => handleProductAction(product.id, index)"
          />
        </div>
      </div>
    </div>
  </div>
</template>
