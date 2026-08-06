import { initTicker } from './components/ticker.js';
import { initHeroCarousel } from './components/hero-carousel.js';
import { getLanguage, setLanguage, translatePage } from './utils/i18n.js';

const page = document.documentElement.dataset.page;
const base = location.pathname.includes('/pages/admin/') ? '../../' : location.pathname.includes('/pages/') ? '../' : './';
const lang = getLanguage() === 'en' ? 'en' : 'bn';

const labels = {
  bn: { home: 'হোম', blood: 'রক্ত', donor: 'দাতা', hospitals: 'হাসপাতাল', ambulance: 'অ্যাম্বুলেন্স', missing: 'নিখোঁজ', news: 'সংবাদ', login: 'লগইন', menu: 'Menu' },
  en: { home: 'Home', blood: 'Blood', donor: 'Donor', hospitals: 'Hospitals', ambulance: 'Ambulance', missing: 'Missing', news: 'News', login: 'Login', menu: 'Menu' },
}[lang];

const nav = (href, key, label) => `<a href="${base}${href}"${page === key ? ' aria-current="page"' : ''}>${label}</a>`;

const header = document.querySelector('#app-header');
if (header) {
  header.innerHTML = `
    <!-- TOP HEADER -->
    <header class="topbar">
      <div class="brand">
        <div class="logo-badge">B</div>
        <div class="brand-text">
          <h1>Bondhu<span>.</span></h1>
          <p>একসাথে গড়ি এক নতুন বাংলাদেশ</p>
        </div>
      </div>
      <div class="topbar-meta">
        <div class="meta-item"><span id="gregorian-date">English calendar</span></div>
        <div class="meta-item"><span id="bangla-calendar">Bangla calendar</span></div>
        <div class="meta-item"><span id="arabic-calendar">Arabic calendar</span></div>
      </div>
      <div class="mobile-header-right">
        <button aria-controls="main-quick-nav" aria-expanded="false" aria-label="Open menu" class="mobile-menu-btn" type="button">☰</button>
        <div aria-label="Language switcher" class="lang-switcher">
          <button class="${lang === 'bn' ? 'active' : ''}" data-lang="bn" type="button">BN</button>
          <button class="${lang === 'en' ? 'active' : ''}" data-lang="en" type="button">EN</button>
        </div>
        <a class="login-btn" href="${base}pages/login.html">
          <img alt="" src="${base}assets/images/service-icons/person-search.png">
          <span>${labels.login}</span>
        </a>
      </div>
    </header>
    <!-- QUICK NAVIGATION -->
    <nav aria-label="Main page links" class="quick-nav" id="main-quick-nav">
      <button aria-label="Close menu" class="mobile-menu-close" type="button">×</button>
      <strong class="mobile-menu-title">${labels.menu}</strong>
      ${nav('index.html', 'home', labels.home)}
      ${nav('pages/request-blood.html', 'request-blood', labels.blood)}
      ${nav('pages/donor-register.html', 'donor-register', labels.donor)}
      ${nav('pages/hospitals.html', 'hospitals', labels.hospitals)}
      ${nav('pages/ambulance.html', 'ambulance', labels.ambulance)}
      ${nav('pages/missing-bureau.html', 'missing-bureau', labels.missing)}
      ${nav('pages/news.html', 'news', labels.news)}
    </nav>`;
}

const footer = document.querySelector('#app-footer');
if (footer) {
  footer.innerHTML = `
    <!-- FOOTER -->
    <footer>
      <div class="footer-top">
        <div class="footer-brand">
          <div class="logo-badge">B</div>
          <div>
            <h2>Bondhu<span>.</span></h2>
            <p>একসাথে গড়ি এক নতুন বাংলাদেশ</p>
          </div>
        </div>
        <div class="footer-links">
          <a href="mailto:help@bondhu.local">Contact</a>
          <a href="${base}pages/donor-register.html">Donation</a>
          <a href="${base}pages/news.html">Privacy Policy</a>
          <a href="${base}pages/news.html">Terms &amp; Conditions</a>
        </div>
      </div>
      <div class="footer-bottom">
        <span>© 2026 Bondhu. All Rights Reserved.</span>
        <div class="dev-by"><span>Developed By</span><div class="dot-badge">N</div><a href="https://nextechzen.site" rel="noopener" target="_blank">nextechzen.site</a></div>
      </div>
    </footer>`;
}

initTicker();
initHeroCarousel();
translatePage(base);

const BN_DIGITS = ['০','১','২','৩','৪','৫','৬','৭','৮','৯'];
const toBnNumber = (value) => String(value).replace(/\d/g, (digit) => BN_DIGITS[digit]);
const getLang = () => localStorage.getItem('bondhu.lang') || 'bn';

