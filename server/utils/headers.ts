import type { H3Event } from 'h3';
import { getRequestHeaders } from 'h3';

export function getAuthHeaders(event: H3Event) {
  const raw = getRequestHeaders(event);

  const clean: Record<string, string> = {};

  for (const key in raw) {
    const value = raw[key];
    if (value !== undefined) {
      clean[key] = value;
    }
  }

  return new Headers(clean);
}
