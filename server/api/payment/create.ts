export default defineEventHandler(async event => {
  const body = await readBody(event);

  const baseUrl = process.env.NUXT_PUBLIC_SITE_URL || 'http://localhost:3000';

  const data = {
    store_id: process.env.SSLC_STORE_ID,
    store_passwd: process.env.SSLC_STORE_PASS,

    total_amount: body.plan === 'pro' ? 39 : 19,
    currency: 'BDT',

    tran_id: 'txn_' + Date.now(),

    success_url: `${baseUrl}/payment/success`,
    fail_url: `${baseUrl}/payment/fail`,
    cancel_url: `${baseUrl}/payment/cancel`,

    product_name: body.plan,
    product_category: 'SaaS',
    product_profile: 'general',

    cus_name: body.cusName || 'Customer',
    cus_email: body.cusEmail || 'user@email.com',

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
