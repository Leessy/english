/* 可选：需在 Node 搜索路径中安装 playwright，并先从仓库根目录启动静态服务器。 */
const {chromium} = require('playwright');
const assert = require('node:assert/strict');
const base = process.env.ENGLISH_TEST_URL || 'http://127.0.0.1:8765/' + encodeURIComponent('英语考试快速复习站') + '/';
(async () => {
  const browser = await chromium.launch({executablePath: process.env.CHROME_PATH || '/usr/bin/google-chrome', headless: true, args: ['--no-sandbox']});
  try {
    const page = await browser.newPage({viewport:{width:1440,height:1000}});
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    await page.goto(base);
    await page.waitForSelector('#readingStage h2');
    assert.ok(await page.locator('[data-view-pane="reading"]').isVisible());
    assert.equal(await page.locator('#readingRoute button').count(), 12);
    const lessons = await page.evaluate(() => READING_PATH);
    // 全部例句、词卡、解析、迁移题和持久记录。
    for (let index=0; index<lessons.length; index++) {
      await page.locator(`[data-lesson="${index}"]`).click();
      for (let level=0; level<3; level++) {
        await page.locator(`[data-level="${level}"]`).click();
        assert.equal(await page.locator('#readingStage > .reading-text').innerText(), lessons[index].examples[level].chunks.map(chunk=>chunk.text).join(' '));
        await page.locator('#readingAnalysis summary').click();
        assert.ok((await page.locator('#readingAnalysis').innerText()).includes(lessons[index].examples[level].translation));
      }
      const answer = index === 0 ? (lessons[index].transfer.answer+1)%3 : lessons[index].transfer.answer;
      await page.locator(`[data-answer="${answer}"]`).click();
      await page.locator('#readingDone').click();
      // 重复点击不增加组数。
      await page.locator('#readingDone').click();
    }
    assert.match(await page.locator('#readingProgress').innerText(), /已练 12 \/ 12 组 · 1 组待巩固/);
    await page.reload();
    assert.match(await page.locator('#readingStage h2').innerText(), /完整消息/);
    assert.equal(await page.locator('[data-level="2"]').getAttribute('aria-pressed'), 'true');
    assert.match(await page.locator('#readingProgress').innerText(), /已练 12 \/ 12/);
    await page.locator('#readingReview').click();
    assert.match(await page.locator('#readingStage h2').innerText(), /动作组合/);
    await page.locator(`[data-answer="${lessons[0].transfer.answer}"]`).click();
    await page.locator('#readingDone').click();
    assert.match(await page.locator('#readingProgress').innerText(), /0 组待巩固/);
    // 原有模块仍可访问。
    for (const view of ['today','sentences','articles','practice','exam']) {
      await page.locator(`[data-view-link="${view}"]`).click();
      assert.ok(await page.locator(`[data-view-pane="${view}"]`).isVisible());
    }
    await page.locator('[data-view-link="sentences"]').click();
    await page.locator('[data-step="3"]').click();
    assert.ok(await page.locator('#chunkDetail').isVisible());
    await page.locator('#nextSentence').click();
    await page.locator('#randomSentence').click();
    await page.goto(base+'vocabulary.html');
    assert.equal(await page.locator('#word').innerText(), 'need');
    assert.equal(await page.locator('#readingWordStat').innerText(), '47');
    for (const adverb of ['still', 'already', 'yet', 'only']) {
      await page.locator('#quickSearch').fill(adverb);
      await page.locator('#searchSuggestions .suggestion').first().click();
      assert.equal(await page.locator('#word').innerText(), adverb);
      assert.equal(await page.locator('#verbTense').isVisible(), false, `${adverb} must not be treated as a verb`);
    }
    await page.locator('#quickSearch').fill('whether');
    await page.locator('#searchSuggestions .suggestion').first().click();
    assert.equal(await page.locator('#word').innerText(), 'whether');
    await page.locator('[data-grade="known"]').click();
    await page.reload();
    assert.ok(Number(await page.locator('#sideKnown').innerText()) >= 1);
    // 重置有确认，且不清空词库记录。
    await page.goto(base+'?view=today');
    page.once('dialog', dialog => dialog.dismiss());
    await page.locator('#resetBtn').click();
    assert.match(await page.locator('#progressText').innerText(), /12 \/ 12/);
    page.once('dialog', dialog => dialog.accept());
    await page.locator('#resetBtn').click();
    assert.match(await page.locator('#progressText').innerText(), /0 \/ 12/);
    assert.ok(await page.evaluate(() => localStorage.getItem('gd-zsb-vocab-state-v1')));
    // 小屏首屏不铺开 12 组菜单；主线和词库不能横向溢出。
    for (const width of [390, 320]) {
      await page.setViewportSize({width,height:844});
      for (const url of [base, base+'vocabulary.html']) {
        await page.goto(url);
        assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth+1), `${url}: overflow at ${width}`);
      }
    }
    await page.goto(base);
    assert.equal(await page.locator('#readingNavigation').getAttribute('open'), null);
    await page.locator('#readingNavigation summary').click();
    await page.locator('[data-lesson="7"]').click();
    assert.equal(await page.locator('#readingNavigation').getAttribute('open'), null);
    await page.locator('#readingAnalysis summary').click();
    assert.ok(await page.locator('#readingAnalysis .reading-chunks').isVisible());
    await page.screenshot({path:'/tmp/lc-english-mobile.png',fullPage:true});
    await page.setViewportSize({width:1440,height:1000});
    await page.goto(base);
    await page.screenshot({path:'/tmp/lc-english-desktop.png',fullPage:true});
    // 非法本地记录及禁止持久存储，不应导致白屏。
    await page.evaluate(() => localStorage.setItem('english-reading-path-v1', '{bad json'));
    await page.reload();
    assert.ok(await page.locator('#readingStage h2').isVisible());
    const blocked = await browser.newPage();
    blocked.on('pageerror', error => errors.push(error.message));
    await blocked.addInitScript(() => { Object.defineProperty(window, 'localStorage', {get(){throw new Error('blocked storage');}}); });
    await blocked.goto(base);
    assert.ok(await blocked.locator('#readingStage h2').isVisible());
    await blocked.locator('[data-answer="1"]').click();
    await blocked.locator('#readingDone').click();
    assert.match(await blocked.locator('#readingNotice').innerText(), /无法持久保存/);
    await blocked.goto(base+'vocabulary.html');
    assert.equal(await blocked.locator('#word').innerText(), 'need');
    await blocked.locator('[data-grade="known"]').click();
    assert.equal(errors.length,0,errors.join('\n'));
    console.log('PASS: 36 examples, transfers, review, resume, reset isolation, legacy views, vocabulary, 320/390px layouts, denied/corrupt storage; no page errors.');
  } finally { await browser.close(); }
})().catch(error => {console.error(error);process.exitCode=1;});
