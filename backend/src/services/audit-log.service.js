let memoryAuditLogs = [];

export async function logAuditEvent({ eventType, entityType, entityId, actorId, ipAddress, details }) {
  const entry = {
    id: `LOG-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
    eventType,
    entityType,
    entityId,
    actorId: actorId || 'system',
    ipAddress: ipAddress || '127.0.0.1',
    details: details || {},
    timestamp: new Date().toISOString()
  };
  memoryAuditLogs.unshift(entry);
  if (memoryAuditLogs.length > 2000) memoryAuditLogs.pop();
  return entry;
}

export async function getRecentAuditLogs(limit = 50) {
  return memoryAuditLogs.slice(0, limit);
}
