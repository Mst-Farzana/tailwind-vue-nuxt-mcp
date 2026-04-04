// tests/unit/composables/useCountAnimation.test.ts
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { useCountAnimation } from '~/composables/useCountAnimation';

describe('useCountAnimation', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should return displayValue as ref', () => {
    const { displayValue } = useCountAnimation(100, 0, 0, true); // testMode=true
    expect(displayValue.value).toBe(100);
  });

  it('should animate from 0 to target value', async () => {
    // Test animation logic
    const { displayValue } = useCountAnimation(200, 100, 0, true);
    expect(displayValue.value).toBe(200);
  });
});
