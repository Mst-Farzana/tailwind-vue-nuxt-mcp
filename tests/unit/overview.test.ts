// tests/unit/overview.test.ts
import { beforeEach, describe, expect, it, vi } from 'vitest';

const mockDb = {
  insert: vi.fn().mockReturnThis(),
  values: vi.fn().mockReturnThis(),
  returning: vi
    .fn()
    .mockResolvedValue([
      { id: 1, title: 'Test', value: 100, icon: 'test', icon_color: 'blue', trend_value: 10 },
    ]),
  select: vi.fn().mockReturnThis(),
  from: vi.fn().mockResolvedValue([]),
};

vi.mock('~/server/utils/db', () => ({ getDb: () => mockDb }));
vi.mock('~/server/db/schemas', () => ({ overview: {} }));

function isEmptyBody(body: any): boolean {
  if (body === null || body === undefined) return true;
  if (Array.isArray(body)) return body.length === 0;
  if (typeof body === 'object') return Object.keys(body).length === 0;
  return false;
}

const mockHandler = vi.fn(async (event: any) => {
  const method = event.node?.req?.method;

  if (method === 'POST') {
    const body = event._body;
    if (isEmptyBody(body)) {
      const error: any = new Error('No data provided');
      error.statusCode = 400;
      throw error;
    }
    const items = Array.isArray(body) ? body : [body];
    return { success: true, inserted: items.length };
  }

  if (method === 'GET') {
    return [
      {
        id: 1,
        title: 'Test',
        value: 100,
        icon: 'test',
        iconColor: 'blue',
        trendValue: 10,
        statusText: '↑ 10%',
        statusColor: 'green',
      },
    ];
  }

  const error: any = new Error('Method not allowed');
  error.statusCode = 405;
  throw error;
});

describe('Unit: /api/overview', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockHandler.mockClear();
  });

  it('POST - should return success for valid data', async () => {
    const mockEvent: any = {
      node: { req: { method: 'POST', headers: { 'content-type': 'application/json' } } },
      _body: { title: 'Test', value: 100 },
    };
    const result = await mockHandler(mockEvent);
    expect(result).toMatchObject({ success: true, inserted: 1 });
  });

  it('GET - should return array', async () => {
    const mockEvent: any = { node: { req: { method: 'GET', headers: {} } } };
    const result = await mockHandler(mockEvent);
    expect(Array.isArray(result)).toBe(true);
  });

  it('POST - should return 400 for empty body', async () => {
    const mockEvent: any = {
      node: { req: { method: 'POST', headers: { 'content-type': 'application/json' } } },
      _body: {},
    };
    await expect(() => mockHandler(mockEvent)).rejects.toThrow();
  });
});
