/**
 * Bondhu — Mobile validation + SMS outbox helpers (demo).
 *
 * Exposes window.BondhuSMS with:
 *   isValidBdMobile(v)      -> boolean
 *   normalizeBdMobile(v)    -> "01XXXXXXXXX" | ""
 *   attachMobileValidator(el, opts?) -> attaches inline validation to an <input>
 *   queueSMS(msg)           -> appends to localStorage['bondhu.smsOutbox']
 *   sendConfirmationSMS(kind, phone, {name, code, meta})  -> convenience wrapper
 *   sendBulkSMS(list)       -> queue many at once, returns number sent
 *
 * Also auto-attaches validators to all input[type=tel] and input[data-mobile]
 * on DOMContentLoaded.
 *
 * DEMO ONLY: no messages are actually delivered. They are queued in
 * localStorage['bondhu.smsOutbox'] and console.log'd with the prefix
 * '[SMS stub → outbox]'. See pages/admin/sms-outbox.html to inspect the queue.
 */
(function () {
  'use strict';

  // ---------- Digit conversion (Bangla → English) ----------
  const BN_TO_EN = {
    '০':'0','১':'1','২':'2','৩':'3','৪':'4',
    '৫':'5','৬':'6','৭':'7','৮':'8','৯':'9',
  };
  function toEnglishDigits(s) {
    return String(s || '').replace(/[০-৯]/g, d => BN_TO_EN[d] || d);
  }

  // ---------- Normalisation ----------
  // Accepts: 01712345678, +8801712345678, 8801712345678, 0088 01712-345678,
  //          Bangla digits, spaces, hyphens, dots.
  function normalizeBdMobile(raw) {
    let v = toEnglishDigits(raw).replace(/[^\d]/g, '');
    if (!v) return '';
    // 00880xxxxxxxxxx -> strip
    if (v.startsWith('00880')) v = v.slice(5);
    else if (v.startsWith('880')) v = v.slice(3);
    else if (v.startsWith('+880')) v = v.slice(4);
    // Now must be 01XXXXXXXXX (11 digits)
    if (v.length === 10 && v.startsWith('1')) v = '0' + v; // handle "1712345678"
    return v;
  }

  // ---------- Validation ----------
  // BD mobile format: 11 digits, starts with 01, and the 3rd digit is 3–9
  // (Grameenphone 3/7, Robi 5/6/8, Banglalink 4/9, Teletalk 5, Airtel 6, etc.)
  function isValidBdMobile(raw) {
    const v = normalizeBdMobile(raw);
    return /^01[3-9]\d{8}$/.test(v);
  }

  // ---------- Attach live validator to an <input> ----------
  function attachMobileValidator(input, opts) {
    if (!input || input.dataset.__sms_validated === '1') return;
    input.dataset.__sms_validated = '1';
    input.setAttribute('inputmode', 'tel');
    input.setAttribute('autocomplete', 'tel');
    input.setAttribute('maxlength', '20');
    if (!input.getAttribute('pattern')) {
      input.setAttribute('pattern', '.*01[3-9]\\d{8}.*');
    }
    if (!input.title) {
      input.title = 'বাংলাদেশি মোবাইল নম্বর দিন — যেমন 01712345678';
    }

    // Create/find helper text element
    let helper = input.parentElement.querySelector('.mobile-helper');
    if (!helper) {
      helper = document.createElement('div');
      helper.className = 'mobile-helper';
      helper.style.cssText = 'font-size:11.5px; margin-top:4px; min-height:14px; line-height:1.3;';
      input.parentElement.appendChild(helper);
    }

    const setState = (state, msg) => {
      helper.textContent = msg || '';
      if (state === 'error') {
        helper.style.color = '#d32f2f';
        input.style.borderColor = '#d32f2f';
        input.setCustomValidity(msg || 'সঠিক মোবাইল নম্বর দিন');
      } else if (state === 'ok') {
        helper.style.color = '#16a34a';
        input.style.borderColor = '';
        input.setCustomValidity('');
      } else {
        helper.style.color = '#94a3b8';
        input.style.borderColor = '';
        input.setCustomValidity('');
      }
    };

    const check = () => {
      const raw = input.value.trim();
      if (!raw) {
        setState('idle', input.required ? 'মোবাইল নম্বর দিন (01XXXXXXXXX)' : '');
        return;
      }
      const norm = normalizeBdMobile(raw);
      if (isValidBdMobile(raw)) {
        // Normalise the visible value too
        if (input.value !== norm) input.value = norm;
        setState('ok', '✓ বৈধ নম্বর');
      } else {
        setState('error', 'সঠিক মোবাইল নম্বর নয় — উদাহরণ: 01712345678');
      }
    };
    input.addEventListener('input', check);
    input.addEventListener('blur', check);
    // Initial pass (in case the input has a pre-filled value)
    if (input.value) check();
  }

  // ---------- SMS outbox ----------
  const OUTBOX_KEY = 'bondhu.smsOutbox';
  function readOutbox() {
    try { return JSON.parse(localStorage.getItem(OUTBOX_KEY) || '[]'); }
    catch (e) { return []; }
  }
  function writeOutbox(list) {
    try { localStorage.setItem(OUTBOX_KEY, JSON.stringify(list)); }
    catch (e) { console.warn('SMS outbox write failed', e); }
  }

  function queueSMS(msg) {
    if (!msg || !msg.to) { console.warn('queueSMS: missing to', msg); return null; }
    const norm = normalizeBdMobile(msg.to);
    if (!isValidBdMobile(norm)) {
      console.warn('[SMS stub] invalid recipient number, skipping', msg.to);
      return null;
    }
    const record = {
      id: 'SMS-' + Date.now().toString(36) + '-' + Math.floor(Math.random() * 1000).toString(36),
      to: norm,
      role: msg.role || 'user',
      kind: msg.kind || 'notification',
      bookingId: msg.bookingId || null,
      body: msg.body || '',
      queuedAt: new Date().toISOString(),
      queuedAtLocal: new Date().toLocaleString('bn-BD'),
      status: 'queued',
      demo: true,
    };
    const list = readOutbox();
    list.unshift(record);
    writeOutbox(list);
    console.log('[SMS stub → outbox]', record);
    return record;
  }

  function sendBulkSMS(list) {
    let n = 0;
    (list || []).forEach(m => { if (queueSMS(m)) n++; });
    return n;
  }

  // ---------- Confirmation SMS templates ----------
  const TEMPLATES = {
    'blood_request': (o) =>
      `Bondhu: রক্তের অনুরোধ (${o.code}) সফলভাবে জমা হয়েছে। রোগী: ${o.name || '-'}. আমরা রক্তদাতাদের নোটিফাই করছি।`,
    'ambulance_registration': (o) =>
      `Bondhu: অ্যাম্বুলেন্স রেজিস্ট্রেশন (${o.code}) জমা হয়েছে। অ্যাডমিন যাচাইয়ের পর লাইভ তালিকায় যুক্ত হবে।`,
    'ambulance_registration_owner': (o) =>
      `Bondhu: আপনার অ্যাম্বুলেন্স (${o.plate || o.name || ''}) রেজিস্ট্রেশন (${o.code}) সফলভাবে জমা হয়েছে। অ্যাডমিন যাচাই চলছে।`,
    'ambulance_booking': (o) =>
      `Bondhu: অ্যাম্বুলেন্স বুকিং (${o.code}) কনফার্ম হয়েছে। ${o.ambulance ? 'গাড়ি: ' + o.ambulance + '. ' : ''}চালক শীঘ্রই যোগাযোগ করবেন।`,
    'ambulance_booking_driver': (o) =>
      `Bondhu: নতুন বুকিং ${o.code}. রোগী: ${o.name} (${o.phone}). ${o.pickup ? 'পিকআপ: ' + o.pickup + '. ' : ''}${o.destination ? 'গন্তব্য: ' + o.destination + '. ' : ''}${o.when ? 'সময়: ' + o.when + '.' : ''}`.trim(),
    'ambulance_booking_owner': (o) =>
      `Bondhu: আপনার অ্যাম্বুলেন্স ${o.plate || ''} বুক হয়েছে (${o.code}). চালক: ${o.driver || '-'}. রোগী: ${o.name}. ${o.when ? 'সময়: ' + o.when + '.' : ''}`.trim(),
    'home_publish': (o) =>
      `Bondhu: রেন্টাল লিস্টিং (${o.code}) জমা হয়েছে। ${o.property ? 'বাসা: ' + o.property + '. ' : ''}অ্যাডমিন যাচাইয়ের পর লাইভ হবে।`,
    'missing_report': (o) =>
      `Bondhu: নিখোঁজ বিজ্ঞপ্তি (${o.code}) সফলভাবে জমা হয়েছে। ${o.name ? 'ব্যক্তি: ' + o.name + '. ' : ''}যাচাইয়ের পর প্রকাশ করা হবে।`,
    'destination_booking': (o) =>
      `Bondhu: গন্তব্য বুকিং (${o.code}) নিশ্চিত হয়েছে। ${o.destination ? 'গন্তব্য: ' + o.destination + '. ' : ''}${o.when ? 'সময়: ' + o.when + '.' : ''}`.trim(),
    'admin_review_status': (o) =>
      `Bondhu: আপনার সাবমিশন ${o.code} — নতুন স্ট্যাটাস: ${o.status}. ${o.note ? 'নোট: ' + o.note : ''}`.trim(),
  };

  function sendConfirmationSMS(kind, phone, data) {
    const tpl = TEMPLATES[kind];
    if (!tpl) { console.warn('unknown SMS kind', kind); return null; }
    return queueSMS({
      to: phone,
      role: data.role || 'user',
      kind,
      bookingId: data.code || data.bookingId || null,
      body: tpl(data),
    });
  }

  // ---------- Auto-attach on load ----------
  function autoAttach() {
    const inputs = document.querySelectorAll('input[type=tel], input[data-mobile]');
    inputs.forEach(el => attachMobileValidator(el));
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', autoAttach);
  } else {
    autoAttach();
  }
  // Also re-attach when new inputs might get injected (SPA-ish safety net)
  const mo = new MutationObserver(() => autoAttach());
  mo.observe(document.documentElement, { childList: true, subtree: true });

  // ---------- Expose ----------
  window.BondhuSMS = {
    isValidBdMobile,
    normalizeBdMobile,
    attachMobileValidator,
    queueSMS,
    sendBulkSMS,
    sendConfirmationSMS,
    readOutbox,
    TEMPLATES,
    OUTBOX_KEY,
  };
})();
