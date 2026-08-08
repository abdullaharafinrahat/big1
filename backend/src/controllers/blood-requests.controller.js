import * as requestService from '../services/blood-requests.service.js';
import * as donorService from '../services/donors.service.js';
import { logAuditEvent } from '../services/audit-log.service.js';

export async function listRequests(req, res, next) {
  try {
    const list = await requestService.getAllRequests(req.query);
    res.json({ success: true, count: list.length, data: list });
  } catch (err) {
    next(err);
  }
}

export async function getRequest(req, res, next) {
  try {
    const item = await requestService.getRequestById(req.params.id);
    if (!item) return res.status(404).json({ success: false, error: 'Blood request not found' });
    res.json({ success: true, data: item });
  } catch (err) {
    next(err);
  }
}

export async function createRequest(req, res, next) {
  try {
    const created = await requestService.createRequest(req.body);
    await logAuditEvent({
      eventType: 'BLOOD_REQUEST_CREATED',
      entityType: 'request',
      entityId: created.id,
      actorId: req.user?.id,
      details: { bloodGroup: created.bloodGroup, units: created.unitsCount }
    });

    // Auto-match against active donors
    const donorPool = await donorService.getAllDonors();
    const matchResult = await requestService.runAutoMatch(created.id, donorPool);

    res.status(201).json({
      success: true,
      message: 'Blood request submitted successfully',
      data: created,
      matchSummary: matchResult
    });
  } catch (err) {
    next(err);
  }
}

export async function matchRequest(req, res, next) {
  try {
    const donorPool = await donorService.getAllDonors();
    const result = await requestService.runAutoMatch(req.params.id, donorPool);
    if (!result) return res.status(404).json({ success: false, error: 'Request not found' });
    res.json({ success: true, data: result });
  } catch (err) {
    next(err);
  }
}
