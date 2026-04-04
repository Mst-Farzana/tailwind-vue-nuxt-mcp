// tests/setup.ts
import { vi } from 'vitest';
import { h } from 'vue';

vi.mock('@iconify/vue', () => ({
  Icon: {
    name: 'Icon',
    render: (props: any, ctx: any) => {
      return ctx?.slots?.default?.() || h('span', { 'data-icon': 'mocked' }, 'icon-placeholder');
    },
  },
}));

vi.mock('#app', () => ({
  useState: vi.fn((key, init) => ({ value: init?.() })),
  useRoute: vi.fn(() => ({ path: '/', params: {} })),
  useRouter: vi.fn(() => ({ push: vi.fn(), currentRoute: { value: {} } })),
  navigateTo: vi.fn(),
}));
