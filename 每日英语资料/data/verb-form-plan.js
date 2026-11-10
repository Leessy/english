/* 将人工审校的例句包接入词典；先学范围由教学用途决定，不声称精确语料排名。 */
(() => {
  const packs=window.VERB_FORM_PACKS||[], lexicon=window.READER_LEXICON, priorities=window.LEARNING_PRIORITIES;
  for(const pack of packs)for(const [key,entry] of Object.entries(pack.words||{})){
    const old=lexicon.words[key];
    lexicon.words[key]={...old,...entry,word:entry.word||key,priority:old?.priority||entry.priority||priorities.wordTier(key)};
  }
  const daily=['eat','drink','sleep','pay','speak','listen'];
  priorities.coreGroups.push({title:'生活常用动作：吃喝、休息、付款与交流',keys:daily});
  priorities.core=[...new Set([...priorities.core,...daily])];
  daily.forEach(lemma=>{lexicon.words[lemma].priority=1;});
  const labels={base:'原形／非三单现在式',third:'第三人称单数',past:'过去式',participle:'过去分词',ing:'-ing 形式',am:'现在式 am',is:'现在式 is',are:'现在式 are',was:'过去式 was',were:'过去式 were'};
  const verbs=packs.flatMap(pack=>pack.verbs).map(lemma=>{
    const deferred=Object.assign({},...packs.map(pack=>pack.deferred||{})), entry=lexicon.words[lemma];
    const keys=lemma==='be'?['base','am','is','are','was','were','participle','ing']:['base','third','past','participle','ing'];
    return {lemma,meaning:entry.meaning,forms:keys.map(form=>({form,label:labels[form],spelling:['am','is','are','was','were'].includes(form)?form:entry.forms[form],deferred:deferred[`${lemma}:${form}`]||''}))};
  });
  window.VERB_FORM_PLAN={verbs,minimum:3,labels,daily};
})();
