import { createBloodRequest } from '../api/requests.api.js';
import { showToast } from '../components/toast.js';
import { compatibleDonorsFor } from '../utils/blood-compatibility.js';
import { formToObject, validatePhone } from '../utils/validators.js';

const choiceSection = document.querySelector('#request-choice-section');
const needBloodSection = document.querySelector('#need-blood-section');
const donorSection = document.querySelector('#donor-section');
const resultSection = document.querySelector('#request-result-section');
const form = document.querySelector('#blood-request-form');
const preview = document.querySelector('#compatibility-preview');
const unitInput = document.querySelector('#units-needed');
const unitDisplay = document.querySelector('#unit-display');
const resultTracking = document.querySelector('#result-tracking-id');
let latestTrackingLink = '';


const requestCopy = {
  bn: {
    choiceEyebrow: 'Bondhu Blood Service',
    choiceTitle: 'আপনি কী করতে চান?',
    choiceText: 'রক্ত প্রয়োজন হলে অনুরোধ করুন, অথবা রক্তদাতা হিসেবে যুক্ত হন।',
    needTitle: 'Need Blood',
    needText: 'রক্তের জন্য জরুরি অনুরোধ করুন',
    donorTitle: 'Blood Donor',
    donorText: 'রক্তদাতা হিসেবে নিবন্ধন করুন',
    back: '← Back',
    requestHeading: 'রক্তের অনুরোধ করুন',
    requestHead: 'রক্তের অনুরোধ',
    patientInfo: 'রোগীর তথ্য',
    userMobile: 'User ID / Mobile',
    patientName: 'রোগীর নাম',
    displayMobile: 'মোবাইল নম্বর',
    bloodGroup: 'রক্তের গ্রুপ',
    location: 'লোকেশন',
    division: 'বিভাগ',
    district: 'জেলা',
    upazila: 'উপজেলা',
    hospital: 'হাসপাতাল',
    hospitalSelect: 'হাসপাতাল নির্বাচন / লিখুন',
    addHospital: 'তালিকায় না পেলে + নতুন হাসপাতাল যোগ করুন',
    bloodInfo: 'রক্তের তথ্য',
    units: 'প্রয়োজনীয় ব্যাগ',
    priority: 'অগ্রাধিকার',
    critical: 'জরুরী',
    normal: 'স্বাভাবিক',
    high: 'অতি জরুরী',
    reason: 'কারণ',
    neededBy: 'প্রয়োজনীয় তারিখ ও সময়',
    compatible: 'Compatible donor groups:',
    submit: 'অনুরোধ পাঠান',
    donorSectionTitle: 'Blood Donor',
    donorSectionText: 'আপনি যদি রক্তদাতা হতে চান, তাহলে ডোনার হিসেবে নিবন্ধন করুন। যাচাইকৃত জরুরি অনুরোধের সময় আপনাকে SMS/App notification পাঠানো হবে.',
    registerDonor: 'Register as Donor',
    viewLast: 'View latest request',
    resultTitle: 'রক্তের অনুরোধ তৈরি হয়েছে',
    copyTracking: 'Copy tracking link',
    createAnother: 'Create another request'
  },
  en: {
    choiceEyebrow: 'Bondhu Blood Service',
    choiceTitle: 'What do you want to do?',
    choiceText: 'Request urgent blood or join as a blood donor.',
    needTitle: 'Need Blood',
    needText: 'Create an urgent blood request',
    donorTitle: 'Blood Donor',
    donorText: 'Register yourself as a donor',
    back: '← Back',
    requestHeading: 'Create Blood Request',
    requestHead: 'Blood Request',
    patientInfo: 'Patient Information',
    userMobile: 'User ID / Mobile',
    patientName: 'Patient name',
    displayMobile: 'Mobile number',
    bloodGroup: 'Blood group',
    location: 'Location',
    division: 'Division',
    district: 'District',
    upazila: 'Upazila',
    hospital: 'Hospital',
    hospitalSelect: 'Select / enter hospital',
    addHospital: 'If not listed, + add new hospital',
    bloodInfo: 'Blood Information',
    units: 'Units needed',
    priority: 'Priority',
    critical: 'Urgent',
    normal: 'Normal',
    high: 'Very urgent',
    reason: 'Reason',
    neededBy: 'Needed date and time',
    compatible: 'Compatible donor groups:',
    submit: 'Submit request',
    donorSectionTitle: 'Blood Donor',
    donorSectionText: 'If you want to donate blood, register as a donor. For verified urgent requests you will receive SMS/App notifications.',
    registerDonor: 'Register as Donor',
    viewLast: 'View latest request',
    resultTitle: 'Blood request created',
    copyTracking: 'Copy tracking link',
    createAnother: 'Create another request'
  }
};

function activeLang() {
  return localStorage.getItem('bondhu.lang') === 'en' ? 'en' : 'bn';
}

