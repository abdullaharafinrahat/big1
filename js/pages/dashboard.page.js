(() => {
  const A = window.BondhuApp;
  if (!A) return;
  const $ = A.$;
  A.setupShell('dashboard');
  const acc = A.getAccount();
  const profile = A.getProfile();
  const status = A.getStatus();
  const progress = A.profileCompletion(profile);
  const welcome = $('#welcome-title');
  const progressText = $('#profile-progress-text');
  const progressBar = $('#profile-progress-bar');
  const statStatus = $('#stat-status');
  const statusList = $('#profile-status-list');
  if (welcome) welcome.textContent = `${A.lang() === 'bn' ? 'স্বাগতম' : 'Welcome'}, ${profile?.fullName || acc.name}`;
  if (progressText) progressText.textContent = `${progress}% ${A.lang() === 'bn' ? 'সম্পূর্ণ' : 'Complete'}`;
  if (progressBar) progressBar.style.width = `${progress}%`;
  if (statStatus) statStatus.textContent = status === 'verified' ? 'Verified' : status === 'pending' ? 'Pending' : status === 'revision' ? 'Correction' : 'Incomplete';
  if (statusList) statusList.innerHTML = `<li class="ok">✓ Account Verified</li><li class="${progress >= 100 ? 'ok' : 'warn'}">${progress >= 100 ? '✓' : '●'} Profile ${progress}% Complete</li><li class="${profile?.presentDistrict || profile?.city ? 'ok' : 'warn'}">${profile?.presentDistrict || profile?.city ? '✓' : '●'} Address ${profile?.presentDistrict || profile?.city ? 'Added' : 'Missing'}</li><li class="${status === 'verified' ? 'ok' : 'warn'}">${status === 'verified' ? '✓' : '●'} Verification ${status}</li>`;
})();

// Mobile dashboard/profile wizard from supplied mobile design
(() => {
  const A = window.BondhuApp;
  if (!A) return;
  const $ = A.$;
  const $$ = A.$$;
  const root = $('#mobile-profile-dashboard');
  if (!root) return;

  const form = $('#mobile-profile-form');
  const panels = $$('.mobile-panel', form);
  const stepper = $('#mobile-stepper');
  const title = $('#mobile-active-title');
  const number = $('#mobile-active-number');
  const prev = $('#mobile-prev-step');
  const next = $('#mobile-next-step');
  const submit = $('#mobile-submit-profile');
  const steps = ['Personal Info', 'Address', 'Occupation', 'Identity & Blood', 'Review'];
  let current = 0;

  function fillDates() {
    $('#mobile-date-en').textContent = A.englishDate();
    $('#mobile-date-bn').textContent = A.banglaDate();
    $('#mobile-date-ar').textContent = A.arabicDate();
  }

  function renderStepper() {
    stepper.innerHTML = steps.map((step, index) => `
      <div class="mobile-step ${index < current ? 'done' : ''} ${index === current ? 'active' : ''}"><b>${index + 1}</b><span>${step}</span></div>
      ${index < steps.length - 1 ? '<i class="fa-solid fa-arrow-right mobile-arrow"></i>' : ''}
    `).join('');
    panels.forEach((panel, index) => panel.classList.toggle('active', index === current));
    title.textContent = steps[current];
    number.textContent = current + 1;
    prev.hidden = current === 0;
    next.hidden = current === steps.length - 1;
    submit.hidden = current !== steps.length - 1;
    if (current === steps.length - 1) renderReview();
  }

  function validateCurrent() {
    const required = [...panels[current].querySelectorAll('[required]')];
    for (const input of required) {
      if ((input.type === 'checkbox' && !input.checked) || (input.type !== 'checkbox' && !input.value.trim())) {
        input.reportValidity();
        return false;
      }
    }
    return true;
  }

  function collectData() {
    const data = {};
    new FormData(form).forEach((value, key) => { data[key] = String(value).trim(); });
    data.sameAsPermanent = Boolean(form.sameAsPermanent?.checked);
    data.volunteer = Boolean(form.volunteer?.checked);
    return data;
  }

  function renderReview() {
    const data = collectData();
    $('#mobile-review-list').innerHTML = [
      ['Name', data.fullName],
      ['Mobile', data.primaryMobile],
      ['Address', data.locationType === 'international' ? `${data.city || ''}, ${data.country || ''}` : `${data.presentUpazila || ''}, ${data.presentDistrict || ''}`],
      ['Occupation', data.occupation],
      ['Blood Group', data.bloodGroup],
      ['NID', data.identityNumber]
    ].map(([label, value]) => `<p><span>${label}:</span><strong>${value || '—'}</strong></p>`).join('');
  }

  next.addEventListener('click', () => {
    if (!validateCurrent()) return;
    current = Math.min(current + 1, steps.length - 1);
    renderStepper();
    root.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });

  prev.addEventListener('click', () => {
    current = Math.max(current - 1, 0);
    renderStepper();
    root.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });

  $$('input[name="locationType"]', form).forEach((radio) => {
    radio.addEventListener('change', () => {
      const international = form.locationType.value === 'international';
      $('#mobile-bd-address').classList.toggle('hidden', international);
      $('#mobile-intl-address').classList.toggle('hidden', !international);
    });
  });

  $('#mobile-photo-input').addEventListener('change', (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const circle = $('.mobile-photo-circle');
    circle.innerHTML = '';
    const img = document.createElement('img');
    img.src = URL.createObjectURL(file);
    circle.append(img);
  });

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    if (!validateCurrent()) return;
    const profile = collectData();
    A.setProfile(profile);
    A.setStatus('pending');
    A.toast('Profile submitted for verification');
  });

  window.addEventListener('bondhu:lang', fillDates);
  fillDates();
  renderStepper();
})();
