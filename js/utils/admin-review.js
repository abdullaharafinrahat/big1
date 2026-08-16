/**
 * Bondhu — Admin Review helper (demo, client-side only).
 *
 * Aggregates pending submissions across every localStorage bucket into a
 * unified queue. Handles status transitions and fires SMS via BondhuSMS.
 *
 * Usage:
 *   const items = BondhuReview.list({ kind: 'all', status: 'all', q: '' });
 *   BondhuReview.setStatus(itemId, kind, 'approved', { note: 'Docs verified' });
 *
 * Exposes window.BondhuReview.
 */
(function () {
  'use strict';

  // Map every bucket the app writes to.
  // status field name may differ per record — we normalise.
  const BUCKETS = {
    ambulance_registration: {
      key: 'bondhu.pendingRegistrations',
      label: 'Ambulance Registration',
      icon: 'fa-truck-medical',
      kindColor: '#f57c00',
      applicantField: 'providerName',
      phoneField: (r) => r.driverMobile || r.ownerPhone || '',
      driverField: (r) => r.driverName || '',
    },
    home_publish: {
      key: 'bondhu.pendingHomes',
      label: 'Home / Hotel Publish',
      icon: 'fa-house-chimney-window',
      kindColor: '#0b5a35',
      applicantField: 'ownerName',
      phoneField: (r) => r.phone || r.applicantPhone || '',
    },
    missing_report: {
      key: 'bondhu.pendingMissingReports',
      label: 'Missing Report',
      icon: 'fa-users-viewfinder',
      kindColor: '#7c3aed',
      applicantField: 'name',
      phoneField: (r) => r.phone || '',
    },
    blood_request: {
      key: 'bondhu.userBloodRequests',
      label: 'Blood Request',
      icon: 'fa-droplet',
      kindColor: '#d32f2f',
      applicantField: 'patientName',
      phoneField: (r) => r.phone || '',
    },
    ambulance_booking: {
      key: 'bondhu.ambulanceBookings',
      label: 'Ambulance Booking',
      icon: 'fa-calendar-check',
      kindColor: '#0369a1',
      applicantField: 'customerName',
      phoneField: (r) => r.customerPhone || '',
    },
    destination_booking: {
      key: 'bondhu.destinationBookings',
      label: 'Destination Booking',
      icon: 'fa-route',
      kindColor: '#e65100',
      applicantField: 'customerName',
      phoneField: (r) => r.customerPhone || '',
    },
    user_registration: {
      key: 'bondhu.pendingUsers',
      label: 'User Registration',
      icon: 'fa-user-plus',
      kindColor: '#0891b2',
      applicantField: 'name',
      phoneField: (r) => r.phone || r.mobile || '',
    },
  };

  const STATUS_ALIASES = {
    // Any raw status value we might see in existing records → our canonical enum.
    pending: 'pending',
    pending_verification: 'pending',
    pending_admin_review: 'pending',
    pending_dispatch: 'pending',
    pending_moderation: 'pending',
    under_review: 'under_review',
    approved: 'approved',
    verified: 'approved',
    hold: 'hold',
    on_hold: 'hold',
    rejected: 'rejected',
  };
  const STATUS_META = {
    pending:      { label: 'Pending',      bn: 'অপেক্ষমাণ',      color: '#64748b', bg: '#f1f5f9', icon: 'fa-hourglass-half' },
    under_review: { label: 'Under Review', bn: 'যাচাই চলছে',       color: '#0369a1', bg: '#e0f2fe', icon: 'fa-magnifying-glass' },
    approved:     { label: 'Approved',     bn: 'অনুমোদিত',        color: '#166534', bg: '#dcfce7', icon: 'fa-circle-check' },
    hold:         { label: 'Hold',         bn: 'হোল্ড',           color: '#9a3412', bg: '#ffedd5', icon: 'fa-hand' },
    rejected:     { label: 'Rejected',     bn: 'বাতিল',          color: '#991b1b', bg: '#fee2e2', icon: 'fa-circle-xmark' },
  };

  function canonicalStatus(raw) {
    if (!raw) return 'pending';
    return STATUS_ALIASES[String(raw).toLowerCase()] || 'pending';
  }

  function readBucket(kind) {
    const cfg = BUCKETS[kind];
    if (!cfg) return [];
    try {
      const arr = JSON.parse(localStorage.getItem(cfg.key) || '[]');
      return Array.isArray(arr) ? arr : [];
    } catch (e) { return []; }
  }

  function writeBucket(kind, arr) {
    const cfg = BUCKETS[kind];
    if (!cfg) return;
    try { localStorage.setItem(cfg.key, JSON.stringify(arr)); }
    catch (e) { console.error('review: bucket write failed', kind, e); }
  }

  function normalize(kind, record) {
    const cfg = BUCKETS[kind];
    if (!cfg) return null;
    const rawStatus = record.reviewStatus || record.status;
    return {
      id: record.id || record.trackId || '',
      kind,
      kindLabel: cfg.label,
      kindIcon: cfg.icon,
      kindColor: cfg.kindColor,
      applicant: record[cfg.applicantField] || record.name || '—',
      driverName: (typeof cfg.driverField === 'function') ? cfg.driverField(record) : '',
      phone: (typeof cfg.phoneField === 'function') ? cfg.phoneField(record) : '',
      location: [record.village, record.ward, record.unionName || record.union, record.area, record.district, record.division]
                  .filter(v => v && v !== '__other__').slice(0, 3).join(', ') || record.location || '—',
      submittedAt: record.submittedAt || record.bookedAt || record.publishedAt || '',
      submittedAtLocal: record.submittedAtLocal || record.bookedAtLocal || '',
      status: canonicalStatus(rawStatus),
      rawStatus,
      notes: Array.isArray(record.reviewNotes) ? record.reviewNotes : [],
      documents: record.documents || {},
      record,
    };
  }

  function list(filter) {
    filter = filter || {};
    const q = (filter.q || '').toLowerCase().trim();
    const kinds = filter.kind === 'all' || !filter.kind ? Object.keys(BUCKETS) : [filter.kind];
    const status = filter.status || 'all';
    const results = [];
    kinds.forEach(k => {
      readBucket(k).forEach(r => {
        const n = normalize(k, r);
        if (!n) return;
        if (status !== 'all' && n.status !== status) return;
        if (q && !JSON.stringify(n).toLowerCase().includes(q)) return;
        results.push(n);
      });
    });
    // Newest first
    results.sort((a, b) => (b.submittedAt || '').localeCompare(a.submittedAt || ''));
    return results;
  }

  function counts() {
    const byKind = {}, byStatus = {};
    Object.keys(BUCKETS).forEach(k => {
      const items = readBucket(k).map(r => normalize(k, r));
      byKind[k] = items.length;
      items.forEach(it => {
        byStatus[it.status] = (byStatus[it.status] || 0) + 1;
      });
    });
    byStatus.total = Object.values(byStatus).reduce((a, b) => a + b, 0);
    return { byKind, byStatus };
  }

  function find(id, kind) {
    const arr = readBucket(kind);
    const idx = arr.findIndex(r => (r.id || r.trackId) === id);
    if (idx === -1) return null;
    return { arr, idx, record: arr[idx] };
  }

  function setStatus(id, kind, newStatus, opts) {
    opts = opts || {};
    const canonical = canonicalStatus(newStatus);
    if (!STATUS_META[canonical]) throw new Error('Invalid status: ' + newStatus);

    const hit = find(id, kind);
    if (!hit) { console.warn('review: item not found', id, kind); return null; }
    const { arr, idx, record } = hit;

    const prev = canonicalStatus(record.reviewStatus || record.status);
    record.reviewStatus = canonical;
    // For backwards-compat, also update legacy 'status' if it looked like a review status.
    if (record.status && STATUS_ALIASES[String(record.status).toLowerCase()]) {
      record.status = canonical;
    }
    record.reviewNotes = Array.isArray(record.reviewNotes) ? record.reviewNotes : [];
    record.reviewNotes.unshift({
      status: canonical,
      prevStatus: prev,
      note: (opts.note || '').trim(),
      by: opts.by || 'admin',
      at: new Date().toISOString(),
      atLocal: new Date().toLocaleString('bn-BD'),
    });
    arr[idx] = record;
    writeBucket(kind, arr);

    // Fire SMS notification (via BondhuSMS if loaded)
    try {
      const cfg = BUCKETS[kind];
      const phone = (typeof cfg.phoneField === 'function') ? cfg.phoneField(record) : '';
      if (phone && window.BondhuSMS) {
        window.BondhuSMS.sendConfirmationSMS('admin_review_status', phone, {
          code: record.id || record.trackId,
          status: STATUS_META[canonical].label,
          note: opts.note || '',
          role: 'user',
        });
      }
    } catch (e) { console.warn('SMS notify failed', e); }

    return record;
  }

  window.BondhuReview = {
    BUCKETS, STATUS_META, STATUS_ALIASES,
    canonicalStatus,
    readBucket, writeBucket,
    list, counts, find, setStatus, normalize,
  };
})();
