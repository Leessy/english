(() => {
  'use strict';
  const lessons = window.READING_PATH || [];
  if (!lessons.length) return;
  const key = 'english-reading-path-v1';
  const ids = new Set(lessons.map(lesson => lesson.id));
  let storageAvailable = true;
  let saved = {};
  try { saved = JSON.parse(localStorage.getItem(key) || '{}') || {}; }
  catch (_) { storageAvailable = false; }
  let position = Math.max(0, lessons.findIndex(lesson => lesson.id === saved.lesson));
  let level = Number.isInteger(saved.level) && saved.level >= 0 && saved.level < 3 ? saved.level : 0;
  let records = Object.fromEntries(Object.entries(saved.records || {}).filter(([id, value]) => ids.has(id) && ['practiced', 'review'].includes(value)));
  let firstCorrect = null;
  const stage = document.getElementById('readingStage');
  const route = document.getElementById('readingRoute');
  const navigation = document.getElementById('readingNavigation');
  if (matchMedia('(max-width: 800px)').matches) navigation.open = false;
  const escape = value => String(value).replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
  const notice = text => { document.getElementById('readingNotice').textContent = text; };
  function save() {
    try { localStorage.setItem(key, JSON.stringify({lesson: lessons[position].id, level, records})); }
    catch (_) { storageAvailable = false; notice('浏览器未允许保存记录。本次仍可练习；离开前记下课号。'); }
  }
  function updateProgress() {
    const count = Object.keys(records).length;
    const review = Object.values(records).filter(value => value === 'review').length;
    document.getElementById('readingProgress').textContent = `已练 ${count} / ${lessons.length} 组 · ${review} 组待巩固（不是掌握率）`;
    document.getElementById('progressText').textContent = `已练 ${count} / ${lessons.length} 组`;
    document.getElementById('progressBar').style.width = `${count / lessons.length * 100}%`;
    document.getElementById('sideReadingCount').textContent = `${count} / ${lessons.length}`;
    document.getElementById('sideReadingBar').style.width = `${count / lessons.length * 100}%`;
    route.innerHTML = lessons.map((lesson, index) => `<button class="reading-pick" data-lesson="${index}" ${index === position ? 'aria-current="step"' : ''}>${String(index + 1).padStart(2, '0')} · ${escape(lesson.title)}<small>${records[lesson.id] === 'review' ? '↻ 待巩固' : records[lesson.id] ? '✓ 已练习，可复习' : index < 4 ? '第一段 · 认完整的块' : index < 8 ? '第二段 · 连接两个小句' : '第三段 · 嵌入与整合'}</small></button>`).join('');
    navigation.querySelector('summary').textContent = `第 ${position + 1} 组 · 点击选择练习组`;
    route.querySelectorAll('button').forEach(button => button.addEventListener('click', () => {
      select(Number(button.dataset.lesson));
      if (matchMedia('(max-width: 800px)').matches) navigation.open = false;
      stage.querySelector('h2').focus();
    }));
  }
  function select(index, nextLevel = 0) {
    position = index; level = nextLevel; firstCorrect = null;
    notice(''); save(); render();
    if (!storageAvailable) notice('记录暂不能保存；离开前记下当前课号和层级。');
  }
  const checkpoints = {
    3: ['读一条工作留言', 'I have checked the file you sent. It has been saved in our shared folder. You don’t need to send it again. Please check the address before you leave.', 'shared folder 共享文件夹；the file you sent 你发来的文件；before you leave 在你离开之前。', '① 文件是否检查过？② 需要再发吗？③ 离开前做什么？', '检查过；不需要再发；核对地址。整段：我已经检查了你发来的文件。文件已保存在我们的共享文件夹里。你不必再发一次。离开前请核对地址。'],
    7: ['读一条日常安排', 'The room we booked is small, but it has a kitchen. I think we can cook there. If we arrive before six, the owner will meet us at the door. Please tell me whether you can leave work early.', 'booked 预订了；kitchen 厨房；cook 做饭；arrive 到达；owner 主人；whether 是否；leave work early 提早下班。', '① 房间有什么设施？② 主人到门口接人的条件是什么？③ 最后需要确认什么？', '有厨房；六点前到达；你能否提早下班。整段：我们订的房间很小，但有厨房。我想我们可以在那里做饭。如果六点前到，房主会在门口接我们。请告诉我你能否提早下班。'],
    11: ['读一段入门操作说明', 'This guide explains how to keep a copy of your files. Files saved in this folder are available offline. If you change the settings, restart the app to make sure the changes take effect. Do not delete the original files until you have checked the copy.', 'offline 离线；make sure 确保；changes 更改；delete 删除；original 原始的；until 直到。', '① 哪些文件能离线使用？② 更改设置后做什么？③ 删除原文件前必须做什么？', '保存在这个文件夹里的文件；重启应用，确保更改生效；先检查副本。整段：本指南说明如何保留文件副本。保存在这个文件夹里的文件可以离线使用。如果更改设置，请重启应用，确保更改生效。在检查过副本之前，不要删除原始文件。']
  };
  function render() {
    const lesson = lessons[position], example = lesson.examples[level], transfer = lesson.transfer;
    stage.innerHTML = `
      <span class="lesson-tag">第 ${position + 1} / ${lessons.length} 组 · 每组可分几次练</span>
      <h2 tabindex="-1">${escape(lesson.title)}</h2>
      <p class="reading-pattern">${escape(lesson.pattern)}</p><p>${escape(lesson.goal)}</p>
      <div class="reading-tools" aria-label="同一结构的三个层级">${['1 · 认出结构','2 · 加一层','3 · 放进场景'].map((label, index) => `<button class="reading-level" data-level="${index}" aria-pressed="${index === level}">${label}</button>`).join('')}</div>
      <p class="reading-muted">先读英文，说说它在讲什么。需要时就展开本页提示，不限时；只练一句也可以停。</p>
      <p class="reading-text" lang="en">${escape(example.chunks.map(chunk => chunk.text).join(' '))}</p>
      <details class="reading-support"><summary>本组常用词块 · 忘了就看</summary><div class="reading-glossary">${lesson.words.map(([word, meaning]) => `<span><b lang="en">${escape(word)}</b>${escape(meaning)}</span>`).join('')}</div><p class="reading-muted">${escape(lesson.reminder)}</p></details>
      <details class="reading-support" id="readingAnalysis"><summary>看断句、主干和中文解释</summary>
        <p class="reading-spine">先抓主干：<span lang="en">${escape(example.spine)}</span></p>
        <div class="reading-chunks">${example.chunks.map(chunk => `<div class="${chunk.type}"><strong lang="en">${escape(chunk.text)}</strong><small>${escape(chunk.role)} · ${escape(chunk.explain)}</small></div>`).join('')}</div>
        <p>${escape(example.translation)}</p><p class="reading-muted">${escape(example.note)}</p>
        <p class="reading-muted">现在合上解释，重新读完整句；用意思连起各块，不必逐词背出语法名称。</p>
      </details>
      <div class="reading-tools"><button id="readingNextLevel" ${level === 2 ? 'disabled' : ''}>加一层 →</button><button id="readingSpeak">听这一句</button><span id="readingAudioStatus" class="reading-muted" role="status"></span></div>
      <section class="reading-transfer"><h3>换一句：不靠记住原句答案</h3><p class="reading-muted">建议读过三层后尝试。答错就看解释，下次用待巩固复习；不用重学所有基础。</p>
        <p class="reading-text" lang="en">${escape(transfer.text)}</p>
        <details class="reading-support"><summary>这句的词义提示</summary><p>${escape(transfer.words)}</p></details>
        <p>${escape(transfer.question)}</p><div class="reading-options">${transfer.options.map((option, index) => `<button class="reading-choice" data-answer="${index}" aria-pressed="false">${String.fromCharCode(65 + index)}. ${escape(option)}</button>`).join('')}</div>
        <div id="readingFeedback" class="reading-feedback" role="status"></div>
      </section>
      <div class="reading-tools"><button class="reading-primary" id="readingDone" disabled>记录本组练习</button><button id="readingNextLesson" ${position === lessons.length - 1 ? 'disabled' : ''}>下一组 →</button></div>
      <p class="reading-muted">下次先重读旧句，再换一个人或对象说一遍。同组反复几次后，再试下一组；不要求一次背熟。</p>`;
    stage.querySelectorAll('[data-level]').forEach(button => button.addEventListener('click', () => select(position, Number(button.dataset.level))));
    document.getElementById('readingNextLevel').addEventListener('click', () => select(position, level + 1));
    document.getElementById('readingNextLesson').addEventListener('click', () => select(position + 1));
    stage.querySelectorAll('[data-answer]').forEach(button => button.addEventListener('click', () => {
      const correct = Number(button.dataset.answer) === transfer.answer;
      if (firstCorrect === null) firstCorrect = correct;
      stage.querySelectorAll('[data-answer]').forEach(item => item.setAttribute('aria-pressed', String(item === button)));
      document.getElementById('readingFeedback').textContent = `${correct ? '对，关系读对了。' : '这次还需要巩固。'}正确项：${String.fromCharCode(65 + transfer.answer)}。${transfer.explain} 整句：${transfer.translation}`;
      document.getElementById('readingDone').disabled = false;
    }));
    document.getElementById('readingDone').addEventListener('click', () => {
      records[lesson.id] = firstCorrect ? 'practiced' : 'review'; save(); updateProgress();
      const message = storageAvailable ? `已记录本组：${firstCorrect ? '已练习' : '待巩固'}。下次先试着回忆，再核对。` : '已在本次页面中记录，但无法持久保存；请记下课号。';
      notice(message);
      document.getElementById('readingFeedback').textContent += ` ${message}`;
    });
    document.getElementById('readingSpeak').addEventListener('click', () => {
      const status = document.getElementById('readingAudioStatus');
      if (!('speechSynthesis' in window)) { status.textContent = '此浏览器不支持朗读，可自行慢读。'; return; }
      speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(example.chunks.map(chunk => chunk.text).join(' '));
      utterance.lang = 'en-US'; utterance.rate = .85;
      utterance.onerror = () => { status.textContent = '未能朗读，请检查设备英语语音；也可自行慢读。'; };
      utterance.onend = () => { status.textContent = '朗读结束。语音由设备提供。'; };
      status.textContent = '使用设备语音朗读…'; speechSynthesis.speak(utterance);
    });
    if (checkpoints[position]) {
      const [title, text, words, questions, answer] = checkpoints[position];
      stage.insertAdjacentHTML('beforeend', `<details class="reading-support reading-checkpoint"><summary>阶段整段练习 · ${title}</summary><p class="reading-text" lang="en">${escape(text)}</p><details><summary>同页词义</summary><p>${escape(words)}</p></details><p>${escape(questions)}</p><details><summary>核对大意与答案</summary><p>${escape(answer)}</p></details><p class="reading-muted">第一次按意思读；隔一天不看中文再读。仍卡住就只精读其中一句，不另开新词表。</p></details>`);
    }
    updateProgress();
  }
  window.startReading = () => { setView('reading'); stage.querySelector('h2').focus({preventScroll: true}); };
  document.getElementById('readingReview').addEventListener('click', () => {
    const candidates = lessons.map((lesson, index) => ({index, value: records[lesson.id]})).filter(item => item.value === 'review');
    const pool = candidates.length ? candidates : lessons.map((lesson, index) => ({index, value: records[lesson.id]})).filter(item => item.value);
    if (!pool.length) { notice('还没有记录过练习。先从当前组读一句，再做换句题即可。'); return; }
    const next = pool.find(item => item.index > position) || pool[0];
    select(next.index, 2); notice('先不展开解释，回忆这一句的意思。优先复习待巩固组。');
  });
  document.getElementById('resetBtn').addEventListener('click', () => {
    if (!confirm('只清除这 12 组读句训练的位置和练习记录？词库生词记录不受影响。')) return;
    records = {}; select(0); notice('读句记录已清除，词库记录未改变。');
  });
  render();
  if (!storageAvailable) notice('记录暂不能保存；离开前记下当前课号和层级。');
})();
