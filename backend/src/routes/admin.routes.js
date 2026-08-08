import { Router } from 'express';
import * as controller from '../controllers/admin.controller.js';

const router = Router();

router.get('/stats', controller.getDashboardStats);
router.patch('/requests/:id/status', controller.moderateRequest);

export default router;
