import { getRecentAuditLogs } from '../services/audit-log.service.js';
import * as requestService from '../services/blood-requests.service.js';
import * as donorService from '../services/donors.service.js';

export async function getDashboardStats(req, res, next) {
  try {
    const requests = await requestService.getAllRequests();
    const donors = await donorService.getAllDonors();
    const logs = await getRecentAuditLogs(10);

    res.json({
      success: true,
      data: {
        totalRequests: requests.length,
        completedRequests: requests.filter((r) => r.status === 'completed').length,
        pendingRequests: requests.filter((r) => r.status === 'pending').length,
        totalDonors: donors.length,
        verifiedDonors: donors.filter((d) => d.isVerified).length,
        recentActivity: logs
      }
    });
  } catch (err) {
    next(err);
  }
}

export async function moderateRequest(req, res, next) {
  try {
    const { id } = req.params;
    const { status, notes } = req.body;
    const updated = await requestService.updateRequestStatus(id, status, notes);
    if (!updated) return res.status(404).json({ success: false, error: 'Request not found' });
    res.json({ success: true, message: 'Request status updated', data: updated });
  } catch (err) {
    next(err);
  }
}
