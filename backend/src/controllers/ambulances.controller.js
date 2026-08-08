import * as ambulanceService from '../services/ambulances.service.js';

export async function listAmbulances(req, res, next) {
  try {
    const list = await ambulanceService.getAllAmbulances(req.query);
    res.json({ success: true, count: list.length, data: list });
  } catch (err) {
    next(err);
  }
}

export async function getAmbulance(req, res, next) {
  try {
    const item = await ambulanceService.getAmbulanceById(req.params.id);
    if (!item) return res.status(404).json({ success: false, error: 'Ambulance not found' });
    res.json({ success: true, data: item });
  } catch (err) {
    next(err);
  }
}
