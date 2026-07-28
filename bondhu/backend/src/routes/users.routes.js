const router = require('express').Router();
const { authenticate } = require('../middleware/auth.middleware');
const users = require('../services/users.service');

router.get('/me', authenticate, async (req, res, next) => {
  try {
    res.json(await users.getMe(req.user.sub || req.user.id));
  } catch (error) {
    next(error);
  }
});

router.patch('/me', authenticate, async (req, res, next) => {
  try {
    res.json(await users.updateProfile(req.user.sub || req.user.id, req.body));
  } catch (error) {
    next(error);
  }
});

module.exports = router;
