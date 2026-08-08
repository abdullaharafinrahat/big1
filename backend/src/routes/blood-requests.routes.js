import { Router } from 'express';
import { z } from 'zod';
import * as controller from '../controllers/blood-requests.controller.js';
import { validateBody } from '../middleware/validate.middleware.js';
import { emergencyWriteLimiter } from '../middleware/rate-limit.middleware.js';

const router = Router();

const createRequestSchema = z.object({
  patientName: z.string().min(2, 'Patient name must be at least 2 characters'),
  bloodGroup: z.enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']),
  unitsCount: z.coerce.number().min(1).max(10).default(1),
  hospitalName: z.string().min(2),
  district: z.string().min(2),
  upazila: z.string().optional(),
  contactPhone: z.string().regex(/^01[3-9]\d{8}$/, 'Must be a valid Bangladesh 11-digit mobile number'),
  urgency: z.enum(['immediate', 'urgent', 'scheduled']).default('urgent'),
  reason: z.string().optional()
});

router.get('/', controller.listRequests);
router.get('/:id', controller.getRequest);
router.post('/', emergencyWriteLimiter, validateBody(createRequestSchema), controller.createRequest);
router.post('/:id/match', controller.matchRequest);

export default router;
