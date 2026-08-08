export async function initiateDonationPayment({ amount, donorName, phone, foundationId, paymentMethod }) {
  const transactionId = `TRX-${Date.now()}-${Math.floor(Math.random() * 10000)}`;
  return {
    success: true,
    transactionId,
    amount,
    currency: 'BDT',
    paymentMethod: paymentMethod || 'bkash',
    redirectGatewayUrl: `https://payment.bondhu.local/checkout?trx=${transactionId}`,
    status: 'initiated'
  };
}

export async function verifyPaymentWebhook({ transactionId, status, signature }) {
  return {
    verified: true,
    transactionId,
    status: status === 'COMPLETED' ? 'success' : 'failed',
    timestamp: new Date().toISOString()
  };
}
