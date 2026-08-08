/**
 * International Red Cross Standard Blood Compatibility Matrix
 */
export const BLOOD_COMPATIBILITY = {
  'A+': ['A+', 'A-', 'O+', 'O-'],
  'A-': ['A-', 'O-'],
  'B+': ['B+', 'B-', 'O+', 'O-'],
  'B-': ['B-', 'O-'],
  'AB+': ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'], // Universal Recipient
  'AB-': ['AB-', 'A-', 'B-', 'O-'],
  'O+': ['O+', 'O-'],
  'O-': ['O-'] // Universal Donor
};

export const UNIVERSAL_DONORS = ['O-'];
export const UNIVERSAL_RECIPIENTS = ['AB+'];

export function isBloodCompatible(recipientGroup, donorGroup) {
  const allowed = BLOOD_COMPATIBILITY[recipientGroup] || [];
  return allowed.includes(donorGroup);
}

export function getAllowedDonorGroups(recipientGroup) {
  return BLOOD_COMPATIBILITY[recipientGroup] || [recipientGroup];
}
