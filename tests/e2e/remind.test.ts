// tests/e2e/remind.test.ts
import { setup } from '@nuxt/test-utils/e2e';
import { ofetch } from 'ofetch';
import { beforeAll, describe, expect, it } from 'vitest';

describe('POST /api/auth/remind', () => {
  const apiFetch = ofetch.create({
    baseURL: process.env.NUXT_TEST_SERVER_URL || 'http://localhost:3000',
    retry: 0,
    timeout: 10000,
  });

  beforeAll(async () => {
    await setup({
      server: true,
      browser: false,
      env: {
        NODE_ENV: 'test',
        NUXT_SESSION_PASSWORD: 'test-session-password-min-32-chars-long',
      },
    });

    await new Promise(resolve => setTimeout(resolve, 1000));
  }, 120000);

  it('should send reminder successfully', async () => {
    const res = await apiFetch('/api/auth/remind', {
      method: 'POST',
      body: { username: 'testuser' },
    });

    expect(res.success).toBe(true);
    expect(res.message).toContain('testuser');
  });

  it('should return 400 if username is empty', async () => {
    try {
      await apiFetch('/api/auth/remind', {
        method: 'POST',
        body: { username: '' },
      });
      expect.fail('Expected 400 error but request succeeded');
    } catch (error: any) {
      expect(error.statusCode).toBe(400);
      expect(error.message).toContain('valid username');
    }
  });
});
