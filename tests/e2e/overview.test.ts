// tests/e2e/overview.test.ts
import { setup } from '@nuxt/test-utils/e2e';
import { ofetch } from 'ofetch'; // ✅ সরাসরি ofetch ইম্পোর্ট করুন
import { beforeAll, describe, expect, it } from 'vitest';

describe('E2E: /api/overview', () => {
  // ✅ কাস্টম $fetch ইনস্ট্যান্স তৈরি করুন
  const apiFetch = ofetch.create({
    baseURL: process.env.NUXT_TEST_SERVER_URL || 'http://localhost:3000',
    retry: 0, // টেস্টে রিট্রাই বন্ধ রাখুন
    timeout: 10000,
  });

  beforeAll(async () => {
    await setup({
      server: true,
      browser: false,
      env: {
        NODE_ENV: 'test',
        DATABASE_URL: process.env.DATABASE_URL_TEST || process.env.DATABASE_URL,
        NUXT_SESSION_PASSWORD: 'test-session-password-min-32-chars-long',
      },
    });

    // ✅ সার্ভার রেডি হওয়ার জন্য অপেক্ষা করুন
    await new Promise(resolve => setTimeout(resolve, 1000));
  }, 120000);

  // ========================================
  // TEST CASES
  // ========================================

  it('GET /api/overview - should return array', async () => {
    const res = await apiFetch('/api/overview', { method: 'GET' });
    expect(Array.isArray(res)).toBe(true);
  });

  it('POST /api/overview - should insert single item', async () => {
    const newItem = {
      title: 'Test Metric',
      value: 100,
      icon: 'i-heroicons-chart-bar',
      icon_color: 'blue',
      trend_value: 15,
    };

    const res = await apiFetch('/api/overview', {
      method: 'POST',
      body: newItem,
    });

    expect(res).toMatchObject({ success: true, inserted: 1 });
  });

  it('POST /api/overview - should return 400 for empty body', async () => {
    try {
      await apiFetch('/api/overview', { method: 'POST', body: {} });
      expect.fail('Expected 400 error but request succeeded');
    } catch (error: any) {
      expect(error.statusCode).toBe(400);
      expect(error.data.message).toContain('No data provided');
    }
  });
});
