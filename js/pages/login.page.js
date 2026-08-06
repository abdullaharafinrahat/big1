(() => {
  const form = document.querySelector('#login-form');
  const password = document.querySelector('#password');
  const toggle = document.querySelector('#toggle-password');
  const region = document.querySelector('#toast-region');

  const DEMO_USERS = [
    { identifier: 'admin@bondhu.local', password: 'admin123', name: 'Bondhu Admin' },
    { identifier: 'BON000254', password: 'Bondhu@2026', name: 'Bondhu Foundation' },
    { identifier: '01712345678', password: '123456', name: 'Mobile User' },
  ];

  const copy = {
    bn: {
      tagline: 'এক প্ল্যাটফর্ম, সকল সেবা', welcome: 'স্বাগতম ফিরে আসার জন্য', subtitle: 'আপনার অ্যাকাউন্ট লগইন করুন', idLabel: 'ইউজার আইডি / মোবাইল নম্বর', idPlaceholder: 'ইউজার আইডি অথবা মোবাইল নম্বর লিখুন', passLabel: 'পাসওয়ার্ড', passPlaceholder: 'পাসওয়ার্ড লিখুন', show: 'দেখুন', hide: 'লুকান', remember: 'আমাকে মনে রাখুন', submit: 'লগইন করুন', or: 'অথবা', forgot: 'পাসওয়ার্ড ভুলে গেছেন?', newUser: 'নতুন ব্যবহারকারী', newUserText: 'নতুন হিসাবে নিবন্ধন করুন', institution: 'প্রতিষ্ঠান', institutionText: 'আপনার প্রতিষ্ঠান নিবন্ধন করুন', register: 'নিবন্ধন করুন', safe: 'আপনার তথ্য নিরাপদ এবং গোপন রাখা হবে।', support: 'সহায়তার জন্য কল করুন', copyright: '© 2026 Bondhu. সকল অধিকার সংরক্ষিত।'
    },
    en: {
      tagline: 'One platform, all services', welcome: 'Welcome back', subtitle: 'Login to your account', idLabel: 'User ID / Mobile Number', idPlaceholder: 'Enter user ID or mobile number', passLabel: 'Password', passPlaceholder: 'Enter password', show: 'Show', hide: 'Hide', remember: 'Remember me', submit: 'Login', or: 'or', forgot: 'Forgot password?', newUser: 'New User', newUserText: 'Register as a new user', institution: 'Institution', institutionText: 'Register your institution', register: 'Register', safe: 'Your information will be kept safe and private.', support: 'Call for support', copyright: '© 2026 Bondhu. All rights reserved.'
    }
  };

  function toast(message, type = 'ok') {
    const item = document.createElement('div');
    item.className = `login-toast ${type}`;
    item.textContent = message;
    region.append(item);
    setTimeout(() => item.remove(), 3500);
  }

  function applyLanguage(lang = localStorage.getItem('bondhu.lang') || 'bn') {
    lang = lang === 'en' ? 'en' : 'bn';
    localStorage.setItem('bondhu.lang', lang);
    document.documentElement.lang = lang;
    document.querySelectorAll('[data-lang]').forEach((btn) => btn.classList.toggle('active', btn.dataset.lang === lang));
    const t = copy[lang];
    document.querySelector('.login-header p').textContent = t.tagline;
    document.querySelector('.welcome-text h2').textContent = t.welcome;
    document.querySelector('.welcome-text p').textContent = t.subtitle;
    form.identifier.closest('label').querySelector('span').textContent = t.idLabel;
    form.identifier.placeholder = t.idPlaceholder;
    form.password.closest('label').querySelector('span').textContent = t.passLabel;
    form.password.placeholder = t.passPlaceholder;
    toggle.textContent = password.type === 'text' ? t.hide : t.show;
    document.querySelector('.remember-row span').textContent = t.remember;
    document.querySelector('.submit-btn span').textContent = t.submit;
    document.querySelector('.or-divider b').textContent = t.or;
    document.querySelector('.forgot-link span').textContent = t.forgot;
    const cards = document.querySelectorAll('.registration-card');
    cards[0].querySelector('h3').textContent = t.newUser;
    cards[0].querySelector('p').textContent = t.newUserText;
    cards[0].querySelector('a').firstChild.textContent = `${t.register} `;
    cards[1].querySelector('h3').textContent = t.institution;
    cards[1].querySelector('p').textContent = t.institutionText;
    cards[1].querySelector('a').firstChild.textContent = `${t.register} `;
    document.querySelector('.security-copy span').textContent = t.safe;
    document.querySelector('.support-copy small').textContent = t.support;
    document.querySelector('.copyright').textContent = t.copyright;
  }

  toggle.addEventListener('click', () => {
    const showing = password.type === 'text';
    password.type = showing ? 'password' : 'text';
    applyLanguage(localStorage.getItem('bondhu.lang') || 'bn');
    toggle.setAttribute('aria-label', showing ? 'Show password' : 'Hide password');
  });

  document.querySelectorAll('[data-lang]').forEach((button) => {
    button.addEventListener('click', () => {
      applyLanguage(button.dataset.lang);
      toast(button.dataset.lang === 'bn' ? 'বাংলা নির্বাচন করা হয়েছে।' : 'English selected.');
    });
  });

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const identifier = form.identifier.value.trim();
    const pass = form.password.value;
    const lang = localStorage.getItem('bondhu.lang') || 'bn';

    if (!identifier || !pass) {
      toast(lang === 'bn' ? 'ইউজার আইডি এবং পাসওয়ার্ড লিখুন।' : 'Enter user ID and password.', 'error');
      return;
    }

    const demoUser = DEMO_USERS.find((user) => user.identifier.toLowerCase() === identifier.toLowerCase() && user.password === pass);
    if (demoUser) {
      localStorage.setItem('bondhu.demoUser', JSON.stringify({ identifier, name: demoUser.name, remembered: form.remember.checked }));
      localStorage.setItem('bondhu.registrationAccount', JSON.stringify({ name: demoUser.name, phone: identifier.startsWith('01') ? identifier : '', email: identifier.includes('@') ? identifier : '', userId: identifier.startsWith('BON') ? identifier : 'BON000254' }));
      toast(lang === 'bn' ? `স্বাগতম, ${demoUser.name}!` : `Welcome, ${demoUser.name}!`);
      setTimeout(() => { window.location.href = 'dashboard.html'; }, 700);
      return;
    }

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ identifier, password: pass }),
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(data.message || 'Invalid credentials');
      if (data.token) localStorage.setItem('bondhu.accessToken', data.token);
      if (data.user) {
        localStorage.setItem('bondhu.user', JSON.stringify(data.user));
        localStorage.setItem('bondhu.registrationAccount', JSON.stringify({ name: data.user.name, phone: data.user.phone || '', email: data.user.email || '', userId: data.user.id || 'BON000254' }));
      }
      toast(lang === 'bn' ? 'লগইন সফল হয়েছে।' : 'Login successful.');
      setTimeout(() => { window.location.href = 'dashboard.html'; }, 700);
    } catch (error) {
      toast(lang === 'bn' ? 'লগইন ব্যর্থ। Demo: BON000254 / Bondhu@2026' : 'Login failed. Demo: BON000254 / Bondhu@2026', 'error');
    }
  });

  applyLanguage(localStorage.getItem('bondhu.lang') || 'bn');
})();
