const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const { env } = require('../config/env');
const otp = require('./otp.service');

const users = new Map();

function seedAdmin() {
  const admin = {
    id: 'admin-1',
    name: 'Bondhu Admin',
    email: 'admin@bondhu.local',
    phone: '01000000000',
    role: 'admin',
    password: 'admin123',
    phoneVerified: true,
    emailVerified: true,
    createdAt: new Date().toISOString(),
  };
  users.set(admin.id, admin);
}
seedAdmin();

function publicUser(user) {
  if (!user) return null;
  const { password, passwordConfirm, ...safe } = user;
  return safe;
}

function sign(user) {
  return jwt.sign(publicUser(user), env.JWT_SECRET, {
    subject: user.id,
    expiresIn: env.JWT_EXPIRES_IN,
  });
}

function normalizeEmail(email) {
  return email ? String(email).trim().toLowerCase() : '';
}

function normalizePhone(phone) {
  return phone ? String(phone).replace(/[\s-]/g, '').trim() : '';
}

function findByIdentifier(identifier) {
  const value = String(identifier || '').trim().toLowerCase();
  return [...users.values()].find((user) => user.email === value || user.phone === value || user.id === value);
}

function ensureUnique({ email, phone }) {
  const conflict = [...users.values()].find((user) => (email && user.email === email) || (phone && user.phone === phone));
  if (conflict) throw Object.assign(new Error('User already exists'), { status: 409 });
}

exports.register = async (payload = {}) => {
  const name = String(payload.name || '').trim();
  const email = normalizeEmail(payload.email);
  const phone = normalizePhone(payload.phone);
  const password = String(payload.password || '');
  const registrationMethod = payload.registrationMethod || (email ? 'email' : 'mobile');
  const verificationTarget = registrationMethod === 'email' ? email : phone;

  if (!name) throw Object.assign(new Error('Name is required'), { status: 400 });
  if (!email && !phone) throw Object.assign(new Error('Phone or email is required'), { status: 400 });
  if (password.length < 6) throw Object.assign(new Error('Password must be at least 6 characters'), { status: 400 });
  ensureUnique({ email, phone });

  if (!otp.isVerified(verificationTarget)) {
    throw Object.assign(new Error('Please verify your phone/email before creating account'), { status: 400 });
  }

  const user = {
    id: crypto.randomUUID(),
    name,
    email,
    phone,
    role: 'user',
    password,
    registrationMethod,
    referralId: payload.referralId || '',
    expatriate: Boolean(payload.expatriate),
    currentCountry: payload.currentCountry || '',
    currentMobile: payload.currentMobile || '',
    phoneVerified: Boolean(phone && otp.isVerified(phone)),
    emailVerified: Boolean(email && otp.isVerified(email)),
    createdAt: new Date().toISOString(),
  };

  users.set(user.id, user);
  return { token: sign(user), user: publicUser(user) };
};

exports.login = async ({ identifier, email, phone, password } = {}) => {
  const id = identifier || email || phone;
  const user = findByIdentifier(id);
  if (!user || user.password !== String(password || '')) {
    throw Object.assign(new Error('Invalid credentials'), { status: 401 });
  }
  return { token: sign(user), user: publicUser(user) };
};

exports.verifyToken = (token) => jwt.verify(token, env.JWT_SECRET);
exports.findById = (id) => publicUser(users.get(id));
exports.updateUser = (id, patch = {}) => {
  const user = users.get(id);
  if (!user) throw Object.assign(new Error('User not found'), { status: 404 });
  const allowed = ['name', 'email', 'phone', 'currentCountry', 'currentMobile', 'expatriate'];
  for (const key of allowed) {
    if (patch[key] !== undefined) user[key] = patch[key];
  }
  return publicUser(user);
};
exports._users = users;
