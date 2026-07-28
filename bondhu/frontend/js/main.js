import { initTicker } from './components/ticker.js';
import { initHeroCarousel } from './components/hero-carousel.js';
import { getLanguage, setLanguage, translatePage } from './utils/i18n.js';

const page = document.documentElement.dataset.page;
const base = location.pathname.includes('/pages/admin/') ? '../../' : location.pathname.includes('/pages/') ? '../' : './';
const lang = getLanguage() === 'en' ? 'en' : 'bn';

const labels = {
  bn: { home: 'হোম', blood: 'রক্ত', donor: 'দাতা', hospitals: 'হাসপাতাল', ambulance: 'অ্যাম্বুলেন্স', missing: 'নিখোঁজ', news: 'সংবাদ', login: 'লগইন', register: 'রেজিস্টার', forgot: 'পাসওয়ার্ড', services: 'সেবা', admin: 'অ্যাডমিন', contact: 'যোগাযোগ', requests: 'রিকোয়েস্ট', moderation: 'মডারেশন' },
  en: { home: 'Home', blood: 'Blood', donor: 'Donor', hospitals: 'Hospitals', ambulance: 'Ambulance', missing: 'Missing', news: 'News', login: 'Login', register: 'Register', forgot: 'Forgot Password', services: 'Services', admin: 'Admin', contact: 'Contact', requests: 'Requests', moderation: 'Moderation' },
}[lang];

const nav = (href, key, label) => `<a href="${base}${href}"${page === key ? ' aria-current="page"' : ''}>${label}</a>`;
const languageSwitcher = `
  <div class="lang-switcher" aria-label="Language switcher">
    <button type="button" data-lang="bn" class="${lang === 'bn' ? 'active' : ''}">বাংলা</button>
    <button type="button" data-lang="en" class="${lang === 'en' ? 'active' : ''}">English</button>
  </div>`;

const header = document.querySelector('#app-header');
if (header) {
  header.innerHTML = `
    <header class="site-header">
      <nav class="navbar">
        <a class="brand" href="${base}index.html"><span class="brand-mark">ব</span>Bondhu</a>
        <div class="nav-links">
          ${nav('index.html', 'home', labels.home)}
          ${nav('pages/request-blood.html', 'request-blood', labels.blood)}
          ${nav('pages/donor-register.html', 'donor-register', labels.donor)}
          ${nav('pages/hospitals.html', 'hospitals', labels.hospitals)}
          ${nav('pages/ambulance.html', 'ambulance', labels.ambulance)}
          ${nav('pages/missing-bureau.html', 'missing-bureau', labels.missing)}
          ${nav('pages/news.html', 'news', labels.news)}
        </div>
        <div class="header-actions">
          ${languageSwitcher}
          <a class="btn btn-outline" href="${base}pages/login.html">${labels.login}</a>
          <a class="btn btn-primary" href="${base}pages/register.html">${labels.register}</a>
        </div>
      </nav>
    </header>`;
}

const footer = document.querySelector('#app-footer');
if (footer) {
  footer.innerHTML = `
    <footer class="site-footer">
      <div class="footer-grid">
        <div>
          <h2>Bondhu</h2>
          <p>${lang === 'bn' ? 'কমিউনিটি জরুরি সহায়তা প্ল্যাটফর্ম।' : 'Community emergency support platform.'}</p>
          <a href="${base}pages/login.html">${labels.login}</a>
          <a href="${base}pages/register.html">${labels.register}</a>
          <a href="${base}pages/forgot-password.html">${labels.forgot}</a>
        </div>
        <div>
          <h3>${labels.services}</h3>
          <a href="${base}pages/request-blood.html">${labels.blood}</a>
          <a href="${base}pages/donor-register.html">${labels.donor}</a>
          <a href="${base}pages/hospitals.html">${labels.hospitals}</a>
          <a href="${base}pages/ambulance.html">${labels.ambulance}</a>
          <a href="${base}pages/missing-bureau.html">${labels.missing}</a>
          <a href="${base}pages/news.html">${labels.news}</a>
        </div>
        <div>
          <h3>${labels.admin}</h3>
          <a href="${base}pages/admin/dashboard.html">Dashboard</a>
          <a href="${base}pages/admin/requests.html">${labels.requests}</a>
          <a href="${base}pages/admin/moderation.html">${labels.moderation}</a>
        </div>
        <div>
          <h3>${labels.contact}</h3>
          <a href="mailto:help@bondhu.local">help@bondhu.local</a>
          <a href="${base}index.html">${labels.home}</a>
        </div>
      </div>
    </footer>`;
}

initTicker();
initHeroCarousel();
translatePage(base);

document.querySelectorAll('.lang-switcher [data-lang]').forEach((btn) => {
  btn.addEventListener('click', () => {
    setLanguage(btn.dataset.lang);
    location.reload();
  });
});

if ('serviceWorker' in navigator) navigator.serviceWorker.register(`${base}sw.js`).catch(() => {});
