let memoryDonors = [
  {
    id: 'DON-001',
    name: 'MD. Shariful Islam',
    bloodGroup: 'O+',
    phone: '01712345678',
    district: 'Dhaka',
    upazila: 'Mirpur',
    totalDonations: 8,
    lastDonationDate: '2026-04-14',
    isVerified: true,
    isAvailable: true,
    badgeLevel: 'gold',
    latitude: 23.8067,
    longitude: 90.3687
  },
  {
    id: 'DON-002',
    name: 'Tanvir Hasan',
    bloodGroup: 'B+',
    phone: '01811223344',
    district: 'Dhaka',
    upazila: 'Dhanmondi',
    totalDonations: 4,
    lastDonationDate: '2026-01-10',
    isVerified: true,
    isAvailable: true,
    badgeLevel: 'silver',
    latitude: 23.7465,
    longitude: 90.3760
  },
  {
    id: 'DON-003',
    name: 'Nusrat Jahan',
    bloodGroup: 'A+',
    phone: '01911334455',
    district: 'Chattogram',
    upazila: 'Panchlaish',
    totalDonations: 3,
    lastDonationDate: '2025-11-20',
    isVerified: true,
    isAvailable: true,
    badgeLevel: 'bronze',
    latitude: 22.3569,
    longitude: 91.7832
  },
  {
    id: 'DON-004',
    name: 'Sajidul Islam',
    bloodGroup: 'O-',
    phone: '01755667788',
    district: 'Dhaka',
    upazila: 'Uttara',
    totalDonations: 6,
    lastDonationDate: '2026-03-01',
    isVerified: true,
    isAvailable: true,
    badgeLevel: 'gold',
    latitude: 23.8759,
    longitude: 90.3795
  }
];

export async function getAllDonors(filters = {}) {
  let list = [...memoryDonors];
  if (filters.bloodGroup) list = list.filter((d) => d.bloodGroup === filters.bloodGroup);
  if (filters.district) list = list.filter((d) => d.district.toLowerCase() === filters.district.toLowerCase());
  if (filters.availableOnly) list = list.filter((d) => d.isAvailable === true);
  return list;
}

export async function getDonorById(id) {
  return memoryDonors.find((d) => d.id === id) || null;
}

export async function createDonor(payload) {
  const newDonor = {
    id: `DON-${String(memoryDonors.length + 1).padStart(3, '0')}`,
    name: payload.name,
    bloodGroup: payload.bloodGroup,
    phone: payload.phone,
    district: payload.district,
    upazila: payload.upazila || '',
    totalDonations: 0,
    lastDonationDate: payload.lastDonationDate || null,
    isVerified: false,
    isAvailable: true,
    badgeLevel: 'bronze',
    createdAt: new Date().toISOString()
  };
  memoryDonors.unshift(newDonor);
  return newDonor;
}
