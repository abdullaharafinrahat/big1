import * as donorService from '../services/donors.service.js';
import { logAuditEvent } from '../services/audit-log.service.js';

export async function listDonors(req, res, next) {
  try {
    const list = await donorService.getAllDonors(req.query);
    res.json({ success: true, count: list.length, data: list });
  } catch (err) {
    next(err);
  }
}

export async function getDonor(req, res, next) {
  try {
    const item = await donorService.getDonorById(req.params.id);
    if (!item) return res.status(404).json({ success: false, error: 'Donor not found' });
    res.json({ success: true, data: item });
  } catch (err) {
    next(err);
  }
}

export async function createDonor(req, res, next) {
  try {
    const created = await donorService.createDonor(req.body);
    await logAuditEvent({
      eventType: 'DONOR_REGISTERED',
      entityType: 'donor',
      entityId: created.id,
      details: { bloodGroup: created.bloodGroup, district: created.district }
    });
    res.status(201).json({ success: true, message: 'Donor registered successfully', data: created });
  } catch (err) {
    next(err);
  }
}
