/* 人工核对的常用动词形态证据。相同拼写不自动视为相同语法作用。 */
(() => {
  'use strict';
  const pack={id:'b',verbs:'need work help ask call feel keep put let read write send mean try start finish understand'.split(' '),deferred:{
    'need:ing':'先熟练 need 的需要义；本轮不为凑词形引入少见进行用法。needing 可在后续非谓语结构中认识。',
    'mean:ing':'先熟练 mean 表“意思是／指的是”。meaning 作名词“意思”不算动词 -ing 用法；相关非谓语用法后学。',
    'mean:participle':'先练 mean/meant 表意思与指代；have meant、be meant to 等结构涉及额外义项，本轮后学，不当作不存在。',
    'understand:ing':'understand 的理解状态通常不机械套进行时；understanding 作非谓语或名词的用法本轮后学。'
  },examples:[],existing:[],words:{}};
  const t=(lemma,form,surface,reason,occurrence=0)=>({lemma,form,surface,occurrence,reason});
  const r=(lemma,form,surface,reason,texts)=>texts.forEach(text=>pack.existing.push({text,targets:[t(lemma,form,surface,reason)]}));
  const n=(scene,text,translation,targets)=>pack.examples.push({id:`vf-b-${String(pack.examples.length+1).padStart(3,'0')}`,text,translation,note:targets.map(item=>item.reason).join(' '),scene,targets});

  r('need','base','need','need 是原形；本句并未使用需要的进行状态。',[
    'We need to check the address.','You don’t need to bring any food.','We need to check it right now because the customer is waiting.'
  ]);
  r('need','third','needs','needs 配单数主语，词尾 -s 表示现在时第三人称单数。',[
    'If someone needs an old version, it can still be found in the backup folder.',
    'Of course you can ask for help; everyone needs it sometimes.',
    'She tells me what she needs before I start.'
  ]);
  r('need','past','needed','needed 是一般过去时，描述过去需要的内容；不是 have 后的过去分词。',[
    'Although I knew the words, I needed time to understand the sentence.',
    'I only needed a larger size.',
    'After reading the message again, I no longer needed to translate every word.'
  ]);

  r('work','base','work','work 是动词原形，表示工作或正常运作；不是名词“工作”。',[
    'Does it work without the internet?',
    'A lot of people work at home, but I go to the office.',
    'She wants to work on the pictures, but I need to work on the words.'
  ]);
  r('work','third','works','works 配单数主语，表示当前正常使用或工作。',[
    'The app works offline, so you can use it without an account.',
    'I know that the app works.',
    'The person who wrote this guide works here.'
  ]);
  r('work','past','worked','worked 是过去式；按语境可表示运作、工作，或 work for someone（对某人合适）。',[
    'Although I’d read the guide, I asked someone to show me how it worked.',
    'She asked me whether the new time worked for me.',
    'I wrote the first two pages, and my colleague Ana worked on the pictures.'
  ]);
  r('work','ing','working','be + working 表正在处理或当前运行，working 是 -ing 形式。',[
    'The app is working now, and we are ready to use it.',
    'I’m still working on it; I’ll let you know when it’s ready.'
  ]);

  r('help','base','help','help 是原形，在此表示帮助，不是名词“帮助”。',[
    'Could you help me check these details?',
    'I know someone who can help you set up the app.',
    'We read a few sentences every day and help each other understand them.'
  ]);
  r('help','third','helps','helps 是第三人称单数，前面的动作整体或单数主语决定用 -s。',[
    'Reading the same story again helps me remember the words.',
    'She helps me read the instructions, and I’m helping her check the result.',
    'Reading examples helps me understand the rule.'
  ]);
  r('help','past','helped','helped 作过去式，描述已经发生的帮助。',[
    'The person who helped me asked whether I wanted my money back.',
    'The guide showed people how to use a service that helped them book meeting rooms.',
    'These questions were simple, but they helped us stop guessing and start checking.'
  ]);
  r('help','participle','helped','had helped 是过去完成时；helped 在 had 后是过去分词，不是单独的过去式。',[
    'She said it had helped her find more time for things she enjoyed.'
  ]);
  r('help','ing','helping','I’m = I am；am helping 表此刻正在帮助。',[
    'She helps me read the instructions, and I’m helping her check the result.'
  ]);
  r('help','ing','Helping','Helping each other 整体作主语；Helping 是 -ing 形式，makes 才是主句谓语。',[
    'Helping each other makes the work easier.'
  ]);

  r('ask','base','ask','ask 是原形；后接人或 for 短语表示询问、请求。',[
    'I need to ask you a question before you leave.',
    'I ask for an example when I don’t understand a question.',
    'I’m writing to ask about the file you sent.'
  ]);
  r('ask','third','asks','asks 配 Ana 这个单数主语；同一句后面的 I ask 不加 -s。',[
    'Now, when Ana asks me to check something, I ask what she wants me to check.'
  ]);
  r('ask','past','asked','asked 是过去式，说明过去问了或请求了什么。',[
    'I couldn’t find the file, so I asked her for help.',
    'She asked me whether the new time worked for me.',
    'Before we changed anything, we asked the customer to show us the steps they took.'
  ]);
  r('ask','participle','asked','had not asked 是过去完成时的否定；asked 为过去分词。',[
    'Neither of us knew what our neighbors thought, because we had not asked them.'
  ]);
  r('ask','ing','Asking','Asking for help 整体作主语；asking 是 -ing 形式，不是另一个时态谓语。',[
    'Asking for help is better than guessing the meaning.'
  ]);
  r('ask','ing','asking','asking 是 -ing 形式；该动作在句中被当作一个整体来谈论。',[
    'But now we knew who to ask, and asking no longer felt difficult.',
    'I was afraid that asking more questions would make me look slow.'
  ]);

  r('call','base','call','call 是原形；本句表示打电话。',[
    'When you get home, please call me.',
    'I’ll call you as soon as I get home.',
    'If you need help, you can call me.'
  ]);
  r('call','past','called','who called you 说明过去打电话的人；called 是从句的过去式谓语。',[
    'The person who called you is waiting outside.'
  ]);
  r('call','participle','called','is called 是被动结构；called 为过去分词，表示名字被叫到。',[
    'Wait here until your name is called.'
  ]);

  r('feel','base','feel','didn’t 已表示过去否定，后面的 feel 必须用原形；feel well 表身体舒服。',[
    'I stayed at home because I didn’t feel well.'
  ]);
  r('feel','past','felt','felt 是 feel 的过去式，连接过去的感受与后面的说明。',[
    'For the first time, the building felt like a place where I could make friends.',
    'But now we knew who to ask, and asking no longer felt difficult.'
  ]);

  r('keep','base','keep','keep 是原形，表示保留或保持。',[
    'We have to change the password, but we can keep the account.',
    'It’s important to keep your password safe.',
    'Now I keep both keys in the same place so that I can find them quickly.'
  ]);
  r('keep','third','keeps','keeps 与单数主语 the other team 搭配；theirs 代替 their files。',[
    'The other team keeps theirs in a separate folder.'
  ]);
  r('keep','past','kept','kept 在本句独立作过去式，不是 have/be 后的过去分词。',[
    'I kept the receipt and took the jacket back to the shop.',
    'That was too much after a busy day, so I kept putting it off.',
    'We kept a copy of the old version and made the change in our test version.'
  ]);
  r('keep','participle','kept','has kept 是现在完成时；kept 是过去分词，描述一直保留到现在。',[
    'She has kept the same phone for five years.'
  ]);
  r('keep','participle','kept','must be kept 是情态被动；kept 是过去分词，closed 另说明关闭的状态。',[
    'The door must be kept closed at night.'
  ]);
  r('keep','ing','Keeping','Keeping a copy 整体作主语；Keeping 是 -ing 形式，makes 是主句谓语。',[
    'Keeping a copy makes it easier to fix a mistake.'
  ]);

  r('put','base','put','put 是原形；前面的 to 或 should 决定使用原形，不是过去式。',[
    'I don’t know where to put these files.',
    'Soon, other people brought their books and asked us where they should put them.'
  ]);
  r('put','past','put','put 虽与原形同形，本句叙述过去放置的动作，所以是过去式。',[
    'I put them in the box and left it on a table by our door.',
    'The following week, we put two small boxes on the table instead of one.',
    'We put the new version online and told the customer only after these checks.'
  ]);
  r('put','participle','put','had put 是过去完成时；put 为过去分词，放钥匙早于询问。',[
    'I sent her a message and asked where she had put it.'
  ]);
  r('put','ing','putting','kept putting it off 表反复推迟；putting 是 keep 后的 -ing 形式。',[
    'That was too much after a busy day, so I kept putting it off.'
  ]);

  r('let','base','let','let 是原形；let 人 know 整块表示让某人知道，不是过去式。',[
    'I’m still working on it; I’ll let you know when it’s ready.',
    'If you find my keys, please let me know.',
    'Please let me know whether you’ve received the file I sent this morning.'
  ]);

  r('read','base','read','read 是原形，读 /riːd/；本句不是过去的 read /red/。',[
    'We can read it in advance instead of reading it during the meeting.',
    'You can read the FAQ if you’re not sure what to do next.',
    'We read a few sentences every day and help each other understand them.'
  ]);
  r('read','third','reads','reads 是第三人称单数现在式，读 /riːdz/；同一条里出现两次仍只算一个复现语境。',[
    'She reads a little every day, and he reads with her at the weekend.'
  ]);
  r('read','past','read','read 在本句是过去式，读 /red/；根据叙述时间判断，不因拼写相同而当作现在式。',[
    'We talked to each other after we read the notes.',
    'I wanted to explain that the note was clear, but then I read it again.',
    'He read the first page, tried the steps, and got the same problem as I did.'
  ]);
  r('read','participle','read','read 在完成时或被动结构中作过去分词，读 /red/。',[
    'We’ve already read the instructions.',
    'Messages sent after six may not be read until tomorrow.',
    'I have read your message, but I haven’t replied yet.'
  ]);
  r('read','ing','reading','reading 是 -ing 形式；本句由 am reading 表示正在重读。',[
    'I don’t understand this part, so I’m reading it again.'
  ]);
  r('read','ing','Reading','Reading 加后面的内容整体作主语；helps 才是主句谓语，Reading 本身不表示进行时。',[
    'Reading the same story again helps me remember the words.',
    'Reading examples helps me understand the rule.'
  ]);

  r('write','base','write','write 是原形；to 或 did not 后都不使用 wrote。',[
    'Sometimes someone forgot to write a name, or a book stayed away for too long.',
    'I did not write “It works for me” and close the task after one quick test.'
  ]);
  r('write','third','writes','writes 是第三人称单数现在式；同条两次仍只算一个语境。',[
    'She writes short messages, and he writes longer ones.'
  ]);
  r('write','past','wrote','wrote 是 write 的过去式，描述已经写下的内容。',[
    'I wrote down one idea from each section and tried it at work.',
    'Then I wrote a short note: “Take a book if you would like one.”',
    'I wrote the first two pages, and my colleague Ana worked on the pictures.'
  ]);
  r('write','participle','written','written 是过去分词；既可用于完成时，也可修饰被写出的名词。',[
    'He has written the message, but he hasn’t sent it yet.',
    'The book written by my teacher is easy to follow.',
    'Notes written at the top of each file explain what has changed.'
  ]);
  r('write','ing','writing','I’m = I am；am writing 表正在写信，writing 是动词 -ing 形式。',[
    'I’m writing to ask about the file you sent.'
  ]);

  r('send','base','send','send 是原形；助动词、请求或不定式结构后不使用 sent。',[
    'Did you send it to her, or did she send it to you?',
    'Please send me the link so I can check it myself.',
    'Could you send me the address again?'
  ]);
  r('send','third','sends','sends 配单数主语，表示通常发生的动作。',[
    'She sends a message when she finishes the work.',
    'He sends us a copy before sending it to the customer.'
  ]);
  r('send','past','sent','sent 在本句作过去式，发送动作发生在过去；不是 have/be 后的分词。',[
    'They sent us their files, so we sent them ours.',
    'I sent her a message, but she hasn’t replied yet.',
    'I sent my family a message: “I’ll get back a little later.”'
  ]);
  r('send','participle','sent','sent 在完成时或被动结构中是过去分词，不能仅凭同一拼写记成过去式。',[
    'He has written the message, but he hasn’t sent it yet.',
    'The order was sent yesterday, but it hasn’t arrived.',
    'Your order has been sent, but it hasn’t arrived yet.'
  ]);
  r('send','ing','sending','sending 是 -ing 形式；介词 before 后用 sending，而不是 sent。',[
    'I opened the file on my phone for one last check before sending anything.',
    'He thinks we need more time before sending the file.'
  ]);
  r('send','ing','sending','sending a guide 整体作主语；would not help 是主句谓语。',[
    'But sending a guide that did not work would not help any of us.'
  ]);

  r('mean','base','mean','mean 是原形，表示意思或指代；do/does 往往承担当句的时态与主语变化。',[
    'What does this word mean in this sentence?',
    'Do you mean this one or the one we used before?',
    'This doesn’t mean all the work is done; there is something else to check.'
  ]);
  r('mean','third','means','means 配 sharing 这一单数动作概念，表示对方所说分享的含义。',[
    'When someone says “You can share this,” I ask what sharing means to them.'
  ]);
  r('mean','past','meant','meant 是过去式，描述当时理解的含义；不是 have 后的过去分词。',[
    'I thought that meant we were ready, so I offered to send the file.',
    'He thought “done” meant that he had found and fixed the mistakes in the writing.'
  ]);

  r('try','base','try','try 是原形，表示尝试；后面可接对象、to do 或 doing。',[
    'Please look at the example before you try it yourself.',
    'If the file you downloaded won’t open, try downloading it again.',
    'I was about to ask them to try again when my colleague Sam came over.'
  ]);
  r('try','past','tried','tried 是 try 的过去式；辅音字母加 y 结尾，变为 -ied。',[
    'At first, I tried to finish a whole chapter every evening.',
    'I wrote down one idea from each section and tried it at work.',
    'He read the first page, tried the steps, and got the same problem as I did.'
  ]);
  r('try','participle','tried','tried 在 have/had 后是过去分词；与过去式拼写相同，但语法作用不同。',[
    'There was another route, but I hadn’t tried it before.',
    '“This book is great,” Sam said, “and I have already tried one of its ideas.”',
    'Sam told me that he had read the words but had not tried the steps.'
  ]);
  r('try','ing','trying','is trying 表正在尝试；trying 是 -ing 形式，保留 y。',[
    'He forgot the password, so he is trying to reset it.'
  ]);
  r('try','ing','trying','keep trying 表持续尝试；trying 是 keep 后的 -ing 形式。',[
    '“I press the button, but nothing happens, so I keep trying,” the message said.'
  ]);

  r('start','base','start','start 是原形；本句表示开始，不是名词“起点”。',[
    'Are there any questions before we start?',
    'We’ve taken a break, and we can start again now.',
    'I wanted to know them, but I did not know how to start.'
  ]);
  r('start','third','starts','starts 与单数 the meeting 搭配，用一般现在时表达安排。',[
    'She said the meeting starts at nine.'
  ]);
  r('start','past','started','started 表过去开始的动作；reading 说明开始做什么。',[
    'Then I started reading just two pages while I had breakfast.'
  ]);

  r('finish','base','finish','finish 是原形，表示完成；to 或一般现在时结构中仍用原形。',[
    'I want to go, but I need to finish this first.',
    'We agreed to finish only the part that explained how to book one room.',
    'For example, we can take a break after we finish this page.'
  ]);
  r('finish','third','finishes','finishes 配 she；finish 以 -sh 结尾，三单加 -es。',[
    'She sends a message when she finishes the work.'
  ]);
  r('finish','past','finished','finished 是过去式，和 saw、chose 并列，说明过去完成预订。',[
    'She saw the message, chose another room, and finished the booking without our help.'
  ]);
  r('finish','participle','finished','have/had finished 中 finished 是过去分词，说明到某一时点已经完成。',[
    'I looked at our list again and wondered what we had actually finished.',
    '“I have finished my first version,” she wrote, “but I haven’t checked it with Sam.”'
  ]);

  r('understand','base','understand','understand 是原形，表示理解；本句没有使用理解的进行形式。',[
    'I don’t understand this part, so I’m reading it again.',
    'Although I knew the words, I needed time to understand the sentence.',
    'I ask for an example when I don’t understand a question.'
  ]);
  r('understand','past','understood','understood 是过去式，描述双方当时的理解；同一条两次只算一个语境。',[
    'My sister understood sharing as lending, and I understood it as giving.'
  ]);

  n('work','We have needed more time since the team became smaller.','自从团队人数减少以来，我们一直需要更多时间。',[
    t('need','participle','needed','have needed 表从过去延续至今的需要；needed 是过去分词。')
  ]);
  n('life','I have never needed a car because I live near my office.','我一直不需要汽车，因为我住在办公室附近。',[
    t('need','participle','needed','have never needed 描述截至现在的经历；needed 是过去分词。')
  ]);
  n('it','This app has always needed an internet connection.','这个应用一直需要网络连接。',[
    t('need','participle','needed','has always needed 说明从以前到现在一直有此要求；needed 为过去分词。')
  ]);
  n('work','I have worked here for three years.','我已经在这里工作三年了。',[
    t('work','participle','worked','have worked + for three years 表工作持续至今；worked 是过去分词。')
  ]);
  n('it','The new version has worked well on both phones and laptops.','新版本在手机和笔记本电脑上都运行良好。',[
    t('work','participle','worked','has worked 报告截至现在的运行情况；worked 是过去分词。')
  ]);
  n('life','We have worked together before, so I know how she likes to plan.','我们以前一起工作过，所以我知道她喜欢怎样做计划。',[
    t('work','participle','worked','have worked together before 表过去有过合作经历；worked 是过去分词。')
  ]);
  n('work','I’m working from home today and helping a new colleague get started.','我今天在家办公，正在帮助一位新同事上手。',[
    t('work','ing','working','I’m = I am；am working 表今天正在进行的工作安排。'),
    t('help','ing','helping','helping 与 working 共用 am；两项动作都是进行形式。')
  ]);
  n('life','You have helped me a lot this week.','这周你帮了我很多忙。',[
    t('help','participle','helped','have helped 总结这周截至现在的帮助；helped 是过去分词。')
  ]);
  n('it','These examples have helped us understand the error.','这些例子帮助我们理解了这个错误。',[
    t('help','participle','helped','have helped 表已经带来的帮助；helped 是过去分词。')
  ]);
  n('life','My friend asks how I feel when she calls.','朋友打来电话时，会问我感觉怎么样。',[
    t('ask','third','asks','asks 配 my friend，表示她通常会问的事。'),
    t('feel','base','feel','I feel 是一般现在时，feel 仍用原形；how I feel 是询问内容。'),
    t('call','third','calls','calls 配 she，表示她打电话时。')
  ]);
  n('it','The app asks where to save the file before the download starts.','下载开始前，应用会询问文件要保存在哪里。',[
    t('ask','third','asks','asks 配 the app；where to save 是询问的内容。'),
    t('start','third','starts','starts 配 the download，指下载开始。')
  ]);
  n('work','I have asked the manager, but she hasn’t replied yet.','我已经问过经理了，但她还没有回复。',[
    t('ask','participle','asked','have asked 表已经问过；asked 是过去分词。')
  ]);
  n('life','Have you asked your family what they want for dinner?','你问过家里人晚饭想吃什么了吗？',[
    t('ask','participle','asked','Have you asked 是现在完成时疑问；asked 为过去分词。')
  ]);
  n('work','He calls the customer after he finishes the report.','他写完报告后会给客户打电话。',[
    t('call','third','calls','calls 配 he，描述工作流程中的惯常动作。'),
    t('finish','third','finishes','finishes 配 he，指完成报告；finish 的三单加 -es。')
  ]);
  n('life','She calls before starting the car.','她开车出发之前会先打个电话。',[
    t('call','third','calls','calls 是三单现在式，表示她通常的做法。'),
    t('start','ing','starting','before 在此作介词，后接 starting，指启动车辆前。')
  ]);
  n('life','I called my friend last night and felt better after we talked.','我昨晚给朋友打了电话，聊完后感觉好多了。',[
    t('call','past','called','last night 说明过去时间；called 是过去式。'),
    t('feel','past','felt','felt 与 called 都叙述过去；felt better 表感觉好多了。')
  ]);
  n('work','She called me after we finished the meeting.','会议结束后，她给我打了电话。',[
    t('call','past','called','called 是过去式，描述会后发生的电话。'),
    t('finish','past','finished','finished 是过去式，描述已结束的会议。')
  ]);
  n('life','I’ve called the shop twice, but nobody has answered.','我已经给商店打了两次电话，但一直没人接。',[
    t('call','participle','called','I’ve = I have；called 在 have 后是过去分词。')
  ]);
  n('work','We have called everyone on the list.','我们已经给名单上的每个人打过电话了。',[
    t('call','participle','called','have called 表已完成联系；called 是过去分词。')
  ]);
  n('life','I’m calling to ask whether the room is still available.','我打电话是想问问那个房间是否仍可预订。',[
    t('call','ing','calling','I’m calling 表当前正在打电话；to ask 说明目的。')
  ]);
  n('work','She is calling the customer while I check the address.','她正在给客户打电话，我则在核对地址。',[
    t('call','ing','calling','is calling 表正在进行；while 连接同时发生的事。')
  ]);
  n('life','Thank you for calling before you came.','谢谢你来之前先打了电话。',[
    t('call','ing','calling','for 是介词，后接 calling；不是用 is calling 的进行时。')
  ]);
  n('life','Do you feel well enough to go out?','你觉得身体还行，能出门吗？',[
    t('feel','base','feel','Do 已负责构成疑问；feel 保持原形，well 表身体好。')
  ]);
  n('life','She feels tired after a long day.','忙了一整天后，她觉得很累。',[
    t('feel','third','feels','feels 配 she，是系动词；tired 说明感受。')
  ]);
  n('work','It feels easier to ask questions when the team is friendly.','团队里的人友善时，提问也会让人觉得更容易。',[
    t('feel','third','feels','feels 与形式主语 it 搭配；后面说明提问的感受。')
  ]);
  n('life','This jacket feels warm, but it is too small.','这件夹克穿着很暖和，但太小了。',[
    t('feel','third','feels','feels 配 this jacket，后接 warm 描述穿着感受。')
  ]);
  n('life','I haven’t felt well since yesterday.','从昨天起，我就一直感觉不舒服。',[
    t('feel','participle','felt','haven’t felt 描述从过去延续至今的感受；felt 是过去分词。')
  ]);
  n('work','She has felt more comfortable at work since we started helping each other.','自从我们开始互相帮助后，她在工作中感觉自在多了。',[
    t('feel','participle','felt','has felt + since... 描述持续至今的感受；felt 为过去分词。'),
    t('start','past','started','since 从句里的 started 指过去开始互助的时间。')
  ]);
  n('life','Have you ever felt tired after sleeping for a long time?','你有没有睡了很久却仍感到疲倦的时候？',[
    t('feel','participle','felt','Have you ever felt 询问经历；felt 是过去分词。')
  ]);
  n('life','I’m feeling much better today.','我今天感觉好多了。',[
    t('feel','ing','feeling','am feeling 描述当前暂时的身体感受；feel 的这种用法可以用进行时。')
  ]);
  n('work','She is feeling tired, so we are taking a short break.','她觉得累了，所以我们正在短暂休息。',[
    t('feel','ing','feeling','is feeling 描述她此刻的感受，不是所有状态动词都不能用进行时。')
  ]);
  n('life','Thanks for asking how I’m feeling.','谢谢你关心我现在感觉怎么样。',[
    t('feel','ing','feeling','how I’m feeling 是问候的内容；am feeling 描述此刻感受。')
  ]);
  n('life','She keeps her keys by the door.','她把钥匙固定放在门边。',[
    t('keep','third','keeps','keeps 配 she，表示平时保管东西的方式。')
  ]);
  n('it','This app keeps a copy of every change.','这个应用会保留每次更改的副本。',[
    t('keep','third','keeps','keeps 配 this app，描述应用通常提供的功能。')
  ]);
  n('work','I have kept your notes, so we can check them together.','我保留了你的笔记，我们可以一起核对。',[
    t('keep','participle','kept','have kept 表已经保留且现在仍可使用；kept 是过去分词。')
  ]);
  n('it','We are keeping the old version until the new one is ready.','新版本准备好之前，我们会暂时保留旧版。',[
    t('keep','ing','keeping','are keeping 描述当前阶段的保留安排；until 表结束条件。')
  ]);
  n('life','Keeping my phone away from the table helps me enjoy dinner.','把手机放到餐桌之外，有助于我好好吃饭。',[
    t('keep','ing','Keeping','Keeping my phone away... 整体作主语；helps 是主句谓语。')
  ]);
  n('life','Please put the milk in the kitchen.','请把牛奶放到厨房里。',[
    t('put','base','put','请求句用 put 原形；不能因拼写相同就判断成过去式。')
  ]);
  n('life','She puts her phone in her bag before leaving home.','她出门前会把手机放进包里。',[
    t('put','third','puts','puts 配 she，描述出门前的习惯。')
  ]);
  n('it','The app puts new files in this folder.','应用会把新文件放进这个文件夹。',[
    t('put','third','puts','puts 配 the app，表示应用通常怎样存放文件。')
  ]);
  n('work','He puts the meeting time at the top of each message.','他会把开会时间写在每条消息的开头。',[
    t('put','third','puts','puts 配 he；put 在这里表示把信息放在指定位置。')
  ]);
  n('life','I have put your keys on the table.','我已经把你的钥匙放到桌上了。',[
    t('put','participle','put','have put 表已经放好；put 在 have 后是过去分词。')
  ]);
  n('work','We have put the latest version in the shared folder.','我们已经把最新版本放进共享文件夹了。',[
    t('put','participle','put','have put 报告当前完成情况；put 为过去分词。')
  ]);
  n('life','I’m putting these books back before we go.','出发前，我正在把这些书放回原处。',[
    t('put','ing','putting','am putting 表正在放回；put 的 -ing 形式双写 t。')
  ]);
  n('work','Putting the date in the file name makes it easier to find.','把日期写进文件名，会让文件更容易找到。',[
    t('put','ing','Putting','Putting the date... 整体作主语；putting 双写 t，makes 才是谓语。')
  ]);
  n('life','She lets her children choose a book before bed.','她让孩子们睡前选一本书。',[
    t('let','third','lets','lets 配 she；let 人 do 中 choose 用原形，不加 to。')
  ]);
  n('it','The app lets you save a copy without an account.','这个应用允许你不用账户就保存一份副本。',[
    t('let','third','lets','lets 配 the app；lets you save 是让你保存，不用 lets you to save。')
  ]);
  n('work','My manager lets us work from home on Fridays.','经理允许我们每周五在家办公。',[
    t('let','third','lets','lets 配 my manager，说明通常的许可；work 用原形。')
  ]);
  n('work','Yesterday, my manager let me leave early.','昨天经理让我提前离开了。',[
    t('let','past','let','Yesterday 说明过去时间；let 是过去式，leave 是 let 后的原形。')
  ]);
  n('it','The app let me open the file after I signed in.','登录后，应用让我打开了文件。',[
    t('let','past','let','本句叙述登录后的过去经历；let 作过去式，open 保持原形。')
  ]);
  n('life','I let my friend use my phone because hers was broken.','朋友的手机坏了，我让她用了我的。',[
    t('let','past','let','was broken 给出过去背景；let 是过去允许的动作，use 是原形。')
  ]);
  n('work','I’ve let the team know about the change.','我已经把这个变化告诉团队了。',[
    t('let','participle','let','I’ve = I have；let 为过去分词；know 仍是 let 后的原形。')
  ]);
  n('it','We haven’t let anyone change these files.','我们没有允许任何人修改这些文件。',[
    t('let','participle','let','haven’t let 表截至现在未作此许可；let 为过去分词，不是一般过去式。')
  ]);
  n('life','She has let her family know her new address.','她已经把新地址告诉家里人了。',[
    t('let','participle','let','has let 中 let 是过去分词；let someone know 表通知某人。')
  ]);
  n('work','Thanks for letting me know in advance.','谢谢你提前告诉我。',[
    t('let','ing','letting','for 是介词，后接 letting；let 的 -ing 形式双写 t。')
  ]);
  n('life','I’m letting my friend stay here for a few days.','我让朋友在这里暂住几天。',[
    t('let','ing','letting','am letting 描述当前暂时的许可安排；stay 在 let 人 后用原形。')
  ]);
  n('it','Letting everyone change the same file can cause problems.','让所有人都修改同一份文件，可能会造成问题。',[
    t('let','ing','Letting','Letting everyone change... 整体作主语；can cause 是谓语。')
  ]);
  n('life','My friend reads on the bus every morning.','我的朋友每天早上在公交车上读书。',[
    t('read','third','reads','reads 配 my friend，是现在时三单，读 /riːdz/。')
  ]);
  n('work','She reads each message before she replies.','她回复前会先读完每条消息。',[
    t('read','third','reads','reads 配 she，是三单现在式，不是过去的 read /red/。')
  ]);
  n('life','Please write your name on the bag.','请把你的名字写在包上。',[
    t('write','base','write','请求句使用 write 原形；on the bag 说明写在哪里。')
  ]);
  n('work','She writes down the next step after every meeting.','每次开完会，她都会记下下一步要做的事。',[
    t('write','third','writes','writes 配 she；write down 表记下。')
  ]);
  n('it','The app writes the result to a file.','应用会把结果写入文件。',[
    t('write','third','writes','writes 配 the app，表示软件通常执行的写入操作。')
  ]);
  n('life','I’m writing a shopping list before I leave.','出门前，我正在写购物清单。',[
    t('write','ing','writing','am writing 表正在写；write 变 writing 时去掉词尾 e。')
  ]);
  n('work','Writing a short reply now will save time later.','现在写一个简短回复，会节省以后的时间。',[
    t('write','ing','Writing','Writing a short reply now 整体作主语；will save 才是主句谓语。')
  ]);
  n('it','The app sends you a message when the file is ready.','文件准备好后，应用会给你发一条消息。',[
    t('send','third','sends','sends 配 the app；when 引出触发消息的条件。')
  ]);
  n('life','What she means is that we should leave earlier.','她的意思是，我们应该早点出发。',[
    t('mean','third','means','means 配 she；What she means 整体作主语。')
  ]);
  n('it','This message means the file is too large.','这条消息的意思是，文件太大了。',[
    t('mean','third','means','means 配 this message，表示消息传达的含义。')
  ]);
  n('work','When I said “today,” I meant before the end of the day.','我说“今天”时，指的是今天结束之前。',[
    t('mean','past','meant','meant 是 mean 的过去式，解释我当时说话的意思。')
  ]);
  n('life','She tries a new recipe every weekend.','她每个周末都会试一道新食谱。',[
    t('try','third','tries','tries 配 she；try 的三单把 y 变成 -ies。')
  ]);
  n('work','He tries to answer messages before lunch.','他尽量在午饭前回复消息。',[
    t('try','third','tries','tries 配 he；try to do 表努力做到，不是试验某种方法。')
  ]);
  n('it','The app tries again if the first connection fails.','如果第一次连接失败，应用会再次尝试。',[
    t('try','third','tries','tries 配 the app；if 后说明重试条件。')
  ]);
  n('life','I’m trying to find a time when everyone is free.','我正在尝试找一个大家都有空的时间。',[
    t('try','ing','trying','am trying 表正在尝试；try 加 -ing 时保留 y。')
  ]);
  n('life','My day starts with a short walk.','我的一天从短暂散步开始。',[
    t('start','third','starts','starts 配 my day；start with 表以……开始。')
  ]);
  n('it','The download starts when you press this button.','按下这个按钮，下载就会开始。',[
    t('start','third','starts','starts 配单数名词 download；when 表触发条件。')
  ]);
  n('work','We started the meeting late, but finished on time.','我们开会开始晚了，但准时结束了。',[
    t('start','past','started','started 是过去式，说明会议实际开始的时间情况。'),
    t('finish','past','finished','finished 与 started 共用主语 we，均为过去式。')
  ]);
  n('work','We have started the work, but we haven’t finished it yet.','我们已经开始工作了，但还没有完成。',[
    t('start','participle','started','have started 中 started 是过去分词，报告已经开始。'),
    t('finish','participle','finished','haven’t finished 中 finished 是过去分词，表示截至现在尚未完成。')
  ]);
  n('life','Have you started reading the book I gave you?','你开始读我给你的那本书了吗？',[
    t('start','participle','started','Have you started 是现在完成时疑问；started 后接 reading。')
  ]);
  n('it','The update has started, so please keep the app open.','更新已经开始，请保持应用打开。',[
    t('start','participle','started','has started 中 started 是过去分词；so 后给出操作建议。')
  ]);
  n('work','I’m starting a new job next week.','我下周要开始一份新工作。',[
    t('start','ing','starting','am starting 可表示已经安排的近期将来，不必译成此刻正在开始。')
  ]);
  n('it','Check the address before starting the download.','开始下载前，先核对地址。',[
    t('start','ing','starting','before 是介词，后接 starting；starting the download 是操作内容。')
  ]);
  n('life','Her class finishes at five.','她的课五点结束。',[
    t('finish','third','finishes','finishes 配 her class，用现在时表示时间安排。')
  ]);
  n('life','I finished the book on the train yesterday.','昨天我在火车上读完了那本书。',[
    t('finish','past','finished','yesterday 指明过去；finished 是过去式，finish the book 在此表示读完。')
  ]);
  n('work','I’m finishing the report now; I’ll send it soon.','我现在正在完成报告，很快就会发给你。',[
    t('finish','ing','finishing','am finishing 表正在收尾；不是已经完成的 have finished。')
  ]);
  n('life','We are finishing dinner, so please give us a few minutes.','我们晚饭快吃完了，请给我们几分钟。',[
    t('finish','ing','finishing','are finishing 表正在完成吃饭这件事；不是一般过去时。')
  ]);
  n('work','After finishing this task, I can help you.','完成这项任务后，我就能帮你了。',[
    t('finish','ing','finishing','after 是介词，后接 finishing；完成任务的人与主句主语 I 相同。')
  ]);
  n('life','She understands why I want to leave early.','她理解我为什么想早点离开。',[
    t('understand','third','understands','understands 配 she；why 后说明理解的内容。')
  ]);
  n('work','Our manager understands the problem, but he needs more time.','经理理解这个问题，但还需要更多时间。',[
    t('understand','third','understands','understands 配 our manager，表示当前的理解状态。')
  ]);
  n('it','The app only understands a few simple commands.','这个应用只识别几条简单指令。',[
    t('understand','third','understands','understands 配 the app；在软件语境中表示识别、理解指令。')
  ]);
  n('life','I understood her question after she gave me an example.','她举了个例子后，我明白了她的问题。',[
    t('understand','past','understood','understood 是过去式；after 说明理解发生在举例之后。')
  ]);
  n('work','We understood the plan differently, so we asked for a meeting.','我们对计划的理解不同，于是请求开会讨论。',[
    t('understand','past','understood','understood 是过去式，描述我们当时的理解；不是 have 后的分词。')
  ]);
  n('life','I have never understood why he keeps those old tickets.','我一直不明白他为什么留着那些旧票。',[
    t('understand','participle','understood','have never understood 表截至现在一直不理解；understood 是过去分词。')
  ]);
  n('work','Have I understood you correctly: we should send only the first page?','我理解得对吗：我们应该只发送第一页？',[
    t('understand','participle','understood','Have I understood 是用完成时核对理解是否正确；understood 是过去分词。')
  ]);
  n('work','I’m not sure I have understood all the details.','我不确定自己是否已经理解了全部细节。',[
    t('understand','participle','understood','have understood 表截至现在的理解情况；understood 是过去分词。')
  ]);

  pack.words={
    smaller:{word:'smaller',pos:'adj.',meaning:'更小的；small 的比较级'},
    car:{word:'car',pos:'n.',meaning:'汽车'},
    ever:{word:'ever',pos:'adv.',meaning:'曾经；在任何时候，常用于询问经历'},
    bed:{word:'bed',pos:'n.',meaning:'床；before bed 表睡前'},
    date:{word:'date',pos:'n.',meaning:'日期；约会'},
    shopping:{word:'shopping',pos:'n.',meaning:'购物；shopping list 表购物清单'},
    recipe:{word:'recipe',pos:'n.',meaning:'食谱；做法'},
    class:{word:'class',pos:'n.',meaning:'课；班级'},
    command:{word:'command',pos:'n.',meaning:'指令；命令'},
    differently:{word:'differently',pos:'adv.',meaning:'不同地；以不同方式'},
    correctly:{word:'correctly',pos:'adv.',meaning:'正确地'},
    earlier:{word:'earlier',pos:'adj./adv.',meaning:'更早的；更早地（early 的比较级）'},
    cause:{word:'cause',pos:'v./n.',meaning:'造成；引起；原因',forms:{base:'cause',third:'causes',past:'caused',participle:'caused',ing:'causing'}},
    fail:{word:'fail',pos:'v.',meaning:'失败；未能成功',forms:{base:'fail',third:'fails',past:'failed',participle:'failed',ing:'failing'}}
  };
  window.VERB_FORM_PACKS=window.VERB_FORM_PACKS||[];
  window.VERB_FORM_PACKS.push(pack);
})();