function setLabelFirstText(label, text) {
  if (!label) return;
  const node = [...label.childNodes].find((child) => child.nodeType === Node.TEXT_NODE && child.textContent.trim());
  if (node) node.textContent = text + '\n              ';
}

function applyRequestBloodLanguage() {
  const copy = requestCopy[activeLang()];
  document.querySelector('.choice-heading .eyebrow').textContent = copy.choiceEyebrow;
  document.querySelector('.choice-heading .choice-title').textContent = copy.choiceTitle;
  document.querySelector('.choice-heading p:last-child').textContent = copy.choiceText;
  document.querySelector('#need-blood-option strong').textContent = copy.needTitle;
  document.querySelector('#need-blood-option small').textContent = copy.needText;
  document.querySelector('#blood-donor-option strong').textContent = copy.donorTitle;
  document.querySelector('#blood-donor-option small').textContent = copy.donorText;
  document.querySelectorAll('[data-back-choice]').forEach((button) => { button.textContent = copy.back; });
  document.querySelector('.need-step-title h2').textContent = copy.requestHeading;
  document.querySelector('.need-phone-head span:first-child').textContent = copy.requestHead;
  const labels = document.querySelectorAll('.need-field, .need-mini-grid label');
  setLabelFirstText(labels[0], copy.userMobile);
  setLabelFirstText(labels[1], copy.patientName);
  setLabelFirstText(labels[2], copy.displayMobile);
  setLabelFirstText(labels[3], copy.bloodGroup);
  document.querySelectorAll('.need-section-label')[0].textContent = copy.patientInfo;
  document.querySelectorAll('.need-section-label')[1].textContent = copy.location;
  setLabelFirstText(labels[4], copy.division);
  setLabelFirstText(labels[5], copy.district);
  setLabelFirstText(labels[6], copy.upazila);
  document.querySelectorAll('.need-section-label')[2].textContent = copy.hospital;
  setLabelFirstText(labels[7], copy.hospitalSelect);
  document.querySelector('#add-hospital').textContent = copy.addHospital;
  document.querySelectorAll('.need-section-label')[3].textContent = copy.bloodInfo;
  document.querySelector('.need-unit-row > span').textContent = copy.units;
  document.querySelector('.need-small-label').textContent = copy.priority;
  document.querySelector('[data-urgency="critical"]').textContent = copy.critical;
  document.querySelector('[data-urgency="normal"]').textContent = copy.normal;
  document.querySelector('[data-urgency="high"]').textContent = copy.high;
  setLabelFirstText(labels[8], copy.reason);
  setLabelFirstText(labels[9], copy.neededBy);
  document.querySelector('.compatible-box strong').textContent = copy.compatible;
  document.querySelector('.need-submit').textContent = copy.submit;
  document.querySelector('.donor-entry-card h2').textContent = copy.donorSectionTitle;
  document.querySelector('.donor-entry-card p').textContent = copy.donorSectionText;
  document.querySelector('.donor-actions a').textContent = copy.registerDonor;
  document.querySelector('#view-last-request').textContent = copy.viewLast;
  document.querySelector('.result-card h2').textContent = copy.resultTitle;
  document.querySelector('#copy-tracking-link').textContent = copy.copyTracking;
  document.querySelector('#create-another-request').textContent = copy.createAnother;
}

function makeTrackingId() {
  const now = new Date();
  const y = String(now.getFullYear()).slice(-2);
  const m = String(now.getMonth() + 1).padStart(2, '0');
  const d = String(now.getDate()).padStart(2, '0');
  const rand = String(Math.floor(Math.random() * 9999)).padStart(4, '0');
  return `BR${y}${m}${d}${rand}`;
}

