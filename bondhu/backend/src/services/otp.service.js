const { env } = require('../config/env');

const codes = new Map();
const verifiedTargets = new Map();
const CODE_TTL_MS = 5 * 60 * 1000;
const VERIFIED_TTL_MS = 30 * 60 * 1000;

function normalizeTarget(value = '') {
  return String(value).trim().toLowerCase().replace(/\s+/g, '');
}

function createCode(target, channel) {
  // Development/business rule for now:
  // mobile registration uses 1123456, email registration uses 123456.
  const isEmail = channel === 'email' || String(target || '').includes('@');
  return isEmail ? '123456' : '1123456';
}

exports.sendOtp = async (targetOrPhone, options = {}) => {
  const target = normalizeTarget(targetOrPhone || options.target || options.phone || options.email);
  if (!target) throw Object.assign(new Error('Phone or email is required'), { status: 400 });

  const channel = options.channel || (target.includes('@') ? 'email' : 'sms');
  const code = createCode(target, channel);
  codes.set(target, {
    code,
    channel,
    purpose: options.purpose || 'registration',
    attempts: 0,
    expiresAt: Date.now() + CODE_TTL_MS,
  });

  console.log(`DEV verification code for ${target}: ${code}`);

  const response = { sent: true, target, expiresInSeconds: CODE_TTL_MS / 1000 };
  if (env.NODE_ENV !== 'production') response.devCode = code;
  return response;
};

exports.verifyOtp = async (targetOrPhone, code) => {
  const target = normalizeTarget(targetOrPhone);
  const entry = codes.get(target);
  if (!entry) return false;
  entry.attempts += 1;

  const ok = entry.code === String(code || '').trim() && entry.expiresAt > Date.now() && entry.attempts <= 5;
  if (ok) {
    codes.delete(target);
    verifiedTargets.set(target, Date.now() + VERIFIED_TTL_MS);
  }
  return ok;
};

exports.isVerified = (targetOrPhone) => {
  const target = normalizeTarget(targetOrPhone);
  const expiresAt = verifiedTargets.get(target);
  if (!expiresAt) return false;
  if (expiresAt < Date.now()) {
    verifiedTargets.delete(target);
    return false;
  }
  return true;
};

exports.normalizeTarget = normalizeTarget;
