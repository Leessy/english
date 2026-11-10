/* 材料内的复现统计，不是外部语料频率，也不是学习者掌握率。 */
(() => {
  const lookup=window.ReaderLookup, esc=lookup.escape, priorities=window.LEARNING_PRIORITIES;
  const materials=window.READER_MATERIALS||[...window.FLUENCY_LIBRARY,...window.READER_STORIES.flatMap(story=>story.sentences),...(window.CORE_EXTRA_EXAMPLES||[]),...window.READING_PATH.flatMap(lesson=>[...lesson.examples.map(item=>({...item,text:item.chunks.map(chunk=>chunk.text).join(' ')})),lesson.transfer])];
  const words=new Map(), phrases=new Map();
  function add(map,key,sentence){if(!map.has(key))map.set(key,[]);const list=map.get(key);if(!list.some(item=>item.text===sentence.text))list.push(sentence);}
  for(const sentence of materials){
    for(const token of lookup.tokenize(sentence.text)){
      const entry=lookup.resolve(token.text,sentence.text,token.start,sentence).entry;
      if(!entry.missing)add(words,lookup.normalize(entry.word),sentence);
    }
    for(const hit of lookup.phraseHits(sentence.text))add(phrases,hit.phrase.text,sentence);
  }
  window.ReaderMaterialIndex={words,phrases,materials};
  if(typeof document==='undefined'||!document.getElementById('coreList'))return;
  const select=document.getElementById('coreGroup'), filter=document.getElementById('coreTier');
  select.innerHTML=priorities.coreGroups.map((group,i)=>`<option value="${i}">${esc(group.title)}</option>`).join('')+'<option value="phrases">常用词块 · 连起来理解</option>';
  function render(){
    const isPhrase=select.value==='phrases'; filter.disabled=!isPhrase;
    const items=isPhrase?window.READER_LEXICON.phrases.filter(item=>String(item.priority)===filter.value).map(item=>({...item,key:item.text,word:item.text})):priorities.coreGroups[Number(select.value)].keys.map(key=>({...window.READER_LEXICON.words[key],key}));
    document.getElementById('coreSummary').textContent=`${items.length} 项 · “出现于 N 句”是本站复现量，不是英语词频。点“译”可在弹窗里切换该词的全部例句；先练常见义，不需一次背完。`;
    const shown=[];
    document.getElementById('coreList').innerHTML=items.map((item,i)=>{
      const examples=(isPhrase?phrases:words).get(item.key)||[];
      const selected=examples.slice(0,2);
      // 主动挑出不同词形的语境，不只重复最早收录的两个例句。
      if(item.forms)for(const form of Object.values(item.forms)){
        const variants=form.split(' / '), example=examples.find(sentence=>lookup.tokenize(sentence.text).some(token=>variants.includes(lookup.normalize(token.text))));
        if(example&&!selected.includes(example))selected.push(example);
      }
      for(const example of examples)if(selected.length<8&&!selected.includes(example))selected.push(example);
      shown.push(selected);
      const forms=item.forms?['base','third','past','participle','ing'].map(key=>item.forms[key]).join(' → '):item.expansion||'';
      const sentenceHtml=(sentence,j)=>`<p class="core-example"><span lang="en" data-core-example="${i}-${j}">${esc(sentence.text)}</span> <button class="sentence-trigger" data-core-translation="${i}-${j}" aria-label="查看例句中译与解析">译</button></p>`;
      return `<article class="core-row"><header><strong lang="en">${esc(item.word||item.key)}</strong><span>${esc(item.meaning||'')}</span><small>出现于 ${examples.length} 句</small></header>${forms?`<p class="core-forms" lang="en">${item.forms?'原形 → 三单 → 过去式 → 过去分词 → -ing':'缩写展开'}<br>${esc(forms)}</p>`:''}<div>${selected.slice(0,2).map(sentenceHtml).join('')||'<p class="reading-muted">暂未配例句；这不是当前必背项。</p>'}${selected.length>2?`<details><summary>再读 ${selected.length-2} 个语境${item.forms?' · 留意词形变化':''}</summary>${selected.slice(2).map((sentence,j)=>sentenceHtml(sentence,j+2)).join('')}</details>`:''}</div></article>`;
    }).join('');
    const get=key=>{const [i,j]=key.split('-').map(Number);return shown[i][j];};
    document.querySelectorAll('[data-core-example]').forEach(node=>lookup.decorate(node,get(node.dataset.coreExample)));
    document.querySelectorAll('[data-core-translation]').forEach(button=>button.addEventListener('click',()=>{const i=Number(button.dataset.coreTranslation.split('-')[0]),all=(isPhrase?phrases:words).get(items[i].key)||[];lookup.sentence(all,all.indexOf(get(button.dataset.coreTranslation)),button);}));
  }
  select.addEventListener('change',render);filter.addEventListener('change',render);render();
})();
