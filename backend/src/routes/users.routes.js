import { Router } from 'express';
import * as controller from '../controllers/users.controller.js';

const router = Router();

router.get('/me', controller.getProfile);
router.patch('/me', controller.updateProfile);

export default router;
