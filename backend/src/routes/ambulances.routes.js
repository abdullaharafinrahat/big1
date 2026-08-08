import { Router } from 'express';
import * as controller from '../controllers/ambulances.controller.js';

const router = Router();

router.get('/', controller.listAmbulances);
router.get('/:id', controller.getAmbulance);

export default router;
