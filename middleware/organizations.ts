import { getRequestHeaders } from 'h3';
import { auth } from '~/server/auth';

export const getUser = async (event: any) => {
  const headers = getRequestHeaders(event);

  const session = await auth.api.getSession({
    headers: headers as any, // ✅ Type assertion যোগ করুন
  });

  return session?.user || null;
};
