(() => {
  const BN_DIGITS = ['০','১','২','৩','৪','৫','৬','৭','৮','৯'];
  const toBn = (value) => String(value).replace(/\d/g, (d) => BN_DIGITS[d]);
  const getLang = () => localStorage.getItem('bondhu.lang') || 'bn';
  const setLang = (lang) => {
    localStorage.setItem('bondhu.lang', lang);
    document.documentElement.lang = lang;
    document.querySelectorAll('[data-lang]').forEach((btn) => btn.classList.toggle('active', btn.dataset.lang === lang));
    renderCalendars();
  };
  function banglaDate(date = new Date(), lang = getLang()) {
    const bn = ['বৈশাখ','জ্যৈষ্ঠ','আষাঢ়','শ্রাবণ','ভাদ্র','আশ্বিন','কার্তিক','অগ্রহায়ণ','পৌষ','মাঘ','ফাল্গুন','চৈত্র'];
    const en = ['Boishakh','Joishtho','Ashar','Srabon','Bhadro','Ashwin','Kartik','Agrahayan','Poush','Magh','Falgun','Chaitra'];
    const y = date.getFullYear();
    const startY = date >= new Date(y,3,14) ? y : y - 1;
    let diff = Math.floor((new Date(y,date.getMonth(),date.getDate()) - new Date(startY,3,14)) / 86400000);
    const lens = [31,31,31,31,31,30,30,30,30,30,30,30];
    let m = 0;
    while (m < 11 && diff >= lens[m]) { diff -= lens[m]; m += 1; }
    const d = diff + 1;
    const by = startY - 593;
    return lang === 'bn' ? `${toBn(d)} ${bn[m]} ${toBn(by)}` : `${d} ${en[m]} ${by}`;
  }
  function arabicDate(date = new Date(), lang = getLang()) {
    try { return new Intl.DateTimeFormat(lang === 'bn' ? 'bn-BD-u-ca-islamic' : 'en-u-ca-islamic', { day:'numeric', month:'long', year:'numeric' }).format(date); }
    catch { return lang === 'bn' ? 'হিজরি তারিখ' : 'Hijri date'; }
  }
  function renderCalendars() {
    const lang = getLang();
    const date = new Date();
    document.querySelectorAll('[data-calendar="english"]').forEach((el) => el.textContent = new Intl.DateTimeFormat(lang === 'bn' ? 'bn-BD' : 'en-US', { day:'2-digit', month:'long', year:'numeric' }).format(date));
    document.querySelectorAll('[data-calendar="bangla"]').forEach((el) => el.textContent = banglaDate(date, lang));
    document.querySelectorAll('[data-calendar="arabic"]').forEach((el) => el.textContent = arabicDate(date, lang));
  }
  document.querySelectorAll('[data-lang]').forEach((btn) => btn.addEventListener('click', () => setLang(btn.dataset.lang)));
  setLang(getLang());
})();
