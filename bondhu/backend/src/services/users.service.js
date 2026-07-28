const auth = require('./auth.service');

const profiles = new Map();

const REQUIRED_PROFILE_FIELDS = [
  'fullName',
  'dateOfBirth',
  'gender',
  'bloodGroup',
  'primaryMobile',
  'primaryEmail',
  'presentCountry',
  'presentCity',
  'permanentCountry',
  'permanentDistrict',
  'identityType',
  'identityNumber',
  'emergencyName',
  'emergencyRelationship',
  'emergencyMobile',
];

function progress(profile = {}) {
  const completed = REQUIRED_PROFILE_FIELDS.filter((field) => profile[field]).length;
  const base = 20; // account and verification completed
  return Math.min(100, Math.round(base + (completed / REQUIRED_PROFILE_FIELDS.length) * 80));
}

exports.getMe = async (userId) => {
  const user = auth.findById(userId);
  if (!user) throw Object.assign(new Error('User not found'), { status: 404 });
  const profile = profiles.get(userId) || {
    fullName: user.name || '',
    primaryMobile: user.phone || '',
    primaryEmail: user.email || '',
    expatriate: Boolean(user.expatriate),
    currentCountry: user.currentCountry || '',
    currentMobile: user.currentMobile || '',
  };
  return { user, profile, progress: progress(profile) };
};

exports.updateProfile = async (userId, patch = {}) => {
  const existing = (await exports.getMe(userId)).profile;
  const profile = {
    ...existing,
    ...patch,
    updatedAt: new Date().toISOString(),
  };
  profiles.set(userId, profile);

  if (patch.fullName) auth.updateUser(userId, { name: patch.fullName });
  return { ...(await exports.getMe(userId)), profile, progress: progress(profile) };
};

exports._profiles = profiles;
