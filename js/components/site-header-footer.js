/**
 * Bondhu.org Unified Header & Footer Component Loader
 * Single source of truth across all 34+ HTML pages.
 * Matches the layout, typography, calendar chips, and footer credit of pages/homes.html.
 * Automatically adds hamburger menu toggle beside login button on all dashboard pages.
 */

(function () {
  'use strict';

  // --- Path Resolver based on directory depth ---
  function getPathPrefixes() {
    const path = window.location.pathname.replace(/\\/g, '/');
    if (path.includes('/pages/admin/') || path.includes('/pages/foundation/') || path.includes('/hospital/admin')) {
      return { base: '../../', pages: '../', assets: '../../assets/', userDash: '../../user-dashboard/' };
    } else if (path.includes('/pages/') || path.includes('/hospital/')) {
      return { base: '../', pages: '', assets: '../assets/', userDash: '../user-dashboard/' };
    } else if (path.includes('/user-dashboard/')) {
      return { base: '../', pages: '../pages/', assets: '../assets/', userDash: '' };
    } else {
      return { base: './', pages: 'pages/', assets: 'assets/', userDash: 'user-dashboard/' };
    }
  }

  function isDashboardPage() {
    const path = window.location.pathname.toLowerCase().replace(/\\/g, '/');
    const isDashUrl = path.includes('dashboard') || path.includes('profile') || 
                      path.includes('member-card') || path.includes('messages') || 
                      path.includes('workflow') || path.includes('blood-tracking') || 
                      path.includes('sponsors') || path.includes('/admin/') || 
                      path.includes('/hospital/');
    return isDashUrl || !!document.querySelector('.sidebar, #app-sidebar, .dash-sidebar');
  }

  // --- Language Management ---
  const BN_DIGITS = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
  const toBnNumber = (value) => String(value).replace(/\d/g, (d) => BN_DIGITS[d]);

  function getLang() {
    return localStorage.getItem('bondhu.lang') || 'bn';
  }

  function setLang(lang) {
    localStorage.setItem('bondhu.lang', lang);
    applyLanguage(lang);
  }

  // --- Calendar Date Calculations ---
  function getBanglaDate(date = new Date(), lang = getLang()) {
    const monthNamesBn = ['বৈশাখ', 'জ্যৈষ্ঠ', 'আষাঢ়', 'শ্রাবণ', 'ভাদ্র', 'আশ্বিন', 'কার্তিক', 'অগ্রহায়ণ', 'পৌষ', 'মাঘ', 'ফাল্গুন', 'চৈত্র'];
    const monthNamesEn = ['Boishakh', 'Joishtho', 'Ashar', 'Srabon', 'Bhadro', 'Ashwin', 'Kartik', 'Agrahayan', 'Poush', 'Magh', 'Falgun', 'Chaitra'];
    const year = date.getFullYear();
    const startThisYear = new Date(year, 3, 14);
    const startYear = date >= startThisYear ? year : year - 1;
    const banglaYear = startYear - 593;
    const startDate = new Date(startYear, 3, 14);
    const today = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    let dayIndex = Math.floor((today - startDate) / 86400000);
    const monthLengths = [31, 31, 31, 31, 31, 30, 30, 30, 30, 30, 30, 30];
    let month = 0;
    while (month < monthLengths.length - 1 && dayIndex >= monthLengths[month]) {
      dayIndex -= monthLengths[month];
      month += 1;
    }
    const day = dayIndex + 1;
    if (lang === 'bn') {
      return `${toBnNumber(day)} ${monthNamesBn[month]} ${toBnNumber(banglaYear)} বঙ্গাব্দ`;
    }
    return `${day} ${monthNamesEn[month]} ${banglaYear} BE`;
  }

  function getArabicDate(date = new Date(), lang = getLang()) {
    try {
      const locale = lang === 'bn' ? 'bn-BD-u-ca-islamic' : 'en-u-ca-islamic';
      return new Intl.DateTimeFormat(locale, { day: 'numeric', month: 'long', year: 'numeric' }).format(date);
    } catch (error) {
      return lang === 'bn' ? 'হিজরি ক্যালেন্ডার' : 'Hijri calendar';
    }
  }

  function renderCalendars(lang = getLang()) {
    const date = new Date();
    const gregElem = document.getElementById('gregorian-date');
    const banglaElem = document.getElementById('bangla-calendar');
    const arabicElem = document.getElementById('arabic-calendar');

    if (gregElem) {
      const formatted = new Intl.DateTimeFormat(lang === 'bn' ? 'bn-BD' : 'en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      }).format(date);
      gregElem.innerHTML = `<span class="calendar-label">${lang === 'bn' ? 'ইংরেজি:' : 'English:'}</span> ${formatted}`;
    }
    if (banglaElem) {
      banglaElem.innerHTML = `<span class="calendar-label">${lang === 'bn' ? 'বাংলা:' : 'Bangla:'}</span> ${getBanglaDate(date, lang)}`;
    }
    if (arabicElem) {
      arabicElem.innerHTML = `<span class="calendar-label">${lang === 'bn' ? 'আরবি:' : 'Arabic:'}</span> ${getArabicDate(date, lang)}`;
    }
  }

  function applyLanguage(lang = getLang()) {
    document.documentElement.lang = lang;
    document.querySelectorAll('.lang-switcher [data-lang]').forEach((btn) => {
      btn.classList.toggle('active', btn.dataset.lang === lang);
    });

    renderCalendars(lang);

    // Apply translations to all data-bn and data-en tags across page
    document.querySelectorAll('[data-bn][data-en]').forEach((el) => {
      const val = lang === 'bn' ? el.dataset.bn : el.dataset.en;
      if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
        el.placeholder = val;
      } else {
        el.textContent = val;
      }
    });
  }

  // --- Header & Footer HTML Generators ---
  function getHeaderHtml() {
    const { base, pages, assets, userDash } = getPathPrefixes();
    const showHamburger = isDashboardPage();
    const hamburgerBtnHtml = showHamburger ? `
      <button class="hamburger-btn drawer-toggle" id="drawer-toggle" type="button" aria-label="Toggle Dashboard Menu" title="Menu">
        <i class="fa-solid fa-bars"></i>
      </button>
    ` : '';

    return `
      <a class="brand" href="${base}index.html">
        <div class="logo-badge">B</div>
        <div class="brand-text">
          <h1>Bondhu<span>.</span></h1>
          <p data-bn="একসাথে গড়ি এক নতুন বাংলাদেশ" data-en="Building a New Bangladesh Together">একসাথে গড়ি এক নতুন বাংলাদেশ</p>
        </div>
      </a>
      <div class="topbar-meta">
        <div class="meta-item"><span id="gregorian-date">English calendar</span></div>
        <div class="meta-item"><span id="bangla-calendar">Bangla calendar</span></div>
        <div class="meta-item"><span id="arabic-calendar">Arabic calendar</span></div>
      </div>
      <div class="mobile-header-right">
        <div aria-label="Language switcher" class="lang-switcher">
          <button class="active" data-lang="bn" type="button">BN</button>
          <button data-lang="en" type="button">EN</button>
        </div>
        <a class="login-btn" href="${userDash}login.html">
          <img alt="" src="${assets}images/service-icons/person-search.png"/>
          <span data-bn="Login" data-en="Login">Login</span>
        </a>
        ${hamburgerBtnHtml}
      </div>
    `;
  }

  function getFooterHtml() {
    const { pages } = getPathPrefixes();
    return `
      <div class="footer-top">
        <div class="footer-brand">
          <div class="logo-badge">B</div>
          <div>
            <h2>Bondhu<span>.</span></h2>
            <p data-bn="একসাথে গড়ি এক নতুন বাংলাদেশ" data-en="Building a New Bangladesh Together">একসাথে গড়ি এক নতুন বাংলাদেশ</p>
          </div>
        </div>
        <div class="footer-links">
          <a href="mailto:help@bondhu.local" data-bn="Contact" data-en="Contact">Contact</a>
          <a href="${pages}donor-register.html" data-bn="Donation" data-en="Donation">Donation</a>
          <a href="${pages}news.html" data-bn="Privacy Policy" data-en="Privacy Policy">Privacy Policy</a>
          <a href="${pages}news.html" data-bn="Terms & Conditions" data-en="Terms & Conditions">Terms &amp; Conditions</a>
        </div>
      </div>
      <div class="footer-bottom">
        <span data-bn="© 2026 Bondhu. All Rights Reserved." data-en="© 2026 Bondhu. All Rights Reserved.">© 2026 Bondhu. All Rights Reserved.</span>
        <div class="dev-by">
          <span data-bn="Developed By" data-en="Developed By">Developed By</span>
          <div class="dot-badge">N</div>
          <a href="https://nextechzen.site" rel="noopener" target="_blank">nextechzen.site</a>
        </div>
      </div>
    `;
  }

  // --- Dynamic Mount / Injection ---
  function mountHeader() {
    let headerEl = document.querySelector('header.topbar') || document.querySelector('bondhu-header') || document.getElementById('bondhu-header');
    if (headerEl) {
      if (headerEl.tagName.toLowerCase() === 'bondhu-header' || headerEl.id === 'bondhu-header') {
        const newHeader = document.createElement('header');
        newHeader.className = 'topbar';
        newHeader.innerHTML = getHeaderHtml();
        headerEl.replaceWith(newHeader);
      } else {
        headerEl.innerHTML = getHeaderHtml();
      }
    }
  }

  function mountFooter() {
    let footerEl = document.querySelector('footer') || document.querySelector('bondhu-footer') || document.getElementById('bondhu-footer');
    if (footerEl) {
      if (footerEl.tagName.toLowerCase() === 'bondhu-footer' || footerEl.id === 'bondhu-footer') {
        const newFooter = document.createElement('footer');
        newFooter.innerHTML = getFooterHtml();
        footerEl.replaceWith(newFooter);
      } else {
        footerEl.innerHTML = getFooterHtml();
      }
    }
  }

  // --- Drawer Setup on Dashboard Pages ---
  function setupDrawerListeners() {
    const toggleBtns = document.querySelectorAll('.hamburger-btn, #drawer-toggle, .drawer-toggle, #mobile-menu');
    const sidebar = document.querySelector('#app-sidebar, .sidebar, .dash-sidebar');
    let backdrop = document.getElementById('drawer-backdrop');

    if (!backdrop && sidebar) {
      backdrop = document.createElement('div');
      backdrop.id = 'drawer-backdrop';
      backdrop.className = 'drawer-backdrop hidden';
      document.body.appendChild(backdrop);
    }

    const closeBtn = document.querySelector('#drawer-close, .drawer-close');

    const openDrawer = () => {
      if (sidebar) {
        sidebar.classList.add('is-open');
        if (backdrop) backdrop.classList.remove('hidden');
        document.body.classList.add('menu-open');
      }
    };

    const closeDrawer = () => {
      if (sidebar) {
        sidebar.classList.remove('is-open');
        if (backdrop) backdrop.classList.add('hidden');
        document.body.classList.remove('menu-open');
      }
    };

    toggleBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (sidebar && sidebar.classList.contains('is-open')) {
          closeDrawer();
        } else {
          openDrawer();
        }
      });
    });

    if (closeBtn) closeBtn.addEventListener('click', closeDrawer);
    if (backdrop) backdrop.addEventListener('click', closeDrawer);
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeDrawer();
    });

    if (sidebar) {
      sidebar.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
        if (window.innerWidth <= 820) closeDrawer();
      }));
    }
  }

  function init() {
    mountHeader();
    mountFooter();
    setupDrawerListeners();

    // Attach Language Switcher events
    document.querySelectorAll('.lang-switcher [data-lang]').forEach((btn) => {
      btn.addEventListener('click', () => setLang(btn.dataset.lang));
    });

    applyLanguage(getLang());
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // Expose global BondhuShell helper
  window.BondhuShell = {
    getLang,
    setLang,
    renderCalendars,
    getHeaderHtml,
    getFooterHtml,
    mountHeader,
    mountFooter,
    setupDrawerListeners,
    init
  };
})();
