// tests/integration/overviewCardWithAnimation.test.ts (ঐচ্ছিক)
import { mount } from '@vue/test-utils';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import OverviewCard from '~/components/overview/card.vue';
// ✅ Composable ইম্পোর্ট করবেন না (মক করবেন না)

describe('OverviewCard.vue - Integration Test', () => {
  beforeEach(() => {
    // RequestAnimationFrame মক করুন
    vi.useFakeTimers();
  });

  it('should animate value with real composable', async () => {
    const wrapper = mount(OverviewCard, {
      props: {
        title: 'Revenue',
        value: '200',
        icon: 'mdi:cash',
        iconColor: 'blue',
        statusColor: 'green',
        statusText: '↑ 10%',
        index: 0,
      },
    });

    // শুরুতে 0 থাকবে
    expect(wrapper.text()).toContain('0');

    // টাইম ফরওয়ার্ড করুন
    await vi.advanceTimersByTimeAsync(1500);

    // শেষে 200 হবে
    expect(wrapper.text()).toContain('200');
  });
});
