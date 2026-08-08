import { Router } from 'express';
import * as controller from '../controllers/cms.controller.js';

const router = Router();

router.get('/news', controller.listNews);
router.post('/news', controller.createNews);

export default router;
