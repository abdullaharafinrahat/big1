let memoryAmbulances = [
  {
    id: 'AMB-01',
    providerName: 'Bondhu ICU Ambulance',
    vehicleNumber: 'DH-11-2024',
    vehicleType: 'ICU Life Support',
    district: 'Dhaka',
    hospitalName: 'Bondhu General Hospital',
    driverName: 'Abdullah Rahman',
    phone: '01712-345678',
    status: 'Available',
    equipment: 'ICU Ventilator, Defibrillator, Oxygen Cylinder'
  },
  {
    id: 'AMB-02',
    providerName: 'City Care Emergency Ambulance',
    vehicleNumber: 'DH-12-5544',
    vehicleType: 'AC Emergency Van',
    district: 'Dhaka',
    hospitalName: 'Square Hospital',
    driverName: 'Mohammad Faruk',
    phone: '01711-223344',
    status: 'On Duty',
    equipment: 'Oxygen, First-Aid Kit'
  },
  {
    id: 'AMB-03',
    providerName: 'Chattogram Metropolitan Ambulance',
    vehicleNumber: 'CTG-05-9988',
    vehicleType: 'ICU Ambulance',
    district: 'Chattogram',
    hospitalName: 'Chattogram Medical College',
    driverName: 'Rashedul Karim',
    phone: '01713-456789',
    status: 'Available',
    equipment: 'Ventilator, Suction Unit, Oxygen'
  },
  {
    id: 'AMB-04',
    providerName: 'Red Crescent Ambulance Service',
    vehicleNumber: 'RAJ-03-3322',
    vehicleType: 'Non-AC Patient Transport',
    district: 'Rajshahi',
    hospitalName: 'Rajshahi Medical College',
    driverName: 'Anisur Rahman',
    phone: '01714-567890',
    status: 'Available',
    equipment: 'Oxygen, Stretcher'
  }
];

export async function getAllAmbulances(filters = {}) {
  let list = [...memoryAmbulances];
  if (filters.district) list = list.filter((a) => a.district.toLowerCase() === filters.district.toLowerCase());
  if (filters.type) list = list.filter((a) => a.vehicleType.toLowerCase().includes(filters.type.toLowerCase()));
  if (filters.status) list = list.filter((a) => a.status.toLowerCase() === filters.status.toLowerCase());
  return list;
}

export async function getAmbulanceById(id) {
  return memoryAmbulances.find((a) => a.id === id) || null;
}

export async function updateAmbulanceStatus(id, status) {
  const amb = await getAmbulanceById(id);
  if (!amb) return null;
  amb.status = status;
  return amb;
}
