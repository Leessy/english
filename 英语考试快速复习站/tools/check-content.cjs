/* 无第三方依赖：从任意目录运行 node tools/check-content.cjs。 */
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const assert = require('node:assert/strict');
const root = path.resolve(__dirname, '..');
const context = vm.createContext({window: {}});
for (const name of ['reading-path.js', 'reading-vocabulary.js']) {
  vm.runInContext(fs.readFileSync(path.join(root, 'data', name), 'utf8'), context, {filename: name});
}
const {READING_PATH: lessons, READING_VOCABULARY: words} = context.window;
assert.equal(lessons.length, 12);
assert.equal(words.length, 47);
assert.equal(new Set(lessons.map(item => item.id)).size, lessons.length);
assert.equal(new Set(words.map(item => item.word)).size, words.length);
for (const lesson of lessons) {
  assert.equal(lesson.examples.length, 3, lesson.id);
  for (const field of ['id','title','pattern','goal','reminder']) assert.ok(lesson[field], `${lesson.id}: ${field}`);
  assert.ok(lesson.words.length >= 4);
  for (const example of lesson.examples) {
    for (const field of ['translation','spine','note']) assert.ok(example[field], `${lesson.id}: ${field}`);
    assert.ok(example.chunks.some(chunk => chunk.type === 'verb'));
    for (const chunk of example.chunks) {
      assert.ok(['subject','verb','object','modifier'].includes(chunk.type));
      for (const field of ['text','role','explain']) assert.ok(chunk[field]);
    }
  }
  const transfer = lesson.transfer;
  assert.equal(transfer.options.length, 3);
  assert.ok(Number.isInteger(transfer.answer) && transfer.answer >= 0 && transfer.answer < 3);
  for (const field of ['text','words','question','explain','translation']) assert.ok(transfer[field]);
}
for (const item of words) for (const field of ['word','pos','meaning','example','translation','pattern']) assert.ok(item[field]);
for (const file of ['index.html', 'vocabulary.html']) {
  const html = fs.readFileSync(path.join(root, file), 'utf8');
  for (const match of html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/g)) {
    const src = match[1].match(/src="([^"]+)"/);
    const code = src ? fs.readFileSync(path.join(root, src[1]), 'utf8') : match[2];
    new vm.Script(code, {filename: src ? src[1] : file});
  }
  const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map(match => match[1]);
  assert.equal(new Set(ids).size, ids.length, `${file}: duplicate IDs`);
}
const index = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
assert.ok(!index.includes('src="data/sentence-library.js"'), '未经逐句校对的模板语料不能回到默认学习流');
assert.ok(!index.includes('已完成 82%') && !index.includes('已完成 68%'));
// 只验证本地 Markdown 链接；网络来源是否仍有效不在此测试范围。
let links = 0;
function scan(dir) {
  for (const entry of fs.readdirSync(dir, {withFileTypes:true})) {
    const file = path.join(dir, entry.name);
    if (entry.isDirectory()) scan(file);
    else if (file.endsWith('.md')) {
      const content = fs.readFileSync(file, 'utf8');
      for (const match of content.matchAll(/\]\(([^)]+)\)/g)) {
        const target = match[1].split(/[?#]/)[0];
        if (!target || /^(?:https?:|mailto:)/.test(target)) continue;
        assert.ok(fs.existsSync(path.resolve(path.dirname(file), decodeURIComponent(target))), `${file}: ${target}`);
        links++;
      }
    }
  }
}
scan(path.resolve(root, '../英语系统入门计划'));
console.log(`PASS: ${lessons.length} lessons, 36 layered examples, 12 transfer questions, ${words.length} priority words, scripts parsed, ${links} local links.`);
