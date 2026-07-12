import { createError, defineEventHandler, readBody } from 'h3';

export default defineEventHandler(async event => {
  const storeId = process.env.SSLC_STORE_ID;
  const storePass = process.env.SSLC_STORE_PASS;

  if (!storeId || !storePass) {
    throw createError({ statusCode: 500, message: 'Payment gateway not configured' });
  }

  const body = await readBody(event);

  const allowedPlans: Record<string, number> = { pro: 39, standard: 19 };
  const plan = typeof body?.plan === 'string' ? body.plan : '';
  const amount = allowedPlans[plan];

  if (!amount) {
    throw createError({ statusCode: 400, message: 'Invalid plan selected' });
  }

  const baseUrl = process.env.NUXT_PUBLIC_SITE_URL || 'http://localhost:3000';

  const data = {
    store_id: storeId,
    store_passwd: storePass,

    total_amount: amount,
    currency: 'BDT',

    tran_id: 'txn_' + Date.now(),

    success_url: `${baseUrl}/payment/success`,
    fail_url: `${baseUrl}/payment/fail`,
    cancel_url: `${baseUrl}/payment/cancel`,

    product_name: plan,
    product_category: 'SaaS',
    product_profile: 'general',

    cus_name: typeof body?.cusName === 'string' ? body.cusName.slice(0, 100) : 'Customer',
    cus_email: typeof body?.cusEmail === 'string' ? body.cusEmail.slice(0, 200) : 'user@email.com',

    shipping_method: 'NO',
  };

  const response: any = await $fetch('https://sandbox.sslcommerz.com/gwprocess/v4/api.php', {
    method: 'POST',
    body: data,
  });

  return {
    url: response.GatewayPageURL,
  };
});
