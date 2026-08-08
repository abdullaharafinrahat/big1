import { Router } from 'express';
import * as controller from '../controllers/hospitals.controller.js';

const router = Router();

router.get('/', controller.listHospitals);
router.get('/:id', controller.getHospital);

export default router;
