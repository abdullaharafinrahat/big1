(() => {
  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

  const defaults = {
    patientName: 'সাইফুল ইসলাম',
    contactPhone: '01312345678',
    bloodGroup: 'O+',
    unitsNeeded: '2',
    hospitalName: 'ঢাকা মেডিকেল কলেজ হাসপাতাল',
    district: 'ঢাকা',
    neededBy: '23-07-2025 10:00 AM',
    trackingId: 'BR2507230001',
  };

  function toast(message, type = 'ok') {
    const region = $('#bt-toast-region');
    const item = document.createElement('div');
    item.className = `bt-toast ${type}`;
    item.textContent = message;
    region?.append(item);
    setTimeout(() => item.remove(), 3200);
  }

  function getLatest() {
    try { return { ...defaults, ...JSON.parse(localStorage.getItem('bondhu.latestBloodRequest') || '{}') }; }
    catch { return defaults; }
  }

  function formatDateTime(value) {
    if (!value) return defaults.neededBy;
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return value;
    return date.toLocaleString('bn-BD', { dateStyle: 'medium', timeStyle: 'short' });
  }

  function saveLatest(patch) {
    const next = { ...getLatest(), ...patch };
    localStorage.setItem('bondhu.latestBloodRequest', JSON.stringify(next));
    render(next);
    return next;
  }

  function render(data = getLatest()) {
    $$('[data-preview="patient"]').forEach((el) => { el.textContent = data.patientName || defaults.patientName; });
    $$('[data-preview="phone"]').forEach((el) => { el.textContent = `${data.contactPhone || defaults.contactPhone} ✓`; });
    $$('[data-preview="blood"]').forEach((el) => { el.textContent = data.bloodGroup || defaults.bloodGroup; });
    $$('[data-preview="units"]').forEach((el) => { el.textContent = data.unitsNeeded || defaults.unitsNeeded; });
    $$('[data-preview="hospital"]').forEach((el) => { el.textContent = data.hospitalName || defaults.hospitalName; });
    $$('[data-preview="district"]').forEach((el) => { el.textContent = data.district || defaults.district; });
    $$('[data-preview="needed"]').forEach((el) => { el.textContent = formatDateTime(data.neededBy); });
    $$('[data-preview="tracking"]').forEach((el) => { el.textContent = data.trackingId || defaults.trackingId; });
    $$('[data-tracking-link]').forEach((el) => {
      const id = data.trackingId || defaults.trackingId;
      el.textContent = el.classList.contains('browser-url') ? `bondhu.org/r/${id}` : `https://bondhu.org/r/${id}`;
    });
  }

  function formPayload() {
    const form = $('#blood-request-form');
    if (!form) return getLatest();
    return {
      patientName: form.patientName?.value?.trim() || defaults.patientName,
      contactPhone: form.contactPhone?.value?.trim() || defaults.contactPhone,
      bloodGroup: form.bloodGroup?.value || defaults.bloodGroup,
      unitsNeeded: form.unitsNeeded?.value || defaults.unitsNeeded,
      hospitalName: form.hospitalName?.value?.trim() || defaults.hospitalName,
      district: form.district?.value?.trim() || defaults.district,
      neededBy: form.neededBy?.value || defaults.neededBy,
    };
  }

  function trackingId() {
    const now = new Date();
    const y = String(now.getFullYear()).slice(-2);
    const m = String(now.getMonth() + 1).padStart(2, '0');
    const d = String(now.getDate()).padStart(2, '0');
    const rand = String(Math.floor(Math.random() * 9999)).padStart(4, '0');
    return `BR${y}${m}${d}${rand}`;
  }

  $$('[data-scroll-step]').forEach((button) => {
    button.addEventListener('click', () => {
      const el = document.getElementById(button.dataset.scrollStep);
      el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      el?.classList.add('ring-step');
      setTimeout(() => el?.classList.remove('ring-step'), 1800);
    });
  });

  $('#bt-toggle-details')?.addEventListener('click', () => {
    const active = document.body.classList.toggle('details-mode');
    $('#bt-toggle-details').textContent = active ? 'সাধারণ মোড' : 'বিবরণ দেখান';
  });

  $$('[data-unit-plus]').forEach((button) => button.addEventListener('click', () => {
    const current = Number(getLatest().unitsNeeded || 1);
    const units = Math.min(10, current + 1);
    const form = $('#blood-request-form');
    if (form?.unitsNeeded) form.unitsNeeded.value = units;
    saveLatest({ unitsNeeded: String(units) });
    toast(`ব্যাগ সংখ্যা: ${units}`);
  }));

  $$('[data-unit-minus]').forEach((button) => button.addEventListener('click', () => {
    const current = Number(getLatest().unitsNeeded || 1);
    const units = Math.max(1, current - 1);
    const form = $('#blood-request-form');
    if (form?.unitsNeeded) form.unitsNeeded.value = units;
    saveLatest({ unitsNeeded: String(units) });
    toast(`ব্যাগ সংখ্যা: ${units}`);
  }));

  $('[data-send-request]')?.addEventListener('click', () => {
    const data = saveLatest({ ...formPayload(), trackingId: trackingId(), status: 'active' });
    toast(`রক্তের অনুরোধ তৈরি হয়েছে। Tracking ID: ${data.trackingId}`);
    document.dispatchEvent(new CustomEvent('bondhu:blood-request-created', { detail: data }));
  });

  $('[data-donor-response]')?.addEventListener('click', () => {
    const count = $('#bt-response-count');
    const current = Number((count?.textContent || '6').replace(/\D/g, '')) || 6;
    if (count) count.textContent = `${current + 1} জন`;
    const timeline = $('#bt-live-timeline');
    const p = document.createElement('p');
    p.innerHTML = `<time>${new Date().toLocaleTimeString('bn-BD', { hour: '2-digit', minute: '2-digit' })}</time><span>আপনি রক্ত দিতে সাড়া দিয়েছেন</span>`;
    timeline?.append(p);
    toast('আপনার সাড়া গ্রহণ করা হয়েছে।');
  });

  $('[data-search-tracking]')?.addEventListener('click', () => toast('Tracking ID পাওয়া গেছে।'));
  $('[data-screen-approve]')?.addEventListener('click', () => toast('ডোনার স্ক্রিনিং অনুমোদিত হয়েছে।'));
  $('[data-screen-cancel]')?.addEventListener('click', () => toast('স্ক্রিনিং বাতিল করা হয়েছে। কারণ লিখুন।', 'error'));

  document.addEventListener('bondhu:blood-request-created', (event) => {
    saveLatest(event.detail || {});
  });

  const form = $('#blood-request-form');
  form?.addEventListener('input', () => saveLatest(formPayload()));
  form?.addEventListener('change', () => saveLatest(formPayload()));

  $$('[data-tracking-link]').forEach((el) => {
    el.addEventListener('click', async () => {
      const text = el.textContent.startsWith('http') ? el.textContent : `https://${el.textContent}`;
      try { await navigator.clipboard.writeText(text); toast('Tracking link copied'); }
      catch { toast(text); }
    });
  });

  render(getLatest());
})();
