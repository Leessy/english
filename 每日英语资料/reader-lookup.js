/* 离线点词：先用人工词库与本句注释，再用旧词库的一般释义；不做机器翻译。 */
(() => {
  'use strict';
  const normalize = value => String(value).toLowerCase().replace(/’/g, "'");
  const escape = value => String(value).replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
  const lexicon = window.READER_LEXICON || {words:{},phrases:[],pronouns:[]};
  const words = new Map((window.VOCABULARY_DATA || []).map(item => [normalize(item.word), {...item,legacy:true}]));
  Object.entries(lexicon.words).forEach(([key,entry]) => words.set(normalize(key), entry));
  const forms = new Map();
  for (const entry of Object.values(lexicon.words)) if (entry.forms) {
    for (const [form,value] of Object.entries(entry.forms)) {
      for (const variant of value.split(/\s*\/\s*/)) {
        const token = normalize(variant);
        if (!forms.has(token)) forms.set(token, []);
        forms.get(token).push({entry,form});
      }
    }
  }
  for (const word of ['am','are']) forms.set(word,[{entry:lexicon.words.be,form:'present'}]);
  const tokenize = text => [...text.matchAll(/(?:e\.g\.|i\.e\.)|[A-Za-z]+(?:['’][A-Za-z]+)*|\d+(?::\d+)?/gi)].map(match => ({text:match[0],start:match.index,end:match.index+match[0].length}));
  const phraseCache=new Map();
  function phraseHits(text) {
    if(phraseCache.has(text))return phraseCache.get(text);
    const normalized = normalize(text), hits = [];
    for (const phrase of lexicon.phrases) {
      for (const variant of new Set([phrase.text,...phrase.aliases])) {
        const pattern = normalize(variant).replace(/[.*+?^${}()|[\]\\]/g,'\\$&').replace(/\s+/g,'\\s+');
        const regex = new RegExp(`(^|[^a-z])(${pattern})(?=$|[^a-z])`,'g');
        for (const match of normalized.matchAll(regex)) {
          const start = match.index+match[1].length;
          hits.push({start,end:start+match[2].length,phrase,text:text.slice(start,start+match[2].length)});
        }
      }
    }
    const selected = [];
    hits.sort((a,b) => (b.end-b.start)-(a.end-a.start) || a.start-b.start).forEach(hit => {
      if (!selected.some(other => hit.start < other.end && hit.end > other.start)) selected.push(hit);
    });
    selected.sort((a,b) => a.start-b.start);
    phraseCache.set(text,selected);if(phraseCache.size>1000)phraseCache.delete(phraseCache.keys().next().value);
    return selected;
  }
  function getHint(raw, sentence, start, options) {
    const key = normalize(raw), hints = Object.fromEntries(Object.entries(options.hints || {}).map(([key,value]) => [normalize(key),value]));
    const occurrence = tokenize(sentence).filter(token => token.start < start && normalize(token.text) === key).length;
    return hints[`${key}@${occurrence}`] || hints[key] || {};
  }
  function resolve(raw, sentence='', start=0, options={}) {
    const key = normalize(raw), hint = getHint(raw,sentence,start,options);
    let entry = words.get(normalize(hint.lemma || key));
    const candidates = forms.get(key) || [];
    // 先使用人工词形映射，避免旧词库将 found 只解释成原形“建立”。
    if ((!entry || entry.legacy) && candidates.length && !hint.lemma) entry = candidates[0].entry;
    if (!entry && /'s$/.test(key)) {
      const base = words.get(key.slice(0,-2));
      if (base) entry = {word:raw,pos:'名词所有格',meaning:`${base.meaning}的`,note:'名词后 ’s 常表示所属；不要与 it’s（it is / it has）混淆。'};
    }
    if (!entry) {
      const stems = key.endsWith('ies') ? [key.slice(0,-3)+'y'] : key.endsWith('es') ? [key.slice(0,-2),key.slice(0,-1)] : key.endsWith('s') ? [key.slice(0,-1)] : [];
      const noun = stems.map(stem => words.get(stem)).find(item => item && /^n\./.test(item.pos || ''));
      if (noun) entry = {...noun,inflection:'名词复数（回到词头查看意思）'};
    }
    if (!entry && /^\d/.test(key)) entry = {word:raw,pos:'数字／时间',meaning:raw.includes(':') ? '时刻：'+raw : '数字：'+raw};
    if (!entry) entry = {word:raw,pos:'未收录',meaning:'这个词还没有可靠的本地释义。请先结合句块／整句译文，不自动猜词义。',missing:true};
    // broken / saved / closed 可能描述状态；保留形容词义，同时提供相关动词词形，不能据拼写硬判被动。
    const verb = entry.forms ? entry : /adj\./.test(entry.pos||'') ? candidates.find(item=>['past','participle'].includes(item.form))?.entry || null : null;
    const matchedForms = verb ? candidates.filter(item => item.entry.word === verb.word).map(item => item.form) : [];
    const phrase = phraseHits(sentence).find(hit => start >= hit.start && start < hit.end);
    let chunk;
    if (options.chunks) {
      let offset = 0;
      for (const part of options.chunks) {
        if (start >= offset && start < offset+part.text.length) {chunk=part;break;}
        offset += part.text.length+1;
      }
    }
    return {raw,key,entry,verb,hint,matchedForms,phrase,chunk,sentence,start,options};
  }
  const api = {normalize,escape,tokenize,phraseHits,resolve,words};
  window.ReaderLookup = api;
  // 纯数据函数也供 Node 校验使用，不要求 DOM。
  if (typeof document === 'undefined') return;
  let dialog, content, trigger, current, sentenceSession=null, saved = [], storageAvailable = true;
  const storageKey = 'english-reader-notebook-v1';
  try {
    const value = JSON.parse(localStorage.getItem(storageKey) || '[]');
    if (Array.isArray(value)) saved = value.filter(item => item && typeof item.id === 'string' && typeof item.word === 'string' && typeof item.sentence === 'string').slice(0,500);
  } catch (_) { storageAvailable = false; }
  function persist() {
    try {localStorage.setItem(storageKey,JSON.stringify(saved));storageAvailable=true;} catch (_) {storageAvailable=false;}
    document.dispatchEvent(new CustomEvent('reader-notebook-change'));
    return storageAvailable;
  }
  function ensureDialog() {
    if (dialog) return;
    dialog = document.createElement('dialog'); dialog.className='lookup-dialog'; dialog.id='lookupDialog';
    dialog.setAttribute('aria-labelledby','lookupTitle');
    dialog.innerHTML='<div class="lookup-top"><span>随文提示 · 不离开原句</span><button type="button" id="lookupClose" aria-label="关闭词义提示">关闭 ×</button></div><div id="lookupContent"></div>';
    document.body.appendChild(dialog); content=dialog.querySelector('#lookupContent');
    dialog.querySelector('#lookupClose').addEventListener('click',()=>dialog.close());
    dialog.addEventListener('click', event => {if(event.target===dialog){const r=dialog.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)dialog.close();}});
    dialog.addEventListener('close',()=>{sentenceSession=null;document.querySelectorAll('.lookup-active').forEach(element=>element.classList.remove('lookup-active'));if(trigger?.isConnected)trigger.focus({preventScroll:true});});
  }
  function renderCard(result) {
    const {entry,raw,verb,hint,matchedForms,phrase,chunk,sentence} = result;
    const labels = {base:'原形',third:verb?.word==='be'?'现在式（三单 is）':'三单形式',past:'过去式',participle:'过去分词',ing:'-ing 形式',present:'现在式'};
    const formKeys = hint.form ? [hint.form] : matchedForms;
    content.innerHTML=`${sentenceSession?'<button type="button" id="lookupBack">← 回到整句对照</button>':''}<h2 id="lookupTitle"><span lang="en">${escape(raw)}</span>${entry.word&&normalize(entry.word)!==normalize(raw)?` <small>→ ${escape(entry.word)}</small>`:''}</h2>
      <p class="lookup-kind">${escape(entry.pos || '词汇')} ${entry.inflection ? '· '+escape(entry.inflection):''}</p>
      ${entry.priority?`<p class="lookup-note">${escape(window.LEARNING_PRIORITIES?.labels[entry.priority]||'随文学习')} · 先看本句常见义</p>`:''}
      <p class="lookup-meaning"><small>${hint.meaning?'本句提示':'常见词义 · 结合原句判断'}</small>${escape(hint.meaning || entry.meaning)}</p>
      ${hint.expansion || entry.expansion ? `<p class="lookup-note"><b>展开：</b><span lang="en">${escape(hint.expansion || entry.expansion)}</span></p>`:''}
      ${hint.note || entry.note ? `<p class="lookup-note">${escape(hint.note || entry.note)}</p>`:''}
      ${result.options.note ? `<p class="lookup-note"><b>本句结构提示：</b>${escape(result.options.note)}</p>`:''}
      ${chunk ? `<div class="lookup-context"><b>所在句块 · ${escape(chunk.role)}</b><p lang="en">${escape(chunk.text)}</p><p>${escape(chunk.explain)}</p></div>`:''}
      ${phrase ? `<section class="lookup-phrase"><h3>一起理解的词块</h3><strong lang="en">${escape(phrase.text)}</strong><p>${escape(phrase.phrase.meaning)}</p><small>${escape(phrase.phrase.note)}</small></section>`:''}
      ${verb ? `<h3>${entry!==verb?`相关动词 ${escape(verb.word)} 的五形态`:'同一个动词的不同形态'}</h3>${entry!==verb?'<p class="lookup-note">这个拼写也可对应下方动词的词形；本句可能描述状态或作修饰，不能仅凭词形认定它就是谓语或被动。</p>':''}<div class="lookup-forms">${['base','third','past','participle','ing'].map(form=>`<div class="${formKeys.includes(form)?'current':''}"><small>${labels[form]}</small><b lang="en">${escape(verb.forms[form])}</b></div>`).join('')}</div>
        <p class="lookup-note">${verb.word==='be'?'现在时完整形式：am / is / are。 ':''}${hint.form ? `材料标注：本句使用${labels[hint.form] || hint.form}。` : formKeys.length>1 ? `这个拼写可对应${[...new Set(formKeys)].map(key=>labels[key]).join('／')}。同形不等于同一种用法，要结合助动词和句中位置判断。` : '高亮仅表示拼写对应的词形，不自动判断本句时态或语态。'}</p>
        <details><summary>过去式和过去分词怎么区分？</summary><p>过去式可作一般过去时谓语：I sent it yesterday.（我昨天发了它。）过去分词常和 have/has 或 be 配合，也能修饰名词：I have sent it.（我已发过。）It was sent.（它被发出了。）过去分词本身不等于过去时间。</p><p>不是每个动词都能机械套用进行时或被动，例如 know 的状态义通常不用进行时。</p></details>`:''}
      ${Number.isInteger(entry.pronoun) ? `<h3>这一组代词，按位置选择</h3><div class="lookup-pronouns"><table><thead><tr><th>主格</th><th>宾格</th><th>物主限定词</th><th>独立物主代词</th><th>反身代词</th></tr></thead><tbody><tr>${lexicon.pronouns[entry.pronoun].slice(0,5).map(form=>`<td>${escape(form)}</td>`).join('')}</tr></tbody></table></div><p class="lookup-note">she helps me（她帮我）；her book（她的书）；the book is hers（书是她的）。指代对象以本句／前文为准；未标注时不自动猜测。</p>`:''}
      <details class="lookup-original"><summary>回看完整原句${result.options.translation?'与中译':''}</summary><p lang="en">${escape(sentence)}</p>${result.options.translation?`<p>${escape(result.options.translation)}</p>`:''}</details>
      <div class="lookup-actions"><button id="lookupSaveWord">收藏这个词＋原句</button>${phrase?'<button id="lookupSavePhrase">收藏这个词块＋原句</button>':''}<button id="lookupSpeak">听发音</button><button id="lookupSpeakSentence">听原句</button><button id="lookupStop">停止</button></div><p id="lookupStatus" role="status"></p>`;
    content.querySelector('#lookupBack')?.addEventListener('click',renderSentence);
    content.querySelector('#lookupSaveWord').addEventListener('click',()=>saveCurrent(false));
    content.querySelector('#lookupSavePhrase')?.addEventListener('click',()=>saveCurrent(true));
    content.querySelector('#lookupSpeak').addEventListener('click',()=>api.speak(raw,content.querySelector('#lookupStatus')));
    content.querySelector('#lookupSpeakSentence').addEventListener('click',()=>api.speak(sentence,content.querySelector('#lookupStatus')));
    content.querySelector('#lookupStop').addEventListener('click',()=>window.ReaderSpeech?.stop());
  }
  function saveCurrent(asPhrase) {
    const result=current, key=asPhrase ? result.phrase.phrase.text : result.entry.word;
    const id=`${asPhrase?'phrase':'word'}:${normalize(key)}`;
    const previous=saved.find(item=>item.id===id);
    const item={id,word:asPhrase?result.phrase.text:result.raw,lemma:key,sentence:result.sentence,start:result.start,
      meaning:asPhrase?result.phrase.phrase.meaning:result.hint.meaning||result.entry.meaning,options:result.options,
      kind:asPhrase?'词块':'单词',known:false,count:(previous?.count || 0)+1};
    saved=[item,...saved.filter(other=>other.id!==id)].slice(0,500);
    const success=persist();
    content.querySelector('#lookupStatus').textContent=success?'已存到“我的词块”，带着原句一起复习。同一词头重复收藏会更新例句。':'已在本次页面中收藏，但浏览器不允许持久保存。';
  }
  api.open = (raw,sentence,start=0,options={},source=null) => {
    ensureDialog();if(!source||!dialog.contains(source)){trigger=source;sentenceSession=null;}current=resolve(raw,sentence,start,options);renderCard(current);
    if (!dialog.open) dialog.showModal();
    dialog.scrollTop=0;
    content.querySelector('#lookupTitle').tabIndex=-1;content.querySelector('#lookupTitle').focus({preventScroll:true});
  };
  function renderSentence() {
    const {items,index}=sentenceSession, item=items[index];
    content.innerHTML=`<h2 id="lookupTitle" tabindex="-1">整句对照 <small>${index+1} / ${items.length}</small></h2><p class="sentence-original" id="sentenceOriginal" lang="en">${escape(item.text)}</p><p class="sentence-translation">${escape(item.translation||'此句尚无人工中译。')}</p>${item.note?`<section class="lookup-context"><b>先抓结构，再理解细节</b><p>${escape(item.note)}</p></section>`:''}${item.chunks?`<details><summary>分块看</summary>${item.chunks.map(chunk=>`<p><b lang="en">${escape(chunk.text)}</b> · ${escape(chunk.role)}<br>${escape(chunk.explain)}</p>`).join('')}</details>`:''}<p class="lookup-note">弹窗里也能点词；查完点“回到整句对照”，不用离开原文。</p><div class="lookup-actions"><button id="sentencePrev" ${index===0?'disabled':''}>← 上一句</button><button id="sentenceNext" ${index===items.length-1?'disabled':''}>下一句 →</button><button id="sentenceSpeak">听这一句</button><button id="sentenceStop">停止</button></div><p id="lookupStatus" role="status"></p>`;
    api.decorate(content.querySelector('#sentenceOriginal'),item);
    content.querySelector('#sentencePrev').addEventListener('click',()=>{sentenceSession.index--;renderSentence();});
    content.querySelector('#sentenceNext').addEventListener('click',()=>{sentenceSession.index++;renderSentence();});
    content.querySelector('#sentenceSpeak').addEventListener('click',()=>api.speak(item.text,content.querySelector('#lookupStatus')));
    content.querySelector('#sentenceStop').addEventListener('click',()=>window.ReaderSpeech?.stop());
    dialog.scrollTop=0;content.querySelector('#lookupTitle').focus({preventScroll:true});
  }
  api.sentence = (items,index=0,source=null) => {
    if(!items?.length)return;
    ensureDialog();trigger=source;sentenceSession={items,index:Math.max(0,Math.min(index,items.length-1))};renderSentence();
    if(!dialog.open)dialog.showModal();
    content.querySelector('#lookupTitle').focus({preventScroll:true});
  };
  api.decorate = (element, options={}) => {
    const text=element.textContent, tokens=tokenize(text), phrases=phraseHits(text);
    element.replaceChildren(); let offset=0;
    tokens.forEach(token=>{
      element.append(document.createTextNode(text.slice(offset,token.start)));
      const button=document.createElement('button');button.type='button';button.className='lookup-token';button.textContent=token.text;
      button.setAttribute('aria-label',`查看 ${token.text} 的词义`);
      button.setAttribute('aria-haspopup','dialog');
      const phrase=phrases.find(hit=>token.start>=hit.start&&token.end<=hit.end);
      if(phrase){button.classList.add('in-phrase');button.title=`词块：${phrase.text}（点击查看）`;}
      button.addEventListener('click',()=>{
        element.querySelectorAll('.lookup-token').forEach(item=>item.classList.remove('lookup-active'));
        button.classList.add('lookup-active');api.open(token.text,text,token.start,options,button);
      });
      element.append(button);offset=token.end;
    });
    element.append(document.createTextNode(text.slice(offset)));
  };
  api.speak = (text,status) => window.ReaderSpeech?.speak(text,status);
  api.getSaved = () => saved.map(item=>({...item}));
  api.storageAvailable = () => storageAvailable;
  api.setKnown = (id,known) => {const item=saved.find(item=>item.id===id);if(item)item.known=known;return persist();};
  api.remove = id => {saved=saved.filter(item=>item.id!==id);return persist();};
})();
