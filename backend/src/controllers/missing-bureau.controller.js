import * as missingService from '../services/missing-bureau.service.js';

export async function listReports(req, res, next) {
  try {
    const list = await missingService.getAllMissingReports(req.query);
    res.json({ success: true, count: list.length, data: list });
  } catch (err) {
    next(err);
  }
}

export async function createReport(req, res, next) {
  try {
    const created = await missingService.createMissingReport(req.body);
    res.status(201).json({
      success: true,
      message: 'Missing person report submitted for moderation',
      data: created
    });
  } catch (err) {
    next(err);
  }
}