function showOnly(section) {
  [choiceSection, needBloodSection, donorSection, resultSection].forEach((el) => {
    if (el) el.hidden = el !== section;
  });
  section?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function saveLocalBloodRequest(payload) {
  const request = {
    ...payload,
    trackingId: payload.trackingId || makeTrackingId(),
    status: 'active',
    createdAt: new Date().toISOString(),
  };
  localStorage.setItem('bondhu.latestBloodRequest', JSON.stringify(request));

  const list = JSON.parse(localStorage.getItem('bondhu.bloodRequests') || '[]');
  list.unshift(request);
  localStorage.setItem('bondhu.bloodRequests', JSON.stringify(list.slice(0, 50)));

  const donorAlert = {
    id: `alert-${request.trackingId}`,
    type: 'blood_request_sms',
    read: false,
    responded: false,
    createdAt: request.createdAt,
    patientName: request.patientName,
    contactPhone: request.contactPhone,
    bloodGroup: request.bloodGroup,
    unitsNeeded: request.unitsNeeded,
    hospitalName: request.hospitalName,
    district: request.district,
    upazila: request.upazila,
    neededBy: request.neededBy,
    trackingId: request.trackingId,
    messageChannel: 'sms_and_app_notification',
  };
  const alerts = JSON.parse(localStorage.getItem('bondhu.donorAlerts') || '[]');
  const filtered = alerts.filter((alert) => alert.id !== donorAlert.id);
  filtered.unshift(donorAlert);
  localStorage.setItem('bondhu.donorAlerts', JSON.stringify(filtered.slice(0, 100)));
  window.dispatchEvent(new CustomEvent('bondhu:alerts-updated', { detail: donorAlert }));

  return request;
}

function setUnits(nextValue) {
  const value = Math.max(1, Math.min(10, Number(nextValue) || 1));
  unitInput.value = String(value);
  unitDisplay.textContent = String(value);
}

function updateMobileMirror() {
  const mirror = document.querySelector('#display-mobile');
  if (mirror && form?.contactPhone) mirror.value = form.contactPhone.value;
}

function setUrgency(value) {
  document.querySelector('#urgency-input').value = value;
  document.querySelectorAll('[data-urgency]').forEach((button) => {
    button.classList.toggle('active', button.dataset.urgency === value);
  });
}

function getPayload() {
  const payload = formToObject(form);
  payload.unitsNeeded = unitInput.value;
  payload.urgency = document.querySelector('#urgency-input').value;
  payload.hospitalName = form.hospitalName.value;
  payload.district = form.district.value;
  return payload;
}

document.querySelector('#need-blood-option')?.addEventListener('click', () => showOnly(needBloodSection));
document.querySelector('#blood-donor-option')?.addEventListener('click', () => showOnly(donorSection));
document.querySelectorAll('[data-back-choice]').forEach((button) => button.addEventListener('click', () => showOnly(choiceSection)));

document.querySelector('#unit-plus')?.addEventListener('click', () => setUnits(Number(unitInput.value) + 1));
document.querySelector('#unit-minus')?.addEventListener('click', () => setUnits(Number(unitInput.value) - 1));
document.querySelectorAll('[data-urgency]').forEach((button) => button.addEventListener('click', () => setUrgency(button.dataset.urgency)));

form?.contactPhone?.addEventListener('input', updateMobileMirror);
form?.bloodGroup?.addEventListener('change', () => {
  preview.textContent = compatibleDonorsFor(form.bloodGroup.value).join(', ') || 'Select blood group.';
});

document.querySelector('#add-hospital')?.addEventListener('click', () => {
  const name = prompt('নতুন হাসপাতালের নাম লিখুন');
  if (!name) return;
  const option = document.createElement('option');
  option.textContent = name;
  option.value = name;
  form.hospitalName.append(option);
  form.hospitalName.value = name;
  showToast('Hospital added');
});

document.querySelector('#cancel-request-preview')?.addEventListener('click', () => {
  showToast('অনুরোধ বাতিল করতে হলে কারণ ও নোট সংরক্ষণ করতে হবে।', 'error');
});

form?.addEventListener('submit', async (event) => {
  event.preventDefault();
  const payload = getPayload();
  if (!validatePhone(payload.contactPhone)) return showToast('Invalid phone number', 'error');
  if (!payload.bloodGroup) return showToast('Select blood group', 'error');

  const request = saveLocalBloodRequest(payload);
  latestTrackingLink = `${location.origin}${location.pathname.replace(/\/pages\/.*$/, '')}/pages/blood-tracking.html?id=${request.trackingId}`;
  resultTracking.textContent = request.trackingId;

  try {
    await createBloodRequest(request);
    showToast(`Request submitted. Tracking ID: ${request.trackingId}`);
  } catch {
    showToast(`Request saved locally. Tracking ID: ${request.trackingId}`);
  }

  showOnly(resultSection);
});

document.querySelector('#copy-tracking-link')?.addEventListener('click', async () => {
  const link = latestTrackingLink || `https://bondhu.org/r/${resultTracking.textContent}`;
  try {
    await navigator.clipboard.writeText(link);
    showToast('Tracking link copied');
  } catch {
    showToast(link);
  }
});

document.querySelector('#create-another-request')?.addEventListener('click', () => {
  form.reset();
  setUnits(2);
  setUrgency('critical');
  preview.textContent = 'Select blood group.';
  showOnly(needBloodSection);
});

document.querySelector('#view-last-request')?.addEventListener('click', () => {
  const latest = JSON.parse(localStorage.getItem('bondhu.latestBloodRequest') || 'null');
  if (!latest) return showToast('No blood request found yet', 'error');
  resultTracking.textContent = latest.trackingId;
  latestTrackingLink = `https://bondhu.org/r/${latest.trackingId}`;
  showOnly(resultSection);
});

setUnits(2);
setUrgency('critical');
applyRequestBloodLanguage();
showOnly(choiceSection);
