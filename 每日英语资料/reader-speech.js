/* 所有页面共用朗读；本站不发送文本，浏览器提供的网络音色可能联网。 */
(() => {
  'use strict';
  const synth = window.speechSynthesis;
  const key = 'daily-english-speech-v1';
  let prefs = {voice:'',rate:1}, voices = [], session = 0, active = null, statusNode = null, retry = null;
  try { const saved=JSON.parse(localStorage.getItem(key)||'{}'); if(saved && typeof saved==='object')prefs={voice:typeof saved.voice==='string'?saved.voice:'',rate:[.85,1,1.1].includes(saved.rate)?saved.rate:1}; } catch (_) {}
  const novelty = /Albert|Bad News|Bahh|Bells|Boing|Bubbles|Cellos|Deranged|Good News|Hysterical|Jester|Organ|Trinoids|Whisper|Wobble|Zarvox/i;
  const voiceId = voice => `${voice.voiceURI || voice.name}|${voice.lang}`;
  const english = voice => /^en(?:[-_]|$)/i.test(voice.lang);
  const score = voice => (novelty.test(voice.name)?-1000:0)+(/Premium|Enhanced|Natural/i.test(voice.name)?100:0)+(voice.localService?20:0)+(voice.default?10:0)+(/^en[-_]US$/i.test(voice.lang)?5:0);
  function refresh() { voices = synth ? synth.getVoices().filter(english).sort((a,b)=>score(b)-score(a)||a.name.localeCompare(b.name)) : []; renderSettings(); }
  function chosen() { return voices.find(voice=>voiceId(voice)===prefs.voice) || voices.find(voice=>!novelty.test(voice.name)) || null; }
  function message(value) { if(statusNode?.isConnected)statusNode.textContent=value; document.querySelectorAll('[data-speech-status]').forEach(node=>node.textContent=value); }
  function stop(announce=true) { const wasActive=!!(active||retry);session++; clearTimeout(retry); retry=null; active=null; if(synth)synth.cancel(); if(announce)message('已停止朗读。');else if(wasActive)message(''); }
  // 材料传入逐句数组，保留缩写、引号和小数；不以句点盲切 e.g. / i.e.。
  function speak(text, status) {
    stop(false); statusNode=status; refresh();
    if(!synth || !window.SpeechSynthesisUtterance){message('此浏览器不支持朗读；仍可阅读、点词和看译文。');return;}
    const queue=(Array.isArray(text)?text:[text]).map(value=>String(value).trim()).filter(Boolean);
    if(!queue.length)return;
    const token=session; let index=0, attempts=0;
    function next() {
      if(token!==session)return;
      const voice=chosen();
      if(!voice){
        if(attempts++<6){message('正在加载英语音色…');retry=setTimeout(()=>{refresh();next();},200);return;}
        message('没有可用的普通英语音色。请在“朗读设置”刷新，或在系统中下载英语语音后重新打开浏览器。');return;
      }
      if(index===queue.length){active=null;message('朗读结束。可合上提示，再自己读一遍。');return;}
      active=new window.SpeechSynthesisUtterance(queue[index]);
      active.voice=voice; active.lang=voice.lang; active.rate=prefs.rate; active.pitch=1; active.volume=1;
      active.onstart=()=>{if(token===session)message(`朗读 ${index+1}/${queue.length} · ${voice.name} · ${prefs.rate}×`);};
      active.onend=()=>{if(token===session){index++;retry=setTimeout(next,100);}};
      active.onerror=event=>{if(token!==session)return;active=null;message(event.error==='not-allowed'?'浏览器阻止了自动播放，请再次点击“听这一句／听本章”。':`朗读未完成（${event.error||'语音服务异常'}）。请换一种英语音色后重试。`);};
      message(`准备朗读 · ${voice.name} · ${prefs.rate}×`);
      try { if(synth.paused)synth.resume(); synth.speak(active); } catch (_) { message('语音服务无法启动，请换音色或重新打开浏览器。'); }
    }
    next();
  }
  function save() { try { localStorage.setItem(key,JSON.stringify(prefs)); } catch (_) { message('音色设置仅在本次页面有效，浏览器不允许保存。'); } }
  function renderSettings() {
    document.querySelectorAll('[data-speech-voice]').forEach(select=>{
      select.replaceChildren(new Option('自动选择普通英语音色',''));
      voices.forEach(voice=>select.add(new Option(`${voice.name} · ${voice.lang}${voice.localService?' · 设备':' · 可能联网'}${novelty.test(voice.name)?' · 特效，不建议':''}`,voiceId(voice))));
      if(prefs.voice&&!voices.some(voice=>voiceId(voice)===prefs.voice))select.add(new Option('上次音色暂不可用（本次自动选择）',prefs.voice));
      select.value=prefs.voice; select.disabled=!synth;
    });
    document.querySelectorAll('[data-speech-rate]').forEach(select=>select.value=String(prefs.rate));
    document.querySelectorAll('[data-speech-current]').forEach(node=>node.textContent=chosen()?`当前：${chosen().name} · ${chosen().lang} · ${prefs.rate}×`:'暂未加载普通英语音色');
  }
  document.querySelectorAll('[data-speech-settings]').forEach(host=>{
    host.innerHTML='<details class="speech-settings"><summary>朗读设置 · 音色 / 语速</summary><div class="speech-controls"><label>英语音色 <select data-speech-voice aria-label="英语音色"></select></label><label>语速 <select data-speech-rate aria-label="朗读语速"><option value="0.85">0.85× 稍慢</option><option value="1">1× 自然</option><option value="1.1">1.1× 稍快</option></select></label><button type="button" data-speech-preview>试听</button><button type="button" data-speech-refresh>刷新音色</button></div><p data-speech-current></p><p>Mac 听起来奇怪？先试听并换一种普通英语音色。系统设置 → 辅助功能 → 朗读与语音（旧版“朗读内容”）可下载更多英语语音，下载完成后刷新；浏览器不一定能使用全部系统音色。read 等同形异音词请听整句，孤立单词可能读错。</p><p>本站不发送文本；标注“可能联网”的音色由浏览器语音服务处理。如需离线朗读，请选“设备”音色。</p></details><div class="speech-status-row"><span data-speech-status role="status"></span><button type="button" data-speech-stop>停止朗读</button></div>';
    host.querySelector('[data-speech-voice]').addEventListener('change',event=>{stop();prefs.voice=event.target.value;save();renderSettings();});
    host.querySelector('[data-speech-rate]').addEventListener('change',event=>{stop();prefs.rate=Number(event.target.value);save();renderSettings();});
    host.querySelector('[data-speech-preview]').addEventListener('click',()=>speak('Could you send me the file when you have time?'));
    host.querySelector('[data-speech-refresh]').addEventListener('click',refresh);
    host.querySelector('[data-speech-stop]').addEventListener('click',()=>stop());
  });
  synth?.addEventListener('voiceschanged',refresh);
  window.addEventListener('pagehide',()=>stop(false));
  document.addEventListener('reader-view-change',()=>stop(false));
  window.ReaderSpeech={speak,stop,refresh}; refresh();
})();
