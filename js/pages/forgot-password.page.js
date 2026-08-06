(() => {
  const OTP = '849201';
  const screens = ['find', 'method', 'otp', 'reset', 'done'];
  let current = 'find';
  let selectedAccount = null;
  let timer = null;
  let remaining = 120;
  let doneTimer = null;

  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

  function toast(message, type = 'ok') {
    const region = $('#toast-region');
    const item = document.createElement('div');
    item.className = `toast ${type}`;
    item.textContent = message;
    region.append(item);
    setTimeout(() => item.remove(), 3600);
  }

  function setupLanguageSwitcher() {
    const apply = (lang = localStorage.getItem('bondhu.lang') || 'bn') => {
      lang = lang === 'en' ? 'en' : 'bn';
      localStorage.setItem('bondhu.lang', lang);
      document.documentElement.lang = lang;
      document.querySelectorAll('.lang-switcher [data-lang]').forEach((btn) => btn.classList.toggle('active', btn.dataset.lang === lang));
    };
    document.querySelectorAll('.lang-switcher [data-lang]').forEach((btn) => {
      btn.addEventListener('click', () => {
        apply(btn.dataset.lang);
        toast(btn.dataset.lang === 'bn' ? 'বাংলা নির্বাচন করা হয়েছে।' : 'English selected.');
      });
    });
    apply();
  }

  function maskEmail(email) {
    const [name = 'user', domain = 'example.com'] = String(email).split('@');
    return `${name.slice(0, 3)}*****@${domain}`;
  }

  function maskPhone(phone) {
    const digits = String(phone).replace(/\D/g, '');
    if (digits.length < 8) return '+88017******56';
    return `+${digits.slice(0, 5)}******${digits.slice(-2)}`;
  }

  function deriveAccount(query) {
    const value = query.trim();
    if (value.includes('@')) {
      return { name: 'Email User', userId: 'BON-EMAIL-001', mobile: '+88017******56', email: maskEmail(value) };
    }
    if (/^(?:\+?88)?01[3-9]\d{8}$/.test(value.replace(/[\s-]/g, ''))) {
      return { name: 'Mobile User', userId: 'BON-MOBILE-001', mobile: maskPhone(value), email: 'user*****@gmail.com' };
    }
    if (/^\d{8,17}$/.test(value)) {
      return { name: 'Verified Citizen', userId: `NID-${value.slice(-6)}`, mobile: '+88018******22', email: 'nid*****@gmail.com' };
    }
    return { name: 'Bondhu Foundation', userId: value || 'BON000254', mobile: '+88017******56', email: 'bon*****@gmail.com' };
  }

  function fillAccount() {
    $('#found-name').textContent = selectedAccount.name;
    $('#found-user-id').textContent = selectedAccount.userId;
    $('#found-mobile').textContent = selectedAccount.mobile;
    $('#found-email').textContent = selectedAccount.email;
    $('#sms-target').textContent = selectedAccount.mobile;
    $('#email-target').textContent = selectedAccount.email;
  }

  function stepIndex(step) {
    return screens.indexOf(step);
  }

  function showScreen(step) {
    current = step;
    document.body.classList.toggle('recovery-started', step !== 'find');
    $$('.screen').forEach((screen) => {
      const active = screen.dataset.screen === step;
      screen.hidden = !active;
      screen.classList.toggle('is-active', active);
    });
    $$('.progress-line span').forEach((dot) => {
      const idx = stepIndex(dot.dataset.stepDot);
      dot.classList.toggle('is-active', idx === stepIndex(step));
      dot.classList.toggle('is-done', idx < stepIndex(step));
    });
    $('#back-btn').hidden = step === 'find' || step === 'done';
    if (step !== 'otp') stopOtpTimer();
    if (step !== 'done') stopDoneTimer();
  }

  function goBack() {
    const idx = stepIndex(current);
    if (idx > 0) showScreen(screens[idx - 1]);
  }

  function createOtpBoxes() {
    const container = $('#otp-boxes');
    container.innerHTML = '';
    for (let i = 0; i < 6; i += 1) {
      const input = document.createElement('input');
      input.maxLength = 1;
      input.inputMode = 'numeric';
      input.autocomplete = 'one-time-code';
      input.setAttribute('aria-label', `OTP digit ${i + 1}`);
      container.append(input);
    }

    const inputs = $$('input', container);
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
        setOtp(event.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6));
      });
    });
  }

  function getOtp() {
    return $$('#otp-boxes input').map((input) => input.value).join('');
  }

  function setOtp(value = '') {
    $$('#otp-boxes input').forEach((input, index) => {
      input.value = value[index] || '';
    });
  }

  function stopOtpTimer() {
    if (timer) clearInterval(timer);
    timer = null;
  }

  function formatTime(seconds) {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  }

  function startOtpTimer() {
    stopOtpTimer();
    remaining = 120;
    $('#resend-btn').disabled = true;
    $('#timer-text').textContent = `Code expires in ${formatTime(remaining)}`;
    timer = setInterval(() => {
      remaining -= 1;
      $('#timer-text').textContent = `Code expires in ${formatTime(Math.max(remaining, 0))}`;
      if (remaining <= 0) {
        stopOtpTimer();
        $('#timer-text').textContent = 'Code expired';
        $('#resend-btn').disabled = false;
      }
    }, 1000);
  }

  function sendOtp() {
    const method = $('input[name="recoveryMethod"]:checked').value;
    const target = method === 'sms' ? selectedAccount.mobile : selectedAccount.email;
    $('#otp-copy').textContent = `We sent a 6-digit code to ${target}.`;
    setOtp('');
    showScreen('otp');
    startOtpTimer();
    setTimeout(() => $('#otp-boxes input')?.focus(), 50);
    toast('Verification code sent.');
  }

  function updateStrength() {
    const value = $('#new-password').value;
    const checks = {
      length: value.length >= 8,
      upper: /[A-Z]/.test(value),
      lower: /[a-z]/.test(value),
      number: /[0-9\W_]/.test(value),
    };
    $('#req-length').classList.toggle('ok', checks.length);
    $('#req-upper').classList.toggle('ok', checks.upper);
    $('#req-lower').classList.toggle('ok', checks.lower);
    $('#req-number').classList.toggle('ok', checks.number);
    const score = Object.values(checks).filter(Boolean).length;
    const label = $('#strength-label');
    if (score <= 1) {
      label.textContent = 'Weak';
      label.style.color = '#dc2626';
    } else if (score <= 3) {
      label.textContent = 'Medium';
      label.style.color = '#2563eb';
    } else {
      label.textContent = 'Strong';
      label.style.color = '#047857';
    }
    return score === 4;
  }

  function stopDoneTimer() {
    if (doneTimer) clearInterval(doneTimer);
    doneTimer = null;
  }

  function startDoneTimer() {
    stopDoneTimer();
    let count = 5;
    $('#done-count').textContent = count;
    $('#redirect-bar').style.width = '0%';
    doneTimer = setInterval(() => {
      count -= 1;
      $('#done-count').textContent = count;
      $('#redirect-bar').style.width = `${(5 - count) * 20}%`;
      if (count <= 0) {
        stopDoneTimer();
        toast('Simulation complete. Redirect would go to login.');
      }
    }, 1000);
  }

  $('#find-form').addEventListener('submit', (event) => {
    event.preventDefault();
    const query = $('#account-query').value.trim();
    if (!query) return toast('Please enter account information.', 'error');
    selectedAccount = deriveAccount(query);
    fillAccount();
    showScreen('method');
    toast('Account found.');
  });

  $('#demo-account').addEventListener('click', () => {
    $('#account-query').value = 'BON000254';
    selectedAccount = deriveAccount('BON000254');
    fillAccount();
    showScreen('method');
    toast('Demo account loaded.');
  });

  $('#send-otp-btn').addEventListener('click', sendOtp);
  $('#auto-fill-otp').addEventListener('click', () => {
    setOtp(OTP);
    toast('Simulation OTP filled.');
  });
  $('#resend-btn').addEventListener('click', () => {
    setOtp('');
    startOtpTimer();
    toast('Verification code resent.');
  });
  $('#verify-otp-btn').addEventListener('click', () => {
    if (getOtp() !== OTP) {
      toast(`Wrong OTP. Use simulation OTP ${OTP}.`, 'error');
      return;
    }
    showScreen('reset');
    updateStrength();
    toast('OTP verified successfully.');
  });

  $$('[data-toggle]').forEach((button) => {
    button.addEventListener('click', () => {
      const input = $(`#${button.dataset.toggle}`);
      input.type = input.type === 'password' ? 'text' : 'password';
      button.textContent = input.type === 'password' ? 'Show' : 'Hide';
    });
  });

  $('#new-password').addEventListener('input', updateStrength);
  $('#reset-form').addEventListener('submit', (event) => {
    event.preventDefault();
    const pass = $('#new-password').value;
    const confirm = $('#confirm-password').value;
    if (!updateStrength()) return toast('Password does not meet all requirements.', 'error');
    if (pass !== confirm) return toast('Passwords do not match.', 'error');
    showScreen('done');
    startDoneTimer();
    toast('Password changed successfully.');
  });

  $('#back-btn').addEventListener('click', goBack);
  $('#restart-btn').addEventListener('click', () => {
    $('#find-form').reset();
    $('#reset-form').reset();
    selectedAccount = null;
    setOtp('');
    updateStrength();
    showScreen('find');
  });

  setupLanguageSwitcher();
  createOtpBoxes();
  updateStrength();
  showScreen('find');
})();
