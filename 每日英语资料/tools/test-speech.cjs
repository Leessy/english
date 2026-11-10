/* 不模拟音质；验证语音路由、异步音色、排队、停止与错误降级。 */
const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict'),path=require('node:path');
const code=fs.readFileSync(path.resolve(__dirname,'../reader-speech.js'),'utf8');
const voice=(name,lang='en-US',localService=true)=>({name,lang,voiceURI:name,localService,default:false});
function setup(initial=[],saved={},supported=true){
  let available=initial;const pending=[],spoken=[],events={},status={isConnected:true,textContent:''};
  const synth={paused:false,cancels:0,resumes:0,getVoices:()=>available,cancel(){this.cancels++;},resume(){this.resumes++;this.paused=false;},speak(u){spoken.push(u);u.onstart?.();},addEventListener(name,fn){events[name]=fn;}};
  const document={querySelectorAll:()=>[],addEventListener(){}};
  const window={speechSynthesis:supported?synth:undefined,SpeechSynthesisUtterance:class {constructor(text){this.text=text;}},addEventListener(){}};
  const context=vm.createContext({window,document,localStorage:{getItem:()=>JSON.stringify(saved),setItem(){}},setTimeout(fn){const task={fn};pending.push(task);return task;},clearTimeout(task){if(task)task.canceled=true;}});
  vm.runInContext(code,context);
  return {api:window.ReaderSpeech,synth,spoken,status,available(list){available=list;events.voiceschanged?.();},tick(){for(let i=0;i<30&&pending.length;i++){const task=pending.shift();if(!task.canceled)task.fn();}}};
}
let t=setup([voice('Tingting','zh-CN'),voice('Bells'),voice('Samantha'),voice('Samantha (Enhanced)')]);
t.api.speak(['I read every day.','I read it yesterday.'],t.status);
assert.equal(t.spoken.length,1);assert.equal(t.spoken[0].voice.name,'Samantha (Enhanced)');
assert.equal(t.spoken[0].lang,'en-US');assert.equal(t.spoken[0].rate,1);assert.equal(t.spoken[0].pitch,1);
t.spoken[0].onend();t.tick();assert.equal(t.spoken.length,2);t.spoken[1].onend();t.tick();assert.match(t.status.textContent,/朗读结束/);
t.api.speak(['first','second'],t.status);const old=t.spoken.at(-1);t.api.stop();old.onend();t.tick();assert.equal(t.spoken.at(-1),old);assert.match(t.status.textContent,/已停止/);
t.api.speak('new',t.status);old.onerror({error:'canceled'});assert.doesNotMatch(t.status.textContent,/未完成/);
t.spoken.at(-1).onerror({error:'not-allowed'});assert.match(t.status.textContent,/再次点击/);
t=setup([]);t.api.speak('hello',t.status);assert.equal(t.spoken.length,0);t.available([voice('Daniel','en-GB')]);t.tick();assert.equal(t.spoken[0].voice.name,'Daniel');assert.equal(t.spoken[0].lang,'en-GB');
t=setup([voice('Daniel','en-GB'),voice('Samantha')],{voice:'Daniel|en-GB',rate:.85});t.synth.paused=true;t.api.speak('hello',t.status);assert.equal(t.spoken[0].voice.name,'Daniel');assert.equal(t.spoken[0].rate,.85);assert.equal(t.synth.resumes,1);
t=setup([voice('Bells'),voice('Tingting','zh-CN')]);t.api.speak('hello',t.status);t.tick();assert.equal(t.spoken.length,0);assert.match(t.status.textContent,/没有可用/);
t=setup([voice('Samantha')],{voice:'Missing|en-US',rate:5});t.api.speak('hello',t.status);assert.equal(t.spoken[0].rate,1);assert.equal(t.spoken[0].voice.name,'Samantha');
t=setup([],{},false);t.api.speak('hello',t.status);assert.match(t.status.textContent,/不支持/);
console.log('PASS: explicit English voices, novelty avoidance, saved voice/rate, asynchronous voice loading, sentence queue, stale callback cancellation, stop, resume, unsupported and denied playback. Actual Mac audio quality requires listening on the device.');
