(() => {
  const CODES = { mobile: '1123456', email: '123456' };
  const state = { accountType: '', method: '', code: '', account: null };

  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

  const accountTypeSection = $('.account-type-section');
  const chooseSection = $('#choose-section');
  const registrationSection = $('#registration-section');
  const methodButtons = $$('[data-method]');
  const identityForm = $('#identity-form');
  const otpForm = $('#otp-form');
  const passwordForm = $('#password-form');
  const otpRow = $('#otp-row');
  const codeMessage = $('#code-message');
  const selectedMethodLabel = $('#selected-method-label');
  const successPanel = $('#success-panel');

  const i18n = {
    bn: {
      chooseTitle: 'রেজিস্ট্রেশন পদ্ধতি নির্বাচন করুন',
      chooseText: 'Bondhu Healthcare অ্যাকাউন্ট তৈরি করার জন্য একটি পদ্ধতি নির্বাচন করুন।',
      mobileTitle: 'মোবাইল রেজিস্ট্রেশন', mobileSmall: 'বাংলাদেশি মোবাইল নম্বর', mobileEm: 'OTP যাচাই',
      emailTitle: 'ইমেইল রেজিস্ট্রেশন', emailSmall: 'আন্তর্জাতিক / প্রবাসী ব্যবহারকারী', emailEm: 'ইমেইল যাচাই',
      mobileSelected: 'মোবাইল রেজিস্ট্রেশন', emailSelected: 'ইমেইল রেজিস্ট্রেশন', registrationForm: 'রেজিস্ট্রেশন ফর্ম', changeMethod: 'পদ্ধতি পরিবর্তন করুন',
      enterInfo: 'তথ্য দিন', name: 'নাম *', phone: 'মোবাইল নম্বর *', email: 'ইমেইল ঠিকানা *', referral: 'রেফারেল আইডি (ঐচ্ছিক)', sendCode: 'কোড পাঠান',
      defaultHint: 'প্রয়োজনীয় তথ্য পূরণ করুন।', mobileHint: 'আপনার নাম ও বাংলাদেশি মোবাইল নম্বর দিন। যাচাইয়ের জন্য OTP পাঠানো হবে।', emailHint: 'আপনার নাম ও ইমেইল ঠিকানা দিন। যাচাইয়ের জন্য কোড পাঠানো হবে।',
      verifyTitle: 'OTP / কোড যাচাই করুন', codeReady: 'আপনাকে পাঠানো যাচাইকরণ কোড লিখুন।', verifyCode: 'কোড যাচাই করুন', resend: 'পুনরায় পাঠান',
      setPassword: 'পাসওয়ার্ড সেট করুন', password: 'পাসওয়ার্ড তৈরি করুন *', passwordConfirm: 'পাসওয়ার্ড নিশ্চিত করুন *', terms: 'আমি Terms & Conditions-এ সম্মত', createAccount: 'অ্যাকাউন্ট তৈরি করুন',
      successTitle: 'অ্যাকাউন্ট সফলভাবে তৈরি হয়েছে', successSummary: 'আপনার অ্যাকাউন্ট প্রস্তুত।', goDashboard: 'ড্যাশবোর্ডে যান', footer: '© 2026 Bondhu Healthcare. সকল অধিকার সংরক্ষিত।', help: 'Help:',
      codeSent: 'যাচাইকরণ কোড পাঠানো হয়েছে।', codeSentTo: (target) => `যাচাইকরণ কোড পাঠানো হয়েছে ${target}।`, codeResent: 'যাচাইকরণ কোড পুনরায় পাঠানো হয়েছে।', invalidCode: 'যাচাইকরণ কোড সঠিক নয়।', codeVerified: 'কোড সফলভাবে যাচাই হয়েছে।', accountCreated: 'অ্যাকাউন্ট সফলভাবে তৈরি হয়েছে।',
      errName: 'নাম লিখুন।', errPhone: 'সঠিক বাংলাদেশি মোবাইল নম্বর লিখুন। যেমন: 01712345678', errEmail: 'সঠিক ইমেইল ঠিকানা লিখুন।', errPasswordLength: 'পাসওয়ার্ড কমপক্ষে ৬ অক্ষরের হতে হবে।', errPasswordMatch: 'পাসওয়ার্ড মিলছে না।', errTerms: 'Terms & Conditions-এ সম্মত হন।',
      accountReady: (name) => `${name}, আপনার অ্যাকাউন্ট সফলভাবে তৈরি হয়েছে।`,
    },
    en: {
      chooseTitle: 'Choose registration method', chooseText: 'Select how you want to create your Bondhu Healthcare account.',
      mobileTitle: 'Mobile Registration', mobileSmall: 'Bangladesh number', mobileEm: 'OTP verification',
      emailTitle: 'Email Registration', emailSmall: 'International / expatriate user', emailEm: 'Email verification',
      mobileSelected: 'Mobile Registration', emailSelected: 'Email Registration', registrationForm: 'Registration Form', changeMethod: 'Change Method',
      enterInfo: 'Enter Information', name: 'Name *', phone: 'Mobile Number *', email: 'Email Address *', referral: 'Referral ID (optional)', sendCode: 'Send Code',
      defaultHint: 'Fill in the required information.', mobileHint: 'Enter your name and Bangladesh mobile number. We will send an OTP to verify it.', emailHint: 'Enter your name and email address. We will send a verification code.',
      verifyTitle: 'Verify OTP / Code', codeReady: 'Enter the verification code sent to you.', verifyCode: 'Verify Code', resend: 'Resend Code',
      setPassword: 'Set Password', password: 'Create Password *', passwordConfirm: 'Confirm Password *', terms: 'I agree to the Terms & Conditions', createAccount: 'Create Account',
      successTitle: 'Account Created Successfully', successSummary: 'Your account is ready.', goDashboard: 'Go to Dashboard', footer: '© 2026 Bondhu Healthcare. All rights reserved.', help: 'Help:',
      codeSent: 'Verification code sent.', codeSentTo: (target) => `Verification code sent to ${target}.`, codeResent: 'Verification code resent.', invalidCode: 'Invalid verification code.', codeVerified: 'Code verified successfully.', accountCreated: 'Account created successfully.',
      errName: 'Name is required.', errPhone: 'Enter a valid Bangladesh mobile number. Example: 01712345678', errEmail: 'Enter a valid email address.', errPasswordLength: 'Password must be at least 6 characters.', errPasswordMatch: 'Passwords do not match.', errTerms: 'Please agree to the Terms & Conditions.',
      accountReady: (name) => `${name}, your account has been created successfully.`,
    },
  };

  const lang = () => (localStorage.getItem('bondhu.lang') === 'en' ? 'en' : 'bn');
  const t = () => i18n[lang()];

  function toast(message, type = 'ok') {
    const region = $('#toast-region');
    const item = document.createElement('div');
    item.className = `toast ${type}`;
    item.textContent = message;
    region.append(item);
    setTimeout(() => item.remove(), 3500);
  }

  function setLabelText(input, text) {
    const label = input?.closest('label');
    const textNode = label && [...label.childNodes].find((node) => node.nodeType === Node.TEXT_NODE && node.textContent.trim());
    if (textNode) textNode.textContent = text;
  }

  function setCheckLabelText(labelSelector, text) {
    const label = $(labelSelector);
    const textNode = label && [...label.childNodes].find((node) => node.nodeType === Node.TEXT_NODE);
    if (textNode) textNode.textContent = ` ${text}`;
  }

  function applyLanguage() {
    const c = t();
    document.documentElement.lang = lang();
    document.querySelectorAll('.lang-switcher [data-lang]').forEach((btn) => btn.classList.toggle('active', btn.dataset.lang === lang()));
    const isInstitution = state.accountType === 'institution';
    $('.choose-section h3').textContent = isInstitution
      ? (lang() === 'bn' ? 'প্রতিষ্ঠান রেজিস্ট্রেশন পদ্ধতি নির্বাচন করুন' : 'Choose institution registration method')
      : c.chooseTitle;
    $('.choose-section .section-heading p').textContent = isInstitution
      ? (lang() === 'bn' ? 'প্রতিষ্ঠানের অ্যাকাউন্ট যাচাই করার জন্য মোবাইল অথবা ইমেইল নির্বাচন করুন।' : 'Select mobile or email verification for the institution account.')
      : c.chooseText;
    $('#back-account-type-btn').textContent = lang() === 'bn' ? '← আবার নির্বাচন করুন' : '← Back to account type';
    methodButtons[0].querySelector('strong').textContent = c.mobileTitle;
    methodButtons[0].querySelector('small').textContent = c.mobileSmall;
    methodButtons[0].querySelector('em').textContent = c.mobileEm;
    methodButtons[1].querySelector('strong').textContent = c.emailTitle;
    methodButtons[1].querySelector('small').textContent = c.emailSmall;
    methodButtons[1].querySelector('em').textContent = c.emailEm;
    $('.registration-section .section-toolbar h2').textContent = c.registrationForm;
    $('#change-method-btn').textContent = c.changeMethod;
    $('#identity-form .panel-title strong').textContent = c.enterInfo;
    setLabelText(identityForm.name, isInstitution ? (lang() === 'bn' ? 'প্রতিষ্ঠানের নাম *' : 'Institution Name *') : c.name);
    setLabelText(identityForm.phone, isInstitution ? (lang() === 'bn' ? 'প্রতিষ্ঠানের মোবাইল নম্বর *' : 'Institution Mobile Number *') : c.phone);
    setLabelText(identityForm.email, isInstitution ? (lang() === 'bn' ? 'প্রতিষ্ঠানের ইমেইল ঠিকানা *' : 'Institution Email Address *') : c.email);
    setLabelText(identityForm.referralId, isInstitution ? (lang() === 'bn' ? 'প্রতিষ্ঠান/রেফারেল আইডি (ঐচ্ছিক)' : 'Institution / Referral ID (optional)') : c.referral);
    identityForm.name.placeholder = isInstitution ? (lang() === 'bn' ? 'প্রতিষ্ঠানের নাম লিখুন' : 'Enter institution name') : (lang() === 'bn' ? 'আপনার পূর্ণ নাম লিখুন' : 'Enter your full name');
    identityForm.phone.placeholder = isInstitution ? '1XXXXXXXXX' : '1XXXXXXXXX';
    identityForm.email.placeholder = isInstitution ? 'institution@example.com' : 'name@example.com';
    $('#identity-form button[type="submit"]').textContent = c.sendCode;
    $('#otp-form .panel-title strong').textContent = c.verifyTitle;
    if (!state.account) codeMessage.textContent = c.codeReady;
    $('#otp-form button[type="submit"]').textContent = c.verifyCode;
    $('#resend-code').textContent = c.resend;
    $('#password-form .panel-title strong').textContent = c.setPassword;
    setLabelText(passwordForm.password, c.password);
    setLabelText(passwordForm.passwordConfirm, c.passwordConfirm);
    setCheckLabelText('#password-form .check-line', c.terms);
    $('#password-form button[type="submit"]').textContent = c.createAccount;
    $('#success-panel h2').textContent = c.successTitle;
    if (!state.account) $('#success-summary').textContent = c.successSummary;
    $('#open-dashboard-btn').textContent = c.goDashboard;
    const legacyFooter = $('.sim-footer');
    if (legacyFooter) {
      legacyFooter.querySelector('span:first-child').textContent = c.footer;
      legacyFooter.querySelector('span:last-child').innerHTML = `${c.help} <b>09609-123456</b>`;
    }
    if (state.method) {
      selectedMethodLabel.textContent = state.method === 'mobile' ? c.mobileSelected : c.emailSelected;
      if (isInstitution) {
        $('#identity-hint').textContent = state.method === 'mobile'
          ? (lang() === 'bn' ? 'প্রতিষ্ঠানের নাম ও অফিসিয়াল মোবাইল নম্বর দিন। যাচাইয়ের জন্য OTP পাঠানো হবে।' : 'Enter institution name and official mobile number. We will send an OTP to verify it.')
          : (lang() === 'bn' ? 'প্রতিষ্ঠানের নাম ও অফিসিয়াল ইমেইল দিন। যাচাইয়ের জন্য কোড পাঠানো হবে।' : 'Enter institution name and official email address. We will send a verification code.');
      } else {
        $('#identity-hint').textContent = state.method === 'mobile' ? c.mobileHint : c.emailHint;
      }
    } else $('#identity-hint').textContent = c.defaultHint;
  }


  function chooseAccountType(type, updateUrl = true) {
    state.accountType = type === 'institution' ? 'institution' : 'user';
    localStorage.setItem('bondhu.accountType', state.accountType);
    document.querySelectorAll('.account-type-card').forEach((card) => {
      card.classList.toggle('is-active', card.dataset.accountType === state.accountType);
    });
    accountTypeSection.hidden = true;
    chooseSection.hidden = false;
    registrationSection.hidden = true;
    document.querySelector('.sim-footer')?.removeAttribute('hidden');
    state.method = '';
    state.code = '';
    methodButtons.forEach((button) => button.classList.remove('is-active'));
    setVisiblePanel('identity-form');
    applyLanguage();
    if (updateUrl) {
      const url = new URL(window.location.href);
      url.searchParams.set('type', state.accountType);
      history.replaceState({}, '', url);
    }
    chooseSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  function setupAccountType() {
    const params = new URLSearchParams(window.location.search);
    const typeParam = params.get('type');
    const initialType = typeParam === 'institution' || typeParam === 'user' ? typeParam : '';

    document.querySelectorAll('.account-type-card').forEach((card) => {
      card.classList.toggle('is-active', initialType && card.dataset.accountType === initialType);
      card.addEventListener('click', (event) => {
        event.preventDefault();
        chooseAccountType(card.dataset.accountType || 'user');
      });
    });

    if (initialType) {
      chooseAccountType(initialType, false);
    } else {
      state.accountType = '';
      accountTypeSection.hidden = false;
      chooseSection.hidden = true;
      registrationSection.hidden = true;
      document.querySelector('.sim-footer')?.setAttribute('hidden', '');
    }
  }

  function setupLanguageSwitcher() {
    document.querySelectorAll('.lang-switcher [data-lang]').forEach((btn) => {
      btn.addEventListener('click', () => {
        localStorage.setItem('bondhu.lang', btn.dataset.lang);
        applyLanguage();
        toast(btn.dataset.lang === 'bn' ? 'বাংলা নির্বাচন করা হয়েছে।' : 'English selected.');
      });
    });
    applyLanguage();
  }

  function setVisiblePanel(panelId) {
    $$('.step-panel').forEach((panel) => {
      panel.hidden = panel.id !== panelId;
      panel.classList.toggle('is-active', panel.id === panelId);
    });
  }

  function normalizePhone(value = '') {
    let phone = String(value).replace(/[\s-]/g, '').trim();
    if (phone.startsWith('+880')) phone = `0${phone.slice(4)}`;
    if (phone.startsWith('880')) phone = `0${phone.slice(3)}`;
    if (/^1[3-9]\d{8}$/.test(phone)) phone = `0${phone}`;
    return phone;
  }

  const validatePhone = (phone) => /^(?:\+?88)?01[3-9]\d{8}$/.test(String(phone).replace(/[\s-]/g, ''));

  function renderOtpInputs() {
    otpRow.innerHTML = '';
    for (let i = 0; i < state.code.length; i += 1) {
      const input = document.createElement('input');
      input.maxLength = 1;
      input.inputMode = 'numeric';
      input.autocomplete = 'one-time-code';
      otpRow.append(input);
    }
    const inputs = $$('input', otpRow);
    inputs.forEach((input, index) => {
      input.addEventListener('input', () => {
        input.value = input.value.replace(/\D/g, '').slice(0, 1);
        if (input.value && inputs[index + 1]) inputs[index + 1].focus();
      });
      input.addEventListener('keydown', (event) => {
        if (event.key === 'Backspace' && !input.value && inputs[index - 1]) inputs[index - 1].focus();
      });
      input.addEventListener('paste', (event) => {
        event.preventDefault();
        const value = event.clipboardData.getData('text').replace(/\D/g, '').slice(0, state.code.length);
        inputs.forEach((box, idx) => { box.value = value[idx] || ''; });
      });
    });
  }

  const getOtpCode = () => $$('input', otpRow).map((input) => input.value.trim()).join('');
  const clearOtpCode = () => $$('input', otpRow).forEach((input) => { input.value = ''; });

  function selectMethod(method) {
    state.method = method;
    state.code = CODES[method];
    state.account = null;
    methodButtons.forEach((button) => button.classList.toggle('is-active', button.dataset.method === method));
    chooseSection.hidden = true;
    registrationSection.hidden = false;
    $('.mobile-field').hidden = method !== 'mobile';
    $('.email-field').hidden = method !== 'email';
    identityForm.reset();
    otpForm.reset();
    passwordForm.reset();
    renderOtpInputs();
    setVisiblePanel('identity-form');
    applyLanguage();
    registrationSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  function readIdentity() {
    const name = identityForm.name.value.trim();
    const referralId = identityForm.referralId.value.trim();
    if (!name) throw new Error(state.accountType === 'institution' ? (lang() === 'bn' ? 'প্রতিষ্ঠানের নাম লিখুন।' : 'Institution name is required.') : t().errName);
    if (state.method === 'mobile') {
      const phone = normalizePhone(identityForm.phone.value);
      if (!validatePhone(phone)) throw new Error(t().errPhone);
      return { name, phone, target: phone, referralId };
    }
    const email = identityForm.email.value.trim().toLowerCase();
    if (!/^\S+@\S+\.\S+$/.test(email)) throw new Error(t().errEmail);
    return { name, email, target: email, referralId };
  }

  function showAccountTypeSelection() {
    state.accountType = '';
    state.method = '';
    state.code = '';
    state.account = null;
    localStorage.removeItem('bondhu.accountType');
    const url = new URL(window.location.href);
    url.searchParams.delete('type');
    history.replaceState({}, '', url);
    document.querySelectorAll('.account-type-card').forEach((card) => card.classList.remove('is-active'));
    accountTypeSection.hidden = false;
    chooseSection.hidden = true;
    registrationSection.hidden = true;
    document.querySelector('.sim-footer')?.setAttribute('hidden', '');
    identityForm.reset();
    otpForm.reset();
    passwordForm.reset();
    setVisiblePanel('identity-form');
    applyLanguage();
    accountTypeSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  function restart() {
    state.method = '';
    state.code = '';
    state.account = null;
    methodButtons.forEach((button) => button.classList.remove('is-active'));
    accountTypeSection.hidden = Boolean(state.accountType);
    chooseSection.hidden = !state.accountType;
    registrationSection.hidden = true;
    if (state.accountType) document.querySelector('.sim-footer')?.removeAttribute('hidden');
    else document.querySelector('.sim-footer')?.setAttribute('hidden', '');
    identityForm.reset();
    otpForm.reset();
    passwordForm.reset();
    setVisiblePanel('identity-form');
    applyLanguage();
    (state.accountType ? chooseSection : accountTypeSection)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  methodButtons.forEach((button) => button.addEventListener('click', () => selectMethod(button.dataset.method)));
  $('#change-method-btn').addEventListener('click', restart);
  $('#back-account-type-btn').addEventListener('click', showAccountTypeSelection);

  identityForm.addEventListener('submit', (event) => {
    event.preventDefault();
    try {
      const identity = readIdentity();
      state.account = { ...identity, accountType: state.accountType || 'user', method: state.method };
      codeMessage.textContent = t().codeSentTo(identity.target);
      clearOtpCode();
      setVisiblePanel('otp-form');
      toast(t().codeSent);
    } catch (error) { toast(error.message, 'error'); }
  });

  $('#resend-code').addEventListener('click', () => {
    clearOtpCode();
    toast(t().codeResent);
  });

  otpForm.addEventListener('submit', (event) => {
    event.preventDefault();
    if (getOtpCode() !== state.code) return toast(t().invalidCode, 'error');
    setVisiblePanel('password-form');
    toast(t().codeVerified);
  });

  passwordForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const password = passwordForm.password.value;
    const passwordConfirm = passwordForm.passwordConfirm.value;
    if (password.length < 6) return toast(t().errPasswordLength, 'error');
    if (password !== passwordConfirm) return toast(t().errPasswordMatch, 'error');
    if (!passwordForm.terms.checked) return toast(t().errTerms, 'error');
    state.account.passwordSet = true;
    state.account.createdAt = new Date().toISOString();
    localStorage.setItem('bondhu.registrationAccount', JSON.stringify(state.account));
    localStorage.removeItem('bondhu.userProfile');
    $('#success-summary').textContent = t().accountReady(state.account.name);
    setVisiblePanel('success-panel');
    toast(t().accountCreated);
  });

  $('#open-dashboard-btn').addEventListener('click', () => { window.location.href = 'dashboard.html'; });

  setupAccountType();
  setupLanguageSwitcher();
  restart();
})();
