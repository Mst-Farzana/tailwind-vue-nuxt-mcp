// tests/e2e/overview.frontend.test.ts
import { setup } from '@nuxt/test-utils/e2e';
import { ofetch } from 'ofetch';
import { beforeAll, describe, expect, it } from 'vitest';

describe('Frontend E2E: /api/overview', () => {
  const api = ofetch.create({ baseURL: 'http://localhost:3000' });

  // Server setup directly in the test file
  beforeAll(async () => {
    await setup({
      server: true,
      browser: false,
      env: {
        NODE_ENV: 'test',
        DATABASE_URL: process.env.DATABASE_URL_TEST,
        NUXT_SESSION_PASSWORD: 'test-session-password-min-32-chars',
      },
    });
  }, 120_000); // max wait 120s

  it('GET /api/overview returns array', async () => {
    const res = await api('/api/overview');
    expect(Array.isArray(res)).toBe(true);
  });

  it('POST /api/overview inserts an item', async () => {
    const newItem = {
      title: 'Test Metric',
      value: 50,
      icon: 'i-heroicons-chart-bar',
      icon_color: 'blue',
      trend_value: 5,
    };
    const res = await api('/api/overview', { method: 'POST', body: newItem });
    expect(res).toMatchObject({ success: true, inserted: 1 });
  });
});
