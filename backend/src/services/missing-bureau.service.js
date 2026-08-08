let memoryMissingReports = [
  {
    id: 'MIS-101',
    name: 'Abdur Rahim',
    age: 68,
    lastSeenLocation: 'New Market, Dhaka',
    contactPhone: '01712998877',
    description: 'Wearing white Punjabi and black sandal. Suffers from mild dementia.',
    photoUrl: null,
    status: 'approved',
    createdAt: '2026-08-05T10:00:00.000Z'
  },
  {
    id: 'MIS-102',
    name: 'Sumaiya Akter',
    age: 12,
    lastSeenLocation: 'GEC Circle, Chattogram',
    contactPhone: '01819554433',
    description: 'School student, height 4ft 5in, wearing navy blue school uniform with white scarf.',
    photoUrl: null,
    status: 'approved',
    createdAt: '2026-08-06T14:30:00.000Z'
  }
];

export async function getAllMissingReports(filters = {}) {
  let list = [...memoryMissingReports];
  if (filters.status) list = list.filter((r) => r.status === filters.status);
  return list;
}

export async function createMissingReport(payload) {
  const newReport = {
    id: `MIS-${String(100 + memoryMissingReports.length + 1)}`,
    name: payload.name,
    age: parseInt(payload.age || 0, 10),
    lastSeenLocation: payload.lastSeenLocation,
    contactPhone: payload.contactPhone,
    description: payload.description,
    photoUrl: payload.photoUrl || null,
    status: 'pending_moderation',
    createdAt: new Date().toISOString()
  };
  memoryMissingReports.unshift(newReport);
  return newReport;
}

export async function moderateMissingReport(id, status) {
  const report = memoryMissingReports.find((r) => r.id === id);
  if (!report) return null;
  report.status = status;
  return report;
}
