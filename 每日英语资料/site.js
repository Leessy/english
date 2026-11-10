(() => {
  const names = {fluency:'常用句复现',verbs:'动词形态复现',reading:'句式分层',stories:'故事与泛读',core:'核心词与词块',notebook:'我的词块',today:'学习方法与记录'};
  window.setView = (name,updateUrl=true) => {
    const selected = names[name] ? name : 'fluency';
    document.querySelectorAll('[data-view-pane]').forEach(pane=>{pane.hidden=pane.dataset.viewPane!==selected;});
    document.querySelectorAll('[data-view-link]').forEach(link=>{const active=link.dataset.viewLink===selected;link.classList.toggle('active',active);if(active)link.setAttribute('aria-current','page');else link.removeAttribute('aria-current');});
    document.getElementById('sidebar').classList.remove('open');
    document.getElementById('menuBtn').setAttribute('aria-expanded','false');
    if(updateUrl){try{const url=new URL(location.href);url.searchParams.set('view',selected);history.replaceState({},'',url);}catch(_){/* file 模式可能禁止历史修改 */}}
    document.dispatchEvent(new CustomEvent('reader-view-change',{detail:selected}));
  };
  document.querySelectorAll('[data-view-link]').forEach(link=>link.addEventListener('click',event=>{event.preventDefault();setView(link.dataset.viewLink);}));
  document.getElementById('menuBtn').addEventListener('click',()=>{const open=document.getElementById('sidebar').classList.toggle('open');document.getElementById('menuBtn').setAttribute('aria-expanded',String(open));});
  document.addEventListener('keydown',event=>{if(event.key==='Escape'){document.getElementById('sidebar').classList.remove('open');document.getElementById('menuBtn').setAttribute('aria-expanded','false');}});
  document.getElementById('continueBtn').addEventListener('click',()=>setView('fluency'));
  setView(new URLSearchParams(location.search).get('view') || 'fluency',false);
})();
