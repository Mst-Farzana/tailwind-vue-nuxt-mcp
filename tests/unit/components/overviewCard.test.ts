/// <reference types="vitest/globals" />

// তারপর আপনার কোড
import { vi } from 'vitest';

import { mount } from '@vue/test-utils';
import OverviewCard from '~/components/overview/card.vue';

vi.mock('@iconify/vue', () => ({
  Icon: {
    name: 'Icon',
    props: ['icon', 'class', 'className'],
    render: (props: any) => ({
      type: 'span',
      props: {
        class: props.class,
        'data-icon': props.icon,
      },
      children: 'icon-placeholder',
    }),
  },
}));

vi.mock('~/composables/useCountAnimation', () => ({
  useCountAnimation: (value: number) => ({
    displayValue: value,
  }),
}));

describe('OverviewCard.vue', () => {
  it('renders correctly with mocked composable', () => {
    const wrapper = mount(OverviewCard, {
      props: {
        title: 'Revenue',
        value: '200',
        icon: 'mdi:currency-usd',
        iconColor: 'blue',
        statusColor: 'green',
        statusText: '↑ 10%',
        index: 0,
      },
    });

    expect(wrapper.text()).toContain('200');
    expect(wrapper.text()).toContain('Revenue');
    expect(wrapper.text()).toContain('↑ 10%');
  });
});
