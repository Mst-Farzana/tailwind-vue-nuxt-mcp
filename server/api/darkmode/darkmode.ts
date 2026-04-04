import { defineEventHandler, readBody } from 'h3';

let featureState = {
  darkMode: false,
  notifications: false,
};

export default defineEventHandler(async event => {
  if (event.method === 'POST') {
    const body = await readBody(event);

    featureState = {
      darkMode: Boolean(body.darkMode),
      notifications: Boolean(body.notifications),
    };
  }

  return {
    success: true,
    data: featureState,
  };
});
