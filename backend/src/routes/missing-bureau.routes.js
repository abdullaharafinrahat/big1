import { Router } from 'express';
import { z } from 'zod';
import * as controller from '../controllers/missing-bureau.controller.js';
import { validateBody } from '../middleware/validate.middleware.js';

const router = Router();

const createReportSchema = z.object({
  name: z.string().min(2),
  age: z.coerce.number().min(1).max(120),
  lastSeenLocation: z.string().min(3),
  contactPhone: z.string().regex(/^01[3-9]\d{8}$/, 'Must be a valid 11-digit phone number'),
  description: z.string().min(10)
});

router.get('/', controller.listReports);
router.post('/', validateBody(createReportSchema), controller.createReport);

export default router;
