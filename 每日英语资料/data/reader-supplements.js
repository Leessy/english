/* 新故事词义与核心词块的跨场景复现。全部例句、中译为本站原创。 */
(() => {
  const lexicon=window.READER_LEXICON;
  for(const [key,entry] of Object.entries(window.READER_LONG_WORDS||{}))lexicon.words[key]={...lexicon.words[key],...entry,priority:window.LEARNING_PRIORITIES.wordTier(key)};
  const rows=[
    ['give back','归还','give something back / give it back；代词 it/them 放在中间。',['gives back','gave back','given back','give it back','gave it back','give this one back']],
    ['give away','赠送；送人','这里指把所有权给别人，不是暂借。',['gives away','gave away','given away','give your books away']],
    ['at the same time','同时','表示同一时刻或同一时间段内。'],
    ['make sense','说得通；有道理','不是字面上的“制造感觉”。',['makes sense','made sense']],
    ['next to','在……旁边','next to + 人或物；与 next week（下周）区别。'],
    ['try again','再试一次','常见的操作提示；try 的过去式是 tried。',['tries again','tried again','trying again']],
    ['be about to','正要；即将','后接动词原形，表示马上要做。',['am about to','is about to','are about to','was about to','were about to']],
    ['would like','想要（礼貌表达）','后接名词或 one；后接动作时用 would like to do。',["I'd like","you'd like","we'd like"]]
  ];
  rows.forEach(([text,meaning,note,aliases=[]])=>lexicon.phrases.push({text,meaning,note,aliases,priority:text==='would like'?1:2}));
  const s=(text,translation,note,hints={})=>({text,translation,note,hints});
  window.CORE_EXTRA_EXAMPLES=[
    s('Of course you can ask for help; everyone needs it sometimes.','你当然可以寻求帮助；每个人有时都需要帮助。','of course 表当然；everyone 作单数主语，needs 加 s；it 指帮助。'),
    s('“Can I sit here?” “Of course; this seat is free.”','“我可以坐这里吗？”“当然，这个座位没人坐。”','Can I 表请求许可；free 在此指空着，不是免费。',{free:{meaning:'空着的；无人占用的'}}),
    s('Look at these two pictures and tell me what is different.','看看这两张图片，告诉我有什么不同。','look at 后接看的对象；what is different 是 tell 的内容。'),
    s('I need to talk to you about our plan before we leave.','我们离开前，我需要和你聊聊我们的计划。','need to 后接动作；talk to someone about something 表和某人谈某事。'),
    s('Please think about it and tell me tomorrow.','请考虑一下，明天告诉我。','think about it 是考虑这件事；it 的具体内容需要从前文判断。'),
    s('We have to think about the people who will use this page.','我们必须考虑将使用这个页面的人。','have to 表必须；who will use this page 修饰 people。'),
    s('I’ll come back after lunch if you still need me.','如果你还需要我，我午饭后会回来。','I’ll = I will；after lunch 说明时间；if 给出条件。'),
    s('When did you get back from work?','你什么时候下班回来的？','did 后用 get 原形；get back 表回来；from work 表从工作地点回来。'),
    s('I’ll get back to you when I know more.','了解更多情况后，我会再回复你。','get back to someone 是回复某人，不是走回某人那里。'),
    s('You can get on the bus here and get off near the station.','你可以在这里上公交，在车站附近下车。','get on / get off 对照表示上车、下车；can 管两个并列动作。'),
    s('We got on the wrong bus, so we got off at the next stop.','我们上错了公交，所以在下一站下了车。','got 是 get 的过去式；so 后是结果。',{got:{lemma:'get',form:'past'}}),
    s('Turn on the light before you read, and turn it off when you leave.','阅读前打开灯，离开时把它关掉。','turn it off 中 it 放在 turn 与 off 中间；指代 light。'),
    s('Please turn off your phone, then turn it on again.','请关机，然后重新开机。','turn off / turn on 是关、开；代词 it 必须放在中间。'),
    s('I ask for an example when I don’t understand a question.','不明白一个问题时，我会请求对方举例。','ask for 后接想要的东西；when 说明什么情况下这样做。'),
    s('Let me know if anything changes before tomorrow.','如果明天之前有什么变化，请告诉我。','let me know 表告诉我；anything 作单数，changes 加 s。'),
    s('Could you show me how to do this without your help?','你能教我如何独立完成这件事吗？','how to do this 是展示的内容；without your help 是不依赖你的帮助。'),
    s('We read a few sentences every day and help each other understand them.','我们每天读几个句子，互相帮助理解。','a few 后用可数复数；every day 表每天；each other 表彼此。'),
    s('A little practice every day is better than a lot of practice once a month.','每天练一点，比一个月才大量练一次更好。','practice 不可数；a little / a lot of 都可修饰它；整个练习安排作主语。'),
    s('I have a few questions, but there is only a little time.','我有几个问题，但时间只有一点。','a few + 可数复数 questions；a little + 不可数 time。'),
    s('A lot of people work at home, but I go to the office.','很多人在家工作，但我去办公室上班。','a lot of 可修饰可数复数；at home 不加 the。'),
    s('For example, we can take a break after we finish this page.','例如，我们可以读完这一页后休息一下。','for example 引出一个做法；take a break 表休息；after 连接动作先后。'),
    s('She wants to work on the pictures, but I need to work on the words.','她想处理图片部分，而我需要处理文字部分。','work on 表处理工作内容；两个 to 后接动词原形。'),
    s('I can’t answer right now, but I’ll call you later.','我现在不能接听，但稍后会给你回电话。','right now 表此刻；can’t 和 I’ll 分别展开为 cannot 和 I will。'),
    s('We need to check it right now because the customer is waiting.','客户正在等，我们需要现在就检查。','right now 强调马上；because 后说明原因。'),
    s('She doesn’t have all the details, but she knows something about it.','她不了解全部细节，但知道一些情况。','doesn’t = does not，后用 have 而不是 has；all 表全部，something 表一些事情。'),
    s('This doesn’t mean all the work is done; there is something else to check.','这并不意味着所有工作都完成了，还有别的东西需要检查。','doesn’t 后 mean 用原形；something else 是别的事情；to check 修饰它。'),
    s('These notes aren’t very clear, so I need to read them again today.','这些笔记不太清楚，所以我今天需要再读一遍。','aren’t = are not；very 修饰 clear；them 指 notes。'),
    s('They aren’t at home today, but the office isn’t very far away.','他们今天不在家，不过办公室不是很远。','aren’t 与 isn’t 都是 be 的否定；前者配 they，后者配单数 office。')
  ];
  lexicon.words.light={word:'light',pos:'n./adj.',meaning:'灯；光；轻的',priority:2};
  lexicon.words.month={word:'month',pos:'n.',meaning:'月；月份',priority:2};
  lexicon.words.school={word:'school',pos:'n.',meaning:'学校；上学时期',priority:2};
  // 补足叙事中少见的三单／进行形式；不为凑五形态强行使用 knowing / wanting。
  window.CORE_EXTRA_EXAMPLES.push(
    s('She goes to work early, but today she is going in later.','她平时很早上班，但今天会晚一点去。','goes 表习惯；is going 表今天的安排；不是两个过去动作。'),
    s('He goes home at six; he has already gone home today.','他通常六点回家；今天他已经回家了。','goes 是三单；has gone 表已经去了、此刻不在这里。',{gone:{lemma:'go',form:'participle'}}),
    s('She has gone to the shop, so please wait until she gets back.','她去商店了，请等她回来。','has gone 表已去尚未回；gets 配 she，until 后说明等到什么时候。',{gone:{lemma:'go',form:'participle'}}),
    s('He gets the bus every morning, but today he is getting a train.','他每天早上乘公交，但今天乘火车。','get 在此指搭乘交通工具；gets 是三单，is getting 是今天的安排。'),
    s('She comes here every week, and she is coming again tomorrow.','她每周都来这里，明天还会来。','comes 表规律；is coming 可表示已安排的将来。'),
    s('He comes with us when he has time; he is coming with us today.','他有空就和我们一起来，今天也会和我们一起来。','comes 与 is coming 对比一般规律与本次安排。'),
    s('She has come back, and we have come to help her.','她已经回来了，我们也已经来帮她了。','come 原形与过去分词同形；两处 have/has come 都表示已来、现在在这里。',{come:{lemma:'come',form:'participle'}}),
    s('He makes coffee for us, and today he is making breakfast too.','他会给我们煮咖啡，今天还在做早餐。','makes 是三单；is making 是正在做的动作。'),
    s('She makes a plan before making any changes.','她在进行任何改动之前都会先制订计划。','makes 是主句动词；before 作介词时可接 making，不是第二个谓语。'),
    s('She gives me an example when I ask a question.','我提问时，她会给我举个例子。','gives 配 she；give someone an example 是给某人举例。'),
    s('He gives us time to think before telling us the answer.','他会先给我们时间思考，再告诉我们答案。','gives 是三单；before telling 表告诉之前；两个动作的人都是 he。'),
    s('She finds the right page quickly, but I’m having trouble finding it.','她很快就能找到正确页面，我却找得很费劲。','finds 是三单；have trouble doing 表做某事有困难；finding 不是主句谓语。'),
    s('He finds it easier to ask for help than to keep guessing.','他觉得求助比一直猜更容易。','finds it easier to do 中 it 是形式宾语；后面说明容易做的事。',{it:{meaning:'形式宾语；后面的 to ask for help 是真正内容'}}),
    s('Finding a file is easy when you know its name.','知道文件名时，找文件就容易了。','Finding a file 整体作主语；is 是主句谓语；its 指文件的。'),
    s('She knows this place well, and I have known her for years.','她很熟悉这里，而我认识她已经多年了。','knows 表当前知道；have known 表认识持续至今；不机械改为 is knowing。',{known:{lemma:'know',form:'participle'}}),
    s('He knows my sister; they have known each other since school.','他认识我姐姐；他们从学生时代就认识了。','knows 是三单；have known...since... 表从过去持续到现在。',{known:{lemma:'know',form:'participle'}}),
    s('She thinks the plan will work, but I’m still thinking about it.','她认为计划可行，我却还在考虑。','thinks 是持有看法；am thinking about 是正在考虑，含义不同。'),
    s('He thinks we need more time before sending the file.','他觉得我们发文件前还需要更多时间。','thinks 后接内容小句；before sending 表发出之前。'),
    s('She tells me what she needs before I start.','我开始之前，她会告诉我她需要什么。','tells 配 she；what she needs 是所说内容。'),
    s('He tells us about his work; today he is telling us about a new project.','他会和我们聊他的工作，今天正在讲一个新项目。','tells 表平时的行为；is telling 表此刻正在做；tell someone about something 是向某人讲述某事。'),
    s('The note says we should wait, but she says we can go.','便条说我们应该等，但她说我们可以走了。','两个 says 都是三单；前者表文字内容，后者表人的话。'),
    s('I can’t hear what he is saying.','我听不清他正在说什么。','what he is saying 是 hear 的内容；is saying 表正在说。'),
    s('She reads a little every day, and he reads with her at the weekend.','她每天读一点，他周末和她一起读。','两处 reads 都是第三人称单数；read 的现在时读 /riːd/。'),
    s('She writes short messages, and he writes longer ones.','她写简短的消息，他写较长的。','writes 是三单；ones 代替 messages。'),
    s('I’m writing to ask about the file you sent.','我写信是想询问你发来的文件。','am writing 表正在写信；to ask 表目的；you sent 修饰 file。'),
    s('She sends a message when she finishes the work.','她完成工作时会发一条消息。','sends 与 finishes 都配 she；when 说明时间。'),
    s('He sends us a copy before sending it to the customer.','他发给客户之前，会先给我们一份副本。','sends 是主句谓语；before sending 表先后顺序，it 指文件。'),
    s('She uses this app at work, and he uses it at home.','她工作时用这个应用，他在家用。','uses 是三单；it 代替 this app。'),
    s('She helps me read the instructions, and I’m helping her check the result.','她帮我读说明，我则在帮她检查结果。','helps 是三单；am helping 是进行形式；help 后可直接接原形。'),
    s('Helping each other makes the work easier.','互相帮助会让工作更容易。','Helping each other 整体作主语；makes 才是主句谓语。'),
    s('What are you doing? I’m doing the last check before we leave.','你在做什么？我在做出发前的最后检查。','are doing 是进行时疑问；am doing 是进行时回答。'),
    s('We’re having lunch now; she is having coffee with us.','我们正在吃午饭，她正和我们一起喝咖啡。','have lunch / have coffee 是吃喝的动作，可以用进行时；表示拥有时通常不用。'),
    s('She is taking notes, and he is taking a look at the page.','她正在记笔记，他正在看页面。','take notes 是记笔记；take a look 是看一下；taking 是 -ing 形式。')
  );
})();
