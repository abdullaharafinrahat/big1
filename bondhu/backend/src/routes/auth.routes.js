const router = require('express').Router();
const controller = require('../controllers/auth.controller');
const { authenticate } = require('../middleware/auth.middleware');

router.post('/register', controller.register);
router.post('/login', controller.login);
router.post('/otp/request', controller.requestOtp);
router.post('/otp/verify', controller.verifyOtp);
router.get('/me', authenticate, controller.me);

module.exports = router;
