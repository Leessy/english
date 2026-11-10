/* 按人工语境标注统计词形，不用同一拼写为过去式和过去分词重复计数。 */
(() => {
  const lookup=window.ReaderLookup, normalize=lookup.normalize, plan=window.VERB_FORM_PLAN;
  if(!plan)return;
  const packs=window.VERB_FORM_PACKS||[], problems=[];
  const original=[...window.FLUENCY_LIBRARY,...window.READER_STORIES.flatMap(story=>story.sentences),...(window.CORE_EXTRA_EXAMPLES||[]),...window.READING_PATH.flatMap(lesson=>[...lesson.examples.map(item=>{item.text=item.chunks.map(chunk=>chunk.text).join(' ');return item;}),Object.assign(lesson.transfer,{note:lesson.transfer.note||lesson.transfer.explain})])];
  const fresh=packs.flatMap(pack=>pack.examples), materials=[...original,...fresh], byText=new Map();
  for(const item of materials){if(!byText.has(item.text))byText.set(item.text,[]);byText.get(item.text).push(item);}
  const evidence=new Map(), annotations=new Map();
  for(const pack of packs)for(const record of [...(pack.existing||[]),...pack.examples]){
    const matches=byText.get(record.text);
    if(!matches){problems.push(`引用不存在：${record.text}`);continue;}
    for(const target of record.targets||[]){
      const key=`${target.lemma}:${target.form}`, slot=plan.verbs.find(verb=>verb.lemma===target.lemma)?.forms.find(form=>form.form===target.form);
      const occurrence=target.occurrence??0;
      const token=lookup.tokenize(record.text).filter(token=>normalize(token.text)===normalize(target.surface))[occurrence];
      if(!slot||!token||!target.reason||!Number.isInteger(occurrence)||occurrence<0){problems.push(`无效标注：${key} ${target.surface}@${occurrence} / ${record.text}`);continue;}
      const candidates=(target.expansion?lookup.tokenize(target.expansion).map(token=>normalize(token.text)):[normalize(token.text)]);
      if(!slot.spelling.split(' / ').some(form=>candidates.includes(normalize(form)))){problems.push(`词形不匹配：${key} ${target.surface} / ${record.text}`);continue;}
      const positionKey=`${record.text}\n${token.start}`, previous=annotations.get(positionKey);
      if(previous&&previous!==key){problems.push(`同一位置冲突：${previous} / ${key} / ${record.text}`);continue;}
      annotations.set(positionKey,key);
      const hintKey=`${normalize(target.surface)}@${occurrence}`;
      for(const item of matches){
        item.hints=item.hints||{};
        const old=lookup.resolve(token.text,item.text,token.start,item).hint;
        const form=['am','are'].includes(target.form)?'present':target.form==='is'?'third':['was','were'].includes(target.form)?'past':target.form;
        const note=[old.note,target.reason].filter(Boolean).filter((value,index,array)=>array.indexOf(value)===index).join(' ');
        item.hints[hintKey]={...old,lemma:target.lemma,form,note,...(target.expansion?{expansion:target.expansion}:{})};
      }
      if(!evidence.has(key))evidence.set(key,[]);
      const list=evidence.get(key);
      if(!list.some(item=>item.sentence.text===record.text))list.push({sentence:matches[0],target,source:fresh.includes(matches[0])?'本轮场景例句':'既有材料复现'});
    }
  }
  window.READER_MATERIALS=materials;
  window.ReaderVerbPractice={plan,evidence,problems,newExamples:fresh};
  if(typeof document==='undefined'||!document.getElementById('verbSelect'))return;
  const esc=lookup.escape, select=document.getElementById('verbSelect'), formSelect=document.getElementById('verbFormSelect'), storageKey='daily-english-verb-forms-v1';
  let saved={}, storageOkay=true;
  try{saved=JSON.parse(localStorage.getItem(storageKey)||'{}')||{};}catch(_){storageOkay=false;}
  let current=plan.verbs.find(verb=>verb.lemma===saved.lemma)||plan.verbs.find(verb=>verb.lemma==='get')||plan.verbs[0];
  let currentForm=current.forms.find(form=>form.form===saved.form)?.form||'base';
  select.innerHTML=plan.verbs.map(verb=>`<option value="${verb.lemma}">${esc(verb.lemma)} · ${esc(verb.meaning)}</option>`).join('');
  select.value=current.lemma;
  function save(){try{localStorage.setItem(storageKey,JSON.stringify({lemma:current.lemma,form:currentForm}));storageOkay=true;}catch(_){storageOkay=false;}}
  function render(){
    window.ReaderSpeech?.stop(false);
    const slots=current.forms, slot=slots.find(item=>item.form===currentForm)||slots[0];currentForm=slot.form;
    const rows=evidence.get(`${current.lemma}:${slot.form}`)||[];
    formSelect.innerHTML=slots.map(item=>`<option value="${item.form}" ${item.form===slot.form?'selected':''}>${esc(item.label)} · ${esc(item.spelling)}${item.deferred?' · 后学':''}</option>`).join('');
    document.getElementById('verbCoverage').innerHTML=slots.map(item=>{const count=evidence.get(`${current.lemma}:${item.form}`)?.length||0;return `<button class="verb-form-pick ${item.form===slot.form?'active':''}" data-verb-form="${item.form}" aria-pressed="${item.form===slot.form}"><small>${esc(item.label)}</small><strong lang="en">${esc(item.spelling)}</strong><span>${item.deferred?'后学 · 非缺漏':`已核对 ${count} 条语境`}</span></button>`;}).join('');
    document.getElementById('verbPracticeTitle').textContent=`${current.lemma} · ${slot.label}`;
    document.getElementById('verbPracticeNote').textContent=slot.deferred?`后学说明：${slot.deferred}`:`${rows.length} 条不同语境按实际语法作用核对。相同拼写不合并用途；这里是材料覆盖，不是你的掌握率。`;
    document.getElementById('verbExamples').innerHTML=rows.map((row,i)=>`<article class="core-row verb-example"><small class="reading-muted">${esc(({life:'生活',work:'工作',it:'IT 文档'})[row.sentence.scene]||row.source)} · ${i+1} / ${rows.length}</small><p class="core-example" lang="en" data-verb-example="${i}">${esc(row.sentence.text)}</p><div class="reading-tools"><button data-verb-translate="${i}">整句对照</button><button data-verb-speak="${i}">听这一句</button></div><details class="reading-support"><summary>为什么用这个形态？</summary><p>${esc(row.target.reason)}</p></details></article>`).join('')+(slot.deferred?'<p class="reading-muted">先把这个词的常见意思和上面的先学形态读顺；词形存在，不代表每种语法组合都适合现在练。</p>':'');
    document.querySelectorAll('[data-verb-example]').forEach(node=>lookup.decorate(node,rows[Number(node.dataset.verbExample)].sentence));
    document.querySelectorAll('[data-verb-translate]').forEach(button=>button.addEventListener('click',()=>lookup.sentence(rows.map(row=>row.sentence),Number(button.dataset.verbTranslate),button)));
    document.querySelectorAll('[data-verb-speak]').forEach(button=>button.addEventListener('click',()=>lookup.speak(rows[Number(button.dataset.verbSpeak)].sentence.text,document.getElementById('verbStatus'))));
    document.querySelectorAll('[data-verb-form]').forEach(button=>button.addEventListener('click',()=>{currentForm=button.dataset.verbForm;save();render();}));
    document.getElementById('verbStatus').textContent=storageOkay?'一次只练一个动词的一种形态，读完 3 句即可。':'可以继续练习，但当前浏览器无法保存位置。';
  }
  select.addEventListener('change',()=>{current=plan.verbs.find(verb=>verb.lemma===select.value);if(!current.forms.some(slot=>slot.form===currentForm))currentForm='base';save();render();});
  formSelect.addEventListener('change',()=>{currentForm=formSelect.value;save();render();});
  const required=plan.verbs.flatMap(verb=>verb.forms.filter(form=>!form.deferred));
  document.getElementById('verbOverview').textContent=`${plan.verbs.length} 个通用与生活动词 · ${required.length} 个先学词形／用法 · 每项至少 ${plan.minimum} 条独立语境。不是一次背完的任务。`;
  render();
})();
