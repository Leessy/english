/* 需 Playwright 与本地静态服务器；不使用个人浏览器资料。 */
const {chromium}=require('playwright');
const assert=require('node:assert/strict');
const {pathToFileURL}=require('node:url');
const path=require('node:path');
const base=process.env.ENGLISH_TEST_URL||'http://127.0.0.1:8765/'+encodeURIComponent('每日英语资料')+'/';
(async()=>{
  const browser=await chromium.launch({executablePath:process.env.CHROME_PATH||'/usr/bin/google-chrome',headless:true,args:['--no-sandbox']});
  try {
    const page=await browser.newPage({viewport:{width:1440,height:1000}});
    const errors=[];page.on('pageerror',e=>errors.push(e.message));
    page.on('response',r=>{if(r.status()>=400)errors.push(r.status()+' '+r.url());});
    const close=async()=>{await page.locator('#lookupClose').click();assert.equal(await page.locator('#lookupDialog').isVisible(),false);};
    const clickWord=async(root,word)=>{await page.locator(root+' .lookup-token').filter({hasText:new RegExp('^'+word.replace(/[.*+?^\u0024{}()|[\]\\]/g,'\\\u0024&')+'$')}).first().click();assert.ok(await page.locator('#lookupDialog').isVisible());};
    await page.goto(base);
    assert.equal(await page.title(),'Daily English · 每日英语资料');
    assert.ok(await page.locator('[data-view-pane="fluency"]').isVisible());
    assert.equal(await page.locator('[data-view-link="exam"]').count(),0);
    const materials=await page.evaluate(()=>FLUENCY_LIBRARY);
    const groups=await page.evaluate(()=>FLUENCY_GROUPS.map(x=>x.id));
    assert.match(await page.locator('#fluencyText').innerText(),/^Do you know/);
    assert.equal(await page.locator('#fluencyTier').inputValue(),'1');
    await page.locator('#fluencyTier').selectOption('all');
    // 全部 108 条复现句保持标点和空格，所有英文词都能点。
    for(const group of groups){
      await page.locator('#fluencyGroup').selectOption(group);
      for(const item of materials.filter(x=>x.group===group)){
        assert.equal(await page.locator('#fluencyText').textContent(),item.text);
        assert.ok(await page.locator('#fluencyText button').count()>0);
        await page.locator('#fluencyNext').click();
      }
    }
    await page.locator('#fluencyGroup').selectOption('verb-time');
    const sent=page.locator('#fluencyText button').filter({hasText:/^sent$/});
    await sent.focus();await page.keyboard.press('Enter');
    assert.match(await page.locator('#lookupTitle').innerText(),/send/);
    assert.equal(await page.locator('.lookup-forms > div').count(),5);
    assert.match(await page.locator('.lookup-forms .current').innerText(),/过去式/);
    assert.ok(!(await page.locator('#lookupContent').innerText()).includes('I sent 修饰 message'));
    await page.locator('#lookupSaveWord').click();
    await page.keyboard.press('Escape');assert.equal(await sent.evaluate(el=>el===document.activeElement),true);
    await page.locator('#fluencyAgain').click();
    await page.locator('#fluencyNext').click();await page.reload();
    assert.match(await page.locator('#fluencyText').innerText(),/We’ve already read/);
    await page.locator('#fluencyReview').click();
    assert.match(await page.locator('#fluencyText').innerText(),/^I sent/);
    // 缩写按材料语境分别解释，而不是一律猜成 would。
    await page.locator('#fluencyGroup').selectOption('verb-blocks');
    for(let i=0;i<4;i++)await page.locator('#fluencyNext').click();
    await clickWord('#fluencyText','I’d');
    assert.match(await page.locator('#lookupContent').innerText(),/I would/);await close();
    await page.locator('#fluencyTier').selectOption('all');
    await page.locator('#fluencyGroup').selectOption('combine');
    for(let i=0;i<3;i++)await page.locator('#fluencyNext').click();
    await clickWord('#fluencyText','I’d');
    assert.match(await page.locator('#lookupContent').innerText(),/I had/);await close();
    // 词块与单词可以分别收藏，关闭后仍停留在原句。
    await page.locator('#fluencyGroup').selectOption('verb-blocks');
    await clickWord('#fluencyText','need');
    assert.match(await page.locator('.lookup-phrase').innerText(),/need to/);
    await page.locator('#lookupSavePhrase').click();await close();
    await page.locator('[data-view-link="notebook"]').click();
    assert.equal(await page.locator('.notebook-card').count(),2);
    await page.locator('[data-notebook-known="0"]').click();
    assert.equal(await page.locator('.notebook-card').count(),1);
    await page.locator('#notebookFilter').selectOption('all');
    assert.equal(await page.locator('.notebook-card').count(),2);
    await page.reload();await page.locator('#notebookFilter').selectOption('all');
    assert.equal(await page.locator('.notebook-card').count(),2);
    // 保留原 12 组和 36 条解析的点词功能及迁移练习。
    await page.locator('[data-view-link="reading"]').click();
    const lessons=await page.evaluate(()=>READING_PATH);
    for(let i=0;i<12;i++){
      await page.locator('[data-lesson="'+i+'"]').click();
      for(let level=0;level<3;level++){
        await page.locator('[data-level="'+level+'"]').click();
        assert.equal(await page.locator('#readingStage > .reading-text').textContent(),lessons[i].examples[level].chunks.map(x=>x.text).join(' '));
        await page.locator('#readingAnalysis summary').click();
        assert.ok(await page.locator('.reading-chunks .lookup-token').count()>0);
      }
      await page.locator('[data-answer="'+lessons[i].transfer.answer+'"]').click();await page.locator('#readingDone').click();
    }
    assert.match(await page.locator('#readingProgress').innerText(),/已练 12 \/ 12/);
    await page.reload();assert.match(await page.locator('#readingStage h2').innerText(),/完整消息/);
    // 8 篇短文和 3 篇四章故事：逐句中译原地弹窗、词义往返、章节恢复。
    await page.locator('[data-view-link="stories"]').click();
    const stories=await page.evaluate(()=>READER_STORIES);
    for(const story of stories){
      await page.locator('[data-story="'+story.id+'"]').click();
      const chapters=story.chapters||[{start:0}];
      for(let chapter=0;chapter<chapters.length;chapter++){
        if(story.chapters)await page.locator('#storyChapter').selectOption(String(chapter));
        const start=chapters[chapter].start,end=chapters[chapter+1]?.start??story.sentences.length;
        assert.equal(await page.locator('#storyBody .story-sentence').count(),end-start);
        for(let i=start;i<end;i++)assert.equal(await page.locator('[data-story-sentence="'+i+'"]').textContent(),story.sentences[i].text);
        const trigger=page.locator('[data-sentence-open="'+start+'"]');
        await trigger.click();assert.equal(await page.locator('.sentence-translation').innerText(),story.sentences[start].translation);
        await page.locator('#sentenceOriginal .lookup-token').first().click();
        assert.ok(await page.locator('#lookupBack').isVisible());await page.locator('#lookupBack').click();
        assert.equal(await page.locator('#sentenceOriginal').textContent(),story.sentences[start].text);
        await page.locator('#sentenceNext').click();assert.equal(await page.locator('.sentence-translation').innerText(),story.sentences[start+1].translation);
        await page.keyboard.press('Escape');assert.equal(await trigger.evaluate(el=>el===document.activeElement),true);
      }
      await page.locator('#storyRead').click();assert.equal(await page.locator('#storyRead').isDisabled(),true);
      assert.equal(await page.locator('#storyMeaning').count(),0);
    }
    await page.locator('#storyChapter').selectOption('2');await page.reload();assert.equal(await page.locator('#storyChapter').inputValue(),'2');
    await page.locator('[data-story="shared"]').click();
    await clickWord('#storyBody','hers');
    assert.match(await page.locator('.lookup-pronouns').innerText(),/she/);
    assert.match(await page.locator('.lookup-meaning').innerText(),/笔记本电脑/);await close();
    await clickWord('#storyBody','used');
    assert.match(await page.locator('.lookup-phrase').innerText(),/used to/);await close();
    await page.locator('#storyLevel').selectOption('1');assert.equal(await page.locator('#storyList button').count(),4);
    await page.locator('#storyLevel').selectOption('2');assert.equal(await page.locator('#storyList button').count(),4);
    await page.locator('#storyLevel').selectOption('3');assert.equal(await page.locator('#storyList button').count(),3);
    await page.locator('#storyPartner').click();assert.equal(await page.locator('#storyList button').count(),11);
    await page.locator('[data-view-link="core"]').click();
    assert.ok(await page.locator('.core-row').count()>20);
    await page.locator('[data-core-translation]').first().click();assert.ok(await page.locator('.sentence-translation').isVisible());await close();
    await page.locator('#coreGroup').selectOption('phrases');await page.locator('#coreTier').selectOption('it');assert.ok(await page.locator('.core-row').count()>0);
    // 逐个先学词形核对真实呈现的独立语境，不以字面拼写替代语法作用。
    await page.locator('[data-view-link="verbs"]').click();
    const verbPlan=await page.evaluate(()=>VERB_FORM_PLAN.verbs);
    assert.equal(verbPlan.length,41);
    for(const verb of verbPlan){
      await page.locator('#verbSelect').selectOption(verb.lemma);
      for(const slot of verb.forms){
        await page.locator('#verbFormSelect').selectOption(slot.form);
        if(slot.deferred){assert.match(await page.locator('#verbPracticeNote').innerText(),/后学说明/);continue;}
        const expected=await page.evaluate(({lemma,form})=>ReaderVerbPractice.evidence.get(`${lemma}:${form}`).map(item=>item.sentence.text),{lemma:verb.lemma,form:slot.form});
        const shown=await page.locator('[data-verb-example]').allTextContents();assert.deepEqual(shown,expected);assert.ok(shown.length>=3);
      }
    }
    await page.locator('#verbSelect').selectOption('read');
    for(const [form,label] of [['past','过去式'],['participle','过去分词']]){
      await page.locator('#verbFormSelect').selectOption(form);await clickWord('[data-verb-example="0"]','read');
      assert.match(await page.locator('.lookup-forms .current').innerText(),new RegExp(label));await close();
    }
    await page.locator('[data-verb-translate="0"]').click();assert.ok(await page.locator('.sentence-translation').isVisible());await close();
    await page.reload();assert.equal(await page.locator('#verbSelect').inputValue(),'read');assert.equal(await page.locator('#verbFormSelect').inputValue(),'participle');
    await page.locator('#verbSelect').selectOption('be');await page.locator('[data-verb-form="am"]').click();assert.ok(await page.locator('[data-verb-example]').count()>=3);
    // 词库没有旧题型入口；变形可搜索，副词不生成虚构动词形态。
    await page.goto(base+'vocabulary.html');
    assert.equal(await page.locator('#word').innerText(),'need');
    assert.ok(Number(await page.locator('#totalStat').innerText())>600);
    for(const word of ['already','yet','only']){
      await page.locator('#quickSearch').fill(word);await page.locator('.suggestion').first().click();
      assert.equal(await page.locator('#verbTense').isVisible(),false);
    }
    await page.locator('#quickSearch').fill('sent');await page.locator('.suggestion').first().click();
    assert.equal(await page.locator('#word').innerText(),'send');
    assert.ok(await page.locator('#example .lookup-token').count()>0);
    await page.locator('#vocabSentence').click();assert.ok(await page.locator('.sentence-translation').isVisible());await close();
    await page.locator('[data-grade="known"]').click();
    // 重置原分层记录不能破坏新词块或复现记录。
    await page.goto(base+'?view=today');page.once('dialog',d=>d.dismiss());await page.locator('#resetBtn').click();
    assert.match(await page.locator('#progressText').innerText(),/12 \/ 12/);
    page.once('dialog',d=>d.accept());await page.locator('#resetBtn').click();
    assert.match(await page.locator('#progressText').innerText(),/0 \/ 12/);
    assert.ok(await page.evaluate(()=>localStorage.getItem('english-reader-notebook-v1')&&localStorage.getItem('daily-english-fluency-v1')));
    // 小屏各视图及弹窗不得造成页面横向溢出。
    for(const width of [390,320]){
      await page.setViewportSize({width,height:844});
      for(const view of ['fluency','verbs','reading','stories','core','notebook']){
        await page.goto(base+'?view='+view);
        assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),'overflow '+width+' '+view);
      }
      await page.goto(base+'?view=fluency');
      await page.locator('#fluencyTier').selectOption('all');
      await page.locator('#fluencyGroup').selectOption('verb-time');await clickWord('#fluencyText','sent');
      assert.ok(await page.locator('#lookupClose').isVisible());
      assert.ok(await page.locator('#lookupDialog').evaluate(el=>el.scrollWidth<=el.clientWidth+1));
      await page.screenshot({path:'/tmp/daily-english-mobile.png',fullPage:true});await close();
      await page.locator('#fluencyMeaning').click();assert.ok(await page.locator('.sentence-translation').isVisible());assert.ok(await page.locator('#lookupDialog').evaluate(el=>el.scrollWidth<=el.clientWidth+1));await close();
      await page.locator('.speech-settings summary').click();assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1));
      await page.goto(base+'vocabulary.html');assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1));
    }
    // 直接 file:// 打开也不依赖 fetch 或远程词典。
    await page.goto(pathToFileURL(path.resolve(__dirname,'../index.html')).href);
    assert.ok(await page.locator('#fluencyText .lookup-token').count()>0);
    await clickWord('#fluencyText','Do');await close();
    // 损坏与禁止的存储均有降级，不白屏。
    await page.goto(base);
    await page.evaluate(()=>{for(const key of ['english-reading-path-v1','english-reader-notebook-v1','daily-english-fluency-v1','daily-english-stories-v1','daily-english-verb-forms-v1'])localStorage.setItem(key,'{bad json');});
    await page.reload();assert.ok(await page.locator('#fluencyText').isVisible());
    const blocked=await browser.newPage();blocked.on('pageerror',e=>errors.push(e.message));
    await blocked.addInitScript(()=>Object.defineProperty(window,'localStorage',{get(){throw new Error('blocked');}}));
    await blocked.goto(base);await blocked.locator('#fluencyAgain').click();
    assert.match(await blocked.locator('#fluencyStatus').innerText(),/无法持久保存/);
    await blocked.locator('#fluencyText button').filter({hasText:/^Do$/}).click();await blocked.locator('#lookupSaveWord').click();
    assert.match(await blocked.locator('#lookupStatus').innerText(),/不允许持久保存/);
    await blocked.locator('#lookupClose').click();await blocked.evaluate(()=>setView('verbs'));
    await blocked.locator('#verbSelect').selectOption('get');assert.match(await blocked.locator('#verbStatus').innerText(),/无法保存/);
    await blocked.goto(base+'vocabulary.html');assert.equal(await blocked.locator('#word').innerText(),'need');
    // 用隔离的语音替身检查设置实际传入播放请求；不把无声测试当作 Mac 音质验证。
    const audio=await browser.newPage();audio.on('pageerror',e=>errors.push(e.message));
    await audio.addInitScript(()=>{
      const listeners={},voices=[];window.audioCalls=[];
      Object.defineProperty(window,'speechSynthesis',{value:{getVoices:()=>voices,cancel(){},resume(){},speak(u){window.audioCalls.push(u);u.onstart?.();},addEventListener(type,fn){listeners[type]=fn;}}});
      window.SpeechSynthesisUtterance=class{constructor(text){this.text=text;}};
      window.publishVoices=()=>{voices.push({name:'Tingting',lang:'zh-CN',voiceURI:'zh',localService:true},{name:'Bubbles',lang:'en-US',voiceURI:'fx',localService:true},{name:'Samantha (Enhanced)',lang:'en-US',voiceURI:'us',localService:true},{name:'Daniel',lang:'en-GB',voiceURI:'gb',localService:true});listeners.voiceschanged?.();};
    });
    await audio.goto(base);await audio.evaluate(()=>publishVoices());
    await audio.locator('.speech-settings summary').click();
    assert.equal(await audio.locator('[data-speech-voice] option').count(),4);
    await audio.locator('[data-speech-preview]').click();
    assert.equal(await audio.evaluate(()=>audioCalls.at(-1).voice.name),'Samantha (Enhanced)');
    await audio.locator('[data-speech-voice]').selectOption('gb|en-GB');await audio.locator('[data-speech-rate]').selectOption('0.85');
    await audio.locator('[data-speech-preview]').click();
    assert.deepEqual(await audio.evaluate(()=>({name:audioCalls.at(-1).voice.name,rate:audioCalls.at(-1).rate,lang:audioCalls.at(-1).lang})),{name:'Daniel',rate:.85,lang:'en-GB'});
    await audio.locator('[data-speech-stop]').click();assert.match(await audio.locator('[data-speech-status]').innerText(),/已停止/);
    await audio.reload();await audio.evaluate(()=>publishVoices());assert.equal(await audio.locator('[data-speech-voice]').inputValue(),'gb|en-GB');
    await audio.locator('[data-view-link="stories"]').click();await audio.locator('[data-story="quiet-button"]').click();
    await audio.locator('#storySpeak').click();assert.equal(await audio.evaluate(()=>audioCalls.length),1);
    await audio.evaluate(()=>audioCalls[0].onend());await audio.waitForFunction(()=>audioCalls.length===2);
    await audio.locator('#storyNextChapter').click();await audio.evaluate(()=>audioCalls.at(-1).onend());await audio.waitForTimeout(180);assert.equal(await audio.evaluate(()=>audioCalls.length),2);
    await audio.close();
    assert.equal(errors.length,0,errors.join('\n'));
    console.log('PASS: 108 variants, 41 verbs and every priority form, 36 layered examples, 11 stories/12 chapters, word/sentence dialogs, core vocabulary, persisted verb/chapter positions, notebook/reset isolation, mobile/audio settings, file mode and denied/corrupt storage; no page errors.');
  } finally {await browser.close();}
})().catch(error=>{console.error(error);process.exitCode=1});
