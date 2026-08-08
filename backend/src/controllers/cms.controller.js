import * as cmsService from '../services/cms.service.js';

export async function listNews(req, res, next) {
  try {
    const list = await cmsService.getAllNews();
    res.json({ success: true, count: list.length, data: list });
  } catch (err) {
    next(err);
  }
}

export async function createNews(req, res, next) {
  try {
    const created = await cmsService.createNews(req.body);
    res.status(201).json({ success: true, message: 'Notice published', data: created });
  } catch (err) {
    next(err);
  }
}
