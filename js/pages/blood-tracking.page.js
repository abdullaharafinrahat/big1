(() => {
  const $ = (selector) => document.querySelector(selector);
  const params = new URLSearchParams(location.search);
  const trackingId = params.get('id') || params.get('tracking') || '';

  function readJson(key, fallback) {
    try { return JSON.parse(localStorage.getItem(key)) ?? fallback; } catch { return fallback; }
  }
  function writeJson(key, value) { localStorage.setItem(key, JSON.stringify(value)); return value; }
  function toast(message, type = 'ok') {
    const item = document.createElement('div');
    item.className = `tracking-toast ${type}`;
    item.textContent = message;
    $('#toast-region').append(item);
    setTimeout(() => item.remove(), 3200);
  }
  function findRequest() {
    const requests = readJson('bondhu.bloodRequests', []);
    const alerts = readJson('bondhu.donorAlerts', []);
    return requests.find((request) => request.trackingId === trackingId)
      || alerts.find((alert) => alert.trackingId === trackingId)
      || readJson('bondhu.latestBloodRequest', null)
      || { trackingId: trackingId || 'BR2507230001', patientName: 'সাইফুল ইসলাম', bloodGroup: 'O+', unitsNeeded: 2, hospitalName: 'ঢাকা মেডিকেল কলেজ হাসপাতাল', district: 'ঢাকা', upazila: 'ধানমন্ডি', neededBy: '2025-07-23T10:00' };
  }
  function formatNeeded(value) {
    const date = value ? new Date(value) : null;
    if (!date || Number.isNaN(date.getTime())) return value || '23-07-2025 | 10:00 AM';
    return date.toLocaleString('bn-BD', { dateStyle: 'medium', timeStyle: 'short' });
  }
  function responseCount(request) {
    const alerts = readJson('bondhu.donorAlerts', []);
    return alerts.filter((alert) => alert.trackingId === request.trackingId && alert.responded).length;
  }
  function render() {
    const request = findRequest();
    const responses = Math.max(responseCount(request), Number(request.responses || 0));
    const units = Number(request.unitsNeeded || 1);
    const left = Math.max(0, units - responses);
    $('#tracking-id').textContent = request.trackingId;
    $('#browser-url').textContent = `bondhu.org/r/${request.trackingId}`;
    $('#patient-name').textContent = request.patientName || 'রোগী';
    $('#blood-group').textContent = request.bloodGroup || '—';
    $('#units-needed').textContent = `${units} ব্যাগ`;
    $('#hospital-name').textContent = request.hospitalName || '—';
    $('#request-location').textContent = `${request.upazila ? `${request.upazila}, ` : ''}${request.district || '—'}`;
    $('#needed-time').textContent = formatNeeded(request.neededBy);
    $('#response-count').textContent = `${responses} জন`;
    $('#units-left').textContent = `${left} ব্যাগ`;
    const responded = readJson('bondhu.donorAlerts', []).some((alert) => alert.trackingId === request.trackingId && alert.responded);
    $('#donor-response-btn').classList.toggle('responded', responded);
    $('#donor-response-btn').textContent = responded ? 'আপনি ইতিমধ্যে সাড়া দিয়েছেন' : 'আমি রক্ত দিতে চাই';
  }
  function showDonorPanel() {
    document.querySelector('.tracking-card-main')?.setAttribute('hidden', '');
    document.querySelector('#donor-live-panel')?.removeAttribute('hidden');
    document.querySelector('#donor-live-panel')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  function showTrackingPanel() {
    document.querySelector('#donor-live-panel')?.setAttribute('hidden', '');
    document.querySelector('.tracking-card-main')?.removeAttribute('hidden');
    document.querySelector('.tracking-card-main')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  function updateDonorPanel(request) {
    const responses = Math.max(responseCount(request), Number(request.responses || 0), 1);
    const position = Math.max(2, responses + 1);
    const positionEl = document.querySelector('#my-queue-position');
    if (positionEl) positionEl.textContent = `${position} নম্বর`;
    const updates = document.querySelector('#donor-live-updates');
    if (updates && !updates.dataset.respondedAdded) {
      updates.dataset.respondedAdded = 'true';
      const row = document.createElement('p');
      row.innerHTML = `<time>${new Date().toLocaleTimeString('bn-BD', { hour: '2-digit', minute: '2-digit' })}</time><span>আপনি রক্ত দিতে সাড়া দিয়েছেন</span>`;
      updates.append(row);
    }
  }

  function respond() {
    const request = findRequest();
    const alerts = readJson('bondhu.donorAlerts', []);
    const updated = alerts.map((alert) => alert.trackingId === request.trackingId ? { ...alert, read: true, responded: true, respondedAt: new Date().toISOString() } : alert);
    if (!updated.some((alert) => alert.trackingId === request.trackingId)) {
      updated.unshift({ ...request, id: `alert-${request.trackingId}`, read: true, responded: true, respondedAt: new Date().toISOString() });
    }
    writeJson('bondhu.donorAlerts', updated);
    window.dispatchEvent(new CustomEvent('bondhu:alerts-updated'));
    toast('আপনার সাড়া গ্রহণ করা হয়েছে।');
    render();
    updateDonorPanel(request);
    showDonorPanel();
  }
  $('#donor-response-btn').addEventListener('click', respond);
  document.querySelector('#back-to-tracking')?.addEventListener('click', showTrackingPanel);
  render();
})();

// Tracking page dashboard-style hamburger drawer
(() => {
  const menus = [...document.querySelectorAll('#tracking-menu-btn, #tracking-menu-btn-live')];
  const drawer = document.querySelector('#tracking-drawer');
  const backdrop = document.querySelector('#tracking-drawer-backdrop');
  const close = document.querySelector('#tracking-drawer-close');
  if (!menus.length || !drawer || !backdrop) return;
  function openDrawer() {
    drawer.removeAttribute('hidden');
    backdrop.removeAttribute('hidden');
    document.body.style.overflow = 'hidden';
    menus.forEach((menu) => menu.setAttribute('aria-expanded', 'true'));
  }
  function closeDrawer() {
    drawer.setAttribute('hidden', '');
    backdrop.setAttribute('hidden', '');
    document.body.style.overflow = '';
    menus.forEach((menu) => menu.setAttribute('aria-expanded', 'false'));
  }
  menus.forEach((menu) => menu.addEventListener('click', openDrawer));
  close?.addEventListener('click', closeDrawer);
  backdrop.addEventListener('click', closeDrawer);
  drawer.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeDrawer));
  document.addEventListener('keydown', (event) => { if (event.key === 'Escape') closeDrawer(); });
})();
