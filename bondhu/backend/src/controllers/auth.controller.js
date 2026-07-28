const auth = require('../services/auth.service');
const otp = require('../services/otp.service');

exports.register = async (req, res, next) => {
  try {
    res.status(201).json(await auth.register(req.body));
  } catch (error) {
    next(error);
  }
};

exports.login = async (req, res, next) => {
  try {
    res.json(await auth.login(req.body));
  } catch (error) {
    next(error);
  }
};

exports.me = (req, res) => res.json({ user: req.user });

exports.requestOtp = async (req, res, next) => {
  try {
    const target = req.body.target || req.body.phone || req.body.email;
    res.json(await otp.sendOtp(target, req.body));
  } catch (error) {
    next(error);
  }
};

exports.verifyOtp = async (req, res, next) => {
  try {
    const target = req.body.target || req.body.phone || req.body.email;
    const verified = await otp.verifyOtp(target, req.body.code);
    if (!verified) throw Object.assign(new Error('Invalid or expired verification code'), { status: 400 });
    res.json({ verified: true, target: otp.normalizeTarget(target) });
  } catch (error) {
    next(error);
  }
};
