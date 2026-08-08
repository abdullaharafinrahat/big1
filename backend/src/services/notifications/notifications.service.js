import { env } from '../../config/env.js';

export async function sendEmergencySms(recipientPhone, message) {
  if (env.SMS_GATEWAY_PROVIDER === 'mock' || !env.SMS_API_KEY) {
    console.log(`[MOCK SMS] To: ${recipientPhone} | Content: "${message}"`);
    return { success: true, mode: 'mock', recipient: recipientPhone };
  }
  // Production SMS Gateway plug-in point (SSL Wireless / Reve / Twilio)
  return { success: true, mode: env.SMS_GATEWAY_PROVIDER, recipient: recipientPhone };
}

export async function sendPushNotification(deviceToken, title, body) {
  console.log(`[PUSH NOTIFICATION] Token: ${deviceToken} | ${title}: ${body}`);
  return { success: true, mode: 'mock' };
}
