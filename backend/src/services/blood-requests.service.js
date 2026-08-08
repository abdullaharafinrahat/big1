import { matchDonorsForRequest } from './matching-engine/matching.service.js';

// In-memory persistent store with realistic seeds for immediate runnability + database hook
let memoryRequests = [
  {
    id: 'REQ-2026-08101',
    patientName: 'Karim Uddin',
    bloodGroup: 'B+',
    unitsCount: 2,
    hospitalName: 'Dhaka Medical College Hospital, Ward 4',
    district: 'Dhaka',
    upazila: 'Shahbagh',
    contactPhone: '01312345678',
    urgency: 'immediate',
    reason: 'Emergency Surgery',
    status: 'matched',
    matchedDonorsCount: 3,
    createdAt: new Date().toISOString()
  },
  {
    id: 'REQ-2026-08102',
    patientName: 'Fatima Begum',
    bloodGroup: 'O+',
    unitsCount: 1,
    hospitalName: 'Square Hospital',
    district: 'Dhaka',
    upazila: 'Panthapath',
    contactPhone: '01712000000',
    urgency: 'urgent',
    reason: 'Postpartum Hemorrhage',
    status: 'in_progress',
    matchedDonorsCount: 5,
    createdAt: new Date(Date.now() - 3600000).toISOString()
  }
];

export async function getAllRequests(filters = {}) {
  let list = [...memoryRequests];
  if (filters.bloodGroup) list = list.filter((r) => r.bloodGroup === filters.bloodGroup);
  if (filters.district) list = list.filter((r) => r.district.toLowerCase() === filters.district.toLowerCase());
  if (filters.status) list = list.filter((r) => r.status === filters.status);
  return list;
}

export async function getRequestById(id) {
  return memoryRequests.find((r) => r.id === id) || null;
}

export async function createRequest(payload) {
  const newRequest = {
    id: `REQ-2026-${String(Math.floor(10000 + Math.random() * 90000))}`,
    patientName: payload.patientName,
    bloodGroup: payload.bloodGroup,
    unitsCount: parseInt(payload.unitsCount || 1, 10),
    hospitalName: payload.hospitalName,
    district: payload.district,
    upazila: payload.upazila || '',
    contactPhone: payload.contactPhone,
    urgency: payload.urgency || 'urgent',
    reason: payload.reason || 'Medical Emergency',
    status: 'pending',
    matchedDonorsCount: 0,
    createdAt: new Date().toISOString()
  };
  memoryRequests.unshift(newRequest);
  return newRequest;
}

export async function updateRequestStatus(id, status, notes = '') {
  const req = await getRequestById(id);
  if (!req) return null;
  req.status = status;
  req.updatedAt = new Date().toISOString();
  if (notes) req.moderationNotes = notes;
  return req;
}

export async function runAutoMatch(id, donorPool) {
  const req = await getRequestById(id);
  if (!req) return null;
  const matchResult = await matchDonorsForRequest(req, donorPool);
  req.matchedDonorsCount = matchResult.totalEligibleFound;
  req.status = matchResult.totalEligibleFound > 0 ? 'matched' : 'searching';
  return matchResult;
}
