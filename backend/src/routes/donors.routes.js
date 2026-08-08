import { Router } from 'express';
import { z } from 'zod';
import * as controller from '../controllers/donors.controller.js';
import { validateBody } from '../middleware/validate.middleware.js';

const router = Router();

const createDonorSchema = z.object({
  name: z.string().min(2),
  bloodGroup: z.enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']),
  phone: z.string().regex(/^01[3-9]\d{8}$/, 'Must be a valid 11-digit Bangladesh phone number'),
  district: z.string().min(2),
  upazila: z.string().optional(),
  lastDonationDate: z.string().optional()
});

router.get('/', controller.listDonors);
router.get('/:id', controller.getDonor);
router.post('/', validateBody(createDonorSchema), controller.createDonor);

export default router;
