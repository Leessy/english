(() => {
  'use strict';
  const lookup=window.ReaderLookup, esc=lookup.escape;
  const lessons=window.FLUENCY_GROUPS, sentences=window.FLUENCY_LIBRARY, stories=window.READER_STORIES;
  let storageAvailable=true;
  function load(key) {try{const value=JSON.parse(localStorage.getItem(key)||'{}');return value && typeof value==='object' && !Array.isArray(value)?value:{};}catch(_){storageAvailable=false;return {};}}
  function save(key,value,status) {try{localStorage.setItem(key,JSON.stringify(value));storageAvailable=true;}catch(_){storageAvailable=false;if(status)status.textContent='本次页面仍可练习，但浏览器不允许保存；离开前记下当前位置。';}}
  const fluencyKey='daily-english-fluency-v1', storyKey='daily-english-stories-v1';
  const oldFluency=load(fluencyKey), oldStories=load(storyKey);
  let current=sentences.find(item=>item.id===oldFluency.current) || sentences[0];
  let grades=Object.fromEntries(Object.entries(oldFluency.grades||{}).filter(([id,grade])=>sentences.some(item=>item.id===id)&&['smooth','review'].includes(grade)));
  let story=stories.find(item=>item.id===new URLSearchParams(location.search).get('story')) || stories.find(item=>item.id===oldStories.current) || stories[0];
  let reads=Object.fromEntries(Object.entries(oldStories.reads||{}).filter(([id,count])=>stories.some(item=>item.id===id)&&Number.isInteger(count)&&count>0));
  const groupSelect=document.getElementById('fluencyGroup'), tierSelect=document.getElementById('fluencyTier');
  tierSelect.value=String(lessons.find(item=>item.id===current.group).tier);
  function renderGroups(){groupSelect.innerHTML=lessons.filter(item=>tierSelect.value==='all'||String(item.tier)===tierSelect.value).map(lesson=>`<option value="${lesson.id}">${esc(lesson.title)}</option>`).join('');groupSelect.value=current.group;}
  renderGroups();
  tierSelect.addEventListener('change',()=>{current=sentences.find(item=>tierSelect.value==='all'||String(lessons.find(group=>group.id===item.group).tier)===tierSelect.value);renderGroups();saveFluency();renderFluency();});
  function saveFluency(){save(fluencyKey,{current:current.id,grades},document.getElementById('fluencyStatus'));}
  function renderFluency(){
    window.ReaderSpeech?.stop(false);
    const pool=sentences.filter(item=>item.group===current.group), index=pool.indexOf(current), lesson=lessons.find(item=>item.id===current.group);
    document.getElementById('fluencyCard').innerHTML=`<span class="lesson-tag">${esc(lesson.title)} · 变式 ${index+1} / ${pool.length}</span>
      <p class="reading-text" lang="en" id="fluencyText">${esc(current.text)}</p>
      <div class="reading-tools"><button id="fluencyMeaning">整句对照 · 中译与解析</button><button id="fluencySpeak">听这一句</button><button id="fluencyAgain">这句还需复现</button><button id="fluencySmooth">这次读顺了</button></div>
      <p class="reading-muted" id="fluencyGrade">${grades[current.id]==='smooth'?'已标记本次读顺；换场景后仍要验证。':grades[current.id]==='review'?'已加入待熟练句，可多读几次。':'先读大意，不必逐词翻译；点词之后合上提示再读。'}</p>
      <div class="reading-tools"><button id="fluencyPrev">← 上一句</button><button class="reading-primary" id="fluencyNext">同结构换一句 →</button><button id="fluencyGrammar">${lesson.examples?'看分层例句':'对照本组句子'}</button></div>
      <p class="reading-muted">每次 3–6 句即可。累计标记 ${Object.keys(grades).length} / ${sentences.length} 句，不是掌握率。</p>`;
    lookup.decorate(document.getElementById('fluencyText'),{hints:current.hints,note:current.note,translation:current.translation});
    const choose=offset=>{current=pool[(index+offset+pool.length)%pool.length];saveFluency();renderFluency();};
    document.getElementById('fluencyPrev').addEventListener('click',()=>choose(-1));
    document.getElementById('fluencyNext').addEventListener('click',()=>choose(1));
    document.getElementById('fluencySpeak').addEventListener('click',()=>lookup.speak(current.text,document.getElementById('fluencyStatus')));
    document.getElementById('fluencyMeaning').addEventListener('click',event=>lookup.sentence(pool,index,event.currentTarget));
    for(const [id,grade] of [['fluencyAgain','review'],['fluencySmooth','smooth']])document.getElementById(id).addEventListener('click',()=>{grades[current.id]=grade;saveFluency();renderFluency();document.getElementById('fluencyStatus').textContent=storageAvailable?'已记录。合上提示再读一次，想换句时再点“同结构换一句”。':'本次已记录，但无法持久保存。';});
    document.getElementById('fluencyGrammar').addEventListener('click',event=>{if(lesson.examples){window.openReadingGroup(current.group);setView('reading');}else lookup.sentence(pool,index,event.currentTarget);});
  }
  groupSelect.addEventListener('change',()=>{current=sentences.find(item=>item.group===groupSelect.value);saveFluency();renderFluency();});
  document.getElementById('fluencyReview').addEventListener('click',()=>{
    const pending=sentences.filter(item=>grades[item.id]==='review');
    if(!pending.length){document.getElementById('fluencyStatus').textContent='暂时没有待熟练句。遇到读得慢的一句，可点“这句还需复现”。';return;}
    current=pending[(pending.indexOf(current)+1)%pending.length];tierSelect.value=String(lessons.find(item=>item.id===current.group).tier);renderGroups();saveFluency();renderFluency();
  });
  const storyNav=document.getElementById('storyNavigation');
  let chapters=Object.fromEntries(Object.entries(oldStories.chapters||{}).filter(([id,index])=>stories.some(item=>item.id===id&&Number.isInteger(index)&&index>=0&&index<(item.chapters?.length||1))));
  const levelLabel=level=>({1:'起步短文',2:'进阶短文',3:'分章故事'})[level];
  if(matchMedia('(max-width:760px)').matches)storyNav.open=false;
  function saveStory(){save(storyKey,{current:story.id,reads,chapters},document.getElementById('storyNotice'));}
  function renderStoryList(){
    const filter=document.getElementById('storyLevel').value;
    document.getElementById('storyList').innerHTML=stories.filter(item=>filter==='all'||String(item.level)===filter).map(item=>`<button class="story-pick" data-story="${item.id}" ${item.id===story.id?'aria-current="page"':''}><strong>${esc(item.titleZh)}</strong><small>${levelLabel(item.level)} · ${esc(item.topic)} · 已读 ${reads[item.id]||0} 次</small></button>`).join('');
    document.querySelectorAll('[data-story]').forEach(button=>button.addEventListener('click',()=>selectStory(button.dataset.story)));
    document.getElementById('storyProgress').textContent=`读过 ${Object.keys(reads).length} / ${stories.length} 篇；重读不是重新开始。`;
    storyNav.querySelector('summary').textContent=`当前：${story.titleZh} · 选篇`;
  }
  function selectStory(id){
    window.ReaderSpeech?.stop(false);
    story=stories.find(item=>item.id===id)||stories[0];saveStory();renderStory();renderStoryList();
    try{const url=new URL(location.href);url.searchParams.set('story',story.id);history.replaceState({},'',url);}catch(_){}
    if(matchMedia('(max-width:760px)').matches)storyNav.open=false;
    document.getElementById('storyTitle').focus({preventScroll:true});
  }
  function renderStory(){
    window.ReaderSpeech?.stop(false);
    const count=story.sentences.reduce((total,item)=>total+lookup.tokenize(item.text).length,0);
    const chapter=chapters[story.id]||0, start=story.chapters?.[chapter].start||0, end=story.chapters?.[chapter+1]?.start??story.sentences.length;
    const paragraphs=[];for(let i=start;i<end;i+=3)paragraphs.push(story.sentences.slice(i,Math.min(i+3,end)).map((item,j)=>`<span class="story-unit"><span class="story-sentence" data-story-sentence="${i+j}">${esc(item.text)}</span><button class="sentence-trigger" data-sentence-open="${i+j}" aria-label="第 ${i+j+1} 句：中译与结构解析">译</button></span>`).join(' '));
    document.getElementById('storyReader').innerHTML=`<span class="lesson-tag">${levelLabel(story.level)} · ${count} 词 · 原创</span><h2 id="storyTitle" tabindex="-1">${esc(story.title)}<small>${esc(story.titleZh)}</small></h2><p class="reading-muted">${esc(story.intro)}</p><details class="reading-support"><summary>本篇目标与复现词块</summary>${(story.objectives||['读完能用一两句话说出发生了什么。','注意代词指谁、动作先后，再复述一个实用句子。']).map(text=>`<p>${esc(text)}</p>`).join('')}<p>${esc(story.targets.join(' · '))}</p></details>
      ${story.chapters?`<div class="chapter-controls"><label for="storyChapter">分章阅读</label><select id="storyChapter">${story.chapters.map((item,i)=>`<option value="${i}" ${i===chapter?'selected':''}>${i+1} / ${story.chapters.length} · ${esc(item.titleZh)}</option>`).join('')}</select></div><h3 lang="en">${esc(story.chapters[chapter].title)}</h3>`:''}
      <div id="storyBody">${paragraphs.map(text=>`<p class="story-paragraph" lang="en">${text}</p>`).join('')}</div>
      <div class="reading-tools"><button id="storySpeak">${story.chapters?'听本章':'听全文'}</button>${story.chapters?`<button id="storyPrevChapter" ${chapter===0?'disabled':''}>← 上一章</button><button id="storyNextChapter" ${chapter===story.chapters.length-1?'disabled':''}>下一章 →</button>`:''}<button id="storyRead" ${end<story.sentences.length?'disabled':''}>我读完了整篇</button><button id="storyPartner">换一篇 →</button></div><p id="storyNotice" class="stage-status" role="status"></p>
      <details class="reading-support"><summary>读完想一想，不必考试式作答</summary><p>${esc(story.question)}</p><details><summary>核对大意</summary><p>${esc(story.answer)}</p></details></details><p class="reading-muted">隔一天再读，尝试减少点词次数。若每句都得停下来，先只读第一段；需要听说时再模仿一两句。</p>`;
    document.querySelectorAll('[data-story-sentence]').forEach(element=>{const item=story.sentences[Number(element.dataset.storySentence)];lookup.decorate(element,item);});
    document.querySelectorAll('[data-sentence-open]').forEach(button=>button.addEventListener('click',()=>lookup.sentence(story.sentences,Number(button.dataset.sentenceOpen),button)));
    function chooseChapter(index){window.ReaderSpeech?.stop(false);chapters[story.id]=index;saveStory();renderStory();document.getElementById('storyTitle').focus();}
    document.getElementById('storyChapter')?.addEventListener('change',event=>chooseChapter(Number(event.target.value)));
    document.getElementById('storyPrevChapter')?.addEventListener('click',()=>chooseChapter(chapter-1));
    document.getElementById('storyNextChapter')?.addEventListener('click',()=>chooseChapter(chapter+1));
    document.getElementById('storyRead').addEventListener('click',()=>{reads[story.id]=(reads[story.id]||0)+1;saveStory();renderStoryList();const button=document.getElementById('storyRead');button.disabled=true;button.textContent='本遍已记录';document.getElementById('storyNotice').textContent=storageAvailable?`本篇累计读了 ${reads[story.id]} 遍。读过不等于掌握，隔天再遇见一次。`:'本次已记录，但无法持久保存。';});
    document.getElementById('storySpeak').addEventListener('click',()=>lookup.speak(story.sentences.slice(start,end).map(item=>item.text),document.getElementById('storyNotice')));
    document.getElementById('storyPartner').addEventListener('click',()=>{const partners=stories.filter(item=>item.pair===story.pair),partner=partners[(partners.indexOf(story)+1)%partners.length];document.getElementById('storyLevel').value='all';selectStory(partner.id);});
  }
  document.getElementById('storyLevel').addEventListener('change',()=>{const filter=document.getElementById('storyLevel').value;if(filter!=='all'&&String(story.level)!==filter){story=stories.find(item=>String(item.level)===filter);saveStory();renderStory();}renderStoryList();});
  function renderNotebook(){
    const all=lookup.getSaved(), filter=document.getElementById('notebookFilter').value, items=all.filter(item=>filter==='all'||!item.known);
    document.getElementById('notebookCount').textContent=`显示 ${items.length} / ${all.length} 项 · 只在当前浏览器保存`;
    document.getElementById('notebookList').innerHTML=items.length?items.map((item,index)=>`<article class="card notebook-card ${item.known?'known':''}"><h3>${esc(item.word)} <small class="reading-muted">${esc(item.kind||'单词')}</small></h3><p class="reading-text" lang="en" data-notebook-sentence="${index}">${esc(item.sentence)}</p><details class="reading-support"><summary>回忆后再看意思</summary><p>${esc(item.meaning||'重新点词查看')}</p></details><div class="reading-tools"><button data-notebook-known="${index}">${item.known?'放回待复习':'这次想起来了'}</button><button data-notebook-remove="${index}">移出收藏</button></div></article>`).join(''):'<p class="empty-state">这里还没有待复习的词块。在例句或短文中点一个词，再点“收藏这个词＋原句”或“收藏这个词块＋原句”。已想起来的项目可切到“全部收藏”查看。</p>';
    document.querySelectorAll('[data-notebook-sentence]').forEach(element=>{const item=items[Number(element.dataset.notebookSentence)];lookup.decorate(element,item.options||{});});
    document.querySelectorAll('[data-notebook-known]').forEach(button=>button.addEventListener('click',()=>{const item=items[Number(button.dataset.notebookKnown)];const okay=lookup.setKnown(item.id,!item.known);document.getElementById('notebookStatus').textContent=okay?'已更新。想起来一次不等于永久掌握，之后仍可在“全部收藏”重读。':'仅在本次页面中更新，无法持久保存。';}));
    document.querySelectorAll('[data-notebook-remove]').forEach(button=>button.addEventListener('click',()=>{lookup.remove(items[Number(button.dataset.notebookRemove)].id);}));
    if(!lookup.storageAvailable())document.getElementById('notebookStatus').textContent='浏览器记录暂不可用；本次收藏可能无法保留到下次。';
  }
  document.getElementById('notebookFilter').addEventListener('change',renderNotebook);
  document.addEventListener('reader-notebook-change',renderNotebook);
  document.addEventListener('reader-view-change',event=>{if(event.detail==='notebook')renderNotebook();});
  renderFluency();renderStory();renderStoryList();renderNotebook();
  if(!storageAvailable)document.getElementById('fluencyStatus').textContent='浏览器记录暂不可用；仍可练习，离开前请记下位置。';
})();
