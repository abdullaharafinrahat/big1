import * as hospitalService from '../services/hospitals.service.js';

export async function listHospitals(req, res, next) {
  try {
    const list = await hospitalService.getAllHospitals(req.query);
    res.json({ success: true, count: list.length, data: list });
  } catch (err) {
    next(err);
  }
}

export async function getHospital(req, res, next) {
  try {
    const item = await hospitalService.getHospitalById(req.params.id);
    if (!item) return res.status(404).json({ success: false, error: 'Hospital not found' });
    res.json({ success: true, data: item });
  } catch (err) {
    next(err);
  }
}
