(() => {
  const $ = (s, r=document) => r.querySelector(s);
  const $$ = (s, r=document) => [...r.querySelectorAll(s)];
  const BN_DIGITS = ['০','১','২','৩','৪','৫','৬','৭','৮','৯'];
  const toBn = (v) => String(v).replace(/\d/g, d => BN_DIGITS[d]);
  const defaultAccount = { name:'MD. Shariful Islam', phone:'01712345678', email:'shariful@example.com', userId:'BON00012345' };
  function getAccount(){ return JSON.parse(localStorage.getItem('bondhu.registrationAccount') || 'null') || defaultAccount; }
  function getProfile(){ return JSON.parse(localStorage.getItem('bondhu.userProfile') || 'null'); }
  function setProfile(profile){ localStorage.setItem('bondhu.userProfile', JSON.stringify(profile)); }
  function getStatus(){ return localStorage.getItem('bondhu.profileStatus') || (getProfile() ? 'pending' : 'incomplete'); }
  function setStatus(status){ localStorage.setItem('bondhu.profileStatus', status); }
  function initials(name='Bondhu User'){ return name.split(/\s+/).filter(Boolean).slice(0,2).map(x=>x[0]).join('').toUpperCase() || 'BU'; }
  function lang(){ return localStorage.getItem('bondhu.lang') === 'bn' ? 'bn' : 'en'; }
  function setLang(value){ localStorage.setItem('bondhu.lang', value); document.documentElement.lang = value; $$('.lang-switcher [data-lang]').forEach(b=>b.classList.toggle('active', b.dataset.lang===value)); window.dispatchEvent(new CustomEvent('bondhu:lang', { detail:{ lang:value } })); }
  function toast(message, type='ok'){ const region=$('#toast-region'); if(!region) return alert(message); const div=document.createElement('div'); div.className=`toast ${type}`; div.textContent=message; region.append(div); setTimeout(()=>div.remove(),3500); }
  function englishDate(date=new Date()){ return new Intl.DateTimeFormat(lang()==='bn'?'bn-BD':'en-US',{day:'2-digit',month:'long',year:'numeric'}).format(date); }
  function banglaDate(date=new Date()){ const monthsBn=['বৈশাখ','জ্যৈষ্ঠ','আষাঢ়','শ্রাবণ','ভাদ্র','আশ্বিন','কার্তিক','অগ্রহায়ণ','পৌষ','মাঘ','ফাল্গুন','চৈত্র']; const monthsEn=['Boishakh','Joishtho','Ashar','Srabon','Bhadro','Ashwin','Kartik','Agrahayan','Poush','Magh','Falgun','Chaitra']; const y=date.getFullYear(), startThis=new Date(y,3,14), startYear=date>=startThis?y:y-1, by=startYear-593, start=new Date(startYear,3,14); let diff=Math.floor((new Date(y,date.getMonth(),date.getDate())-start)/86400000); const lens=[31,31,31,31,31,30,30,30,30,30,30,30]; let m=0; while(m<11 && diff>=lens[m]){diff-=lens[m];m++;} const d=diff+1; return lang()==='bn'?`${toBn(d)} ${monthsBn[m]} ${toBn(by)}`:`${d} ${monthsEn[m]} ${by}`; }
  function arabicDate(date=new Date()){ try{return new Intl.DateTimeFormat(lang()==='bn'?'bn-BD-u-ca-islamic':'en-u-ca-islamic',{day:'numeric',month:'long',year:'numeric'}).format(date);}catch{return lang()==='bn'?'হিজরি তারিখ':'Hijri date';}}
  function setupShell(active='dashboard'){
    const account=getAccount();
    $$('.app-user-name').forEach(el=>el.textContent=account.name || 'Bondhu User');
    $$('.app-user-id').forEach(el=>el.textContent=account.userId || 'BON00012345');
    $$('.user-avatar').forEach(el=>el.textContent=initials(account.name));
    $$('.sidebar a').forEach(a=>a.classList.toggle('active', a.dataset.page===active));
    $$('.lang-switcher [data-lang]').forEach(btn=>btn.addEventListener('click',()=>setLang(btn.dataset.lang)));
    setLang(lang());
    const dateChip=$('#date-chip'); if(dateChip) dateChip.innerHTML = `<span>${englishDate()}</span><span>|</span><span>${banglaDate()}</span><span>|</span><span>${arabicDate()}</span>`;
    const sidebar=$('#app-sidebar'), backdrop=$('#drawer-backdrop'), open=$('#mobile-menu'), close=$('#drawer-close');
    const openDrawer=()=>{sidebar?.classList.add('is-open'); backdrop?.classList.remove('hidden'); document.body.style.overflow='hidden';};
    const closeDrawer=()=>{sidebar?.classList.remove('is-open'); backdrop?.classList.add('hidden'); document.body.style.overflow='';};
    open?.addEventListener('click',openDrawer); close?.addEventListener('click',closeDrawer); backdrop?.addEventListener('click',closeDrawer); document.addEventListener('keydown',e=>{if(e.key==='Escape')closeDrawer();});
    $$('#app-sidebar a').forEach(a=>a.addEventListener('click',closeDrawer));
    $('#logout-btn')?.addEventListener('click',()=>{toast(lang()==='bn'?'লগআউট হয়েছে':'Logged out'); setTimeout(()=>location.href='login.html',600);});
  }
  function profileCompletion(profile=getProfile()){ if(!profile) return 20; const required=['fullName','dateOfBirth','gender','primaryMobile','presentDistrict','occupation','bloodGroup','identityNumber','emergencyName','emergencyMobile']; const done=required.filter(k=>profile[k]).length; return Math.min(100, Math.round(20 + done/required.length*80)); }
  window.BondhuApp={ $, $$, getAccount, getProfile, setProfile, getStatus, setStatus, initials, lang, setLang, toast, setupShell, profileCompletion, englishDate, banglaDate, arabicDate };
})();
