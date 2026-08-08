import { Router } from 'express';
import * as paymentService from '../services/payments/payments.service.js';

const router = Router();

router.post('/donate', async (req, res, next) => {
  try {
    const result = await paymentService.initiateDonationPayment(req.body);
    res.json({ success: true, data: result });
  } catch (err) {
    next(err);
  }
});

router.post('/webhook', async (req, res, next) => {
  try {
    const result = await paymentService.verifyPaymentWebhook(req.body);
    res.json({ success: true, data: result });
  } catch (err) {
    next(err);
  }
});

export default router;
