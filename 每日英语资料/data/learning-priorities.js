/* 教学优先级，不是伪造的词频名次。参照 NGSL / Oxford 的通用性与实用性原则。 */
(() => {
  const rows = [
    ['core-questions','问清楚：do / did / can',[
      ['Do you know where I can find it?','你知道我在哪里能找到它吗？','外层 Do you know 是提问；内层 where I can find it 用陈述语序。do 不单独译成“做”。'],
      ['What does this word mean in this sentence?','这个词在这句话里是什么意思？','does 配第三人称单数 this word；后面的 mean 用原形，不用 means。'],
      ['Did you send it to her, or did she send it to you?','是你把它发给她的，还是她把它发给你的？','did 后都是 send 原形；her/you 作接收者，she 作第二小句的主语。'],
      ['Why didn’t they tell us about the change?','他们为什么没有告诉我们这个变化？','didn’t = did not；they 作主语，us 作宾语。过去时间由 did 表示。'],
      ['Can you say that again, please?','请你再说一遍好吗？','can you + 原形表示请求；that 指刚才说的话，不必逐词译成“那个”。'],
      ['Does it work without the internet?','没有网络时它能用吗？','work 在此意为正常运行；does 已标记第三人称单数，work 不加 s。']
    ]],
    ['core-there','存在与状态：there / be / have',[
      ['There is a message for you on my phone.','我的手机上有一条给你的消息。','There is 引出“有某物”；a message 是单数。for you 说明消息给谁。'],
      ['Are there any questions before we start?','开始之前，大家有什么问题吗？','Are there 是存在句的提问；questions 是复数。before 引出时间小句。'],
      ['There isn’t enough time to check everything today.','今天没有足够的时间检查所有内容。','time 不可数，用 isn’t；to check 说明时间用来做什么。'],
      ['There were two copies, but I only have one now.','之前有两份副本，但现在我只有一份。','were 表过去存在；have 表我拥有。one 代替 one copy，不必重复名词。'],
      ['The room looks different, but the address is the same.','房间看起来不一样，但地址是相同的。','looks 和 is 都连接主语与状态；different / the same 不是动作。'],
      ['The app is working now, and we are ready to use it.','应用现在能正常运行了，我们也准备好使用它了。','is working 表当前运行情况；are ready 是状态；it 指 the app。']
    ]],
    ['core-reference','认出指代：my / mine / it / them',[
      ['This is my copy, and that one is yours.','这是我的副本，那份是你的。','my 后接名词；yours 独立代替 your copy。one 代替 copy。'],
      ['These are our notes; those are theirs.','这些是我们的笔记，那些是他们的。','these/those 指复数；our notes = 名词前物主限定词；theirs = their notes。'],
      ['She gave me her number, and I gave her mine.','她把她的号码给了我，我也把我的号码给了她。','第一个 her 修饰 number；第二个 her 是接收者“她”；mine = my number。',{ 'her@0':{meaning:'她的，修饰 number'},'her@1':{meaning:'她（宾格），号码的接收者'},gave:{lemma:'give',form:'past'}}],
      ['He took his bag, but he left hers on the bus.','他拿了自己的包，却把她的包落在了公交车上。','his bag 与 hers 对照；hers = her bag；left 是 leave 的过去式，不是左边。',{left:{lemma:'leave',form:'past',meaning:'留下了；落下了'}}],
      ['They sent us their files, so we sent them ours.','他们给我们发了他们的文件，所以我们也把自己的文件发给了他们。','they/we 是主语，us/them 是宾语；their 后接 files，ours 独立代替 our files。'],
      ['The app has its own page, and it’s easy to find.','这个应用有自己的页面，而且这个页面很容易找到。','its 表“它的”；it’s = it is，本句 it 指前面的页面。',{ "it’s":{expansion:'it is',meaning:'这个页面很容易找到中的“它是”'}}]
    ]],
    ['core-actions','动作链：现在 / 过去 / 已完成',[
      ['I go to work by bus, but I walked there yesterday.','我平时坐公交上班，但昨天是走过去的。','go 表习惯，walked 表昨天的动作；there 指工作地点。'],
      ['She came back early and made dinner for us.','她早早回来了，还为我们做了晚饭。','came 与 made 是 come/make 的过去式，共用主语 she。'],
      ['We’ve taken a break, and we can start again now.','我们已经休息过了，现在可以继续开始了。','We’ve = We have；taken 是 take 的过去分词；can 后用 start 原形。',{taken:{lemma:'take',form:'participle'}}],
      ['I don’t understand this part, so I’m reading it again.','我不明白这一部分，所以正在重读。','don’t understand 表当前不理解；am reading 表正在读；it 指 this part。'],
      ['He has written the message, but he hasn’t sent it yet.','他已经写好消息了，但还没有发出去。','has written / hasn’t sent 都是 have + 过去分词；yet 表截至现在还没有。',{written:{lemma:'write',form:'participle'},sent:{lemma:'send',form:'participle'}}],
      ['I thought it was broken, but now I know how to use it.','我原以为它坏了，但现在知道怎么用了。','thought / was 表过去判断；know 表现在认识；how to use it 整块作 know 的内容。']
    ]],
    ['core-links','把话接起来：when / if / because',[
      ['When you get home, please call me.','到家后请给我打个电话。','when 小句说明时间；主句是请求 call me。一般谈将来时，从句这里仍用 get。'],
      ['If you don’t have time, we can do it tomorrow.','如果你没时间，我们可以明天再做。','if 给出条件；don’t have 在此表示没有，并非完成时。'],
      ['I stayed at home because I didn’t feel well.','我因为身体不舒服留在了家里。','because 解释原因；didn’t 后 feel 用原形；well 在 feel 后表示身体好。'],
      ['Please look at the example before you try it yourself.','请先看这个例子，再自己试试。','look at 整块为“看”；before 表时间顺序；yourself 强调亲自操作。'],
      ['We talked to each other after we read the notes.','读完笔记后，我们相互聊了聊。','after 引出时间小句；read 此处是过去式，读 /red/；each other 表相互。',{read:{lemma:'read',form:'past'}}],
      ['I want to go, but I need to finish this first.','我想去，但需要先完成这件事。','want to / need to 后都接原形；but 表转折；first 表先后顺序。']
    ]],
    ['core-work','工作沟通：请求 / 确认 / 进度',[
      ['Could you help me check these details?','你能帮我核对这些细节吗？','Could you 表委婉请求，并非一定指过去；help me check 中 check 用原形。'],
      ['I’m still working on it; I’ll let you know when it’s ready.','我还在处理；准备好后会告诉你。','work on 表处理；I’ll = I will；when it’s ready 中 it’s = it is。'],
      ['Do you mean this one or the one we used before?','你指的是这个，还是我们以前用过的那个？','mean 表“指的是”；we used before 修饰第二个 one。'],
      ['Please send me the link so I can check it myself.','请把链接发给我，这样我就能自己检查了。','send me the link = send the link to me；so 在这里引出目的；myself 强调亲自。'],
      ['For example, you can open a file without changing it.','例如，你可以打开文件而不更改它。','for example 引出例子；without 是介词，后接 changing，不是 change。'],
      ['It takes a little time to set up, but you only need to do it once.','设置需要一点时间，但你只需做一次。','It takes + 时间 + to do；a little 修饰不可数 time；once 在这里是“一次”。',{once:{meaning:'一次'}}]
    ]]
  ];
  const extra=rows.flatMap(([group,,examples])=>examples.map(([text,translation,note,hints={}],i)=>({id:`${group}-${i+1}`,group,text,translation,note,hints})));
  window.FLUENCY_LIBRARY.unshift(...extra);
  const tier = {'verb-blocks':1,'noun-blocks':1,'verb-time':1,logic:1,passive:2,conditions:2,'content-clause':2,'relative-clause':2,infinitive:2,'whole-action':2,participles:3,combine:3};
  window.FLUENCY_GROUPS=[...rows.map(([id,title])=>({id,title,tier:1})),...window.READING_PATH.map(item=>({...item,tier:tier[item.id]}))];
  const words=window.READER_LEXICON.words;
  const extraPhrases=[
    ['look at','看；查看','at 后接看的对象；与 look for（寻找）区别。',['looks at','looked at','looking at']],
    ['talk to','与……说话','talk to someone about something：和某人谈某事。',['talks to','talked to','talking to']],
    ['think about','考虑；想起','think about 后接正在考虑的人、事或做法。',['thinks about','thought about','thinking about']],
    ['come back','回来','come 的过去式 came；不要把 back 理解成新动作。',['comes back','came back','coming back']],
    ['take a break','休息一下','take 在这个词块中不译成“拿”。',['takes a break','took a break','taken a break','taking a break']],
    ['work on','处理；从事','work on a task：在处理一项任务；不一定指“在……上面工作”。',['works on','worked on','working on']],
    ['for example','例如','用一个具体例子说明前面的观点。'],
    ['such as','例如；诸如','后面通常直接列举名词，不当完整独立小句用。'],
    ['of course','当然','course 在这个词块里不译为“课程”。'],
    ['a bit','一点；稍微','a bit tired：有点累；a bit of time：一点时间。'],
    ['get on','上车','与 get off（下车）成对学习。',['gets on','got on','getting on']],
    ['look like','看起来像','like 在这里是介词，后接名词或代词。',['looks like','looked like','looking like']],
    ['at home','在家','at home 中通常不加 the。'],
    ['right now','现在；马上','根据语境表示当前或立刻。']
  ];
  extraPhrases.forEach(([text,meaning,note,aliases=[]])=>window.READER_LEXICON.phrases.push({text,meaning,note,aliases}));
  const split=text=>text.split(/\s+/);
  const coreGroups=[
    {title:'先找谁／什么：人称与物主',keys:split('i me my mine you your yours he him his she her hers it its we us our ours they them their theirs')},
    {title:'指代、数量与限定',keys:split('this that these those a an the some any all each every one other another something anything everything nothing someone anyone everyone')},
    {title:'最先熟练的动作与状态',keys:split('be have do get go come make take give find know think say tell see look use want need work help ask call feel keep put let read write send mean try start finish understand')},
    {title:'接句与位置：先认常见义',keys:split('and but or so because if when before after that who which what where how why in on at to of for from with by about without')},
    {title:'请求、时间与否定',keys:split("can could will would should not don't doesn't didn't isn't aren't can't won't i'm it's i've i'll now then again still already yet just only also very here there today tomorrow yesterday")}
  ];
  const core=new Set(coreGroups.flatMap(group=>group.keys));
  const it=new Set(split('app application file folder browser computer laptop device data backup version instruction option access password account link website screen button update error download upload install restart reset connect load select permission notification api url id pdf offline online automatically'));
  const later=new Set(split('whenever unless whether rather suppose'));
  const labels={1:'先熟练 · 通用核心',2:'随后 · 日常与工作',it:'按需 · IT 文档',3:'后学 · 扩展辨析'};
  const wordTier=key=>core.has(key)?1:it.has(key)?'it':later.has(key)?3:2;
  Object.entries(words).forEach(([key,value])=>value.priority=wordTier(key));
  const phraseCore=new Set(['need to','have to','would like to','look for','look at','talk to','think about','come back','get back','get off','get on','turn on','turn off','ask for','let me know','how to','every day','each other','a few','a little','a lot of','for example','of course','at home','right now','take a break','work on']);
  const phraseLater=new Set(['be used to','get used to','be supposed to','rather than','in case','no longer']);
  window.READER_LEXICON.phrases.forEach(item=>item.priority=phraseCore.has(item.text)?1:phraseLater.has(item.text)?3:['back up','log in','sign in','set up','take effect'].includes(item.text)?'it':2);
  window.LEARNING_PRIORITIES={coreGroups,core:[...core],labels,wordTier,description:'先练跨生活与工作的功能词和基本动词，再扩展常见场景词，IT 术语按需查。层级是本站教学取舍，不是语料库逐词排名；未标注先学不等于不常见。'};
})();