function getBanglaDate(date = new Date(), currentLang = getLang()) {
  const monthNamesBn = ['বৈশাখ','জ্যৈষ্ঠ','আষাঢ়','শ্রাবণ','ভাদ্র','আশ্বিন','কার্তিক','অগ্রহায়ণ','পৌষ','মাঘ','ফাল্গুন','চৈত্র'];
  const monthNamesEn = ['Boishakh','Joishtho','Ashar','Srabon','Bhadro','Ashwin','Kartik','Agrahayan','Poush','Magh','Falgun','Chaitra'];
  const year = date.getFullYear();
  const startThisYear = new Date(year, 3, 14);
  const startYear = date >= startThisYear ? year : year - 1;
  const banglaYear = startYear - 593;
  const startDate = new Date(startYear, 3, 14);
  const today = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  let dayIndex = Math.floor((today - startDate) / 86400000);
  const monthLengths = [31,31,31,31,31,30,30,30,30,30,30,30];
  let month = 0;
  while (month < monthLengths.length - 1 && dayIndex >= monthLengths[month]) {
    dayIndex -= monthLengths[month]; month += 1;
  }
  const day = dayIndex + 1;
  return currentLang === 'bn' ? `${toBnNumber(day)} ${monthNamesBn[month]} ${toBnNumber(banglaYear)} বঙ্গাব্দ` : `${day} ${monthNamesEn[month]} ${banglaYear} BE`;
}

function getArabicDate(date = new Date(), currentLang = getLang()) {
  try {
    const locale = currentLang === 'bn' ? 'bn-BD-u-ca-islamic' : 'en-u-ca-islamic';
    return new Intl.DateTimeFormat(locale, { day:'numeric', month:'long', year:'numeric' }).format(date);
  } catch {
    return currentLang === 'bn' ? 'হিজরি ক্যালেন্ডার' : 'Hijri calendar';
  }
}

function applyHeaderLanguage(currentLang = getLang()) {
  document.documentElement.lang = currentLang;
  document.querySelectorAll('.lang-switcher [data-lang]').forEach((btn) => btn.classList.toggle('active', btn.dataset.lang === currentLang));
  const date = new Date();
  const gregElem = document.getElementById('gregorian-date');
  const banglaElem = document.getElementById('bangla-calendar');
  const arabicElem = document.getElementById('arabic-calendar');
  if (gregElem) gregElem.innerHTML = `<span class="calendar-label">${currentLang === 'bn' ? 'ইংরেজি:' : 'English:'}</span> ${new Intl.DateTimeFormat(currentLang === 'bn' ? 'bn-BD' : 'en-US', { weekday:'long', year:'numeric', month:'long', day:'numeric' }).format(date)}`;
  if (banglaElem) banglaElem.innerHTML = `<span class="calendar-label">${currentLang === 'bn' ? 'বাংলা:' : 'Bangla:'}</span> ${getBanglaDate(date, currentLang)}`;
  if (arabicElem) arabicElem.innerHTML = `<span class="calendar-label">${currentLang === 'bn' ? 'আরবি:' : 'Arabic:'}</span> ${getArabicDate(date, currentLang)}`;
}

function setLang(nextLang) {
  setLanguage(nextLang);
  // Reload so every shared header/footer label and page script reads the selected language.
  location.reload();
}

document.querySelectorAll('.lang-switcher [data-lang]').forEach((btn) => btn.addEventListener('click', () => setLang(btn.dataset.lang)));
applyHeaderLanguage(getLang());

const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const quickNav = document.querySelector('.quick-nav');
const closeMenuBtn = document.querySelector('.mobile-menu-close');

function openMobileMenu() {
  quickNav?.classList.add('is-open');
  document.body.classList.add('menu-open');
  mobileMenuBtn?.setAttribute('aria-expanded', 'true');
}
function closeMobileMenu() {
  quickNav?.classList.remove('is-open');
  document.body.classList.remove('menu-open');
  mobileMenuBtn?.setAttribute('aria-expanded', 'false');
}
mobileMenuBtn?.addEventListener('click', () => {
  if (quickNav?.classList.contains('is-open')) closeMobileMenu();
  else openMobileMenu();
});
closeMenuBtn?.addEventListener('click', closeMobileMenu);
quickNav?.addEventListener('click', (event) => { if (event.target === quickNav) closeMobileMenu(); });
quickNav?.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMobileMenu));
document.addEventListener('keydown', (event) => { if (event.key === 'Escape') closeMobileMenu(); });

if ('serviceWorker' in navigator) navigator.serviceWorker.register(`${base}sw.js`).catch(() => {});
