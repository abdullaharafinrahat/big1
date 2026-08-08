let memoryHospitals = [
  {
    id: 'HOSP-001',
    name: 'Bondhu General Hospital',
    type: 'General & Specialized Hospital',
    district: 'Dhaka',
    address: 'Mirpur-10, Section-6, Dhaka',
    emergencyPhone: '01712-345678',
    hotline: '10647',
    totalBeds: 250,
    availableIcuBeds: 8,
    availableCcuBeds: 4,
    doctors: [
      { name: 'Dr. Rafiq Ahmed', department: 'Medicine', schedule: '10:30 AM', bloodGroup: 'A+' },
      { name: 'Dr. Nurat Jahan', department: 'Gyne & Obs', schedule: '11:00 AM', bloodGroup: 'O+' },
      { name: 'Dr. Abdullah Al Mamun', department: 'Cardiology', schedule: '11:30 AM', bloodGroup: 'B+' },
      { name: 'Dr. Farzana Akter', department: 'Pediatrics', schedule: '12:00 PM', bloodGroup: 'AB+' },
      { name: 'Dr. Sajidul Islam', department: 'General Surgery', schedule: '12:30 PM', bloodGroup: 'O-' }
    ],
    bloodStock: { 'A+': 45, 'B+': 62, 'O+': 88, 'AB+': 18, 'A-': 8, 'B-': 12, 'O-': 14, 'AB-': 5 }
  },
  {
    id: 'HOSP-002',
    name: 'Dhaka Medical College Hospital',
    type: 'Tertiary Public Hospital',
    district: 'Dhaka',
    address: 'Secretariat Road, Shahbagh, Dhaka',
    emergencyPhone: '01711-223344',
    hotline: '10600',
    totalBeds: 2600,
    availableIcuBeds: 3,
    availableCcuBeds: 2,
    doctors: [],
    bloodStock: { 'A+': 120, 'B+': 140, 'O+': 180, 'AB+': 35, 'A-': 15, 'B-': 20, 'O-': 22, 'AB-': 8 }
  }
];

export async function getAllHospitals(filters = {}) {
  let list = [...memoryHospitals];
  if (filters.district) list = list.filter((h) => h.district.toLowerCase() === filters.district.toLowerCase());
  return list;
}

export async function getHospitalById(id) {
  return memoryHospitals.find((h) => h.id === id) || null;
}
