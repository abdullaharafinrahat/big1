(() => {
  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
  const BN_DIGITS = ['০','১','২','৩','৪','৫','৬','৭','৮','৯'];
  const toBn = (value) => String(value).replace(/\d/g, (digit) => BN_DIGITS[digit]);

  const defaultAccount = {
    name: 'MD. Shariful Islam',
    phone: '01712345678',
    email: 'shariful@example.com',
    userId: 'BON00012345',
  };

  function readJson(key, fallback) {
    try { return JSON.parse(localStorage.getItem(key)) ?? fallback; }
    catch { return fallback; }
  }

  function writeJson(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
    return value;
  }

  function getAccount() { return readJson('bondhu.registrationAccount', defaultAccount); }
  function getProfile() { return readJson('bondhu.userProfile', null); }
  function setProfile(profile) { return writeJson('bondhu.userProfile', profile); }
  function getStatus() { return localStorage.getItem('bondhu.profileStatus') || (getProfile() ? 'pending' : 'incomplete'); }
  function setStatus(status) { localStorage.setItem('bondhu.profileStatus', status); return status; }
  function getAlerts() { return readJson('bondhu.donorAlerts', []); }
  function setAlerts(alerts) { return writeJson('bondhu.donorAlerts', alerts); }

  function initials(name = 'Bondhu User') {
    return name.split(/\s+/).filter(Boolean).slice(0, 2).map((part) => part[0]).join('').toUpperCase() || 'BU';
  }

  function lang() { return localStorage.getItem('bondhu.lang') === 'bn' ? 'bn' : 'en'; }
  function setLang(value) {
    localStorage.setItem('bondhu.lang', value);
    document.documentElement.lang = value;
    $$('.lang-switcher [data-lang]').forEach((button) => button.classList.toggle('active', button.dataset.lang === value));
    window.dispatchEvent(new CustomEvent('bondhu:lang', { detail: { lang: value } }));
  }

  function toast(message, type = 'ok') {
    const region = $('#toast-region');
    if (!region) return alert(message);
    const div = document.createElement('div');
    div.className = `toast ${type}`;
    div.textContent = message;
    region.append(div);
    setTimeout(() => div.remove(), 3500);
  }

  function englishDate(date = new Date()) {
    return new Intl.DateTimeFormat(lang() === 'bn' ? 'bn-BD' : 'en-US', { day: '2-digit', month: 'long', year: 'numeric' }).format(date);
  }

  function banglaDate(date = new Date()) {
    const monthsBn = ['বৈশাখ','জ্যৈষ্ঠ','আষাঢ়','শ্রাবণ','ভাদ্র','আশ্বিন','কার্তিক','অগ্রহায়ণ','পৌষ','মাঘ','ফাল্গুন','চৈত্র'];
    const monthsEn = ['Boishakh','Joishtho','Ashar','Srabon','Bhadro','Ashwin','Kartik','Agrahayan','Poush','Magh','Falgun','Chaitra'];
    const y = date.getFullYear();
    const startYear = date >= new Date(y, 3, 14) ? y : y - 1;
    const by = startYear - 593;
    const start = new Date(startYear, 3, 14);
    let diff = Math.floor((new Date(y, date.getMonth(), date.getDate()) - start) / 86400000);
    const lens = [31,31,31,31,31,30,30,30,30,30,30,30];
    let m = 0;
    while (m < 11 && diff >= lens[m]) { diff -= lens[m]; m += 1; }
    const d = diff + 1;
    return lang() === 'bn' ? `${toBn(d)} ${monthsBn[m]} ${toBn(by)}` : `${d} ${monthsEn[m]} ${by}`;
  }

  function arabicDate(date = new Date()) {
    try {
      return new Intl.DateTimeFormat(lang() === 'bn' ? 'bn-BD-u-ca-islamic' : 'en-u-ca-islamic', { day: 'numeric', month: 'long', year: 'numeric' }).format(date);
    } catch {
      return lang() === 'bn' ? 'হিজরি তারিখ' : 'Hijri date';
    }
  }

  function profileCompletion(profile = getProfile()) {
    if (!profile) return 20;
    const required = ['fullName','dateOfBirth','gender','primaryMobile','presentDistrict','occupation','bloodGroup','identityNumber','emergencyName','emergencyMobile'];
    const done = required.filter((key) => profile[key]).length;
    return Math.min(100, Math.round(20 + (done / required.length) * 80));
  }

  function normalize(value = '') { return String(value).trim().toLowerCase(); }

  function isMatchingDonor(alert) {
    const profile = getProfile() || {};
    const donorBlood = profile.bloodGroup || 'O+';
    const donorDistrict = normalize(profile.presentDistrict || profile.city || profile.district || 'ঢাকা');
    const alertDistrict = normalize(alert.district || alert.upazila || 'ঢাকা');
    const sameBlood = normalize(alert.bloodGroup) === normalize(donorBlood);
    const nearArea = !alertDistrict || !donorDistrict || alertDistrict.includes(donorDistrict) || donorDistrict.includes(alertDistrict);
    return sameBlood && nearArea;
  }

  function getMatchingAlerts() {
    return getAlerts().filter(isMatchingDonor).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  }

  function unreadMatchingCount() {
    return getMatchingAlerts().filter((alert) => !alert.read).length;
  }

  function markAlertsRead() {
    const alerts = getAlerts();
    const updated = alerts.map((alert) => isMatchingDonor(alert) ? { ...alert, read: true } : alert);
    setAlerts(updated);
    renderNotificationBadges();
  }

  function formatNeededDate(alert) {
    if (!alert.neededBy) return 'সময় উল্লেখ নেই';
    const date = new Date(alert.neededBy);
    if (Number.isNaN(date.getTime())) return alert.neededBy;
    return date.toLocaleString('bn-BD', { dateStyle: 'medium', timeStyle: 'short' });
  }

  function trackingPageHref(alert) {
    const page = `blood-tracking.html?id=${encodeURIComponent(alert.trackingId || '')}`;
    return location.pathname.includes('/admin/') ? `../${page}` : page;
  }

  function smsMarkup(alert) {
    const href = trackingPageHref(alert);
    const needed = alert.neededBy ? new Date(alert.neededBy) : null;
    const neededText = needed && !Number.isNaN(needed.getTime())
      ? needed.toLocaleString('bn-BD', { dateStyle: 'medium', timeStyle: 'short' })
      : (alert.neededBy || 'সময় উল্লেখ নেই');
    return `
      <div class="sms-popup-card">
        <div class="sms-popup-title">জরুরী রক্তের অনুরোধ</div>
        <p><strong>রোগী:</strong> ${alert.patientName || 'রোগী'}</p>
        <p><strong>রক্তের গ্রুপ:</strong> <span>${alert.bloodGroup || '—'}</span></p>
        <p><strong>প্রয়োজন:</strong> ${alert.unitsNeeded || 1} ব্যাগ</p>
        <p><strong>হাসপাতাল:</strong> ${alert.hospitalName || '—'}</p>
        <p><strong>লোকেশন:</strong> ${alert.upazila ? `${alert.upazila}, ` : ''}${alert.district || '—'}</p>
        <p><strong>তারিখ/সময়:</strong> ${neededText}</p>
        <small>বিস্তারিত দেখতে ও সাড়া দিতে ক্লিক করুন:</small>
        <a class="sms-link-button" href="${href}">https://bondhu.org/r/${alert.trackingId || ''}</a>
      </div>`;
  }

  function ensureNotificationPopup() {
    if ($('#notification-popup')) return;
    const messagesHref = location.pathname.includes('/admin/') ? '../messages.html' : 'messages.html';
    document.body.insertAdjacentHTML('beforeend', `
      <div class="notification-popup-backdrop hidden" id="notification-popup-backdrop"></div>
      <section class="notification-popup hidden" id="notification-popup" aria-live="polite">
        <button class="notification-popup-close" id="notification-popup-close" type="button" aria-label="Close">×</button>
        <h2>Blood Request Notification</h2>
        <div id="notification-popup-content"></div>
        <div class="notification-popup-actions">
          <a href="${messagesHref}" class="btn primary">Open Messages</a>
          <button type="button" class="btn soft" id="mark-notifications-read">Mark read</button>
        </div>
      </section>`);

    $('#notification-popup-close')?.addEventListener('click', closeNotificationPopup);
    $('#notification-popup-backdrop')?.addEventListener('click', closeNotificationPopup);
    $('#mark-notifications-read')?.addEventListener('click', () => { markAlertsRead(); closeNotificationPopup(); });
  }

  function openNotificationPopup() {
    ensureNotificationPopup();
    const alerts = getMatchingAlerts();
    const content = $('#notification-popup-content');
    if (content) content.innerHTML = alerts.length ? alerts.slice(0, 5).map(smsMarkup).join('') : '<p class="empty-state">No matching blood request notification.</p>';
    $('#notification-popup')?.classList.remove('hidden');
    $('#notification-popup-backdrop')?.classList.remove('hidden');
    document.body.classList.add('notification-open');
  }

  function closeNotificationPopup() {
    $('#notification-popup')?.classList.add('hidden');
    $('#notification-popup-backdrop')?.classList.add('hidden');
    document.body.classList.remove('notification-open');
  }

  function renderNotificationBadges() {
    const count = unreadMatchingCount();
    $$('.notification b, .mobile-bell b').forEach((badge) => {
      badge.textContent = count;
      badge.hidden = count === 0;
    });
    $$('.sidebar a[data-page="messages"] .badge').forEach((badge) => {
      badge.textContent = count;
      badge.hidden = count === 0;
    });
  }

  function setupNotifications() {
    renderNotificationBadges();
    $$('.notification, .mobile-bell').forEach((button) => button.addEventListener('click', openNotificationPopup));
    // Message links navigate directly to the tracking page.
    window.addEventListener('storage', (event) => {
      if (event.key === 'bondhu.donorAlerts') {
        renderNotificationBadges();
        if (unreadMatchingCount() > 0) openNotificationPopup();
      }
    });
    window.addEventListener('bondhu:alerts-updated', () => {
      renderNotificationBadges();
      if (unreadMatchingCount() > 0) openNotificationPopup();
    });
    const unread = unreadMatchingCount();
    if (unread > 0 && !sessionStorage.getItem('bondhu.notificationPopupShown')) {
      sessionStorage.setItem('bondhu.notificationPopupShown', 'true');
      setTimeout(openNotificationPopup, 550);
    }
  }

  function setupShell(active = 'dashboard') {
    const account = getAccount();
    $$('.app-user-name').forEach((el) => { el.textContent = account.name || 'Bondhu User'; });
    $$('.app-user-id').forEach((el) => { el.textContent = account.userId || 'BON00012345'; });
    $$('.user-avatar').forEach((el) => { el.textContent = initials(account.name); });
    $$('.sidebar a').forEach((a) => a.classList.toggle('active', a.dataset.page === active));
    $$('.lang-switcher [data-lang]').forEach((btn) => btn.addEventListener('click', () => setLang(btn.dataset.lang)));
    setLang(lang());

    const dateChip = $('#date-chip');
    if (dateChip) dateChip.innerHTML = `<span>${englishDate()}</span><span>|</span><span>${banglaDate()}</span><span>|</span><span>${arabicDate()}</span>`;

    const sidebar = $('#app-sidebar');
    const backdrop = $('#drawer-backdrop');
    const open = $('#mobile-menu');
    const close = $('#drawer-close');
    const openDrawer = () => { sidebar?.classList.add('is-open'); backdrop?.classList.remove('hidden'); document.body.style.overflow = 'hidden'; };
    const closeDrawer = () => { sidebar?.classList.remove('is-open'); backdrop?.classList.add('hidden'); document.body.style.overflow = ''; };
    open?.addEventListener('click', openDrawer);
    close?.addEventListener('click', closeDrawer);
    backdrop?.addEventListener('click', closeDrawer);
    document.addEventListener('keydown', (event) => { if (event.key === 'Escape') { closeDrawer(); closeNotificationPopup(); } });
    $$('#app-sidebar a').forEach((a) => a.addEventListener('click', closeDrawer));
    $('#logout-btn')?.addEventListener('click', () => { toast(lang() === 'bn' ? 'লগআউট হয়েছে' : 'Logged out'); setTimeout(() => { location.href = 'login.html'; }, 600); });
    setupNotifications();
  }

  window.BondhuApp = {
    $, $$, getAccount, getProfile, setProfile, getStatus, setStatus, initials,
    lang, setLang, toast, setupShell, profileCompletion, englishDate, banglaDate, arabicDate,
    getAlerts, setAlerts, getMatchingAlerts, unreadMatchingCount, markAlertsRead, smsMarkup,
    openNotificationPopup, closeNotificationPopup, renderNotificationBadges, isMatchingDonor, trackingPageHref,
  };
})();
